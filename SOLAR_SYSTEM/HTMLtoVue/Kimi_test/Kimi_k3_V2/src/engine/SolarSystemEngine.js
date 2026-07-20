import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'

import { TAU, V, easeIO, fmtInt, AU2D, sliderScale, orbitPos } from './math.js'
import { GRADE_SHADER } from './shaders.js'
import { buildBodies } from './world/bodies.js'
import { createSunFx } from './world/sunFx.js'
import { createComet, updateComet } from './world/comet.js'
import { createProbes } from './world/probes.js'
import { createTrails, updateTrails } from './world/trails.js'
import { createBelts, updateBelt } from './world/belts.js'
import { createStarfield, createBackground, STAR_N } from './world/starfield.js'
import { createMeteors, updateMeteors } from './world/meteors.js'

const EPOCH_MS = Date.UTC(2024, 0, 1)

/* ============ 升级：星际导览（自动巡航 12 站） ============ */
const TOUR_STOPS = [
  { id: 'sun', m: 4.5 }, { id: 'mercury', m: 7 }, { id: 'venus', m: 6 }, { id: 'earth', m: 6 },
  { id: 'moon', m: 8 }, { id: 'mars', m: 6 }, { id: 'jupiter', m: 5 }, { id: 'saturn', m: 8 },
  { id: 'uranus', m: 6 }, { id: 'neptune', m: 6 }, { id: 'pluto', m: 12 }, { id: 'halley', m: 10, min: 16 },
]

/**
 * SolarSystemEngine —— 框架无关的 Three.js 引擎（与原单文件版逻辑 1:1）
 * 通过 hooks 回调向外同步 UI 状态（FPS/日期/选中/导览/测距等），
 * Vue 侧只调用公开 API，不直接接触 Three.js 内部。
 */
export class SolarSystemEngine {
  constructor({ container, labelLayer, hooks = {} }) {
    this.container = container
    this.labelLayer = labelLayer
    this.hooks = hooks

    /* ============ 渲染器 / 场景 / 相机 ============ */
    const renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    container.appendChild(renderer.domElement)

    const scene = this.scene = new THREE.Scene()
    scene.background = new THREE.Color(0x04060f)

    const camera = this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 30000)
    camera.position.set(0, 155, 400)

    const controls = this.controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.rotateSpeed = 0.55
    controls.panSpeed = 0.8
    controls.minDistance = 0.4
    controls.maxDistance = 2600 // 升级：放宽以容纳塞德娜/旅行者号的深空轨道
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
    this._onContextMenu = e => e.preventDefault()
    renderer.domElement.addEventListener('contextmenu', this._onContextMenu)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.inset = '0'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    labelLayer.appendChild(this.labelRenderer.domElement)

    // 供 Lambert 材质（小行星）使用的真实光源；着色器天体自行计算光照
    this.sunLight = new THREE.PointLight(0xfff2dd, 2.2, 0, 0)
    scene.add(this.sunLight)
    this.ambient = new THREE.AmbientLight(0x8899bb, 0.14)
    scene.add(this.ambient)

    this.composer = new EffectComposer(renderer)
    this.composer.addPass(new RenderPass(scene, camera))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.95, 0.7, 0.85)
    this.composer.addPass(this.bloomPass)
    this.composer.addPass(new OutputPass())
    this.composer.addPass(new ShaderPass(GRADE_SHADER))

    /* ============ 世界上下文（模拟时钟：运动时间与日期时间分离，逆行只影响运动） ============ */
    this.sim = { motionDays: 0, clockDays: 0 }
    this.ctx = {
      scene,
      sim: this.sim,
      bodies: [],            // 所有可聚焦天体（含探测器）
      bodyById: {},
      pickables: [],         // 射线拾取网格
      orbitLines: [],        // { line, body } 便于显隐与高亮
      sunPos: new THREE.Vector3(0, 0, 0),
    }
    buildBodies(this.ctx)
    createSunFx(this.ctx)
    createComet(this.ctx)
    createProbes(this.ctx)
    this._createMarker()
    createTrails(this.ctx)
    createBelts(this.ctx)
    createStarfield(this.ctx)
    createBackground(this.ctx)
    createMeteors(this.ctx)

    /* ============ 天体总数统计 ============ */
    this.hooks.onCount?.(this.ctx.bodies.length + 660 + 1800 + 450 + STAR_N)

    /* ============ 相机补间 / 聚焦跟随 ============ */
    this.tween = { active: false, t0: 0, dur: 1.6, fromPos: new THREE.Vector3(), toPos: new THREE.Vector3(),
                   fromTg: new THREE.Vector3(), toTg: new THREE.Vector3(), onDone: null }
    this.selected = null
    this.focused = null
    this.followPrev = new THREE.Vector3()
    this.followPrevValid = false
    this._onControlStart = () => { // 用户接管 → 取消跟随/补间/导览
      this.tween.active = false
      this.focused = null
      this.stopTour()
    }
    controls.addEventListener('start', this._onControlStart)

    /* ============ 控制状态 ============ */
    this.paused = false
    this.dirSign = 1
    this.timeSlider = 67
    this.labelsOn = true
    this.realScale = false
    this.measureMode = false
    this.measurePair = []
    this.tourIdx = -1
    this.tourTimer = null

    /* ============ 拾取 ============ */
    this.raycaster = new THREE.Raycaster()
    this.ndc = new THREE.Vector2()
    this.downX = 0; this.downY = 0
    this._bindPointer()

    /* ============ 升级：双天体测距 ============ */
    this._createMeasureLine()

    /* ============ 快捷键 / 窗口尺寸 ============ */
    this._onKeyDown = this._handleKeyDown.bind(this)
    window.addEventListener('keydown', this._onKeyDown)
    this._onResize = this._handleResize.bind(this)
    window.addEventListener('resize', this._onResize)

    /* ============ 主循环状态 ============ */
    this._lw = new THREE.Vector3()
    this._sd = new THREE.Vector3()
    this._sm = new THREE.Matrix4()
    this._au1 = new THREE.Vector3(); this._au2 = new THREE.Vector3()
    this._wp1 = new THREE.Vector3(); this._wp2 = new THREE.Vector3()
    this.lastT = performance.now()
    this.fpsAcc = 0; this.fpsN = 0; this.dtTick = 0
    this._raf = 0

    this.select(null)
  }

  /* ============ 升级：选中脉冲光环标记 ============ */
  _createMarker() {
    const c = document.createElement('canvas'); c.width = c.height = 128
    const g = c.getContext('2d')
    g.strokeStyle = 'rgba(160,200,255,1)'
    g.lineWidth = 5
    g.shadowColor = 'rgba(120,170,255,0.9)'; g.shadowBlur = 10
    g.beginPath(); g.arc(64, 64, 50, 0, TAU); g.stroke()
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    this.marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true,
      opacity: 0, depthWrite: false, depthTest: true }))
    this.marker.visible = false
    this.scene.add(this.marker)
  }

  _createMeasureLine() {
    this.measureLine = new THREE.Line(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3)),
      new THREE.LineDashedMaterial({ color: 0xffe08a, dashSize: 2.2, gapSize: 1.6, transparent: true, opacity: 0.9 }))
    this.measureLine.frustumCulled = false
    this.measureLine.visible = false
    this.scene.add(this.measureLine)
  }

  /* ============ 相机补间 / 聚焦跟随 ============ */
  startTween(toPos, toTg, dur, onDone) {
    this.tween.active = true
    this.tween.t0 = performance.now()
    this.tween.dur = dur || 1.6
    this.tween.fromPos.copy(this.camera.position)
    this.tween.toPos.copy(toPos)
    this.tween.fromTg.copy(this.controls.target)
    this.tween.toTg.copy(toTg)
    this.tween.onDone = onDone || null
    this.followPrevValid = false
  }
  _updateTween(now) {
    if (!this.tween.active) return
    const t = Math.min(1, (now - this.tween.t0) / (this.tween.dur * 1000))
    const e = easeIO(t)
    this.camera.position.lerpVectors(this.tween.fromPos, this.tween.toPos, e)
    this.controls.target.lerpVectors(this.tween.fromTg, this.tween.toTg, e)
    if (t >= 1) {
      this.tween.active = false
      if (this.tween.onDone) { const f = this.tween.onDone; this.tween.onDone = null; f() }
    }
  }
  // 双击聚焦：飞向天体并进入跟随
  focusBody(b) {
    const wp = b.holder.getWorldPosition(new THREE.Vector3())
    const dir = this.camera.position.clone().sub(wp)
    if (dir.lengthSq() < 1e-6) dir.set(1, 0.6, 1)
    dir.normalize()
    const dist = Math.max(b.r * 6, b.r + 2.0)
    const toPos = wp.clone().addScaledVector(dir, dist)
    this.focused = null
    this.startTween(toPos, wp, 1.8, () => { this.focused = b; this.followPrevValid = false })
  }
  focusById(id) { const b = this.ctx.bodyById[id]; if (b) this.focusBody(b) }

  /* ============ 选中（信息面板 + 轨道高亮 + 脉冲标记） ============ */
  select(b) {
    this.selected = b
    this.hooks.onSelect?.(b ? b.def : null)
    this.marker.visible = !!b
    // 轨道线高亮：选中者提亮，其余回落
    for (const o of this.ctx.orbitLines) {
      const base = o.body.def.parent ? 0.10 : (o.body.def.cat === '矮行星' || o.body.def.cat === '彗星' ? 0.22 : 0.32)
      o.line.material.opacity = (b && o.body === b) ? 0.85 : base
    }
  }
  selectById(id) { this.select(this.ctx.bodyById[id] || null) }

  /* ============ 搜索（中英文模糊匹配） ============ */
  searchBodies(q) {
    q = q.trim().toLowerCase()
    if (!q) return []
    return this.ctx.bodies
      .filter(b => b.def.name.toLowerCase().includes(q) || b.def.en.toLowerCase().includes(q))
      .slice(0, 8)
      .map(b => ({ id: b.def.id, name: b.def.name, en: b.def.en, cat: b.def.cat }))
  }

  /* ============ 预设视角 ============ */
  preset(name) {
    const P = {
      overview: () => { this.focused = null; this.startTween(V(0, 165, 420), V(0, 0, 0), 2.0) },
      inner: () => { this.focused = null; this.startTween(V(0, 62, 140), V(0, 0, 0), 2.0) },
      jupiter: () => this._presetBody('jupiter', V(18, 10, 34)),
      saturn: () => this._presetBody('saturn', V(26, 14, 48)),
      pluto: () => this._presetBody('pluto', V(6, 4, 11)),
    }
    P[name]?.()
  }
  _presetBody(id, off) {
    const b = this.ctx.bodyById[id]
    this.select(b)
    const wp = b.holder.getWorldPosition(new THREE.Vector3())
    this.startTween(wp.clone().add(off), wp, 2.0, () => { this.focused = b; this.followPrevValid = false })
  }

  /* ============ 控制面板：显示开关 ============ */
  setBeltVisible(v) { this.ctx.beltGroup.visible = v }
  setKuiperVisible(v) { this.ctx.kuiperGroup.visible = this.ctx.oortGroup.visible = v }
  setOrbitsVisible(v) { for (const o of this.ctx.orbitLines) o.line.visible = v }
  setTrailsVisible(v) { this.ctx.trailGroup.visible = v }
  setLabelsVisible(v) { this.labelsOn = v }
  setAtmosVisible(v) { for (const b of this.ctx.bodies) if (b.atmoMesh) b.atmoMesh.visible = v }

  /* ============ 控制面板：时间 / 方向 / 日期跳转 ============ */
  setTimeSlider(v) { // 来自 UI 滑杆：解除暂停
    this.timeSlider = v
    if (this.paused) { this.paused = false; this.hooks.onPaused?.(false) }
  }
  togglePause() {
    this.paused = !this.paused
    this.hooks.onPaused?.(this.paused)
  }
  toggleDirection() {
    this.dirSign *= -1
    this.hooks.onDir?.(this.dirSign)
  }
  jumpToDate(v) { // 升级：任意日期跳转
    if (!v) return
    const ms = Date.parse(v + 'T00:00:00Z')
    if (isNaN(ms)) return
    this.sim.motionDays = this.sim.clockDays = (ms - EPOCH_MS) / 86400000
    this.followPrevValid = false // 天体瞬移，防止跟随相机被拖拽
  }

  /* ============ 控制面板：画面 ============ */
  setBrightness(v) {
    const b = v / 100
    this.ambient.intensity = 0.14 * b
    this.bloomPass.strength = 0.95 * b
    this.renderer.toneMappingExposure = 1.12 * (0.7 + 0.3 * b)
  }
  setStarDensity(v) {
    this.ctx.starGeo.setDrawRange(0, Math.floor(STAR_N * v / 100))
  }
  resetView() { this.focused = null; this.select(null); this.preset('overview') }

  /* ============ 升级：真实比例模式（只还原天体尺寸比例，轨道保持压缩） ============ */
  _applyScaleMode() {
    for (const b of this.ctx.bodies) {
      if (!b.sizeG || b.def.id === 'sun') continue
      if (typeof b.def.km !== 'number') continue
      const target = this.realScale ? Math.max(0.05, 12 * b.def.km / 695700) : b.baseR
      b.sizeG.scale.setScalar(target / b.baseR)
    }
  }
  toggleRealScale() {
    this.realScale = !this.realScale
    this._applyScaleMode()
    this.hooks.onRealScale?.(this.realScale)
  }

  /* ============ 升级：截图保存 ============ */
  screenshot() {
    this.composer.render() // 强制重绘一帧后再读像素
    this.renderer.domElement.toBlob(blob => {
      if (!blob) return
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'solar-system-' + Date.now() + '.png'
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 5000)
    })
  }

  /* ============ 升级：星际导览 ============ */
  stopTour() {
    if (this.tourTimer) { clearTimeout(this.tourTimer); this.tourTimer = null }
    this.tourIdx = -1
    this.hooks.onTourBar?.(null)
    this.hooks.onTourActive?.(false)
  }
  tourGo(i) {
    if (i >= TOUR_STOPS.length) { this.stopTour(); return }
    this.tourIdx = i
    const s = TOUR_STOPS[i], b = this.ctx.bodyById[s.id]
    this.select(b)
    const wp = b.holder.getWorldPosition(new THREE.Vector3())
    const dist = Math.max(b.r * s.m, b.r + 2, s.min || 0)
    const dir = V(0.8, 0.45, 1).normalize()
    this.focused = null
    this.startTween(wp.clone().addScaledVector(dir, dist), wp, 2.0, () => { this.focused = b; this.followPrevValid = false })
    this.hooks.onTourBar?.('星际导览 · ' + (i + 1) + '/' + TOUR_STOPS.length + '　' + b.def.name +
      '（' + b.def.en + '）　—　点击画面或 Esc 停止')
    this.tourTimer = setTimeout(() => this.tourGo(i + 1), 7000)
  }
  toggleTour() {
    if (this.tourIdx >= 0) this.stopTour()
    else { this.hooks.onTourActive?.(true); this.tourGo(0) }
  }

  /* ============ 升级：双天体测距 ============
     压缩是【径向】的（AU2D 只改半径不改角度），故世界坐标夹角保真；
     对每个天体还原真实日心向量：行星径向解压，卫星按 smaKm/orbitR 折算，结果标“近似”。 */
  _truePosAU(b, out) {
    out.set(0, 0, 0)
    let cur = b
    while (cur) {
      const d = cur.def
      if (d.au !== undefined) {           // 日心天体：径向解压 AU2D 逆变换
        const p = cur.holder.position, r = p.length()
        if (r > 1e-6) out.addScaledVector(p, Math.pow(r / 30, 1.25) / r)
      } else if (d.auDist !== undefined) { // 静态探测器
        out.set(d.dir[0], d.dir[1], d.dir[2]).normalize().multiplyScalar(d.auDist)
      } else if (d.orbitR && d.smaKm) {    // 卫星：相对宿主偏移折算 AU
        out.addScaledVector(cur.holder.position, (d.smaKm / 149597870.7) / d.orbitR)
      }
      cur = d.parent ? this.ctx.bodyById[d.parent] : null
    }
    return out
  }
  updateMeasure() {
    if (this.measurePair.length !== 2) { this.measureLine.visible = false; return }
    const [a, b] = this.measurePair
    a.holder.getWorldPosition(this._wp1)
    b.holder.getWorldPosition(this._wp2)
    const attr = this.measureLine.geometry.attributes.position
    attr.setXYZ(0, this._wp1.x, this._wp1.y, this._wp1.z)
    attr.setXYZ(1, this._wp2.x, this._wp2.y, this._wp2.z)
    attr.needsUpdate = true
    this.measureLine.computeLineDistances()
    this.measureLine.visible = true
    const dAU = this._truePosAU(a, this._au1).distanceTo(this._truePosAU(b, this._au2))
    const dKm = dAU * 149597870.7
    this.hooks.onMeasureBox?.('测距 · ' + a.def.name + ' ↔ ' + b.def.name + '：' +
      dAU.toFixed(4) + ' AU ≈ ' + fmtInt(dKm) + ' km（近似）· 点击第 3 个天体重选')
  }
  setMeasure(on) {
    this.measureMode = on
    this.hooks.onMeasureMode?.(on)
    if (!on) {
      this.measurePair.length = 0
      this.measureLine.visible = false
      this.hooks.onMeasureBox?.(null)
    } else {
      this.stopTour()
      this.hooks.onMeasureBox?.('测距：点击第一个天体')
    }
  }
  toggleMeasure() { this.setMeasure(!this.measureMode) }

  /* ============ 拾取（单击选中 / 双击聚焦 / 测距模式） ============ */
  castBodies(ev) {
    this.ndc.set((ev.clientX / window.innerWidth) * 2 - 1, -(ev.clientY / window.innerHeight) * 2 + 1)
    this.raycaster.setFromCamera(this.ndc, this.camera)
    const hits = this.raycaster.intersectObjects(this.ctx.pickables, false)
    return hits.length ? hits[0].object.userData.body : null
  }
  _bindPointer() {
    const el = this.renderer.domElement
    this._onPointerDown = ev => { this.downX = ev.clientX; this.downY = ev.clientY }
    this._onPointerUp = ev => {
      if (Math.hypot(ev.clientX - this.downX, ev.clientY - this.downY) > 5) return // 拖拽不算点击
      const b = this.castBodies(ev)
      if (this.measureMode) {
        if (b) {
          if (this.measurePair.length >= 2) this.measurePair.length = 0
          this.measurePair.push(b)
          if (this.measurePair.length === 1) {
            this.hooks.onMeasureBox?.('测距：已选「' + b.def.name + '」，再点击第二个天体')
          }
          this.updateMeasure()
        }
        return
      }
      this.select(b)
    }
    this._onDblClick = ev => {
      const b = this.castBodies(ev)
      if (b) { this.select(b); this.focusBody(b) }
    }
    el.addEventListener('pointerdown', this._onPointerDown)
    el.addEventListener('pointerup', this._onPointerUp)
    el.addEventListener('dblclick', this._onDblClick)
  }

  /* ============ 快捷键 ============ */
  _handleKeyDown(ev) {
    if (ev.target && ev.target.id === 'searchInput') return
    if (ev.code === 'Space') {
      ev.preventDefault()
      this.togglePause()
    } else if (ev.key === 'Escape') {
      this.focused = null
      this.stopTour()
      if (this.measureMode) this.setMeasure(false)
    } else if (ev.key === 'r' || ev.key === 'R') {
      this.resetView()
    } else if (ev.key === '+' || ev.key === '=') {
      this.timeSlider = Math.min(100, this.timeSlider + 8)
      this.paused = false
      this.hooks.onTimeSlider?.(this.timeSlider)
      this.hooks.onPaused?.(false)
    } else if (ev.key === '-') {
      this.timeSlider = Math.max(0, this.timeSlider - 8)
      this.hooks.onTimeSlider?.(this.timeSlider)
    }
  }

  /* ============ 窗口尺寸 ============ */
  _handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
  }

  /* ============ 启动 / 主循环 ============ */
  start() {
    const tick = now => {
      this._raf = requestAnimationFrame(tick)
      this._animate(now)
    }
    this._raf = requestAnimationFrame(tick)
  }

  _animate(now) {
    const dt = Math.min(0.1, (now - this.lastT) / 1000)
    this.lastT = now

    // 时间推进（逆行只影响运动，不影响日期流）
    const scale = this.paused ? 0 : sliderScale(this.timeSlider)
    this.sim.motionDays += dt * scale * this.dirSign
    this.sim.clockDays += dt * scale

    // 天体轨道位置 / 自转 / 着色器时间
    const { bodies } = this.ctx
    for (const b of bodies) {
      if (b.orbit) orbitPos(b.orbit, this.sim.motionDays, b.holder.position)
      if (b.spin && b.mesh) b.mesh.rotation.y = this.sim.motionDays * b.spin
      if (b.mat) b.mat.uniforms.uTime.value = this.sim.motionDays
    }
    const sunBody = this.ctx.sunBody
    if (sunBody.windMat) sunBody.windMat.uniforms.uTime.value = this.sim.motionDays
    if (sunBody.flare) { // 耀斑缓慢旋转 + 呼吸闪烁
      sunBody.flare.material.rotation += dt * 0.02
      sunBody.flare.material.opacity = 0.5 + 0.18 * Math.sin(now * 0.0007) + 0.08 * Math.sin(now * 0.0031)
    }

    // 相机：补间 → 跟随 → 用户控制
    this._updateTween(now)
    if (this.focused) {
      this.focused.holder.getWorldPosition(this._lw)
      if (!this.followPrevValid) { this.followPrev.copy(this._lw); this.followPrevValid = true }
      this.camera.position.add(this._lw.clone().sub(this.followPrev))
      this.controls.target.copy(this._lw)
      this.followPrev.copy(this._lw)
    }
    this.controls.update()

    // 选中标记脉冲
    if (this.selected) {
      this.selected.holder.getWorldPosition(this._lw)
      this.marker.position.copy(this._lw)
      const rEff = this.selected.baseR * (this.selected.sizeG ? this.selected.sizeG.scale.x : 1)
      const s = rEff * 2.6 * (1 + 0.06 * Math.sin(now * 0.005))
      this.marker.scale.set(s, s, 1)
      this.marker.material.opacity = 0.55 + 0.2 * Math.sin(now * 0.005)
    }

    // 标签按距离显隐（注意：CSS2DRenderer 每帧会重写 element.style.display，必须控 object.visible）
    for (const b of bodies) {
      if (!b.label) continue
      b.label.visible = this.labelsOn && this.camera.position.distanceTo(b.holder.getWorldPosition(this._lw)) < (b.def.labelMax || 300)
    }

    // 土星环本影：把指向太阳的方向变换到环局部空间
    const saturnB = this.ctx.bodyById.saturn
    if (saturnB.ringMesh) {
      saturnB.ringMesh.getWorldPosition(this._sd).negate().normalize() // 世界系：环 → 太阳
      this._sm.copy(saturnB.ringMesh.matrixWorld).invert()
      this._sd.transformDirection(this._sm)
      saturnB.ringMesh.material.uniforms.uSunLocal.value.copy(this._sd)
    }

    // 粒子与动态系统（按显隐跳过以省帧耗）
    if (this.ctx.beltGroup.visible) updateBelt(this.ctx)
    if (this.ctx.trailGroup.visible) updateTrails(this.ctx)
    this.ctx.kuiperGroup.rotation.y = this.sim.motionDays * TAU / 200000 // 柯伊伯带整体极缓慢公转
    updateComet(this.ctx)
    updateMeteors(this.ctx, dt)
    this.updateMeasure()
    this.ctx.starMat.uniforms.uTime.value = now * 0.001

    // 日期时间显示
    if (++this.dtTick % 6 === 0) {
      const d = new Date(EPOCH_MS + this.sim.clockDays * 86400000)
      const p2 = n => String(n).padStart(2, '0')
      this.hooks.onDatetime?.(d.getUTCFullYear() + '-' + p2(d.getUTCMonth() + 1) + '-' + p2(d.getUTCDate()) +
        ' ' + p2(d.getUTCHours()) + ':' + p2(d.getUTCMinutes()) + ' UTC')
    }

    // FPS 统计（500ms 刷新）
    this.fpsAcc += dt; this.fpsN++
    if (this.fpsAcc >= 0.5) {
      this.hooks.onFps?.(Math.round(this.fpsN / this.fpsAcc))
      this.fpsAcc = 0; this.fpsN = 0
    }

    this.composer.render()
    this.labelRenderer.render(this.scene, this.camera) // CSS2D 标签层（漏调用会导致所有标签不显示）
  }

  /* ============ 销毁 ============ */
  dispose() {
    cancelAnimationFrame(this._raf)
    if (this.tourTimer) { clearTimeout(this.tourTimer); this.tourTimer = null }
    window.removeEventListener('keydown', this._onKeyDown)
    window.removeEventListener('resize', this._onResize)
    const el = this.renderer.domElement
    el.removeEventListener('contextmenu', this._onContextMenu)
    el.removeEventListener('pointerdown', this._onPointerDown)
    el.removeEventListener('pointerup', this._onPointerUp)
    el.removeEventListener('dblclick', this._onDblClick)
    this.controls.removeEventListener('start', this._onControlStart)
    this.controls.dispose()
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          if (m.map) m.map.dispose()
          m.dispose()
        }
      }
    })
    this.composer.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    el.remove()
    this.labelRenderer.domElement.remove()
  }
}
