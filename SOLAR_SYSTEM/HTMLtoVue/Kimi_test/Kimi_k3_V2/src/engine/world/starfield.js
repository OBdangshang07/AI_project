import * as THREE from 'three'
import { rand } from '../math.js'
import { STAR_VERT, STAR_FRAG, BG_VERT, BG_FRAG } from '../shaders.js'

/* ============ 背景星空（8500 点，闪烁 + 色温 + 密度可调） ============ */
export const STAR_N = 8500
const _v = new THREE.Vector3()

export function createStarfield(ctx) {
  const pos = new Float32Array(STAR_N * 3), size = new Float32Array(STAR_N), phase = new Float32Array(STAR_N), col = new Float32Array(STAR_N * 3)
  const palette = [[0.72, 0.80, 1.0], [1, 1, 1], [1, 0.95, 0.85], [1, 0.85, 0.65], [1, 0.7, 0.5], [0.9, 0.92, 1]]
  for (let k = 0; k < STAR_N; k++) {
    _v.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(4200, 8500))
    pos[k * 3] = _v.x; pos[k * 3 + 1] = _v.y; pos[k * 3 + 2] = _v.z
    size[k] = rand(0.8, 2.6)
    phase[k] = Math.random()
    const c = palette[(Math.random() * palette.length) | 0]
    const b = rand(0.45, 1.0)
    col[k * 3] = c[0] * b; col[k * 3 + 1] = c[1] * b; col[k * 3 + 2] = c[2] * b
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
  starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
  starGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
  const starMat = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
    vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  const stars = new THREE.Points(starGeo, starMat)
  stars.frustumCulled = false
  ctx.scene.add(stars)
  ctx.starGeo = starGeo
  ctx.starMat = starMat
}

/* ============ 深空背景球 ============ */
export function createBackground(ctx) {
  const bg = new THREE.Mesh(new THREE.SphereGeometry(11500, 48, 32),
    new THREE.ShaderMaterial({ vertexShader: BG_VERT, fragmentShader: BG_FRAG, side: THREE.BackSide, depthWrite: false }))
  bg.frustumCulled = false
  ctx.scene.add(bg)
}
