/* =============================================================================
 * VOXEL VICTORIA HARBOUR · app.js
 * 应用主体：世界装配（分步加载）、五种镜头（上帝视角 / 第一人称 / 无人机 /
 * 电影巡游 / 天星小轮）、时间与天气系统、多通道渲染（阴影 → 平面反射 →
 * HDR 主通道 → Bloom → ACES 合成）、体素射线拾取、无头验证探针。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const THREE = global.THREE;
  const { W, M, clamp, lerp, smoothstep } = HKV;

  const App = {};
  const S = {                     // 全局状态
    time: 18.6,                   // 世界时间（小时）
    timeFlow: 0,                  // 时间流速（小时/秒）
    weather: 'clear',
    mode: 'god',
    quality: 'high',
    godRays: true,
    bloomScale: 1,
    shaftScale: 1,
    sens: 1.0,                    // 鼠标灵敏度（面板可调）
    showLabels: true,
    showGrid: true,
    reflections: true,
    shadows: true,
    bloom: 1,
    lightShow: true,
    selected: null,
    stats: {},
  };
  App.S = S;

  // ------------------------------------------------------------ 时间色彩曲线
  // 按太阳高度插值：白昼 / 黄金 / 日落 / 蓝调 / 深夜
  const STOPS = [
    { e: 0.95, sun: [1.00, 0.98, 0.95], i: 1.35, zen: [0.16, 0.38, 0.76], hor: [0.70, 0.82, 0.93], fog: [0.72, 0.81, 0.90], amb: 0.60, fogD: 0.0020, expo: 1.00, haze: 0.55 },
    { e: 0.45, sun: [1.00, 0.94, 0.84], i: 1.30, zen: [0.18, 0.40, 0.78], hor: [0.78, 0.85, 0.92], fog: [0.76, 0.82, 0.89], amb: 0.58, fogD: 0.0022, expo: 1.00, haze: 0.62 },
    { e: 0.18, sun: [1.00, 0.76, 0.48], i: 1.45, zen: [0.24, 0.42, 0.72], hor: [0.96, 0.74, 0.52], fog: [0.90, 0.74, 0.60], amb: 0.50, fogD: 0.0030, expo: 1.05, haze: 0.85 },
    { e: 0.05, sun: [1.00, 0.52, 0.30], i: 1.55, zen: [0.20, 0.30, 0.58], hor: [1.00, 0.52, 0.32], fog: [0.86, 0.56, 0.44], amb: 0.42, fogD: 0.0036, expo: 1.12, haze: 1.00 },
    { e: -0.04, sun: [0.62, 0.42, 0.46], i: 0.75, zen: [0.10, 0.15, 0.34], hor: [0.52, 0.35, 0.42], fog: [0.41, 0.35, 0.42], amb: 0.30, fogD: 0.0038, expo: 1.30, haze: 0.85 },
    { e: -0.12, sun: [0.26, 0.30, 0.52], i: 0.35, zen: [0.045, 0.07, 0.18], hor: [0.20, 0.24, 0.40], fog: [0.16, 0.20, 0.32], amb: 0.22, fogD: 0.0034, expo: 1.45, haze: 0.6 },
    { e: -0.35, sun: [0.14, 0.17, 0.32], i: 0.18, zen: [0.012, 0.022, 0.055], hor: [0.075, 0.095, 0.16], fog: [0.055, 0.075, 0.125], amb: 0.16, fogD: 0.0030, expo: 1.60, haze: 0.4 },
  ];

  function sampleStops(elev) {
    if (elev >= STOPS[0].e) return STOPS[0];
    for (let i = 0; i < STOPS.length - 1; i++) {
      const a = STOPS[i], b = STOPS[i + 1];
      if (elev <= a.e && elev >= b.e) {
        const t = (a.e - elev) / (a.e - b.e);
        const mix = (u, v) => u.map((x, k) => lerp(x, v[k], t));
        return {
          sun: mix(a.sun, b.sun), i: lerp(a.i, b.i, t), zen: mix(a.zen, b.zen), hor: mix(a.hor, b.hor),
          fog: mix(a.fog, b.fog), amb: lerp(a.amb, b.amb, t), fogD: lerp(a.fogD, b.fogD, t),
          expo: lerp(a.expo, b.expo, t), haze: lerp(a.haze, b.haze, t),
        };
      }
    }
    return STOPS[STOPS.length - 1];
  }

  const WEATHER = {
    clear: { name: '晴朗', cloud: 0.28, fogMul: 1.0, rain: 0, wave: 1.0, sat: 1.08, ambMul: 1.0, stormy: 0 },
    haze: { name: '薄雾', cloud: 0.4, fogMul: 2.3, rain: 0, wave: 0.7, sat: 0.94, ambMul: 1.1, stormy: 0.15 },
    cloudy: { name: '多云', cloud: 0.72, fogMul: 1.5, rain: 0, wave: 1.2, sat: 0.96, ambMul: 1.15, stormy: 0.3 },
    storm: { name: '台风雨', cloud: 0.95, fogMul: 3.0, rain: 1, wave: 2.1, sat: 0.82, ambMul: 0.85, stormy: 1 },
  };

  // ------------------------------------------------------------------ 主入口
  App.start = async function (opts) {
    const canvas = document.getElementById('c');
    const params = new URLSearchParams(location.search);
    const probe = params.has('probe');
    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, alpha: false, powerPreference: 'high-performance',
      preserveDrawingBuffer: probe, stencil: false,
    });
    const scale0 = parseFloat(params.get('scale') || '0');
    let renderScale = scale0 || Math.min(window.devicePixelRatio || 1, 1.6);
    renderer.setPixelRatio(renderScale);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.autoClear = true;
    renderer.setClearColor(0x0b0f16, 1);
    const gl = renderer.getContext();
    const isWebGL2 = renderer.capabilities.isWebGL2;
    S.stats.renderer = (function () {
      const d = gl.getExtension('WEBGL_debug_renderer_info');
      return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'unknown';
    })();

    const ui = HKV.UI;
    const log = (msg, pct) => { if (ui) ui.progress(msg, pct); };

    // ---------------------------------------------------------- 世界生成
    const t0 = performance.now();
    log('构建维港地理底图…', 0.04);
    await frame();
    const geo = HKV.Geo.build();
    const vol = new HKV.Volume(W.SX, W.SY, W.SZ);
    log('填海造地 · 太平山与九龙丘陵…', 0.10);
    await frame();
    HKV.Geo.paintTerrain(vol, geo);
    log('规划道路与街区…', 0.18);
    await frame();
    HKV.Landmarks.reserveAll(geo);
    HKV.City.build(vol, geo, S.stats);
    log('还原两岸地标建筑…', 0.30);
    await frame();
    HKV.Landmarks.build(vol, geo);
    log('加细：天台屋 · 竹棚 · 招牌 · 街道家具…', 0.34);
    await frame();
    if (HKV.Detail) HKV.Detail.build(vol, geo, S.stats);
    const landmarks = HKV.Landmarks.list();
    S.stats.genMs = Math.round(performance.now() - t0);
    S.stats.voxels = vol.filled;
    S.stats.landmarks = landmarks.length;

    log('体素网格化（贪心合并 + AO）…', 0.38);
    await frame();
    const mesher = vol.createMesher({ bucketChunks: 4 });
    const meshBudget = probe ? 0 : 24;            // 探针模式一次性完成（虚拟时钟下不能分帧）
    while (!mesher.step(meshBudget)) {
      log('体素网格化（贪心合并 + AO）… ' + Math.round(mesher.progress() * 100) + '%', 0.38 + 0.34 * mesher.progress());
      await frame();
    }
    const parts = mesher.result();
    S.stats.quads = mesher.quads;
    S.stats.tris = mesher.tris;
    S.stats.meshes = parts.length;

    log('上传显存 · 构建材质…', 0.76);
    await frame();

    // ---------------------------------------------------------------- 场景
    const scene = new THREE.Scene();
    const paletteTex = HKV.G.paletteTexture();
    const vUniforms = HKV.G.voxelUniforms(paletteTex);
    const voxelMat = HKV.G.voxelMaterial(vUniforms, false);
    const voxelMatI = HKV.G.voxelMaterial(vUniforms, true);
    const depthMat = HKV.G.depthMaterial();

    const gStatic = new THREE.Group(); scene.add(gStatic);
    for (const p of parts) {
      const mesh = new THREE.Mesh(HKV.G.geometryFrom(p), voxelMat);
      mesh.matrixAutoUpdate = false;
      gStatic.add(mesh);
    }

    // 天空
    const skyMat = HKV.G.skyMaterial();
    const sky = new THREE.Mesh(new THREE.SphereGeometry(2600, 32, 20), skyMat);
    sky.frustumCulled = false; sky.renderOrder = -1000;
    scene.add(sky);

    // 海面 + 岸线距离场
    const shoreTex = (function () {
      const N = geo.SX * geo.SZ, data = new Uint8Array(N * 4);
      for (let i = 0; i < N; i++) { const d = geo.shoreDist[i]; data[i * 4] = d; data[i * 4 + 3] = 255; }
      const t = new THREE.DataTexture(data, geo.SX, geo.SZ, THREE.RGBAFormat);
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.minFilter = t.magFilter = THREE.LinearFilter;
      t.needsUpdate = true;
      return t;
    })();
    const size = () => new THREE.Vector2(Math.max(1, Math.floor(window.innerWidth * renderScale)), Math.max(1, Math.floor(window.innerHeight * renderScale)));
    const sz = size();
    const reflRT = new THREE.WebGLRenderTarget(Math.floor(sz.x / 2), Math.floor(sz.y / 2), { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true });
    const waterMat = HKV.G.waterMaterial(shoreTex, reflRT.texture);
    const waterGeo = HKV.G.buildWaterGeometry(4, -160, 150, W.SX + 160, 540);
    // water 是一个组：维港本体用 4 voxel 连续网格（并向岸内/世界外多探出一截，
    // 浪的振幅在那一段渐隐为 0），外围用 128 voxel 的平静水面铺到地平线——
    // 既不会在接缝处裂开，也不会让镜头扫过世界边界时露出海床黑边。
    const water = new THREE.Group();
    const waterMain = new THREE.Mesh(waterGeo, waterMat);
    waterMain.frustumCulled = false;
    water.add(waterMain);
    const FAR = 4000;
    for (const [ax, az, bx, bz] of [
      [-FAR, -FAR, -160, W.SZ + FAR],                    // 西
      [W.SX + 160, -FAR, W.SX + FAR, W.SZ + FAR],        // 东
      [-160, -FAR, W.SX + 160, 150],                     // 南（港岛以南，被陆地遮住）
      [-160, 540, W.SX + 160, W.SZ + FAR],               // 北（九龙以北，被陆地遮住）
    ]) {
      const m = new THREE.Mesh(HKV.G.buildWaterGeometry(128, ax, az, bx, bz), waterMat);
      m.frustumCulled = false;
      water.add(m);
    }
    scene.add(water);
    // 深海底色（避免视线穿过水面看到虚空）
    const bed = new THREE.Mesh(new THREE.PlaneGeometry(W.SX + FAR * 2, W.SZ + FAR * 2),
      new THREE.MeshBasicMaterial({ color: 0x05090c }));
    bed.rotation.x = -Math.PI / 2; bed.position.set(W.SX / 2, W.SEA - 6, W.SZ / 2);
    scene.add(bed);

    // 实体
    HKV.E.buildModels();
    const beamMat = HKV.G.beamMaterial();
    const rainMat = HKV.G.rainMaterial();
    const ents = HKV.E.build(scene, { voxel: voxelMat, voxelInstanced: voxelMatI, beam: beamMat, rain: rainMat }, geo);

    // 分组（用于分通道渲染）
    const fxObjects = [ents.rain.mesh, ents.show.g];
    scene.traverse((o) => { if (o.isMesh && o.material && o.material.isMeshBasicMaterial && o.material.transparent) fxObjects.push(o); });

    // ------------------------------------------------------------ 阴影 / 后处理
    const shadowSize = 2048;
    const shadowRT = new THREE.WebGLRenderTarget(shadowSize, shadowSize, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: true });
    const shadowCam = new THREE.OrthographicCamera(-400, 400, 400, -400, 1, 2000);
    vUniforms.uShadowMap.value = shadowRT.texture;
    vUniforms.uShadowTexel.value = 1 / shadowSize;
    // 海面共用同一张阴影图（船与高楼会在水上压出暗带，镜面高光也随之消失）
    waterMat.uniforms.uShadowMap.value = shadowRT.texture;
    waterMat.uniforms.uShadowTexel.value = 1 / shadowSize;

    let hdrType = THREE.UnsignedByteType;
    if (isWebGL2 && (gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'))) hdrType = THREE.HalfFloatType;
    const mkRT = (w, h, type) => new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, type: type || THREE.UnsignedByteType, depthBuffer: true,
    });
    let hdrRT = mkRT(sz.x, sz.y, hdrType);
    // Bloom：5 级降采样 + 渐进上采样（每级各一对横竖高斯），最终合成成一张柔光图
    const BL = 5;
    let bloomA = [], bloomB = [], shaftRT = null;
    function allocBloom() {
      for (const r of bloomA) r.dispose();
      for (const r of bloomB) r.dispose();
      if (shaftRT) shaftRT.dispose();
      bloomA = []; bloomB = [];
      for (let i = 1; i <= BL; i++) {
        const d = Math.pow(2, i);
        bloomA.push(mkRT(Math.floor(sz.x / d), Math.floor(sz.y / d), hdrType));
        bloomB.push(mkRT(Math.floor(sz.x / d), Math.floor(sz.y / d), hdrType));
      }
      shaftRT = mkRT(Math.floor(sz.x / 2), Math.floor(sz.y / 2), hdrType);
    }
    allocBloom();
    const post = HKV.G.makePost(renderer);

    // ---------------------------------------------------------------- 相机
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.4, 5200);
    const cam = {
      target: new THREE.Vector3(W.SX * 0.42, W.SEA + 26, 348),
      dist: 620, yaw: -0.35, pitch: 0.52, fov: 55,
      pos: new THREE.Vector3(), vel: new THREE.Vector3(),
      fpYaw: Math.PI, fpPitch: -0.05, onGround: false, fly: false, crouch: false,
      bob: 0, tourT: 0, ferryIdx: 0,
    };
    App.cam = cam; App.camera = camera;

    // 巡游路径：从九龙上空掠过海面进入中环，再拉升到太平山
    const tourCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(120, 120, 620), new THREE.Vector3(240, 78, 470), new THREE.Vector3(360, 40, 380),
      new THREE.Vector3(520, 22, 330), new THREE.Vector3(660, 30, 300), new THREE.Vector3(760, 60, 250),
      new THREE.Vector3(620, 100, 180), new THREE.Vector3(420, 130, 150), new THREE.Vector3(260, 150, 120),
      new THREE.Vector3(180, 170, 90), new THREE.Vector3(150, 150, 200), new THREE.Vector3(160, 120, 380),
    ], true, 'catmullrom', 0.4);
    const tourLook = new THREE.CatmullRomCurve3([
      new THREE.Vector3(300, 40, 400), new THREE.Vector3(360, 40, 300), new THREE.Vector3(420, 50, 240),
      new THREE.Vector3(500, 40, 230), new THREE.Vector3(560, 40, 240), new THREE.Vector3(500, 40, 300),
      new THREE.Vector3(400, 60, 320), new THREE.Vector3(300, 60, 340), new THREE.Vector3(240, 60, 400),
      new THREE.Vector3(230, 50, 430), new THREE.Vector3(300, 40, 420), new THREE.Vector3(360, 40, 380),
    ], true, 'catmullrom', 0.4);

    // ------------------------------------------------------------- 输入控制
    const keys = Object.create(null);
    let dragging = 0, lastX = 0, lastY = 0, pointerLocked = false;
    let lockGraceUntil = 0;                   // 指针锁定瞬间的"巨跳"要吃掉
    const mouse = new THREE.Vector2(-10, -10);

    // 指针锁定：优先请求 unadjustedMovement（绕过系统鼠标加速，瞄准更线性、不会忽然甩飞）
    function lockPointer() {
      if (!canvas.requestPointerLock) return;
      lockGraceUntil = performance.now() + 120;
      try {
        const p = canvas.requestPointerLock({ unadjustedMovement: true });
        if (p && p.catch) p.catch(() => { try { canvas.requestPointerLock(); } catch (e) { } });
      } catch (e) {
        try { canvas.requestPointerLock(); } catch (e2) { }
      }
    }
    App.lockPointer = lockPointer;

    addEventListener('keydown', (e) => {
      // 在搜索框 / 下拉里打字时不吃快捷键
      const tg = e.target && e.target.tagName;
      if (tg === 'INPUT' || tg === 'SELECT' || tg === 'TEXTAREA') return;
      keys[e.code] = true;
      if (e.code === 'Tab') { e.preventDefault(); App.cycleMode(); }
      if (e.code === 'KeyL') { S.showLabels = !S.showLabels; ui && ui.sync(); }
      if (e.code === 'KeyG') { S.showGrid = !S.showGrid; ui && ui.sync(); }
      if (e.code === 'KeyH') document.body.classList.toggle('hide-ui');
      if (e.code === 'KeyP') App.screenshot();
      if (e.code === 'KeyF' && (S.mode === 'fp')) { cam.fly = !cam.fly; cam.vel.set(0, 0, 0); _hv.set(0, 0, 0); }
      if (e.code === 'Escape' && document.exitPointerLock) document.exitPointerLock();
      if (S.mode === 'tour' && (e.code === 'Space')) App.setMode('god');
      if (e.code.length === 6 && e.code.slice(0, 5) === 'Digit') {
        const n = parseInt(e.code.slice(5), 10);
        if (n >= 1 && n <= 9 && App.viewpoints && App.viewpoints[n - 1]) {
          e.preventDefault();
          App.gotoViewpoint(App.viewpoints[n - 1][0]);
        }
      }
    });
    addEventListener('keyup', (e) => { keys[e.code] = false; });
    // 切走窗口 / 松开指针锁时清空按键，避免"卡住一直往前走"
    const clearKeys = () => { for (const k in keys) keys[k] = false; };
    addEventListener('blur', clearKeys);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mousedown', (e) => {
      dragging = e.button === 0 ? 1 : 2; lastX = e.clientX; lastY = e.clientY;
      if ((S.mode === 'fp' || S.mode === 'drone') && !pointerLocked) lockPointer();
    });
    addEventListener('mouseup', () => { dragging = 0; });
    addEventListener('mousemove', (e) => {
      mouse.set(e.clientX, e.clientY);
      if (pointerLocked) {
        // ① 锁定瞬间浏览器会把光标从原位置瞬移到画面中心，并把这段距离当成一次
        //    movement 事件发出来（几百甚至上千像素）——那就是"视角突然飞走"的元凶，
        //    锁定后的 120ms 内一律丢弃。
        if (performance.now() < lockGraceUntil) return;
        let mx = e.movementX, my = e.movementY;
        if (mx === undefined) mx = 0;
        if (my === undefined) my = 0;
        // ② 单事件位移上限：正常挥动一帧不会超过 ~150px，超过的一律视为指针 warp / 丢帧突刺
        const MAX = 150;
        if (mx > MAX) mx = MAX; else if (mx < -MAX) mx = -MAX;
        if (my > MAX) my = MAX; else if (my < -MAX) my = -MAX;
        const k = 0.0022 * S.sens;
        cam.fpYaw -= mx * k;
        cam.fpPitch = clamp(cam.fpPitch - my * k, -1.45, 1.45);
        if (cam.fpYaw > Math.PI * 4 || cam.fpYaw < -Math.PI * 4) cam.fpYaw %= Math.PI * 2;  // 防止长时间旋转后精度流失
        return;
      }
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      if (S.mode === 'god') {
        if (dragging === 1) { cam.yaw -= dx * 0.005; cam.pitch = clamp(cam.pitch + dy * 0.004, 0.04, 1.45); }
        else {
          const s = cam.dist * 0.0016;
          const fx = Math.cos(cam.yaw), fz = Math.sin(cam.yaw);
          cam.target.x -= (dx * fz + dy * fx) * s;
          cam.target.z -= (-dx * fx + dy * fz) * s;
        }
      }
    });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (S.mode === 'god') cam.dist = clamp(cam.dist * (1 + Math.sign(e.deltaY) * 0.09), 18, 2400);
      else cam.fov = clamp(cam.fov + Math.sign(e.deltaY) * 2, 25, 92);
    }, { passive: false });
    document.addEventListener('pointerlockchange', () => {
      pointerLocked = document.pointerLockElement === canvas;
      if (!pointerLocked) clearKeys();
    });
    canvas.addEventListener('click', (e) => { if (S.mode === 'god') App.pick(e.clientX, e.clientY); });
    addEventListener('resize', onResize);

    function onResize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const n = size(); sz.copy(n);
      hdrRT.setSize(n.x, n.y);
      reflRT.setSize(Math.floor(n.x / 2), Math.floor(n.y / 2));
      renderer.setRenderTarget(reflRT); renderer.clear(); renderer.setRenderTarget(null);
      allocBloom();
    }

    // ------------------------------------------------------------ 模式切换
    const MODES = ['god', 'fp', 'drone', 'tour', 'ferry'];
    App.setMode = function (m) {
      S.mode = m;
      if (m === 'fp' || m === 'drone') {
        if (m === 'fp') {
          // 落到街道上（若当前位置不合适，用最近的海滨长廊）
          const p = cam.pos.clone();
          App.placeOnGround(p.x, p.z);
        }
        lockPointer();
      } else if (document.exitPointerLock) document.exitPointerLock();
      if (m === 'god') { cam.fov = 55; }
      if (m === 'tour') { cam.tourT = 0; cam.fov = 48; }
      ui && ui.sync();
    };
    App.cycleMode = () => App.setMode(MODES[(MODES.indexOf(S.mode) + 1) % MODES.length]);

    App.placeOnGround = function (x, z) {
      x = clamp(x, 2, W.SX - 3); z = clamp(z, 2, W.SZ - 3);
      let top = vol.columnTop(Math.floor(x), Math.floor(z), W.SY - 1);
      if (top < 0) top = W.SEA;
      cam.pos.set(x, top + 1.5, z);
      cam.vel.set(0, 0, 0);
      if (App.resetMomentum) App.resetMomentum();
      cam.onGround = false;
    };

    App.teleport = function (lm) {
      S.selected = lm;
      const anchorY = lm.top || (W.GROUND + 20);
      if (S.mode === 'god') {
        cam.target.set(lm.x, Math.min(anchorY * 0.6 + 10, 120), lm.z);
        cam.dist = clamp(anchorY * 2.2 + 90, 80, 900);
      } else if (S.mode === 'fp') {
        // 落在地标外侧的街道上，面朝建筑
        const dir = lm.z > 350 ? -1 : 1;
        App.placeOnGround(lm.x, lm.z + dir * (Math.max(lm.rect[3], 10) * 0.6 + 6));
        cam.fpYaw = dir > 0 ? Math.PI : 0;
        cam.fpPitch = 0.22;
      } else {
        cam.pos.set(lm.x, anchorY + 30, lm.z + 90);
        cam.fpYaw = Math.PI; cam.fpPitch = -0.2;
      }
      App.highlight(lm);
      ui && ui.showInfo(lm);
    };

    App.highlight = function (lm) {
      if (!lm) { vUniforms.uSelOn.value = 0; return; }
      const [x0, z0, w, d] = lm.rect;
      vUniforms.uSelOn.value = 1;
      vUniforms.uSelMin.value.set(x0 - 0.5, W.SEA - 4, z0 - 0.5);
      vUniforms.uSelMax.value.set(x0 + w + 0.5, (lm.top || 60) + 1.5, z0 + d + 0.5);
    };

    App.pick = function (px, py) {
      const ndc = new THREE.Vector2((px / window.innerWidth) * 2 - 1, -(py / window.innerHeight) * 2 + 1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      const o = ray.ray.origin, d = ray.ray.direction;
      const hit = vol.raycast(o.x, o.y, o.z, d.x, d.y, d.z, 2600);
      if (!hit) { S.selected = null; App.highlight(null); ui && ui.showInfo(null); return; }
      let best = null, bestScore = 1e9;
      for (const lm of landmarks) {
        if (lm.noLabel) continue;
        const [x0, z0, w, d2] = lm.rect;
        if (hit.x >= x0 - 1 && hit.x <= x0 + w + 1 && hit.z >= z0 - 1 && hit.z <= z0 + d2 + 1) {
          const sc = Math.abs(hit.y - (lm.top || 30));
          if (sc < bestScore) { bestScore = sc; best = lm; }
        }
      }
      S.selected = best;
      App.highlight(best);
      ui && ui.showInfo(best, hit);
      return hit;
    };

    App.screenshot = function () {
      renderFrame(0);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'victoria-harbour-voxel-' + Date.now() + '.png';
      a.click();
    };

    App.setWeather = (w) => { S.weather = w; ui && ui.sync(); };
    App.setTime = (t) => { S.time = ((t % 24) + 24) % 24; };

    // ------------------------------------------------------------ 画质档位
    // 一档同时决定：渲染分辨率倍率 / 阴影图尺寸 / 海面反射 / 辉光与体积光强度 /
    // 锐化与 FXAA。极致档在 4K 屏上会很吃显卡，中低档给集显与笔电用。
    const QUALITY = {
      ultra: { scale: Math.min(window.devicePixelRatio || 1, 2.0), shadow: 3072, refl: true, bloom: 1.0, shafts: 1.0, sharpen: 0.42, fxaa: 1 },
      high: { scale: Math.min(window.devicePixelRatio || 1, 1.6), shadow: 2048, refl: true, bloom: 1.0, shafts: 1.0, sharpen: 0.35, fxaa: 1 },
      medium: { scale: 1.0, shadow: 1536, refl: true, bloom: 0.85, shafts: 0.6, sharpen: 0.28, fxaa: 1 },
      low: { scale: 0.8, shadow: 1024, refl: false, bloom: 0.55, shafts: 0, sharpen: 0.18, fxaa: 0 },
    };
    App.qualities = Object.keys(QUALITY);
    App.setQuality = function (q) {
      const p = QUALITY[q] || QUALITY.high;
      S.quality = q;
      S.reflections = p.refl;
      S.bloomScale = p.bloom;
      S.shaftScale = p.shafts;
      post.composite.uniforms.uSharpen.value = p.sharpen;
      post.composite.uniforms.uFxaa.value = p.fxaa;
      if (shadowRT.width !== p.shadow) {
        shadowRT.setSize(p.shadow, p.shadow);
        vUniforms.uShadowTexel.value = 1 / p.shadow;
        waterMat.uniforms.uShadowTexel.value = 1 / p.shadow;
      }
      if (!scale0) { renderScale = p.scale; renderer.setPixelRatio(renderScale); }
      onResize();
      ui && ui.sync();
    };

    // ------------------------------------------------------------ 经典机位
    // 数字键 1-9 / 面板一键直达；上帝视角给轨道参数，第一人称给落脚点与朝向。
    const VIEWPOINTS = [
      ['harbour', '维港全景', function () {
        App.setMode('god'); cam.target.set(520, W.SEA + 34, 268); cam.dist = 470; cam.yaw = 1.72; cam.pitch = 0.30;
      }],
      ['overview', '全城鸟瞰', function () {
        App.setMode('god'); cam.target.set(560, W.SEA + 20, 340); cam.dist = 1250; cam.yaw = 1.55; cam.pitch = 0.62;
      }],
      ['central', '中环天际线', function () {
        App.setMode('god'); cam.target.set(330, W.SEA + 30, 236); cam.dist = 210; cam.yaw = 1.35; cam.pitch = 0.18;
      }],
      ['peak', '太平山俯瞰', function () {
        App.setMode('god'); cam.target.set(280, W.SEA + 12, 300); cam.dist = 250; cam.yaw = -1.89; cam.pitch = 0.45;
      }],
      ['kowloon', '九龙半岛', function () {
        App.setMode('god'); cam.target.set(300, W.SEA + 40, 452); cam.dist = 320; cam.yaw = -1.45; cam.pitch = 0.22;
      }],
      ['promenade', '尖沙咀海滨', function () {
        App.setMode('fp'); App.placeOnGround(650, 427); cam.fpYaw = Math.PI; cam.fpPitch = 0.14;
      }],
      ['nathan', '弥敦道街头', function () {
        App.setMode('fp'); App.placeOnGround(606, 520); cam.fpYaw = 0; cam.fpPitch = 0.16;
      }],
      ['shelter', '铜锣湾避风塘', function () {
        App.setMode('god'); cam.target.set(700, W.SEA + 6, 226); cam.dist = 130; cam.yaw = 1.2; cam.pitch = 0.14;
      }],
      ['corridor', '东区走廊', function () {
        App.setMode('god'); cam.target.set(950, W.SEA + 10, 224); cam.dist = 200; cam.yaw = 1.95; cam.pitch = 0.16;
      }],
    ];
    App.viewpoints = VIEWPOINTS.map((v) => [v[0], v[1]]);
    App.gotoViewpoint = function (key) {
      const v = VIEWPOINTS.find((a) => a[0] === key);
      if (!v) return;
      v[2]();
      S.selected = null; App.highlight(null);
      ui && ui.showInfo(null);
      ui && ui.sync();
    };
    App.geo = geo; App.vol = vol; App.landmarks = landmarks; App.uniforms = vUniforms;
    App.ents = ents; App.scene = scene;
    App.waterMat = waterMat; App.skyMat = skyMat;

    // ------------------------------------------------------- 第一人称物理
    const PL = { rad: 0.17, h: 0.46, eye: 0.40 };     // 半径 0.68m / 身高 1.84m / 眼高 1.6m
    // 速度按真实尺度标定（1 voxel = 4 m）：
    //   步行 2.2 m/s · 疾跑 6.4 m/s · 飞行 16 m/s（加速 56）· 无人机 12 m/s（加速 48）
    const SPD = { walk: 0.55, run: 1.6, fly: 4.0, flyFast: 14.0, drone: 3.0, droneFast: 12.0 };
    const JUMP = 1.5, GRAV = 3.9;                     // 跳跃约 1.1 m 高，重力 15.6 m/s²
    function solidAt(x, y, z) { return vol.get(Math.floor(x), Math.floor(y), Math.floor(z)) !== 0; }
    function boxHit(p) {
      const r = PL.rad;
      return vol.boxSolid(p.x - r, p.y, p.z - r, p.x + r, p.y + PL.h, p.z + r);
    }

    // 视线基向量。fwd 与 camera.lookAt 用的方向一致；right 必须等于"相机的屏幕右方"，
    // 即 THREE 的 lookAt 基 _x = cross(up, eye-target) = (-cos yaw, 0, sin yaw)。
    // （旧代码用了它的反向，导致 A / D 左右颠倒。）
    const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _wish = new THREE.Vector3();
    const _hv = new THREE.Vector3();
    function fpBasis() {
      const sy = Math.sin(cam.fpYaw), cy = Math.cos(cam.fpYaw);
      _fwd.set(sy, 0, cy);
      _right.set(-cy, 0, sy);
    }
    App.fpBasis = fpBasis;
    App.resetMomentum = function () { _hv.set(0, 0, 0); };

    function movePlayer(dt) {
      const sprint = !!(keys.ShiftLeft || keys.ShiftRight);
      fpBasis();
      const fw = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
      const sd = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
      const up = (keys.Space ? 1 : 0) - (keys.KeyC || keys.ControlLeft ? 1 : 0);
      const flying = cam.fly || S.mode === 'drone';

      if (flying) {
        // 飞行 / 无人机：W S 沿视线（含俯仰）推进，A D 水平横移，空格 / C 垂直升降，带惯性
        const spd = S.mode === 'drone' ? (sprint ? SPD.droneFast : SPD.drone)
          : (sprint ? SPD.flyFast : SPD.fly);
        const cp = Math.cos(cam.fpPitch), sp = Math.sin(cam.fpPitch);
        _wish.set(
          _fwd.x * cp * fw + _right.x * sd,
          sp * fw + up,
          _fwd.z * cp * fw + _right.z * sd);
        if (_wish.lengthSq() > 1e-6) _wish.normalize().multiplyScalar(spd); else _wish.set(0, 0, 0);
        cam.vel.lerp(_wish, Math.min(1, dt * 7));                 // 惯性：起步与收油都有过渡
        const prevX = cam.pos.x, prevY = cam.pos.y, prevZ = cam.pos.z;
        cam.pos.addScaledVector(cam.vel, dt);
        cam.pos.x = clamp(cam.pos.x, 2, W.SX - 3);
        cam.pos.z = clamp(cam.pos.z, 2, W.SZ - 3);
        cam.pos.y = clamp(cam.pos.y, W.SEA + 0.6, W.SY - 3);
        if (boxHit(cam.pos)) {                                    // 飞行也不穿墙：撞上就停在墙外
          cam.pos.set(prevX, prevY, prevZ);
          cam.vel.multiplyScalar(0.1);
        }
        cam.onGround = false;
        cam.bob = 0;
        return;
      }

      // 走路：水平速度带加减速 → 分轴推进 → 1 体素台阶辅助
      _wish.set(_fwd.x * fw + _right.x * sd, 0, _fwd.z * fw + _right.z * sd);
      if (_wish.lengthSq() > 1e-6) _wish.normalize();
      const target = sprint ? SPD.run : SPD.walk;
      const accel = cam.onGround ? 14 : 4;
      const k = Math.min(1, dt * accel);
      _hv.x = lerp(_hv.x, _wish.x * target, k);
      _hv.z = lerp(_hv.z, _wish.z * target, k);

      const tryMove = (axis, amount) => {
        if (!amount) return;
        const before = cam.pos[axis];
        cam.pos[axis] += amount;
        if (boxHit(cam.pos)) {
          const savedY = cam.pos.y;
          cam.pos.y += 1.02;                                      // 台阶辅助（1 体素 = 4m 台阶/路缘）
          if (!boxHit(cam.pos)) { cam.onGround = true; return; }
          cam.pos.y = savedY;
          cam.pos[axis] = before;
          _hv[axis] = 0;                                          // 撞墙就卸掉这个轴的速度
        }
      };
      tryMove('x', _hv.x * dt); tryMove('z', _hv.z * dt);

      // 跳跃 + 重力
      if (keys.Space && cam.onGround) { cam.vel.y = JUMP; cam.onGround = false; }
      cam.vel.y -= GRAV * dt;
      cam.pos.y += cam.vel.y * dt;
      if (boxHit(cam.pos)) {
        if (cam.vel.y <= 0) {
          // 落地：吸附到方块顶面
          cam.pos.y = Math.ceil(cam.pos.y);
          let guard = 0;
          while (boxHit(cam.pos) && guard++ < 8) cam.pos.y += 1;
          cam.onGround = true;
        } else { cam.pos.y = Math.floor(cam.pos.y) - 0.02; }
        cam.vel.y = 0;
      } else cam.onGround = false;
      if (cam.pos.y < W.SEA + 0.2) { cam.pos.y = W.SEA + 0.2; cam.vel.y = 0; cam.onGround = true; }
      cam.pos.x = clamp(cam.pos.x, 2, W.SX - 3); cam.pos.z = clamp(cam.pos.z, 2, W.SZ - 3);
      // 走动时的头部起伏（幅度随实际速度而不是按键状态）
      const spdNow = Math.hypot(_hv.x, _hv.z);
      cam.bob = lerp(cam.bob, cam.onGround ? Math.min(1, spdNow / SPD.walk) : 0, dt * 6);
      cam.bobPhase = (cam.bobPhase || 0) + dt * (6.5 + spdNow * 3.2);
    }

    // --------------------------------------------------------------- 帧循环
    const sunDir = new THREE.Vector3();
    const moonDir = new THREE.Vector3();
    let lastT = performance.now(), fpsAcc = 0, fpsN = 0, frames = 0;
    let lightning = 0, lightningTimer = 4;

    function updateSun() {
      const t = S.time;
      // 香港夏季日照：日出 ≈ 05:55，日落 ≈ 19:05，正午太阳接近头顶
      const RISE = 5.9, SET = 19.1;
      const dayFrac = (t - RISE) / (SET - RISE);
      const arc = Math.sin(clamp(dayFrac, -0.25, 1.25) * Math.PI);
      const el = arc > 0 ? arc * 1.16 : arc * 0.55 - 0.03;
      const az = THREE.MathUtils.degToRad(lerp(92, 268, clamp(dayFrac, -0.3, 1.3)));
      const ce = Math.cos(el);
      sunDir.set(ce * Math.sin(az), Math.sin(el), ce * Math.cos(az)).normalize();
      moonDir.copy(sunDir).multiplyScalar(-1);
      return sunDir.y;
    }

    function applyLook() {
      const elev = updateSun();
      const st = sampleStops(elev);
      const wx = WEATHER[S.weather] || WEATHER.clear;
      const night = 1 - smoothstep(-0.14, 0.08, elev);
      const c = (a) => new THREE.Color(a[0], a[1], a[2]);
      const sunC = c(st.sun), zen = c(st.zen), hor = c(st.hor), fog = c(st.fog);
      if (wx.stormy > 0) {
        const g = 0.5;
        sunC.lerp(new THREE.Color(g, g, g * 1.05), wx.stormy * 0.55);
        zen.lerp(new THREE.Color(0.09, 0.10, 0.12), wx.stormy * 0.7);
        hor.lerp(new THREE.Color(0.28, 0.30, 0.33), wx.stormy * 0.6);
        fog.lerp(new THREE.Color(0.32, 0.34, 0.38), wx.stormy * 0.6);
      }
      // 闪电
      if (wx.stormy > 0.8) {
        lightningTimer -= 1 / 60;
        if (lightningTimer < 0) { lightning = 1; lightningTimer = 3 + Math.random() * 7; }
      }
      lightning *= 0.86;

      const u = vUniforms;
      u.uSunDir.value.copy(sunDir);
      u.uSunCol.value.copy(sunC).multiplyScalar(1 + lightning * 2.5);
      u.uSunI.value = st.i * (1 - wx.stormy * 0.35) + lightning * 1.5;
      u.uSkyCol.value.copy(zen);
      u.uHorizonCol.value.copy(hor);
      u.uGroundCol.value.setRGB(0.16 + 0.06 * (1 - night), 0.15, 0.14).multiplyScalar(0.6 + 0.6 * (1 - night));
      u.uFogCol.value.copy(fog);
      u.uAmbient.value = st.amb * wx.ambMul + lightning * 0.4;
      u.uFogDensity.value = st.fogD * wx.fogMul;
      u.uNight.value = night;
      u.uWinLit.value = night * (0.40 + 0.16 * Math.sin(S.time * 0.7));
      u.uNeonI.value = 0.25 + 1.05 * night;
      u.uGrid.value = S.showGrid ? 0.85 : 0.0;
      u.uWet.value = wx.rain;
      // uShadowOn 交给 renderFrame（夜间会整趟关断阴影 Pass）
      u.uCamPos.value.copy(camera.position);

      const sm = skyMat.uniforms;
      sm.uSunDir.value.copy(sunDir); sm.uMoonDir.value.copy(moonDir);
      sm.uZenith.value.copy(zen); sm.uHorizon.value.copy(hor);
      sm.uSunCol.value.copy(sunC).multiplyScalar(1 + lightning * 3);
      sm.uNight.value = night; sm.uCloud.value = wx.cloud; sm.uHaze.value = st.haze;
      sm.uStormy.value = wx.stormy;

      const wm = waterMat.uniforms;
      wm.uSunDir.value.copy(sunDir); wm.uSunCol.value.copy(sunC);
      wm.uSkyCol.value.copy(zen); wm.uHorizonCol.value.copy(hor);
      wm.uFogCol.value.copy(fog); wm.uFogDensity.value = st.fogD * wx.fogMul;
      wm.uNight.value = night; wm.uWave.value = wx.wave; wm.uRain.value = wx.rain;
      // uReflOn 由 renderFrame 按"这一帧是否真的渲染了反射"决定，这里不再覆盖
      wm.uCamPos.value.copy(camera.position);
      wm.uGrid.value = 0;
      // 同上：uShadowOn 由 renderFrame 决定
      wm.uNeonGlow.value.setRGB(0.95, 0.55, 0.38).lerp(new THREE.Color(0.4, 0.7, 1.0), 0.35);

      const cu = post.composite.uniforms;
      cu.uExposure.value = st.expo * (1 - wx.stormy * 0.12) + lightning * 0.5;
      cu.uBloom.value = (0.17 + 0.34 * night) * S.bloom * (S.bloomScale == null ? 1 : S.bloomScale);
      cu.uSaturation.value = wx.sat;
      cu.uContrast.value = 1.05 + night * 0.06;
      cu.uLift.value.setRGB(0.012 * night, 0.014 * night, 0.03 * night);
      cu.uVignette.value = 0.42;

      // ---- 体积光（上帝之光）：太阳的屏幕位置 + 视线夹角 + 空气浑浊度 ----
      if (S.godRays && S.quality !== 'low' && (S.shaftScale == null || S.shaftScale > 0)) {
        const sp = camera.position.clone().addScaledVector(sunDir, 3000).project(camera);
        const cd = new THREE.Vector3();
        camera.getWorldDirection(cd);
        const align = Math.max(0, cd.dot(sunDir));
        const onScreen = (sp.z < 1 && Math.abs(sp.x) < 1.7 && Math.abs(sp.y) < 1.7) ? 1 : 0;
        const above = smoothstep(-0.03, 0.14, sunDir.y);
        const haze = 0.55 + 0.85 * st.haze * wx.fogMul * 0.5;
        const strength = onScreen * above * Math.pow(align, 2.2) * haze * (1 - night * 0.85);
        post.shafts.uniforms.uSunUv.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
        post.shafts.uniforms.uStrength.value = strength > 0.004 ? 1 : 0;
        cu.uShafts.value = strength * 0.30 * (S.shaftScale == null ? 1 : S.shaftScale);
        cu.uSunTint.value.copy(sunC).lerp(new THREE.Color(1, 1, 1), 0.2);
      } else {
        post.shafts.uniforms.uStrength.value = 0;
        cu.uShafts.value = 0;
      }
      return { night, elev, wx };
    }

    function updateCamera(dt) {
      if (S.mode === 'god') {
        // 键盘平移：W/S 沿视线前后，A/D 沿屏幕左右（旧代码把这两轴整体转了 90°）
        const pan = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
        const strafe = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
        if (pan || strafe) {
          const s = cam.dist * 0.9 * dt * ((keys.ShiftLeft || keys.ShiftRight) ? 2.4 : 1);
          const fx = Math.cos(cam.yaw), fz = Math.sin(cam.yaw);
          // 相机在 target + (fx,·,fz)*dist 上，故"前方" = (-fx,-fz)，"屏幕右方" = (fz,-fx)
          cam.target.x += (-fx * pan + fz * strafe) * s;
          cam.target.z += (-fz * pan - fx * strafe) * s;
        }
        if (keys.KeyQ) cam.yaw -= dt * 0.5;
        if (keys.KeyE) cam.yaw += dt * 0.5;
        if (keys.Space) cam.target.y += dt * 40;
        if (keys.KeyC) cam.target.y -= dt * 40;
        cam.target.x = clamp(cam.target.x, -200, W.SX + 200);
        cam.target.z = clamp(cam.target.z, -200, W.SZ + 200);
        cam.target.y = clamp(cam.target.y, W.SEA, 260);
        const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
        camera.position.set(
          cam.target.x + Math.cos(cam.yaw) * cp * cam.dist,
          cam.target.y + sp * cam.dist,
          cam.target.z + Math.sin(cam.yaw) * cp * cam.dist);
        camera.lookAt(cam.target);
        camera.near = Math.max(0.5, cam.dist * 0.004);
      } else if (S.mode === 'tour') {
        cam.tourT = (cam.tourT + dt * 0.0085) % 1;
        const p = tourCurve.getPointAt(cam.tourT);
        const l = tourLook.getPointAt(cam.tourT);
        camera.position.copy(p);
        camera.lookAt(l);
        camera.near = 0.6;
        cam.fov = 46 + Math.sin(cam.tourT * Math.PI * 4) * 6;
      } else if (S.mode === 'ferry') {
        const ves = ents.ferries[0];
        if (ves) {
          const g = ves.g;
          camera.position.set(g.position.x + Math.sin(g.rotation.y) * 2.2, g.position.y + 2.6, g.position.z + Math.cos(g.rotation.y) * 2.2);
          const look = new THREE.Vector3(g.position.x + Math.sin(g.rotation.y) * 40, W.GROUND + 22, g.position.z + Math.cos(g.rotation.y) * 40);
          camera.lookAt(look);
          camera.near = 0.25;
        }
      } else {
        movePlayer(dt);
        // 步行时的双相头部起伏：竖向 + 轻微横摆
        const ph = cam.bobPhase || 0;
        const bobY = Math.sin(ph * 2) * 0.022 * cam.bob;
        const bobX = Math.cos(ph) * 0.016 * cam.bob;
        camera.position.set(
          cam.pos.x + _right.x * bobX, cam.pos.y + PL.eye + bobY, cam.pos.z + _right.z * bobX);
        const dir = new THREE.Vector3(
          Math.sin(cam.fpYaw) * Math.cos(cam.fpPitch), Math.sin(cam.fpPitch), Math.cos(cam.fpYaw) * Math.cos(cam.fpPitch));
        camera.lookAt(camera.position.clone().add(dir));
        camera.near = S.mode === 'drone' ? 0.4 : 0.12;
      }
      const sprint = (keys.ShiftLeft || keys.ShiftRight) && (S.mode === 'fp' || S.mode === 'drone');
      camera.fov = lerp(camera.fov, cam.fov + (sprint ? 6 : 0), Math.min(1, dt * 6));
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    }

    // 阴影稳定化用的临时量：提到闭包里，避免每帧 new（GC 抖动会被看成卡顿）
    const _sFocus = new THREE.Vector3(), _sFwd = new THREE.Vector3();
    const _sRight = new THREE.Vector3(), _sUp = new THREE.Vector3();
    const _sMat = new THREE.Matrix4();
    let shadowRadius = 0;

    function fitShadow() {
      // 把阴影相机套在"视野中心区域"上：上帝视角覆盖大范围，第一人称收紧
      let radius;
      if (S.mode === 'god') {
        _sFocus.copy(cam.target); radius = clamp(cam.dist * 0.62, 90, 760);
      } else {
        _sFwd.set(Math.sin(cam.fpYaw), 0, Math.cos(cam.fpYaw));
        _sFocus.copy(camera.position).addScaledVector(_sFwd, 60);
        radius = S.mode === 'drone' ? 260 : 150;
        if (S.mode === 'tour' || S.mode === 'ferry') { _sFocus.copy(camera.position); radius = 300; }
      }
      // ① 半径量化到 √2 阶梯：连续变化的 radius 会让 texel 的世界尺寸每帧都变，
      //    阴影必然抖动。量化后缩放时只在少数几档之间跳，其余时间完全稳定。
      radius = clamp(Math.pow(2, Math.ceil(Math.log2(radius) * 2) * 0.5), 90, 760);
      shadowRadius = radius;
      // ② 焦点按整数 texel 吸附（在光源自身的正交基上量化），
      //    这样相机做亚 texel 移动时阴影栅格原地不动，黑斑不再闪。
      const texel = (2 * radius) / Math.max(1, shadowRT.width);
      _sUp.set(0, 1, 0);
      _sRight.crossVectors(_sUp, sunDir);
      if (_sRight.lengthSq() < 1e-8) _sRight.set(1, 0, 0);
      _sRight.normalize();
      _sUp.crossVectors(sunDir, _sRight).normalize();
      const qx = Math.round(_sFocus.dot(_sRight) / texel) * texel;
      const qy = Math.round(_sFocus.dot(_sUp) / texel) * texel;
      const qz = _sFocus.dot(sunDir);
      _sFocus.set(0, 0, 0).addScaledVector(_sRight, qx).addScaledVector(_sUp, qy).addScaledVector(sunDir, qz);

      shadowCam.left = -radius; shadowCam.right = radius;
      shadowCam.top = radius; shadowCam.bottom = -radius;
      shadowCam.near = 1; shadowCam.far = radius * 4 + 900;
      const d = Math.max(320, radius * 2.2);
      shadowCam.position.copy(_sFocus).addScaledVector(sunDir, d);
      shadowCam.up.copy(_sUp);                       // 与量化基一致，避免 lookAt 自选 up 造成额外旋转抖动
      shadowCam.lookAt(_sFocus);
      shadowCam.updateProjectionMatrix();
      shadowCam.updateMatrixWorld();
      const m = _sMat.multiplyMatrices(shadowCam.projectionMatrix, shadowCam.matrixWorldInverse);
      vUniforms.uShadowMat.value.copy(m);
      vUniforms.uShadowBias.value = 0.0011 + shadowRadius * 0.0000082;
      waterMat.uniforms.uShadowMat.value.copy(m);
      waterMat.uniforms.uShadowBias.value = vUniforms.uShadowBias.value;
    }

    const reflCam = new THREE.PerspectiveCamera();
    reflCam.matrixAutoUpdate = false;
    const mirror = new THREE.Matrix4();

    const _mTrans = new THREE.Matrix4();
    function renderReflection() {
      mirror.makeScale(1, -1, 1);
      mirror.premultiply(_mTrans.makeTranslation(0, 2 * W.SEA, 0));
      reflCam.projectionMatrix.copy(camera.projectionMatrix);
      reflCam.projectionMatrixInverse.copy(camera.projectionMatrixInverse);
      reflCam.matrixWorld.multiplyMatrices(mirror, camera.matrixWorld);
      reflCam.matrixWorldInverse.copy(reflCam.matrixWorld).invert();
      water.visible = false; bed.visible = false;
      const rainVis = ents.rain.mesh.visible; ents.rain.mesh.visible = false;
      voxelMat.side = THREE.BackSide; voxelMatI.side = THREE.BackSide;
      renderer.setRenderTarget(reflRT);
      renderer.clear();
      renderer.render(scene, reflCam);
      voxelMat.side = THREE.FrontSide; voxelMatI.side = THREE.FrontSide;
      water.visible = true; bed.visible = true; ents.rain.mesh.visible = rainVis;
    }

    function renderShadow() {
      const prevWater = water.visible, prevSky = sky.visible, prevBed = bed.visible;
      water.visible = false; sky.visible = false; bed.visible = false;
      const prevFx = fxObjects.map((o) => o.visible);
      fxObjects.forEach((o) => { o.visible = false; });

      renderer.setRenderTarget(shadowRT);
      renderer.setClearColor(0xffffff, 1);
      renderer.clear();
      // 一次过：静态城市 + instanced 车流/电车 + 船只/摩天轮/飞行器都写进深度图
      scene.overrideMaterial = depthMat;
      renderer.render(scene, shadowCam);
      scene.overrideMaterial = null;

      renderer.setClearColor(0x0b0f16, 1);
      water.visible = prevWater; sky.visible = prevSky; bed.visible = prevBed;
      fxObjects.forEach((o, i) => { o.visible = prevFx[i]; });
    }

    function renderFrame(dt) {
      const look = applyLook();
      // 实体更新
      const ctx = {
        time: performance.now() / 1000, dt, camPos: camera.position,
        rain: (WEATHER[S.weather] || WEATHER.clear).rain,
        showOn: S.lightShow && look.night > 0.45,
      };
      for (const a of ents.actors) a.update(dt, ctx);
      waterMat.uniforms.uTime.value = ctx.time;
      skyMat.uniforms.uTime.value = ctx.time;
      vUniforms.uTime.value = ctx.time;
      post.composite.uniforms.uTime.value = ctx.time;

      // 太阳落到地平线以下时，ndl 恒为 0，阴影图不可见 —— 整趟 Pass 可以省掉
      const sunUp = sunDir.y > 0.015;
      const shadowsOn = S.shadows && sunUp;
      vUniforms.uShadowOn.value = shadowsOn ? 1 : 0;
      waterMat.uniforms.uShadowOn.value = shadowsOn ? 1 : 0;
      if (shadowsOn) { fitShadow(); renderShadow(); }
      const reflOn = S.reflections && S.quality !== 'low';
      if (reflOn) renderReflection();
      waterMat.uniforms.uReflOn.value = reflOn ? 1 : 0;   // 与实际是否渲染保持一致

      renderer.setRenderTarget(hdrRT);
      renderer.clear();
      renderer.render(scene, camera);
      S.stats.drawCalls = renderer.info.render.calls;
      S.stats.frameTris = renderer.info.render.triangles;

      // Bloom：bright → 5 级降采样（每级横竖高斯）→ 自小到大渐进上采样叠加
      const cu = post.composite.uniforms;
      if (cu.uBloom.value > 0.01) {
        post.bright.uniforms.tDiffuse.value = hdrRT.texture;
        // 白天把门槛抬高（免得太阳与天空烧成纯白），夜里压低让霓虹与亮窗充分进辉光
        post.bright.uniforms.uThreshold.value = 1.16 - 0.40 * look.night;
        post.render(post.bright, bloomA[0]);
        for (let i = 0; i < BL; i++) {
          if (i > 0) {                                   // 降采样：上一级 → 本级
            post.blur.uniforms.tDiffuse.value = bloomA[i - 1].texture;
            post.blur.uniforms.uDir.value.set(1, 0);
            post.blur.uniforms.uTexel.value.set(1 / bloomA[i - 1].width, 1 / bloomA[i - 1].height);
            post.render(post.blur, bloomA[i]);
          }
          post.blur.uniforms.tDiffuse.value = bloomA[i].texture;
          post.blur.uniforms.uDir.value.set(1, 0);
          post.blur.uniforms.uTexel.value.set(1 / bloomA[i].width, 1 / bloomA[i].height);
          post.render(post.blur, bloomB[i]);
          post.blur.uniforms.tDiffuse.value = bloomB[i].texture;
          post.blur.uniforms.uDir.value.set(0, 1);
          post.render(post.blur, bloomA[i]);
        }
        for (let i = BL - 1; i > 0; i--) {                // 上采样合成
          post.upsample.uniforms.tLow.value = bloomA[i].texture;
          post.upsample.uniforms.tHigh.value = bloomA[i - 1].texture;
          post.upsample.uniforms.uTexel.value.set(1 / bloomA[i].width, 1 / bloomA[i].height);
          post.upsample.uniforms.uGain.value = 0.55;
          post.render(post.upsample, bloomB[i - 1]);
          const t = bloomA[i - 1]; bloomA[i - 1] = bloomB[i - 1]; bloomB[i - 1] = t;
        }
        cu.tBloom.value = bloomA[0].texture;
      } else {
        cu.tBloom.value = bloomA[BL - 1].texture;
      }

      // 体积光：以太阳的屏幕位置为中心，对已经提亮的 bloom 层做径向行进
      if (cu.uShafts.value > 0.001) {
        post.shafts.uniforms.tDiffuse.value = bloomA[1].texture;
        post.render(post.shafts, shaftRT);
        cu.tShafts.value = shaftRT.texture;
      } else cu.tShafts.value = bloomA[BL - 1].texture;
      cu.tDiffuse.value = hdrRT.texture;
      cu.uTexel.value.set(1 / hdrRT.width, 1 / hdrRT.height);
      cu.uFxaa.value = S.quality === 'low' ? 0 : 1;
      post.render(post.composite, null);
      frames++;
    }

    function loop() {
      const now = performance.now();
      let dt = (now - lastT) / 1000;
      lastT = now;
      dt = Math.min(0.05, Math.max(0.0005, dt));
      fpsAcc += dt; fpsN++;
      if (fpsAcc > 0.5) { S.stats.fps = Math.round(fpsN / fpsAcc); fpsAcc = 0; fpsN = 0; }
      S.time = (S.time + S.timeFlow * dt + 24) % 24;
      updateCamera(dt);
      renderFrame(dt);
      if (HKV.UI) HKV.UI.frame(dt);
      requestAnimationFrame(loop);
    }

    // 探针模式下不让出主线程（否则 headless 会在世界建好前就抓走 DOM）
    function frame() { return probe ? Promise.resolve() : new Promise((r) => requestAnimationFrame(() => r())); }

    // 初始机位：站在尖沙咀海滨上空回望港岛天际线（最经典的维港机位）
    cam.target.set(520, W.SEA + 34, 268);
    cam.dist = 470; cam.yaw = 1.72; cam.pitch = 0.30;
    App.placeOnGround(640, 428);
    updateCamera(0.016);

    log('准备就绪', 1);
    if (HKV.UI) HKV.UI.ready(App);
    lastT = performance.now();

    // ------------------------------------------------------------ 无头探针
    if (probe) {
      const pt = parseFloat(params.get('t') || '');
      if (!isNaN(pt)) S.time = pt;
      if (params.get('weather')) S.weather = params.get('weather');
      if (params.get('grid') === '0') S.showGrid = false;
      if (params.get('shadows') === '0') S.shadows = false;
      if (params.get('refl') === '0') S.reflections = false;
      if (params.get('rays') === '0') S.godRays = false;
      if (params.get('q')) App.setQuality(params.get('q'));

      const VIEWS = {
        harbour: () => { S.mode = 'god'; cam.target.set(520, W.SEA + 34, 268); cam.dist = 470; cam.yaw = 1.72; cam.pitch = 0.30; },
        overview: () => { S.mode = 'god'; cam.target.set(560, W.SEA + 20, 340); cam.dist = 1250; cam.yaw = 1.55; cam.pitch = 0.62; },
        central: () => { S.mode = 'god'; cam.target.set(330, W.SEA + 30, 236); cam.dist = 210; cam.yaw = 1.35; cam.pitch = 0.18; },
        kowloon: () => { S.mode = 'god'; cam.target.set(280, W.SEA + 40, 452); cam.dist = 300; cam.yaw = -1.45; cam.pitch = 0.20; },
        peak: () => { S.mode = 'god'; cam.target.set(300, W.SEA + 60, 300); cam.dist = 320; cam.yaw = -2.0; cam.pitch = 0.24; },
        street: () => { S.mode = 'fp'; App.placeOnGround(606, 520); cam.fpYaw = 0.0; cam.fpPitch = 0.16; },
        promenade: () => { S.mode = 'fp'; App.placeOnGround(650, 427); cam.fpYaw = Math.PI; cam.fpPitch = 0.14; },
        ifc: () => { S.mode = 'fp'; App.placeOnGround(252, 250); cam.fpYaw = Math.PI * 1.02; cam.fpPitch = 0.62; },
        water: () => { S.mode = 'god'; cam.target.set(500, W.SEA + 2, 340); cam.dist = 90; cam.yaw = 1.6; cam.pitch = 0.08; },
        // 迎着落日向西看（专门用来验体积光 / 海面镜面光路）
        sunset: () => { S.mode = 'fp'; App.placeOnGround(650, 427); cam.fpYaw = -Math.PI / 2; cam.fpPitch = 0.06; },
      };
      // 探针视角 = 内置调试机位 + 面板上的经典机位（名字通用）
      const names = (params.get('views') || 'harbour').split(',')
        .filter((n) => VIEWS[n] || VIEWPOINTS.some((v) => v[0] === n));
      const out = [], shots = [];
      const shotW = parseInt(params.get('shot') || '0', 10) || 0;
      for (const n of names) {
        if (VIEWS[n]) VIEWS[n](); else App.gotoViewpoint(n);
        for (let i = 0; i < 4; i++) { updateCamera(0.016); renderFrame(0.016); }
        out.push(probeCapture(n));
        if (shotW > 0) shots.push([n, grabJPEG(shotW)]);
      }
      const pre = document.createElement('pre');
      pre.id = 'probe';
      pre.textContent = out.join('\n');
      document.body.appendChild(pre);
      for (const [n, b64] of shots) {
        const s = document.createElement('pre');
        s.className = 'shot'; s.dataset.n = n; s.style.display = 'none';
        s.textContent = b64;
        document.body.appendChild(s);
      }
      const logs = global.__LOG || [];
      if (logs.length) {
        const lg = document.createElement('pre');
        lg.id = 'probelog'; lg.style.display = 'none';
        lg.textContent = logs.join('\n---\n');
        document.body.appendChild(lg);
      }
      document.title = 'PROBE ok views=' + names.length + ' logs=' + logs.length;
      return;
    }

    loop();

    function grabJPEG(w) {
      const h = Math.round(w * canvas.height / canvas.width);
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const c2 = cv.getContext('2d');
      c2.drawImage(canvas, 0, 0, w, h);
      const url = cv.toDataURL('image/jpeg', 0.84);
      return url.slice(url.indexOf(',') + 1);
    }

    function probeCapture(name) {
      const w = 100, h = 42;
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const ctx2 = cv.getContext('2d');
      ctx2.drawImage(canvas, 0, 0, w, h);
      const img = ctx2.getImageData(0, 0, w, h).data;
      const chars = ' .:-=+*#%@';
      let art = '';
      let sum = 0, rs = 0, gs = 0, bs = 0, bright = 0, dark = 0, white = 0, clip = 0;
      for (let y = 0; y < h; y++) {
        let row = '';
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const l = (img[i] * 0.299 + img[i + 1] * 0.587 + img[i + 2] * 0.114) / 255;
          sum += l; rs += img[i]; gs += img[i + 1]; bs += img[i + 2];
          if (l > 0.72) bright++;
          if (l < 0.06) dark++;
          // 过曝判定：三通道同时顶到底（纯白，细节已经烧掉）
          if (img[i] > 250 && img[i + 1] > 250 && img[i + 2] > 250) white++;
          else if (img[i] > 243 && img[i + 1] > 243 && img[i + 2] > 243) clip++;
          row += chars[clamp(Math.floor(l * chars.length), 0, chars.length - 1)];
        }
        art += row + '\n';
      }
      const n = w * h;
      const out = {
        view: name, mode: S.mode, time: +S.time.toFixed(2), weather: S.weather,
        genMs: S.stats.genMs, voxels: S.stats.voxels, quads: S.stats.quads, meshTris: S.stats.tris,
        meshes: S.stats.meshes, buildings: S.stats.buildings, landmarks: S.stats.landmarks,
        drawCalls: S.stats.drawCalls, frameTris: S.stats.frameTris,
        hdr: hdrType === THREE.HalfFloatType ? 'half-float' : 'uint8',
        sunY: +sunDir.y.toFixed(3), night: +vUniforms.uNight.value.toFixed(2),
        avgLuma: +(sum / n).toFixed(4), avgRGB: [Math.round(rs / n), Math.round(gs / n), Math.round(bs / n)],
        brightPx: +(bright / n).toFixed(3), darkPx: +(dark / n).toFixed(3),
        whitePx: +(white / n).toFixed(4), nearWhitePx: +((white + clip) / n).toFixed(4),
        cam: camera.position.toArray().map((v) => +v.toFixed(1)),
        renderer: S.stats.renderer,
      };
      return 'PROBE ' + JSON.stringify(out) + '\n' + art;
    }
  };

  // 全局错误捕获（探针可读）
  addEventListener('error', (e) => {
    const pre = document.createElement('pre');
    pre.id = 'probe';
    pre.textContent = 'PROBE ERROR ' + (e.message || '') + ' @' + (e.filename || '') + ':' + (e.lineno || '');
    document.body.appendChild(pre);
    document.title = 'PROBE ERROR';
    const l = document.getElementById('loading');
    if (l) l.querySelector('.lmsg').textContent = '错误：' + e.message;
  });

  HKV.App = App;
})(typeof window !== 'undefined' ? window : globalThis);
