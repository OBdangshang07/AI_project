/* =============================================================================
 * VOXEL VICTORIA HARBOUR · landmarks.js
 * 维港两岸地标的体素还原（港岛 26 + 九龙 25）。每个地标都带真实高度 / 落成年份 /
 * 所属分区信息，供数字孪生信息卡与传送点使用。
 * 造型语言尽量抓住"一眼认得出"的特征：中银的三棱柱与斜撑、汇丰的三段桁架、
 * 中环广场的三角金塔、会展中心的飞鸟屋盖、ICC 的锥收剥角、文化中心的无窗曲面、
 * 太空馆的蛋形穹顶、体育馆的倒金字塔、钟楼的红砖、怡和大厦的圆窗……
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV || (global.HKV = {});
  const { W, M, RNG } = HKV;
  const V = (m) => Math.round(m / W.VOXEL);      // 米 -> 体素高度

  const DEFS = [];
  const RESULTS = [];
  function add(def) { DEFS.push(def); return def; }

  // ------------------------------------------------------------------ 港岛
  // ── 中环 ─────────────────────────────────────────────────────────────
  add({
    id: 'two-ifc', zh: '国际金融中心二期', en: 'Two IFC', hm: 415, yr: 2003, dist: '中环',
    desc: '港岛最高，锥形塔身与冠部的尖齿是维港夜景的主角之一。',
    rect: [232, 214, 40, 34], anchor: [252, 231],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(415);
      const cx = 252, cz = 231;
      // 裙楼（IFC 商场 + 四季酒店基座）
      v.fillBox(216, y0, 208, 62, 7, 34, M.CONCRETE_L);
      B.ring(v, 216, y0 + 6, 208, 62, 34, M.GLASS_WHITE, 1);
      B.rooftop(v, 218, 210, 58, 30, y0 + 6, rng, { antenna: false });
      // 塔身：20 -> 13 锥收 + 竖向肋
      const bodyH = h - 16;
      B.taper(v, cx, cz, 21, 21, 14, 14, y0 + 7, bodyH, M.GLASS_SILVER, 0.18);
      for (let y = y0 + 9; y < y0 + bodyH; y += 11) {
        const t = (y - y0 - 7) / bodyH, w = Math.round(21 + (14 - 21) * t);
        B.ring(v, cx - (w >> 1), y, cz - (w >> 1), w, w, M.CONCRETE_L, 1);
      }
      // 冠部：退台 + 四角尖齿 + 桅杆
      let yy = y0 + 7 + bodyH, ww = 14;
      for (let k = 0; k < 4; k++) { v.fillBox(cx - (ww >> 1), yy, cz - (ww >> 1), ww, 3, ww, M.GLASS_SILVER); yy += 3; ww -= 2; }
      const s = ww + 2;
      for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const px = cx + dx * (s >> 1), pz = cz + dz * (s >> 1);
        v.fillBox(px - 1, yy - 6, pz - 1, 2, 11, 2, M.STEEL);
        v.set(px, yy + 5, pz, M.BEACON_R);
      }
      v.fillBox(cx - 1, yy, cz - 1, 3, 5, 3, M.STEEL);
      v.fillBox(cx, yy + 5, cz, 1, 5, 1, M.STEEL_D);
      v.set(cx, yy + 10, cz, M.BEACON_R);
      return { top: yy + 10 };
    },
  });

  add({
    id: 'one-ifc', zh: '国际金融中心一期', en: 'One IFC', hm: 210, yr: 1998, dist: '中环',
    desc: '与二期同属 IFC 综合体，圆角方塔、顶部灯冠。',
    rect: [222, 200, 24, 22], anchor: [234, 210],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      B.tower(v, {
        v, x: 224, z: 202, w: 18, d: 16, base: y0 + 7, h: V(210) - 7, mat: M.GLASS_TEAL, win: M.GLASS_WHITE,
        style: 'glass', rng, setbacks: 0, cornerCut: 0.35, crown: 'stepped', crownMat: M.GLASS_TEAL, trim: M.CONCRETE_L,
      });
      return { top: y0 + V(210) };
    },
  });

  add({
    id: 'jardine-house', zh: '怡和大厦', en: 'Jardine House', hm: 178, yr: 1973, dist: '中环',
    desc: '1973 年落成时是亚洲最高，1748 个圆窗让它成为中环最好认的银白盒子。',
    rect: [284, 226, 16, 16], anchor: [292, 234],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(178);
      v.fillBox(286, y0, 228, 13, h, 13, M.ROUNDWIN);              // 圆窗幕墙由着色器绘制
      B.ring(v, 285, y0, 227, 15, 15, M.WHITE_PANEL, 1);
      v.fillBox(285, y0, 227, 15, 3, 15, M.WHITE_PANEL);
      B.rooftop(v, 286, 228, 13, 13, y0 + h, rng, { parapetMat: M.WHITE_PANEL, antennaH: 5 });
      return { top: y0 + h + 6 };
    },
  });

  add({
    id: 'exchange-square', zh: '交易广场', en: 'Exchange Square', hm: 188, yr: 1985, dist: '中环',
    desc: '玫瑰色花岗岩三塔，香港交易所所在地。',
    rect: [302, 214, 34, 26], anchor: [316, 226],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(302, y0, 214, 34, 6, 26, M.GRANITE_R);             // 平台
      const specs = [[306, 218, 12, 12, V(188)], [320, 218, 12, 12, V(188)], [306, 232, 11, 8, V(140)]];
      for (const [x, z, w, d, h] of specs) {
        v.fillBox(x, y0 + 6, z, w, h - 6, d, M.GRANITE_R);
        B.bandFacade(v, x, z, w, d, y0 + 6, h - 6, 3, M.GLASS_BRONZE);
        B.rooftop(v, x, z, w, d, y0 + h, rng, { parapetMat: M.GRANITE_R });
      }
      return { top: y0 + V(188) + 5 };
    },
  });

  add({
    id: 'the-center', zh: '中环中心', en: 'The Center', hm: 346, yr: 1998, dist: '中环',
    desc: '通体玻璃、夜间七彩灯带的退台塔楼，李嘉诚旗下地标。',
    rect: [300, 190, 26, 26], anchor: [313, 203],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(346), cx = 313, cz = 203;
      let w = 22, yy = y0, left = h;
      for (let s = 0; s < 4; s++) {
        const segH = s === 3 ? left : Math.round(h * [0.34, 0.26, 0.22][s]);
        v.fillBox(cx - (w >> 1), yy, cz - (w >> 1), w, segH, w, M.GLASS_BLUE);
        // 每 6 层一条 LED 灯带（幻彩咏香江时七彩流动）
        for (let y = yy + 4; y < yy + segH; y += 6) B.ring(v, cx - (w >> 1), y, cz - (w >> 1), w, w, M.LED_FACADE, 1);
        yy += segH; left -= segH; w -= 4;
      }
      v.fillBox(cx - 2, yy, cz - 2, 5, 4, 5, M.STEEL);
      v.fillBox(cx, yy + 4, cz, 1, 8, 1, M.STEEL_D);
      v.set(cx, yy + 12, cz, M.BEACON_R);
      return { top: yy + 12 };
    },
  });

  add({
    id: 'hsbc-hq', zh: '汇丰总行大厦', en: 'HSBC Main Building', hm: 180, yr: 1985, dist: '中环',
    desc: '福斯特的高技派杰作：三段式悬挂结构、外露桁架、底层完全架空。',
    rect: [342, 198, 26, 22], anchor: [355, 209],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      const segs = [[343, 20, V(140)], [351, 20, V(180)], [361, 16, V(160)]];
      for (const [x, w, h] of segs) {
        v.fillBox(x, y0 + 4, 200, w, h - 4, 18, M.STEEL);
        B.bandFacade(v, x, 200, w, 18, y0 + 4, h - 4, 2, M.GLASS_DARK);
        // 外露桁架层
        for (let y = y0 + 10; y < y0 + h; y += 9) {
          v.fillBox(x - 1, y, 199, w + 2, 1, 20, M.STEEL);
          for (let i = 0; i < w; i += 6) { B.line(v, x + i, y, 199, x + i + 5, y + 8, 199, M.STEEL); B.line(v, x + i, y, 218, x + i + 5, y + 8, 218, M.STEEL); }
        }
        v.fillBox(x, y0, 200, 2, 4, 18, M.STEEL_D);                // 架空底层的巨柱
        v.fillBox(x + w - 2, y0, 200, 2, 4, 18, M.STEEL_D);
      }
      // 屋顶维修吊车桅杆
      v.fillBox(352, y0 + V(180), 206, 1, 6, 1, M.STEEL_D);
      v.set(352, y0 + V(180) + 6, 206, M.BEACON_R);
      return { top: y0 + V(180) + 6 };
    },
  });

  add({
    id: 'boc-tower', zh: '中银大厦', en: 'Bank of China Tower', hm: 367, yr: 1990, dist: '中环',
    desc: '贝聿铭以「节节高升的竹」为意象：四组三棱柱依次收顶，X 形斜撑外露。',
    rect: [364, 182, 30, 30], anchor: [378, 196],
    build(v, g, B, rng) {
      const y0 = W.GROUND, H = V(367);
      const x0 = 366, z0 = 184, S = 26;
      const half = S >> 1;
      // 四个象限的三棱柱，高度依次 0.30 / 0.52 / 0.74 / 1.0
      const quads = [
        [x0, z0, 0, 0.30], [x0 + half, z0, 1, 0.52], [x0, z0 + half, 3, 0.74], [x0 + half, z0 + half, 2, 1.0],
      ];
      v.fillBox(x0 - 2, y0, z0 - 2, S + 4, 5, S + 4, M.GRANITE);     // 基座
      for (const [qx, qz, dir, f] of quads) {
        const h = Math.round(H * f);
        B.triPrism(v, qx, qz, half, y0 + 5, h - 5, M.GLASS_SILVER, dir);
        // 每段顶面的斜切收头
        for (let i = 0; i < half; i++) v.fillBox(qx + i, y0 + h - 5 + i, qz, 1, 1, half, M.STEEL);
      }
      // X 形斜撑：沿四个立面画交叉大对角
      const braceH = Math.round(H * 0.26);
      for (let k = 0; k < 4; k++) {
        const yb = y0 + 5 + k * braceH;
        if (yb + braceH > y0 + H) break;
        const shrink = k * 1;
        const ax = x0 + shrink, bx = x0 + S - 1 - shrink, az = z0 + shrink, bz = z0 + S - 1 - shrink;
        B.line(v, ax, yb, az, bx, yb + braceH, az, M.STEEL);
        B.line(v, bx, yb, az, ax, yb + braceH, az, M.STEEL);
        B.line(v, ax, yb, az, ax, yb + braceH, bz, M.STEEL);
        B.line(v, ax, yb, bz, ax, yb + braceH, az, M.STEEL);
        B.line(v, ax, yb, bz, bx, yb + braceH, bz, M.STEEL);
        B.line(v, bx, yb, bz, ax, yb + braceH, bz, M.STEEL);
        B.line(v, bx, yb, az, bx, yb + braceH, bz, M.STEEL);
        B.line(v, bx, yb, bz, bx, yb + braceH, az, M.STEEL);
      }
      // 双桅杆
      const tx = x0 + half + 4, tz = z0 + half + 4;
      for (const dx of [-2, 2]) {
        v.fillBox(tx + dx, y0 + H, tz, 1, 16, 1, M.STEEL_D);
        v.set(tx + dx, y0 + H + 16, tz, M.BEACON_R);
      }
      return { top: y0 + H + 16 };
    },
  });

  add({
    id: 'cheung-kong', zh: '长江集团中心', en: 'Cheung Kong Center', hm: 283, yr: 1999, dist: '中环',
    desc: '简洁的正方形玻璃盒，夜间垂直灯带勾出四条棱。',
    rect: [386, 198, 24, 24], anchor: [398, 210],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(283), x = 388, z = 200, s = 20;
      v.fillBox(x, y0, z, s, h, s, M.GLASS_DARK);
      // 四棱灯带
      for (const [dx, dz] of [[0, 0], [s - 1, 0], [0, s - 1], [s - 1, s - 1]]) v.fillBox(x + dx, y0 + 4, z + dz, 1, h - 6, 1, M.WIN_COOL);
      for (let y = y0 + 8; y < y0 + h - 4; y += 12) B.ring(v, x, y, z, s, s, M.STEEL, 1);
      B.rooftop(v, x, z, s, s, y0 + h, rng, { helipad: true, parapetMat: M.STEEL });
      return { top: y0 + h + 4 };
    },
  });

  add({
    id: 'central-piers', zh: '中环渡轮码头', en: 'Central Ferry Piers', hm: 22, yr: 1995, dist: '中环',
    desc: '7 号、8 号码头是天星小轮往来尖沙咀的起点，绿白配色与仿旧钟楼。',
    rect: [266, 244, 46, 26], anchor: [288, 256],
    build(v, g, B, rng) {
      const y = W.GROUND;
      for (let k = 0; k < 3; k++) {
        const x = 268 + k * 16;
        B.pier(v, x, 244, 12, 22, y, M.PROMENADE, M.CONCRETE_D);
        v.fillBox(x + 1, y + 1, 248, 10, 4, 14, M.FERRY_WHITE);
        B.ring(v, x + 1, y + 4, 248, 10, 14, M.FERRY_GREEN, 1);
        v.fillBox(x + 1, y + 5, 248, 10, 1, 14, M.FERRY_GREEN);
        for (let i = 0; i < 12; i += 3) B.lamp(v, x + i, y + 1, 245, 3, 0);
      }
      // 仿旧钟楼
      v.fillBox(300, y + 1, 250, 4, 14, 4, M.WHITE_PANEL);
      v.fillBox(299, y + 15, 249, 6, 2, 6, M.FERRY_GREEN);
      v.fillBox(301, y + 12, 249, 2, 2, 1, M.WIN_WARM);
      v.fillBox(301, y + 12, 254, 2, 2, 1, M.WIN_WARM);
      B.dome(v, 302, y + 17, 252, 2.5, M.FERRY_GREEN, 1.2);
      return { top: y + 20 };
    },
  });

  add({
    id: 'city-hall', zh: '香港大会堂', en: 'Hong Kong City Hall', hm: 40, yr: 1962, dist: '中环',
    desc: '战后现代主义的公共建筑，低座音乐厅 + 高座图书馆。',
    rect: [306, 232, 24, 16], anchor: [318, 240],
    build(v, g, B, rng) {
      const y = W.GROUND;
      v.fillBox(306, y, 232, 14, 10, 16, M.WHITE_PANEL);
      B.bandFacade(v, 306, 232, 14, 16, y, 10, 3, M.GLASS_WHITE);
      v.fillBox(322, y, 234, 8, 5, 12, M.CONCRETE_L);
      B.rooftop(v, 306, 232, 14, 16, y + 10, rng, { antenna: false });
      return { top: y + 12 };
    },
  });

  // ── 金钟 / 湾仔 ────────────────────────────────────────────────────────
  add({
    id: 'lippo-centre', zh: '力宝中心', en: 'Lippo Centre', hm: 186, yr: 1988, dist: '金钟',
    desc: '外挂的六角形凸窗像「树上的考拉」，双塔同构。',
    rect: [410, 190, 30, 24], anchor: [425, 202],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(186);
      for (const bx of [412, 428]) {
        v.fillBox(bx, y0, 194, 10, h, 14, M.GLASS_SILVER);
        // 考拉式凸出体块
        for (let y = y0 + 6; y < y0 + h - 8; y += 10) {
          const s = 1 + ((y / 10) | 0) % 2;
          v.fillBox(bx - 2, y, 196, 2, 7, 4, M.GLASS_SILVER);
          v.fillBox(bx + 10, y + 4, 200, 2, 7, 4, M.GLASS_SILVER);
          v.fillBox(bx + 3, y + s, 192, 4, 6, 2, M.GLASS_SILVER);
          v.fillBox(bx + 2, y + 5, 208, 4, 6, 2, M.GLASS_SILVER);
        }
        B.rooftop(v, bx, 194, 10, 14, y0 + h, rng, { parapetMat: M.STEEL });
      }
      v.fillBox(410, y0, 190, 30, 4, 24, M.CONCRETE_M);
      return { top: y0 + h + 4 };
    },
  });

  add({
    id: 'far-east-finance', zh: '远东金融中心', en: 'Far East Finance Centre', hm: 145, yr: 1982, dist: '金钟',
    desc: '整栋金色反光玻璃，港岛北岸最抢眼的一块金砖。',
    rect: [442, 198, 18, 18], anchor: [450, 206],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(145);
      v.fillBox(444, y0, 200, 14, h, 14, M.GLASS_GOLD);
      for (let y = y0 + 6; y < y0 + h; y += 8) B.ring(v, 444, y, 200, 14, 14, M.GOLD_TRIM, 1);
      B.rooftop(v, 444, 200, 14, 14, y0 + h, rng, { parapetMat: M.GOLD_TRIM });
      return { top: y0 + h + 5 };
    },
  });

  add({
    id: 'pacific-place', zh: '太古广场', en: 'Pacific Place', hm: 200, yr: 1990, dist: '金钟',
    desc: '巨型商场平台上托起三座酒店 / 办公塔。',
    rect: [444, 168, 46, 30], anchor: [466, 182],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(444, y0, 168, 46, 9, 30, M.CONCRETE_L);
      B.ring(v, 444, y0 + 8, 168, 46, 30, M.GLASS_BRONZE, 1);
      const towers = [[448, 172, 12, 12, V(200)], [464, 174, 11, 11, V(170)], [478, 172, 10, 14, V(150)]];
      for (const [x, z, w, d, h] of towers) {
        v.fillBox(x, y0 + 9, z, w, h - 9, d, M.CONCRETE_L);
        B.bandFacade(v, x, z, w, d, y0 + 9, h - 9, 2, M.GLASS_BRONZE);
        B.rooftop(v, x, z, w, d, y0 + h, rng, {});
      }
      return { top: y0 + V(200) + 4 };
    },
  });

  add({
    id: 'central-govt', zh: '政府总部', en: 'Central Government Complex', hm: 130, yr: 2011, dist: '金钟',
    desc: '添马舰上的「门常开」：两翼办公楼中间留出巨大门洞。',
    rect: [448, 226, 40, 22], anchor: [468, 236],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(130);
      // 两翼 + 顶部横梁 = 门形
      v.fillBox(450, y0, 228, 10, h, 18, M.GLASS_WHITE);
      v.fillBox(476, y0, 228, 10, h, 18, M.GLASS_WHITE);
      v.fillBox(460, y0 + h - 8, 228, 16, 8, 18, M.GLASS_WHITE);
      B.bandFacade(v, 450, 228, 10, 18, y0, h, 3, M.CONCRETE_L);
      B.bandFacade(v, 476, 228, 10, 18, y0, h, 3, M.CONCRETE_L);
      // 立法会 + 添马公园草坡
      v.fillBox(452, y0, 216, 22, 8, 10, M.WHITE_PANEL);
      B.ring(v, 452, y0 + 7, 216, 22, 10, M.GLASS_WHITE, 1);
      return { top: y0 + h };
    },
  });

  add({
    id: 'pla-barracks', zh: '中国人民解放军驻港部队大厦', en: 'PLA Forces Building', hm: 90, yr: 1979, dist: '金钟',
    desc: '原威尔斯亲王大楼，上宽下窄的倒锥造型（俗称「酒杯楼」）。',
    rect: [424, 228, 20, 18], anchor: [434, 236],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(90);
      B.taper(v, 434, 237, 8, 8, 18, 16, y0, h, M.CONCRETE_M);
      B.bandFacade(v, 426, 230, 16, 14, y0 + h - 12, 12, 2, M.GLASS_DARK);
      B.rooftop(v, 427, 231, 14, 12, y0 + h, rng, { antennaH: 10 });
      return { top: y0 + h + 10 };
    },
  });

  add({
    id: 'central-plaza', zh: '中环广场', en: 'Central Plaza', hm: 374, yr: 1992, dist: '湾仔',
    desc: '三角形平面的金色巨塔，塔尖「光管时钟」用颜色报时。',
    rect: [484, 222, 32, 30], anchor: [500, 236],
    build(v, g, B, rng) {
      const y0 = W.GROUND, H = V(374);
      const x0 = 486, z0 = 224, S = 28;
      v.fillBox(x0 - 2, y0, z0 - 2, S + 4, 8, S + 4, M.GRANITE);
      // 三角形塔身（切角三角 = 六边形观感），逐层微收
      for (let y = 0; y < H - 8; y++) {
        const t = y / (H - 8);
        const s = Math.round(S * (1 - t * 0.18));
        for (let i = 0; i < s; i++) {
          const len = s - i;
          const rowMat = (y % 3 === 0) ? M.GOLD_TRIM : M.GLASS_GOLD;
          v.fillBox(x0 + (i >> 1), y0 + 8 + y, z0 + i, Math.max(1, len - (i >> 1)), 1, 1, rowMat);
        }
      }
      // 金字塔冠 + 光管
      let yy = y0 + H, ss = 12;
      const cx = x0 + 8, cz = z0 + 8;
      while (ss > 1) { v.fillBox(cx - (ss >> 1), yy, cz - (ss >> 1), ss, 1, ss, M.GOLD_TRIM); yy++; ss -= 2; }
      v.fillBox(cx, yy, cz, 1, 14, 1, M.NEON_YELL);
      v.set(cx, yy + 14, cz, M.BEACON_R);
      return { top: yy + 14 };
    },
  });

  add({
    id: 'hkcec', zh: '香港会议展览中心', en: 'HK Convention & Exhibition Centre', hm: 60, yr: 1997, dist: '湾仔',
    desc: '伸入维港的填海半岛，屋盖如飞鸟展翅／海龟背脊，回归大典在此举行。',
    rect: [470, 246, 84, 34], anchor: [512, 264],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 基座平台
      v.fillBox(472, y0 - 1, 248, 80, 3, 30, M.CONCRETE_L);
      // 三片飞鸟屋盖：沿 x 的三个拱，向北（+z）方向下垂到海面
      const shells = [[476, 250, 26, 26, 15], [502, 249, 24, 28, 13], [526, 251, 22, 24, 11]];
      for (const [sx, sz, sw, sd, peak] of shells) {
        B.shellRoof(v, sx, sz, sw, sd, (u, vv) => {
          const arc = Math.sin(Math.PI * Math.min(1, Math.max(0, u))) ;
          const fall = Math.pow(1 - vv, 0.7);
          const hh = y0 + 3 + peak * arc * fall + 2 * (1 - vv);
          return u < 0.03 || u > 0.97 ? null : hh;
        }, M.ALU, 2);
        // 屋盖下的玻璃幕墙
        for (let i = 1; i < sw - 1; i++) {
          const arc = Math.sin(Math.PI * (i / (sw - 1)));
          const top = y0 + 3 + peak * arc;
          for (let y = y0 + 1; y < top - 1; y++) v.set(sx + i, y, sz + sd - 1, (y % 3 === 0) ? M.WHITE_PANEL : M.GLASS_WHITE);
          for (let y = y0 + 1; y < y0 + 6; y++) { v.set(sx + i, y, sz, M.GLASS_WHITE); }
        }
        for (let j = 0; j < sd; j++) for (let y = y0 + 1; y < y0 + 5; y++) { v.set(sx, y, sz + j, M.WHITE_PANEL); v.set(sx + sw - 1, y, sz + j, M.WHITE_PANEL); }
      }
      // 旧翼（会展一期）+ 金紫荆广场
      v.fillBox(472, y0, 248, 14, 12, 20, M.GLASS_WHITE);
      B.ring(v, 472, y0 + 11, 248, 14, 20, M.WHITE_PANEL, 1);
      const px = 500, pz = 276;
      v.fillBox(px - 6, y0, pz, 14, 1, 6, M.PAVE_D);
      v.fillBox(px - 1, y0 + 1, pz + 2, 3, 3, 3, M.GRANITE);
      v.fillBox(px, y0 + 4, pz + 3, 1, 3, 1, M.GOLD_TRIM);
      B.sphere(v, px, y0 + 8, pz + 3, 1.6, M.GOLD_TRIM);
      for (let i = 0; i < 5; i++) { v.fillBox(px - 6 + i * 3, y0 + 1, pz + 5, 1, 7, 1, M.STEEL); v.fillBox(px - 6 + i * 3 + 1, y0 + 6, pz + 5, 2, 2, 1, M.FLAG_RED); }
      return { top: y0 + 20 };
    },
  });

  add({
    id: 'convention-plaza', zh: '会展中心办公大楼', en: 'Convention Plaza', hm: 199, yr: 1992, dist: '湾仔',
    desc: '会展旁的双塔（办公楼 + 君悦酒店），弧形立面。',
    rect: [462, 240, 22, 22], anchor: [473, 250],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      B.ellipse(v, 468, 248, 6, 8, y0, V(199), M.GLASS_TEAL);
      B.ellipse(v, 480, 250, 5, 7, y0, V(160), M.GLASS_TEAL);
      for (let y = y0 + 6; y < y0 + V(199); y += 6) B.ellipse(v, 468, 248, 6.4, 8.4, y, 1, M.CONCRETE_L);
      return { top: y0 + V(199) };
    },
  });

  add({
    id: 'hopewell-centre', zh: '合和中心', en: 'Hopewell Centre', hm: 216, yr: 1980, dist: '湾仔',
    desc: '湾仔的圆柱红塔，顶层旋转餐厅曾是全港最高。',
    rect: [548, 182, 24, 24], anchor: [560, 194],
    build(v, g, B, rng) {
      const gY = g.groundY(560, 194), h = V(216);
      B.cyl(v, 560, 194, 10.5, gY, h, M.BRICK_R);
      for (let y = gY + 3; y < gY + h; y += 3) B.cyl(v, 560, 194, 11, y, 1, M.GLASS_BRONZE);
      B.cyl(v, 560, 194, 12.5, gY + h, 3, M.BRICK_R);              // 旋转餐厅外挑
      B.cyl(v, 560, 194, 12.5, gY + h + 1, 1, M.GLASS_WHITE);
      v.fillBox(560, gY + h + 3, 194, 1, 8, 1, M.STEEL_D);
      v.set(560, gY + h + 11, 194, M.BEACON_R);
      return { top: gY + h + 11 };
    },
  });

  // ── 铜锣湾 / 北角 ──────────────────────────────────────────────────────
  add({
    id: 'times-square', zh: '时代广场', en: 'Times Square', hm: 191, yr: 1994, dist: '铜锣湾',
    desc: '铜锣湾的商场双塔，裙楼巨型 LED 幕墙与跨年倒数。',
    rect: [664, 180, 30, 26], anchor: [679, 193],
    build(v, g, B, rng) {
      const gY = g.groundY(679, 193);
      v.fillBox(664, gY, 180, 30, 14, 26, M.GRANITE);
      // 面向北的巨幕
      for (let i = 2; i < 28; i++) for (let y = gY + 3; y < gY + 13; y++) v.set(664 + i, y, 205, M.LED_FACADE);
      v.fillBox(668, gY + 14, 184, 12, V(191) - 14, 12, M.GLASS_DARK);
      v.fillBox(682, gY + 14, 186, 9, V(160) - 14, 10, M.GLASS_DARK);
      B.rooftop(v, 668, 184, 12, 12, gY + V(191), rng, { antennaH: 8 });
      return { top: gY + V(191) + 8 };
    },
  });

  add({
    id: 'world-trade-centre', zh: '世贸中心', en: 'World Trade Centre', hm: 148, yr: 1975, dist: '铜锣湾',
    desc: '维园西侧的圆角塔楼，紧邻怡东酒店旧址。',
    rect: [700, 214, 20, 18], anchor: [710, 223],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(148);
      B.tower(v, { x: 702, z: 216, w: 16, d: 14, base: y0, h, mat: M.CONCRETE_L, win: M.GLASS_BLUE, style: 'banded', bandStep: 2, rng, setbacks: 0, cornerCut: 0.3, crown: 'box' });
      return { top: y0 + h + 4 };
    },
  });

  add({
    id: 'kellett-island', zh: '奇力岛 · 香港游艇会', en: 'Kellett Island · RHKYC', hm: 20, yr: 1938, dist: '铜锣湾',
    desc: '避风塘中的小岛，白色会所与成排帆船桅杆。',
    rect: [678, 216, 26, 16], anchor: [690, 224],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(684, y0, 220, 12, 4, 8, M.WHITE_PANEL);
      B.ring(v, 684, y0 + 3, 220, 12, 8, M.FERRY_GREEN, 1);
      v.fillBox(686, y0 + 4, 222, 8, 1, 4, M.ROOF_TILE);
      for (let i = 0; i < 8; i++) { const x = 680 + i * 3, z = 230 + (i % 2); v.fillBox(x, y0, z, 2, 1, 4, M.FERRY_WHITE); v.fillBox(x, y0 + 1, z + 1, 1, 7, 1, M.STEEL); }
      return { top: y0 + 8 };
    },
  });

  // ── 山顶 / 半山 ────────────────────────────────────────────────────────
  add({
    id: 'peak-tower', zh: '凌霄阁', en: 'The Peak Tower', hm: 428, yr: 1997, dist: '太平山',
    desc: '山顶缆车终点的「炒锅」造型观景台，海拔 396 米。',
    rect: [196, 52, 34, 26], anchor: [213, 64],
    build(v, g, B, rng) {
      const gY = g.groundY(213, 64);
      // 基座
      v.fillBox(202, gY - 2, 56, 22, 8, 18, M.CONCRETE_M);
      B.ring(v, 202, gY + 5, 56, 22, 18, M.GLASS_WHITE, 1);
      // 「锅」：两片上翘的曲面 + 中间碗形观景平台
      B.shellRoof(v, 200, 54, 26, 22, (u, vv) => {
        const bowl = Math.pow(Math.abs(u - 0.5) * 2, 1.7) * 9 - Math.sin(Math.PI * vv) * 2;
        return gY + 8 + bowl;
      }, M.ALU, 2);
      for (let i = 0; i < 26; i += 1) {
        const u = i / 25, hh = Math.round(gY + 8 + Math.pow(Math.abs(u - 0.5) * 2, 1.7) * 9);
        for (let y = gY + 8; y < hh; y++) { v.setIfEmpty(200 + i, y, 54, M.GLASS_WHITE); v.setIfEmpty(200 + i, y, 75, M.GLASS_WHITE); }
      }
      v.fillBox(206, gY + 9, 60, 14, 1, 10, M.PAVE_D);              // 观景平台
      B.ring(v, 206, gY + 10, 60, 14, 10, M.STEEL, 1);
      // 山顶广场 + 发射塔
      v.fillBox(226, gY - 1, 58, 10, 6, 12, M.STUCCO_W);
      const rx = 246, rz = 46, ry = g.groundY(rx, rz);
      v.fillBox(rx, ry, rz, 2, 22, 2, M.STEEL_D);
      for (let y = ry + 6; y < ry + 22; y += 5) v.fillBox(rx - 1, y, rz - 1, 4, 1, 4, M.STEEL);
      v.set(rx, ry + 23, rz, M.BEACON_R);
      return { top: gY + 20 };
    },
  });

  add({
    id: 'victoria-peak', zh: '太平山顶', en: 'Victoria Peak', hm: 552, yr: 0, dist: '太平山',
    desc: '海拔 552 米的港岛最高点，维港全景的经典机位。',
    rect: [200, 30, 20, 16], anchor: [208, 38],
    build(v, g, B, rng) {
      const x = 208, z = 38, gY = g.groundY(x, z);
      // 山顶花园的凉亭 + 观景栏杆
      v.fillBox(x - 3, gY, z - 3, 7, 1, 7, M.PAVE_D);
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) v.fillBox(x + dx, gY + 1, z + dz, 1, 4, 1, M.WOOD);
      v.fillBox(x - 4, gY + 5, z - 4, 9, 1, 9, M.ROOF_TILE);
      return { top: gY + 6 };
    },
  });

  add({
    id: 'mid-levels', zh: '半山 / 山坡住宅群', en: 'Mid-Levels Hillside Estates', hm: 150, yr: 1980, dist: '半山',
    desc: '削坡而建的高层住宅群，层层叠叠攀上太平山腰——港岛天际线真正的背景幕。',
    rect: [140, 96, 220, 78], anchor: [240, 130], noReserve: true,
    build(v, g, B, rng) {
      const r = RNG(4242);
      let n = 0;
      // 沿整条港岛山坡撒点：坡度平缓处成组建塔，形成"爬山的高楼墙"
      for (let attempt = 0; attempt < 2600 && n < 430; attempt++) {
        const x = 24 + Math.round(r() * 1000);
        const z = 40 + Math.round(r() * 150);
        if (x < 2 || x >= g.SX - 14 || z < 2) continue;
        const i = x + z * g.SX;
        if (g.land[i] !== 1) continue;
        const gY = g.height[i];
        if (gY <= W.GROUND + 3) continue;                     // 平地留给城市填充
        if (g.use[i] === HKV.Geo.USE.BUILDING) continue;
        // 坡度过陡不建（保留裸露山岩）
        const slope = Math.abs(g.height[i] - g.height[Math.min(g.SX - 1, x + 4) + z * g.SX])
          + Math.abs(g.height[i] - g.height[x + Math.min(g.SZ - 1, z + 4) * g.SX]);
        if (slope > 9) continue;
        if (gY > 96) continue;                                 // 太平山顶保持自然
        const w = 5 + Math.round(r() * 6), d = 5 + Math.round(r() * 5);
        let free = true;
        for (let zz = z - 1; zz <= z + d && free; zz++) for (let xx = x - 1; xx <= x + w; xx++) {
          const j = xx + zz * g.SX;
          if (xx < 0 || zz < 0 || xx >= g.SX || zz >= g.SZ || g.land[j] !== 1 || g.use[j] === HKV.Geo.USE.BUILDING) { free = false; break; }
        }
        if (!free) continue;
        // 削出建筑平台
        let base = gY;
        for (let zz = z; zz < z + d; zz++) for (let xx = x; xx < x + w; xx++) base = Math.max(base, g.height[xx + zz * g.SX]);
        const h = V(60 + r() * 120);
        B.tower(v, {
          x, z, w, d, base: base - 1, h, rng: r, style: 'residential', acDensity: 0.07,
          mat: r() < 0.45 ? M.STUCCO_W : (r() < 0.5 ? M.STUCCO_Y : (r() < 0.6 ? M.CONCRETE_L : M.GLASS_TEAL)),
          win: r() < 0.5 ? M.GLASS_BLUE : M.GLASS_WHITE, setbacks: 0,
          cornerCut: r() < 0.3 ? 0.25 : 0, crown: r() < 0.3 ? 'box' : 'flat',
        });
        for (let zz = z; zz < z + d; zz++) for (let xx = x; xx < x + w; xx++) g.use[xx + zz * g.SX] = HKV.Geo.USE.BUILDING;
        if (r() < 0.5) B.tree(v, x - 1, base, z + d, 2 + Math.round(r() * 2), M.TREE_D);
        n++;
      }
      return { top: 0, noLabel: true, count: n };
    },
  });

  add({
    id: 'western-market', zh: '西港城', en: 'Western Market', hm: 25, yr: 1906, dist: '上环',
    desc: '爱德华式红砖拱廊建筑，上环的殖民地记忆。',
    rect: [150, 226, 16, 14], anchor: [158, 233],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(150, y0, 226, 16, 7, 14, M.BRICK_R);
      B.ring(v, 150, y0 + 3, 226, 16, 14, M.BONE, 1);
      for (let i = 1; i < 15; i += 3) { v.fillBox(150 + i, y0 + 1, 225, 2, 2, 1, M.BONE); v.fillBox(150 + i, y0 + 1, 240, 2, 2, 1, M.BONE); }
      v.fillBox(149, y0 + 7, 225, 18, 1, 16, M.ROOF_TILE);
      for (const [dx, dz] of [[0, 0], [15, 0], [0, 13], [15, 13]]) { v.fillBox(150 + dx, y0 + 8, 226 + dz, 1, 3, 1, M.BRICK_R); v.set(150 + dx, y0 + 11, 226 + dz, M.BONE); }
      return { top: y0 + 11 };
    },
  });

  // ------------------------------------------------------------------ 九龙
  add({
    id: 'icc', zh: '环球贸易广场', en: 'International Commerce Centre', hm: 484, yr: 2010, dist: '西九龙',
    desc: '全港最高（484 米）：塔身向上锥收、四角「剥离」出弧线，立面本身就是巨幕。',
    rect: [196, 452, 44, 44], anchor: [218, 474],
    build(v, g, B, rng) {
      const y0 = W.GROUND, H = V(484), cx = 218, cz = 474;
      // 裙楼（圆方商场 + 九龙站上盖平台）
      v.fillBox(196, y0, 452, 44, 9, 44, M.CONCRETE_L);
      B.ring(v, 196, y0 + 8, 452, 44, 44, M.GLASS_WHITE, 1);
      // 塔身：24 -> 15 锥收，四角剥离（切角随高度增大）
      const bodyH = H - 22;
      for (let y = 0; y < bodyH; y++) {
        const t = y / bodyH;
        const s = Math.round(24 - 9 * t);
        const x0 = cx - (s >> 1), z0 = cz - (s >> 1);
        const mat = (y % 4 === 3) ? M.CONCRETE_L : M.GLASS_SILVER;
        v.fillBox(x0, y0 + 9 + y, z0, s, 1, s, mat);
        const cut = Math.round(2 + 3.4 * t);
        for (let i = 0; i < cut; i++) {
          const k = cut - i;
          v.fillBox(x0, y0 + 9 + y, z0 + i, k, 1, 1, 0);
          v.fillBox(x0 + s - k, y0 + 9 + y, z0 + i, k, 1, 1, 0);
          v.fillBox(x0, y0 + 9 + y, z0 + s - 1 - i, k, 1, 1, 0);
          v.fillBox(x0 + s - k, y0 + 9 + y, z0 + s - 1 - i, k, 1, 1, 0);
        }
        // 剥离的弧形凸缘（四角竖向线条）
        if (y > bodyH * 0.12) {
          v.set(x0 + cut, y0 + 9 + y, z0 + cut - 1, M.ALU);
          v.set(x0 + s - cut - 1, y0 + 9 + y, z0 + cut - 1, M.ALU);
          v.set(x0 + cut, y0 + 9 + y, z0 + s - cut, M.ALU);
          v.set(x0 + s - cut - 1, y0 + 9 + y, z0 + s - cut, M.ALU);
        }
        // 面向维港（-z）的媒体幕墙区
        if (y > bodyH * 0.55 && y % 3 === 0) v.fillBox(x0 + cut + 1, y0 + 9 + y, z0 + cut - 1, s - cut * 2 - 2, 1, 1, M.LED_FACADE);
      }
      // 冠部：外张的檐口 + 天线
      let yy = y0 + 9 + bodyH, ss = 16;
      v.fillBox(cx - (ss >> 1) - 1, yy, cz - (ss >> 1) - 1, ss + 2, 2, ss + 2, M.ALU);
      yy += 2;
      for (let k = 0; k < 4; k++) { v.fillBox(cx - (ss >> 1), yy, cz - (ss >> 1), ss, 3, ss, M.GLASS_SILVER); yy += 3; ss -= 3; }
      v.fillBox(cx - 2, yy, cz - 2, 5, 3, 5, M.STEEL);
      v.fillBox(cx, yy + 3, cz, 1, 10, 1, M.STEEL_D);
      v.set(cx, yy + 13, cz, M.BEACON_R);
      return { top: yy + 13 };
    },
  });

  add({
    id: 'cullinan', zh: '天玺 · 九龙站上盖', en: 'The Cullinan / Kowloon Station', hm: 270, yr: 2009, dist: '西九龙',
    desc: 'ICC 脚下的住宅双塔与「凯旋门」等上盖群，构成西九龙的高密度基座。',
    rect: [172, 492, 96, 46], anchor: [220, 514],
    build(v, g, B, rng) {
      const y0 = W.GROUND, r = RNG(881);
      v.fillBox(172, y0, 492, 96, 10, 46, M.CONCRETE_L);            // 车站上盖平台
      B.ring(v, 172, y0 + 9, 492, 96, 46, M.GLASS_WHITE, 1);
      const towers = [
        [178, 498, 13, 13, 270], [196, 498, 13, 13, 270], [216, 500, 12, 12, 231],
        [232, 498, 11, 14, 210], [248, 502, 12, 12, 196], [180, 520, 12, 12, 180],
        [200, 522, 11, 11, 176], [220, 522, 12, 12, 168], [240, 524, 11, 11, 160], [256, 520, 12, 12, 188],
      ];
      for (const [x, z, w, d, hm] of towers) {
        B.tower(v, {
          x, z, w, d, base: y0 + 10, h: V(hm) - 10, rng: r, style: 'residential', acDensity: 0.1,
          mat: r() < 0.5 ? M.GLASS_TEAL : M.CONCRETE_L, win: M.GLASS_WHITE, setbacks: 0,
          cornerCut: 0.25, crown: r() < 0.5 ? 'stepped' : 'box', crownMat: M.CONCRETE_L,
        });
      }
      return { top: y0 + V(270) + 6 };
    },
  });

  add({
    id: 'wkcd-mplus', zh: 'M+ 博物馆', en: 'M+ Museum', hm: 65, yr: 2021, dist: '西九龙',
    desc: '横向展厅上立起竖屏塔楼，面向维港的巨型陶砖幕墙夜间放映影像。',
    rect: [100, 456, 46, 26], anchor: [123, 468],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(100, y0, 462, 46, 9, 20, M.CONCRETE_D);             // 横向基座
      B.ring(v, 100, y0 + 8, 462, 46, 20, M.CONCRETE_M, 1);
      v.fillBox(116, y0 + 9, 464, 18, 8, 14, M.BLACK_PANEL);        // 竖屏塔
      for (let i = 1; i < 17; i++) for (let y = y0 + 10; y < y0 + 17; y++) v.set(116 + i, y, 463, M.LED_FACADE);
      for (let i = 2; i < 44; i += 3) for (let y = y0 + 2; y < y0 + 7; y++) v.set(100 + i, y, 461, M.GLASS_DARK);
      return { top: y0 + 17 };
    },
  });

  add({
    id: 'palace-museum', zh: '香港故宫文化博物馆', en: 'HK Palace Museum', hm: 40, yr: 2022, dist: '西九龙',
    desc: '上宽下窄的「方鼎」造型，米金色铝板幕墙。',
    rect: [58, 468, 26, 22], anchor: [71, 479],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      B.taper(v, 71, 479, 16, 14, 26, 20, y0, 10, M.GOLD_TRIM);
      B.taper(v, 71, 479, 26, 20, 24, 18, y0 + 10, 2, M.COPPER);
      for (let y = y0 + 2; y < y0 + 10; y += 3) B.ring(v, 60, y, 470, 22, 18, M.GLASS_BRONZE, 1);
      v.fillBox(64, y0 - 1, 464, 14, 2, 6, M.PAVE_D);
      return { top: y0 + 12 };
    },
  });

  add({
    id: 'xiqu-centre', zh: '戏曲中心', en: 'Xiqu Centre', hm: 60, yr: 2019, dist: '西九龙',
    desc: '「气」形铜色帘幕包裹的方盒，底层挑出月洞门。',
    rect: [162, 508, 26, 24], anchor: [175, 520],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(162, y0, 508, 26, 15, 24, M.COPPER);
      v.fillBox(166, y0, 506, 18, 8, 4, 0);                          // 月洞门
      B.dome(v, 175, y0 + 7, 508, 8, M.COPPER, 0.5);
      for (let i = 0; i < 26; i += 2) for (let y = y0 + 2; y < y0 + 14; y += 2) { v.set(162 + i, y, 507, M.GOLD_TRIM); v.set(162 + i, y, 531, M.GOLD_TRIM); }
      v.fillBox(164, y0 + 15, 510, 22, 1, 20, M.ALU);
      return { top: y0 + 16 };
    },
  });

  add({
    id: 'wk-terminus', zh: '高铁西九龙站', en: 'West Kowloon Station', hm: 45, yr: 2018, dist: '西九龙',
    desc: '巨型波浪玻璃屋盖向天空掀起，站台在地下。',
    rect: [276, 496, 56, 44], anchor: [304, 518],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(276, y0 - 1, 496, 56, 2, 44, M.CONCRETE_L);
      B.shellRoof(v, 276, 496, 56, 44, (u, vv) => {
        const wave = Math.sin(Math.PI * vv) * 10 + Math.sin(Math.PI * u * 1.2) * 4;
        return y0 + 3 + wave + 6 * u;
      }, M.GLASS_WHITE, 1);
      for (let i = 0; i < 56; i += 6) {
        const hh = Math.round(y0 + 3 + Math.sin(Math.PI * 0.5) * 10 + 6 * (i / 55));
        B.line(v, 276 + i, y0 + 1, 496, 276 + i, hh, 520, M.STEEL);
      }
      for (let j = 0; j < 44; j += 4) for (let y = y0 + 1; y < y0 + 8; y++) v.set(276, y, 496 + j, M.GLASS_WHITE);
      return { top: y0 + 20 };
    },
  });

  add({
    id: 'harbour-city', zh: '海港城 · 海运大厦', en: 'Harbour City / Ocean Terminal', hm: 60, yr: 1966, dist: '尖沙咀',
    desc: '香港最长的商场群，海运大厦码头可靠泊巨型邮轮。',
    rect: [386, 424, 78, 60], anchor: [420, 452],
    build(v, g, B, rng) {
      const y0 = W.GROUND, r = RNG(553);
      // 海运大厦：伸入海中的长条码头 + 甲板观景台
      B.pier(v, 396, 424, 26, 26, y0, M.PROMENADE, M.CONCRETE_D);
      v.fillBox(398, y0 + 1, 426, 22, 10, 22, M.WHITE_PANEL);
      B.bandFacade(v, 398, 426, 22, 22, y0 + 1, 10, 3, M.GLASS_WHITE);
      v.fillBox(400, y0 + 11, 428, 18, 1, 18, M.PAVE_D);
      B.ring(v, 400, y0 + 12, 428, 18, 18, M.STEEL, 1);
      // 商场长条（沿广东道向北）
      v.fillBox(392, y0, 450, 40, 12, 34, M.CONCRETE_L);
      B.bandFacade(v, 392, 450, 40, 34, y0, 12, 3, M.GLASS_WHITE);
      B.rooftop(v, 392, 450, 40, 34, y0 + 12, r, { antenna: false });
      // 港威大厦四塔
      for (const [x, z, hm] of [[436, 452, 172], [436, 468, 172], [452, 452, 168], [452, 468, 168]]) {
        B.tower(v, { x, z, w: 12, d: 12, base: y0, h: V(hm), rng: r, mat: M.GLASS_TEAL, style: 'glass', setbacks: 0, cornerCut: 0.2, crown: 'stepped', crownMat: M.GLASS_TEAL, trim: M.WHITE_PANEL });
      }
      return { top: y0 + V(172) + 6 };
    },
  });

  add({
    id: 'china-hk-city', zh: '中港城', en: 'China Hong Kong City', hm: 110, yr: 1988, dist: '尖沙咀',
    desc: '金色玻璃的五连塔，中国客运码头在其下。',
    rect: [478, 436, 34, 24], anchor: [495, 448],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(478, y0, 436, 34, 8, 24, M.CONCRETE_L);
      for (let k = 0; k < 5; k++) {
        const x = 480 + k * 6;
        v.fillBox(x, y0 + 8, 440, 5, V(110) - 8 - k % 2 * 4, 14, M.GLASS_GOLD);
        v.fillBox(x, y0 + V(110) - k % 2 * 4, 440, 5, 2, 14, M.GOLD_TRIM);
      }
      return { top: y0 + V(110) + 2 };
    },
  });

  add({
    id: 'star-ferry-tst', zh: '尖沙咀天星码头', en: 'TST Star Ferry Pier', hm: 15, yr: 1957, dist: '尖沙咀',
    desc: '绿白色的老码头，穿越维港只需八分钟。',
    rect: [552, 424, 26, 16], anchor: [565, 432],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      B.pier(v, 552, 424, 24, 14, y0, M.PROMENADE, M.CONCRETE_D);
      v.fillBox(554, y0 + 1, 426, 20, 4, 10, M.FERRY_WHITE);
      B.ring(v, 554, y0 + 4, 426, 20, 10, M.FERRY_GREEN, 1);
      v.fillBox(554, y0 + 5, 426, 20, 1, 10, M.FERRY_GREEN);
      for (let i = 0; i < 20; i += 4) B.lamp(v, 554 + i, y0 + 1, 425, 3, 0);
      return { top: y0 + 6 };
    },
  });

  add({
    id: 'clock-tower', zh: '前九广铁路钟楼', en: 'Former KCR Clock Tower', hm: 44, yr: 1915, dist: '尖沙咀',
    desc: '红砖与花岗岩的钟楼，是九广铁路旧尖沙咀站唯一遗存。',
    rect: [566, 428, 10, 10], anchor: [571, 433],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(44);
      v.fillBox(568, y0, 430, 6, h - 4, 6, M.BRICK_R);
      for (let y = y0 + 3; y < y0 + h - 6; y += 4) B.ring(v, 568, y, 430, 6, 6, M.BONE, 1);
      v.fillBox(567, y0 + h - 5, 429, 8, 1, 8, M.BONE);
      v.fillBox(569, y0 + h - 4, 431, 4, 3, 4, M.BRICK_R);
      // 四面钟
      v.fillBox(570, y0 + h - 8, 429, 2, 2, 1, M.WIN_WARM);
      v.fillBox(570, y0 + h - 8, 436, 2, 2, 1, M.WIN_WARM);
      v.fillBox(567, y0 + h - 8, 432, 1, 2, 2, M.WIN_WARM);
      v.fillBox(574, y0 + h - 8, 432, 1, 2, 2, M.WIN_WARM);
      B.dome(v, 571, y0 + h - 1, 433, 2.6, M.COPPER, 1.4);
      v.fillBox(571, y0 + h + 3, 433, 1, 3, 1, M.COPPER);
      return { top: y0 + h + 6 };
    },
  });

  add({
    id: 'cultural-centre', zh: '香港文化中心', en: 'HK Cultural Centre', hm: 40, yr: 1989, dist: '尖沙咀',
    desc: '两片向上翻起的无窗曲面外墙，粉红瓷砖，被戏称「浴室瓷砖」。',
    rect: [578, 428, 44, 30], anchor: [600, 442],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 两片斜曲面翼
      B.shellRoof(v, 578, 430, 44, 26, (u, vv) => {
        const s = Math.pow(Math.abs(u - 0.5) * 2, 1.6);
        return y0 + 3 + s * 11 + (1 - vv) * 1.5;
      }, M.BONE, 3);
      for (let i = 0; i < 44; i++) {
        const u = i / 43, top = Math.round(y0 + 3 + Math.pow(Math.abs(u - 0.5) * 2, 1.6) * 11);
        for (let y = y0; y < top; y++) { v.set(578 + i, y, 430, M.BONE); v.set(578 + i, y, 455, M.BONE); }
      }
      for (let j = 0; j < 26; j++) for (let y = y0; y < y0 + 14; y++) { v.setIfEmpty(578, y, 430 + j, M.BONE); v.setIfEmpty(621, y, 430 + j, M.BONE); }
      v.fillBox(579, y0, 431, 42, 3, 24, M.BONE);
      // 前广场
      v.fillBox(576, y0 - 1, 424, 50, 1, 5, M.PROMENADE);
      return { top: y0 + 15 };
    },
  });

  add({
    id: 'space-museum', zh: '香港太空馆', en: 'HK Space Museum', hm: 30, yr: 1980, dist: '尖沙咀',
    desc: '白色半球蛋形天象厅，是尖沙咀最可爱的几何体。',
    rect: [624, 432, 22, 20], anchor: [634, 441],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(624, y0, 434, 20, 4, 16, M.WHITE_PANEL);
      B.dome(v, 634, y0 + 3, 442, 8.5, M.WHITE_PANEL, 0.85);
      for (let a = 0; a < 24; a++) {
        const th = a / 24 * Math.PI * 2;
        v.set(Math.round(634 + Math.cos(th) * 8.6), y0 + 3, Math.round(442 + Math.sin(th) * 8.6), M.ALU);
      }
      v.fillBox(626, y0, 432, 6, 5, 3, M.WHITE_PANEL);
      return { top: y0 + 12 };
    },
  });

  add({
    id: 'peninsula', zh: '半岛酒店', en: 'The Peninsula', hm: 172, yr: 1928, dist: '尖沙咀',
    desc: '1928 年的「远东贵妇」，H 形老楼上加建 30 层新翼与两个直升机坪。',
    rect: [590, 456, 30, 26], anchor: [605, 468],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 老楼 H 形
      v.fillBox(590, y0, 458, 8, 12, 22, M.STUCCO_Y);
      v.fillBox(612, y0, 458, 8, 12, 22, M.STUCCO_Y);
      v.fillBox(598, y0, 464, 14, 12, 10, M.STUCCO_Y);
      B.bandFacade(v, 590, 458, 8, 22, y0, 12, 2, M.WIN_WARM);
      B.bandFacade(v, 612, 458, 8, 22, y0, 12, 2, M.WIN_WARM);
      v.fillBox(589, y0 + 12, 457, 10, 1, 24, M.ROOF_TILE);
      v.fillBox(611, y0 + 12, 457, 10, 1, 24, M.ROOF_TILE);
      // 新翼塔
      v.fillBox(598, y0 + 12, 462, 14, V(172) - 12, 14, M.STUCCO_W);
      B.bandFacade(v, 598, 462, 14, 14, y0 + 12, V(172) - 12, 2, M.GLASS_WHITE);
      const rt = y0 + V(172);
      v.fillBox(598, rt, 462, 14, 1, 14, M.ROOF_TAR);
      for (const dz of [0, 9]) { v.fillBox(600, rt + 1, 463 + dz, 5, 1, 5, M.HELIPAD); B.ring(v, 600, rt + 1, 463 + dz, 5, 5, M.MARK_W, 1); }
      // 门前喷泉广场
      v.fillBox(600, y0 - 1, 452, 10, 1, 5, M.PAVE_L);
      B.cyl(v, 605, 454, 2.5, y0, 1, M.GLASS_WHITE);
      return { top: rt + 2 };
    },
  });

  add({
    id: 'heritage-1881', zh: '1881 前水警总部', en: '1881 Heritage', hm: 25, yr: 1884, dist: '尖沙咀',
    desc: '殖民地时期水警总部，白墙拱廊坐在小山丘上。',
    rect: [576, 452, 20, 18], anchor: [586, 461],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(576, y0, 452, 20, 2, 18, M.SLOPE_G);                 // 小丘
      v.fillBox(578, y0 + 2, 454, 16, 6, 12, M.BONE);
      for (let i = 1; i < 15; i += 2) { v.fillBox(578 + i, y0 + 3, 453, 1, 3, 1, M.STUCCO_W); v.fillBox(578 + i, y0 + 3, 466, 1, 3, 1, M.STUCCO_W); }
      v.fillBox(577, y0 + 8, 453, 18, 1, 14, M.ROOF_TILE);
      v.fillBox(584, y0 + 9, 458, 4, 3, 4, M.BONE);
      v.fillBox(586, y0 + 12, 460, 1, 4, 1, M.STEEL);                // 报时球桅
      return { top: y0 + 16 };
    },
  });

  add({
    id: 'k11-musea', zh: 'K11 MUSEA · 名铸', en: 'K11 MUSEA / The Masterpiece', hm: 261, yr: 2019, dist: '尖沙咀',
    desc: '维港畔的艺术商场与其上的名铸塔楼，绿色垂直花园幕墙。',
    rect: [636, 434, 40, 34], anchor: [656, 450],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(636, y0, 436, 34, 14, 28, M.CONCRETE_L);
      // 垂直绿化幕墙
      for (let i = 2; i < 32; i += 2) for (let y = y0 + 2; y < y0 + 13; y += 2) v.set(636 + i, y, 435, M.TREE);
      B.bandFacade(v, 636, 436, 34, 28, y0, 14, 4, M.GLASS_WHITE);
      B.tower(v, { x: 652, z: 452, w: 14, d: 14, base: y0 + 14, h: V(261) - 14, rng, mat: M.GLASS_DARK, style: 'glass', setbacks: 0, cornerCut: 0.2, crown: 'spire', crownMat: M.STEEL, trim: M.CONCRETE_L });
      return { top: y0 + V(261) + 8 };
    },
  });

  add({
    id: 'intercontinental', zh: '洲际酒店', en: 'InterContinental HK', hm: 60, yr: 1980, dist: '尖沙咀',
    desc: '悬在海边的低层酒店，落地玻璃正对港岛天际线。',
    rect: [620, 428, 24, 16], anchor: [632, 436],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(620, y0, 430, 24, 12, 12, M.GLASS_BRONZE);
      B.bandFacade(v, 620, 430, 24, 12, y0, 12, 2, M.CONCRETE_L);
      v.fillBox(620, y0 + 12, 430, 24, 1, 12, M.ROOF_TAR);
      B.pier(v, 622, 426, 18, 4, y0, M.PROMENADE, M.CONCRETE_D);
      return { top: y0 + 13 };
    },
  });

  add({
    id: 'avenue-of-stars', zh: '星光大道', en: 'Avenue of Stars', hm: 5, yr: 2004, dist: '尖沙咀',
    desc: '维港最著名的海滨长廊，正对港岛天际线，幻彩咏香江的观赏点。',
    rect: [612, 424, 96, 10], anchor: [660, 428],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(612, y0, 424, 96, 1, 8, M.PROMENADE);
      for (let x = 612; x < 708; x += 2) v.set(x, y0 + 1, 424, M.STEEL);          // 海边栏杆
      for (let x = 616; x < 708; x += 12) { B.lamp(v, x, y0 + 1, 429, 4, 0); B.palm(v, x + 5, y0 + 1, 430, 4); }
      // 李小龙铜像 + 星形地砖
      const sx = 646;
      v.fillBox(sx, y0 + 1, 427, 1, 1, 1, M.PAVE_D);
      v.fillBox(sx, y0 + 2, 427, 1, 2, 1, M.STATUE);
      v.set(sx - 1, y0 + 3, 427, M.STATUE); v.set(sx + 1, y0 + 3, 427, M.STATUE);
      v.set(sx, y0 + 4, 427, M.STATUE);
      for (let x = 618; x < 706; x += 6) v.set(x, y0, 426, M.GOLD_TRIM);
      return { top: y0 + 5 };
    },
  });

  add({
    id: 'chungking', zh: '重庆大厦', en: 'Chungking Mansions', hm: 62, yr: 1961, dist: '尖沙咀',
    desc: '弥敦道上的「世界中心」：五座相连大楼、密密麻麻的招牌与空调机。',
    rect: [618, 462, 24, 22], anchor: [630, 473],
    build(v, g, B, rng) {
      const y0 = W.GROUND, r = RNG(731), h = V(62);
      v.fillBox(618, y0, 462, 24, 6, 22, M.STUCCO_G);
      for (let k = 0; k < 3; k++) {
        const x = 619 + k * 8;
        v.fillBox(x, y0 + 6, 464, 7, h - 6, 18, k % 2 ? M.STUCCO_Y : M.STUCCO_G);
        B.bandFacade(v, x, 464, 7, 18, y0 + 6, h - 6, 2, M.GLASS_WHITE);
        B.acUnits(v, x, 464, 7, 18, y0 + 6, h - 6, r, 0.4);
        B.rooftop(v, x, 464, 7, 18, y0 + h, r, { antennaH: 4 });
      }
      // 底层霓虹招牌墙
      for (let y = y0 + 1; y < y0 + 6; y += 2) {
        for (let i = 0; i < 20; i += 5) {
          const mats = [M.NEON_PINK, M.NEON_CYAN, M.NEON_YELL, M.NEON_GREEN, M.NEON_RED];
          B.neonSign(v, 618 + i, y, 461, 0, -1, 4, 1, mats[(i + y) % 5], 2);
        }
      }
      return { top: y0 + h + 4 };
    },
  });

  add({
    id: 'isquare', zh: 'iSQUARE 国际广场', en: 'iSQUARE', hm: 130, yr: 2009, dist: '尖沙咀',
    desc: '弥敦道口的玻璃商场塔，外墙整片 LED。',
    rect: [598, 466, 20, 20], anchor: [608, 476],
    build(v, g, B, rng) {
      const y0 = W.GROUND, h = V(130);
      v.fillBox(598, y0, 466, 20, h, 18, M.GLASS_DARK);
      for (let y = y0 + 2; y < y0 + h - 2; y += 2) B.ring(v, 598, y, 466, 20, 18, M.LED_FACADE, 1);
      for (let i = 2; i < 18; i += 3) for (let y = y0 + 2; y < y0 + 12; y++) v.set(598 + i, y, 465, M.LED_FACADE);
      B.rooftop(v, 598, 466, 20, 18, y0 + h, rng, { antennaH: 6 });
      return { top: y0 + h + 6 };
    },
  });

  add({
    id: 'hk-coliseum', zh: '香港体育馆', en: 'Hong Kong Coliseum', hm: 45, yr: 1983, dist: '红磡',
    desc: '倒金字塔造型的「红馆」，四面向外倾斜的白色墙体。',
    rect: [748, 458, 40, 36], anchor: [768, 476],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(748, y0 - 1, 458, 40, 2, 36, M.CONCRETE_L);
      // 倒金字塔：自下而上外扩
      for (let y = 0; y < 11; y++) {
        const t = y / 10;
        const w = Math.round(16 + 22 * t), d = Math.round(14 + 20 * t);
        const x = 768 - (w >> 1), z = 476 - (d >> 1);
        v.fillBox(x, y0 + 1 + y, z, w, 1, d, y === 10 ? M.ALU : M.WHITE_PANEL);
        if (y > 6) B.ring(v, x, y0 + 1 + y, z, w, d, M.GLASS_WHITE, 1);
      }
      v.fillBox(752, y0 + 12, 462, 32, 1, 28, M.ALU);
      B.rooftop(v, 754, 464, 28, 24, y0 + 12, rng, { antenna: false, parapetMat: M.ALU });
      return { top: y0 + 14 };
    },
  });

  add({
    id: 'hung-hom-station', zh: '红磡站', en: 'Hung Hom Station', hm: 20, yr: 1975, dist: '红磡',
    desc: '过海隧道旁的铁路枢纽，长条月台雨棚。',
    rect: [772, 486, 56, 26], anchor: [800, 498],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      v.fillBox(772, y0, 486, 30, 7, 22, M.CONCRETE_L);
      B.ring(v, 772, y0 + 6, 486, 30, 22, M.GLASS_WHITE, 1);
      v.fillBox(772, y0 + 7, 486, 30, 1, 22, M.ALU);
      for (let k = 0; k < 4; k++) {
        const z = 490 + k * 5;
        v.fillBox(804, y0, z, 24, 1, 3, M.CONCRETE_D);
        for (let i = 0; i < 24; i += 4) v.fillBox(804 + i, y0 + 1, z, 1, 4, 1, M.STEEL);
        v.fillBox(804, y0 + 5, z - 1, 24, 1, 5, M.ALU);
      }
      return { top: y0 + 8 };
    },
  });

  add({
    id: 'whampoa', zh: '黄埔号', en: 'Whampoa Ship', hm: 30, yr: 1991, dist: '红磡',
    desc: '黄埔花园里的混凝土「巨轮」商场，原址是黄埔船坞。',
    rect: [872, 486, 40, 18], anchor: [892, 495],
    build(v, g, B, rng) {
      const y0 = W.GROUND;
      // 船体
      for (let i = 0; i < 40; i++) {
        const t = i / 39;
        const d = Math.round(14 * Math.sin(Math.PI * Math.min(1, t * 1.15)) + 2);
        v.fillBox(872 + i, y0, 495 - (d >> 1), 1, 7, d, M.WHITE_PANEL);
      }
      v.fillBox(880, y0 + 7, 490, 20, 4, 10, M.WHITE_PANEL);
      v.fillBox(884, y0 + 11, 492, 10, 2, 6, M.GLASS_WHITE);
      v.fillBox(896, y0 + 13, 493, 3, 4, 3, M.HULL_RED);            // 烟囱
      v.fillBox(878, y0 + 11, 494, 1, 6, 1, M.STEEL);
      return { top: y0 + 17 };
    },
  });

  add({
    id: 'harbourfront-landmark', zh: '半岛豪庭 / 海名轩', en: 'Harbourfront Landmark', hm: 233, yr: 2001, dist: '红磡',
    desc: '红磡湾畔的住宅高塔组群，塔顶带尖顶冠。',
    rect: [800, 452, 36, 30], anchor: [818, 466],
    build(v, g, B, rng) {
      const y0 = W.GROUND, r = RNG(9971);
      for (const [x, z, hm] of [[802, 456, 233], [818, 454, 210], [812, 470, 196]]) {
        B.tower(v, { x, z, w: 13, d: 13, base: y0, h: V(hm), rng: r, mat: M.STUCCO_W, win: M.GLASS_BLUE, style: 'residential', acDensity: 0.08, setbacks: 0, cornerCut: 0.25, crown: 'pyramid', crownMat: M.ROOF_TILE });
      }
      return { top: y0 + V(233) + 8 };
    },
  });

  add({
    id: 'tst-east', zh: '尖东酒店群', en: 'TST East Hotels', hm: 180, yr: 1981, dist: '尖沙咀',
    desc: '香格里拉、日航、帝苑等尖东酒店群，与新世界中心一同围出漆咸道天际线。',
    rect: [672, 448, 56, 40], anchor: [700, 468],
    build(v, g, B, rng) {
      const y0 = W.GROUND, r = RNG(3311);
      const specs = [[674, 452, 14, 14, 180], [692, 450, 13, 16, 165], [710, 454, 12, 14, 148], [676, 472, 14, 12, 140], [696, 474, 16, 12, 132], [714, 472, 12, 12, 120]];
      for (const [x, z, w, d, hm] of specs) {
        B.tower(v, {
          x, z, w, d, base: y0, h: V(hm), rng: r, style: r() < 0.5 ? 'banded' : 'glass',
          mat: r() < 0.4 ? M.GLASS_BRONZE : (r() < 0.5 ? M.CONCRETE_L : M.GLASS_TEAL),
          win: M.GLASS_WHITE, setbacks: 0, crown: r() < 0.4 ? 'box' : 'flat', helipad: r() < 0.2,
        });
        // 面向维港的天台招牌
        if (r() < 0.6) B.roofSign(v, x + 1, y0 + V(hm) + 1, z - 1, Math.max(4, w - 2), 4, -1, r() < 0.5 ? M.NEON_CYAN : M.NEON_PINK);
      }
      return { top: y0 + V(180) + 6 };
    },
  });

  // ---------------------------------------------------------------- 构建入口
  function reserveAll(geo) {
    const USE = HKV.Geo.USE;
    for (const d of DEFS) {
      // 自定义占位（线性构筑物：缆车路权 / 高架桥…）
      if (d.reserve) { try { d.reserve(geo, USE); } catch (e) { console.warn('reserve failed: ' + d.id, e); } }
      if (d.noReserve) continue;
      const [x0, z0, w, h] = d.rect;
      for (let z = z0 - 2; z < z0 + h + 2; z++) for (let x = x0 - 2; x < x0 + w + 2; x++) {
        if (x < 0 || z < 0 || x >= geo.SX || z >= geo.SZ) continue;
        geo.use[x + z * geo.SX] = USE.BUILDING;
      }
    }
  }

  function build(vol, geo) {
    const B = HKV.B;
    RESULTS.length = 0;
    for (const d of DEFS) {
      const rng = RNG(hashStr(d.id));
      let r = null;
      try { r = d.build(vol, geo, B, rng) || {}; } catch (e) { console.warn('landmark failed: ' + d.id, e); r = {}; }
      const [x0, z0, w, h] = d.rect;
      const ax = d.anchor ? d.anchor[0] : x0 + w / 2, az = d.anchor ? d.anchor[1] : z0 + h / 2;
      RESULTS.push({
        id: d.id, zh: d.zh, en: d.en, hm: d.hm, yr: d.yr, dist: d.dist, desc: d.desc,
        rect: d.rect, x: ax, z: az, top: r.top || (W.GROUND + 20), noLabel: !!r.noLabel,
      });
    }
    return RESULTS;
  }

  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }

  HKV.Landmarks = { add, build, reserveAll, list: () => RESULTS, defs: () => DEFS };

})(typeof window !== 'undefined' ? window : globalThis);
