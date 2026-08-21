/* =============================================================================
 * VOXEL VICTORIA HARBOUR · geo.js
 * 地理底图：维港真实海岸线（港岛北岸 / 九龙南岸 / 铜锣湾避风塘 / 奇力岛）、
 * 太平山—半山地形（带梯级平台）、九龙北山丘、地表材质、岸线距离场。
 *
 * 坐标：+X 东（0..1152 ≈ 西环→鲗鱼涌），+Z 北（0 南=山顶，704 北=九龙腹地）
 * 海平面 y=8，填海地面 y=9，1 voxel = 4 m。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV || (global.HKV = {});
  const { W, M, polyline, fbm, clamp, lerp, smoothstep } = HKV;

  // --------------------------------------------------------------- 海岸线控制点
  // 港岛北岸（z 越大越往北 / 伸入维港）
  const HK_SHORE = [
    [0, 232], [80, 234], [140, 236], [200, 239], [248, 243], [286, 250], [312, 251],
    [345, 245], [400, 241], [450, 243], [468, 249], [492, 266], [516, 270], [545, 254],
    [580, 246], [640, 240], [700, 238], [760, 233], [860, 228], [980, 223], [1152, 217],
  ];
  // 九龙南岸（z 越小越往南 / 伸入维港）
  const KL_SHORE = [
    [0, 472], [60, 463], [120, 453], [180, 447], [240, 444], [300, 441], [355, 437],
    [390, 428], [420, 423], [452, 425], [478, 433], [520, 436], [556, 433], [578, 430],
    [606, 433], [640, 437], [676, 442], [716, 462], [752, 468], [790, 458], [840, 452],
    [920, 449], [1030, 450], [1152, 454],
  ];

  // 港岛山脊高度（voxel；太平山 552m ≈ 138）
  const HK_RIDGE = [
    [0, 62], [90, 96], [150, 122], [205, 138], [252, 128], [305, 110], [372, 96],
    [450, 88], [520, 94], [592, 108], [648, 100], [730, 84], [840, 68], [960, 56], [1152, 46],
  ];
  // 山脊所在 z（南侧）
  const HK_RIDGE_Z = [[0, 34], [200, 48], [420, 40], [640, 44], [900, 32], [1152, 26]];
  // 岸边平地进深（填海区，越大越平坦）
  const HK_FLAT = [
    [0, 26], [120, 30], [200, 40], [260, 52], [320, 58], [380, 54], [430, 48],
    [470, 60], [520, 74], [580, 52], [650, 44], [740, 40], [900, 34], [1152, 30],
  ];

  // 九龙北部山丘（狮子山/笔架山方向，仅露出天际线剪影）
  const KL_RIDGE = [[0, 20], [120, 26], [260, 44], [400, 58], [560, 62], [700, 52], [860, 44], [1000, 40], [1152, 34]];

  function build(opts) {
    opts = opts || {};
    const SX = W.SX, SZ = W.SZ, N = SX * SZ;
    const land = new Uint8Array(N);        // 0 水 1 港岛 2 九龙 3 岛/堤
    const height = new Int16Array(N);      // 地表顶面 y
    const surf = new Uint8Array(N);        // 地表材质
    const use = new Uint8Array(N);         // 用地占用：见 USE
    const shoreDist = new Uint8Array(N);   // 到陆地的距离（水面着色用，单位 voxel，封顶 255）
    const hkShore = new Int16Array(SX), klShore = new Int16Array(SX);

    const G = W.GROUND, SEA = W.SEA;

    // ---------------------------------------------------------------- 岸线数组
    for (let x = 0; x < SX; x++) {
      const wob = (fbm(x * 0.06, 11.3, 3) - 0.5) * 3.2;      // 岸线细碎凹凸
      hkShore[x] = Math.round(polyline(HK_SHORE, x) + wob);
      klShore[x] = Math.round(polyline(KL_SHORE, x) - wob * 0.9);
    }

    // ------------------------------------------------------------ 陆地 / 高度场
    for (let x = 0; x < SX; x++) {
      const zh = hkShore[x], zk = klShore[x];
      const ridge = polyline(HK_RIDGE, x), ridgeZ = polyline(HK_RIDGE_Z, x), flat = polyline(HK_FLAT, x);
      const klRidge = polyline(KL_RIDGE, x);
      for (let z = 0; z < SZ; z++) {
        const i = x + z * SX;
        if (z <= zh) {
          // —— 港岛 ——
          land[i] = 1;
          const flatEnd = zh - flat;                       // 平地南界
          let h;
          if (z >= flatEnd) {
            h = G;                                          // 填海平地
          } else {
            const t = clamp((flatEnd - z) / Math.max(6, flatEnd - ridgeZ), 0, 1);
            const curve = Math.pow(smoothstep(0, 1, t), 0.78);
            h = G + (ridge - G) * curve;
            h += (fbm(x * 0.05, z * 0.05, 4) - 0.5) * (6 + 16 * t);   // 山体起伏
            if (z < ridgeZ) h -= (ridgeZ - z) * 0.35;                 // 越过山脊向南回落
            // 半山：把坡面量化成梯级（香港典型削坡建屋）；高处 8m 台阶，
            // 既是体素美学（块状山体）也让贪心合并把山坡压成大面片。
            h = (t < 0.62) ? Math.round(h / 3) * 3 : Math.round(h / 2) * 2;
          }
          height[i] = Math.max(G, Math.round(h));
        } else if (z >= zk) {
          // —— 九龙 ——
          land[i] = 2;
          const flatEnd = zk + 128;
          let h;
          if (z <= flatEnd) h = G;
          else {
            const t = clamp((z - flatEnd) / Math.max(10, SZ - 40 - flatEnd), 0, 1);
            h = G + (klRidge - G) * Math.pow(t, 1.25) + (fbm(x * 0.045, z * 0.045, 4) - 0.5) * (4 + 14 * t);
            h = (t < 0.5) ? Math.round(h / 3) * 3 : Math.round(h / 2) * 2;
          }
          height[i] = Math.max(G, Math.round(h));
        } else {
          land[i] = 0;
          height[i] = SEA - 3 - Math.round(2 * fbm(x * 0.02, z * 0.02, 2));  // 海床
        }
      }
    }

    // ------------------------------------------------- 铜锣湾避风塘 + 奇力岛 + 防波堤
    // 塘内水域：切入港岛陆地
    for (let x = 636; x < 762; x++) {
      for (let z = 206; z < 244; z++) {
        if (x < 0 || x >= SX) continue;
        const i = x + z * SX;
        const edge = smoothstep(636, 652, x) * smoothstep(762, 746, x) * smoothstep(206, 214, z);
        if (edge > 0.45 && z <= hkShore[x] + 2) { land[i] = 0; height[i] = SEA - 3; }
      }
    }
    // 防波堤（留出船只进出口）
    for (let x = 640; x < 760; x++) {
      if (x > 694 && x < 712) continue;                     // 出入口
      for (let z = 238; z <= 241; z++) {
        const i = x + z * SX;
        land[i] = 3; height[i] = SEA + 2; surf[i] = M.SEAWALL;
      }
    }
    // 奇力岛（香港游艇会）+ 连岛堤道
    for (let x = 676; x < 704; x++) for (let z = 216; z < 232; z++) {
      const dx = (x - 690) / 14, dz = (z - 224) / 8;
      if (dx * dx + dz * dz < 1) { const i = x + z * SX; land[i] = 3; height[i] = G; }
    }
    for (let x = 686; x < 694; x++) for (let z = 208; z < 220; z++) { const i = x + z * SX; if (!land[i]) { land[i] = 3; height[i] = G; } }

    // ---------------------------------------------------------------- 地表材质
    for (let x = 0; x < SX; x++) {
      for (let z = 0; z < SZ; z++) {
        const i = x + z * SX;
        if (surf[i]) continue;
        if (!land[i]) { surf[i] = 0; use[i] = USE.WATER; continue; }
        const h = height[i];
        const hx = height[Math.min(SX - 1, x + 1) + z * SX] - height[Math.max(0, x - 1) + z * SX];
        const hz = height[x + Math.min(SZ - 1, z + 1) * SX] - height[x + Math.max(0, z - 1) * SX];
        const slope = Math.hypot(hx, hz) * 0.5;
        if (h <= G + 1) {
          surf[i] = M.PAVE_L; use[i] = USE.FREE;
        } else if (slope > 3.2) {
          surf[i] = M.ROCK; use[i] = USE.SLOPE;
        } else {
          // 低频斑块（波长 ~80 voxel）：保持大片连续，贪心合并才有效；
          // 体素级的细碎差异交给着色器的 per-voxel 色相扰动完成。
          const n = fbm(x * 0.013, z * 0.013, 2);
          surf[i] = n < 0.44 ? M.SLOPE_D : (n < 0.78 ? M.SLOPE_G : M.ROCK);
          use[i] = USE.SLOPE;
        }
      }
    }

    // ------------------------------------------------------------ 岸线距离场
    // 两遍 chamfer：水面单元到最近陆地的距离（供浅水 / 浪花 / 反射衰减）
    const INF = 255;
    for (let i = 0; i < N; i++) shoreDist[i] = land[i] ? 0 : INF;
    for (let z = 0; z < SZ; z++) for (let x = 0; x < SX; x++) {
      const i = x + z * SX; let d = shoreDist[i];
      if (d === 0) continue;
      if (x > 0) d = Math.min(d, shoreDist[i - 1] + 1);
      if (z > 0) d = Math.min(d, shoreDist[i - SX] + 1);
      if (x > 0 && z > 0) d = Math.min(d, shoreDist[i - SX - 1] + 1);
      if (x < SX - 1 && z > 0) d = Math.min(d, shoreDist[i - SX + 1] + 1);
      shoreDist[i] = Math.min(255, d);
    }
    for (let z = SZ - 1; z >= 0; z--) for (let x = SX - 1; x >= 0; x--) {
      const i = x + z * SX; let d = shoreDist[i];
      if (d === 0) continue;
      if (x < SX - 1) d = Math.min(d, shoreDist[i + 1] + 1);
      if (z < SZ - 1) d = Math.min(d, shoreDist[i + SX] + 1);
      if (x < SX - 1 && z < SZ - 1) d = Math.min(d, shoreDist[i + SX + 1] + 1);
      if (x > 0 && z < SZ - 1) d = Math.min(d, shoreDist[i + SX - 1] + 1);
      shoreDist[i] = Math.min(255, d);
    }

    const geo = {
      SX, SZ, land, height, surf, use, shoreDist, hkShore, klShore,
      idx: (x, z) => x + z * SX,
      isLand: (x, z) => (x < 0 || z < 0 || x >= SX || z >= SZ) ? 0 : land[x + z * SX],
      groundY: (x, z) => {
        if (x < 0 || z < 0 || x >= SX || z >= SZ) return W.SEA;
        return height[x + z * SX];
      },
      shoreZ: (x, side) => (side === 'hk' ? hkShore[clamp(x | 0, 0, SX - 1)] : klShore[clamp(x | 0, 0, SX - 1)]),
    };
    return geo;
  }

  // 用地类型
  const USE = { FREE: 0, ROAD: 1, BUILDING: 2, PARK: 3, PROMENADE: 4, PIER: 5, WATER: 6, SLOPE: 7, PLAZA: 8, RAIL: 9 };

  // ---------------------------------------------------------- 把地形写进体素体
  function paintTerrain(vol, geo) {
    const { SX, SZ, land, height, surf } = geo;
    const SEA = W.SEA, G = W.GROUND;
    for (let z = 0; z < SZ; z++) {
      for (let x = 0; x < SX; x++) {
        const i = x + z * SX;
        if (!land[i]) continue;
        const h = height[i];
        const top = surf[i] || M.PAVE_L;
        // 顶面 + 一层垫层；侧壁按邻居高差补齐（既不漏光也不浪费体素）
        vol.set(x, h, z, top);
        const sub = h > G + 2 ? M.ROCK : M.CONCRETE_D;
        vol.set(x, h - 1, z, sub);
        let need = false;
        if (geo.isLand(x - 1, z) === 0 || geo.isLand(x + 1, z) === 0 || geo.isLand(x, z - 1) === 0 || geo.isLand(x, z + 1) === 0) need = true;
        if (need) {
          for (let y = h - 2; y >= SEA - 3; y--) vol.set(x, y, z, y >= SEA - 1 ? M.SEAWALL : M.CONCRETE_D);
        } else {
          let minN = Math.min(h, geo.groundY(x - 1, z), geo.groundY(x + 1, z), geo.groundY(x, z - 1), geo.groundY(x, z + 1));
          for (let y = h - 2; y >= minN - 1 && y >= 0; y--) vol.set(x, y, z, h > G + 2 ? M.ROCK : M.CONCRETE_D);
        }
      }
    }
  }

  HKV.Geo = { build, paintTerrain, USE, HK_SHORE, KL_SHORE };

})(typeof window !== 'undefined' ? window : globalThis);
