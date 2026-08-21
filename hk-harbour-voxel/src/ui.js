/* =============================================================================
 * VOXEL VICTORIA HARBOUR · ui.js
 * HUD：加载进度、时间/天气/画质控制、地标传送清单与信息卡（数字孪生面板）、
 * 3D 地标标签、小地图（点击传送）、罗盘、模式提示、性能读数。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const THREE = global.THREE;
  const { W, clamp } = HKV;

  const UI = {};
  let app = null, S = null;
  const el = (id) => document.getElementById(id);
  const labels = [];
  let miniBase = null, miniCtx = null, miniScale = 1;

  const TIPS = [
    '维港最窄处只有约 900 米，两岸天际线因此显得格外压迫而壮丽。',
    '香港岛的高楼贴着海岸线生长，因为山与海之间只有一条窄窄的平地。',
    '中银大厦以「节节高升的竹」为意象，四组三棱柱依次收顶。',
    'ICC 环球贸易广场 484 米，是全港最高；对岸的 IFC 二期 415 米。',
    '天星小轮往来尖沙咀与中环已超过一百年，单程八分钟。',
    '「幻彩咏香江」每晚八点上演，两岸四十多栋大楼一起点亮。',
    '按 Tab 切换视角，按 H 隐藏界面拍照，按 P 保存截图。',
  ];

  UI.progress = function (msg, pct) {
    const l = el('loading');
    if (!l) return;
    l.querySelector('.lmsg').textContent = msg;
    l.querySelector('.lbar > i').style.width = Math.round(pct * 100) + '%';
    l.querySelector('.lpct').textContent = Math.round(pct * 100) + '%';
  };

  UI.ready = function (a) {
    app = a; S = a.S;
    const l = el('loading');
    if (l) { l.classList.add('done'); setTimeout(() => l.remove(), 900); }
    buildPanels();
    buildLabels();
    buildMinimap();
    UI.sync();
  };

  // ------------------------------------------------------------------ 面板
  function buildPanels() {
    // 模式
    const modes = [
      ['god', '上帝视角', 'Orbit'], ['fp', '第一人称', 'Walk'], ['drone', '无人机', 'Drone'],
      ['tour', '电影巡游', 'Cinematic'], ['ferry', '天星小轮', 'Ferry'],
    ];
    const mw = el('modes');
    mw.innerHTML = '';
    for (const [id, zh, en] of modes) {
      const b = document.createElement('button');
      b.className = 'mode'; b.dataset.mode = id;
      b.innerHTML = `<b>${zh}</b><span>${en}</span>`;
      b.onclick = () => app.setMode(id);
      mw.appendChild(b);
    }

    // 经典机位（数字键 1-9 同步）
    const vw = el('views');
    if (vw && app.viewpoints) {
      vw.innerHTML = '';
      app.viewpoints.forEach(([key, name], i) => {
        const b = document.createElement('button');
        b.className = 'chip v'; b.dataset.v = key;
        b.innerHTML = `<b style="color:var(--gold);font-weight:600">${i + 1}</b> ${name}`;
        b.onclick = () => app.gotoViewpoint(key);
        vw.appendChild(b);
      });
    }

    // 时间
    const ts = el('timeSlider');
    ts.oninput = () => { app.setTime(parseFloat(ts.value)); UI.sync(); };
    el('timePresets').innerHTML = '';
    const presets = [['05.4', '黎明'], ['08.0', '早晨'], ['12.5', '正午'], ['17.9', '黄金时刻'], ['18.9', '日落'], ['19.6', '蓝调时刻'], ['20.5', '幻彩咏香江'], ['23.5', '深夜']];
    for (const [t, zh] of presets) {
      const b = document.createElement('button');
      b.className = 'chip'; b.textContent = zh;
      b.onclick = () => { app.setTime(parseFloat(t)); UI.sync(); };
      el('timePresets').appendChild(b);
    }
    el('flow').onchange = (e) => { S.timeFlow = parseFloat(e.target.value); };

    // 天气
    const wz = el('weathers');
    wz.innerHTML = '';
    for (const [id, zh] of [['clear', '晴朗'], ['haze', '薄雾'], ['cloudy', '多云'], ['storm', '台风雨']]) {
      const b = document.createElement('button');
      b.className = 'chip w'; b.dataset.w = id; b.textContent = zh;
      b.onclick = () => app.setWeather(id);
      wz.appendChild(b);
    }

    // 画质开关
    const tg = el('toggles');
    tg.innerHTML = '';
    const toggles = [
      ['shadows', '动态阴影'], ['reflections', '海面反射'], ['godRays', '体积光'],
      ['showGrid', '体素网格'], ['showLabels', '地标标签'], ['lightShow', '幻彩咏香江'],
    ];
    for (const [k, zh] of toggles) {
      const b = document.createElement('button');
      b.className = 'chip t'; b.dataset.k = k; b.textContent = zh;
      b.onclick = () => { S[k] = !S[k]; UI.sync(); };
      tg.appendChild(b);
    }
    el('bloom').oninput = (e) => { S.bloom = parseFloat(e.target.value); };
    const sens = el('sens');
    if (sens) { sens.value = String(S.sens); sens.oninput = (e) => { S.sens = parseFloat(e.target.value); }; }
    const qual = el('qual');
    if (qual && app.setQuality) {
      qual.value = S.quality;
      qual.onchange = (e) => app.setQuality(e.target.value);
    }

    // 地标清单
    const list = el('lmList');
    const groups = {};
    for (const lm of app.landmarks) {
      if (lm.noLabel) continue;
      const side = lm.z > 350 ? '九龙 KOWLOON' : '香港岛 HONG KONG ISLAND';
      (groups[side] = groups[side] || []).push(lm);
    }
    list.innerHTML = '';
    for (const side of Object.keys(groups).sort()) {
      const h = document.createElement('div');
      h.className = 'lmGroup'; h.textContent = side;
      list.appendChild(h);
      for (const lm of groups[side].sort((a, b) => (b.hm || 0) - (a.hm || 0))) {
        const it = document.createElement('button');
        it.className = 'lmItem';
        it.innerHTML = `<span class="nm">${lm.zh}</span><span class="ht">${lm.hm ? lm.hm + 'm' : ''}</span>`;
        it.onclick = () => app.teleport(lm);
        list.appendChild(it);
      }
    }
    el('search').oninput = (e) => {
      const q = e.target.value.trim().toLowerCase();
      for (const it of list.querySelectorAll('.lmItem')) {
        const t = it.textContent.toLowerCase();
        it.style.display = !q || t.includes(q) ? '' : 'none';
      }
    };

    el('tip').textContent = TIPS[Math.floor(Math.random() * TIPS.length)];
    setInterval(() => { el('tip').textContent = TIPS[Math.floor(Math.random() * TIPS.length)]; }, 12000);

    for (const b of document.querySelectorAll('.panelToggle')) {
      b.onclick = () => document.body.classList.toggle('collapse-' + b.dataset.p);
    }
  }

  UI.sync = function () {
    if (!app) return;
    for (const b of document.querySelectorAll('.mode')) b.classList.toggle('on', b.dataset.mode === S.mode);
    for (const b of document.querySelectorAll('.chip.w')) b.classList.toggle('on', b.dataset.w === S.weather);
    for (const b of document.querySelectorAll('.chip.t')) b.classList.toggle('on', !!S[b.dataset.k]);
    el('timeSlider').value = S.time.toFixed(2);
    const q = el('qual'); if (q && q.value !== S.quality) q.value = S.quality;
    el('hint').innerHTML = HINTS[S.mode] || '';
  };

  const HINTS = {
    god: '左键拖动旋转 · 右键拖动平移 · 滚轮缩放 · 点击建筑查看资料 · <b>1-9</b> 经典机位 · <b>Tab</b> 切换视角',
    fp: '<b>W A S D</b> 行走 · <b>Shift</b> 疾跑 · <b>空格</b> 跳跃 · <b>F</b> 切换飞行 · 鼠标环视 · <b>Esc</b> 释放鼠标',
    drone: '<b>W A S D</b> 平移 · <b>空格 / C</b> 升降 · <b>Shift</b> 加速 · 鼠标环视',
    tour: '电影巡游中 · <b>空格</b> 退出巡游 · 滚轮调整焦距',
    ferry: '正在搭乘天星小轮横渡维港 · <b>Tab</b> 切换视角',
  };

  // ------------------------------------------------------------------ 标签
  function buildLabels() {
    const layer = el('labels');
    layer.innerHTML = '';
    labels.length = 0;
    for (const lm of app.landmarks) {
      if (lm.noLabel) continue;
      const d = document.createElement('div');
      d.className = 'label';
      d.innerHTML = `<i></i><b>${lm.zh}</b><span>${lm.hm ? lm.hm + 'm · ' : ''}${lm.en}</span>`;
      d.onclick = () => app.teleport(lm);
      layer.appendChild(d);
      labels.push({ lm, d, v: new THREE.Vector3(lm.x, (lm.top || 40) + 3, lm.z) });
    }
  }

  // ---------------------------------------------------------------- 小地图
  function buildMinimap() {
    const cv = el('mini');
    const geo = app.geo;
    miniScale = cv.width / W.SX;
    cv.height = Math.round(W.SZ * miniScale);
    miniCtx = cv.getContext('2d');
    const img = miniCtx.createImageData(cv.width, cv.height);
    const USE = HKV.Geo.USE;
    for (let py = 0; py < cv.height; py++) {
      for (let px = 0; px < cv.width; px++) {
        const x = Math.floor(px / miniScale), z = Math.floor((cv.height - 1 - py) / miniScale);
        const i = x + z * geo.SX;
        const o = (py * cv.width + px) * 4;
        let r, g, b;
        if (!geo.land[i]) {
          const d = Math.min(1, geo.shoreDist[i] / 30);
          r = 8 + 6 * (1 - d); g = 26 + 14 * (1 - d); b = 44 + 22 * (1 - d);
        } else {
          const h = geo.height[i], u = geo.use[i];
          if (u === USE.ROAD) { r = 60; g = 62; b = 66; }
          else if (u === USE.BUILDING) { const t = clamp((h - W.GROUND) / 60, 0, 1); r = 90 + 120 * t; g = 96 + 110 * t; b = 104 + 100 * t; }
          else if (u === USE.PARK) { r = 34; g = 74; b = 40; }
          else if (u === USE.PROMENADE) { r = 96; g = 88; b = 74; }
          else if (h > W.GROUND + 3) { const t = clamp((h - W.GROUND) / 120, 0, 1); r = 40 + 46 * t; g = 58 + 42 * t; b = 38 + 34 * t; }
          else { r = 52; g = 54; b = 56; }
        }
        img.data[o] = r; img.data[o + 1] = g; img.data[o + 2] = b; img.data[o + 3] = 255;
      }
    }
    miniCtx.putImageData(img, 0, 0);
    miniBase = miniCtx.getImageData(0, 0, cv.width, cv.height);
    cv.onclick = (e) => {
      const rc = cv.getBoundingClientRect();
      const x = ((e.clientX - rc.left) / rc.width) * W.SX;
      const z = (1 - (e.clientY - rc.top) / rc.height) * W.SZ;
      if (S.mode === 'god') { app.cam.target.set(x, app.cam.target.y, z); }
      else app.placeOnGround(x, z);
    };
  }

  function drawMinimap() {
    if (!miniCtx) return;
    const cv = el('mini');
    miniCtx.putImageData(miniBase, 0, 0);
    const toPx = (x, z) => [x * miniScale, cv.height - z * miniScale];
    // 地标（高楼更亮更大）
    for (const lm of app.landmarks) {
      if (lm.noLabel) continue;
      const [lx, ly] = toPx(lm.x, lm.z);
      const tall = (lm.hm || 0) > 180;
      miniCtx.fillStyle = tall ? 'rgba(255,214,130,.95)' : 'rgba(255,214,130,.5)';
      miniCtx.fillRect(lx - (tall ? 1 : 0.5), ly - (tall ? 1 : 0.5), tall ? 2.5 : 1.5, tall ? 2.5 : 1.5);
    }
    // 船只 / 摩天轮（实时位置）
    const ents = app.ents;
    if (ents) {
      miniCtx.fillStyle = '#eaf6ff';
      for (const v of ents.ferries || []) {
        if (!v.g) continue;
        const [vx, vy] = toPx(v.g.position.x, v.g.position.z);
        miniCtx.fillRect(vx - 1, vy - 1, 2, 2);
      }
      if (ents.wheel && ents.wheel.g) {
        const [wx, wy] = toPx(ents.wheel.g.position.x, ents.wheel.g.position.z);
        miniCtx.strokeStyle = 'rgba(140,230,255,.8)'; miniCtx.lineWidth = 1;
        miniCtx.beginPath(); miniCtx.arc(wx, wy, 2.5, 0, 7); miniCtx.stroke();
      }
    }
    // 相机视锥
    const cp = app.camera.position;
    const dir = new THREE.Vector3(); app.camera.getWorldDirection(dir);
    const [cx, cy] = toPx(cp.x, cp.z);
    const ang = Math.atan2(dir.x, dir.z);
    miniCtx.save();
    miniCtx.translate(cx, cy);
    miniCtx.rotate(-ang);
    const g = miniCtx.createLinearGradient(0, 0, 0, -46);
    g.addColorStop(0, 'rgba(120,220,255,0.55)');
    g.addColorStop(1, 'rgba(120,220,255,0)');
    miniCtx.fillStyle = g;
    miniCtx.beginPath(); miniCtx.moveTo(0, 0); miniCtx.lineTo(-24, -46); miniCtx.lineTo(24, -46); miniCtx.closePath(); miniCtx.fill();
    miniCtx.restore();
    miniCtx.fillStyle = '#7ce8ff';
    miniCtx.beginPath(); miniCtx.arc(cx, cy, 3, 0, 7); miniCtx.fill();
    if (S.selected) {
      const [sx, sy] = toPx(S.selected.x, S.selected.z);
      miniCtx.strokeStyle = '#ff77c8'; miniCtx.lineWidth = 2;
      miniCtx.beginPath(); miniCtx.arc(sx, sy, 5, 0, 7); miniCtx.stroke();
    }
  }

  // ---------------------------------------------------------------- 信息卡
  UI.showInfo = function (lm, hit) {
    const box = el('info');
    if (!lm) { box.classList.remove('on'); return; }
    box.classList.add('on');
    const floors = lm.hm > 40 ? Math.round(lm.hm / 3.6) : null;
    const d = app.camera.position.distanceTo(new THREE.Vector3(lm.x, W.GROUND, lm.z)) * W.VOXEL;
    box.innerHTML = `
      <div class="ihead"><b>${lm.zh}</b><i>${lm.en}</i></div>
      <div class="irow"><span>高度</span><em>${lm.hm ? lm.hm + ' m' : '—'}</em></div>
      ${floors ? `<div class="irow"><span>约当层数</span><em>${floors} 层</em></div>` : ''}
      <div class="irow"><span>落成</span><em>${lm.yr ? lm.yr : '—'}</em></div>
      <div class="irow"><span>分区</span><em>${lm.dist || '—'}</em></div>
      <div class="irow"><span>体素高度</span><em>${Math.round((lm.top || 0) - W.SEA)} vx</em></div>
      <div class="irow"><span>视距</span><em>${(d / 1000).toFixed(2)} km</em></div>
      <p class="idesc">${lm.desc || ''}</p>
      <div class="ibtns">
        <button id="ibGod">上帝视角环绕</button>
        <button id="ibFp">进入街道</button>
      </div>`;
    el('ibGod').onclick = () => { app.setMode('god'); app.teleport(lm); };
    el('ibFp').onclick = () => { app.setMode('fp'); app.teleport(lm); };
  };

  // ------------------------------------------------------------------ 每帧
  let acc = 0;
  const tmp = new THREE.Vector3();
  UI.frame = function (dt) {
    if (!app) return;
    acc += dt;
    // 标签投影
    const cam = app.camera;
    if (S.showLabels) {
      const cands = [];
      for (const L of labels) {
        tmp.copy(L.v);
        const dist = cam.position.distanceTo(tmp);
        tmp.project(cam);
        const vis = tmp.z < 1 && tmp.x > -1.05 && tmp.x < 1.05 && tmp.y > -1.05 && tmp.y < 1.05;
        if (!vis) { L.d.style.display = 'none'; continue; }
        cands.push({ L, dist, x: (tmp.x * 0.5 + 0.5) * innerWidth, y: (-tmp.y * 0.5 + 0.5) * innerHeight });
      }
      cands.sort((a, b) => a.dist - b.dist);
      const shown = [];
      for (let i = 0; i < cands.length; i++) {
        const c = cands[i];
        let overlap = false;
        for (const s of shown) if (Math.abs(s.x - c.x) < 108 && Math.abs(s.y - c.y) < 26) { overlap = true; break; }
        if (overlap || shown.length > 22) { c.L.d.style.display = 'none'; continue; }
        shown.push(c);
        c.L.d.style.display = '';
        c.L.d.style.transform = `translate(-50%,-100%) translate(${c.x.toFixed(1)}px,${c.y.toFixed(1)}px)`;
        c.L.d.style.opacity = String(clamp(1.25 - c.dist / 1500, 0.25, 1));
        c.L.d.classList.toggle('sel', S.selected === c.L.lm);
      }
    } else for (const L of labels) L.d.style.display = 'none';

    if (acc > 0.1) {
      acc = 0;
      drawMinimap();
      const hh = Math.floor(S.time), mm = Math.floor((S.time - hh) * 60);
      el('clock').textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
      el('clockName').textContent = timeName(S.time);
      const st = S.stats;
      el('stats').innerHTML =
        `<span>${st.fps || 0} FPS</span><span>${(st.voxels / 1e6).toFixed(2)}M 体素</span>` +
        `<span>${(st.tris / 1e6).toFixed(2)}M 三角面</span><span>${st.landmarks} 地标</span>` +
        `<span>${st.buildings} 楼宇</span>` +
        (st.props ? `<span>${(st.props / 1000).toFixed(1)}K 细节件</span>` : '');
      const cp = app.camera.position;
      el('coord').textContent = `X ${cp.x.toFixed(0)} · Y ${cp.y.toFixed(0)} · Z ${cp.z.toFixed(0)}　海拔 ${((cp.y - W.SEA) * W.VOXEL).toFixed(0)} m`;
      const dir = new THREE.Vector3(); app.camera.getWorldDirection(dir);
      const bearing = (Math.atan2(dir.x, dir.z) * 180 / Math.PI + 360) % 360;
      el('compass').textContent = ['北 N', '东北 NE', '东 E', '东南 SE', '南 S', '西南 SW', '西 W', '西北 NW'][Math.round(bearing / 45) % 8];
    }
  };

  function timeName(t) {
    if (t < 5) return '深夜';
    if (t < 6.2) return '黎明';
    if (t < 8) return '日出';
    if (t < 11) return '上午';
    if (t < 14) return '正午';
    if (t < 17) return '午后';
    if (t < 18.6) return '黄金时刻';
    if (t < 19.3) return '日落';
    if (t < 20) return '蓝调时刻';
    if (t < 22.5) return '幻彩咏香江';
    return '夜';
  }

  HKV.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
