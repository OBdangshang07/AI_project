import * as THREE from 'three'
import { rand } from '../math.js'
import { METEOR_VERT, METEOR_FRAG } from '../shaders.js'

/* ============ 流星（对象池：随机金色拖尾划破天幕） ============ */
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3()
const _X = new THREE.Vector3(1, 0, 0)

export function createMeteors(ctx) {
  ctx.meteors = []
  const geo = new THREE.PlaneGeometry(1, 1)
  for (let k = 0; k < 6; k++) {
    const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: { uOpacity: { value: 0 } },
      vertexShader: METEOR_VERT, fragmentShader: METEOR_FRAG,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
    m.visible = false
    m.frustumCulled = false
    ctx.scene.add(m)
    ctx.meteors.push({ m, life: 0, dur: 1, vel: new THREE.Vector3(), active: false })
  }
}

export function updateMeteors(ctx, dt) {
  if (Math.random() < dt * 0.25) { // 平均约每 4 秒一颗
    const mt = ctx.meteors.find(x => !x.active)
    if (mt) {
      mt.active = true; mt.life = 0; mt.dur = rand(0.6, 1.3)
      _v.set(rand(-1, 1), rand(-0.4, 0.8), rand(-1, 1)).normalize().multiplyScalar(rand(1400, 2400))
      mt.m.position.copy(_v)
      mt.vel.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(700, 1300))
      // 平面 X 轴对齐速度方向，拖尾长度随机
      _v2.copy(mt.vel).normalize()
      mt.m.quaternion.setFromUnitVectors(_X, _v2)
      mt.m.scale.set(rand(140, 300), 2.2, 1)
      mt.m.visible = true
    }
  }
  for (const mt of ctx.meteors) {
    if (!mt.active) continue
    mt.life += dt
    const t = mt.life / mt.dur
    if (t >= 1) { mt.active = false; mt.m.visible = false; continue }
    mt.m.position.addScaledVector(mt.vel, dt)
    mt.m.material.uniforms.uOpacity.value = Math.sin(Math.PI * t) * 0.9
  }
}
