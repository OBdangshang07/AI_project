/* =============================================================================
 * VOXEL VICTORIA HARBOUR · city.js
 * 城市肌理：沿岸线走向的主干道网（干诺道 / 德辅道 / 轩尼诗道 / 梳士巴利道 /
 * 弥敦道…）、按分区性格生成的填充城市、海滨长廊、公园、码头与货运吊机、
 * 中环空中连廊、弥敦道霓虹峡谷、避风塘舢舨。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV || (global.HKV = {});
  const { W, M, B, RNG, clamp, lerp, fbm } = HKV;
  const USE = HKV.Geo.USE;

  // ------------------------------------------------------------ 分区性格设定
  // hMin/hMax 单位米；mats 主体材质；win 窗材质；style 立面语言
  const HK_DISTRICTS = [
    { x0: 0, x1: 150, name: '坚尼地城 / 石塘咀', hMin: 45, hMax: 110, styles: ['residential', 'banded'], mats: ['STUCCO_Y', 'STUCCO_W', 'CONCRETE_L', 'STUCCO_P'], win: 'GLASS_WHITE', ac: 0.16, sign: 0.25 },
    { x0: 150, x1: 214, name: '上环', hMin: 60, hMax: 150, styles: ['banded', 'ribbed', 'residential'], mats: ['CONCRETE_L', 'STUCCO_W', 'GLASS_BLUE', 'STUCCO_G'], win: 'GLASS_BLUE', ac: 0.12, sign: 0.3 },
    { x0: 214, x1: 344, name: '中环', hMin: 90, hMax: 240, styles: ['glass', 'ribbed', 'banded'], mats: ['GLASS_BLUE', 'GLASS_SILVER', 'GRANITE', 'GLASS_DARK', 'CONCRETE_L'], win: 'GLASS_WHITE', ac: 0.02, sign: 0.12 },
    { x0: 344, x1: 446, name: '金钟', hMin: 90, hMax: 210, styles: ['glass', 'ribbed'], mats: ['GLASS_TEAL', 'GLASS_SILVER', 'CONCRETE_L', 'GLASS_GOLD'], win: 'GLASS_WHITE', ac: 0.03, sign: 0.1 },
    { x0: 446, x1: 620, name: '湾仔', hMin: 55, hMax: 170, styles: ['banded', 'residential', 'ribbed'], mats: ['STUCCO_W', 'CONCRETE_L', 'STUCCO_Y', 'GLASS_TEAL', 'STUCCO_P'], win: 'GLASS_BLUE', ac: 0.16, sign: 0.34 },
    { x0: 620, x1: 764, name: '铜锣湾', hMin: 70, hMax: 190, styles: ['banded', 'glass', 'residential'], mats: ['CONCRETE_L', 'GLASS_BLUE', 'STUCCO_W', 'GLASS_DARK'], win: 'GLASS_WHITE', ac: 0.12, sign: 0.4 },
    { x0: 764, x1: 940, name: '北角', hMin: 70, hMax: 165, styles: ['residential', 'banded'], mats: ['STUCCO_W', 'STUCCO_Y', 'CONCRETE_L', 'STUCCO_G'], win: 'GLASS_WHITE', ac: 0.2, sign: 0.22 },
    { x0: 940, x1: 1152, name: '鲗鱼涌 / 太古', hMin: 90, hMax: 200, styles: ['residential', 'glass'], mats: ['CONCRETE_L', 'GLASS_TEAL', 'STUCCO_W'], win: 'GLASS_BLUE', ac: 0.14, sign: 0.15 },
  ];
  const KL_DISTRICTS = [
    { x0: 0, x1: 100, name: '西九龙填海区', hMin: 60, hMax: 150, styles: ['glass', 'banded'], mats: ['CONCRETE_L', 'GLASS_WHITE', 'GLASS_TEAL'], win: 'GLASS_WHITE', ac: 0.04, sign: 0.1 },
    { x0: 100, x1: 300, name: '西九龙 / 九龙站', hMin: 110, hMax: 240, styles: ['residential', 'glass'], mats: ['GLASS_TEAL', 'CONCRETE_L', 'STUCCO_W'], win: 'GLASS_WHITE', ac: 0.08, sign: 0.12 },
    { x0: 300, x1: 396, name: '佐敦 / 油麻地', hMin: 40, hMax: 95, styles: ['residential', 'banded'], mats: ['STUCCO_Y', 'STUCCO_P', 'STUCCO_G', 'CONCRETE_M'], win: 'GLASS_WHITE', ac: 0.3, sign: 0.55 },
    { x0: 396, x1: 556, name: '尖沙咀西 / 广东道', hMin: 60, hMax: 165, styles: ['banded', 'glass', 'ribbed'], mats: ['CONCRETE_L', 'GLASS_BRONZE', 'GLASS_TEAL', 'STUCCO_W'], win: 'GLASS_WHITE', ac: 0.1, sign: 0.42 },
    { x0: 556, x1: 700, name: '尖沙咀 / 弥敦道', hMin: 55, hMax: 175, styles: ['banded', 'residential', 'ribbed'], mats: ['STUCCO_W', 'CONCRETE_L', 'GLASS_DARK', 'STUCCO_Y'], win: 'GLASS_WHITE', ac: 0.22, sign: 0.62 },
    { x0: 700, x1: 860, name: '红磡', hMin: 80, hMax: 200, styles: ['residential', 'banded'], mats: ['STUCCO_W', 'CONCRETE_L', 'GLASS_TEAL'], win: 'GLASS_BLUE', ac: 0.14, sign: 0.2 },
    { x0: 860, x1: 1152, name: '土瓜湾 / 黄埔', hMin: 70, hMax: 175, styles: ['residential', 'banded'], mats: ['STUCCO_Y', 'STUCCO_W', 'CONCRETE_L', 'STUCCO_G'], win: 'GLASS_WHITE', ac: 0.22, sign: 0.25 },
  ];

  // 主干道（k = 距岸线的内陆距离）。间距按香港街区尺度（一街区 ≈ 40~60m）安排，
  // 相邻干道之间留出可建街区带。
  const HK_ROADS = [
    { k: 4, w: 4, name: '干诺道 / 龙和道' },
    { k: 18, w: 4, name: '德辅道中', tram: true },
    { k: 34, w: 3, name: '皇后大道中' },
    { k: 52, w: 4, name: '轩尼诗道', tram: true },
    { k: 72, w: 3, name: '坚道 / 半山道' },
  ];
  const KL_ROADS = [
    { k: 5, w: 4, name: '梳士巴利道' },
    { k: 20, w: 4, name: '柯士甸道 / 漆咸道南' },
    { k: 38, w: 4, name: '佐敦道' },
    { k: 58, w: 3, name: '甘肃街' },
    { k: 80, w: 4, name: '窝打老道' },
    { k: 104, w: 3, name: '亚皆老街' },
    { k: 126, w: 4, name: '旺角道 / 荔枝角道' },
  ];

  const ROADNAMES = [];

  function matOf(name) { return M[name]; }

  // ---------------------------------------------------------------- 道路铺设
  function paintRoads(vol, geo) {
    const specs = [['hk', HK_ROADS, -1], ['kl', KL_ROADS, 1]];
    for (const [side, roads, sgn] of specs) {
      const shore = side === 'hk' ? geo.hkShore : geo.klShore;
      for (const rd of roads) {
        for (let x = 0; x < geo.SX; x++) {
          const zc = shore[x] + sgn * rd.k;
          for (let i = 0; i < rd.w; i++) {
            const z = zc + i - (rd.w >> 1);
            if (z < 0 || z >= geo.SZ) continue;
            const i2 = x + z * geo.SX;
            if (!geo.land[i2]) continue;
            if (geo.use[i2] === USE.BUILDING) continue;
            const y = geo.height[i2];
            if (y > W.GROUND + 6) continue;                       // 只在平地铺主干道
            geo.use[i2] = USE.ROAD;
            const center = i === (rd.w >> 1);
            let mat = M.ASPHALT;
            if (center && rd.w >= 4 && (x % 6 < 3)) mat = M.MARK_W;
            if (rd.tram && (i === 1 || i === rd.w - 2) && (x % 2 === 0)) mat = M.TRAM_RAIL;
            vol.set(x, y, z, mat);
          }
          // 人行道 + 路灯 + 行道树
          for (const s of [-1, 1]) {
            const z = zc + s * ((rd.w >> 1) + 1);
            if (z < 0 || z >= geo.SZ) continue;
            const i2 = x + z * geo.SX;
            if (!geo.land[i2] || geo.use[i2] !== USE.FREE) continue;
            geo.use[i2] = USE.PLAZA;
            const y = geo.height[i2];
            if (y > W.GROUND + 6) continue;
            vol.set(x, y, z, M.PAVE_D);
            if (x % 11 === (side === 'hk' ? 3 : 7)) B.lamp(vol, x, y + 1, z, 3, -s);
            else if (x % 17 === 5) B.tree(vol, x, y + 1, z, 2 + (x % 2));
          }
        }
        ROADNAMES.push({ side, name: rd.name, k: rd.k });
      }
      // 横向街道（南北向），26 voxel 一条，与街区网格对齐
      const maxK = roads[roads.length - 1].k;
      for (let x = 0; x < geo.SX - 3; x += 26) {
        for (let k = 2; k <= maxK + 8; k++) {
          const z = (side === 'hk' ? geo.hkShore[clamp(x, 0, geo.SX - 1)] - k : geo.klShore[clamp(x, 0, geo.SX - 1)] + k);
          for (let w = 0; w < 3; w++) {
            const px = x + w;
            if (px < 0 || px >= geo.SX || z < 0 || z >= geo.SZ) continue;
            const i2 = px + z * geo.SX;
            if (!geo.land[i2] || geo.use[i2] === USE.BUILDING) continue;
            const y = geo.height[i2];
            if (y > W.GROUND + 10) continue;
            geo.use[i2] = USE.ROAD;
            vol.set(px, y, z, M.ASPHALT);
          }
        }
      }
    }

    // 弥敦道：尖沙咀往北的南北向主轴（霓虹峡谷）
    for (let z = 452; z < 620; z++) {
      for (let w = 0; w < 6; w++) {
        const x = 604 + w;
        const i2 = x + z * geo.SX;
        if (!geo.land[i2]) continue;
        geo.use[i2] = USE.ROAD;
        vol.set(x, geo.height[i2], z, (w === 2 || w === 3) && (z % 6 < 3) ? M.MARK_W : M.ASPHALT);
      }
      for (const x of [603, 610]) {
        const i2 = x + z * geo.SX;
        if (!geo.land[i2] || geo.use[i2] === USE.BUILDING) continue;
        geo.use[i2] = USE.PLAZA;
        vol.set(x, geo.height[i2], z, M.PAVE_D);
        if (z % 9 === 0) B.lamp(vol, x, geo.height[i2] + 1, z, 3, x === 603 ? -1 : 1);
      }
    }
    // 广东道
    for (let z = 440; z < 560; z++) for (let w = 0; w < 4; w++) {
      const x = 470 + w, i2 = x + z * geo.SX;
      if (!geo.land[i2] || geo.use[i2] === USE.BUILDING) continue;
      geo.use[i2] = USE.ROAD; vol.set(x, geo.height[i2], z, M.ASPHALT);
    }
  }

  // ------------------------------------------------------------ 城市填充生成
  // 生成的每一块地块都登记在 LOTS 里，供 detail.js 做二次加细（天台屋 / 竹棚 / 雨棚…）
  const LOTS = [];

  function fillCity(vol, geo, stats) {
    const rng = RNG(20250820);
    LOTS.length = 0;
    const sides = [
      { side: 'hk', sgn: -1, roads: HK_ROADS, districts: HK_DISTRICTS, shore: geo.hkShore },
      { side: 'kl', sgn: 1, roads: KL_ROADS, districts: KL_DISTRICTS, shore: geo.klShore },
    ];
    let built = 0;

    for (const S of sides) {
      // 街区带：相邻两条主干道之间
      for (let ri = 0; ri < S.roads.length; ri++) {
        const kInner = S.roads[ri].k + (S.roads[ri].w >> 1) + 2;
        const kOuter = ri + 1 < S.roads.length ? S.roads[ri + 1].k - (S.roads[ri + 1].w >> 1) - 2 : S.roads[ri].k + 16;
        const bandDepth = kOuter - kInner;
        if (bandDepth < 5) continue;

        for (let bx = 4; bx < geo.SX - 12; bx += 26) {
          const blockW = 21;
          const d = districtAt(S.districts, bx + blockW / 2);
          if (!d) continue;
          // 街区内切分地块：唐楼区（外挂空调多的老区）用窄面宽，商业区用大地块
          const lotRange = d.lot || (d.ac >= 0.16 ? [3, 7] : [5, 12]);
          const lots = subdivide(bx + 1, blockW - 2, bandDepth, rng, lotRange);
          for (const lot of lots) {
            const x = lot.x, w = lot.w, kk = kInner + lot.k, dd = lot.d;
            if (w < 3 || dd < 4) continue;
            // 地块中心
            const cxi = clamp(Math.round(x + w / 2), 0, geo.SX - 1);
            const zc = S.shore[cxi] + S.sgn * (kk + dd / 2);
            const z0 = Math.round(S.sgn > 0 ? S.shore[cxi] + kk : S.shore[cxi] - kk - dd);
            if (!areaFree(geo, x, z0, w, dd)) continue;
            // 基面取地块内最高点，再把低处用混凝土找平——否则地形起伏处会出现悬浮楼
            let gyLo = 999, gy = -999;
            for (let zz = z0; zz < z0 + dd; zz++) {
              for (let xx = x; xx < x + w; xx++) {
                const hh = geo.height[xx + zz * geo.SX];
                if (hh < gyLo) gyLo = hh;
                if (hh > gy) gy = hh;
              }
            }
            if (gy > W.GROUND + 8) continue;
            if (gy > gyLo) vol.fillBox(x, gyLo - 1, z0, w, gy - gyLo + 1, dd, M.CONCRETE_D);

            // 高度：分区区间 + 低频天际线噪声（形成高低起伏的簇群）
            const sk = fbm(x * 0.016, z0 * 0.016, 3);
            const tallBias = Math.pow(sk, 1.4);
            let hm = lerp(d.hMin, d.hMax, clamp(tallBias * 1.15 + (rng() - 0.5) * 0.35, 0, 1));
            if (w * dd < 40) hm *= 0.65;                       // 小地块只能起小楼
            const style = rng() < 0.5 ? d.styles[0] : d.styles[(rng() * d.styles.length) | 0];
            const mat = matOf(d.mats[(rng() * d.mats.length) | 0]);
            const podium = (w > 8 && dd > 8 && rng() < 0.5) ? 2 + ((rng() * 3) | 0) : 0;
            const hv = Math.max(3, Math.round(hm / W.VOXEL));
            const faceZ = S.sgn > 0 ? -1 : 1;                  // 朝维港的那一面
            let res;
            if (HKV.A) {
              // 按分区性格抽一个建筑原型（唐楼 / 公屋 / 风车形私宅 / 工业大厦 / 商场…）
              const arch = HKV.A.choose(rng, {
                w, d: dd, hm, ri, ac: d.ac, sign: d.sign, hMax: d.hMax,
                industrialZone: /北角|土瓜湾|红磡|鲗鱼涌/.test(d.name),
              });
              res = HKV.A.build(vol, arch, {
                x, z: z0, w, d: dd, base: gy, h: hv, rng, faceZ,
                mat, win: matOf(d.win), trim: M.CONCRETE_L, ac: d.ac, sign: d.sign, district: d.name,
              });
              if (res) res.arch = arch;
            }
            if (!res) {
              res = B.tower(vol, {
                x: x, z: z0, w, d: dd, base: gy, h: hv,
                mat, win: matOf(d.win), style, rng, acDensity: d.ac,
                podium, podiumOut: podium ? 1 : 0, podiumMat: M.CONCRETE_M,
                cornerCut: rng() < 0.18 ? 0.25 : 0,
                crown: hm > 150 ? (rng() < 0.4 ? 'spire' : rng() < 0.6 ? 'stepped' : 'box') : (rng() < 0.25 ? 'box' : 'flat'),
                trim: rng() < 0.5 ? M.CONCRETE_L : M.CONCRETE_M,
                helipad: hm > 190 && rng() < 0.25,
              });
              res.arch = 'tower';
            }
            markUsed(geo, x, z0, w, dd, USE.BUILDING);
            LOTS.push({
              x, z: z0, w, d: dd, base: gy, hm, style, side: S.side, sgn: S.sgn, ri,
              district: d.name, ac: d.ac, sign: d.sign, arch: res.arch,
              bx: res.cx, bz: res.cz, bw: res.cw, bd: res.cd, top: res.top,
            });
            built++;

            // 招牌：面向街道的霓虹 / 天台广告
            const top = gy + Math.round(hm / W.VOXEL);
            if (rng() < d.sign) {
              const faceZ = S.sgn > 0 ? -1 : 1;              // 朝维港方向
              const sy = gy + 2 + ((rng() * 4) | 0);
              const neon = [M.NEON_PINK, M.NEON_CYAN, M.NEON_YELL, M.NEON_GREEN, M.NEON_RED, M.NEON_BLUE, M.NEON_WHITE];
              const nm = neon[(rng() * neon.length) | 0];
              if (rng() < 0.5) B.neonSign(vol, x + 1, sy, S.sgn > 0 ? z0 - 1 : z0 + dd, 0, faceZ, Math.min(w - 1, 3 + ((rng() * 4) | 0)), 1 + ((rng() * 3) | 0), nm, 2);
              else B.neonSign(vol, S.sgn > 0 ? x - 1 : x + w, sy, z0 + 1, S.sgn > 0 ? -1 : 1, 0, Math.min(dd - 1, 3 + ((rng() * 3) | 0)), 2, nm, 2);
            }
            if (ri === 0 && rng() < 0.3 && w >= 6 && hm > 60) {
              // 临海第一排：天台巨型广告牌（正对维港）
              const neon = [M.NEON_CYAN, M.NEON_PINK, M.NEON_YELL, M.NEON_WHITE, M.NEON_GREEN];
              B.roofSign(vol, x + 1, top + 1, S.sgn > 0 ? z0 - 1 : z0 + dd, Math.max(4, w - 2), 3 + ((rng() * 3) | 0), S.sgn > 0 ? -1 : 1, neon[(rng() * neon.length) | 0]);
            }
          }
        }
      }
    }
    if (stats) stats.buildings = built;
    return built;
  }

  function districtAt(list, x) {
    for (const d of list) if (x >= d.x0 && x < d.x1) return d;
    return list[list.length - 1];
  }

  // 把街区带切成若干地块（沿 x 切分 + 沿进深切 1~2 排）。香港的唐楼多是"贴墙而建"，
  // 因此地块之间不留缝——共享墙面被网格化剔除，既更密也更省面。
  function subdivide(x0, w, depth, rng, range) {
    const out = [];
    const lo = range ? range[0] : 5, span = range ? Math.max(1, range[1] - range[0]) : 9;
    const rows = depth > 15 ? 2 : 1;
    const rowD = rows === 2 ? Math.floor((depth - 2) / 2) : depth;
    for (let r = 0; r < rows; r++) {
      let x = x0;
      const k = r * (rowD + 2);
      while (x < x0 + w - 2) {
        const lw = lo + ((rng() * span) | 0);
        const ww = Math.min(lw, x0 + w - x);
        if (ww < 3) break;
        if (rng() < 0.97) out.push({ x, w: ww, k, d: Math.max(4, rowD - ((rng() * 2) | 0)) });
        x += ww;
      }
    }
    return out;
  }

  function areaFree(geo, x, z, w, d) {
    if (x < 1 || z < 1 || x + w >= geo.SX - 1 || z + d >= geo.SZ - 1) return false;
    for (let zz = z; zz < z + d; zz++) for (let xx = x; xx < x + w; xx++) {
      const i = xx + zz * geo.SX;
      if (!geo.land[i]) return false;
      const u = geo.use[i];
      if (u === USE.BUILDING || u === USE.ROAD || u === USE.PARK || u === USE.PIER || u === USE.PROMENADE) return false;
    }
    return true;
  }

  function markUsed(geo, x, z, w, d, u) {
    for (let zz = z; zz < z + d; zz++) for (let xx = x; xx < x + w; xx++) {
      if (xx < 0 || zz < 0 || xx >= geo.SX || zz >= geo.SZ) continue;
      geo.use[xx + zz * geo.SX] = u;
    }
  }

  // ------------------------------------------------------------ 海滨长廊 / 公园
  function promenades(vol, geo) {
    const rng = RNG(777);
    for (const side of ['hk', 'kl']) {
      const shore = side === 'hk' ? geo.hkShore : geo.klShore;
      const sgn = side === 'hk' ? -1 : 1;
      for (let x = 2; x < geo.SX - 2; x++) {
        for (let k = 0; k < 3; k++) {
          const z = shore[x] + sgn * k;
          if (z < 1 || z >= geo.SZ - 1) continue;
          const i = x + z * geo.SX;
          if (!geo.land[i]) continue;
          if (geo.use[i] === USE.BUILDING || geo.use[i] === USE.ROAD) continue;
          geo.use[i] = USE.PROMENADE;
          const y = geo.height[i];
          vol.set(x, y, z, k === 0 ? M.PROMENADE : (x % 7 === 0 ? M.PAVE_D : M.PROMENADE));
          if (k === 0) {
            if (x % 2 === 0) vol.set(x, y + 1, z, M.STEEL);              // 海边栏杆
          } else if (k === 2) {
            if (x % 13 === 3) B.lamp(vol, x, y + 1, z, 4, sgn);
            else if (x % 19 === 7) (rng() < 0.5 ? B.palm(vol, x, y + 1, z, 4) : B.tree(vol, x, y + 1, z, 3));
            else if (x % 31 === 11) { vol.fillBox(x, y + 1, z, 2, 1, 1, M.WOOD); }   // 长椅
          }
        }
      }
    }

    // 维多利亚公园（铜锣湾）
    park(vol, geo, 692, 186, 74, 26, RNG(21));
    // 添马公园（金钟）
    park(vol, geo, 450, 240, 30, 10, RNG(22));
    // 九龙公园（尖沙咀）
    park(vol, geo, 560, 470, 40, 40, RNG(23));
    // 西九龙艺术公园
    park(vol, geo, 56, 452, 96, 16, RNG(24));
    // 红磡海滨公园
    park(vol, geo, 820, 448, 40, 12, RNG(25));
  }

  function park(vol, geo, x0, z0, w, d, rng) {
    for (let z = z0; z < z0 + d; z++) for (let x = x0; x < x0 + w; x++) {
      if (x < 0 || z < 0 || x >= geo.SX || z >= geo.SZ) continue;
      const i = x + z * geo.SX;
      if (!geo.land[i]) continue;
      if (geo.use[i] === USE.BUILDING || geo.use[i] === USE.ROAD) continue;
      geo.use[i] = USE.PARK;
      const y = geo.height[i];
      const path = (x % 17 < 2) || (z % 13 < 2);
      vol.set(x, y, z, path ? M.PAVE_L : M.PARK);
      if (!path && rng() < 0.055) B.tree(vol, x, y + 1, z, 2 + ((rng() * 3) | 0), rng() < 0.4 ? M.TREE_D : M.TREE);
      if (path && rng() < 0.02) B.lamp(vol, x, y + 1, z, 3, 0);
    }
  }

  // ------------------------------------------------------- 码头 / 吊机 / 舢舨
  function harbourWorks(vol, geo) {
    const rng = RNG(3131);
    // 北角货运码头 + 龙门吊
    cargoPier(vol, geo, 880, 'hk', rng);
    // 土瓜湾货物装卸区
    cargoPier(vol, geo, 960, 'kl', rng);
    // 湾仔码头 / 北角渡轮码头 / 红磡码头
    for (const [x, side] of [[560, 'hk'], [806, 'hk'], [742, 'kl'], [188, 'kl']]) {
      const shore = side === 'hk' ? geo.hkShore[x] : geo.klShore[x];
      const sgn = side === 'hk' ? 1 : -1;
      const y = W.GROUND;
      B.pier(vol, x, side === 'hk' ? shore : shore - 14, 14, 14, y, M.PROMENADE, M.CONCRETE_D);
      vol.fillBox(x + 2, y + 1, (side === 'hk' ? shore + 3 : shore - 11), 10, 4, 8, M.FERRY_WHITE);
      B.ring(vol, x + 2, y + 4, (side === 'hk' ? shore + 3 : shore - 11), 10, 8, M.FERRY_GREEN, 1);
      vol.fillBox(x + 2, y + 5, (side === 'hk' ? shore + 3 : shore - 11), 10, 1, 8, M.FERRY_GREEN);
    }
    // 避风塘舢舨与游艇
    for (let i = 0; i < 90; i++) {
      const x = 644 + ((rng() * 110) | 0), z = 216 + ((rng() * 24) | 0);
      if (geo.land[x + z * geo.SX]) continue;
      const L = 2 + ((rng() * 3) | 0);
      const y = W.SEA;
      vol.fillBox(x, y, z, L, 1, 2, rng() < 0.6 ? M.FERRY_WHITE : M.WOOD);
      vol.set(x + 1, y + 1, z, M.DECK);
      if (rng() < 0.5) vol.fillBox(x + 1, y + 1, z + 1, 1, 5, 1, M.STEEL);
      else vol.fillBox(x, y + 1, z, 2, 1, 2, M.HULL_BLUE);
    }
  }

  function cargoPier(vol, geo, x0, side, rng) {
    const shore = side === 'hk' ? geo.hkShore[x0] : geo.klShore[x0];
    const sgn = side === 'hk' ? 1 : -1;
    const y = W.GROUND;
    const z0 = side === 'hk' ? shore : shore - 22;
    vol.fillBox(x0, y - 1, z0, 46, 1, 22, M.CONCRETE_D);
    for (let i = 0; i < 46; i += 4) for (let j = 0; j < 22; j += 4)
      for (let yy = y - 2; yy >= W.SEA - 2; yy--) vol.set(x0 + i, yy, z0 + j, M.CONCRETE_D);
    // 货柜堆场
    const cont = [M.CONT_RED, M.CONT_BLUE, M.CONT_GREEN, M.CONT_YELL];
    for (let i = 0; i < 30; i++) {
      const cx = x0 + 2 + ((rng() * 40) | 0), cz = z0 + 2 + ((rng() * 16) | 0);
      const stack = 1 + ((rng() * 3) | 0);
      for (let s = 0; s < stack; s++) vol.fillBox(cx, y + s, cz, 3, 1, 2, cont[(rng() * 4) | 0]);
    }
    // 两台龙门吊
    for (const gx of [x0 + 8, x0 + 30]) {
      const gz = z0 + (sgn > 0 ? 14 : 4);
      for (const dz of [0, 8]) {
        vol.fillBox(gx, y, gz + dz - 4, 2, 16, 2, M.CRANE_O);
        vol.fillBox(gx + 8, y, gz + dz - 4, 2, 16, 2, M.CRANE_O);
      }
      vol.fillBox(gx, y + 16, gz - 4, 10, 2, 10, M.CRANE_O);
      vol.fillBox(gx + 2, y + 18, gz - 2, 6, 3, 6, M.STEEL_D);
      B.line(vol, gx + 4, y + 18, gz - 4, gx + 4, y + 22, gz + 10, M.CRANE_O, 1);
      vol.set(gx + 5, y + 21, gz + 2, M.BEACON_R);
    }
  }

  // -------------------------------------------------------- 中环空中连廊系统
  function footbridges(vol, geo) {
    const y = W.GROUND + 4;
    const spans = [
      [236, 250, 216, 244], [268, 282, 214, 240], [300, 314, 212, 236], [332, 346, 208, 232],
      [364, 378, 206, 228], [396, 410, 204, 226], [430, 444, 208, 230], [470, 484, 210, 236],
      [516, 530, 206, 232], [560, 574, 202, 228],
    ];
    for (const [x0, x1, z0, z1] of spans) {
      const w = x1 - x0;
      // 沿 z 方向的连廊
      for (let z = z0; z <= z1; z++) {
        vol.fillBox(x0, y, z, 3, 1, 1, M.CONCRETE_L);
        vol.set(x0, y + 1, z, M.GLASS_WHITE);
        vol.set(x0 + 2, y + 1, z, M.GLASS_WHITE);
        vol.fillBox(x0, y + 2, z, 3, 1, 1, M.WHITE_PANEL);          // 有盖行人天桥
        if (z % 12 === 0) { for (let yy = W.GROUND; yy < y; yy++) vol.set(x0 + 1, yy, z, M.CONCRETE_D); }
      }
      // 与横向街道相接的一段
      for (let x = x0; x < x0 + w; x++) {
        vol.fillBox(x, y, z0, 1, 1, 3, M.CONCRETE_L);
        vol.set(x, y + 1, z0, M.GLASS_WHITE);
        vol.set(x, y + 1, z0 + 2, M.GLASS_WHITE);
      }
    }
    // 尖沙咀连廊
    for (let z = 452; z < 486; z++) {
      vol.fillBox(596, y, z, 3, 1, 1, M.CONCRETE_L);
      vol.set(596, y + 1, z, M.GLASS_WHITE); vol.set(598, y + 1, z, M.GLASS_WHITE);
      vol.fillBox(596, y + 2, z, 3, 1, 1, M.WHITE_PANEL);
      if (z % 12 === 0) for (let yy = W.GROUND; yy < y; yy++) vol.set(597, yy, z, M.CONCRETE_D);
    }
  }

  // ------------------------------------------------------- 弥敦道霓虹峡谷加密
  function neonCanyon(vol, geo) {
    const rng = RNG(5150);
    const neon = [M.NEON_PINK, M.NEON_CYAN, M.NEON_YELL, M.NEON_GREEN, M.NEON_RED, M.NEON_BLUE, M.NEON_WHITE];
    // 弥敦道两侧（x=603 / 610）密集悬挂招牌
    for (let z = 456; z < 616; z += 2) {
      for (const [x, dir] of [[602, 1], [611, -1]]) {
        const y = W.GROUND + 2 + ((rng() * 8) | 0);
        if (rng() < 0.72) {
          const len = 2 + ((rng() * 4) | 0), hgt = 1 + ((rng() * 3) | 0);
          B.neonSign(vol, x, y, z, dir, 0, len, hgt, neon[(rng() * neon.length) | 0], 2);
        }
        if (rng() < 0.3) {
          const y2 = W.GROUND + 10 + ((rng() * 10) | 0);
          B.neonSign(vol, x, y2, z, dir, 0, 2 + ((rng() * 3) | 0), 3 + ((rng() * 4) | 0), neon[(rng() * neon.length) | 0], 2);
        }
      }
    }
    // 湾仔 / 铜锣湾 / 油麻地的横向招牌
    for (const [x0, x1, zBase, sgn] of [[470, 620, 26, -1], [630, 760, 26, -1], [300, 400, 30, 1]]) {
      for (let x = x0; x < x1; x += 3) {
        const shore = sgn < 0 ? geo.hkShore[x] : geo.klShore[x];
        const z = shore + sgn * zBase;
        if (z < 1 || z >= geo.SZ - 1) continue;
        const y = W.GROUND + 2 + ((rng() * 6) | 0);
        if (rng() < 0.5) B.neonSign(vol, x, y, z, 0, sgn, 3 + ((rng() * 3) | 0), 1 + ((rng() * 2) | 0), neon[(rng() * neon.length) | 0], 2);
      }
    }
  }

  // ---------------------------------------------------------------- 电车轨道
  function tramLine(vol, geo) {
    for (let x = 20; x < 900; x++) {
      const z = geo.hkShore[x] - 28;
      const i = x + z * geo.SX;
      if (!geo.land[i]) continue;
      const y = geo.height[i];
      if (y > W.GROUND + 4) continue;
      if (x % 2 === 0) { vol.set(x, y, z - 1, M.TRAM_RAIL); vol.set(x, y, z + 1, M.TRAM_RAIL); }
    }
  }

  // ------------------------------------------------- 半山 / 山腰台地住宅群
  // 香港的地形性格：平地用完了就往山上堆。地块先削平成混凝土台地（挡土墙），
  // 再在台地上立起窄面宽的高层住宅——这就是半山与九龙山腰那道"楼墙"。
  function hillside(vol, geo, stats) {
    const rng = RNG(60607);
    let built = 0;
    const sides = [
      { sgn: -1, shore: geo.hkShore, districts: HK_DISTRICTS, kMin: 76, kMax: 168, hLo: 70, hHi: 170 },
      { sgn: 1, shore: geo.klShore, districts: KL_DISTRICTS, kMin: 132, kMax: 232, hLo: 55, hHi: 140 },
    ];
    for (const S of sides) {
      for (let x = 6; x < geo.SX - 14; x += 12) {
        for (let k = S.kMin; k < S.kMax; k += 13) {
          const w = 4 + ((rng() * 5) | 0), dd = 5 + ((rng() * 4) | 0);
          const cxi = clamp(x + (w >> 1), 0, geo.SX - 1);
          const z0 = Math.round(S.sgn > 0 ? S.shore[cxi] + k : S.shore[cxi] - k - dd);
          if (z0 < 3 || z0 + dd >= geo.SZ - 3) continue;
          if (!areaFree(geo, x, z0, w, dd)) continue;
          let lo = 999, hi = -999, ok = true;
          for (let zz = z0; zz < z0 + dd && ok; zz++) {
            for (let xx = x; xx < x + w; xx++) {
              const i = xx + zz * geo.SX;
              if (!geo.land[i]) { ok = false; break; }
              const h = geo.height[i];
              if (h < lo) lo = h;
              if (h > hi) hi = h;
            }
          }
          if (!ok) continue;
          if (hi < W.GROUND + 4 || hi > W.GROUND + 52) continue;   // 只在山坡带上建
          if (hi - lo > 10) continue;                               // 太陡：留给山林
          if (rng() < 0.22) continue;                               // 留出山径与绿地缺口

          // 台地 + 挡土墙
          vol.fillBox(x - 1, lo - 3, z0 - 1, w + 2, Math.max(1, hi - lo + 3), dd + 2, M.CONCRETE_D);
          vol.fillBox(x - 1, hi, z0 - 1, w + 2, 1, dd + 2, M.PAVE_D);
          const d = districtAt(S.districts, x);
          const hm = lerp(S.hLo, S.hHi, Math.pow(rng(), 0.75));
          const hv = Math.max(4, Math.round(hm / W.VOXEL));
          const mats = d.mats || ['CONCRETE_L', 'STUCCO_W'];
          let res = null;
          if (HKV.A) {
            const arch = HKV.A.choose(rng, {
              w, d: dd, hm, ri: 9, ac: 0.22, sign: 0.05, hMax: d.hMax || 150, hill: true,
            });
            res = HKV.A.build(vol, arch, {
              x, z: z0, w, d: dd, base: hi, h: hv, rng, faceZ: -S.sgn,
              mat: matOf(mats[(rng() * mats.length) | 0]), win: matOf(d.win || 'GLASS_WHITE'),
              trim: M.CONCRETE_L, ac: 0.22, sign: 0.05, district: d.name,
            });
            if (res) res.arch = arch;
          }
          if (!res) {
            res = B.tower(vol, {
              x, z: z0, w, d: dd, base: hi, h: hv,
              mat: matOf(mats[(rng() * mats.length) | 0]), win: matOf(d.win || 'GLASS_WHITE'),
              style: rng() < 0.75 ? 'residential' : 'banded', rng, acDensity: 0.2,
              setbacks: 0, crown: rng() < 0.3 ? 'box' : 'flat', trim: M.CONCRETE_L,
            });
            res.arch = 'tower';
          }
          markUsed(geo, x, z0, w, dd, USE.BUILDING);
          LOTS.push({
            x, z: z0, w, d: dd, base: hi, hm, style: 'residential', side: S.sgn > 0 ? 'kl' : 'hk',
            sgn: S.sgn, ri: 9, district: (d.name || '') + ' 山坡', ac: 0.22, sign: 0.05, hill: true,
            arch: res.arch, bx: res.cx, bz: res.cz, bw: res.cw, bd: res.cd, top: res.top,
          });
          built++;

          // 上山的石阶小径
          if (rng() < 0.4) {
            const sx = clamp(x + w + 1, 1, geo.SX - 2);
            for (let s = 0; s < 10; s++) {
              const zz = z0 + S.sgn * (dd + s);
              if (zz < 1 || zz >= geo.SZ - 1) break;
              const i = sx + zz * geo.SX;
              if (!geo.land[i] || geo.use[i] === USE.BUILDING) break;
              vol.set(sx, geo.height[i], zz, M.PAVE_L);
              geo.use[i] = USE.PLAZA;
            }
          }
        }
      }
    }
    if (stats) stats.hillside = built;
    return built;
  }

  function build(vol, geo, stats) {
    paintRoads(vol, geo);
    tramLine(vol, geo);
    fillCity(vol, geo, stats);
    hillside(vol, geo, stats);
    promenades(vol, geo);
    harbourWorks(vol, geo);
    footbridges(vol, geo);
    neonCanyon(vol, geo);
    if (stats) stats.buildings = (stats.buildings || 0) + (stats.hillside || 0);
    return stats;
  }

  HKV.City = {
    build, paintRoads, fillCity, hillside, promenades, harbourWorks, footbridges, neonCanyon,
    ROADNAMES, HK_DISTRICTS, KL_DISTRICTS, LOTS, lots: () => LOTS,
  };

})(typeof window !== 'undefined' ? window : globalThis);
