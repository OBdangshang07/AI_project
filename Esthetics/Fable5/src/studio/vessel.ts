/* 车削渲染器 —— 用剖面半径序列在 Canvas 2D 上“旋”出一只器物。
   同一个画法供实时渲染与档案导出共用。 */

import { P, clayAt } from './palette'
import { rng } from './rng'
import type { SurfPt } from './types'

export const M = 64 // 剖面站数（0 = 底，M-1 = 口沿）

export interface VesselGeom {
  cx: number
  baseY: number
  height: number
  r: Float32Array // 每站半径
  theta: number
  ecc: number // 偏心量 px
  jitter: number // 危险抖动 px
  sectionP: number // 剖面开度 0..1
  lift: number // 取器抬升 px
  board: number // 0..1 —— 离轮上板的程度（画木板与新落点）
}

export interface VesselStyle {
  fired: number // 0 生泥 → 1 出窑
  glaze: number
  craze: number
  marble: number
  bare: { h0: number; h1: number } | null
  bareMarked: boolean // 划线标记（上釉前）
  crack: SurfPt[] | null
  crackBranch: SurfPt[] | null
  crackP: number
  goldP: number
  glintT: number
  crazeWebs: SurfPt[][] | null
  calm: boolean
  touches: number[] // 触痕高度（剖面用）
  passHeights: number[] // 我走圈的高度
  wallThin: number // 0..1 越大壁越薄
}

const TAU = Math.PI * 2

/** 初始馒头坯 */
export function makeDome(maxR: number): Float32Array {
  const r = new Float32Array(M)
  for (let i = 0; i < M; i++) {
    const t = i / (M - 1)
    r[i] = maxR * (0.62 + 0.38 * Math.sqrt(Math.max(0, 1 - t * t))) * (1 - 0.12 * t)
  }
  r[M - 1] = Math.max(10, r[M - 1] * 0.55)
  return r
}

export function smoothProfile(r: Float32Array, amount: number): void {
  const tmp = new Float32Array(r)
  for (let i = 1; i < M - 1; i++) {
    const avg = (tmp[i - 1]! + tmp[i]! * 2 + tmp[i + 1]!) / 4
    r[i] = tmp[i]! + (avg - tmp[i]!) * amount
  }
}

/** 限制悬挑，让形立得住（我的“承重之手”）——对称、轻，两遍胜过一遍狠 */
export function slopeLimit(r: Float32Array, maxStep: number): void {
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 1; i < M; i++) {
      const d = r[i]! - r[i - 1]!
      if (d > maxStep) r[i] = r[i - 1]! + maxStep + (d - maxStep) * 0.35
      else if (d < -maxStep) r[i] = r[i - 1]! - maxStep + (d + maxStep) * 0.35
    }
  }
}

/** 生成窑裂路径（主裂 + 一条分支）——发丝裂，不是闪电 */
export function makeCrack(seed: number): { main: SurfPt[]; branch: SurfPt[] } {
  const rnd = rng(seed)
  const main: SurfPt[] = []
  let h = 0.96
  let u = 0.14 + rnd() * 0.1
  let drift = (rnd() - 0.5) * 0.1
  while (h > 0.34) {
    main.push({ h, u })
    h -= 0.025 + rnd() * 0.02
    drift = drift * 0.82 + (rnd() - 0.5) * 0.07
    u += drift
    if (u > 0.42) u = 0.42
    if (u < -0.42) u = -0.42
  }
  const k = Math.floor(main.length * 0.42)
  const b0 = main[k]!
  const branch: SurfPt[] = []
  let bh = b0.h
  let bu = b0.u
  let bd = -0.045 - rnd() * 0.03
  for (let j = 0; j < 5; j++) {
    branch.push({ h: bh, u: bu })
    bh -= 0.028 + rnd() * 0.015
    bu += bd
    bd *= 0.9
  }
  return { main, branch }
}

/** 开片网（静态，出窑后淡入） */
export function makeCraze(seed: number): SurfPt[][] {
  const rnd = rng(seed)
  const webs: SurfPt[][] = []
  for (let k = 0; k < 30; k++) {
    const pts: SurfPt[] = []
    let h = 0.08 + rnd() * 0.86
    let u = (rnd() - 0.5) * 1.3
    const n = 2 + Math.floor(rnd() * 3)
    for (let j = 0; j < n; j++) {
      pts.push({ h, u })
      h += (rnd() - 0.5) * 0.09
      u += (rnd() - 0.5) * 0.3
    }
    webs.push(pts)
  }
  return webs
}

interface Silhouette {
  ys: Float32Array
  dxs: Float32Array
  rs: Float32Array
}

function buildSilhouette(g: VesselGeom): Silhouette {
  const ys = new Float32Array(M)
  const dxs = new Float32Array(M)
  const rs = new Float32Array(M)
  for (let i = 0; i < M; i++) {
    const t = i / (M - 1)
    ys[i] = g.baseY - g.lift - t * g.height
    const wob = g.ecc * Math.sin(g.theta + i * 0.09) * (0.3 + 0.7 * t)
    const jit = g.jitter > 0.01 ? (Math.sin(g.theta * 7 + i * 2.7) + Math.sin(g.theta * 11 + i * 1.3)) * 0.5 * g.jitter * t : 0
    dxs[i] = wob + jit
    rs[i] = g.r[i]!
  }
  return { ys, dxs, rs }
}

function surfXY(g: VesselGeom, s: Silhouette, p: SurfPt): [number, number] {
  const fi = p.h * (M - 1)
  const i = Math.min(M - 2, Math.max(0, Math.floor(fi)))
  const f = fi - i
  const r = s.rs[i]! * (1 - f) + s.rs[i + 1]! * f
  const dx = s.dxs[i]! * (1 - f) + s.dxs[i + 1]! * f
  const y = s.ys[i]! * (1 - f) + s.ys[i + 1]! * f
  return [g.cx + dx + p.u * r, y]
}

function bodyPath(ctx: CanvasRenderingContext2D, g: VesselGeom, s: Silhouette): void {
  ctx.beginPath()
  ctx.moveTo(g.cx + s.dxs[0]! - s.rs[0]!, s.ys[0]!)
  for (let i = 0; i < M; i++) ctx.lineTo(g.cx + s.dxs[i]! - s.rs[i]!, s.ys[i]!)
  const rimRy = rimRyOf(s)
  ctx.ellipse(g.cx + s.dxs[M - 1]!, s.ys[M - 1]!, s.rs[M - 1]!, rimRy, 0, Math.PI, 0, false)
  for (let i = M - 1; i >= 0; i--) ctx.lineTo(g.cx + s.dxs[i]! + s.rs[i]!, s.ys[i]!)
  ctx.closePath()
}

const rimRyOf = (s: Silhouette) => Math.max(4, s.rs[M - 1]! * 0.26)

function strokeSurf(
  ctx: CanvasRenderingContext2D,
  g: VesselGeom,
  s: Silhouette,
  pts: SurfPt[],
  upTo: number,
): void {
  if (pts.length < 2) return
  const n = Math.max(2, Math.ceil(pts.length * upTo))
  ctx.beginPath()
  const [x0, y0] = surfXY(g, s, pts[0]!)
  ctx.moveTo(x0, y0)
  // 中点二次曲线 —— 让裂与纹是“长出来的”，不是折出来的
  let px = x0
  let py = y0
  for (let i = 1; i < n && i < pts.length; i++) {
    const [x, y] = surfXY(g, s, pts[i]!)
    ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2)
    px = x
    py = y
  }
  ctx.lineTo(px, py)
  ctx.stroke()
}

/** 主画法 */
export function paintVessel(ctx: CanvasRenderingContext2D, g: VesselGeom, st: VesselStyle): void {
  const s = buildSilhouette(g)
  const col = clayAt(st.fired)
  const maxR = Math.max(...Array.from(s.rs))

  // 离轮之板
  if (g.board > 0.01) {
    ctx.save()
    ctx.globalAlpha = g.board
    ctx.fillStyle = '#8a6f52'
    const bw = s.rs[0]! * 2 + 56
    ctx.beginPath()
    ctx.roundRect(g.cx - bw / 2, g.baseY - g.lift + 2, bw, 10, 4)
    ctx.fill()
    ctx.fillStyle = 'rgba(38,33,26,0.25)'
    ctx.fillRect(g.cx - bw / 2 + 3, g.baseY - g.lift + 10, bw - 6, 2)
    ctx.restore()
  }

  // 影
  ctx.save()
  ctx.fillStyle = P.shadow
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  ctx.ellipse(g.cx, g.baseY - g.lift + (g.board > 0.01 ? 16 : 5), s.rs[0]! * 1.25 + 8, 7, 0, 0, TAU)
  ctx.fill()
  ctx.restore()

  // 体
  ctx.save()
  bodyPath(ctx, g, s)
  const grad = ctx.createLinearGradient(g.cx - maxR, 0, g.cx + maxR, 0)
  grad.addColorStop(0, col.light)
  grad.addColorStop(0.42, col.body)
  grad.addColorStop(1, col.dark)
  ctx.fillStyle = grad
  ctx.fill()

  // 后续纹理全部裁剪在体内
  ctx.clip()

  // 绞胎（许多种泥，绞在一个胎里）—— 细而密，像泥不像丝带
  if (st.marble > 0.01) {
    for (let k = 0; k < 11; k++) {
      ctx.strokeStyle = k % 2 ? P.slip : P.clayWet
      ctx.globalAlpha = (k % 2 ? 0.26 : 0.2) * st.marble
      ctx.lineWidth = 2.2 + (k % 3) * 1.4
      ctx.beginPath()
      for (let i = 0; i <= M - 1; i += 2) {
        const t = i / (M - 1)
        const r = s.rs[i]!
        const x =
          g.cx +
          s.dxs[i]! +
          ((k / 10 - 0.5) * 1.5 + Math.sin(t * 9 + k * 2.3 + g.theta * 0.22) * 0.11 + Math.sin(t * 21 + k * 5.1) * 0.035) * r
        const y = s.ys[i]!
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  // 拉坯环 —— 虚线随转速平移（宽处线速度更快，物理为真）
  ctx.strokeStyle = P.ink
  for (let i = 3; i < M - 2; i += 4) {
    const r = s.rs[i]!
    const y = s.ys[i]!
    const dx = s.dxs[i]!
    ctx.globalAlpha = 0.05 + 0.05 * (1 - st.fired * 0.5)
    ctx.lineWidth = 1
    ctx.setLineDash([20 + (i % 3) * 8, 34])
    ctx.lineDashOffset = -((g.theta * r) % 400)
    ctx.beginPath()
    ctx.moveTo(g.cx + dx - r, y)
    ctx.quadraticCurveTo(g.cx + dx, y + r * 0.12, g.cx + dx + r, y)
    ctx.stroke()
  }
  ctx.setLineDash([])
  ctx.globalAlpha = 1

  // 釉（露胎带除外）
  if (st.glaze > 0.01) {
    const topY = g.baseY - g.lift - g.height - 20
    ctx.fillStyle = P.celadon
    ctx.globalAlpha = 0.58 * st.glaze
    const footY = g.baseY - g.lift - g.height * 0.05 // 圈足留胎，釉不到底
    if (st.bare) {
      const bandTop = g.baseY - g.lift - st.bare.h1 * g.height
      const bandBot = g.baseY - g.lift - st.bare.h0 * g.height
      ctx.fillRect(g.cx - maxR * 1.4, topY, maxR * 2.8, Math.max(0, bandTop - topY))
      ctx.fillRect(g.cx - maxR * 1.4, bandBot, maxR * 2.8, Math.max(0, footY - bandBot))
    } else {
      ctx.fillRect(g.cx - maxR * 1.4, topY, maxR * 2.8, Math.max(0, footY - topY))
    }
    ctx.globalAlpha = 1
  }

  // 露胎带的划线标记（上釉前也可见）
  if (st.bare && st.bareMarked) {
    ctx.strokeStyle = P.inkSoft
    ctx.globalAlpha = 0.5
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    for (const h of [st.bare.h0, st.bare.h1]) {
      const y = g.baseY - g.lift - h * g.height
      ctx.beginPath()
      ctx.moveTo(g.cx - maxR * 1.2, y)
      ctx.lineTo(g.cx + maxR * 1.2, y)
      ctx.stroke()
    }
    ctx.setLineDash([])
    ctx.globalAlpha = 1
  }

  // 开片（出窑之后，这一窑独有的指纹）
  if (st.craze > 0.01 && st.glaze > 0.2 && st.crazeWebs) {
    ctx.strokeStyle = P.celadonDeep
    ctx.globalAlpha = 0.5 * st.craze
    ctx.lineWidth = 1
    for (const web of st.crazeWebs) strokeSurf(ctx, g, s, web, 1)
    ctx.globalAlpha = 1
  }

  ctx.restore() // 结束体内裁剪

  // 口沿
  const rimR = s.rs[M - 1]!
  const rimRy = rimRyOf(s)
  const rimX = g.cx + s.dxs[M - 1]!
  const rimY = s.ys[M - 1]!
  ctx.save()
  ctx.beginPath()
  ctx.ellipse(rimX, rimY, rimR, rimRy, 0, 0, TAU)
  ctx.fillStyle = col.dark
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(rimX, rimY + 1.2, rimR * 0.82, rimRy * 0.72, 0, 0, TAU)
  ctx.fillStyle = mixInk(col.dark)
  ctx.fill()
  ctx.strokeStyle = col.light
  ctx.globalAlpha = 0.65
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.ellipse(rimX, rimY, rimR, rimRy, 0, Math.PI * 0.9, Math.PI * 2.05)
  ctx.stroke()
  ctx.restore()

  // 裂 与 金
  if (st.crack && st.crackP > 0) {
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#4a2f1f'
    ctx.lineWidth = 1.8
    ctx.globalAlpha = 0.9
    strokeSurf(ctx, g, s, st.crack, Math.min(1, st.crackP / 0.75))
    if (st.crackBranch && st.crackP > 0.75) {
      ctx.lineWidth = 1.2
      strokeSurf(ctx, g, s, st.crackBranch, (st.crackP - 0.75) / 0.25)
    }
    ctx.restore()
  }
  if (st.crack && st.goldP > 0) {
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    const mainP = Math.min(1, st.goldP / 0.8)
    ctx.strokeStyle = P.gold
    ctx.lineWidth = 2.6
    strokeSurf(ctx, g, s, st.crack, mainP)
    ctx.strokeStyle = P.goldLight
    ctx.lineWidth = 1.1
    strokeSurf(ctx, g, s, st.crack, mainP)
    if (st.crackBranch && st.goldP > 0.8) {
      const bp = (st.goldP - 0.8) / 0.2
      ctx.strokeStyle = P.gold
      ctx.lineWidth = 1.8
      strokeSurf(ctx, g, s, st.crackBranch, bp)
      ctx.strokeStyle = P.goldLight
      ctx.lineWidth = 0.9
      strokeSurf(ctx, g, s, st.crackBranch, bp)
    }
    // 金上微光 —— 修补处是最亮的线
    if (st.goldP >= 1 && st.crack.length > 4) {
      for (let k = 0; k < 3; k++) {
        const p = st.crack[2 + k * 2]!
        const [x, y] = surfXY(g, s, p)
        const a = st.calm ? 0.35 : 0.22 + 0.2 * Math.sin(st.glintT * 1.3 + k * 2.1)
        if (a <= 0.02) continue
        ctx.strokeStyle = P.goldLight
        ctx.globalAlpha = a
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x - 3.5, y)
        ctx.lineTo(x + 3.5, y)
        ctx.moveTo(x, y - 3.5)
        ctx.lineTo(x, y + 3.5)
        ctx.stroke()
      }
    }
    ctx.restore()
  }

  // 剖面（隐藏层：按住不放）
  if (g.sectionP > 0.01) paintSection(ctx, g, s, st)
}

function mixInk(hex: string): string {
  // 简单压暗
  const n = parseInt(hex.slice(1), 16)
  const r = Math.floor(((n >> 16) & 255) * 0.55)
  const g = Math.floor(((n >> 8) & 255) * 0.55)
  const b = Math.floor((n & 255) * 0.55)
  return `rgb(${r},${g},${b})`
}

/** 剖面：右半侧切开，看壁厚与触痕 */
function paintSection(ctx: CanvasRenderingContext2D, g: VesselGeom, s: Silhouette, st: VesselStyle): void {
  const open = g.sectionP
  const maxR = Math.max(...Array.from(s.rs))
  ctx.save()
  // 揭开的区域
  ctx.beginPath()
  ctx.rect(g.cx, g.baseY - g.lift - g.height - 30, maxR * 1.6 * open, g.height + 44)
  ctx.clip()
  // 抹掉右半器体 → 纸底
  ctx.fillStyle = P.paper
  ctx.fillRect(g.cx, g.baseY - g.lift - g.height - 30, maxR * 1.6, g.height + 44)

  // 壁的断面
  const wall = (i: number) => Math.max(3.2, 9 - st.wallThin * 3.5 - (i / M) * 3.2)
  ctx.beginPath()
  ctx.moveTo(g.cx, s.ys[0]!)
  for (let i = 0; i < M; i++) ctx.lineTo(g.cx + s.rs[i]!, s.ys[i]!)
  for (let i = M - 1; i >= 0; i--) ctx.lineTo(g.cx + Math.max(1.5, s.rs[i]! - wall(i)), s.ys[i]!)
  ctx.closePath()
  ctx.fillStyle = '#8a5a3c'
  ctx.fill()
  // 断面剖线（制图感）
  ctx.clip()
  ctx.strokeStyle = P.ink
  ctx.globalAlpha = 0.18
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = -g.height; x < maxR * 1.6; x += 5) {
    ctx.moveTo(g.cx + x, g.baseY - g.lift + 6)
    ctx.lineTo(g.cx + x + g.height + 12, g.baseY - g.lift - g.height - 6)
  }
  ctx.stroke()
  ctx.restore()

  // 触痕刻度：你（陶deep） / 我（釉青）
  ctx.save()
  ctx.globalAlpha = Math.min(1, open * 1.4)
  for (const h of st.touches) {
    const y = g.baseY - g.lift - h * g.height
    const i = Math.round(h * (M - 1))
    const x = g.cx + (s.rs[Math.min(M - 1, i)] ?? 0)
    ctx.strokeStyle = P.clayWet
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + 3, y)
    ctx.lineTo(x + 11, y)
    ctx.stroke()
  }
  for (const h of st.passHeights) {
    const y = g.baseY - g.lift - h * g.height
    const i = Math.round(h * (M - 1))
    const x = g.cx + (s.rs[Math.min(M - 1, i)] ?? 0)
    ctx.strokeStyle = P.celadonDeep
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.arc(x + 8, y, 3.2, -Math.PI / 2, Math.PI / 2)
    ctx.stroke()
  }
  // 中轴线
  ctx.strokeStyle = P.inkFaint
  ctx.globalAlpha = 0.5 * open
  ctx.setLineDash([5, 5])
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(g.cx, g.baseY - g.lift + 10)
  ctx.lineTo(g.cx, g.baseY - g.lift - g.height - 16)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.restore()
}
