import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { TAU, DEG, RADII, hashString, ellipsePosition, moonPosition } from '../math.js'
import { bodyMaterial, atmoMat } from '../materials.js'
import { bodyDefs, moonDefs } from '../data/bodies.js'

/* ============ 天体构建（与原单文件版一致） ============ */

export function makeOrbit(ctx, d, isMoon = false, parent = null) {
  const pts = []
  for (let i = 0; i <= 256; i++) {
    let a = TAU * i / 256
    if (isMoon) pts.push(moonPosition(d, a))
    else pts.push(ellipsePosition(d, a))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  const faint = d.type.includes('矮') || d.type.includes('彗星') || d.type.includes('小行星') || d.type.includes('海王星外')
  const mat = new THREE.LineDashedMaterial({ color: d.color || 0x52677c, transparent: true, opacity: faint ? .15 : .34, dashSize: isMoon ? .05 : (faint ? .30 : .18), gapSize: isMoon ? .035 : (faint ? .25 : .12), depthWrite: false })
  const line = new THREE.Line(geo, mat)
  line.computeLineDistances()
  line.userData.owner = d.id
  line.userData.baseOpacity = mat.opacity
  ;(parent || ctx.scene).add(line)
  ctx.orbitLines.push(line)
  return line
}

export function addLabel(host, d, kind = '') {
  const el = document.createElement('div')
  el.className = 'celestial-label ' + kind
  el.textContent = d.cn + ' · ' + d.en
  const label = new CSS2DObject(el)
  label.position.set(0, (d.display || d.r * RADII) + .12, 0)
  host.add(label)
  host.userData.label = label
  return label
}

export function roughen(geo, seed, amount = .16) {
  const a = geo.attributes.position
  for (let i = 0; i < a.count; i++) {
    const n = .5 + .5 * Math.sin(i * 91.73 + seed * 17.1) * Math.sin(i * 17.31 + seed)
    const v = new THREE.Vector3().fromBufferAttribute(a, i).multiplyScalar(1 + (n - .5) * amount)
    a.setXYZ(i, v.x, v.y, v.z)
  }
  a.needsUpdate = true
  geo.computeVertexNormals()
}

export function irregularGeometry(seed) {
  const g = new THREE.IcosahedronGeometry(.055, 1), a = g.attributes.position
  for (let i = 0; i < a.count; i++) {
    const x = Math.sin(i * 12.9898 + seed * 7.31) * 43758.5453 % 1
    const f = .62 + Math.abs(x) * .56
    a.setXYZ(i, a.getX(i) * f, a.getY(i) * f, a.getZ(i) * f)
  }
  g.computeVertexNormals()
  return g
}

export function createBody(ctx, d) {
  const visual = d.display || d.r * RADII
  const seg = d.shader === 0 ? 96 : (visual < .07 ? 28 : Math.min(64, 36 + Math.floor(visual * 18)))
  const geo = new THREE.SphereGeometry(visual, seg, Math.max(18, seg / 2))
  if (d.irregular) roughen(geo, hashString(d.id), .28)
  const mesh = new THREE.Mesh(geo, bodyMaterial(d.shader, d.color))
  mesh.name = d.cn
  mesh.userData.body = d
  mesh.renderOrder = d.shader === 0 ? 2 : 1
  const node = new THREE.Group()
  node.userData.body = d
  node.add(mesh)
  node.rotation.z = (d.tilt || 0) * DEG
  if (d.scale) mesh.scale.set(...d.scale)
  if (d.bilobed) {
    mesh.scale.set(.68, .64, .62)
    mesh.position.x = -visual * .34
    const lobe = new THREE.Mesh(geo.clone(), mesh.material)
    lobe.scale.set(.47, .52, .49)
    lobe.position.x = visual * .72
    lobe.userData.body = d
    mesh.add(lobe)
    ctx.selectable.push(lobe)
  }
  ctx.scene.add(node)
  d.node = node; d.mesh = mesh
  ctx.objects.set(d.id, d)
  ctx.selectable.push(mesh)
  const hitR = Math.max(visual, visual < .12 ? .12 : visual * 1.06)
  if (hitR > visual * 1.2) {
    const hit = new THREE.Mesh(new THREE.SphereGeometry(hitR, 12, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
    hit.userData.body = d
    node.add(hit)
    ctx.selectable.push(hit)
  }
  addLabel(node, d, d.type.includes('矮') || d.a > 30 ? 'dwarf' : '')
  if (d.a > 0) d.orbitLine = makeOrbit(ctx, d)
  if (d.atmo) {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(visual * d.atmo[1], 48, 32), atmoMat(d.atmo[0], d.atmo[2], d.atmo[3]))
    node.add(shell)
    ctx.atmospheres.push(shell)
    d.atmosphere = shell
  }
  return d
}

export function createMoon(ctx, d) {
  const parent = ctx.objects.get(d.parent), visual = d.display || d.r * RADII
  const geo = new THREE.SphereGeometry(visual, visual < .05 ? 24 : 36, 20)
  if (d.irregular) roughen(geo, hashString(d.id), .3)
  const mesh = new THREE.Mesh(geo, bodyMaterial(d.shader, d.color))
  mesh.userData.body = d
  mesh.name = d.cn
  if (d.scale) mesh.scale.set(...d.scale)
  const node = new THREE.Group()
  node.add(mesh)
  parent.node.add(node)
  d.node = node; d.mesh = mesh
  ctx.objects.set(d.id, d)
  ctx.selectable.push(mesh)
  const hit = new THREE.Mesh(new THREE.SphereGeometry(Math.max(visual, .055), 10, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
  hit.userData.body = d
  node.add(hit)
  ctx.selectable.push(hit)
  addLabel(node, d, 'moon')
  d.orbitLine = makeOrbit(ctx, d, true, parent.node)
  if (d.atmo) {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(visual * d.atmo[1], 36, 22), atmoMat(d.atmo[0], d.atmo[2], d.atmo[3]))
    node.add(shell)
    ctx.atmospheres.push(shell)
    d.atmosphere = shell
  }
  return d
}

export function buildBodies(ctx) {
  bodyDefs.forEach(d => createBody(ctx, d))
  moonDefs.forEach(d => createMoon(ctx, d))
}

// Vesta and Pallas as named irregular objects
export function namedAsteroid(ctx, id, cn, en, a, e, inc, shader, display) {
  const d = { id, cn, en, type: '小行星', shader, r: display / RADII, display, diameter: id === 'vesta' ? 525 : 513, a, e, inc, rot: id === 'vesta' ? .222 : .325, period: id === 'vesta' ? 3.63 : 4.62, temp: '约 −188°C — −3°C', moons: 0, color: id === 'vesta' ? 0xaaa8a0 : 0x696764, desc: '小行星带中的大型原行星残骸，表面保留着早期太阳系的碰撞历史。' }
  ctx.allData.push(d)
  createBody(ctx, d)
  d.mesh.geometry = irregularGeometry(Math.random() * 9)
  d.mesh.scale.setScalar(display / .055)
  d.mesh.material = bodyMaterial(shader, d.color)
  return d
}
