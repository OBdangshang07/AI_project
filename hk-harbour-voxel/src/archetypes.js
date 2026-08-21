/* =============================================================================
 * VOXEL VICTORIA HARBOUR · archetypes.js
 * 非地标建筑的"品种库"。香港的普通楼宇并不是一堆等比方盒：唐楼有骑楼与阳台、
 * 公屋是十字型/长条型加彩色油漆带、私宅是风车型带凸窗、工业大厦是外露混凝土
 * 框架加山墙广告、停车场是层层横缝、酒店是裙楼加塔楼……本模块把这些原型逐个
 * 造出来，city.js 按分区性格 / 地块尺寸 / 临街位置来抽签。
 *
 * 每个原型: fn(vol, o) -> { top, cx, cz, cw, cd }
 *   o = { x, z, w, d, base, h(体素), rng, mat, win, trim, ac, sign, district }
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const { W, M, B, clamp, lerp } = HKV;

  const A = {};
  const T = {};                                  // 原型表
  const pick = (rng, arr) => arr[Math.min(arr.length - 1, (rng() * arr.length) | 0)];

  // 公屋 / 私宅常见的外墙油漆色（成对使用：主色 + 腰线色）
  const PAINT = [
    [M.STUCCO_W, M.STUCCO_Y], [M.STUCCO_Y, M.BRICK_R], [M.STUCCO_P, M.STUCCO_W],
    [M.STUCCO_G, M.STUCCO_W], [M.CONCRETE_L, M.STUCCO_Y], [M.STUCCO_W, M.GLASS_TEAL],
    [M.CONCRETE_L, M.BRICK_R], [M.STUCCO_Y, M.STUCCO_G],
  ];
  const GLASSES = [M.GLASS_BLUE, M.GLASS_TEAL, M.GLASS_SILVER, M.GLASS_DARK, M.GLASS_GREEN,
  M.GLASS_BRONZE, M.GLASS_GOLD, M.GLASS_WHITE];

  // 逐层窗带（住宅语言：每层一圈窗 + 可选凸窗）
  function windowBands(v, x, z, w, d, y0, h, win, step, bay) {
    for (let y = y0 + 1; y < y0 + h; y += step) {
      B.ring(v, x, y, z, w, d, win, 1);
      if (bay) {
        // 凸窗：沿长边每隔 3 格向外凸 1 体素（香港住宅的招牌轮廓）
        for (let i = 1; i < w - 1; i += 3) {
          v.setIfEmpty(x + i, y, z - 1, win);
          v.setIfEmpty(x + i, y, z + d, win);
        }
        for (let j = 1; j < d - 1; j += 3) {
          v.setIfEmpty(x - 1, y, z + j, win);
          v.setIfEmpty(x + w, y, z + j, win);
        }
      }
    }
  }

  // 混凝土框架（工业 / 停车场语言：竖柱 + 横梁露明）
  function frameFacade(v, x, z, w, d, y0, h, matCol, step) {
    for (let i = 0; i < w; i += step) {
      v.fillBox(x + i, y0, z - 0, 1, h, 1, matCol);
      v.fillBox(x + i, y0, z + d - 1, 1, h, 1, matCol);
    }
    for (let j = 0; j < d; j += step) {
      v.fillBox(x, y0, z + j, 1, h, 1, matCol);
      v.fillBox(x + w - 1, y0, z + j, 1, h, 1, matCol);
    }
  }

  // ------------------------------------------------------------------ 唐楼
  // 3~8 层，地面骑楼（柱廊）+ 逐层阳台 + 招牌，窄面宽、贴墙而建
  T.tenement = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 3, 9);
    const [wall, band] = pick(rng, PAINT);
    v.fillBox(x, base, z, w, h, d, wall);
    // 骑楼：底层朝街一侧掏空成柱廊
    const face = o.faceZ > 0 ? z + d - 1 : z;
    if (w >= 4) {
      for (let i = 1; i < w - 1; i++) if (i % 2) v.fillBox(x + i, base, face, 1, 2, 1, 0);
    }
    // 层间腰线 + 窗
    for (let y = base + 2; y < base + h; y++) {
      B.ring(v, x, y, z, w, d, (y - base) % 2 ? o.win : band, 1);
      // 阳台：朝街一面外挑 1 体素
      if ((y - base) % 2 === 0) {
        for (let i = 1; i < w - 1; i++) v.setIfEmpty(x + i, y, o.faceZ > 0 ? z + d : z - 1, band);
      }
    }
    B.acUnits(v, x, z, w, d, base, h, rng, 0.3);
    B.ring(v, x, base + h, z, w, d, M.CONCRETE_M, 1);          // 女儿墙
    if (rng() < 0.75) {
      const neon = [M.NEON_PINK, M.NEON_CYAN, M.NEON_YELL, M.NEON_GREEN, M.NEON_RED];
      B.neonSign(v, x + (w >> 1), base + 2 + ((rng() * 2) | 0), o.faceZ > 0 ? z + d : z - 1,
        0, o.faceZ > 0 ? 1 : -1, 2 + ((rng() * 3) | 0), 2, pick(rng, neon), 2);
    }
    return { top: base + h + 1, cx: x, cz: z, cw: w, cd: d };
  };

  // ---------------------------------------------------------------- 旧式洋楼
  // 装饰艺术：圆角转角 + 强烈水平腰线，5~10 层
  T.walkup = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 4, 11);
    const [wall, band] = pick(rng, PAINT);
    v.fillBox(x, base, z, w, h, d, wall);
    for (let y = base + 1; y < base + h; y += 2) B.ring(v, x, y, z, w, d, band, 1);
    // 圆角：一角改成圆柱
    const cx = rng() < 0.5 ? x : x + w - 1, cz = o.faceZ > 0 ? z + d - 1 : z;
    B.cyl(v, cx, cz, 1.6, base, h, wall);
    for (let y = base + 1; y < base + h; y += 2) B.cyl(v, cx, cz, 1.7, y, 1, band);
    v.fillBox(x, base + h, z, w, 1, d, M.ROOF_TAR);
    B.ring(v, x, base + h + 1, z, w, d, wall, 1);
    return { top: base + h + 2, cx: x, cz: z, cw: w, cd: d };
  };

  // ---------------------------------------------------------------- 公屋长条
  // 长向板楼，20~36 层，重复小窗 + 彩色油漆带 + 外突电梯井 + 晒衣杆
  T.estateSlab = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 12, 40);
    const [wall, band] = pick(rng, PAINT);
    v.fillBox(x, base, z, w, h, d, wall);
    // 每 6 层一条对比色腰线（公屋的配色语言）
    for (let y = base + 3; y < base + h; y += 6) {
      v.fillBox(x, y, z, w, 1, d, band);
    }
    windowBands(v, x, z, w, d, base, h, o.win, 2, false);
    // 外突电梯 / 楼梯井
    const cw = Math.max(2, Math.min(4, w >> 2));
    const cxp = x + ((w - cw) >> 1);
    v.fillBox(cxp, base, o.faceZ > 0 ? z - 1 : z + d, cw, h + 2, 1, M.CONCRETE_M);
    for (let y = base + 2; y < base + h; y += 3) v.set(cxp + (cw >> 1), y, o.faceZ > 0 ? z - 1 : z + d, M.GLASS_WHITE);
    // 晒衣杆（长条公屋的立面全是横向竿）
    for (let y = base + 2; y < base + h; y += 2) {
      for (let i = 1; i < w - 1; i += 2) {
        if (rng() < 0.5) v.setIfEmpty(x + i, y, o.faceZ > 0 ? z + d : z - 1, M.STEEL_D);
      }
    }
    B.acUnits(v, x, z, w, d, base, h, rng, 0.22);
    B.rooftop(v, x, z, w, d, base + h, rng, { parapetMat: wall, antennaH: 6 });
    return { top: base + h + 3, cx: x, cz: z, cw: w, cd: d };
  };

  // ------------------------------------------------------------ 十字型公屋
  // 港式公屋最好认的平面：四臂十字，中央核心，25~38 层
  T.estateCruciform = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 16, 40);
    const [wall, band] = pick(rng, PAINT);
    const aw = Math.max(3, Math.min(w, d) >> 1);                 // 臂宽
    const ccx = x + (w >> 1), ccz = z + (d >> 1);
    // 中央核心
    v.fillBox(ccx - (aw >> 1), base, ccz - (aw >> 1), aw, h, aw, wall);
    // 四臂
    v.fillBox(x, base, ccz - (aw >> 1), w, h, aw, wall);
    v.fillBox(ccx - (aw >> 1), base, z, aw, h, d, wall);
    for (let y = base + 3; y < base + h; y += 7) {
      v.fillBox(x, y, ccz - (aw >> 1), w, 1, aw, band);
      v.fillBox(ccx - (aw >> 1), y, z, aw, 1, d, band);
    }
    for (let y = base + 1; y < base + h; y += 2) {
      B.ring(v, x, y, ccz - (aw >> 1), w, aw, o.win, 1);
      B.ring(v, ccx - (aw >> 1), y, z, aw, d, o.win, 1);
    }
    B.acUnits(v, x, ccz - (aw >> 1), w, aw, base, h, rng, 0.26);
    B.rooftop(v, ccx - (aw >> 1), ccz - (aw >> 1), aw, aw, base + h, rng, { parapetMat: wall });
    return { top: base + h + 3, cx: ccx - (aw >> 1), cz: ccz - (aw >> 1), cw: aw, cd: aw };
  };

  // -------------------------------------------------------------- 风车形私宅
  // 私人住宅塔楼：四翼错位 + 凸窗，30~46 层，裙楼车库
  T.pinwheel = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 16, 46);
    const mat = rng() < 0.5 ? pick(rng, PAINT)[0] : pick(rng, GLASSES);
    const pod = 2 + ((rng() * 3) | 0);
    v.fillBox(x, base, z, w, pod, d, M.CONCRETE_M);                   // 裙楼（停车场）铺满地块，不越界压邻楼
    for (let y = base; y < base + pod; y++) B.ring(v, x, y, z, w, d, y % 2 ? M.CONCRETE_D : M.CONCRETE_M, 1);
    const by = base + pod, bh = h - pod;
    const aw = Math.max(3, (Math.min(w, d) * 0.55) | 0);
    const cx = x + (w >> 1), cz = z + (d >> 1);
    v.fillBox(cx - (aw >> 1), by, cz - (aw >> 1), aw, bh, aw, mat);   // 核心
    // 四翼（错位半格形成风车）
    const wings = [[x, cz - (aw >> 1) - 1], [cx - (aw >> 1) + 1, z],
    [cx + (aw >> 1) - 1, cz - (aw >> 1) + 1], [cx - (aw >> 1) - 1, cz + (aw >> 1) - 1]];
    for (let i = 0; i < 4; i++) {
      const ww = i % 2 ? aw : Math.max(2, (w - aw) >> 1);
      const dd = i % 2 ? Math.max(2, (d - aw) >> 1) : aw;
      v.fillBox(clamp(wings[i][0], x, x + w - ww), by, clamp(wings[i][1], z, z + d - dd), ww, bh, dd, mat);
    }
    windowBands(v, cx - (aw >> 1) - 1, cz - (aw >> 1) - 1, aw + 2, aw + 2, by, bh, o.win, 2, true);
    B.rooftop(v, cx - (aw >> 1), cz - (aw >> 1), aw, aw, by + bh, rng, { parapetMat: mat, antennaH: 8 });
    return { top: by + bh + 3, cx: cx - (aw >> 1), cz: cz - (aw >> 1), cw: aw, cd: aw };
  };

  // ------------------------------------------------------------ 玻璃写字楼
  T.officeGlass = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 10, 60);
    const g = pick(rng, GLASSES);
    const pod = rng() < 0.6 ? 2 + ((rng() * 3) | 0) : 0;
    if (pod) {
      v.fillBox(x, base, z, w, pod, d, M.GRANITE);
      B.ring(v, x, base + pod - 1, z, w, d, M.CONCRETE_L, 1);
    }
    const by = base + pod, bh = h - pod;
    if (rng() < 0.4) B.taper(v, x + w / 2, z + d / 2, w, d, Math.max(3, w * 0.78), Math.max(3, d * 0.78), by, bh, g, rng() < 0.5 ? 0.3 : 0);
    else {
      v.fillBox(x, by, z, w, bh, d, g);
      if (rng() < 0.5) B.ribFacade(v, x, z, w, d, by, bh, 3, M.WHITE_PANEL);
      else for (let y = by + 4; y < by + bh; y += Math.max(4, bh / 6 | 0)) B.ring(v, x, y, z, w, d, M.WHITE_PANEL, 1);
    }
    // 屋顶机房 + 桅杆
    const rw = Math.max(2, w - 4), rd = Math.max(2, d - 4);
    v.fillBox(x + 2, by + bh, z + 2, rw, 2, rd, M.BLACK_PANEL);
    if (rng() < 0.55) {
      v.fillBox(x + (w >> 1), by + bh + 2, z + (d >> 1), 1, 4 + ((rng() * 6) | 0), 1, M.STEEL_D);
      v.set(x + (w >> 1), by + bh + 6, z + (d >> 1), M.BEACON_R);
    }
    B.rooftop(v, x + 2, z + 2, rw, rd, by + bh + 1, rng, { parapetMat: M.BLACK_PANEL, antenna: false });
    return { top: by + bh + 4, cx: x, cz: z, cw: w, cd: d };
  };

  // ------------------------------------------------------------ 石材写字楼
  // 80 年代语言：花岗岩基座 + 横向连续窗带 + 收顶
  T.officeStone = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 8, 40);
    const stone = pick(rng, [M.GRANITE, M.GRANITE_R, M.BONE, M.CONCRETE_L, M.STUCCO_W]);
    v.fillBox(x, base, z, w, h, d, stone);
    for (let y = base + 4; y < base + h - 1; y += 2) B.ring(v, x, y, z, w, d, o.win, 1);
    v.fillBox(x, base, z, w, 3, d, stone);                            // 基座
    B.ring(v, x, base + 2, z, w, d, M.GOLD_TRIM, 1);
    // 退台收顶
    let sw = w, sd = d, sx = x, sz = z, yy = base + h;
    for (let k = 0; k < 2 && sw > 4 && sd > 4; k++) {
      v.fillBox(sx + 1, yy, sz + 1, sw - 2, 2, sd - 2, stone);
      sx += 1; sz += 1; sw -= 2; sd -= 2; yy += 2;
    }
    B.rooftop(v, sx, sz, Math.max(2, sw), Math.max(2, sd), yy, rng, { parapetMat: stone });
    return { top: yy + 3, cx: x, cz: z, cw: w, cd: d };
  };

  // ------------------------------------------------------------ 工业大厦
  // 外露混凝土框架 + 小窗 + 山墙巨型油漆字 + 屋顶水塔管线 + 装卸平台
  T.industrial = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 6, 22);
    const shell = pick(rng, [M.CONCRETE_M, M.CONCRETE_D, M.STUCCO_G, M.CONCRETE_L]);
    v.fillBox(x, base, z, w, h, d, shell);
    frameFacade(v, x, z, w, d, base, h, M.CONCRETE_L, 3);
    for (let y = base + 2; y < base + h; y += 2) {
      for (let i = 1; i < w - 1; i++) if (i % 3 !== 0) { v.set(x + i, y, z, M.GLASS_DARK); v.set(x + i, y, z + d - 1, M.GLASS_DARK); }
      for (let j = 1; j < d - 1; j++) if (j % 3 !== 0) { v.set(x, y, z + j, M.GLASS_DARK); v.set(x + w - 1, y, z + j, M.GLASS_DARK); }
    }
    // 装卸平台 + 卷帘门
    const face = o.faceZ > 0 ? z + d - 1 : z;
    for (let i = 1; i < w - 1; i += 4) v.fillBox(x + i, base, face, 2, 2, 1, M.RUST);
    // 山墙广告字（侧面一整片色块）
    if (rng() < 0.6) {
      const sx = rng() < 0.5 ? x : x + w - 1;
      const c = pick(rng, [M.HULL_RED, M.CONT_BLUE, M.CONT_GREEN, M.FLAG_RED, M.SIGN_DARK]);
      for (let y = base + 3; y < base + h - 2; y += 3) for (let j = 2; j < d - 2; j++) v.set(sx, y, z + j, c);
    }
    // 屋顶：水塔 + 管线 + 通风机
    v.fillBox(x, base + h, z, w, 1, d, M.ROOF_TAR);
    for (let i = 0; i < 3; i++) {
      const tx = x + 1 + ((rng() * Math.max(1, w - 3)) | 0), tz = z + 1 + ((rng() * Math.max(1, d - 3)) | 0);
      B.cyl(v, tx, tz, 1.5, base + h + 1, 2 + ((rng() * 2) | 0), M.TANK);
    }
    for (let i = 1; i < w - 1; i += 5) B.line(v, x + i, base + h + 1, z + 1, x + i, base + h + 1, z + d - 2, M.STEEL_D, 1);
    B.rooftop(v, x, z, w, d, base + h, rng, { parapetMat: M.CONCRETE_D, antennaH: 4 });
    return { top: base + h + 4, cx: x, cz: z, cw: w, cd: d };
  };

  // -------------------------------------------------------------- 商场裙楼
  T.mall = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 3, 9);
    v.fillBox(x, base, z, w, h, d, pick(rng, [M.WHITE_PANEL, M.BLACK_PANEL, M.CONCRETE_L, M.BONE]));
    // 无窗大墙 + LED 幕墙 + 玻璃入口
    const face = o.faceZ > 0 ? z + d - 1 : z;
    for (let y = base + 1; y < base + h - 1; y++) for (let i = 1; i < w - 1; i++) v.set(x + i, y, face, M.LED_FACADE);
    for (let i = (w >> 1) - 2; i <= (w >> 1) + 2; i++) { v.set(x + i, base, face, M.GLASS_WHITE); v.set(x + i, base + 1, face, M.GLASS_WHITE); }
    v.fillBox(x - 1, base + 2, o.faceZ > 0 ? z + d : z - 1, w + 2, 1, 1, M.WHITE_PANEL);   // 雨棚
    // 屋顶：天窗 + 机组 + 广告牌
    v.fillBox(x, base + h, z, w, 1, d, M.ROOF_TAR);
    for (let i = 2; i < w - 2; i += 4) for (let j = 2; j < d - 2; j += 4) v.set(x + i, base + h + 1, z + j, M.GLASS_WHITE);
    B.rooftop(v, x, z, w, d, base + h, rng, { parapetMat: M.WHITE_PANEL, antenna: false });
    if (rng() < 0.7) B.roofSign(v, x + 1, base + h + 2, face + (o.faceZ > 0 ? 1 : -1), Math.max(4, w - 2), 3,
      o.faceZ > 0 ? 1 : -1, pick(rng, [M.NEON_PINK, M.NEON_CYAN, M.NEON_YELL, M.NEON_WHITE]));
    return { top: base + h + 5, cx: x, cz: z, cw: w, cd: d };
  };

  // ------------------------------------------------------------ 多层停车场
  T.carpark = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 4, 14);
    v.fillBox(x, base, z, w, h, d, M.CONCRETE_M);
    // 层层横向开口（车库的标志）
    for (let y = base + 1; y < base + h; y += 2) {
      for (let i = 1; i < w - 1; i++) { v.set(x + i, y, z, 0); v.set(x + i, y, z + d - 1, 0); }
      for (let j = 1; j < d - 1; j++) { v.set(x, y, z + j, 0); v.set(x + w - 1, y, z + j, 0); }
      for (let i = 1; i < w - 1; i++) { v.set(x + i, y, z + 1, M.CAR_D); }
    }
    frameFacade(v, x, z, w, d, base, h, M.CONCRETE_L, 4);
    // 螺旋坡道
    B.tube(v, x + w - 3, z + 2, 2.2, base, h, M.CONCRETE_D, 1);
    v.fillBox(x, base + h, z, w, 1, d, M.ROOF_TAR);
    for (let i = 2; i < w - 2; i += 3) v.set(x + i, base + h + 1, z + 2 + ((i * 7) % Math.max(1, d - 4)), pick(rng, [M.CAR_W, M.CAR_D, M.TAXI_RED]));
    B.ring(v, x, base + h + 1, z, w, d, M.STEEL, 1);
    return { top: base + h + 2, cx: x, cz: z, cw: w, cd: d };
  };

  // ---------------------------------------------------------------- 酒店
  T.hotel = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 10, 50);
    const pod = 3 + ((rng() * 3) | 0);
    v.fillBox(x, base, z, w, pod, d, M.BONE);
    B.ring(v, x, base + pod - 1, z, w, d, M.GOLD_TRIM, 1);
    const face = o.faceZ > 0 ? z + d : z - 1;
    v.fillBox(x, base + 2, face, w, 1, 1, M.WHITE_PANEL);              // 门廊雨棚
    const by = base + pod, tw = Math.max(3, w - 2), td = Math.max(3, d - 2);
    const tx = x + ((w - tw) >> 1), tz = z + ((d - td) >> 1);
    const mat = pick(rng, [M.STUCCO_W, M.BONE, M.GLASS_BRONZE, M.GLASS_GOLD, M.CONCRETE_L]);
    v.fillBox(tx, by, tz, tw, h - pod, td, mat);
    // 阳台条 + 竖向分隔
    for (let y = by + 2; y < by + h - pod; y += 2) {
      B.ring(v, tx, y, tz, tw, td, o.win, 1);
      for (let i = 1; i < tw - 1; i += 2) v.setIfEmpty(tx + i, y, o.faceZ > 0 ? tz + td : tz - 1, M.WHITE_PANEL);
    }
    B.rooftop(v, tx, tz, tw, td, by + h - pod, rng, { parapetMat: mat, antennaH: 5 });
    B.roofSign(v, tx + 1, by + h - pod + 2, o.faceZ > 0 ? tz + td : tz - 1, Math.max(3, tw - 2), 3,
      o.faceZ > 0 ? 1 : -1, pick(rng, [M.NEON_WHITE, M.NEON_YELL, M.NEON_CYAN]));
    return { top: by + h - pod + 5, cx: tx, cz: tz, cw: tw, cd: td };
  };

  // ---------------------------------------------------------------- 学校
  T.school = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 4, 8);
    const wall = pick(rng, [M.STUCCO_W, M.CONCRETE_L, M.STUCCO_Y]);
    // L 形教学楼 + 操场
    const bw = Math.max(3, w - 4), bd = Math.max(3, (d >> 1));
    v.fillBox(x, base, z, bw, h, bd, wall);
    v.fillBox(x, base, z, 4, h, d, wall);
    for (let y = base + 1; y < base + h; y++) {
      B.ring(v, x, y, z, bw, bd, y % 2 ? M.GLASS_WHITE : wall, 1);
      // 走廊栏杆（学校的横向连续开口）
      for (let i = 1; i < bw - 1; i++) if (y % 2) v.set(x + i, y, z + bd - 1, M.STEEL);
    }
    // 操场
    for (let zz = z + bd; zz < z + d; zz++) for (let xx = x + 4; xx < x + w; xx++) {
      v.set(xx, base, zz, (xx + zz) % 9 === 0 ? M.MARK_W : M.ASPHALT);
    }
    if (w > 8) { v.fillBox(x + 5, base + 1, z + d - 2, 1, 2, 1, M.STEEL); v.fillBox(x + w - 3, base + 1, z + d - 2, 1, 2, 1, M.STEEL); }
    B.ring(v, x, base + h, z, bw, bd, wall, 1);
    B.rooftop(v, x, z, bw, bd, base + h, rng, { parapetMat: wall, antenna: false });
    if (rng() < 0.5) { v.fillBox(x + 1, base + h + 1, z + 1, 1, 4, 1, M.STEEL_D); v.set(x + 1, base + h + 5, z + 1, M.FLAG_RED); }
    return { top: base + h + 2, cx: x, cz: z, cw: bw, cd: bd };
  };

  // -------------------------------------------------------------- 村屋 / 小屋
  T.villageHouse = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = clamp(o.h, 2, 5);
    const wall = pick(rng, [M.STUCCO_W, M.STUCCO_Y, M.STUCCO_P, M.BONE]);
    v.fillBox(x, base, z, w, h, d, wall);
    for (let y = base + 1; y < base + h; y++) B.ring(v, x, y, z, w, d, M.GLASS_WHITE, 1);
    // 坡屋顶
    let sw = w, sd = d, sx = x, sz = z, yy = base + h;
    while (sw > 0 && sd > 0) { v.fillBox(sx, yy, sz, sw, 1, sd, M.ROOF_TILE); sx++; sz++; sw -= 2; sd -= 2; yy++; }
    if (rng() < 0.6) v.set(x + 1, base + h + 1, z + 1, M.TANK);
    return { top: yy + 1, cx: x, cz: z, cw: w, cd: d };
  };

  // ---------------------------------------------------------------- 庙宇
  T.temple = function (v, o) {
    const { x, z, w, d, base, rng } = o;
    const h = 2;
    v.fillBox(x, base, z, w, h, d, M.BRICK_R);
    for (let i = 0; i < w; i += 2) v.fillBox(x + i, base, z, 1, h, 1, M.FLAG_RED);
    // 重檐
    v.fillBox(x - 1, base + h, z - 1, w + 2, 1, d + 2, M.ROOF_TILE);
    v.fillBox(x, base + h + 1, z, w, 1, d, M.ROOF_TILE);
    v.fillBox(x + 1, base + h + 2, z + 1, Math.max(1, w - 2), 1, Math.max(1, d - 2), M.ROOF_TILE);
    v.set(x + (w >> 1), base + h + 3, z + (d >> 1), M.GOLD_TRIM);
    if (rng() < 0.7) { v.set(x, base + h + 1, z - 1, M.NEON_RED); v.set(x + w - 1, base + h + 1, z - 1, M.NEON_RED); }
    return { top: base + h + 4, cx: x, cz: z, cw: w, cd: d };
  };

  // ---------------------------------------------------------- 原型抽签逻辑
  // 按分区性格（ac = 旧楼密度 / sign = 招牌密度 / hMax）、地块尺寸、临街位次抽签
  A.choose = function (rng, ctx) {
    const { w, d, hm, ri, ac, sign, hMax, hill, industrialZone } = ctx;
    const area = w * d;
    const bag = [];
    const add = (name, weight) => { for (let i = 0; i < weight; i++) bag.push(name); };

    if (hill) {                                   // 半山：住宅塔 + 少量村屋
      add('pinwheel', 5); add('estateSlab', 3); add('officeStone', 1);
      if (area < 30) add('villageHouse', 4);
      return pick(rng, bag);
    }
    if (hm < 26) {                                // 很矮：唐楼 / 商场 / 村屋 / 庙
      add('tenement', 6); add('villageHouse', 2); add('mall', 2); add('walkup', 3);
      if (area > 60) add('school', 3);
      if (area < 32) add('temple', 2);
      return pick(rng, bag);
    }
    if (industrialZone && hm < 90) { add('industrial', 8); add('carpark', 2); add('mall', 1); }
    if (ri === 0) {                               // 临海第一排：写字楼 / 酒店 / 商场
      add('officeGlass', 6); add('hotel', 4); add('officeStone', 3); add('mall', 2);
    }
    if (ac >= 0.16) { add('tenement', 4); add('estateSlab', 4); add('walkup', 3); add('estateCruciform', 3); }
    else { add('officeGlass', 4); add('officeStone', 3); add('pinwheel', 3); add('carpark', 1); add('hotel', 1); }
    if (hMax >= 180) { add('officeGlass', 3); add('pinwheel', 2); add('hotel', 2); }
    if (sign > 0.35) { add('mall', 2); add('tenement', 2); }
    if (area > 100) { add('estateSlab', 2); add('carpark', 1); add('school', 2); }
    if (area < 28) { add('tenement', 3); add('walkup', 2); }
    if (!bag.length) add('officeStone', 1);
    return pick(rng, bag);
  };

  A.build = function (vol, name, o) {
    const fn = T[name] || T.officeStone;
    try { return fn(vol, o) || null; }
    catch (e) { return T.officeStone(vol, o); }
  };
  A.types = () => Object.keys(T);
  A.T = T;
  HKV.A = A;

})(typeof window !== 'undefined' ? window : globalThis);
