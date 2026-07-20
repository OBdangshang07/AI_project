import * as THREE from 'three'
import { clamp, rand } from '../math.js'
import { makeGlowTex } from '../textures.js'

/* ============ 升级：哈雷彗星 —— 彗发 + 双彗尾 ============ */
export function createComet(ctx) {
  const comet = ctx.bodyById.halley
  // 蓝白彗发
  const comaMat = new THREE.SpriteMaterial({
    map: makeGlowTex([[0, 'rgba(220,235,255,0.95)'], [0.3, 'rgba(170,205,255,0.45)'], [1, 'rgba(120,170,255,0)']]),
    transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  comet.coma = new THREE.Sprite(comaMat)
  comet.coma.scale.set(2.2, 2.2, 1)
  comet.holder.add(comet.coma)

  // 两条粒子尾：离子尾（蓝、细直）与尘埃尾（黄白、弯曲）
  const NT = 220
  comet.tails = []
  for (const kind of ['ion', 'dust']) {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NT * 3), 3))
    const cols = new Float32Array(NT * 3)
    for (let k = 0; k < NT; k++) {
      const t = k / (NT - 1), f = 1 - t
      if (kind === 'ion') { cols[k * 3] = 0.45 * f + 0.05; cols[k * 3 + 1] = 0.65 * f + 0.08; cols[k * 3 + 2] = 1.0 * f + 0.15 }
      else { cols[k * 3] = 1.0 * f + 0.06; cols[k * 3 + 1] = 0.85 * f + 0.05; cols[k * 3 + 2] = 0.55 * f + 0.03 }
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3))
    const m = new THREE.PointsMaterial({ size: kind === 'ion' ? 0.32 : 0.5, vertexColors: true, transparent: true,
      opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true })
    const pts = new THREE.Points(g, m)
    pts.frustumCulled = false
    ctx.scene.add(pts)
    const spread = new Float32Array(NT * 2)
    for (let k = 0; k < NT * 2; k++) spread[k] = rand(-1, 1)
    comet.tails.push({ pts, m, g, kind, spread })
  }
  comet.velPrev = new THREE.Vector3()
  comet.hasVelPrev = false
  ctx.comet = comet
}

const _cv = new THREE.Vector3(), _cv2 = new THREE.Vector3(), _cv3 = new THREE.Vector3()
export function updateComet(ctx) {
  const comet = ctx.comet
  // 活动度：距太阳越近彗发越亮、彗尾越长（150 单位外基本休眠）
  const r = comet.holder.position.length()
  const act = clamp((150 - r) / 90, 0, 1)
  comet.coma.material.opacity = act * 0.5
  const Lioni = 2 + act * 19, Ldust = 1.5 + act * 10
  _cv.copy(comet.holder.position).normalize()          // 径向（尾沿反日方向，局部即向外）
  // 差分求速度方向（尘埃尾因轨道运动滞后而弯曲）
  if (comet.hasVelPrev) { _cv2.copy(comet.holder.position).sub(comet.velPrev) }
  else _cv2.set(0, 0, 0)
  comet.velPrev.copy(comet.holder.position)
  comet.hasVelPrev = true
  const vlen = _cv2.length()
  if (vlen > 1e-6) _cv2.divideScalar(vlen)
  for (const T of comet.tails) {
    const attr = T.g.attributes.position
    const L = T.kind === 'ion' ? Lioni : Ldust
    T.m.opacity = act < 0.02 ? 0 : act * (T.kind === 'ion' ? 0.42 : 0.28)
    T.pts.visible = act >= 0.02
    if (!T.pts.visible) continue
    const wp = comet.holder.getWorldPosition(_cv3)
    for (let k = 0; k < 220; k++) {
      const t = k / 219
      let px = wp.x + _cv.x * t * L, py = wp.y + _cv.y * t * L, pz = wp.z + _cv.z * t * L
      if (T.kind === 'dust') { // 弯曲：叠加反向速度分量
        const bend = t * t * Ldust * 0.6
        px -= _cv2.x * bend; py -= _cv2.y * bend; pz -= _cv2.z * bend
      }
      const sw = (T.kind === 'ion' ? 0.10 : 0.35) * t * L * 0.15
      px += T.spread[k * 2] * sw; py += T.spread[k * 2 + 1] * sw * 0.6; pz += T.spread[(k * 2 + 37) % 440] * sw
      attr.setXYZ(k, px, py, pz)
    }
    attr.needsUpdate = true
  }
}
