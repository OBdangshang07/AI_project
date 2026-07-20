import * as THREE from 'three'
import { PLANET_VERT, PLANET_FRAG, ATMO_VERT, ATMO_FRAG, RING_VERT, RING_FRAG } from './shaders.js'

/* ============ 材质工厂 ============ */

// 统一行星着色材质（uType 选择星球种类，uTint 微调色调）
export function makePlanetMaterial(sh, tint) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uType: { value: sh },
      uSunPos: { value: new THREE.Vector3() },
      uTint: { value: tint ? new THREE.Vector3(tint[0], tint[1], tint[2]) : new THREE.Vector3(1, 1, 1) },
    },
    vertexShader: PLANET_VERT, fragmentShader: PLANET_FRAG,
  })
}

// 大气菲涅尔外壳（背面 + 加色混合 → 边缘辉光）
export function makeAtmo(colorHex, scale, pw, inten) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(colorHex) }, uPow: { value: pw }, uInt: { value: inten } },
    vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG,
    transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
  })
  return { mat, scale }
}

// 行星环（含卡西尼缝与行星本影 uniforms）
export function makeRing(rPlanet, innerMul, outerMul, alpha) {
  const geo = new THREE.RingGeometry(rPlanet * innerMul, rPlanet * outerMul, 160, 1)
  geo.rotateX(-Math.PI / 2) // 注意：着色器读的是几何属性 position（旋转前 XY 平面）
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uInner: { value: rPlanet * innerMul }, uOuter: { value: rPlanet * outerMul }, uAlpha: { value: alpha },
      uSunLocal: { value: new THREE.Vector3(1, 0, 0) }, uPlanetR: { value: rPlanet },
    },
    vertexShader: RING_VERT, fragmentShader: RING_FRAG,
    transparent: true, side: THREE.DoubleSide, depthWrite: false,
  })
  return new THREE.Mesh(geo, mat)
}
