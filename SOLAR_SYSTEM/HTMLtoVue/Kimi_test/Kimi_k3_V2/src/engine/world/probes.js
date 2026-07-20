import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { TAU, DEG, AU2D, hash3, rand } from '../math.js'
import { makeGlowTex } from '../textures.js'
import { makeOrbitLine } from './bodies.js'

/* ============ 升级：深空探测器（真实位置） ============ */
function createProbe(ctx, def) {
  const b = { def, r: 0.24, baseR: 0.24, holder: new THREE.Group(), orbit: null, orbitLine: null, spin: 0 }
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0xffe9a0 }))
  mesh.userData.body = b
  b.mesh = mesh
  b.holder.add(mesh)
  ctx.pickables.push(mesh)
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex([[0, 'rgba(255,240,200,0.9)'], [1, 'rgba(255,220,140,0)']]),
    transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }))
  sp.scale.set(2.4, 2.4, 1)
  b.holder.add(sp)
  const el = document.createElement('div')
  el.className = 'lbl'
  el.textContent = def.name
  b.label = new CSS2DObject(el)
  b.label.position.set(0, 1.2, 0)
  b.holder.add(b.label)
  if (def.parent) { // 朱诺号：绕木星的大椭圆极轨
    b.orbit = { a: def.orbitR, e: def.e, i: def.i * DEG, peri: 0, node: hash3(9, 1, 4) * TAU, period: def.per, M0: rand(0, TAU) }
    b.orbitLine = makeOrbitLine(b.orbit, { color: 0xffe9a0, cat: '探测器' }, true)
    const p = ctx.bodyById[def.parent]
    p.tiltG.add(b.holder)
    p.tiltG.add(b.orbitLine)
  } else {        // 静态深空位置
    b.holder.position.set(def.dir[0], def.dir[1], def.dir[2]).normalize().multiplyScalar(AU2D(def.auDist))
    ctx.scene.add(b.holder)
  }
  ctx.bodies.push(b)
  ctx.bodyById[def.id] = b
  return b
}

export function createProbes(ctx) {
  createProbe(ctx, { id: 'voyager1', name: '旅行者1号', en: 'Voyager 1', cat: '探测器', auDist: 162, dir: [0.72, 0.58, -0.38],
    smaText: '约 162 AU · 星际空间', temp: '—', moons: '—', km: '—', labelMax: 2200 })
  createProbe(ctx, { id: 'voyager2', name: '旅行者2号', en: 'Voyager 2', cat: '探测器', auDist: 136, dir: [-0.62, -0.55, 0.56],
    smaText: '约 136 AU · 日鞘', temp: '—', moons: '—', km: '—', labelMax: 2200 })
  createProbe(ctx, { id: 'newhorizons', name: '新视野号', en: 'New Horizons', cat: '探测器', auDist: 58, dir: [0.82, -0.05, 0.58],
    smaText: '约 58 AU · 柯伊伯带', temp: '—', moons: '—', km: '—', labelMax: 1600 })
  createProbe(ctx, { id: 'junoProbe', name: '朱诺号', en: 'Juno (spacecraft)', cat: '探测器', parent: 'jupiter',
    orbitR: 8.6, e: 0.45, i: 90, per: 43, smaKm: 816000, temp: '—', moons: '—', km: '—', labelMax: 70 })
}
