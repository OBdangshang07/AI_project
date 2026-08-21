/* =============================================================================
 * VOXEL VICTORIA HARBOUR · volume.js
 * 稀疏分块体素体（32³ chunk，按需分配）+ 带环境光遮蔽的贪心网格化（greedy mesher）
 * + DDA 体素射线（拾取 / 碰撞查询）。本文件为纯 JS，可在 Node 下直接跑生成与统计。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV || (global.HKV = {});
  const CH = 32, CH2 = CH * CH, CH3 = CH * CH * CH;
  const P = CH + 2, P2 = P * P;            // padded 34³

  // --------------------------------------------------------- 可增长缓冲工具
  function Grow(Type, cap) {
    this.T = Type; this.a = new Type(cap || 1024); this.n = 0;
  }
  Grow.prototype.need = function (k) {
    if (this.n + k <= this.a.length) return;
    let cap = this.a.length;
    while (cap < this.n + k) cap *= 2;
    const b = new this.T(cap); b.set(this.a); this.a = b;
  };
  Grow.prototype.push3 = function (x, y, z) { this.need(3); const a = this.a; a[this.n++] = x; a[this.n++] = y; a[this.n++] = z; };
  Grow.prototype.push1 = function (x) { this.need(1); this.a[this.n++] = x; };
  Grow.prototype.trim = function () { return this.a.subarray(0, this.n); };

  // ------------------------------------------------------------------- 体素体
  function Volume(sx, sy, sz) {
    this.sx = sx; this.sy = sy; this.sz = sz;
    this.cx = Math.ceil(sx / CH); this.cy = Math.ceil(sy / CH); this.cz = Math.ceil(sz / CH);
    this.nch = this.cx * this.cy * this.cz;
    this.chunks = new Array(this.nch).fill(null);
    this.counts = new Int32Array(this.nch);
    this.list = [];            // 已分配 chunk 索引，供网格化遍历
    this.filled = 0;
  }
  Volume.CH = CH;

  Volume.prototype.chunkIndex = function (cx, cy, cz) { return cx + this.cx * (cy + this.cy * cz); };

  Volume.prototype.get = function (x, y, z) {
    if (x < 0 || y < 0 || z < 0 || x >= this.sx || y >= this.sy || z >= this.sz) return 0;
    const ci = ((x >> 5)) + this.cx * (((y >> 5)) + this.cy * ((z >> 5)));
    const c = this.chunks[ci];
    if (c === null) return 0;
    return c[(x & 31) + CH * ((y & 31) + CH * (z & 31))];
  };

  Volume.prototype.set = function (x, y, z, v) {
    if (x < 0 || y < 0 || z < 0 || x >= this.sx || y >= this.sy || z >= this.sz) return;
    const ci = ((x >> 5)) + this.cx * (((y >> 5)) + this.cy * ((z >> 5)));
    let c = this.chunks[ci];
    if (c === null) {
      if (v === 0) return;
      c = this.chunks[ci] = new Uint8Array(CH3);
      this.list.push(ci);
    }
    const li = (x & 31) + CH * ((y & 31) + CH * (z & 31));
    const old = c[li];
    if (old === v) return;
    if (old === 0 && v !== 0) { this.counts[ci]++; this.filled++; }
    else if (old !== 0 && v === 0) { this.counts[ci]--; this.filled--; }
    c[li] = v;
  };

  // 快速矩形体填充（沿 x 连续区间 fill），mat=0 表示挖空
  Volume.prototype.fillBox = function (x0, y0, z0, w, h, d, v) {
    let X0 = Math.max(0, Math.floor(x0)), X1 = Math.min(this.sx, Math.floor(x0 + w));
    let Y0 = Math.max(0, Math.floor(y0)), Y1 = Math.min(this.sy, Math.floor(y0 + h));
    let Z0 = Math.max(0, Math.floor(z0)), Z1 = Math.min(this.sz, Math.floor(z0 + d));
    if (X1 <= X0 || Y1 <= Y0 || Z1 <= Z0) return;
    for (let z = Z0; z < Z1; z++) {
      for (let y = Y0; y < Y1; y++) {
        let x = X0;
        while (x < X1) {
          const cxi = x >> 5, cyi = y >> 5, czi = z >> 5;
          const ci = cxi + this.cx * (cyi + this.cy * czi);
          const runEnd = Math.min(X1, (cxi + 1) << 5);
          let c = this.chunks[ci];
          if (c === null) {
            if (v === 0) { x = runEnd; continue; }
            c = this.chunks[ci] = new Uint8Array(CH3);
            this.list.push(ci);
          }
          const rowBase = CH * ((y & 31) + CH * (z & 31));
          for (let xx = x; xx < runEnd; xx++) {
            const li = rowBase + (xx & 31);
            const old = c[li];
            if (old === v) continue;
            if (old === 0) { this.counts[ci]++; this.filled++; }
            else if (v === 0) { this.counts[ci]--; this.filled--; }
            c[li] = v;
          }
          x = runEnd;
        }
      }
    }
  };

  // 只在目标为空气时写入（保护已有结构，例如地形之上放树不覆盖建筑）
  Volume.prototype.setIfEmpty = function (x, y, z, v) {
    if (this.get(x, y, z) === 0) this.set(x, y, z, v);
  };

  Volume.prototype.stats = function () {
    let alloc = 0;
    for (let i = 0; i < this.nch; i++) if (this.chunks[i]) alloc++;
    return { filled: this.filled, chunks: alloc, chunkBytes: alloc * CH3, totalCells: this.sx * this.sy * this.sz };
  };

  // ------------------------------------------------------------ DDA 体素射线
  // 返回 {x,y,z,mat,nx,ny,nz,dist} 或 null。坐标为体素整数坐标。
  Volume.prototype.raycast = function (ox, oy, oz, dx, dy, dz, maxDist) {
    const len = Math.hypot(dx, dy, dz) || 1;
    dx /= len; dy /= len; dz /= len;
    let x = Math.floor(ox), y = Math.floor(oy), z = Math.floor(oz);
    const stepX = dx > 0 ? 1 : -1, stepY = dy > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
    const tDX = Math.abs(1 / (dx || 1e-9)), tDY = Math.abs(1 / (dy || 1e-9)), tDZ = Math.abs(1 / (dz || 1e-9));
    let tX = ((dx > 0 ? (x + 1 - ox) : (ox - x)) || 1e-9) * tDX;
    let tY = ((dy > 0 ? (y + 1 - oy) : (oy - y)) || 1e-9) * tDY;
    let tZ = ((dz > 0 ? (z + 1 - oz) : (oz - z)) || 1e-9) * tDZ;
    let t = 0, nx = 0, ny = 0, nz = 0, guard = 0;
    while (t <= maxDist && guard++ < 8192) {
      const m = this.get(x, y, z);
      if (m !== 0) return { x, y, z, mat: m, nx, ny, nz, dist: t };
      if (tX < tY && tX < tZ) { x += stepX; t = tX; tX += tDX; nx = -stepX; ny = 0; nz = 0; }
      else if (tY < tZ) { y += stepY; t = tY; tY += tDY; nx = 0; ny = -stepY; nz = 0; }
      else { z += stepZ; t = tZ; tZ += tDZ; nx = 0; ny = 0; nz = -stepZ; }
      if (y < -4 || y > this.sy + 4) break;
      if (x < -8 || x > this.sx + 8 || z < -8 || z > this.sz + 8) break;
    }
    return null;
  };

  // 轴对齐盒是否与实体体素相交（第一人称碰撞）
  Volume.prototype.boxSolid = function (minx, miny, minz, maxx, maxy, maxz) {
    const x0 = Math.floor(minx), x1 = Math.floor(maxx);
    const y0 = Math.floor(miny), y1 = Math.floor(maxy);
    const z0 = Math.floor(minz), z1 = Math.floor(maxz);
    for (let z = z0; z <= z1; z++)
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++)
          if (this.get(x, y, z) !== 0) return true;
    return false;
  };

  // 某 xz 列的最高实体高度（用于出生点 / 传送落点）
  Volume.prototype.columnTop = function (x, z, fromY) {
    for (let y = Math.min(this.sy - 1, fromY == null ? this.sy - 1 : fromY); y >= 0; y--)
      if (this.get(x, y, z) !== 0) return y;
    return -1;
  };

  // ---------------------------------------------------------------- 网格化器
  // 输出按空间桶（bucket）分组的几何数据：position(Float32) / normal(Int8) /
  // ao(Uint8) / mat(Uint8) / index(Uint32)。贪心合并键 = 材质 + 4 角 AO + 朝向。
  function Mesher(vol, opts) {
    opts = opts || {};
    this.vol = vol;
    this.bucketChunks = opts.bucketChunks || 4;     // 每桶 4x4x4 chunk = 128³ voxel
    this.buckets = new Map();
    this.i = 0;
    this.order = vol.list.slice();
    this.done = false;
    this.pad = new Uint8Array(P * P * P);
    this.mask = new Int32Array((CH + 1) * (CH + 1));
    this.quads = 0;
    this.tris = 0;
  }

  Mesher.prototype.progress = function () { return this.order.length ? this.i / this.order.length : 1; };

  Mesher.prototype._bucket = function (cx, cy, cz) {
    const b = this.bucketChunks;
    const key = (cx / b | 0) + 64 * ((cy / b | 0) + 64 * (cz / b | 0));
    let o = this.buckets.get(key);
    if (!o) {
      o = {
        key,
        pos: new Grow(Int16Array, 4096), nrm: new Grow(Int8Array, 4096),
        ao: new Grow(Uint8Array, 2048), mat: new Grow(Uint8Array, 2048),
        idx: new Grow(Uint32Array, 4096), verts: 0,
        min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9],
      };
      this.buckets.set(key, o);
    }
    return o;
  };

  // 单步：处理若干 chunk，受时间预算限制（保持加载动画流畅）
  Mesher.prototype.step = function (msBudget) {
    const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    while (this.i < this.order.length) {
      this._chunk(this.order[this.i++]);
      const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      if (msBudget && now - t0 > msBudget) return false;
    }
    this.done = true;
    return true;
  };

  Mesher.prototype._chunk = function (ci) {
    const vol = this.vol;
    if (vol.counts[ci] === 0) return;
    const cx = ci % vol.cx, cy = ((ci / vol.cx) | 0) % vol.cy, cz = (ci / (vol.cx * vol.cy)) | 0;
    const ox = cx * CH, oy = cy * CH, oz = cz * CH;
    const pad = this.pad;

    // 填充 34³ 邻域缓存（内部直接拷贝，边界走 vol.get）
    const core = vol.chunks[ci];
    pad.fill(0);
    for (let z = 0; z < CH; z++)
      for (let y = 0; y < CH; y++) {
        const src = CH * (y + CH * z), dst = 1 + P * ((y + 1) + P * (z + 1));
        for (let x = 0; x < CH; x++) pad[dst + x] = core[src + x];
      }
    for (let z = -1; z <= CH; z++)
      for (let y = -1; y <= CH; y++)
        for (let x = -1; x <= CH; x++) {
          if (x >= 0 && x < CH && y >= 0 && y < CH && z >= 0 && z < CH) continue;
          pad[(x + 1) + P * ((y + 1) + P * (z + 1))] = vol.get(ox + x, oy + y, oz + z);
        }

    const bucket = this._bucket(cx, cy, cz);
    const mask = this.mask;
    const OFF = [1, P, P2];

    for (let d = 0; d < 3; d++) {
      const u = (d + 1) % 3, v = (d + 2) % 3;
      const q = [0, 0, 0]; q[d] = 1;
      const xx = [0, 0, 0];
      const offQ = OFF[d], offU = OFF[u], offV = OFF[v];

      for (xx[d] = -1; xx[d] < CH; xx[d]++) {
        // 构建面掩码（全部走扁平索引，避免闭包与多维寻址开销）
        let mi = 0;
        for (xx[v] = 0; xx[v] < CH; xx[v]++) {
          xx[u] = 0;
          let bi = (xx[0] + 1) + P * ((xx[1] + 1) + P * (xx[2] + 1));
          for (let iu = 0; iu < CH; iu++, mi++, bi += offU) {
            const a = pad[bi];
            const b = pad[bi + offQ];
            let m = 0;
            if ((a !== 0) !== (b !== 0)) {
              const dirPos = a !== 0;
              const matId = dirPos ? a : b;
              const ai = dirPos ? bi + offQ : bi;      // 空气侧单元格
              const nU = pad[ai - offU] !== 0 ? 1 : 0, pU = pad[ai + offU] !== 0 ? 1 : 0;
              const nV = pad[ai - offV] !== 0 ? 1 : 0, pV = pad[ai + offV] !== 0 ? 1 : 0;
              const cnn = pad[ai - offU - offV] !== 0 ? 1 : 0, cpn = pad[ai + offU - offV] !== 0 ? 1 : 0;
              const cpp = pad[ai + offU + offV] !== 0 ? 1 : 0, cnp = pad[ai - offU + offV] !== 0 ? 1 : 0;
              const a0 = (nU && nV) ? 0 : 3 - (nU + nV + cnn);
              const a1 = (pU && nV) ? 0 : 3 - (pU + nV + cpn);
              const a2 = (pU && pV) ? 0 : 3 - (pU + pV + cpp);
              const a3 = (nU && pV) ? 0 : 3 - (nU + pV + cnp);
              m = (matId & 0xff) | (dirPos ? 0 : 0x10000) | (a0 << 17) | (a1 << 19) | (a2 << 21) | (a3 << 23);
            }
            mask[mi] = m;
          }
        }
        // 贪心合并
        mi = 0;
        for (let j = 0; j < CH; j++) {
          for (let i2 = 0; i2 < CH;) {
            const k = mask[j * CH + i2];
            if (k === 0) { i2++; continue; }
            let w = 1;
            while (i2 + w < CH && mask[j * CH + i2 + w] === k) w++;
            let h = 1;
            outer: while (j + h < CH) {
              for (let t = 0; t < w; t++) if (mask[(j + h) * CH + i2 + t] !== k) break outer;
              h++;
            }
            // 写出四边形
            const dir = (k & 0x10000) ? -1 : 1;
            const matId = k & 0xff;
            const a0 = (k >> 17) & 3, a1 = (k >> 19) & 3, a2 = (k >> 21) & 3, a3 = (k >> 23) & 3;
            const base = [0, 0, 0];
            base[d] = xx[d] + 1; base[u] = i2; base[v] = j;
            this._quad(bucket, base, d, u, v, w, h, dir, matId, a0, a1, a2, a3, ox, oy, oz);
            for (let l = 0; l < h; l++) for (let t = 0; t < w; t++) mask[(j + l) * CH + i2 + t] = 0;
            i2 += w;
          }
        }
      }
    }
  };

  const AO_LUT = [0.34, 0.6, 0.82, 1.0];

  Mesher.prototype._quad = function (bk, base, d, u, v, w, h, dir, matId, a0, a1, a2, a3, ox, oy, oz) {
    const p = [0, 0, 0];
    const V = bk.verts;
    const push = (du, dv, ao) => {
      p[d] = base[d]; p[u] = base[u] + du; p[v] = base[v] + dv;
      const X = p[0] + ox, Y = p[1] + oy, Z = p[2] + oz;
      bk.pos.push3(X, Y, Z);
      bk.nrm.push3(d === 0 ? dir * 127 : 0, d === 1 ? dir * 127 : 0, d === 2 ? dir * 127 : 0);
      bk.ao.push1(Math.round(AO_LUT[ao] * 255));
      bk.mat.push1(matId);
      if (X < bk.min[0]) bk.min[0] = X; if (Y < bk.min[1]) bk.min[1] = Y; if (Z < bk.min[2]) bk.min[2] = Z;
      if (X > bk.max[0]) bk.max[0] = X; if (Y > bk.max[1]) bk.max[1] = Y; if (Z > bk.max[2]) bk.max[2] = Z;
    };
    push(0, 0, a0); push(w, 0, a1); push(w, h, a2); push(0, h, a3);
    bk.verts += 4;
    // 三角化：按 AO 对角线选择，避免明暗楔形错位
    const flip = (a0 + a2) < (a1 + a3);
    const idx = bk.idx;
    idx.need(6);
    const I = idx.a;
    let n = idx.n;
    if (dir > 0) {
      if (!flip) { I[n++] = V; I[n++] = V + 1; I[n++] = V + 2; I[n++] = V; I[n++] = V + 2; I[n++] = V + 3; }
      else { I[n++] = V; I[n++] = V + 1; I[n++] = V + 3; I[n++] = V + 1; I[n++] = V + 2; I[n++] = V + 3; }
    } else {
      if (!flip) { I[n++] = V; I[n++] = V + 2; I[n++] = V + 1; I[n++] = V; I[n++] = V + 3; I[n++] = V + 2; }
      else { I[n++] = V; I[n++] = V + 3; I[n++] = V + 1; I[n++] = V + 1; I[n++] = V + 3; I[n++] = V + 2; }
    }
    idx.n = n;
    this.quads++; this.tris += 2;
  };

  Mesher.prototype.result = function () {
    const out = [];
    this.buckets.forEach((b) => {
      if (b.verts === 0) return;
      out.push({
        position: b.pos.trim(), normal: b.nrm.trim(), ao: b.ao.trim(),
        mat: b.mat.trim(), index: b.idx.trim(), verts: b.verts,
        min: b.min, max: b.max,
      });
    });
    return out;
  };

  Volume.prototype.createMesher = function (opts) { return new Mesher(this, opts); };

  HKV.Volume = Volume;
  HKV.Mesher = Mesher;

})(typeof window !== 'undefined' ? window : globalThis);
