/* =============================================================================
 * VOXEL VICTORIA HARBOUR · entities.js
 * 活的维港：天星小轮（双程往返 + 靠泊）、张保仔红帆船、货柜船 / 拖轮 / 快艇、
 * 电车「叮叮」/ 巴士 / 的士 / 私家车（instanced）、直升机与夜航客机、
 * 香港摩天轮（真转）、幻彩咏香江激光与探照灯、雨幕。
 * 所有模型都用同一套体素笔刷 + 同一个网格化器生成，材质与城市完全一致。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const THREE = global.THREE;
  const { W, M, B, RNG, clamp, lerp } = HKV;
  const E = {};

  // ------------------------------------------------------------------ 模型库
  function vol(sx, sy, sz) { return new HKV.Volume(sx, sy, sz); }

  const MODELS = {};

  function model(name, sx, sy, sz, fn) {
    const v = vol(sx, sy, sz);
    fn(v, B);
    const geo = HKV.G.geometryFromVolume(v, true);
    MODELS[name] = geo;
    return geo;
  }

  E.buildModels = function () {
    // 天星小轮：双层、白绿涂装、烟囱、上层棚顶
    model('ferry', 20, 12, 10, (v, B) => {
      for (let i = 0; i < 18; i++) {
        const t = i / 17;
        const d = Math.round(6 * Math.sin(Math.PI * Math.min(1, 0.25 + t * 0.9)) + 1);
        v.fillBox(1 + i, 1, 5 - (d >> 1), 1, 2, d, M.FERRY_GREEN);
        v.fillBox(1 + i, 3, 5 - (d >> 1), 1, 1, d, M.FERRY_WHITE);
      }
      v.fillBox(3, 4, 2, 14, 2, 6, M.FERRY_WHITE);
      for (let i = 3; i < 17; i += 2) { v.set(i, 4, 1, M.GLASS_VEH); v.set(i, 4, 8, M.GLASS_VEH); }
      v.fillBox(4, 6, 3, 12, 1, 4, M.FERRY_GREEN);
      v.fillBox(9, 7, 4, 2, 2, 2, M.FERRY_WHITE);         // 驾驶室
      v.fillBox(13, 7, 4, 1, 3, 1, M.HULL_BLACK);          // 烟囱
      v.set(2, 5, 5, M.WIN_WARM); v.set(17, 5, 5, M.WIN_WARM);
    });

    // 张保仔（红帆中式帆船）
    model('junk', 18, 16, 8, (v, B) => {
      for (let i = 0; i < 16; i++) {
        const t = i / 15;
        const d = Math.round(4 * Math.sin(Math.PI * Math.min(1, 0.3 + t * 0.85)) + 1);
        v.fillBox(1 + i, 1, 4 - (d >> 1), 1, 2, d, M.WOOD);
      }
      v.fillBox(3, 3, 2, 10, 1, 4, M.DECK);
      v.fillBox(11, 3, 3, 4, 2, 2, M.WOOD);
      // 两面红帆
      for (let s = 0; s < 2; s++) {
        const mx = 5 + s * 6, mh = 9 - s * 2;
        v.fillBox(mx, 3, 4, 1, mh, 1, M.WOOD);
        for (let y = 0; y < mh - 2; y++) {
          const w = 3 + Math.round((mh - 2 - y) * 0.4);
          v.fillBox(mx - (w >> 1), 5 + y, 4, w, 1, 1, M.SAIL_RED);
        }
      }
    });

    // 货柜船
    model('cargo', 46, 14, 12, (v, B) => {
      for (let i = 0; i < 44; i++) {
        const t = i / 43;
        const d = Math.round(9 * Math.sin(Math.PI * Math.min(1, 0.22 + t * 0.95)) + 1);
        v.fillBox(1 + i, 1, 6 - (d >> 1), 1, 3, d, M.HULL_RED);
        v.fillBox(1 + i, 4, 6 - (d >> 1), 1, 1, d, M.HULL_BLACK);
      }
      const cont = [M.CONT_RED, M.CONT_BLUE, M.CONT_GREEN, M.CONT_YELL];
      const r = RNG(99);
      for (let i = 4; i < 34; i += 3) for (let j = 0; j < 3; j++) {
        const stack = 1 + ((r() * 3) | 0);
        for (let s = 0; s < stack; s++) v.fillBox(i, 5 + s, 3 + j * 2, 3, 1, 2, cont[(r() * 4) | 0]);
      }
      v.fillBox(36, 5, 3, 7, 5, 6, M.FERRY_WHITE);
      for (let i = 37; i < 42; i += 2) v.set(i, 7, 2, M.GLASS_VEH);
      v.fillBox(39, 10, 5, 2, 3, 2, M.HULL_BLACK);
      v.set(40, 13, 6, M.BEACON_R);
    });

    // 拖轮
    model('tug', 12, 10, 8, (v, B) => {
      for (let i = 0; i < 10; i++) {
        const d = 5 - Math.abs(i - 5) * 0.4 | 0;
        v.fillBox(1 + i, 1, 4 - (d >> 1), 1, 2, Math.max(2, d), M.HULL_BLUE);
      }
      v.fillBox(3, 3, 2, 5, 3, 4, M.FERRY_WHITE);
      v.fillBox(4, 6, 3, 2, 2, 2, M.HULL_BLACK);
      v.set(9, 4, 4, M.WIN_WARM);
    });

    // 快艇
    model('speedboat', 10, 6, 6, (v, B) => {
      for (let i = 0; i < 9; i++) {
        const d = Math.round(4 * Math.sin(Math.PI * (0.3 + i / 9 * 0.8)));
        v.fillBox(1 + i, 1, 3 - (d >> 1), 1, 1, Math.max(1, d), M.FERRY_WHITE);
      }
      v.fillBox(3, 2, 2, 4, 1, 2, M.GLASS_VEH);
      v.set(8, 2, 3, M.HULL_BLACK);
    });

    // 邮轮（停泊在海运大厦）
    model('cruise', 76, 26, 16, (v, B) => {
      for (let i = 0; i < 74; i++) {
        const t = i / 73;
        const d = Math.round(13 * Math.sin(Math.PI * Math.min(1, 0.18 + t * 0.98)) + 1);
        v.fillBox(1 + i, 1, 8 - (d >> 1), 1, 4, d, M.HULL_BLACK);
        v.fillBox(1 + i, 5, 8 - (d >> 1), 1, 1, d, M.HULL_RED);
      }
      for (let deck = 0; deck < 5; deck++) {
        const inset = 3 + deck;
        v.fillBox(6 + deck, 6 + deck * 2, 2 + deck, 60 - deck * 3, 2, 12 - deck * 2, M.FERRY_WHITE);
        for (let i = 7 + deck; i < 64 - deck * 3; i += 2) {
          v.set(i, 6 + deck * 2, 1 + deck, M.GLASS_VEH);
          v.set(i, 6 + deck * 2, 13 - deck, M.GLASS_VEH);
        }
      }
      v.fillBox(30, 16, 6, 6, 4, 5, M.FERRY_WHITE);
      v.fillBox(44, 16, 7, 4, 6, 3, M.HULL_BLUE);
      v.set(45, 22, 8, M.BEACON_R);
    });

    // 电车「叮叮」（双层）
    model('tram', 8, 8, 4, (v, B) => {
      v.fillBox(0, 1, 0, 8, 1, 4, M.HULL_BLACK);
      v.fillBox(0, 2, 0, 8, 2, 4, M.TRAM_GREEN);
      v.fillBox(0, 4, 0, 8, 2, 4, M.TRAM_GREEN);
      for (let i = 1; i < 7; i++) { v.set(i, 3, 0, M.GLASS_VEH); v.set(i, 3, 3, M.GLASS_VEH); v.set(i, 5, 0, M.GLASS_VEH); v.set(i, 5, 3, M.GLASS_VEH); }
      v.fillBox(0, 6, 0, 8, 1, 4, M.TRAM_GREEN);
      v.fillBox(3, 7, 1, 2, 1, 2, M.STEEL_D);
      v.set(0, 2, 2, M.WIN_WARM); v.set(7, 2, 2, M.WIN_WARM);
    });

    // 双层巴士
    model('bus', 9, 8, 4, (v, B) => {
      v.fillBox(0, 1, 0, 9, 5, 4, M.BUS_RED);
      v.fillBox(0, 1, 0, 9, 1, 4, M.HULL_BLACK);
      for (let i = 1; i < 8; i++) { v.set(i, 3, 0, M.GLASS_VEH); v.set(i, 3, 3, M.GLASS_VEH); v.set(i, 5, 0, M.GLASS_VEH); v.set(i, 5, 3, M.GLASS_VEH); }
      v.fillBox(0, 2, 1, 1, 3, 2, M.GLASS_VEH);
      v.fillBox(0, 6, 0, 9, 1, 4, M.BUS_RED);
      v.set(0, 1, 0, M.WIN_COOL); v.set(0, 1, 3, M.WIN_COOL);
    });

    // 的士 / 私家车 / 货车
    model('taxi', 5, 4, 3, (v, B) => {
      v.fillBox(0, 1, 0, 5, 1, 3, M.TAXI_RED);
      v.fillBox(1, 2, 0, 3, 1, 3, M.WHITE_PANEL);
      v.set(1, 2, 1, M.GLASS_VEH); v.set(3, 2, 1, M.GLASS_VEH);
      v.set(0, 1, 0, M.WIN_COOL); v.set(0, 1, 2, M.WIN_COOL);
    });
    model('car', 5, 4, 3, (v, B) => {
      v.fillBox(0, 1, 0, 5, 1, 3, M.CAR_W);
      v.fillBox(1, 2, 0, 3, 1, 3, M.GLASS_VEH);
      v.set(0, 1, 0, M.WIN_COOL); v.set(0, 1, 2, M.WIN_COOL);
    });
    model('van', 6, 5, 3, (v, B) => {
      v.fillBox(0, 1, 0, 6, 3, 3, M.CAR_D);
      v.fillBox(0, 2, 0, 2, 1, 3, M.GLASS_VEH);
      v.set(0, 1, 0, M.WIN_COOL); v.set(0, 1, 2, M.WIN_COOL);
    });

    // 直升机
    model('heli', 10, 6, 8, (v, B) => {
      v.fillBox(2, 2, 3, 6, 2, 3, M.HULL_BLUE);
      v.fillBox(1, 2, 3, 2, 2, 3, M.GLASS_VEH);
      v.fillBox(7, 3, 4, 3, 1, 1, M.HULL_BLUE);
      v.fillBox(9, 3, 4, 1, 2, 1, M.HULL_BLUE);
      v.fillBox(4, 4, 4, 1, 1, 1, M.STEEL_D);
      v.set(2, 1, 3, M.STEEL_D); v.set(2, 1, 5, M.STEEL_D);
      v.set(1, 2, 4, M.BEACON_R);
    });
    // 旋翼（单独模型，绕 Y 旋转）
    model('rotor', 12, 2, 12, (v, B) => {
      v.fillBox(0, 0, 5, 12, 1, 1, M.STEEL_D);
      v.fillBox(5, 0, 0, 1, 1, 12, M.STEEL_D);
    });

    // 客机（远景夜航）
    model('plane', 24, 6, 22, (v, B) => {
      v.fillBox(2, 2, 10, 20, 2, 2, M.WHITE_PANEL);
      v.fillBox(0, 2, 10, 2, 1, 2, M.GLASS_VEH);
      v.fillBox(8, 2, 2, 4, 1, 18, M.WHITE_PANEL);
      v.fillBox(19, 2, 7, 2, 1, 8, M.WHITE_PANEL);
      v.fillBox(20, 3, 10, 1, 3, 2, M.WHITE_PANEL);
      v.set(1, 2, 10, M.WIN_COOL);
      v.set(8, 2, 2, M.BEACON_R); v.set(8, 2, 19, M.NEON_GREEN);
    });

    // 摩天轮：轮辐与座舱
    model('wheelRim', 32, 32, 3, (v, B) => {
      const cx = 16, cy = 16, R = 14.5;
      for (let a = 0; a < 220; a++) {
        const th = a / 220 * Math.PI * 2;
        const x = Math.round(cx + Math.cos(th) * R), y = Math.round(cy + Math.sin(th) * R);
        v.set(x, y, 1, M.STEEL);
        v.set(x, y, 0, M.STEEL); v.set(x, y, 2, M.STEEL);
      }
      for (let s = 0; s < 16; s++) {
        const th = s / 16 * Math.PI * 2;
        B.line(v, cx, cy, 1, Math.round(cx + Math.cos(th) * R), Math.round(cy + Math.sin(th) * R), 1, M.STEEL_D);
      }
      v.fillBox(cx - 1, cy - 1, 0, 3, 3, 3, M.STEEL_D);
      // 灯带
      for (let a = 0; a < 36; a++) {
        const th = a / 36 * Math.PI * 2;
        v.set(Math.round(cx + Math.cos(th) * (R + 1)), Math.round(cy + Math.sin(th) * (R + 1)), 1, M.NEON_CYAN);
      }
    });
    model('cabin', 3, 3, 3, (v, B) => {
      v.fillBox(0, 0, 0, 3, 1, 3, M.STEEL_D);
      v.fillBox(0, 1, 0, 3, 2, 3, M.GLASS_VEH);
      v.set(1, 2, 1, M.WIN_WARM);
    });
    return MODELS;
  };

  E.models = () => MODELS;

  // ---------------------------------------------------------------- 动态实体
  // 每个 actor = { group, update(dt, ctx) }
  function makeMesh(name, material) {
    const geo = MODELS[name];
    const mesh = new THREE.Mesh(geo, material);
    const g = new THREE.Group();
    const p = geo.userData.pivot;
    mesh.position.set(-p[0], -p[1], -p[2]);
    mesh.frustumCulled = true;
    g.add(mesh);
    g.userData.size = geo.userData.size;
    return g;
  }
  E.makeMesh = makeMesh;

  // 船只沿路径巡航（含靠泊停留 + 摇晃 + 尾迹）
  function Vessel(opts) {
    this.g = makeMesh(opts.model, opts.material);
    this.path = opts.path;           // [{x,z,dwell}]
    this.speed = opts.speed || 3.2;
    this.i = opts.start || 0;
    this.t = 0;
    this.wait = 0;
    this.loop = opts.loop !== false;
    this.roll = opts.roll == null ? 0.035 : opts.roll;
    this.dir = 1;
    this.scale = opts.scale || 1;
    this.g.scale.setScalar(this.scale);
    this.wake = null;
    if (opts.wake !== false) {
      const geo = new THREE.PlaneGeometry(1, 1);
      const mat = new THREE.MeshBasicMaterial({ color: 0xdfeef5, transparent: true, opacity: 0.24, depthWrite: false });
      this.wake = new THREE.Mesh(geo, mat);
      this.wake.rotation.x = -Math.PI / 2;
      this.wakeLen = opts.wakeLen || 26;
      this.wake.scale.set(opts.wakeW || 5, this.wakeLen, 1);
    }
  }
  Vessel.prototype.update = function (dt, ctx) {
    const p = this.path;
    if (this.wait > 0) { this.wait -= dt; }
    else {
      const a = p[this.i], b = p[(this.i + this.dir + p.length) % p.length];
      const dx = b.x - a.x, dz = b.z - a.z;
      const L = Math.hypot(dx, dz) || 1;
      this.t += (this.speed * dt) / L;
      if (this.t >= 1) {
        this.t = 0;
        this.i = (this.i + this.dir + p.length) % p.length;
        const nb = p[this.i];
        if (nb.dwell) this.wait = nb.dwell;
        if (!this.loop && (this.i === 0 || this.i === p.length - 1)) this.dir *= -1;
      }
    }
    const a = p[this.i], b = p[(this.i + this.dir + p.length) % p.length];
    const x = lerp(a.x, b.x, this.t), z = lerp(a.z, b.z, this.t);
    const ang = Math.atan2(b.x - a.x, b.z - a.z);
    const bob = Math.sin(ctx.time * 1.3 + this.i * 2.1) * 0.16;
    this.g.position.set(x, W.SEA + 0.1 + bob, z);
    this.g.rotation.y = ang;
    this.g.rotation.z = Math.sin(ctx.time * 0.9 + this.i) * this.roll;
    if (this.wake) {
      const moving = this.wait <= 0 ? 1 : 0;
      this.wake.material.opacity = 0.26 * moving;
      this.wake.position.set(x - Math.sin(ang) * this.wakeLen * 0.5, W.SEA + 0.16, z - Math.cos(ang) * this.wakeLen * 0.5);
      this.wake.rotation.z = -ang;
    }
  };

  // 车辆群（instanced）：沿一组直线道路来回跑，夜间亮车灯
  function Traffic(models, material, lanes, count) {
    this.lanes = lanes;
    this.items = [];
    this.meshes = {};
    const rng = RNG(4711);
    const perModel = {};
    for (const n of models) perModel[n] = [];
    for (let i = 0; i < count; i++) {
      const lane = lanes[(rng() * lanes.length) | 0];
      const name = models[(rng() * models.length) | 0];
      const it = { lane, t: rng(), speed: (0.9 + rng() * 1.1) * (lane.speed || 6), name, off: (rng() - 0.5) * 0.6 };
      perModel[name].push(it);
      this.items.push(it);
    }
    this.groups = [];
    for (const n of models) {
      const arr = perModel[n];
      if (!arr.length) continue;
      const geo = MODELS[n];
      const im = new THREE.InstancedMesh(geo, material, arr.length);
      im.frustumCulled = false;
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const tint = new Float32Array(arr.length * 3);
      for (let i = 0; i < arr.length; i++) {
        const h = rng();
        const c = new THREE.Color().setHSL(h, 0.25 + rng() * 0.35, 0.45 + rng() * 0.3);
        tint[i * 3] = c.r; tint[i * 3 + 1] = c.g; tint[i * 3 + 2] = c.b;
      }
      geo.setAttribute('iColorTint', new THREE.InstancedBufferAttribute(tint, 3));
      this.groups.push({ mesh: im, items: arr, pivot: geo.userData.pivot });
    }
  }
  // 复用的临时量（热路径零分配）
  const _tM = new THREE.Matrix4(), _tQ = new THREE.Quaternion();
  const _tS = new THREE.Vector3(1, 1, 1), _tPos = new THREE.Vector3();
  const _tPivot = new THREE.Matrix4(), _tAxisY = new THREE.Vector3(0, 1, 0);
  Traffic.prototype.update = function (dt, ctx) {
    const m = _tM, q = _tQ, s = _tS, pos = _tPos;
    for (const grp of this.groups) {
      const pv = grp.pivot;
      _tPivot.makeTranslation(-pv[0], -pv[1], -pv[2]);      // 每组一次
      for (let i = 0; i < grp.items.length; i++) {
        const it = grp.items[i];
        it.t += (it.speed * dt) / it.lane.len;
        if (it.t > 1) it.t -= 1;
        const L = it.lane;
        const x = lerp(L.x0, L.x1, it.t), z = lerp(L.z0, L.z1, it.t);
        const ang = Math.atan2(L.x1 - L.x0, L.z1 - L.z0);
        q.setFromAxisAngle(_tAxisY, ang);
        pos.set(x - Math.cos(ang) * it.off, L.y, z + Math.sin(ang) * it.off);
        m.compose(pos, q, s);
        // 把模型 pivot 折进实例矩阵
        m.multiply(_tPivot);
        grp.mesh.setMatrixAt(i, m);
      }
      grp.mesh.instanceMatrix.needsUpdate = true;
    }
  };

  // 摩天轮
  function Wheel(material, x, y, z) {
    this.g = new THREE.Group();
    this.g.position.set(x, y, z);
    this.rim = makeMesh('wheelRim', material);
    this.rim.position.set(0, 0, 0);
    this.g.add(this.rim);
    this.cabins = [];
    for (let i = 0; i < 16; i++) {
      const c = makeMesh('cabin', material);
      this.g.add(c);
      this.cabins.push(c);
    }
    this.R = 15.5;
    // 支架
    const legMat = material;
    this.spin = 0;
  }
  Wheel.prototype.update = function (dt, ctx) {
    this.spin += dt * 0.12;
    this.rim.rotation.z = this.spin;
    for (let i = 0; i < this.cabins.length; i++) {
      const th = this.spin + i / this.cabins.length * Math.PI * 2;
      this.cabins[i].position.set(Math.cos(th) * this.R, Math.sin(th) * this.R, -0.5);
    }
  };

  // 直升机 / 客机
  function Aircraft(opts) {
    this.g = makeMesh(opts.model, opts.material);
    this.rotor = opts.rotor ? makeMesh('rotor', opts.material) : null;
    if (this.rotor) { this.rotor.position.set(0, opts.rotorY || 4.5, 0); this.g.add(this.rotor); }
    this.center = opts.center;
    this.radius = opts.radius || 120;
    this.height = opts.height || 60;
    this.speed = opts.speed || 0.12;
    this.phase = opts.phase || 0;
    this.bank = opts.bank == null ? 0.18 : opts.bank;
    this.linear = opts.linear || null;
    this.scale = opts.scale || 1;
    this.g.scale.setScalar(this.scale);
  }
  Aircraft.prototype.update = function (dt, ctx) {
    if (this.linear) {
      const L = this.linear;
      L.t = (L.t || 0) + dt * this.speed;
      if (L.t > 1) L.t -= 1;
      const x = lerp(L.x0, L.x1, L.t), z = lerp(L.z0, L.z1, L.t);
      this.g.position.set(x, L.y, z);
      this.g.rotation.y = Math.atan2(L.x1 - L.x0, L.z1 - L.z0);
    } else {
      this.phase += dt * this.speed;
      const x = this.center[0] + Math.cos(this.phase) * this.radius;
      const z = this.center[1] + Math.sin(this.phase) * this.radius;
      this.g.position.set(x, this.height + Math.sin(this.phase * 2.3) * 2.5, z);
      this.g.rotation.y = -this.phase + Math.PI / 2;
      this.g.rotation.z = this.bank;
    }
    if (this.rotor) this.rotor.rotation.y += dt * 34;
  };

  // 幻彩咏香江：楼顶激光 + 扫射探照灯
  function LightShow(beamMat, sources) {
    this.g = new THREE.Group();
    this.beams = [];
    const geo = new THREE.CylinderGeometry(0.35, 2.2, 1, 6, 1, true);
    geo.translate(0, 0.5, 0);
    for (const s of sources) {
      const mat = beamMat.clone();
      mat.uniforms.uColor.value = new THREE.Color(s.color);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(s.x, s.y, s.z);
      m.scale.set(1, s.len || 220, 1);
      m.userData = { src: s, mat };
      this.g.add(m);
      this.beams.push(m);
    }
    this.on = 0;
  }
  LightShow.prototype.update = function (dt, ctx) {
    const t = ctx.time;
    const on = ctx.showOn ? 1 : 0;
    this.on += (on - this.on) * Math.min(1, dt * 2);
    for (const m of this.beams) {
      const s = m.userData.src;
      const sw = Math.sin(t * s.rate + s.phase);
      m.rotation.z = s.tilt + sw * s.sweep;
      m.rotation.y = s.yaw + Math.cos(t * s.rate * 0.7 + s.phase) * s.sweep * 0.8;
      m.userData.mat.uniforms.uTime.value = t;
      m.userData.mat.uniforms.uOpacity.value = this.on * (0.22 + 0.24 * (0.5 + 0.5 * Math.sin(t * 1.7 + s.phase)));
      m.visible = this.on > 0.02;
      const hue = (t * 0.05 + s.phase * 0.1) % 1;
      if (s.rainbow) m.userData.mat.uniforms.uColor.value.setHSL(hue, 0.85, 0.6);
    }
  };

  // 雨幕（instanced 细线）
  function Rain(mat, count) {
    const geo = new THREE.PlaneGeometry(0.06, 1.6);
    const im = new THREE.InstancedMesh(geo, mat, count);
    const seeds = new Float32Array(count * 3);
    const rng = RNG(31337);
    for (let i = 0; i < count; i++) { seeds[i * 3] = rng(); seeds[i * 3 + 1] = rng(); seeds[i * 3 + 2] = rng(); }
    geo.setAttribute('iSeed', new THREE.InstancedBufferAttribute(seeds, 3));
    im.frustumCulled = false;
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) im.setMatrixAt(i, m);
    im.instanceMatrix.needsUpdate = true;
    this.mesh = im;
    this.mat = mat;
  }
  Rain.prototype.update = function (dt, ctx) {
    this.mat.uniforms.uTime.value = ctx.time;
    this.mat.uniforms.uCam.value.copy(ctx.camPos);
    this.mesh.visible = ctx.rain > 0.02;
    this.mat.uniforms.uOpacity.value = 0.3 * ctx.rain;
  };

  // ------------------------------------------------------- 场景装配（全部实体）
  E.build = function (scene, materials, geo) {
    const acts = [];
    const vmat = materials.voxel;
    const imat = materials.voxelInstanced;

    // —— 天星小轮：尖沙咀 <-> 中环，尖沙咀 <-> 湾仔 ——
    const ferryRoutes = [
      [{ x: 566, z: 424, dwell: 6 }, { x: 520, z: 360 }, { x: 300, z: 262, dwell: 6 }, { x: 480, z: 350 }],
      [{ x: 574, z: 426, dwell: 5 }, { x: 560, z: 330 }, { x: 540, z: 276, dwell: 5 }, { x: 566, z: 340 }],
    ];
    for (let i = 0; i < ferryRoutes.length; i++) {
      for (let k = 0; k < 2; k++) {
        const v = new Vessel({ model: 'ferry', material: vmat, path: ferryRoutes[i], speed: 4.2, start: k * 2, wakeW: 6, wakeLen: 22 });
        scene.add(v.g); if (v.wake) scene.add(v.wake);
        acts.push(v);
      }
    }
    // —— 张保仔 ——
    const junk = new Vessel({
      model: 'junk', material: vmat, speed: 3.0, wakeW: 4, wakeLen: 14,
      path: [{ x: 260, z: 300 }, { x: 420, z: 330 }, { x: 620, z: 320 }, { x: 780, z: 340 }, { x: 620, z: 360 }, { x: 400, z: 350 }],
    });
    scene.add(junk.g); if (junk.wake) scene.add(junk.wake); acts.push(junk);

    // —— 货柜船 / 拖轮 / 快艇 ——
    const cargoPaths = [
      [{ x: -30, z: 330 }, { x: 1180, z: 300 }],
      [{ x: 1180, z: 348 }, { x: -30, z: 366 }],
    ];
    for (let i = 0; i < cargoPaths.length; i++) {
      const v = new Vessel({ model: 'cargo', material: vmat, path: cargoPaths[i], speed: 5.5, loop: true, wakeW: 10, wakeLen: 40, roll: 0.02 });
      scene.add(v.g); if (v.wake) scene.add(v.wake); acts.push(v);
    }
    for (const p of [[[{ x: 180, z: 330 }, { x: 420, z: 300 }, { x: 240, z: 356 }]], [[{ x: 860, z: 320 }, { x: 700, z: 356 }, { x: 940, z: 344 }]]]) {
      const v = new Vessel({ model: 'tug', material: vmat, path: p[0], speed: 3.6, wakeW: 4, wakeLen: 12 });
      scene.add(v.g); if (v.wake) scene.add(v.wake); acts.push(v);
    }
    for (let i = 0; i < 5; i++) {
      const rng = RNG(900 + i);
      const x0 = 200 + rng() * 700, z0 = 290 + rng() * 100;
      const v = new Vessel({
        model: 'speedboat', material: vmat, speed: 8 + rng() * 6, wakeW: 2.5, wakeLen: 16,
        path: [{ x: x0, z: z0 }, { x: x0 + 120 - rng() * 240, z: z0 + 60 - rng() * 120 }, { x: x0 + 60, z: z0 + 90 - rng() * 60 }],
      });
      scene.add(v.g); if (v.wake) scene.add(v.wake); acts.push(v);
    }
    // —— 停泊在海运大厦的邮轮 ——
    const cruise = makeMesh('cruise', vmat);
    cruise.position.set(430, W.SEA + 0.1, 408);
    cruise.rotation.y = Math.PI / 2;
    scene.add(cruise);

    // —— 车流：沿主干道的直线车道 ——
    const lanes = [];
    const push = (x0, z0, x1, z1, y, speed) => {
      const len = Math.hypot(x1 - x0, z1 - z0);
      lanes.push({ x0, z0, x1, z1, y, len, speed: speed || 7 });
    };
    for (const [k, sgn, side] of [[4, -1, 'hk'], [18, -1, 'hk'], [52, -1, 'hk'], [5, 1, 'kl'], [20, 1, 'kl'], [38, 1, 'kl']]) {
      for (let seg = 0; seg < 6; seg++) {
        const xa = 40 + seg * 180, xb = xa + 170;
        const za = (side === 'hk' ? geo.hkShore[clamp(xa | 0, 0, geo.SX - 1)] : geo.klShore[clamp(xa | 0, 0, geo.SX - 1)]) + sgn * k;
        const zb = (side === 'hk' ? geo.hkShore[clamp(xb | 0, 0, geo.SX - 1)] : geo.klShore[clamp(xb | 0, 0, geo.SX - 1)]) + sgn * k;
        push(xa, za + 0.8, xb, zb + 0.8, W.GROUND + 1, 7 + Math.random() * 3);
        push(xb, zb - 0.8, xa, za - 0.8, W.GROUND + 1, 7 + Math.random() * 3);
      }
    }
    // 弥敦道
    push(606, 458, 606, 612, W.GROUND + 1, 6);
    push(608, 612, 608, 458, W.GROUND + 1, 6);
    const traffic = new Traffic(['car', 'taxi', 'van', 'bus'], imat, lanes, 220);
    for (const g of traffic.groups) scene.add(g.mesh);
    acts.push(traffic);

    // 电车（沿德辅道 / 轩尼诗道）
    const tramLanes = [];
    for (let seg = 0; seg < 5; seg++) {
      const xa = 60 + seg * 170, xb = xa + 160;
      const za = geo.hkShore[clamp(xa, 0, geo.SX - 1)] - 18, zb = geo.hkShore[clamp(xb, 0, geo.SX - 1)] - 18;
      tramLanes.push({ x0: xa, z0: za, x1: xb, z1: zb, y: W.GROUND + 1, len: Math.hypot(xb - xa, zb - za), speed: 4.5 });
      const za2 = geo.hkShore[clamp(xa, 0, geo.SX - 1)] - 52, zb2 = geo.hkShore[clamp(xb, 0, geo.SX - 1)] - 52;
      tramLanes.push({ x0: xb, z0: zb2, x1: xa, z1: za2, y: W.GROUND + 1, len: Math.hypot(xb - xa, zb2 - za2), speed: 4.5 });
    }
    const trams = new Traffic(['tram'], imat, tramLanes, 14);
    for (const g of trams.groups) scene.add(g.mesh);
    acts.push(trams);

    // —— 摩天轮（中环海滨）——
    const wheel = new Wheel(vmat, 318, W.GROUND + 16, 252);
    scene.add(wheel.g); acts.push(wheel);
    // 摩天轮支架
    const legGeo = new THREE.BoxGeometry(1, 16, 1);
    const legMat = new THREE.MeshBasicMaterial({ color: 0x8d949a });
    for (const dx of [-6, 6]) for (const dz of [-3, 3]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(318 + dx, W.GROUND + 8, 252 + dz);
      leg.rotation.z = dx > 0 ? -0.18 : 0.18;
      scene.add(leg);
    }

    // —— 直升机 / 客机 ——
    const heli = new Aircraft({ model: 'heli', material: vmat, rotor: true, rotorY: 4.2, center: [340, 240], radius: 150, height: 96, speed: 0.16, scale: 1 });
    scene.add(heli.g); acts.push(heli);
    const heli2 = new Aircraft({ model: 'heli', material: vmat, rotor: true, rotorY: 4.2, center: [700, 430], radius: 120, height: 72, speed: -0.13 });
    scene.add(heli2.g); acts.push(heli2);
    const plane = new Aircraft({ model: 'plane', material: vmat, linear: { x0: -100, z0: 640, x1: 1300, z1: 560, y: 150, t: 0 }, speed: 0.035, scale: 1.4 });
    scene.add(plane.g); acts.push(plane);

    // —— 幻彩咏香江：两岸楼顶激光 ——
    const sources = [
      { x: 252, y: W.GROUND + 104, z: 231, color: 0x66e0ff, rate: 0.7, phase: 0.0, tilt: 0.35, yaw: 0.2, sweep: 0.5, len: 300, rainbow: true },
      { x: 378, y: W.GROUND + 92, z: 196, color: 0xff5bb0, rate: 0.55, phase: 1.2, tilt: -0.4, yaw: 0.9, sweep: 0.45, len: 280, rainbow: true },
      { x: 500, y: W.GROUND + 94, z: 236, color: 0xffd45b, rate: 0.62, phase: 2.4, tilt: 0.42, yaw: -0.5, sweep: 0.5, len: 300, rainbow: true },
      { x: 313, y: W.GROUND + 87, z: 203, color: 0x7bff9d, rate: 0.5, phase: 3.1, tilt: -0.3, yaw: 0.4, sweep: 0.55, len: 260, rainbow: true },
      { x: 218, y: W.GROUND + 121, z: 474, color: 0x8fb3ff, rate: 0.45, phase: 0.7, tilt: -0.5, yaw: 3.4, sweep: 0.6, len: 340, rainbow: true },
      { x: 656, y: W.GROUND + 66, z: 452, color: 0xff8f5b, rate: 0.68, phase: 1.9, tilt: -0.45, yaw: 3.0, sweep: 0.5, len: 260, rainbow: true },
      { x: 818, y: W.GROUND + 58, z: 466, color: 0x5bffe0, rate: 0.58, phase: 2.8, tilt: -0.38, yaw: 2.6, sweep: 0.45, len: 240, rainbow: true },
      { x: 560, y: W.GROUND + 56, z: 194, color: 0xff5b5b, rate: 0.52, phase: 4.0, tilt: 0.3, yaw: 1.4, sweep: 0.5, len: 240, rainbow: true },
    ];
    const show = new LightShow(materials.beam, sources);
    scene.add(show.g); acts.push(show);

    // —— 雨 ——
    const rain = new Rain(materials.rain, 900);
    scene.add(rain.mesh); acts.push(rain);

    return { actors: acts, wheel, show, rain, traffic, trams, ferries: acts.filter((a) => a instanceof Vessel) };
  };

  E.Vessel = Vessel; E.Traffic = Traffic; E.Wheel = Wheel; E.Aircraft = Aircraft; E.LightShow = LightShow; E.Rain = Rain;
  HKV.E = E;
})(typeof window !== 'undefined' ? window : globalThis);
