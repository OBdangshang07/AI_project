import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { TAU, DEG, AU2D, RSIZE, hash3, orbitPosFromM } from '../math.js'
import { makePlanetMaterial, makeAtmo, makeRing } from '../materials.js'
import { BODY_DEFS } from '../data/bodyDefs.js'

/* ============ 天体构建 ============ */
const _v = new THREE.Vector3()

export function buildOrbitPositions(orbit, seg) {
  const pts = new Float32Array((seg + 1) * 3)
  const tmp = new THREE.Vector3()
  for (let k = 0; k <= seg; k++) {
    orbitPosFromM(orbit, TAU * k / seg, tmp)
    pts[k * 3] = tmp.x; pts[k * 3 + 1] = tmp.y; pts[k * 3 + 2] = tmp.z
  }
  return pts
}

export function makeOrbitLine(orbit, def, isMoon) {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(buildOrbitPositions(orbit, 256), 3))
  const isDwarf = def.cat === '矮行星' || def.cat === '彗星'
  const mat = isDwarf
    ? new THREE.LineDashedMaterial({ color: def.color, dashSize: 1.8, gapSize: 1.4, transparent: true, opacity: isMoon ? 0.10 : 0.22 })
    : new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: isMoon ? 0.10 : 0.32 })
  const line = new THREE.Line(geo, mat)
  if (isDwarf) line.computeLineDistances()
  line.frustumCulled = false
  return line
}

function createBody(ctx, def, idx) {
  const r = def.fixedR || RSIZE(def.km)
  const b = { def, r, baseR: r, mat: null, mesh: null, holder: new THREE.Group(),
              tiltG: new THREE.Group(), sizeG: new THREE.Group(), orbit: null, orbitLine: null,
              label: null, atmoMesh: null, ringMesh: null, spin: 0 }
  b.holder.add(b.tiltG)
  b.tiltG.rotation.z = (def.tilt || 0) * DEG
  b.tiltG.add(b.sizeG)

  // 球体（irregular=顶点随机扰动；elongate=椭球拉伸，如妊神星/爱神星）
  const seg = r > 3 ? [64, 44] : (r > 1 ? [48, 32] : [28, 20])
  const geo = new THREE.SphereGeometry(r, seg[0], seg[1])
  if (def.elongate) geo.scale(def.elongate[0], def.elongate[1], def.elongate[2])
  if (def.irregular) {
    const pos = geo.attributes.position
    for (let k = 0; k < pos.count; k++) {
      _v.fromBufferAttribute(pos, k)
      const n = 1 + def.irregular * (hash3(_v.x * 3.1, _v.y * 3.7, _v.z * 4.3) - 0.5) * 2
      _v.multiplyScalar(n)
      pos.setXYZ(k, _v.x, _v.y, _v.z)
    }
    geo.computeVertexNormals()
  }
  b.mat = makePlanetMaterial(def.sh, def.tint)
  b.mesh = new THREE.Mesh(geo, b.mat)
  b.mesh.userData.body = b
  b.sizeG.add(b.mesh)
  ctx.pickables.push(b.mesh)

  if (def.atmo) {
    const a = makeAtmo(def.atmo.c, def.atmo.s, def.atmo.p, def.atmo.i)
    b.atmoMesh = new THREE.Mesh(new THREE.SphereGeometry(r * a.scale, 40, 28), a.mat)
    b.sizeG.add(b.atmoMesh)
  }
  if (def.ring) {
    b.ringMesh = makeRing(r, def.ring.inner, def.ring.outer, def.ring.alpha)
    b.sizeG.add(b.ringMesh)
  }

  // CSS2D 名称标签
  const el = document.createElement('div')
  el.className = 'lbl'
  el.textContent = def.name
  b.label = new CSS2DObject(el)
  b.label.position.set(0, r * 1.7 + 0.6, 0)
  b.holder.add(b.label)

  // 轨道参数（卫星 orbitR 已是场景单位；行星 AU → 压缩距离）
  if (def.parent || def.au) {
    const isMoon = !!def.parent
    b.orbit = {
      a: isMoon ? def.orbitR : AU2D(def.au),
      e: def.e || 0, i: (def.i || 0) * DEG,
      peri: hash3(idx, 3, 7) * TAU, node: hash3(idx, 11, 5) * TAU,
      period: def.per, M0: def.M0fix !== undefined ? def.M0fix : hash3(idx, 17, 23) * TAU,
    }
    b.orbitLine = makeOrbitLine(b.orbit, def, isMoon)
    ctx.orbitLines.push({ line: b.orbitLine, body: b })
  }
  b.spin = def.rotH ? TAU / (def.rotH / 24) : (def.per ? TAU / def.per : 0) // 弧度/天
  ctx.bodies.push(b)
  ctx.bodyById[def.id] = b
  return b
}

// 两遍构建：先全部创建，再把卫星挂到宿主 holder
export function buildBodies(ctx) {
  BODY_DEFS.forEach((def, idx) => createBody(ctx, def, idx))
  for (const b of ctx.bodies) {
    const pid = b.def.parent
    if (pid) {
      const parent = ctx.bodyById[pid]
      parent.holder.add(b.holder)
      if (b.orbitLine) parent.holder.add(b.orbitLine)
    } else if (b.def.id !== 'sun') {
      ctx.scene.add(b.holder)
      if (b.orbitLine) ctx.scene.add(b.orbitLine)
    } else {
      ctx.scene.add(b.holder)
    }
  }
  ctx.sunBody = ctx.bodyById.sun
}
