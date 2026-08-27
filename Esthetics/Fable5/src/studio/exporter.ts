/* 器物档案 —— 把这一次的器导出为一张纸 */

import { P } from './palette'
import { paintVessel, type VesselGeom, type VesselStyle } from './vessel'
import type { StudioEngine } from './engine'
import { cnNum, vessel as vesselCopy, hero } from '../content/copy'

const DISPLAY = '"Songti SC","Noto Serif CJK SC","SimSun",Georgia,serif'
const LATIN = 'Georgia,"Times New Roman",serif'

export function vesselNumber(state: ReturnType<StudioEngine['exportState']>): number {
  let h = 7
  for (let i = 0; i < state.r.length; i += 3) h = (h * 31 + Math.round(state.r[i]! * 10)) % 8999
  h = (h + state.stats.touches * 137 + state.stats.passes * 71) % 8999
  return 1000 + h
}

export function exportVesselPNG(engine: StudioEngine, dateStr: string): void {
  const st = engine.exportState()
  const no = vesselNumber(st)
  const W = 1080
  const H = 1440
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')
  if (!ctx) return

  // 纸
  ctx.fillStyle = P.paper
  ctx.fillRect(0, 0, W, H)
  // 双层细框
  ctx.strokeStyle = P.ink
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 2
  ctx.strokeRect(30, 30, W - 60, H - 60)
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 1
  ctx.strokeRect(42, 42, W - 84, H - 84)
  ctx.globalAlpha = 1

  // 器 —— 放大重绘
  const scale = Math.min(300 / Math.max(...Array.from(st.r)), 620 / st.hgt)
  const r = Float32Array.from(st.r, (v) => v * scale)
  const geom: VesselGeom = {
    cx: 420,
    baseY: 880,
    height: st.hgt * scale,
    r,
    theta: 0.65,
    ecc: 0,
    jitter: 0,
    sectionP: 0,
    lift: 6,
    board: 1,
  }
  const style: VesselStyle = {
    fired: 1,
    glaze: 1,
    craze: 1,
    marble: st.marble,
    bare: st.bare,
    bareMarked: st.bareMarked,
    crack: st.crack,
    crackBranch: st.crackBranch,
    crackP: st.crack ? 1 : 0,
    goldP: st.crack ? 1 : 0,
    glintT: 1.2,
    crazeWebs: st.crazeWebs,
    calm: true,
    touches: st.touches,
    passHeights: st.passHeights,
    wallThin: st.wallThin,
  }
  paintVessel(ctx, geom, style)

  // 竖排大字：成 器
  ctx.fillStyle = P.ink
  ctx.font = `128px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.fillText('成', 880, 260)
  ctx.fillText('器', 880, 420)
  ctx.font = `italic 19px ${LATIN}`
  ctx.fillStyle = P.inkSoft
  ctx.save()
  ctx.translate(918, 500)
  ctx.rotate(Math.PI / 2)
  ctx.textAlign = 'left'
  ctx.fillText('ROTA · ARGILLA · AURUM', 0, 0)
  ctx.restore()

  // 档案
  const you = st.stats.touches
  const me = st.stats.passes
  const ratioLine =
    you === 0 ? vesselCopy.colophon.allMine : vesselCopy.colophon.touches(you, me)
  ctx.textAlign = 'left'
  ctx.fillStyle = P.ink
  ctx.font = `34px ${DISPLAY}`
  ctx.fillText(vesselCopy.colophon.title, 96, 1064)
  ctx.font = `italic 24px ${LATIN}`
  ctx.fillStyle = P.inkSoft
  ctx.fillText(`No. ${no}`, 96, 1108)
  ctx.fillStyle = P.ink
  ctx.font = `25px ${DISPLAY}`
  const lines = [
    vesselCopy.colophon.date(dateStr),
    ratioLine,
    st.stats.cracked ? vesselCopy.colophon.crack : '',
    `问过 ${cnNum[Math.min(10, st.stats.questionsDone.length)]} 个问题 · 回过 ${cnNum[Math.min(10, st.stats.rewinds)]} 圈`,
  ].filter(Boolean)
  lines.forEach((ln, i) => ctx.fillText(ln, 96, 1160 + i * 46))
  ctx.font = `20px ${DISPLAY}`
  ctx.fillStyle = P.inkSoft
  ctx.fillText(hero.sub, 96, 1352)

  // 印
  ctx.fillStyle = P.seal
  ctx.beginPath()
  ctx.roundRect(880, 1240, 88, 88, 8)
  ctx.fill()
  ctx.fillStyle = P.paper
  ctx.font = `56px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.fillText('器', 924, 1302)

  cv.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${vesselCopy.savedName}-${no}.png`
    a.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 4000)
  }, 'image/png')
}
