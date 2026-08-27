import { engine } from './engine'

/** 把本次锁定状态绘成一张纸卡并下载。纯客户端，无网络。 */
export async function downloadFreqCard() {
  if (!engine.lockInfo) return
  const S = 2
  const W = 900
  const H = 1260
  const cv = document.createElement('canvas')
  cv.width = W * S
  cv.height = H * S
  const g = cv.getContext('2d')
  if (!g) return
  g.scale(S, S)

  const ink = '#26211a'
  const soft = '#6f6455'
  const verm = '#b3402a'
  const hair = '#cdc2ab'

  g.fillStyle = '#f3ecdc'
  g.fillRect(0, 0, W, H)
  g.strokeStyle = hair
  g.lineWidth = 1
  g.strokeRect(28, 28, W - 56, H - 56)
  g.strokeRect(36, 36, W - 72, H - 72)

  // 竖排题名
  g.fillStyle = ink
  g.font = '96px "Songti SC","STSong","SimSun",serif'
  g.textBaseline = 'top'
  ;['同', '频'].forEach((ch, i) => g.fillText(ch, 92, 110 + i * 108))

  // 小字引言
  g.fillStyle = soft
  g.font = '22px Georgia, serif'
  g.fillText('IN PHASE · 与 ox-alpha 合拍的一次访问', 92, 350)
  g.strokeStyle = hair
  g.beginPath()
  g.moveTo(92, 392)
  g.lineTo(W - 92, 392)
  g.stroke()

  const rows: [string, string][] = [
    ['你的频率 f', engine.lockInfo.freq.toFixed(3)],
    ['耦合力度 κ', engine.lockInfo.gain.toFixed(2)],
    ['序参量 r', '≥ 0.90'],
    ['尝试次数', String(engine.lockInfo.attempts)],
    ['用时', `${engine.lockInfo.seconds} 秒`],
    ['日期', new Date().toLocaleDateString('zh-CN')],
  ]
  let y = 448
  rows.forEach(([k, v]) => {
    g.fillStyle = soft
    g.font = '26px "Songti SC","SimSun",serif'
    g.fillText(k, 92, y)
    g.fillStyle = ink
    g.font = 'italic 30px Georgia, serif'
    g.fillText(v, W - 92 - g.measureText(v).width, y - 2)
    y += 74
  })

  // 合印
  g.save()
  g.translate(W - 220, H - 260)
  g.rotate((-7 * Math.PI) / 180)
  g.strokeStyle = verm
  g.lineWidth = 7
  g.strokeRect(-80, -80, 160, 160)
  g.fillStyle = verm
  g.font = '104px "Songti SC","STSong","SimSun",serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText('合', 0, 6)
  g.restore()

  g.fillStyle = soft
  g.font = '20px Georgia, serif'
  g.textAlign = 'left'
  g.textBaseline = 'alphabetic'
  g.fillText('ox-alpha · 二〇二六', 92, H - 84)

  const blob = await new Promise<Blob | null>((res) => cv.toBlob(res, 'image/png'))
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `in-phase-${Date.now()}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
