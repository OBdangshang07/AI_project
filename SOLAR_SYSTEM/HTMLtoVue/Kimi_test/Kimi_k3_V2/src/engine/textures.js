import * as THREE from 'three'

/* ============ 材质工厂：canvas 程序化纹理（带缓存） ============ */
const TEX_CACHE = {}

// 径向渐变光晕纹理
export function makeGlowTex(stops) {
  const key = stops.map(s => s[0] + ':' + s[1]).join('|')
  if (TEX_CACHE[key]) return TEX_CACHE[key]
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  for (const s of stops) grd.addColorStop(s[0], s[1])
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  TEX_CACHE[key] = tex
  return tex
}

// 升级：水平拖尾纹理（太阳耀斑用），垂直方向羽化
export function makeStreakTex() {
  if (TEX_CACHE.streak) return TEX_CACHE.streak
  const c = document.createElement('canvas'); c.width = 512; c.height = 64
  const g = c.getContext('2d')
  const gh = g.createLinearGradient(0, 0, 512, 0)
  gh.addColorStop(0.00, 'rgba(255,240,200,0)')
  gh.addColorStop(0.50, 'rgba(255,220,150,0.85)')
  gh.addColorStop(1.00, 'rgba(255,180,80,0)')
  g.fillStyle = gh; g.fillRect(0, 0, 512, 64)
  g.globalCompositeOperation = 'destination-in'
  const gv = g.createLinearGradient(0, 0, 0, 64)
  gv.addColorStop(0, 'rgba(255,255,255,0)')
  gv.addColorStop(0.5, 'rgba(255,255,255,1)')
  gv.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = gv; g.fillRect(0, 0, 512, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  TEX_CACHE.streak = tex
  return tex
}
