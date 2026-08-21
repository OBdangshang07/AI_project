/* =============================================================================
 * VOXEL VICTORIA HARBOUR · extra.js
 * 追加地标（东区 / 花园道 / 铜锣湾 / 红磡）：把原本缺席的天际线与城市骨架补齐。
 *   港岛东中心 · 太古坊 · 东区走廊高架 · 山顶缆车 · 中环街市 ·
 *   香港中央图书馆 · 崇光百货 · 香港理工大学
 * 依赖 landmarks.js 已注册的 HKV.Landmarks.add（本文件必须在其后加载）。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const { W, M } = HKV;
  const add = HKV.Landmarks.add;
  const V = (m) => Math.round(m / W.VOXEL);

  // ---------------------------------------------------------------- 港岛东
  add({
    id: 'one-island-east', zh: '港岛东中心', en: 'One Island East', hm: 298, yr: 2008, dist: '鲗鱼涌',
    desc: '港岛东最高的写字楼，深色玻璃塔身与斜切冠部，是维港东段天际线的收束点。',
    rect: [988, 190, 26, 26], anchor: [1001, 203],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(298), cx = 1001, cz = 203;
      // 裙楼
      v.fillBox(990, y0, 192, 22, 6, 22, M.CONCRETE_L);
      B.ring(v, 990, y0 + 5, 192, 22, 22, M.GLASS_WHITE, 1);
      // 塔身：18x18 深玻，四角削角，竖向银色鳍片
      const bh = h - 12;
      v.fillBox(cx - 9, y0 + 6, cz - 9, 18, bh, 18, M.GLASS_DARK);
      for (let i = 0; i < 2; i++) {
        const k = 2 - i;
        for (const [ox, oz] of [[0, 0], [18 - k, 0], [0, 18 - k], [18 - k, 18 - k]]) {
          v.fillBox(cx - 9 + ox, y0 + 6, cz - 9 + oz, k, bh, k, 0);
        }
      }
      B.ribFacade(v, cx - 9, cz - 9, 18, 18, y0 + 6, bh, 4, M.GLASS_SILVER);
      for (let y = y0 + 14; y < y0 + 6 + bh; y += 14) B.ring(v, cx - 9, y, cz - 9, 18, 18, M.WHITE_PANEL, 1);
      // 冠部：斜切 + 桅杆
      let yy = y0 + 6 + bh, ww = 18, xx = cx - 9, zz = cz - 9;
      for (let s = 0; s < 4; s++) {
        v.fillBox(xx, yy, zz, ww, 2, ww, M.GLASS_DARK);
        yy += 2; xx += 1; zz += 1; ww -= 2;
      }
      v.fillBox(cx - 1, yy, cz - 1, 3, 3, 3, M.STEEL);
      v.fillBox(cx, yy + 3, cz, 1, 7, 1, M.STEEL_D);
      v.set(cx, yy + 10, cz, M.BEACON_R);
      B.roofSign(v, cx - 6, yy + 1, cz - 10, 12, 3, -1, M.NEON_CYAN);
      return { top: yy + 10 };
    },
  });

  add({
    id: 'taikoo-place', zh: '太古坊', en: 'Taikoo Place', hm: 220, yr: 1997, dist: '鲗鱼涌',
    desc: '旧糖厂与船坞改建的商业群落，几栋玻璃塔围着中庭花园，日夜都有通勤人流。',
    rect: [1040, 176, 60, 32], anchor: [1070, 192],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 共享裙楼平台 + 中庭
      v.fillBox(1040, y0, 176, 60, 4, 32, M.CONCRETE_M);
      v.fillBox(1058, y0 + 4, 188, 24, 1, 12, M.PAVE_L);
      for (let i = 0; i < 10; i++) {
        const tx = 1060 + ((rng() * 20) | 0), tz = 189 + ((rng() * 10) | 0);
        B.tree(v, tx, y0 + 5, tz, 2 + ((rng() * 2) | 0), M.TREE);
      }
      const specs = [
        [1042, 178, 16, 16, 220, M.GLASS_TEAL], [1062, 178, 14, 14, 175, M.GLASS_SILVER],
        [1080, 178, 16, 14, 195, M.GLASS_DARK], [1042, 196, 14, 10, 130, M.CONCRETE_L],
        [1078, 196, 18, 10, 150, M.GLASS_BLUE],
      ];
      let top = y0;
      for (const [x, z, w, d, hm, mat] of specs) {
        const h = V(hm);
        B.tower(v, {
          x, z, w, d, base: y0 + 4, h: h - 4, mat, win: M.GLASS_WHITE, rng,
          style: rng() < 0.5 ? 'glass' : 'ribbed', setbacks: 0, cornerCut: rng() < 0.5 ? 0.25 : 0,
          crown: hm > 190 ? 'stepped' : 'box', trim: M.WHITE_PANEL, helipad: hm > 200,
        });
        top = Math.max(top, y0 + h + 4);
      }
      return { top };
    },
  });

  // ------------------------------------------------------ 东区走廊（跨海高架）
  add({
    id: 'iec', zh: '东区走廊', en: 'Island Eastern Corridor', hm: 18, yr: 1984, dist: '港岛东',
    desc: '沿港岛北岸架在海面上的双向高架快速路，桥墩直插维港，是东区最醒目的人造水岸线。',
    rect: [1044, 212, 26, 8], anchor: [1056, 216], noReserve: true,
    build(v, g, B, rng) {
      const y = W.GROUND + 5;
      const zOf = (x) => g.hkShore[Math.max(0, Math.min(g.SX - 1, x))] + 3;
      for (let x = 766; x < W.SX; x++) {
        const z = zOf(x);
        if (z < 2 || z >= g.SZ - 2) continue;
        // 桥面：两向各 3 voxel，中间分隔带
        v.fillBox(x, y, z - 3, 1, 1, 3, M.ASPHALT);
        v.fillBox(x, y, z + 1, 1, 1, 3, M.ASPHALT);
        v.set(x, y, z, M.CONCRETE_M);
        v.set(x, y + 1, z, M.CONCRETE_L);
        if (x % 8 < 4) { v.set(x, y, z - 2, M.MARK_W); v.set(x, y, z + 2, M.MARK_W); }
        // 外侧防撞栏
        v.set(x, y + 1, z - 4, M.CONCRETE_L);
        v.set(x, y + 1, z + 4, M.CONCRETE_L);
        v.set(x, y, z - 4, M.CONCRETE_M);
        v.set(x, y, z + 4, M.CONCRETE_M);
        // 桥墩（只在水面上打，遇到码头/陆地就跳过）
        if (x % 9 === 0) {
          for (const dz of [-2, 2]) {
            for (let yy = y - 1; yy >= W.SEA - 3; yy--) v.setIfEmpty(x, yy, z + dz, M.CONCRETE_D);
          }
          v.setIfEmpty(x, y - 1, z, M.CONCRETE_D);
        }
        // 路灯
        if (x % 18 === 6) { v.setIfEmpty(x, y + 2, z, M.STEEL_D); v.setIfEmpty(x, y + 3, z, M.LAMP); }
      }
      // 西端下匝道（接北角岸边）
      for (let i = 0; i < 26; i++) {
        const x = 748 + i, z = zOf(766) + 6 - Math.round(i * 0.2);
        const yy = W.GROUND + 5 - Math.round(i * 0.18);
        v.fillBox(x, yy, z - 2, 1, 1, 5, M.ASPHALT);
        for (let d = yy - 1; d >= W.SEA - 2; d--) if (i % 6 === 0) v.setIfEmpty(x, d, z, M.CONCRETE_D);
      }
      return { top: W.GROUND + 8, noLabel: false };
    },
  });

  // ------------------------------------------------------------ 山顶缆车
  add({
    id: 'peak-tram', zh: '山顶缆车', en: 'Peak Tram', hm: 396, yr: 1888, dist: '中环 / 太平山',
    desc: '1888 年通车的登山缆车，从花园道一路爬升到太平山顶，最陡处坡度接近 27 度。',
    rect: [400, 146, 12, 46], anchor: [406, 168],
    // 先占下整条路权，城市填充与半山住宅就不会长到轨道上
    reserve(geo, USE) {
      const x0 = 406, z0 = 184, x1 = 216, z1 = 68, steps = 240;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = Math.round(x0 + (x1 - x0) * t), z = Math.round(z0 + (z1 - z0) * t);
        for (let ox = -2; ox <= 2; ox++) for (let oz = -2; oz <= 2; oz++) {
          const px = x + ox, pz = z + oz;
          if (px < 0 || pz < 0 || px >= geo.SX || pz >= geo.SZ) continue;
          geo.use[px + pz * geo.SX] = USE.ROAD;
        }
      }
    },
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 花园道下站
      v.fillBox(400, y0, 186, 12, 5, 8, M.STUCCO_W);
      B.ring(v, 400, y0 + 4, 186, 12, 8, M.BRICK_R, 1);
      v.fillBox(401, y0 + 5, 187, 10, 1, 6, M.ROOF_TILE);
      v.fillBox(404, y0 + 1, 185, 4, 3, 1, M.GLASS_WHITE);
      B.neonSign(v, 402, y0 + 6, 186, 0, -1, 6, 2, M.NEON_RED, 2);

      // 轨道：沿地形从下站爬到凌霄阁（清出 3 宽的路权带再铺轨）
      const x0 = 406, z0 = 184, x1 = 216, z1 = 68;
      const steps = 230;
      let last = null;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = Math.round(x0 + (x1 - x0) * t);
        const z = Math.round(z0 + (z1 - z0) * t);
        if (x < 1 || z < 1 || x >= g.SX - 1 || z >= g.SZ - 1) continue;
        const gy = g.height[x + z * g.SX];
        if (last && last.x === x && last.z === z) continue;
        // 路权：清空上方 5 层
        for (let o = -1; o <= 1; o++) {
          for (let yy = gy + 1; yy <= gy + 5; yy++) {
            v.fillBox(x + o, yy, z, 1, 1, 1, 0);
            v.fillBox(x, yy, z + o, 1, 1, 1, 0);
          }
        }
        // 道床 + 双轨
        v.set(x, gy, z, M.CONCRETE_D);
        v.set(x - 1, gy, z, M.TRAM_RAIL);
        v.set(x + 1, gy, z, M.TRAM_RAIL);
        if (s % 12 === 0) { v.setIfEmpty(x - 2, gy + 1, z, M.STEEL_D); v.setIfEmpty(x + 2, gy + 1, z, M.STEEL_D); }
        last = { x, z };
      }
      // 半山上行中的缆车车厢（青绿色）
      const tt = 0.46, cx = Math.round(x0 + (x1 - x0) * tt), cz = Math.round(z0 + (z1 - z0) * tt);
      const cy = g.height[cx + cz * g.SX] + 1;
      v.fillBox(cx - 1, cy, cz - 2, 3, 2, 6, M.TRAM_GREEN);
      v.fillBox(cx - 1, cy + 2, cz - 1, 3, 1, 4, M.FERRY_WHITE);
      for (let i = 0; i < 5; i++) v.set(cx - 1, cy + 1, cz - 2 + i, M.GLASS_VEH);
      return { top: y0 + 8 };
    },
  });

  // ---------------------------------------------------------- 中环街市
  add({
    id: 'central-market', zh: '中环街市', en: 'Central Market', hm: 25, yr: 1939, dist: '中环',
    desc: '包豪斯风格的旧街市，水平长窗与圆角楼梯塔，在玻璃森林里留下 1939 年的白色横线。',
    rect: [340, 220, 14, 12], anchor: [347, 226],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = 6;
      v.fillBox(340, y0, 220, 14, h, 12, M.STUCCO_W);
      // 水平长窗（包豪斯语言）
      for (let y = y0 + 1; y < y0 + h; y += 2) B.ring(v, 340, y, 220, 14, 12, M.GLASS_WHITE, 1);
      // 圆角楼梯塔
      B.cyl(v, 341, 221, 2.2, y0, h + 2, M.STUCCO_W);
      v.fillBox(341, y0 + h + 2, 221, 1, 1, 1, M.CONCRETE_L);
      // 屋面 + 通风器
      v.fillBox(340, y0 + h, 220, 14, 1, 12, M.ROOF_TAR);
      B.ring(v, 340, y0 + h + 1, 220, 14, 12, M.STUCCO_W, 1);
      for (let i = 0; i < 4; i++) v.set(344 + i * 2, y0 + h + 1, 224 + (i % 2) * 3, M.TANK);
      B.neonSign(v, 341, y0 + h + 2, 219, 0, -1, 8, 2, M.NEON_YELL, 2);
      return { top: y0 + h + 3 };
    },
  });

  // -------------------------------------------------- 香港中央图书馆（维园畔）
  add({
    id: 'hk-central-library', zh: '香港中央图书馆', en: 'Hong Kong Central Library', hm: 60, yr: 2001, dist: '铜锣湾',
    desc: '维多利亚公园东侧的巨大方格立面建筑，中央拱门与圆窗混搭，是全港最大的图书馆。',
    rect: [772, 184, 18, 18], anchor: [781, 193],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(60);
      v.fillBox(772, y0, 184, 18, h, 18, M.BONE);
      // 方格立面
      for (let y = y0 + 2; y < y0 + h - 1; y += 3) B.ring(v, 772, y, 184, 18, 18, M.GLASS_WHITE, 1);
      for (let i = 2; i < 18; i += 4) {
        for (let y = y0 + 2; y < y0 + h - 1; y++) {
          v.setIfEmpty(772 + i, y, 183, M.GRANITE);
          v.set(772 + i, y, 184 + 17, M.GRANITE);
        }
      }
      // 中央拱门与门廊
      v.fillBox(778, y0, 182, 6, 5, 3, 0);
      B.ring(v, 777, y0, 182, 8, 3, M.GRANITE, 1);
      for (let i = 0; i < 6; i++) v.set(778 + i, y0 + 5, 182, M.GRANITE);
      v.set(780, y0 + 6, 182, M.GLASS_WHITE); v.set(781, y0 + 6, 182, M.GLASS_WHITE);
      // 顶部退台 + 圆顶采光
      v.fillBox(774, y0 + h, 186, 14, 2, 14, M.BONE);
      B.dome(v, 781, y0 + h + 2, 193, 4, M.GLASS_WHITE, 0.6);
      B.rooftop(v, 774, 186, 14, 14, y0 + h + 1, rng, { parapetMat: M.BONE, antenna: false });
      return { top: y0 + h + 6 };
    },
  });

  // -------------------------------------------------------------- 崇光百货
  add({
    id: 'sogo', zh: '崇光百货', en: 'SOGO Causeway Bay', hm: 70, yr: 1985, dist: '铜锣湾',
    desc: '铜锣湾人流最密的十字路口，整面 LED 幕墙从天亮闪到深夜，楼下永远在等人。',
    rect: [644, 194, 16, 14], anchor: [652, 201],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(70);
      v.fillBox(644, y0, 194, 16, h, 14, M.BLACK_PANEL);
      // 整面 LED 媒体幕墙（正面 + 侧面转角）
      for (let y = y0 + 1; y < y0 + h - 2; y++) {
        for (let i = 0; i < 16; i++) v.set(644 + i, y, 193, M.LED_FACADE);
        for (let j = 0; j < 6; j++) v.set(643, y, 194 + j, M.LED_FACADE);
      }
      // 裙楼雨棚 + 霓虹
      v.fillBox(643, y0 + 2, 192, 18, 1, 2, M.WHITE_PANEL);
      B.neonSign(v, 645, y0 + 3, 192, 0, -1, 12, 2, M.NEON_RED, 2);
      B.neonSign(v, 643, y0 + 8, 195, -1, 0, 4, 6, M.NEON_YELL, 2);
      v.fillBox(646, y0 + h, 196, 12, 2, 10, M.CONCRETE_M);
      B.rooftop(v, 646, 196, 12, 10, y0 + h + 1, rng, { parapetMat: M.BLACK_PANEL });
      B.roofSign(v, 645, y0 + h + 3, 193, 14, 4, -1, M.NEON_PINK);
      return { top: y0 + h + 7 };
    },
  });

  // ------------------------------------------------------ 香港理工大学（红磡）
  add({
    id: 'polyu', zh: '香港理工大学', en: 'PolyU', hm: 46, yr: 1972, dist: '红磡',
    desc: '一片红砖围合的校园，弧形教学楼与庭院层层退台，紧贴红磡的火车与隧道。',
    rect: [700, 498, 32, 26], anchor: [716, 511],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 三栋红砖围院 + 中央庭园
      const blocks = [[700, 498, 32, 6, 9], [700, 504, 8, 20, 7], [724, 504, 8, 20, 8], [704, 518, 20, 6, 6]];
      for (const [x, z, w, d, h] of blocks) {
        v.fillBox(x, y0, z, w, h, d, M.BRICK_R);
        for (let y = y0 + 2; y < y0 + h; y += 2) B.ring(v, x, y, z, w, d, M.GLASS_WHITE, 1);
        B.ring(v, x, y0 + h, z, w, d, M.BRICK_R, 1);
        B.rooftop(v, x, z, w, d, y0 + h, rng, { parapetMat: M.BRICK_R, antenna: false });
      }
      // 庭园
      for (let z = 505; z < 518; z++) for (let x = 709; x < 724; x++) {
        v.set(x, y0, z, (x % 5 === 0 || z % 6 === 0) ? M.PAVE_L : M.PARK);
      }
      for (let i = 0; i < 8; i++) B.tree(v, 710 + ((rng() * 13) | 0), y0 + 1, 506 + ((rng() * 11) | 0), 2 + ((rng() * 2) | 0), M.TREE_D);
      // 弧形讲堂（标志性的红砖曲面）
      B.cyl(v, 716, 511, 4.5, y0, 5, M.BRICK_R);
      B.dome(v, 716, y0 + 5, 511, 4.5, M.COPPER, 0.5);
      return { top: y0 + 12 };
    },
  });

})(typeof window !== 'undefined' ? window : globalThis);
