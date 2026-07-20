import * as THREE from 'three'
import { orbitPos } from '../math.js'

/* ============ 升级：八大行星轨迹拖尾（解析开普勒采样，帧率无关） ============ */
const TRAIL_N = 200
const _tp = new THREE.Vector3()

export function createTrails(ctx) {
  const trailGroup = new THREE.Group()
  ctx.scene.add(trailGroup)
  ctx.trailGroup = trailGroup
  ctx.trails = []
  for (const id of ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']) {
    const b = ctx.bodyById[id]
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL_N * 3), 3))
    const cols = new Float32Array(TRAIL_N * 3)
    const c = new THREE.Color(b.def.color)
    for (let k = 0; k < TRAIL_N; k++) {
      const f = 1 - k / (TRAIL_N - 1)
      cols[k * 3] = c.r * f * f; cols[k * 3 + 1] = c.g * f * f; cols[k * 3 + 2] = c.b * f * f
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3))
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true,
      opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }))
    line.frustumCulled = false
    trailGroup.add(line)
    ctx.trails.push({ b, g, dt: b.orbit.period / TRAIL_N })
  }
}

export function updateTrails(ctx) {
  for (const T of ctx.trails) {
    const attr = T.g.attributes.position
    for (let k = 0; k < TRAIL_N; k++) { // k=0 为当前位置，向过去回溯一整圈
      orbitPos(T.b.orbit, ctx.sim.motionDays - k * T.dt, _tp)
      attr.setXYZ(k, _tp.x, _tp.y, _tp.z)
    }
    attr.needsUpdate = true
  }
}
