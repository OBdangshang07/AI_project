/* =============================================================================
 * VOXEL VICTORIA HARBOUR · build.js
 * 体素建筑笔刷：几何体（盒 / 圆柱 / 三棱柱 / 锥收 / 穹顶 / 曲面屋盖 / 斜撑）、
 * 立面语言（幕墙分带、圆窗、阳台空调机、霓虹招牌、天台招牌）、
 * 天台设备（水箱 / 机组 / 楼梯间 / 天线 / 直升机坪）、街道家具（树 / 路灯 / 栏杆 / 码头）
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV || (global.HKV = {});
  const { M, clamp, hash2 } = HKV;

  const B = {};

  // ------------------------------------------------------------------ 基本体
  B.box = function (v, x, y, z, w, h, d, mat) { v.fillBox(x, y, z, w, h, d, mat); };

  B.boxIf = function (v, x, y, z, w, h, d, mat) {          // 只填空气（不破坏已有结构）
    for (let zz = z; zz < z + d; zz++) for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) v.setIfEmpty(xx, yy, zz, mat);
  };

  // 矩形环（墙圈）：用于给某一层换材质（窗带 / 腰线）
  B.ring = function (v, x, y, z, w, d, mat, thick) {
    thick = thick || 1;
    for (let t = 0; t < thick; t++) {
      const x0 = x + t, z0 = z + t, ww = w - t * 2, dd = d - t * 2;
      if (ww <= 0 || dd <= 0) return;
      v.fillBox(x0, y, z0, ww, 1, 1, mat);
      v.fillBox(x0, y, z0 + dd - 1, ww, 1, 1, mat);
      v.fillBox(x0, y, z0, 1, 1, dd, mat);
      v.fillBox(x0 + ww - 1, y, z0, 1, 1, dd, mat);
    }
  };

  // 圆柱（每层按半径光栅化，可变半径 → 锥 / 花瓶 / 鼓形）
  B.cyl = function (v, cx, cz, r, y0, h, mat, radiusFn) {
    for (let y = 0; y < h; y++) {
      const rr = radiusFn ? radiusFn(y / Math.max(1, h - 1)) * r : r;
      const ri = Math.ceil(rr), r2 = rr * rr;
      for (let dz = -ri; dz <= ri; dz++) for (let dx = -ri; dx <= ri; dx++) {
        if (dx * dx + dz * dz <= r2) v.set(Math.round(cx + dx), y0 + y, Math.round(cz + dz), mat);
      }
    }
  };

  // 空心圆筒（塔身外壳，内部另填）
  B.tube = function (v, cx, cz, r, y0, h, mat, wall) {
    wall = wall || 1;
    const inner = (r - wall) * (r - wall);
    for (let y = 0; y < h; y++) {
      const ri = Math.ceil(r), r2 = r * r;
      for (let dz = -ri; dz <= ri; dz++) for (let dx = -ri; dx <= ri; dx++) {
        const q = dx * dx + dz * dz;
        if (q <= r2 && q >= inner) v.set(Math.round(cx + dx), y0 + y, Math.round(cz + dz), mat);
      }
    }
  };

  // 椭圆柱 / 穹顶 / 球
  B.ellipse = function (v, cx, cz, rx, rz, y0, h, mat) {
    for (let y = 0; y < h; y++)
      for (let dz = -Math.ceil(rz); dz <= Math.ceil(rz); dz++)
        for (let dx = -Math.ceil(rx); dx <= Math.ceil(rx); dx++) {
          const q = (dx * dx) / (rx * rx) + (dz * dz) / (rz * rz);
          if (q <= 1) v.set(Math.round(cx + dx), y0 + y, Math.round(cz + dz), mat);
        }
  };

  B.dome = function (v, cx, cy, cz, r, mat, squash) {
    squash = squash || 1;
    for (let dy = 0; dy <= Math.ceil(r * squash); dy++) {
      const t = dy / (r * squash);
      const rr = r * Math.sqrt(Math.max(0, 1 - t * t));
      const ri = Math.ceil(rr), r2 = rr * rr;
      for (let dz = -ri; dz <= ri; dz++) for (let dx = -ri; dx <= ri; dx++)
        if (dx * dx + dz * dz <= r2) v.set(cx + dx, cy + dy, cz + dz, mat);
    }
  };

  B.sphere = function (v, cx, cy, cz, r, mat) {
    const ri = Math.ceil(r), r2 = r * r;
    for (let dy = -ri; dy <= ri; dy++) for (let dz = -ri; dz <= ri; dz++) for (let dx = -ri; dx <= ri; dx++)
      if (dx * dx + dy * dy + dz * dz <= r2) v.set(cx + dx, cy + dy, cz + dz, mat);
  };

  // 三棱柱（中银大厦的语言）：dir 指定直角所在角
  B.triPrism = function (v, x0, z0, size, y0, h, mat, dir, taperTop) {
    for (let y = 0; y < h; y++) {
      const s = Math.max(1, Math.round(size * (1 - (taperTop || 0) * (y / Math.max(1, h - 1)))));
      for (let i = 0; i < s; i++) {
        const len = s - i;
        if (dir === 0) v.fillBox(x0, y0 + y, z0 + i, len, 1, 1, mat);        // 直角在 -x-z
        else if (dir === 1) v.fillBox(x0 + i, y0 + y, z0 + i, len, 1, 1, mat); // 直角在 +x-z
        else if (dir === 2) v.fillBox(x0 + i, y0 + y, z0 + s - 1 - i, len, 1, 1, mat);
        else v.fillBox(x0, y0 + y, z0 + s - 1 - i, len, 1, 1, mat);
      }
    }
  };

  // 线性锥收塔身（每层矩形由 t 决定）
  B.taper = function (v, cx, cz, w0, d0, w1, d1, y0, h, mat, cornerCut) {
    for (let y = 0; y < h; y++) {
      const t = y / Math.max(1, h - 1);
      const w = Math.max(2, Math.round(w0 + (w1 - w0) * t));
      const d = Math.max(2, Math.round(d0 + (d1 - d0) * t));
      const x = Math.round(cx - w / 2), z = Math.round(cz - d / 2);
      v.fillBox(x, y0 + y, z, w, 1, d, mat);
      if (cornerCut) {
        const c = Math.max(1, Math.round(cornerCut * Math.min(w, d) * 0.5 * (1 - t * 0.5)));
        for (let i = 0; i < c; i++) {
          const k = c - i;
          v.fillBox(x, y0 + y, z + i, k, 1, 1, 0);
          v.fillBox(x + w - k, y0 + y, z + i, k, 1, 1, 0);
          v.fillBox(x, y0 + y, z + d - 1 - i, k, 1, 1, 0);
          v.fillBox(x + w - k, y0 + y, z + d - 1 - i, k, 1, 1, 0);
        }
      }
    }
  };

  // 3D 体素直线（斜撑 / 缆索 / 桅杆拉线）
  B.line = function (v, x0, y0, z0, x1, y1, z1, mat, thick) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0));
    thick = thick || 1;
    for (let i = 0; i <= n; i++) {
      const t = n === 0 ? 0 : i / n;
      const x = Math.round(x0 + (x1 - x0) * t), y = Math.round(y0 + (y1 - y0) * t), z = Math.round(z0 + (z1 - z0) * t);
      if (thick === 1) v.set(x, y, z, mat);
      else v.fillBox(x - (thick >> 1), y - (thick >> 1), z - (thick >> 1), thick, thick, thick, mat);
    }
  };

  // 曲面屋盖（会展中心的「飞鸟」、文化中心的「滑梯」、高铁站的波浪顶）
  // hFn(u,v)->屋面高度；u 沿 x, v 沿 z，返回 null 表示不铺
  B.shellRoof = function (v, x0, z0, w, d, hFn, mat, thick) {
    thick = thick || 2;
    for (let iz = 0; iz < d; iz++) for (let ix = 0; ix < w; ix++) {
      const u = ix / (w - 1), vv = iz / (d - 1);
      const hh = hFn(u, vv);
      if (hh == null) continue;
      const yTop = Math.round(hh);
      for (let t = 0; t < thick; t++) v.set(x0 + ix, yTop - t, z0 + iz, mat);
    }
  };

  // ------------------------------------------------------------------ 立面语言
  // 幕墙水平分带（把外壳某些层换成玻璃/亮窗材质，形成横向窗带）
  B.bandFacade = function (v, x, z, w, d, y0, h, step, matWin, offset) {
    offset = offset || 0;
    for (let y = y0 + 1 + offset; y < y0 + h - 1; y += step) B.ring(v, x, y, z, w, d, matWin, 1);
  };

  // 竖向分格（每隔 n 列把外壳换成柱肋，塑造中环 / 尖沙咀写字楼的竖线条）
  B.ribFacade = function (v, x, z, w, d, y0, h, step, matRib) {
    for (let i = 0; i < w; i += step) {
      v.fillBox(x + i, y0, z, 1, h, 1, matRib);
      v.fillBox(x + i, y0, z + d - 1, 1, h, 1, matRib);
    }
    for (let i = 0; i < d; i += step) {
      v.fillBox(x, y0, z + i, 1, h, 1, matRib);
      v.fillBox(x + w - 1, y0, z + i, 1, h, 1, matRib);
    }
  };

  // 唐楼 / 住宅立面细节：外挂空调机 + 晾衣杆 + 阳台（1 体素凸出，香港味的关键）
  B.acUnits = function (v, x, z, w, d, y0, h, rng, density, matAC) {
    matAC = matAC || M.EQUIP;
    for (let y = y0 + 2; y < y0 + h - 1; y += 2) {
      for (let i = 1; i < w - 1; i++) {
        if (rng() < density) { v.setIfEmpty(x + i, y, z - 1, matAC); }
        if (rng() < density) { v.setIfEmpty(x + i, y, z + d, matAC); }
      }
      for (let i = 1; i < d - 1; i++) {
        if (rng() < density) { v.setIfEmpty(x - 1, y, z + i, matAC); }
        if (rng() < density) { v.setIfEmpty(x + w, y, z + i, matAC); }
      }
    }
  };

  // 天台设备群（水箱 / 机组 / 楼梯间 / 天线）——香港天台的标准配置
  B.rooftop = function (v, x, z, w, d, y, rng, opts) {
    opts = opts || {};
    const big = w * d;
    if (w < 3 || d < 3) return;
    // 女儿墙
    if (opts.parapet !== false) B.ring(v, x, y, z, w, d, opts.parapetMat || M.CONCRETE_M, 1);
    // 楼梯间 / 电梯机房
    const sw = Math.max(2, Math.min(w - 2, Math.round(w * 0.3))), sd = Math.max(2, Math.min(d - 2, Math.round(d * 0.3)));
    const sx = x + 1 + Math.floor(rng() * Math.max(1, w - sw - 2)), sz = z + 1 + Math.floor(rng() * Math.max(1, d - sd - 2));
    v.fillBox(sx, y + 1, sz, sw, 1 + Math.round(rng() * 2), sd, M.CONCRETE_M);
    // 水箱（不锈钢圆桶 / 方桶）
    const tanks = big > 100 ? 3 : big > 40 ? 2 : 1;
    for (let i = 0; i < tanks; i++) {
      const tx = x + 1 + Math.floor(rng() * Math.max(1, w - 3)), tz = z + 1 + Math.floor(rng() * Math.max(1, d - 3));
      if (rng() < 0.5) v.fillBox(tx, y + 1, tz, 2, 2, 2, M.TANK);
      else B.cyl(v, tx + 1, tz + 1, 1.4, y + 1, 2, M.TANK);
    }
    // 空调机组阵列
    const units = Math.min(10, Math.round(big / 14));
    for (let i = 0; i < units; i++) {
      const ux = x + 1 + Math.floor(rng() * Math.max(1, w - 2)), uz = z + 1 + Math.floor(rng() * Math.max(1, d - 2));
      v.setIfEmpty(ux, y + 1, uz, M.EQUIP);
    }
    // 天线 / 桅杆
    if (opts.antenna !== false && (big > 60 || rng() < 0.35)) {
      const ax = x + (w >> 1), az = z + (d >> 1);
      const ah = 3 + Math.round(rng() * (opts.antennaH || 7));
      v.fillBox(ax, y + 1, az, 1, ah, 1, M.STEEL_D);
      v.set(ax, y + ah + 1, az, M.BEACON_R);
      if (rng() < 0.4) { B.line(v, ax, y + ah, az, ax + 2, y + ah - 3, az, M.STEEL_D); B.line(v, ax, y + ah, az, ax - 2, y + ah - 3, az, M.STEEL_D); }
    }
    if (opts.helipad) {
      const hx = x + Math.max(1, (w >> 1) - 3), hz = z + Math.max(1, (d >> 1) - 3);
      v.fillBox(hx, y + 1, hz, 7, 1, 7, M.HELIPAD);
      B.ring(v, hx + 1, y + 1, hz + 1, 5, 5, M.MARK_W, 1);
    }
  };

  // 霓虹招牌（挂在立面上，横向或竖向，带灯箱底板）——旺角 / 弥敦道语言
  B.neonSign = function (v, x, y, z, dirX, dirZ, len, hgt, mat, depth) {
    depth = depth || 2;
    for (let l = 0; l < len; l++) for (let hh = 0; hh < hgt; hh++) for (let dd = 0; dd < depth; dd++) {
      const px = x + dirX * dd + (dirZ !== 0 ? l : 0);
      const pz = z + dirZ * dd + (dirX !== 0 ? l : 0);
      const isEdge = dd === depth - 1;
      v.setIfEmpty(px, y + hh, pz, isEdge ? mat : M.SIGN_DARK);
    }
  };

  // 天台巨型招牌（正对维港的广告牌，夜里发光）
  B.roofSign = function (v, x, y, z, w, h, faceZ, mat) {
    for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) {
      v.setIfEmpty(x + i, y + j, z, M.SIGN_DARK);
      v.setIfEmpty(x + i, y + j, z + faceZ, mat);
    }
    for (let i = 0; i < w; i += Math.max(2, w >> 2)) B.line(v, x + i, y, z, x + i, y - 2, z, M.STEEL_D);
  };

  // ------------------------------------------------------------ 街道 / 海滨家具
  B.tree = function (v, x, y, z, size, matLeaf, matTrunk) {
    size = size || 2;
    matLeaf = matLeaf || M.TREE; matTrunk = matTrunk || M.TRUNK;
    const th = Math.max(1, size - 1);
    v.fillBox(x, y, z, 1, th, 1, matTrunk);
    if (size <= 2) { v.fillBox(x - 1, y + th, z - 1, 3, 1, 3, matLeaf); v.set(x, y + th + 1, z, matLeaf); }
    else {
      B.sphere(v, x, y + th + 1, z, size * 0.75, matLeaf);
    }
  };

  B.palm = function (v, x, y, z, h) {
    h = h || 4;
    v.fillBox(x, y, z, 1, h, 1, M.TRUNK);
    v.set(x + 1, y + h, z, M.PALM); v.set(x - 1, y + h, z, M.PALM);
    v.set(x, y + h, z + 1, M.PALM); v.set(x, y + h, z - 1, M.PALM);
    v.set(x + 2, y + h - 1, z, M.PALM); v.set(x - 2, y + h - 1, z, M.PALM);
    v.set(x, y + h - 1, z + 2, M.PALM); v.set(x, y + h - 1, z - 2, M.PALM);
    v.set(x, y + h + 1, z, M.PALM);
  };

  B.lamp = function (v, x, y, z, h, arm) {
    h = h || 3;
    v.fillBox(x, y, z, 1, h, 1, M.STEEL_D);
    const ax = arm ? Math.sign(arm) : 0;
    if (ax) { v.set(x + ax, y + h, z, M.STEEL_D); v.set(x + ax, y + h - 1, z, M.LAMP); }
    else v.set(x, y + h, z, M.LAMP);
  };

  B.railing = function (v, x0, z0, x1, z1, y, mat) {
    mat = mat || M.STEEL;
    B.line(v, x0, y, z0, x1, y, z1, mat, 1);
  };

  // 码头 / 栈桥（甲板 + 桩）
  B.pier = function (v, x, z, w, d, y, matDeck, matPile) {
    matDeck = matDeck || M.PROMENADE; matPile = matPile || M.CONCRETE_D;
    v.fillBox(x, y, z, w, 1, d, matDeck);
    for (let i = 0; i < w; i += 3) for (let j = 0; j < d; j += 3) {
      for (let yy = y - 1; yy >= HKV.W.SEA - 2; yy--) v.set(x + i, yy, z + j, matPile);
    }
  };

  // ---------------------------------------------------------------- 通用塔楼
  // 香港天际线的批量语言：裙楼 + 塔身（可锥收 / 退台）+ 冠部 + 天台设备
  B.tower = function (v, o) {
    const rng = o.rng || Math.random;
    const x = Math.round(o.x), z = Math.round(o.z);
    let w = Math.max(2, Math.round(o.w)), d = Math.max(2, Math.round(o.d));
    const base = Math.round(o.base), h = Math.max(2, Math.round(o.h));
    const mat = o.mat || M.CONCRETE_L;
    const win = o.win || M.GLASS_BLUE;
    const style = o.style || 'plain';

    // 裙楼
    let y = base;
    let bodyBase = base;
    if (o.podium) {
      const pw = w + o.podiumOut * 2, pd = d + o.podiumOut * 2;
      v.fillBox(x - o.podiumOut, base, z - o.podiumOut, pw, o.podium, pd, o.podiumMat || M.CONCRETE_M);
      if (o.podiumBand !== false) B.ring(v, x - o.podiumOut, base + o.podium - 1, z - o.podiumOut, pw, pd, o.podiumTop || M.CONCRETE_D, 1);
      bodyBase = base + o.podium;
    }

    const bodyH = Math.max(2, h - (bodyBase - base));
    const setbacks = o.setbacks == null ? (h > 34 && rng() < 0.55 ? 1 + (rng() < 0.4 ? 1 : 0) : 0) : o.setbacks;
    let cw = w, cd = d, cx = x, cz = z, cy = bodyBase, left = bodyH;

    for (let s = 0; s <= setbacks; s++) {
      const segH = s === setbacks ? left : Math.max(4, Math.round(left * (0.42 + rng() * 0.2)));
      if (o.taper) {
        B.taper(v, cx + cw / 2, cz + cd / 2, cw, cd, Math.max(2, cw * (1 - o.taper)), Math.max(2, cd * (1 - o.taper)), cy, segH, mat, o.cornerCut);
      } else {
        v.fillBox(cx, cy, cz, cw, segH, cd, mat);
        if (o.cornerCut) {
          const c = Math.max(1, Math.round(o.cornerCut * Math.min(cw, cd) * 0.5));
          for (let i = 0; i < c; i++) {
            const k = c - i;
            v.fillBox(cx, cy, cz + i, k, segH, 1, 0);
            v.fillBox(cx + cw - k, cy, cz + i, k, segH, 1, 0);
            v.fillBox(cx, cy, cz + cd - 1 - i, k, segH, 1, 0);
            v.fillBox(cx + cw - k, cy, cz + cd - 1 - i, k, segH, 1, 0);
          }
        }
      }
      // 立面语言
      if (style === 'glass') {
        // 整体玻璃：窗格交给着色器绘制，此处只加腰线
        if (cw > 5 && rng() < 0.6) B.bandFacade(v, cx, cz, cw, cd, cy, segH, Math.max(6, Math.round(segH / 4)), o.trim || M.CONCRETE_L);
      } else if (style === 'banded') {
        B.bandFacade(v, cx, cz, cw, cd, cy, segH, o.bandStep || 2, win);
      } else if (style === 'ribbed') {
        B.bandFacade(v, cx, cz, cw, cd, cy, segH, 2, win);
        B.ribFacade(v, cx, cz, cw, cd, cy, segH, o.ribStep || 3, mat);
      } else if (style === 'residential') {
        B.bandFacade(v, cx, cz, cw, cd, cy, segH, 2, win);
        if (o.ac !== false) B.acUnits(v, cx, cz, cw, cd, cy, segH, rng, o.acDensity == null ? 0.16 : o.acDensity);
      }
      cy += segH; left -= segH;
      if (s < setbacks) {
        const shrinkW = Math.max(1, Math.round(cw * (0.12 + rng() * 0.14)));
        const shrinkD = Math.max(1, Math.round(cd * (0.12 + rng() * 0.14)));
        cx += shrinkW; cz += shrinkD; cw = Math.max(3, cw - shrinkW * 2); cd = Math.max(3, cd - shrinkD * 2);
      }
    }

    // 冠部
    const crown = o.crown || (h > 60 ? 'spire' : rng() < 0.3 ? 'box' : 'flat');
    const topY = cy - 1;
    if (crown === 'spire') {
      const sx = cx + (cw >> 1), sz = cz + (cd >> 1);
      const sh = Math.max(4, Math.round(h * (0.06 + rng() * 0.08)));
      v.fillBox(sx - 1, topY + 1, sz - 1, 3, Math.max(2, sh >> 1), 3, o.crownMat || M.STEEL);
      v.fillBox(sx, topY + 1, sz, 1, sh, 1, M.STEEL_D);
      v.set(sx, topY + sh + 1, sz, M.BEACON_R);
    } else if (crown === 'stepped') {
      let sw = cw, sd = cd, sxx = cx, szz = cz, yy = topY + 1;
      for (let k = 0; k < 3 && sw > 3 && sd > 3; k++) {
        const st = 2 + Math.round(rng() * 2);
        v.fillBox(sxx, yy, szz, sw, st, sd, o.crownMat || mat);
        yy += st; sxx += 1; szz += 1; sw -= 2; sd -= 2;
      }
      v.set(sxx + (sw >> 1), yy, szz + (sd >> 1), M.BEACON_R);
    } else if (crown === 'pyramid') {
      let sw = cw, sd = cd, sxx = cx, szz = cz, yy = topY + 1;
      while (sw > 1 && sd > 1) { v.fillBox(sxx, yy, szz, sw, 1, sd, o.crownMat || mat); yy++; sxx++; szz++; sw -= 2; sd -= 2; }
    } else if (crown === 'box') {
      v.fillBox(cx + 1, topY + 1, cz + 1, Math.max(2, cw - 2), 2 + Math.round(rng() * 2), Math.max(2, cd - 2), o.crownMat || M.CONCRETE_M);
    }
    if (o.rooftop !== false) B.rooftop(v, cx, cz, cw, cd, cy - 1, rng, { helipad: !!o.helipad, antenna: crown !== 'spire', parapetMat: o.trim || M.CONCRETE_M });

    return { x, z, w, d, base, top: cy, cx, cz, cw, cd };
  };

  HKV.B = B;
})(typeof window !== 'undefined' ? window : globalThis);
