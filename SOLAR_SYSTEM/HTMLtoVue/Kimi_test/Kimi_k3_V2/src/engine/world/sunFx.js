import * as THREE from 'three'
import { rand } from '../math.js'
import { makeGlowTex, makeStreakTex } from '../textures.js'
import { WIND_VERT, WIND_FRAG } from '../shaders.js'

/* ============ 太阳多层光晕 + 太阳风 + 耀斑 ============ */
export function createSunFx(ctx) {
  const sunBody = ctx.sunBody
  const r = sunBody.r
  const glows = [
    { s: r * 3.0,  stops: [[0, 'rgba(255,250,230,1)'], [0.25, 'rgba(255,210,120,0.85)'], [0.6, 'rgba(255,150,40,0.28)'], [1, 'rgba(255,120,20,0)']], o: 0.95 }, // 内冕
    { s: r * 6.5,  stops: [[0, 'rgba(255,200,110,0.55)'], [0.4, 'rgba(255,160,60,0.20)'], [1, 'rgba(255,120,30,0)']], o: 0.6 }, // 外冕
    { s: r * 9.0,  stops: [[0, 'rgba(255,170,80,0.13)'], [0.5, 'rgba(255,140,50,0.05)'], [1, 'rgba(255,120,30,0)']], o: 0.38 }, // 弥散辉光（收敛半径，避免淹没内太阳系）
  ]
  for (const g of glows) {
    const sm = new THREE.SpriteMaterial({ map: makeGlowTex(g.stops), transparent: true, opacity: g.o,
      blending: THREE.AdditiveBlending, depthWrite: false })
    const sp = new THREE.Sprite(sm)
    sp.scale.set(g.s, g.s, 1)
    sunBody.holder.add(sp)
  }
  // 升级：太阳耀斑（水平拖尾 Sprite，缓慢旋转闪烁）
  const fl = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeStreakTex(), transparent: true,
    opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, rotation: 0.35 }))
  fl.scale.set(r * 13, r * 1.8, 1)
  sunBody.holder.add(fl)
  sunBody.flare = fl

  // 太阳风粒子流
  const NW = 900
  const wg = new THREE.BufferGeometry()
  const dirs = new Float32Array(NW * 3), seeds = new Float32Array(NW)
  const v = new THREE.Vector3()
  for (let k = 0; k < NW; k++) {
    v.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize()
    dirs[k * 3] = v.x; dirs[k * 3 + 1] = v.y; dirs[k * 3 + 2] = v.z
    seeds[k] = Math.random()
  }
  wg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NW * 3), 3)) // 占位
  wg.setAttribute('aDir', new THREE.BufferAttribute(dirs, 3))
  wg.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const wm = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uR: { value: r } },
    vertexShader: WIND_VERT, fragmentShader: WIND_FRAG,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  })
  const wind = new THREE.Points(wg, wm)
  wind.frustumCulled = false
  sunBody.holder.add(wind)
  sunBody.windMat = wm
}
