import * as THREE from 'three'
import { bodyVertex, bodyFragment, ATMO_VERT, ATMO_FRAG } from './shaders.js'

/* ============ 材质工厂（与原单文件版一致） ============ */

// 统一行星/太阳着色材质
export function bodyMaterial(type, tint = 0xffffff) {
  return new THREE.ShaderMaterial({
    vertexShader: bodyVertex, fragmentShader: bodyFragment,
    uniforms: {
      uTime: { value: 0 }, uSeed: { value: Math.random() * 100 },
      uType: { value: type }, uTint: { value: new THREE.Color(tint) },
      uSun: { value: new THREE.Vector3() },
    },
    extensions: { derivatives: true },
  })
}

// 大气菲涅尔外壳（背面 + 加色混合）
export const atmoMat = (color, power = 3, intensity = 1) => new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
  vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG,
  uniforms: { c: { value: new THREE.Color(color) }, power: { value: power }, intensity: { value: intensity } },
})
