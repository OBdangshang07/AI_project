import * as THREE from 'three'

/* ============ 常量与轨道数学（与原单文件版完全一致） ============ */
export const TAU = Math.PI * 2
export const AU = 10
export const RADII = 0.04
export const DEG = Math.PI / 180
export const AU_KM = 149597870.7

export function ellipsePosition(d, angle) {
  const a = d.a * AU, e = d.e || 0, b = a * Math.sqrt(1 - e * e)
  const x = a * (Math.cos(angle) - e), z = b * Math.sin(angle)
  const inc = (d.inc || 0) * DEG
  return new THREE.Vector3(x, -z * Math.sin(inc), z * Math.cos(inc))
}
export function keplerE(M, e) {
  M = ((M % TAU) + TAU) % TAU
  let E = e < .8 ? M : Math.PI
  for (let i = 0; i < 6; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  return E
}
export function moonPosition(d, E) {
  const e = d.eMoon || 0, a = d.aMoon, b = a * Math.sqrt(1 - e * e)
  const x = a * (Math.cos(E) - e), z = b * Math.sin(E)
  const inc = (d.incMoon || 0) * DEG
  return new THREE.Vector3(x, -z * Math.sin(inc), z * Math.cos(inc))
}
export function hashString(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}
export function formatDistance(km) {
  if (km > AU_KM * .02) return `${(km / AU_KM).toFixed(km > AU_KM ? 3 : 5)} AU · ${(km / AU_KM * 499.0048 / 60).toFixed(1)} 光分`
  if (km > 1e5) return `${Math.round(km).toLocaleString()} km · ${(km / 299792.458).toFixed(2)} 光秒`
  return `${km.toFixed(km < 100 ? 1 : 0)} km`
}
