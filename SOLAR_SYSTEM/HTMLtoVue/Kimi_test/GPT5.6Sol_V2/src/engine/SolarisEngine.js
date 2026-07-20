import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

import { TAU, AU, RADII, DEG, AU_KM, keplerE, ellipsePosition, moonPosition, hashString, formatDistance } from './math.js'
import { CINEMA_SHADER } from './shaders.js'
import { bodyDefs, moonDefs } from './data/bodies.js'
import { buildBodies, namedAsteroid } from './world/bodies.js'
import { createRings } from './world/rings.js'
import { createSunFx } from './world/sunFx.js'
import { createStarfield, createZodiacal, createKuiper, createOort, createScienceLayer, STAR_COUNT, KUIPER_COUNT, ZODIACAL_COUNT } from './world/starfield.js'
import { createAsteroidBelt, ASTEROID_COUNT } from './world/belt.js'
import { createCometTails } from './world/comets.js'
import { createMeteors, updateMeteors } from './world/meteors.js'

const EPOCH = Date.parse('2046-01-01T00:00:00Z')
const TOUR_IDS = ['sun', 'earth', 'jupiter', 'io', 'saturn', 'titan', 'uranus', 'triton', 'pluto', 'charon', 'arrokoth', 'sedna', 'halley']
const VIEWS = {
  overview: { p: [150, 260, 510], t: [0, 0, 0] },
  inner: { p: [34, 42, 78], t: [0, 0, 0] },
  jupiter: { id: 'jupiter', offset: [4.7, 2.8, 5.6] },
  saturn: { id: 'saturn', offset: [5.1, 3.7, 6.2] },
  pluto: { id: 'pluto', offset: [1.2, .75, 1.45] },
  distant: { id: 'sedna', offset: [1.4, .9, 1.7] },
}

/**
 * SolarisEngine —— 框架无关的 Three.js 引擎（与原单文件版逻辑 1:1）
 * 通过 hooks 回调向外同步 UI 状态；Vue 侧只调用公开 API。
 */
export class SolarisEngine {
  constructor({ canvasWrap, labelsHost, hooks = {} }) {
    this.canvasWrap = canvasWrap
    this.labelsHost = labelsHost
    this.hooks = hooks

    /* ============ 渲染器 / 场景 / 相机 ============ */
    const scene = this.scene = new THREE.Scene()
    const camera = this.camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, .002, 50000)
    camera.position.set(38, 46, 74)
    const renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6))
    renderer.setSize(innerWidth, innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    canvasWrap.appendChild(renderer.domElement)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(innerWidth, innerHeight)
    this.labelRenderer.domElement.id = 'labels'
    labelsHost.appendChild(this.labelRenderer.domElement)

    const controls = this.controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = .055
    controls.minDistance = .015
    controls.maxDistance = 24000
    controls.target.set(0, 0, 0)
    controls.screenSpacePanning = true

    this.composer = new EffectComposer(renderer)
    this.composer.addPass(new RenderPass(scene, camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.25, .82, .16)
    this.composer.addPass(this.bloom)
    this.cinemaPass = new ShaderPass(CINEMA_SHADER)
    this.composer.addPass(this.cinemaPass)

    this.ambient = new THREE.AmbientLight(0x152038, .18)
    scene.add(this.ambient)
    this.sunLight = new THREE.PointLight(0xffe0ae, 780, 0, 1.78)
    scene.add(this.sunLight)

    /* ============ 世界构建 ============ */
    this.ctx = {
      scene,
      objects: new Map(),
      allData: [...bodyDefs, ...moonDefs],
      atmospheres: [],
      orbitLines: [],
      selectable: [],
    }
    buildBodies(this.ctx)
    createRings(this.ctx)
    createSunFx(this.ctx)
    // Deep-space gradient shell 已折叠进 cinema pass（避免巨球精度伪影）
    scene.background = new THREE.Color(0x01030c)
    createStarfield(this.ctx)
    createZodiacal(this.ctx)
    createScienceLayer(this.ctx)
    createAsteroidBelt(this.ctx)
    namedAsteroid(this.ctx, 'vesta', '灶神星', 'Vesta', 2.362, .089, 7.14, 40, .09)
    namedAsteroid(this.ctx, 'pallas', '智神星', 'Pallas', 2.773, .231, 34.84, 40, .085)
    createKuiper(this.ctx)
    createOort(this.ctx)
    createCometTails(this.ctx)
    createMeteors(this.ctx)
    // updateBodies 迭代的主天体列表 = bodyDefs + 灶神星/智神星
    this.ctx.primaryBodies = bodyDefs.concat(this.ctx.allData.filter(x => x.id === 'vesta' || x.id === 'pallas'))

    /* ============ 模拟时钟 ============ */
    this.sim = { days: 0, speed: 20, direction: 1, date: new Date('2046-01-01T00:00:00Z') }
    this.updateBodies()

    /* ============ 交互状态 ============ */
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()
    this.selected = null
    this.flight = null
    this.dragStart = { x: 0, y: 0 }
    this.followTarget = null
    this.lastFollowPos = null
    this.tourActive = false
    this.tourIndex = 0
    this.nextTour = 0
    this.labelsOn = true
    this.starDensity = 100
    this.resumeSpeed = 20
    this.adaptiveEnabled = true
    this.adaptiveTier = 2
    this.lastAdaptive = performance.now()

    // 轨道速度矢量线（科学层开启时显示）
    this.velocityGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(1, 0, 0)])
    this.velocityLine = new THREE.Line(this.velocityGeo, new THREE.LineBasicMaterial({ color: 0x5dffd0, transparent: true, opacity: .8, depthWrite: false, blending: THREE.AdditiveBlending }))
    this.velocityLine.visible = false
    scene.add(this.velocityLine)

    this.measureState = { active: false, picks: [], line: null, label: null }

    this._bindPointer()

    /* ============ 主循环状态 ============ */
    this.last = performance.now()
    this.fpsLast = this.last
    this.frames = 0
    this.lastUI = 0
    this.lastScale = 0
    this._raf = 0

    this._onResize = this._handleResize.bind(this)
    addEventListener('resize', this._onResize)

    /* ============ 天体总数 / 初始状态 ============ */
    this.hooks.onCount?.(`CELESTIAL OBJECTS ${String(this.ctx.allData.length + ASTEROID_COUNT).padStart(3, '0')}`)
    this._showInfo(null)        // 等价原版启动时的 showInfo(null)
    this._updateScienceHUD()
    this.applyQuality(2, true)
  }

  /* ================================================================
     轨道更新（每帧）
     ================================================================ */
  updateBodies() {
    const sim = this.sim
    for (const d of this.ctx.primaryBodies) {
      if (d.a) {
        const phase = (hashString(d.id) % 1000) / 1000 * TAU, periodDays = d.period * 365.25, retro = d.retro ? -1 : 1
        const M = phase + sim.direction * retro * sim.days / periodDays * TAU
        const E = keplerE(M, d.e || 0)
        d.node.position.copy(ellipsePosition(d, E))
      }
      if (typeof d.rot === 'number') d.mesh.rotation.y = sim.direction * sim.days / d.rot * TAU
      d.mesh.material.uniforms.uTime.value = sim.days * .12
    }
    for (const d of moonDefs) {
      const phase = (hashString(d.id) % 1000) / 1000 * TAU, retro = d.retro ? -1 : 1
      const M = phase + sim.direction * retro * sim.days / d.periodDays * TAU
      const E = keplerE(M, d.eMoon || 0)
      d.node.position.copy(moonPosition(d, E))
      d.mesh.rotation.y = sim.direction * sim.days / d.rot * TAU
      d.mesh.material.uniforms.uTime.value = sim.days * .12
    }
    for (const d of this.ctx.cometTails) {
      const r = d.node.position.length() / AU, activity = 1 - THREE.MathUtils.smoothstep(r, 2.2, 7.2)
      const dir = d.node.position.clone().normalize()
      for (const [i, t] of d.tails.entries()) {
        t.position.copy(d.node.position)
        t.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)
        if (i === 1) t.rotateY(.06)
        t.material.uniforms.activity.value = activity
        t.visible = activity > .008
      }
    }
    this.ctx.ringMat.uniforms.time.value = sim.days * .02
    this.ctx.asteroidGroup.rotation.y = sim.direction * sim.days / 1680 * TAU
  }

  /* ================================================================
     拾取 / 选中 / 信息面板
     ================================================================ */
  _bindPointer() {
    const el = this.renderer.domElement
    this._onPointerDown = e => { this.dragStart = { x: e.clientX, y: e.clientY } }
    this._onClick = e => {
      if (Math.hypot(e.clientX - this.dragStart.x, e.clientY - this.dragStart.y) > 5) return
      const d = this._pick(e)
      if ((e.shiftKey || this.measureState.active) && d) { this._measurePick(d); return }
      this.selectBody(d)
    }
    this._onDblClick = e => {
      if (this.measureState.active) return
      const d = this._pick(e)
      if (d) { this.selectBody(d); this.focusBody(d) }
    }
    el.addEventListener('pointerdown', this._onPointerDown)
    el.addEventListener('click', this._onClick)
    el.addEventListener('dblclick', this._onDblClick)
  }
  _pick(e) {
    const r = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = (e.clientX - r.left) / r.width * 2 - 1
    this.pointer.y = -(e.clientY - r.top) / r.height * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hit = this.raycaster.intersectObjects(this.ctx.selectable, false)[0]
    return hit?.object.userData.body || null
  }
  selectBody(d) {
    this.selected = d
    document.querySelectorAll('.celestial-label').forEach(x => x.classList.remove('selected'))
    this.ctx.orbitLines.forEach(x => {
      x.material.opacity = x.userData.baseOpacity
      x.material.color.set(this.ctx.objects.get(x.userData.owner)?.color || 0x52677c)
    })
    if (!d) { this._showInfo(null); this.velocityLine.visible = false; this._updateScienceHUD(); return }
    d.node.userData.label?.element.classList.add('selected')
    if (d.orbitLine) { d.orbitLine.material.opacity = .92; d.orbitLine.material.color.set(0xbcefff) }
    this._showInfo(d)
    this._updateScienceHUD()
  }
  _showInfo(d) { this.hooks.onSelect?.(d || null) }

  /* ================================================================
     相机：飞行补间 / 聚焦 / 跟随 / 预设机位
     ================================================================ */
  flyTo(pos, target, duration = 1800) {
    this.flight = { fromP: this.camera.position.clone(), fromT: this.controls.target.clone(), toP: pos.clone(), toT: target.clone(), start: performance.now(), duration }
  }
  _updateFlight(now) {
    if (!this.flight) return
    let t = Math.min(1, (now - this.flight.start) / this.flight.duration)
    t = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    this.camera.position.lerpVectors(this.flight.fromP, this.flight.toP, t)
    this.controls.target.lerpVectors(this.flight.fromT, this.flight.toT, t)
    if (t >= 1) this.flight = null
  }
  focusBody(d) {
    const wp = new THREE.Vector3()
    d.node.getWorldPosition(wp)
    const r = (d.display || d.r * RADII) * (d.scale ? Math.max(...d.scale) : 1)
    const dist = Math.max(r * 7, .22)
    const dir = this.camera.position.clone().sub(this.controls.target).normalize()
    this.flyTo(wp.clone().add(dir.multiplyScalar(dist)).add(new THREE.Vector3(0, r * 1.8, 0)), wp, 1500)
  }
  goView(name) {
    const v = VIEWS[name]
    if (!v) return
    if (v.id) {
      const d = this.ctx.objects.get(v.id), p = new THREE.Vector3()
      d.node.getWorldPosition(p)
      this.selectBody(d)
      this.flyTo(p.clone().add(new THREE.Vector3(...v.offset)), p, 1900)
    } else {
      this.flyTo(new THREE.Vector3(...v.p), new THREE.Vector3(...v.t), 1900)
    }
  }
  reset() {
    this.selectBody(null)
    this.flyTo(new THREE.Vector3(38, 46, 74), new THREE.Vector3(), 1700)
  }
  setFollow(active) {
    if (active && !this.selected) { this._toast('请先选择一个天体'); return }
    this.followTarget = active ? this.selected : null
    this.lastFollowPos = this.followTarget ? this._worldOf(this.followTarget) : null
    this.hooks.onFollowActive?.(!!this.followTarget)
  }
  toggleFollow() { this.setFollow(!this.followTarget) }
  _updateFollow() {
    if (!this.followTarget) return
    const p = this._worldOf(this.followTarget)
    const delta = p.clone().sub(this.lastFollowPos)
    if (!this.flight) { this.camera.position.add(delta); this.controls.target.add(delta) }
    this.lastFollowPos.copy(p)
  }

  /* ================================================================
     电影导览
     ================================================================ */
  setTour(active) {
    this.tourActive = active
    this.hooks.onTourActive?.(active)
    this.nextTour = 0
    if (!active) return
    this._toast('电影导览已启动 · 交互不会被锁定')
  }
  toggleTour() { this.setTour(!this.tourActive) }
  _updateTour(now) {
    if (!this.tourActive || now < this.nextTour) return
    const d = this.ctx.objects.get(TOUR_IDS[this.tourIndex++ % TOUR_IDS.length])
    this.selectBody(d)
    this.focusBody(d)
    this.hooks.onTourCard?.({
      title: `${d.cn} · ${d.en}`,
      text: d.desc || `${d.type}，直径约 ${Number(d.diameter).toLocaleString()} 千米；轨道与表面纹理由实时程序化系统重建。`,
    })
    this.nextTour = now + 7600
  }

  /* ================================================================
     双天体测距（SHIFT+单击 或 测距模式）
     ================================================================ */
  _worldOf(d) { const p = new THREE.Vector3(); d.node.getWorldPosition(p); return p }
  _physicalPositionKm(d) {
    if (!d.parent) return this._worldOf(d).multiplyScalar(AU_KM / AU)
    const parent = this.ctx.objects.get(d.parent)
    const p = this._worldOf(parent).multiplyScalar(AU_KM / AU)
    const local = d.node.position.clone().normalize().multiplyScalar(d.distanceKm || 0)
    const q = new THREE.Quaternion()
    parent.node.getWorldQuaternion(q)
    return p.add(local.applyQuaternion(q))
  }
  _clearMeasure() {
    this.measureState.picks = []
    if (this.measureState.line) {
      this.scene.remove(this.measureState.line)
      this.measureState.line.geometry.dispose()
      this.measureState.line.material.dispose()
      this.measureState.line = null
    }
    if (this.measureState.label) { this.scene.remove(this.measureState.label); this.measureState.label = null }
  }
  _measurePick(d) {
    if (this.measureState.picks.length >= 2) this._clearMeasure()
    this.measureState.picks.push(d)
    this.selectBody(d)
    if (this.measureState.picks.length === 1) { this._toast(`测距起点：${d.cn} · 请选择终点`); return }
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()])
    const m = new THREE.LineDashedMaterial({ color: 0x6df2ff, transparent: true, opacity: .85, dashSize: .25, gapSize: .14, depthWrite: false })
    this.measureState.line = new THREE.Line(g, m)
    this.scene.add(this.measureState.line)
    const el = document.createElement('div')
    el.className = 'measure-label'
    this.measureState.label = new CSS2DObject(el)
    this.scene.add(this.measureState.label)
    this._updateMeasure()
    this._toast(`${this.measureState.picks[0].cn} ↔ ${this.measureState.picks[1].cn}`)
  }
  _updateMeasure() {
    if (this.measureState.picks.length !== 2 || !this.measureState.line) return
    const [a, b] = this.measureState.picks
    const p1 = this._worldOf(a), p2 = this._worldOf(b)
    const arr = this.measureState.line.geometry.attributes.position
    arr.setXYZ(0, p1.x, p1.y, p1.z)
    arr.setXYZ(1, p2.x, p2.y, p2.z)
    arr.needsUpdate = true
    this.measureState.line.computeLineDistances()
    this.measureState.label.position.copy(p1).lerp(p2, .5)
    this.measureState.label.element.textContent = formatDistance(this._physicalPositionKm(a).distanceTo(this._physicalPositionKm(b)))
  }
  toggleMeasure() {
    this.measureState.active = !this.measureState.active
    this.hooks.onMeasureActive?.(this.measureState.active)
    if (!this.measureState.active) this._clearMeasure()
    this._toast(this.measureState.active ? '测距模式：依次点击两颗天体' : '测距模式已关闭')
  }

  /* ================================================================
     科学 HUD / 速度矢量 / 比例尺 / 标签 LOD
     ================================================================ */
  _orbitalTelemetry(d) {
    if (!d) return null
    if (d.parent) {
      const v = d.distanceKm && d.periodDays ? TAU * d.distanceKm / (d.periodDays * 86400) : 0
      return { r: (d.distanceKm || 0) / AU_KM, v, light: (d.distanceKm || 0) / 299792.458, inc: d.incMoon || 0 }
    }
    if (!d.a) return { r: 0, v: 0, light: 0, inc: 0 }
    const r = Math.max(.0001, this._worldOf(d).length() / AU)
    const v = 29.7847 * Math.sqrt(Math.max(0, 2 / r - 1 / d.a))
    return { r, v, light: r * 499.0048, inc: d.inc || 0 }
  }
  _updateScienceHUD() {
    if (!this.selected) { this.hooks.onScienceHud?.('选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距'); return }
    const t = this._orbitalTelemetry(this.selected)
    const range = this.selected.parent ? `${(this.selected.distanceKm || 0).toLocaleString()} km` : `${t.r.toFixed(t.r < 10 ? 3 : 1)} AU`
    this.hooks.onScienceHud?.(`${this.selected.cn}  |  日心/母体距离 ${range}  |  轨道速度 ${t.v.toFixed(2)} km/s  |  光行时 ${t.light < 60 ? t.light.toFixed(2) + ' s' : (t.light / 60).toFixed(1) + ' min'}  |  倾角 ${t.inc.toFixed(2)}°`)
  }
  _updateVelocityVector() {
    if (!this.ctx.scienceLayer.visible || !this.selected) { this.velocityLine.visible = false; return }
    const p = this._worldOf(this.selected)
    const center = this.selected.parent ? this._worldOf(this.ctx.objects.get(this.selected.parent)) : new THREE.Vector3()
    const rad = p.clone().sub(center)
    const axis = new THREE.Vector3(0, 1, 0)
    const tan = new THREE.Vector3().crossVectors(axis, rad).normalize()
      .multiplyScalar((this.selected.retro ? -1 : 1) * Math.max((this.selected.display || this.selected.r * RADII) * 5, this.camera.position.distanceTo(p) * .025))
    const a = this.velocityGeo.attributes.position
    a.setXYZ(0, p.x, p.y, p.z)
    a.setXYZ(1, p.x + tan.x, p.y + tan.y, p.z + tan.z)
    a.needsUpdate = true
    this.velocityLine.visible = true
  }
  _updateScaleRuler() {
    const dist = this.camera.position.distanceTo(this.controls.target)
    const world100 = 2 * Math.tan(this.camera.fov * DEG / 2) * dist / innerHeight * 100
    const au = world100 / AU
    this.hooks.onScaleRuler?.(au >= .01 ? `${au < 10 ? au.toFixed(2) : au.toFixed(0)} AU` : `${Math.max(1, au * AU_KM).toLocaleString(undefined, { maximumFractionDigits: 0 })} km`)
  }
  _updateLabels() {
    const show = this.labelsOn
    for (const d of this.ctx.allData) {
      if (!d.node?.userData.label) continue
      const p = new THREE.Vector3()
      d.node.getWorldPosition(p)
      const dist = this.camera.position.distanceTo(p)
      const r = d.display || d.r * RADII
      const apparent = r / dist
      const isSel = d === this.selected
      let opacity = isSel ? 1 : THREE.MathUtils.smoothstep(apparent, .00010, .004)
      if (d.type === '卫星' && !isSel) opacity *= THREE.MathUtils.smoothstep(apparent, .0008, .006)
      const el = d.node.userData.label.element
      el.style.opacity = show ? String(opacity) : '0'
      el.style.display = opacity < .035 ? 'none' : 'block'
      const s = isSel ? 1 : THREE.MathUtils.clamp(.55 + apparent * 90, .55, 1)
      el.style.fontSize = `${10 * s}px`
    }
  }

  /* ================================================================
     画质（自适应三档）
     ================================================================ */
  applyQuality(tier, silent = false) {
    this.adaptiveTier = THREE.MathUtils.clamp(tier, 0, 2)
    const factor = [.52, .76, 1][this.adaptiveTier]
    const ratio = [1, 1.25, Math.min(devicePixelRatio, 1.6)][this.adaptiveTier]
    this.renderer.setPixelRatio(ratio)
    this.renderer.setSize(innerWidth, innerHeight, false)
    this.composer.setPixelRatio(ratio)
    this.composer.setSize(innerWidth, innerHeight)
    const userStars = this.starDensity / 100
    this.ctx.starField.geometry.setDrawRange(0, Math.floor(STAR_COUNT * userStars * factor))
    this.ctx.kuiper.geometry.setDrawRange(0, Math.floor(KUIPER_COUNT * factor))
    this.ctx.zodiacalDust.geometry.setDrawRange(0, Math.floor(ZODIACAL_COUNT * factor))
    this.bloom.radius = [.42, .64, .82][this.adaptiveTier]
    if (!silent) this._toast(`自适应画质：${['性能', '平衡', '电影'][this.adaptiveTier]}档`)
  }
  _adaptiveCheck(fps, now) {
    if (!this.adaptiveEnabled || now - this.lastAdaptive < 4200) return
    this.lastAdaptive = now
    if (fps < 28 && this.adaptiveTier > 0) this.applyQuality(this.adaptiveTier - 1)
    else if (fps > 52 && this.adaptiveTier < 2) this.applyQuality(this.adaptiveTier + 1)
  }

  /* ================================================================
     Toast / 搜索
     ================================================================ */
  _toast(message) { this.hooks.onToast?.(message) }
  search(q) {
    q = q.trim().toLowerCase()
    if (!q) return []
    return this.ctx.allData
      .filter(d => (d.cn + d.en + (d.aliases || '')).toLowerCase().includes(q))
      .slice(0, 9)
      .map(d => ({ id: d.id, cn: d.cn, en: d.en, type: d.type }))
  }
  selectAndFocus(id) {
    const d = this.ctx.objects.get(id)
    if (!d) return
    this.selectBody(d)
    this.focusBody(d)
  }

  /* ================================================================
     控制面板 API
     ================================================================ */
  setAsteroidVisible(v) {
    this.ctx.asteroidGroup.visible = v
    ;['ceres', 'vesta', 'pallas', 'juno', 'hebe', 'hygiea', 'psyche'].forEach(id => this.ctx.objects.get(id).node.visible = v)
  }
  setKuiperVisible(v) { this.ctx.kuiper.visible = v }
  setOrbitsVisible(v) { this.ctx.orbitLines.forEach(x => x.visible = v) }
  setLabelsVisible(v) { this.labelsOn = v; this.labelRenderer.domElement.style.display = v ? 'block' : 'none' }
  setAtmoVisible(v) { this.ctx.atmospheres.forEach(x => x.visible = v) }
  setScienceVisible(v) {
    this.ctx.scienceLayer.visible = v
    this._updateVelocityVector()
    this._toast(v ? '宜居带与黄道参考层已开启' : '科学参考层已关闭')
  }
  setCinema(v) { this.cinemaPass.enabled = v }
  setAdaptive(v) { this.adaptiveEnabled = v; this._toast(v ? '自适应画质已启用' : '已锁定当前画质') }

  setTimeSpeed(v) { this.sim.speed = v }
  toggleDirection() { this.sim.direction *= -1; this.hooks.onDirection?.(this.sim.direction) }
  setBrightness(v) {
    this.bloom.strength = v
    this.renderer.toneMappingExposure = .72 + v * .27
    this.ambient.intensity = .08 + v * .08
  }
  setStarDensity(v) { this.starDensity = v; this.applyQuality(this.adaptiveTier, true) }

  jumpDays(n) {
    this.sim.days += n
    this.updateBodies()
    this._toast(`模拟时间已跳转 ${n > 0 ? '+' : ''}${n} 日`)
  }
  togglePause() {
    if (this.sim.speed) { this.resumeSpeed = this.sim.speed; this.sim.speed = 0 }
    else { this.sim.speed = this.resumeSpeed }
    this.hooks.onSpeed?.(this.sim.speed)
  }
  goToday() {
    this.sim.days = 0
    this.updateBodies()
    this._toast('已返回 2046-01-01 初始历元')
  }

  /* ================================================================
     窗口尺寸 / 主循环 / 销毁
     ================================================================ */
  _handleResize() {
    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(innerWidth, innerHeight)
    this.composer.setSize(innerWidth, innerHeight)
    this.labelRenderer.setSize(innerWidth, innerHeight)
  }

  start() {
    const tick = now => {
      this._raf = requestAnimationFrame(tick)
      this._animate(now)
    }
    this._raf = requestAnimationFrame(tick)
  }

  _animate(now) {
    const dt = Math.min(.05, (now - this.last) / 1000)
    this.last = now
    this.sim.days += dt * this.sim.speed
    this.sim.date = new Date(EPOCH + this.sim.days * 86400000)
    this.updateBodies()
    this._updateTour(now)
    this._updateFlight(now)
    this._updateFollow()
    this.controls.update()
    this._updateMeasure()
    this._updateVelocityVector()
    this.ctx.starField.material.uniforms.time.value = now * .001
    this.cinemaPass.uniforms.time.value = now * .001
    this.ctx.coronaRays.material.rotation = now * .000018
    this.ctx.solarWindMat.uniforms.time.value = now * .001
    updateMeteors(this.ctx, dt, now)
    this._updateLabels()
    this.composer.render()
    this.labelRenderer.render(this.scene, this.camera)

    this.frames++
    if (now - this.fpsLast > 700) {
      const fps = Math.round(this.frames * 1000 / (now - this.fpsLast))
      this.hooks.onFps?.(fps)
      this._adaptiveCheck(fps, now)
      this.fpsLast = now
      this.frames = 0
    }
    if (now - this.lastUI > 180) {
      this.hooks.onDate?.(this.sim.date.toLocaleString('zh-CN', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replaceAll('/', ' · ') + ' UTC')
      this._updateScienceHUD()
      this.lastUI = now
    }
    if (now - this.lastScale > 450) { this._updateScaleRuler(); this.lastScale = now }
  }

  dispose() {
    cancelAnimationFrame(this._raf)
    removeEventListener('resize', this._onResize)
    const el = this.renderer.domElement
    el.removeEventListener('pointerdown', this._onPointerDown)
    el.removeEventListener('click', this._onClick)
    el.removeEventListener('dblclick', this._onDblClick)
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
