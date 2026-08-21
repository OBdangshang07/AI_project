/* Node 端生成器验证：ASCII 地图 + 体素/网格统计 + 计时（无需浏览器） */
global.window = global;
const path = require('path');
const files = process.argv[2] ? process.argv[2].split(',') : ['core', 'volume', 'geo'];
for (const f of files) require(path.join(__dirname, '..', 'src', f + '.js'));
const H = global.HKV, W = H.W;

function t(label, fn) { const a = Date.now(); const r = fn(); console.log(`  [${String(Date.now() - a).padStart(5)}ms] ${label}`); return r; }

const geo = t('geo.build', () => H.Geo.build());
const vol = new H.Volume(W.SX, W.SY, W.SZ);
t('paintTerrain', () => H.Geo.paintTerrain(vol, geo));
const stats = {};
if (H.Landmarks) t('landmarks.reserve', () => H.Landmarks.reserveAll(geo));
if (H.City) t('City.build', () => H.City.build(vol, geo, stats));
if (H.Landmarks) t('Landmarks.build', () => H.Landmarks.build(vol, geo));
if (H.Detail) t('Detail.build', () => H.Detail.build(vol, geo, stats));
if (stats.buildings) console.log('  buildings:', stats.buildings, ' hillside:', stats.hillside || 0, ' props:', stats.props || 0);

// ---- ASCII 地图（俯视，字符 = 12x16 voxel 区块的主导地物）----
const CW = 8, CH = 16;   // 每字符覆盖的 voxel
let map = '';
for (let z = W.SZ - CH; z >= 0; z -= CH) {
  let row = '';
  for (let x = 0; x < W.SX; x += CW) {
    let maxH = -99, land = 0, n = 0;
    for (let dz = 0; dz < CH; dz += 4) for (let dx = 0; dx < CW; dx += 2) {
      const i = (x + dx) + (z + dz) * W.SX; n++;
      if (geo.land[i]) land++;
      const top = vol.columnTop(x + dx, z + dz, W.SY - 1);
      if (top > maxH) maxH = top;
    }
    if (land === 0) row += ' ';
    else {
      const h = maxH - W.GROUND;
      row += h > 90 ? '@' : h > 55 ? '#' : h > 30 ? 'H' : h > 14 ? 'h' : h > 5 ? '=' : land > n * 0.6 ? '-' : ',';
    }
  }
  map += row + '\n';
}
console.log('\n=== 俯视图（上=九龙北, 下=港岛南/太平山, 空白=水域）===');
console.log(map);

const st = vol.stats();
console.log(`voxels=${st.filled.toLocaleString()}  chunks=${st.chunks}  mem=${(st.chunkBytes / 1048576).toFixed(1)}MB`);
const mesher = vol.createMesher();
t('greedy mesh', () => { while (!mesher.step(0)) { } });
const res = mesher.result();
let verts = 0, tris = 0;
for (const r of res) { verts += r.verts; tris += r.index.length / 3; }
console.log(`buckets=${res.length} quads=${mesher.quads.toLocaleString()} verts=${verts.toLocaleString()} tris=${tris.toLocaleString()} gpuMB≈${(verts * 18 / 1048576).toFixed(1)}`);
if (H.Landmarks) console.log(`landmarks=${H.Landmarks.list().length}`);
