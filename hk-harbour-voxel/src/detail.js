/* =============================================================================
 * VOXEL VICTORIA HARBOUR · detail.js
 * 微观加细通道（在地形 / 城市 / 地标之后运行）：把"体素方盒"变成"香港"。
 *   天台屋与水箱林 · 竹棚 · 晾衣杆 · 骑楼雨棚 · 招牌灯箱 · 电车架空线 ·
 *   斑马线与交通灯 · 铁栏与行人天桥梯级 · 庙街夜市摊档 · 码头系船柱与轮胎 ·
 *   街道家具（电箱 / 邮筒 / 垃圾桶 / 报摊 / 单车）· 天台花园
 * 全部使用 setIfEmpty 叠加，不破坏既有结构；统计写入 stats.props。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const { W, M, B, RNG, clamp } = HKV;
  const USE = HKV.Geo.USE;

  let props = 0;
  const put = (v, x, y, z, m) => {
    if (x < 0 || y < 1 || z < 0 || x >= W.SX || y >= W.SY || z >= W.SZ) return;
    if (v.get(x, y, z) === 0) { v.set(x, y, z, m); props++; }
  };

  // ------------------------------------------------------------------ 天台屋
  // 香港旧楼的天台是另一座城市：铁皮屋、水箱、晾衣绳、盆栽、鸽笼。
  function rooftopSlums(vol, lots, rng) {
    for (const L of lots) {
      if (L.hm > 80 || L.bw < 3 || L.bd < 3) continue;
      const chance = L.ac >= 0.16 ? 0.72 : 0.3;
      if (rng() > chance) continue;
      const y = L.top;
      const n = 1 + ((rng() * 3) | 0);
      for (let i = 0; i < n; i++) {
        const w = 2 + ((rng() * 2) | 0), d = 2 + ((rng() * 2) | 0);
        const x = L.bx + 1 + ((rng() * Math.max(1, L.bw - w - 1)) | 0);
        const z = L.bz + 1 + ((rng() * Math.max(1, L.bd - d - 1)) | 0);
        const h = 1 + (rng() < 0.35 ? 1 : 0);
        const wall = rng() < 0.45 ? M.RUST : (rng() < 0.5 ? M.STUCCO_Y : M.WOOD);
        for (let zz = 0; zz < d; zz++) for (let xx = 0; xx < w; xx++) for (let yy = 0; yy < h; yy++) {
          put(vol, x + xx, y + yy, z + zz, wall);
        }
        // 铁皮屋顶（略微外伸）
        for (let zz = -1; zz <= d; zz++) for (let xx = -1; xx <= w; xx++) put(vol, x + xx, y + h, z + zz, M.RUST);
        if (rng() < 0.4) put(vol, x, y + h + 1, z, M.TANK);
      }
      // 晾衣绳（两根竿之间的彩色衣物）
      if (rng() < 0.6 && L.bw > 4) {
        const zz = L.bz + 1 + ((rng() * Math.max(1, L.bd - 2)) | 0);
        const cy = y + 2;
        put(vol, L.bx + 1, cy, zz, M.STEEL_D);
        put(vol, L.bx + L.bw - 2, cy, zz, M.STEEL_D);
        const cloth = [M.FERRY_WHITE, M.CONT_RED, M.CONT_BLUE, M.CONT_YELL, M.STUCCO_P];
        for (let i = 2; i < L.bw - 2; i++) if (rng() < 0.55) put(vol, L.bx + i, cy - 1, zz, cloth[(rng() * cloth.length) | 0]);
      }
      // 盆栽 / 鸽笼
      if (rng() < 0.35) put(vol, L.bx + L.bw - 2, y, L.bz + 1, M.TREE);
      if (rng() < 0.2) { put(vol, L.bx + 1, y, L.bz + L.bd - 2, M.WOOD); put(vol, L.bx + 1, y + 1, L.bz + L.bd - 2, M.STEEL); }
    }
  }

  // -------------------------------------------------------------------- 竹棚
  // 维修中的楼宇：外面裹一层竹棚 + 绿色安全网，香港街头四季常见。
  function bambooScaffold(vol, lots, rng) {
    for (const L of lots) {
      if (rng() > 0.045) continue;
      if (L.hm > 120 || L.bw < 4) continue;
      const face = L.sgn > 0 ? L.bz - 1 : L.bz + L.bd;         // 朝维港那一面
      const hTop = Math.min(L.top - 1, L.base + Math.round(L.hm / W.VOXEL));
      for (let y = L.base + 1; y <= hTop; y++) {
        for (let i = 0; i < L.bw; i++) {
          // 立杆（每 2 格）+ 横杆（每 3 层）+ 绿网
          const vertical = i % 2 === 0;
          const horizontal = (y - L.base) % 3 === 0;
          if (vertical || horizontal) put(vol, L.bx + i, y, face, M.WOOD);
          else if (rng() < 0.5) put(vol, L.bx + i, y, face, M.SLOPE_G);
        }
      }
      // 顶部工作平台
      for (let i = 0; i < L.bw; i++) put(vol, L.bx + i, hTop + 1, face, M.WOOD);
    }
  }

  // ------------------------------------------------------ 晾衣杆 / 外挂招牌
  function facadeLife(vol, lots, rng) {
    for (const L of lots) {
      if (L.ac < 0.12) continue;                                // 只在旧区
      const face = L.sgn > 0 ? L.bz - 1 : L.bz + L.bd;
      const hv = Math.round(L.hm / W.VOXEL);
      const cloth = [M.FERRY_WHITE, M.CONT_RED, M.CONT_BLUE, M.CONT_YELL, M.STUCCO_P, M.SAIL_RED];
      for (let y = L.base + 3; y < L.base + hv - 1; y += 2) {
        for (let i = 1; i < L.bw - 1; i++) {
          if (rng() < 0.14) {
            put(vol, L.bx + i, y, face, M.STEEL_D);             // 竹晾衣杆
            if (rng() < 0.7) put(vol, L.bx + i, y - 1, face, cloth[(rng() * cloth.length) | 0]);
          }
        }
      }
      // 骑楼雨棚（贴地一层，朝街伸出）
      if (L.sign > 0.2 && rng() < 0.7) {
        const dz = L.sgn > 0 ? -1 : 1;
        const zz = L.sgn > 0 ? L.bz - 1 : L.bz + L.bd;
        const awn = rng() < 0.4 ? M.CONT_GREEN : rng() < 0.5 ? M.CONT_RED : M.SIGN_DARK;
        for (let i = 0; i < L.bw; i++) {
          put(vol, L.bx + i, L.base + 2, zz, awn);
          if (rng() < 0.6) put(vol, L.bx + i, L.base + 2, zz + dz, awn);
        }
      }
    }
  }

  // ------------------------------------------------------------ 天台花园
  function roofGardens(vol, lots, rng) {
    for (const L of lots) {
      if (L.hm < 90 || L.bw < 6 || L.bd < 6) continue;
      if (rng() > 0.16) continue;
      const y = L.top;
      for (let z = L.bz + 1; z < L.bz + L.bd - 1; z++) {
        for (let x = L.bx + 1; x < L.bx + L.bw - 1; x++) {
          if (rng() < 0.5) put(vol, x, y, z, rng() < 0.75 ? M.PARK : M.PAVE_L);
        }
      }
      for (let i = 0; i < 3; i++) {
        const tx = L.bx + 1 + ((rng() * (L.bw - 2)) | 0), tz = L.bz + 1 + ((rng() * (L.bd - 2)) | 0);
        put(vol, tx, y + 1, tz, M.TRUNK); put(vol, tx, y + 2, tz, M.TREE);
      }
    }
  }

  // -------------------------------------------------------- 电车架空线（港岛）
  function tramCatenary(vol, geo) {
    for (const k of [18, 52]) {
      for (let x = 24; x < 900; x++) {
        const z = geo.hkShore[x] - k;
        if (z < 2 || z >= geo.SZ - 2) continue;
        const i = x + z * geo.SX;
        if (!geo.land[i]) continue;
        const y = geo.height[i];
        if (y > W.GROUND + 4) continue;
        // 架空线：贴着 y+3 一路拉过去
        put(vol, x, y + 3, z, M.STEEL_D);
        // 每 9 格一根支柱（立在人行道侧）
        if (x % 9 === 0) {
          const pz = z + 3;
          const pi = x + pz * geo.SX;
          if (pz > 0 && pz < geo.SZ && geo.land[pi]) {
            const py = geo.height[pi];
            for (let yy = py + 1; yy <= py + 4; yy++) put(vol, x, yy, pz, M.STEEL_D);
            for (let dz = 1; dz <= 3; dz++) put(vol, x, py + 4, pz - dz, M.STEEL_D);
          }
        }
      }
    }
  }

  // ------------------------------------------- 路口：斑马线 / 交通灯 / 铁栏
  function crossings(vol, geo, rng) {
    const specs = [['hk', -1, [4, 18, 34, 52]], ['kl', 1, [5, 20, 38, 58, 80, 104]]];
    for (const [side, sgn, ks] of specs) {
      const shore = side === 'hk' ? geo.hkShore : geo.klShore;
      for (let bx = 26; bx < geo.SX - 26; bx += 26) {
        for (const k of ks) {
          const zc = shore[bx] + sgn * k;
          if (zc < 3 || zc >= geo.SZ - 3) continue;
          const i0 = bx + zc * geo.SX;
          if (!geo.land[i0]) continue;
          const y = geo.height[i0];
          if (y > W.GROUND + 5) continue;
          // 斑马线（横过主干道）
          for (let dz = -2; dz <= 2; dz++) {
            const z = zc + dz;
            if (z < 0 || z >= geo.SZ) continue;
            for (const dx of [-5, -4, 5, 6]) {
              const x = bx + dx;
              if (x < 0 || x >= geo.SX) continue;
              const ii = x + z * geo.SX;
              if (geo.use[ii] !== USE.ROAD) continue;
              vol.set(x, geo.height[ii], z, M.MARK_W);
            }
          }
          // 四角交通灯 + 行人铁栏
          for (const [dx, dz] of [[-6, 3], [7, 3], [-6, -3], [7, -3]]) {
            const x = clamp(bx + dx, 1, geo.SX - 2), z = clamp(zc + dz, 1, geo.SZ - 2);
            const ii = x + z * geo.SX;
            if (!geo.land[ii] || geo.use[ii] === USE.BUILDING) continue;
            const yy = geo.height[ii];
            put(vol, x, yy + 1, z, M.STEEL_D);
            put(vol, x, yy + 2, z, M.STEEL_D);
            put(vol, x, yy + 3, z, rng() < 0.5 ? M.NEON_RED : M.NEON_GREEN);
            for (let t = 1; t <= 3; t++) put(vol, x + (dx > 0 ? t : -t), yy + 1, z, M.STEEL);
          }
        }
      }
    }
  }

  // ---------------------------------------------------- 庙街 / 女人街 夜市
  function nightMarket(vol, geo, x0, x1, zBase, sgn, rng) {
    const tops = [M.CONT_RED, M.CONT_BLUE, M.CONT_GREEN, M.CONT_YELL, M.FERRY_WHITE];
    const shore = sgn > 0 ? geo.klShore : geo.hkShore;
    for (let x = x0; x < x1; x += 3) {
      const z = shore[clamp(x, 0, geo.SX - 1)] + sgn * zBase;
      for (const dz of [-1, 1]) {
        const zz = z + dz * 2;
        if (zz < 1 || zz >= geo.SZ - 1) continue;
        const i = x + zz * geo.SX;
        if (!geo.land[i] || geo.use[i] === USE.BUILDING) continue;
        const y = geo.height[i];
        if (y > W.GROUND + 4) continue;
        // 摊档：桌板 + 篷顶 + 货物
        put(vol, x, y + 1, zz, M.WOOD);
        put(vol, x + 1, y + 1, zz, M.WOOD);
        const top = tops[(rng() * tops.length) | 0];
        for (let i2 = -1; i2 <= 2; i2++) put(vol, x + i2, y + 3, zz, top);
        put(vol, x, y + 2, zz, M.STEEL_D);
        if (rng() < 0.5) put(vol, x + 1, y + 2, zz, [M.CONT_RED, M.CONT_YELL, M.TREE, M.SAIL_RED][(rng() * 4) | 0]);
        if (rng() < 0.35) put(vol, x + 1, y + 4, zz, M.LAMP);       // 摊档灯泡
      }
    }
  }

  // -------------------------------------------------------- 海滨 / 码头家具
  function waterfrontProps(vol, geo, rng) {
    for (const side of ['hk', 'kl']) {
      const shore = side === 'hk' ? geo.hkShore : geo.klShore;
      const sgn = side === 'hk' ? 1 : -1;                        // 朝海方向
      for (let x = 6; x < geo.SX - 6; x++) {
        const z = shore[x];
        if (z < 2 || z >= geo.SZ - 2) continue;
        const i = x + z * geo.SX;
        if (!geo.land[i]) continue;
        const y = geo.height[i];
        if (y > W.GROUND + 3) continue;
        // 系船柱 + 旧轮胎（挂在海堤上）
        if (x % 7 === 0) put(vol, x, y + 1, z, M.STEEL_D);
        if (x % 13 === 4) put(vol, x, y, z + sgn, M.HULL_BLACK);
        // 望远镜 / 垃圾桶 / 长椅（沿长廊）
        if (x % 23 === 5) { put(vol, x, y + 1, z - sgn, M.STEEL); put(vol, x, y + 2, z - sgn, M.SIGN_DARK); }
        if (x % 17 === 9) put(vol, x, y + 1, z - sgn, M.EQUIP);
      }
    }
  }

  // ------------------------------------------------------------ 街道家具
  function streetFurniture(vol, geo, rng) {
    const specs = [['hk', -1, [4, 18, 34, 52]], ['kl', 1, [5, 20, 38, 58, 80, 104, 126]]];
    for (const [side, sgn, ks] of specs) {
      const shore = side === 'hk' ? geo.hkShore : geo.klShore;
      for (const k of ks) {
        for (let x = 8; x < geo.SX - 8; x++) {
          const z = shore[x] + sgn * (k + 3);
          if (z < 2 || z >= geo.SZ - 2) continue;
          const i = x + z * geo.SX;
          if (!geo.land[i] || geo.use[i] === USE.BUILDING) continue;
          const y = geo.height[i];
          if (y > W.GROUND + 5) continue;
          const r = (x * 37 + k * 11) % 100;
          if (r < 3) { put(vol, x, y + 1, z, M.SIGN_DARK); put(vol, x, y + 2, z, M.STEEL_D); }         // 电箱
          else if (r < 5) { put(vol, x, y + 1, z, M.FLAG_RED); }                                        // 邮筒
          else if (r < 8) { put(vol, x, y + 1, z, M.EQUIP); }                                           // 垃圾桶
          else if (r < 11) {                                                                            // 巴士站 / 候车亭
            put(vol, x, y + 1, z, M.STEEL_D); put(vol, x, y + 2, z, M.STEEL_D);
            for (let i2 = 0; i2 < 3; i2++) put(vol, x + i2, y + 3, z, M.GLASS_WHITE);
            put(vol, x + 1, y + 2, z, M.NEON_WHITE);
          }
          else if (r < 14) { put(vol, x, y + 1, z, M.WOOD); }                                            // 报摊 / 长椅
          else if (r < 16) { put(vol, x, y + 1, z, M.CAR_D); }                                           // 单车
        }
      }
    }
  }

  // ------------------------------------------------- 半山扶手电梯（中环）
  function midLevelsEscalator(vol, geo) {
    const x = 362;
    let z = 206;
    while (z > 150) {
      const i = x + z * geo.SX;
      if (!geo.land[i]) break;
      const y = geo.height[i];
      // 梯身 + 顶棚
      for (let w = 0; w < 3; w++) {
        vol.set(x + w, y + 1, z, M.CONCRETE_L);
        put(vol, x + w, y + 4, z, M.WHITE_PANEL);
      }
      put(vol, x, y + 2, z, M.GLASS_WHITE);
      put(vol, x + 2, y + 2, z, M.GLASS_WHITE);
      put(vol, x, y + 3, z, M.GLASS_WHITE);
      put(vol, x + 2, y + 3, z, M.GLASS_WHITE);
      if (z % 6 === 0) for (let yy = y; yy < y + 1; yy++) put(vol, x + 1, yy, z, M.CONCRETE_D);
      z--;
    }
  }

  // ---------------------------------------------------------------- 入口
  function build(vol, geo, stats) {
    props = 0;
    const rng = RNG(99173);
    const lots = (HKV.City && HKV.City.lots) ? HKV.City.lots() : [];
    rooftopSlums(vol, lots, rng);
    bambooScaffold(vol, lots, rng);
    facadeLife(vol, lots, rng);
    roofGardens(vol, lots, rng);
    tramCatenary(vol, geo);
    crossings(vol, geo, rng);
    // 庙街（油麻地）· 女人街（旺角以南）· 湾仔太原街 · 铜锣湾渡船街
    nightMarket(vol, geo, 306, 392, 48, 1, rng);
    nightMarket(vol, geo, 560, 660, 92, 1, rng);
    nightMarket(vol, geo, 470, 560, 40, -1, rng);
    nightMarket(vol, geo, 640, 720, 40, -1, rng);
    waterfrontProps(vol, geo, rng);
    streetFurniture(vol, geo, rng);
    midLevelsEscalator(vol, geo);
    if (stats) stats.props = props;
    return props;
  }

  HKV.Detail = { build };

})(typeof window !== 'undefined' ? window : globalThis);
