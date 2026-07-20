import * as THREE from 'three'

/* ============ 工具函数（与原单文件版完全一致） ============ */
export const TAU = Math.PI * 2
export const DEG = Math.PI / 180
export const V = (x, y, z) => new THREE.Vector3(x, y, z)
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x))
export const easeIO = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
export const fmtInt = n => Math.round(n).toLocaleString('en-US')
export const rand = (a, b) => a + Math.random() * (b - a)

// 轨道距离幂律压缩以适配视野；天体大小保持单调比例
export const AU2D = au => 30 * Math.pow(au, 0.8)
export const RSIZE = km => Math.max(0.32, 1.6 * Math.pow(km / 12742, 0.55))
export function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s) }

// 时间倍率滑杆映射：0 → 暂停, 100 → ≈1000x
export const sliderScale = v => v <= 0 ? 0 : Math.pow(10, v * 0.03) - 1

export function keplerE(M, e) {
  let E = M + e * Math.sin(M)
  for (let k = 0; k < 4; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  return E
}

const _X = new THREE.Vector3(1, 0, 0), _Y = new THREE.Vector3(0, 1, 0)
export function orbitPosFromM(o, M, out) {
  const E = keplerE(M, o.e)
  const x = o.a * (Math.cos(E) - o.e)
  const z = o.a * Math.sqrt(1 - o.e * o.e) * Math.sin(E)
  out.set(x, 0, z)
  out.applyAxisAngle(_Y, o.peri)
  out.applyAxisAngle(_X, o.i)
  out.applyAxisAngle(_Y, o.node)
  return out
}
export function orbitPos(o, tDays, out) {
  return orbitPosFromM(o, o.M0 + TAU / o.period * tDays, out)
}
