/* =============================================================================
 * 结构体检（纯 Node，无需浏览器）：在失去渲染探针时守住生成质量。
 *   1) 地块是否坐实（基座下方必须有实体，不能悬浮）
 *   2) 完全孤立体素（六面皆空）——渲染时会变成天上的飞屑
 *   3) 地标全部建成、高度合理、彼此不重叠
 *   4) 山坡住宅的海拔分布（防止把楼盖到山顶）
 *   5) 第一人称可行走性抽查（长廊 / 街道 / 弥敦道）
 *   6) 体素 / 网格预算
 * 用法: node _test\check.cjs
 * ===========================================================================*/
global.window = global;
const path = require('path');
for (const f of ['core', 'volume', 'geo', 'build', 'archetypes', 'landmarks', 'extra', 'city', 'detail']) {
  require(path.join(__dirname, '..', 'src', f + '.js'));
}
const H = global.HKV, W = H.W;
let fails = 0, warns = 0;
const ok = (c, m) => { console.log((c ? '  PASS  ' : '  FAIL  ') + m); if (!c) fails++; };
const warn = (c, m) => { if (!c) { console.log('  WARN  ' + m); warns++; } else console.log('  PASS  ' + m); };

const t0 = Date.now();
const geo = H.Geo.build();
const vol = new H.Volume(W.SX, W.SY, W.SZ);
H.Geo.paintTerrain(vol, geo);
H.Landmarks.reserveAll(geo);
const stats = {};
H.City.build(vol, geo, stats);
H.Landmarks.build(vol, geo);
H.Detail.build(vol, geo, stats);
const lms = H.Landmarks.list();
const lots = H.City.lots();
console.log(`\n生成: ${Date.now() - t0}ms  楼宇 ${stats.buildings}（山坡 ${stats.hillside}）  细节 ${stats.props}  地标 ${lms.length}  体素 ${vol.filled.toLocaleString()}\n`);

// ---------------------------------------------------------------- 1 地块坐实
let floatLots = 0;
for (const L of lots) {
  let solid = 0, n = 0;
  for (let z = L.z; z < L.z + L.d; z++) for (let x = L.x; x < L.x + L.w; x++) { n++; if (vol.get(x, L.base - 1, z) !== 0) solid++; }
  if (solid < n * 0.6) { floatLots++; if (floatLots < 6) console.log(`        悬浮地块 @${L.x},${L.z} base=${L.base} 支撑=${(100 * solid / n) | 0}% ${L.district}`); }
}
ok(floatLots === 0, `地块坐实：${lots.length} 个地块，悬浮 ${floatLots}`);

// -------------------------------------------------------------- 2 孤立体素
// 细线构件（拉索 / 棕榈叶 / 灯具 / 障碍灯 / 晾衣杆）本来就是对角悬空的，予以豁免；
// 混凝土、玻璃、石材出现孤立体素才是真正的建模事故。
const THIN = new Set([H.M.STEEL_D, H.M.STEEL, H.M.PALM, H.M.LAMP, H.M.BEACON_R, H.M.TREE, H.M.TREE_D,
H.M.CRANE_O, H.M.TANK, H.M.EQUIP, H.M.NEON_RED, H.M.NEON_GREEN, H.M.WOOD, H.M.RUST]);
let isolated = 0, isoThin = 0;
const samples = [];
for (let z = 1; z < W.SZ - 1; z++) {
  for (let x = 1; x < W.SX - 1; x++) {
    for (let y = W.SEA - 2; y < W.SY - 1; y++) {
      const m = vol.get(x, y, z);
      if (m === 0) continue;
      if (vol.get(x - 1, y, z) || vol.get(x + 1, y, z) || vol.get(x, y - 1, z) ||
        vol.get(x, y + 1, z) || vol.get(x, y, z - 1) || vol.get(x, y, z + 1)) continue;
      if (THIN.has(m)) { isoThin++; continue; }
      isolated++;
      if (samples.length < 8) samples.push(`${x},${y},${z}#${m}`);
    }
  }
}
ok(isolated < 120, `孤立体素（结构性飞屑）：${isolated}${samples.length ? ' 例: ' + samples.join(' ') : ''}　细线构件豁免 ${isoThin}`);

// ---------------------------------------------------------------- 3 地标体检
// 群落型 / 线型地标（缆车、高架、山坡住宅群、山顶）的 hm 表示"跨度或山高"，不参与塔高核对
const SPAN = new Set(['peak-tram', 'iec', 'mid-levels', 'victoria-peak', 'avenue-of-stars', 'taikoo-place', 'polyu']);
let badTop = 0, dup = 0;
const seen = new Set();
for (const L of lms) {
  if (!(L.top > W.SEA) || L.top > W.SY) { badTop++; console.log(`        高度异常: ${L.zh} top=${L.top}`); }
  if (seen.has(L.id)) dup++;
  seen.add(L.id);
  // 体素高度与标称高度的一致性（±40% 容差，造型自由度大）
  if (L.hm > 80 && !SPAN.has(L.id)) {
    const vh = (L.top - W.GROUND) * W.VOXEL;
    if (vh < L.hm * 0.6 || vh > L.hm * 1.7) {
      console.log(`        WARN 标称 ${L.hm}m 实测 ${Math.round(vh)}m  ${L.zh}`);
      warns++;
    }
  }
}
ok(badTop === 0 && dup === 0, `地标：${lms.length} 座，高度异常 ${badTop}，重复 ${dup}`);

// 标签与拾取的可分辨性：锚点过近会导致信息卡抢焦点
let tooClose = 0;
for (let i = 0; i < lms.length; i++) {
  for (let j = i + 1; j < lms.length; j++) {
    const a = lms[i], b = lms[j];
    if (Math.abs(a.x - b.x) <= 2 && Math.abs(a.z - b.z) <= 2 && Math.abs((a.top || 0) - (b.top || 0)) < 6) {
      tooClose++;
      if (tooClose < 5) console.log(`        锚点重合: ${a.zh} × ${b.zh}`);
    }
  }
}
ok(tooClose === 0, `地标锚点可分辨：重合 ${tooClose}`);

// ------------------------------------------------------ 4 山坡住宅海拔分布
const hist = {};
let hillMax = 0;
for (const L of lots) {
  if (!L.hill) continue;
  const alt = Math.round((L.base - W.GROUND) * W.VOXEL / 50) * 50;
  hist[alt] = (hist[alt] || 0) + 1;
  hillMax = Math.max(hillMax, (L.base - W.GROUND) * W.VOXEL);
}
console.log('  山坡住宅海拔分布: ' + Object.keys(hist).sort((a, b) => a - b).map((k) => `${k}m:${hist[k]}`).join('  '));
ok(hillMax <= 230, `山坡住宅最高基座海拔 ${Math.round(hillMax)}m（应 ≤230m，山顶留给林地）`);

// ------------------------------------------------------------ 5 可行走性
const spots = [[650, 427, '尖沙咀海滨长廊'], [606, 520, '弥敦道'], [330, 236, '中环德辅道'], [700, 200, '铜锣湾'], [1001, 210, '鲗鱼涌'], [406, 190, '花园道缆车站']];
let walk = 0;
for (const [x, z, name] of spots) {
  const top = vol.columnTop(x, z, W.SY - 1);
  const headroom = (() => { let c = 0; for (let y = top + 1; y < top + 4; y++) if (vol.get(x, y, z) === 0) c++; return c; })();
  const good = top >= W.SEA && top < W.SY - 6 && headroom >= 3;
  if (good) walk++; else console.log(`        站不住: ${name} @${x},${z} top=${top} headroom=${headroom}`);
}
ok(walk === spots.length, `第一人称落脚点：${walk}/${spots.length} 可站立且有净空`);

// -------------------------------------------------------------- 6 预算
const mesher = vol.createMesher();
while (!mesher.step(0)) { }
const parts = mesher.result();
let verts = 0, tris = 0;
for (const p of parts) { verts += p.verts; tris += p.index.length / 3; }
const gpuMB = verts * 18 / 1048576;
console.log(`\n  网格: ${mesher.quads.toLocaleString()} quads  ${tris.toLocaleString()} tris  ${parts.length} buckets  显存≈${gpuMB.toFixed(1)}MB`);
ok(gpuMB < 420, `显存预算 ${gpuMB.toFixed(1)}MB < 420MB`);
ok(parts.length < 200, `网格批次 ${parts.length} < 200（draw call 可控）`);
ok(vol.filled > 4.5e6, `体素总量 ${(vol.filled / 1e6).toFixed(2)}M > 4.5M（微体素密度）`);

console.log(`\n${fails ? 'FAILED ' + fails + ' 项' : '全部通过'}${warns ? '，警告 ' + warns + ' 项' : ''}\n`);
process.exit(fails ? 1 : 0);
