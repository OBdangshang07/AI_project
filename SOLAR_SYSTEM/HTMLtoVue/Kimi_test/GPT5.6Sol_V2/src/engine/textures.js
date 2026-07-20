import * as THREE from 'three'

/* ============ 程序化 canvas 纹理（与原单文件版一致） ============ */

// Solar corona: 径向渐变光晕
export function glowTexture(size = 256) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const x = c.getContext('2d'), g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.08, 'rgba(255,255,255,.9)')
  g.addColorStop(.28, 'rgba(255,255,255,.28)'); g.addColorStop(.65, 'rgba(255,255,255,.055)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

// 日冕射线纹理
export function rayTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512
  const x = c.getContext('2d'); x.translate(256, 256)
  for (let i = 0; i < 180; i++) {
    const a = i * 2.39996, len = 55 + 210 * Math.pow((Math.sin(i * 91.17) * .5 + .5), 3), al = .012 + .04 * (i % 7 === 0)
    x.strokeStyle = `rgba(255,188,88,${al})`
    x.lineWidth = i % 13 === 0 ? 1.5 : .5
    x.beginPath()
    x.moveTo(Math.cos(a) * 26, Math.sin(a) * 26)
    x.lineTo(Math.cos(a) * len, Math.sin(a) * len)
    x.stroke()
  }
  return new THREE.CanvasTexture(c)
}
