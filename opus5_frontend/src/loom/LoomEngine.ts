/**
 * LoomEngine — the core apparatus.
 *
 * This is not a tweened animation. It is a machine with its own tempo.
 * Scroll does not scrub it; scroll gives it a *target pick count*, and the
 * machine works toward that target at a speed it decides, with a real
 * shuttle flight, a real shed opening, a real beater stroke. Scroll back and
 * it un-weaves — slower than it weaves, because undoing always is.
 *
 * Rendering strategy (a deliberate choice, Canvas2D over WebGL):
 *   - Finished cloth is baked into two offscreen canvases (front / reverse)
 *     and blitted in one drawImage per frame. Rows are painted once, at the
 *     moment the beater packs them.
 *   - Per-frame work is only the live parts: ~90 warp curves, the shed, the
 *     shuttle, the beater, unravelled strands. Cheap enough for a phone.
 *   - Cells are drawn from a pre-rendered tile atlas (7 tiles), so a full
 *     re-weave after the visitor edits the draft costs ~8ms, not ~90ms.
 *
 * The shed is faked in 2.5D with draw order: lifted warp sheet paints OVER
 * the shuttle, the lowered sheet UNDER it. No 3D, real mechanism.
 */

import { C, shade, warpColor, weftColor } from './palette'
import { DEFAULT_TREADLING, SHAFTS, THREADINGS, type Draft, warpUp } from './draft'

export type LoomParams = {
  /** 0..1 — warp threads coming into tension */
  warpTension: number
  /** how many picks the machine should have woven; the machine chases this */
  pickTarget: number
  /** 0..1 — draft notation / heddle diagram overlay */
  notation: number
  /** 0..1 — front face → reverse face */
  flip: number
  /** 0..1 — cloth cut from the loom, falls; >0.65 re-warps */
  cut: number
  /** 0..1 — the machine has stopped; colour drains, annotation appears */
  dim: number
}

export type Telemetry = {
  picks: number
  rows: number
  ends: number
  treadle: number
  spanPx: number
  hz: number
  state: 'warping' | 'weaving' | 'unweaving' | 'idle' | 'stopped' | 'cut'
  flawed: boolean
  learned: boolean
}

type WarpEnd = { u: number; v: number; gauge: number; jitter: number }
type Strand = { y: number; x0: number; x1: number; life: number; vy: number; ph: number; col: string }

export type CommitEvent = {
  kind: 'beat' | 'unravel' | 'snip' | 'tension' | 'learned'
  pick: number
  /** 0..1 across the loom width */
  at: number
  force: number
}

const PENTATONIC = [0, 2, 4, 7, 9]

/* ------------------------------------------------------------------ */

export class LoomEngine {
  params: LoomParams = {
    warpTension: 0,
    pickTarget: 0,
    notation: 0,
    flip: 0,
    cut: 0,
    dim: 0,
  }

  draft: Draft = { threading: THREADINGS[1], treadling: [...DEFAULT_TREADLING] }
  reducedMotion = false
  focusEnd: number | null = null
  onEvent: ((e: CommitEvent) => void) | null = null

  /** rows before the flaw begins; set by the score once geometry is known */
  flawFrom = 9999
  learned = false

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr = 1
  private cssW = 0
  private cssH = 0
  private narrow = false

  // loom geometry (css px)
  private lx = 0
  private ly = 0
  private lw = 0
  private lh = 0
  cell = 10
  ends = 0
  rows = 0

  // woven state
  private picks = 0
  private rowFlawed: boolean[] = []
  private fellY = 0
  private fellVel = 0

  // machine cycle
  private phase: 'idle' | 'fly' | 'beat' | 'recoil' | 'unravel' = 'idle'
  private phaseT = 0
  private dir: 1 | -1 = 1
  private shuttleX = 0
  private beat = 0
  private shed = 0
  private lastTreadle = 0
  private state: Telemetry['state'] = 'warping'

  private warp: WarpEnd[] = []
  private strands: Strand[] = []
  private time = 0
  private depth: CanvasGradient | null = null
  /** decays after the machine drops below the flaw and learns */
  private learnFlash = 0

  // offscreen
  private front: HTMLCanvasElement | null = null
  private back: HTMLCanvasElement | null = null
  private fctx: CanvasRenderingContext2D | null = null
  private bctx: CanvasRenderingContext2D | null = null
  private tiles = new Map<string, HTMLCanvasElement>()
  private grain: HTMLCanvasElement | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('canvas 2d unavailable')
    this.ctx = ctx
  }

  /* ---------------- geometry ---------------- */

  resize(cssW: number, cssH: number) {
    this.cssW = cssW
    this.cssH = cssH
    this.narrow = cssW < 860
    this.dpr = Math.min(window.devicePixelRatio || 1, this.narrow ? 2 : 1.75)

    this.canvas.width = Math.round(cssW * this.dpr)
    this.canvas.height = Math.round(cssH * this.dpr)
    this.canvas.style.width = cssW + 'px'
    this.canvas.style.height = cssH + 'px'

    // the loom sits left-of-centre on wide screens (text takes the right rail),
    // and fills the upper sheet on narrow ones. `ly` leaves headroom above the
    // top beam for the threading diagram — the diagram is part of the machine,
    // not an overlay, so it gets reserved space rather than a z-index.
    if (this.narrow) {
      this.lx = Math.round(cssW * 0.075)
      this.lw = Math.round(cssW * 0.85)
      this.ly = Math.round(cssH * 0.115)
      this.lh = Math.round(cssH * 0.325)
    } else {
      const avail = Math.min(cssW * 0.44, 600)
      this.lx = Math.round(Math.max(cssW * 0.075, cssW * 0.3 - avail / 2))
      this.lw = Math.round(avail)
      this.ly = Math.round(cssH * 0.175)
      this.lh = Math.round(cssH * 0.695)
    }

    const targetEnds = this.narrow ? 42 : 76
    this.cell = Math.max(6, Math.min(16, this.lw / targetEnds))
    this.ends = Math.max(12, Math.floor(this.lw / this.cell))
    this.lw = this.ends * this.cell
    this.rows = Math.max(20, Math.floor((this.lh - this.cell * 6) / this.cell))
    this.lh = this.rows * this.cell + this.cell * 6

    // real yarn is not uniform. A deterministic per-end thickness and a
    // sub-pixel offset stop the warp reading as a barcode.
    this.warp = Array.from({ length: this.ends }, (_, j) => {
      const h = ((j * 2654435761) >>> 0) / 4294967296
      const h2 = ((j * 40503 + 12289) % 997) / 997
      return { u: 0, v: 0, gauge: 0.86 + h * 0.3, jitter: (h2 - 0.5) * 0.9 }
    })
    this.picks = Math.min(this.picks, this.rows)
    this.fellY = this.baseFell()
    this.fellVel = 0

    this.buildTiles()
    this.buildGrain()
    this.buildDepth()
    this.buildCloth()
    this.repaintAll()
  }

  /** one cached gradient gives the warp field depth for the price of a rect */
  private buildDepth() {
    const g = this.ctx.createLinearGradient(0, this.ly, 0, this.ly + this.lh)
    g.addColorStop(0, 'rgba(20,19,16,0.20)')
    g.addColorStop(0.13, 'rgba(20,19,16,0)')
    g.addColorStop(0.86, 'rgba(20,19,16,0)')
    g.addColorStop(1, 'rgba(20,19,16,0.13)')
    this.depth = g
  }

  private baseFell() {
    return this.ly + this.lh - this.picks * this.cell
  }

  /* ---------------- tile atlas ---------------- */

  private tile(color: string, vertical: boolean, reverse: boolean): HTMLCanvasElement {
    const key = `${color}|${vertical ? 'v' : 'h'}|${reverse ? 'r' : 'f'}`
    const hit = this.tiles.get(key)
    if (hit) return hit

    const s = Math.round(this.cell * this.dpr)
    const cv = document.createElement('canvas')
    cv.width = s
    cv.height = s
    const g = cv.getContext('2d')!
    g.scale(s, s) // unit square

    // ground: the shadowed gap between threads. Kept shallow — too dark and
    // an 8px weave reads as a screen door instead of cloth.
    g.fillStyle = reverse ? shade(color, -34) : shade(color, -21)
    g.fillRect(0, 0, 1, 1)

    const inset = reverse ? 0.03 : 0.05
    const grad = vertical
      ? g.createLinearGradient(inset, 0, 1 - inset, 0)
      : g.createLinearGradient(0, inset, 0, 1 - inset)
    // matte. A strong specular crown made madder read as orange plastic.
    const lo = reverse ? 6 : 14
    grad.addColorStop(0, shade(color, -14))
    grad.addColorStop(0.28, shade(color, lo))
    grad.addColorStop(0.62, color)
    grad.addColorStop(1, shade(color, -26))
    g.fillStyle = grad
    if (vertical) g.fillRect(inset, 0, 1 - inset * 2, 1)
    else g.fillRect(0, inset, 1, 1 - inset * 2)

    // slub: a fine highlight along the crown of the thread
    g.strokeStyle = reverse ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)'
    g.lineWidth = 1 / s
    g.beginPath()
    if (vertical) {
      g.moveTo(0.42, 0)
      g.lineTo(0.42, 1)
    } else {
      g.moveTo(0, 0.42)
      g.lineTo(1, 0.42)
    }
    g.stroke()

    this.tiles.set(key, cv)
    return cv
  }

  private buildTiles() {
    this.tiles.clear()
  }

  private buildGrain() {
    const s = 180
    const cv = document.createElement('canvas')
    cv.width = s
    cv.height = s
    const g = cv.getContext('2d')!
    const img = g.createImageData(s, s)
    for (let i = 0; i < s * s; i++) {
      // fibrous, not TV static: bias along x for a laid-paper feel
      const n = 226 + Math.random() * 29
      img.data[i * 4] = n
      img.data[i * 4 + 1] = n
      img.data[i * 4 + 2] = n - 4
      img.data[i * 4 + 3] = 255
    }
    g.putImageData(img, 0, 0)
    this.grain = cv
  }

  /* ---------------- cloth bakery ---------------- */

  private buildCloth() {
    const w = Math.round(this.ends * this.cell * this.dpr)
    const h = Math.round(this.rows * this.cell * this.dpr)
    if (!w || !h) return
    for (const which of ['front', 'back'] as const) {
      const cv = document.createElement('canvas')
      cv.width = w
      cv.height = h
      const g = cv.getContext('2d')!
      if (which === 'front') {
        this.front = cv
        this.fctx = g
      } else {
        this.back = cv
        this.bctx = g
      }
    }
  }

  /** offscreen y for pick i (pick 0 is the bottom-most row of cloth) */
  private rowY(i: number) {
    return (this.rows - 1 - i) * this.cell * this.dpr
  }

  private effectivePick(i: number) {
    // a treadling error: three treadles out of step. The twill line breaks.
    return this.rowFlawed[i] ? i + 3 : i
  }

  private paintRow(i: number) {
    if (!this.fctx || !this.bctx) return
    const s = this.cell * this.dpr
    const y = this.rowY(i)
    const p = this.effectivePick(i)
    const wc = weftColor(p)

    this.fctx.clearRect(0, y, this.ends * s, s)
    this.bctx.clearRect(0, y, this.ends * s, s)

    let runStart = 0
    let runUp = warpUp(this.draft, p, 0)

    for (let j = 0; j <= this.ends; j++) {
      const up = j < this.ends ? warpUp(this.draft, p, j) : !runUp
      if (j === this.ends || up !== runUp) {
        // paint the finished run
        for (let k = runStart; k < j; k++) {
          const x = k * s
          if (runUp) {
            this.fctx.drawImage(this.tile(warpColor(k), true, false), x, y, s, s)
            this.bctx.drawImage(this.tile(wc, false, true), x, y, s, s)
          } else {
            this.fctx.drawImage(this.tile(wc, false, false), x, y, s, s)
            this.bctx.drawImage(this.tile(warpColor(k), true, true), x, y, s, s)
          }
        }
        // On the reverse, every run of 3+ is a slack float lying loose across
        // the back. This is the whole point of the reverse side, so it is
        // drawn generously: thick, sagging, shadowed, unmistakably untidy.
        const len = j - runStart
        if (len >= 3) {
          const g = this.bctx
          const col = runUp ? wc : warpColor(runStart)
          const cx = (runStart + len / 2) * s
          const x0 = runStart * s + s * 0.25
          const x1 = j * s - s * 0.25
          const my = y + s * 0.5
          const hs = ((i * 7919 + runStart * 104729) >>> 0) % 1000
          const sag = s * (0.26 + Math.min(len, 9) * 0.055) * (0.7 + (hs % 100) / 220)

          g.save()
          g.lineCap = 'round'
          // shadow under the float: it is not lying flat
          g.strokeStyle = 'rgba(20,19,16,0.30)'
          g.lineWidth = s * 0.5
          g.beginPath()
          g.moveTo(x0, my + s * 0.1)
          g.quadraticCurveTo(cx, my + sag + s * 0.14, x1, my + s * 0.1)
          g.stroke()

          g.strokeStyle = shade(col, 20)
          g.lineWidth = s * 0.46
          g.beginPath()
          g.moveTo(x0, my)
          g.quadraticCurveTo(cx, my + sag, x1, my)
          g.stroke()

          g.strokeStyle = 'rgba(255,255,255,0.10)'
          g.lineWidth = s * 0.1
          g.beginPath()
          g.moveTo(x0 + s * 0.2, my - s * 0.08)
          g.quadraticCurveTo(cx, my + sag - s * 0.1, x1 - s * 0.2, my - s * 0.08)
          g.stroke()
          g.restore()
        }
        runStart = j
        runUp = up
      }
    }

    const g = this.bctx
    const hsh = (i * 2654435761) >>> 0

    // the back is duller: it never saw the light or the finisher
    g.save()
    g.globalCompositeOperation = 'source-atop'
    g.fillStyle = 'rgba(58,54,46,0.14)'
    g.fillRect(0, y, this.ends * s, s)
    g.restore()

    // cut tails at the selvedge, and loose hairs anywhere
    g.save()
    g.lineCap = 'round'
    if (hsh % 3 === 0) {
      g.strokeStyle = shade(wc, 34)
      g.lineWidth = s * 0.24
      const right = (hsh >> 5) % 2 === 0
      const x = right ? this.ends * s - s * 0.4 : s * 0.4
      g.beginPath()
      g.moveTo(x, y + s * 0.5)
      g.quadraticCurveTo(
        x + (right ? -1 : 1) * s * 1.6,
        y + s * (0.5 + ((hsh >> 3) % 5) * 0.3),
        x + (right ? -1 : 1) * s * (2.2 + (hsh % 9) * 0.34),
        y + s * (1.1 + ((hsh >> 7) % 6) * 0.24),
      )
      g.stroke()
    }
    if (hsh % 7 === 2) {
      const hx = (((hsh >> 9) % this.ends) + 0.5) * s
      g.strokeStyle = 'rgba(237,231,220,0.34)'
      g.lineWidth = s * 0.12
      g.beginPath()
      g.moveTo(hx, y)
      g.quadraticCurveTo(hx + s * 1.1, y + s * 0.8, hx + s * 2.6, y + s * 0.3)
      g.stroke()
    }
    g.restore()
  }

  private repaintAll() {
    if (!this.fctx || !this.front) return
    this.fctx.clearRect(0, 0, this.front.width, this.front.height)
    this.bctx!.clearRect(0, 0, this.front.width, this.front.height)
    for (let i = 0; i < this.picks; i++) this.paintRow(i)
  }

  setDraft(draft: Draft) {
    this.draft = draft
    this.tiles.clear()
    this.repaintAll()
  }

  /* ---------------- interaction ---------------- */

  endAt(cssX: number, cssY: number): number | null {
    if (cssY < this.ly - 20 || cssY > this.fellY + 8) return null
    const j = Math.floor((cssX - this.lx) / this.cell)
    if (j < 0 || j >= this.ends) return null
    return j
  }

  /** free span of warp still able to move — shrinks as the cloth grows */
  get span() {
    return Math.max(0, this.fellY - this.ly)
  }

  /** the fell line: y where cloth becomes warp */
  get fell() {
    return this.fellY
  }

  get wovenPicks() {
    return this.picks
  }

  /** is this point on finished cloth? (then it can be turned over) */
  isOnCloth(cssX: number, cssY: number) {
    return (
      this.picks > 3 &&
      cssX >= this.lx - 8 &&
      cssX <= this.lx + this.lw + 8 &&
      cssY > this.fellY + 2 &&
      cssY < this.ly + this.lh + 14
    )
  }

  get pluckable() {
    return this.span > this.cell * 3
  }

  /**
   * Plucking injects velocity, not displacement, so the thread has to
   * accelerate — you feel the mass. Amplitude is capped near one thread pitch:
   * a warp end that swings across its neighbours is spaghetti, not a string.
   */
  pluck(j: number, strength = 1, spread = 1.5) {
    if (!this.pluckable || j < 0 || j >= this.ends) return
    const reach = Math.min(1, this.span / 420)
    const amp = strength * (0.35 + reach * 0.65) * this.cell * 1.85
    for (let k = -3; k <= 3; k++) {
      const idx = j + k
      if (idx < 0 || idx >= this.ends) continue
      const w = Math.exp(-(k * k) / (2 * spread * spread))
      this.warp[idx].v += amp * w * (k === 0 ? 1 : 0.55)
      // cap so repeated strikes cannot pile up into chaos
      const lim = this.cell * 3.2
      if (this.warp[idx].v > lim) this.warp[idx].v = lim
      else if (this.warp[idx].v < -lim) this.warp[idx].v = -lim
    }
    this.onEvent?.({
      kind: 'tension',
      pick: this.picks,
      at: j / Math.max(1, this.ends - 1),
      force: strength,
    })
  }

  /** musical pitch of an end, quantised so strumming sounds intentional */
  pitchOf(j: number): number {
    const oct = this.span > 0 ? Math.min(3, Math.max(0, Math.floor((420 - this.span) / 130) + 1)) : 3
    const deg = Math.floor((j / Math.max(1, this.ends)) * 15)
    const semi = PENTATONIC[deg % 5] + 12 * Math.floor(deg / 5) + 12 * oct
    return 110 * Math.pow(2, semi / 12)
  }

  get telemetry(): Telemetry {
    // after the cut the loom is genuinely empty again, and says so
    const emptied = this.params.cut > 0.7
    return {
      picks: emptied ? 0 : this.picks,
      rows: this.rows,
      ends: this.ends,
      treadle: this.lastTreadle,
      spanPx: Math.round(emptied ? this.lh : this.span),
      hz: Math.round(this.pitchOf(Math.floor(this.ends / 2))),
      state: this.state,
      flawed: this.rowFlawed.slice(0, this.picks).some(Boolean),
      learned: this.learned,
    }
  }

  /** a small specimen of the cloth, for the artifact card */
  clothThumb(maxW = 320): string {
    const src = this.params.flip > 0.5 ? this.back : this.front
    if (!src || this.picks < 1) return ''
    const s = this.cell * this.dpr
    const sw = this.ends * s
    const sh = this.picks * s
    const k = Math.min(1, maxW / (sw / this.dpr))
    const out = document.createElement('canvas')
    out.width = Math.max(1, Math.round((sw / this.dpr) * k * 2))
    out.height = Math.max(1, Math.round((sh / this.dpr) * k * 2))
    const g = out.getContext('2d')!
    g.imageSmoothingEnabled = true
    g.imageSmoothingQuality = 'high'
    g.drawImage(src, 0, this.rowY(this.picks - 1), sw, sh, 0, 0, out.width, out.height)
    return out.toDataURL('image/png')
  }

  exportCloth(): string {
    const src = this.params.flip > 0.5 ? this.back : this.front
    if (!src || this.picks < 1) return ''
    const s = this.cell * this.dpr
    const pad = Math.round(s * 3)
    const w = this.ends * s
    const h = this.picks * s
    const out = document.createElement('canvas')
    out.width = w + pad * 2
    out.height = h + pad * 2
    const g = out.getContext('2d')!
    g.fillStyle = C.paper
    g.fillRect(0, 0, out.width, out.height)
    g.drawImage(src, 0, this.rowY(this.picks - 1), w, h, pad, pad, w, h)
    if (this.grain) {
      g.globalCompositeOperation = 'multiply'
      g.globalAlpha = 0.28
      const pat = g.createPattern(this.grain, 'repeat')!
      g.fillStyle = pat
      g.fillRect(0, 0, out.width, out.height)
    }
    return out.toDataURL('image/png')
  }

  /* ---------------- simulation ---------------- */

  tick(dt: number) {
    this.time += dt
    const p = this.params

    const target = Math.max(0, Math.min(this.rows, Math.round(p.pickTarget)))

    if (p.cut > 0.02) {
      if (this.state !== 'cut') this.onEvent?.({ kind: 'snip', pick: this.picks, at: 0, force: 1 })
      this.state = 'cut'
      this.phase = 'idle'
      this.shed = Math.max(0, this.shed - dt * 0.006)
      this.beat = Math.max(0, this.beat - dt * 0.004)
    } else if (this.reducedMotion) {
      // reduced motion: no cycle theatre. State snaps; cloth is still yours.
      if (target > this.picks) {
        while (this.picks < target) this.commit()
        this.state = 'weaving'
      } else if (target < this.picks) {
        while (this.picks > target) this.remove()
        this.state = 'unweaving'
      } else {
        this.state = p.dim > 0.4 ? 'stopped' : 'idle'
      }
      this.shed = 0
      this.beat = 0
    } else {
      this.runCycle(dt, target)
    }

    this.integrateWarp(dt)
    this.integrateFell(dt)
    this.integrateStrands(dt)
    if (this.learnFlash > 0) this.learnFlash = Math.max(0, this.learnFlash - dt * 0.0016)
  }

  private runCycle(dt: number, target: number) {
    const backlog = target - this.picks
    // The machine strains when it is behind, but it has a ceiling — and it
    // refuses to hurry when it is taking work back out. Undoing is not a
    // thing you can do at speed, so unravelling never strains past a crawl.
    const rate =
      this.phase === 'unravel'
        ? 1 + Math.min(Math.abs(backlog) / 16, 1) * 0.75
        : 1 + Math.min(Math.abs(backlog) / 10, 1) * 3.4
    this.phaseT += dt * rate

    const FLY = 210
    const BEAT = 78
    const RECOIL = 132
    const UNRAVEL = 620

    switch (this.phase) {
      case 'idle': {
        this.shed += (0 - this.shed) * Math.min(1, dt * 0.008)
        this.beat += (0 - this.beat) * Math.min(1, dt * 0.01)
        if (backlog > 0 && this.picks < this.rows) {
          this.phase = 'fly'
          this.phaseT = 0
          this.lastTreadle = this.draft.treadling[this.effectivePick(this.picks) % this.draft.treadling.length]
          this.state = 'weaving'
        } else if (backlog < 0 && this.picks > 0) {
          this.phase = 'unravel'
          this.phaseT = 0
          this.state = 'unweaving'
        } else {
          this.state = this.params.dim > 0.4 ? 'stopped' : 'idle'
          // idle breathing: the warp is never truly still
          const br = Math.sin(this.time * 0.0009) * 0.014 + Math.sin(this.time * 0.0021) * 0.006
          for (let j = 0; j < this.ends; j++) {
            this.warp[j].v += br * Math.sin(j * 0.37 + this.time * 0.0004)
          }
        }
        break
      }
      case 'fly': {
        const t = Math.min(1, this.phaseT / FLY)
        this.shed = Math.min(1, this.shed + dt * 0.012)
        // shuttle: thrown, so fast in the middle, decelerating into the box
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        this.shuttleX = this.dir === 1 ? e : 1 - e
        if (t >= 1) {
          this.phase = 'beat'
          this.phaseT = 0
        }
        break
      }
      case 'beat': {
        const t = Math.min(1, this.phaseT / BEAT)
        this.beat = t * t // accelerating into the fell — it has mass
        this.shed = Math.max(0, 1 - t * 1.4)
        if (t >= 1) {
          this.commit()
          this.phase = 'recoil'
          this.phaseT = 0
          this.dir = this.dir === 1 ? -1 : 1
        }
        break
      }
      case 'recoil': {
        const t = Math.min(1, this.phaseT / RECOIL)
        this.beat = (1 - t) * (1 - t) * Math.cos(t * 9) * 0.5 + (1 - t) * 0.5
        if (t >= 1) {
          this.beat = 0
          this.phase = 'idle'
          this.phaseT = 0
        }
        break
      }
      case 'unravel': {
        const t = Math.min(1, this.phaseT / UNRAVEL)
        this.shuttleX = this.dir === 1 ? 1 - t : t
        this.shed = Math.sin(t * Math.PI) * 0.35
        if (t >= 1) {
          this.remove()
          this.phase = 'idle'
          this.phaseT = 0
          this.dir = this.dir === 1 ? -1 : 1
        }
        break
      }
    }
  }

  private commit() {
    const i = this.picks
    if (i >= this.rows) return
    this.rowFlawed[i] = !this.learned && i >= this.flawFrom
    this.paintRow(i)
    this.picks = i + 1
    this.fellVel -= this.cell * 0.028
    // the beat shakes the whole warp
    const jitter = 0.9
    for (let j = 0; j < this.ends; j++) {
      this.warp[j].v += (Math.random() - 0.5) * jitter
    }
    this.lastTreadle = this.draft.treadling[this.effectivePick(i) % this.draft.treadling.length]
    this.onEvent?.({ kind: 'beat', pick: i, at: this.shuttleX, force: this.rowFlawed[i] ? 0.6 : 1 })
  }

  private remove() {
    if (this.picks <= 0) return
    const i = this.picks - 1
    const p = this.effectivePick(i)
    this.picks = i
    if (this.fctx && this.front) {
      const s = this.cell * this.dpr
      this.fctx.clearRect(0, this.rowY(i), this.ends * s, s)
      this.bctx!.clearRect(0, this.rowY(i), this.ends * s, s)
    }
    if (this.strands.length < 26) {
      this.strands.push({
        y: this.ly + this.lh - this.picks * this.cell,
        x0: this.lx,
        x1: this.lx + this.lw,
        life: 1,
        vy: 0.008 + Math.random() * 0.01,
        ph: Math.random() * 6.28,
        col: weftColor(p),
      })
    }
    if (i <= this.flawFrom && !this.learned) {
      this.learned = true
      this.learnFlash = 1
      this.onEvent?.({ kind: 'learned', pick: i, at: 0.5, force: 1 })
    }
    this.onEvent?.({ kind: 'unravel', pick: i, at: this.shuttleX, force: 0.5 })
  }

  /**
   * A bank of coupled damped oscillators, one per warp end.
   *
   * Stiffness rises as the free span shortens — a shorter string is a tighter
   * string. So the more cloth we have made together, the higher and shorter
   * the note, and the less of the warp is still free to move at all. That is
   * not a metaphor bolted on afterwards; it is the only physics that is
   * correct here, and the narrative falls out of it.
   */
  private integrateWarp(dt: number) {
    const w = this.warp
    const n = this.ends
    if (!n) return
    const frames = Math.min(dt, 34) / 16.6667
    const span = Math.max(60, this.span)
    const k = Math.min(2.2, 0.3 * (700 / span))
    const damp = this.reducedMotion ? 0.4 : 0.968
    const cpl = 0.05
    const SUB = 4
    const h = frames / SUB
    const dq = Math.pow(damp, h)

    for (let s = 0; s < SUB; s++) {
      let prev = 0
      for (let j = 0; j < n; j++) {
        const u = w[j].u
        const next = j < n - 1 ? w[j + 1].u : 0
        const f = -k * u + cpl * (prev + next - 2 * u)
        prev = u
        let v = (w[j].v + f * h) * dq
        if (v > 60) v = 60
        else if (v < -60) v = -60
        w[j].v = v
        w[j].u = u + v * h
      }
    }
    for (let j = 0; j < n; j++) {
      if (Math.abs(w[j].u) < 0.012 && Math.abs(w[j].v) < 0.012) {
        w[j].u = 0
        w[j].v = 0
      }
    }
  }

  private integrateFell(dt: number) {
    const h = Math.min(dt, 24) / 16.6667
    const target = this.baseFell()
    const k = 0.26
    const d = 0.74
    this.fellVel += (target - this.fellY) * k * h
    this.fellVel *= Math.pow(d, h)
    this.fellY += this.fellVel * h
    if (Math.abs(this.fellY - target) < 0.05) {
      this.fellY = target
      this.fellVel = 0
    }
  }

  private integrateStrands(dt: number) {
    for (let i = this.strands.length - 1; i >= 0; i--) {
      const s = this.strands[i]
      s.life -= dt * 0.0011
      s.y += s.vy * dt * 0.9
      s.vy += dt * 0.00004
      s.ph += dt * 0.004
      if (s.life <= 0) this.strands.splice(i, 1)
    }
  }

  /* ---------------- render ---------------- */

  render() {
    const g = this.ctx
    const p = this.params
    g.save()
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    g.clearRect(0, 0, this.cssW, this.cssH)

    const cutFall = p.cut > 0 ? Math.min(1, p.cut / 0.62) : 0
    const rewarp = p.cut > 0.65 ? (p.cut - 0.65) / 0.35 : 0
    const tension = rewarp > 0 ? rewarp : p.warpTension

    // Once the cloth is cut away the warp has nothing to end against, so it
    // runs the full length of the loom again. Without this the loom looks
    // broken rather than empty.
    const fellDraw =
      cutFall > 0
        ? this.fellY + (this.ly + this.lh - this.fellY) * easeOutCubic(Math.min(1, cutFall / 0.55))
        : this.fellY

    this.drawFrame(g)

    const lowered: number[] = []
    const lifted: number[] = []
    const cp = this.effectivePick(Math.min(this.picks, this.rows - 1))
    for (let j = 0; j < this.ends; j++) {
      ;(warpUp(this.draft, cp, j) ? lifted : lowered).push(j)
    }

    // ── back sheet of the shed ────────────────────────────────────────
    this.drawWarpSheet(g, lowered, tension, -1, cutFall, fellDraw)

    // ── the weft being laid, then the cloth, then the shuttle ─────────
    if (cutFall < 0.02) this.drawLaidWeft(g)
    this.drawCloth(g, cutFall)
    if (cutFall < 0.02) this.drawStrands(g)
    if (cutFall < 0.02 && this.phase !== 'idle') this.drawShuttle(g)

    // ── front sheet paints over the shuttle: that is the shed ─────────
    this.drawWarpSheet(g, lifted, tension, 1, cutFall, fellDraw)

    // depth: the warp field is darker where it disappears into the beams
    if (this.depth && cutFall < 0.9 && this.fellY > this.ly + 2) {
      g.save()
      g.beginPath()
      g.rect(this.lx - 10, this.ly, this.lw + 20, this.fellY - this.ly)
      g.clip()
      g.fillStyle = this.depth
      g.fillRect(this.lx - 10, this.ly, this.lw + 20, this.lh)
      g.restore()
    }

    if (cutFall < 0.02) this.drawBeater(g)
    if (p.notation > 0.01) this.drawNotation(g, p.notation)
    if (p.dim > 0.01 && !this.learned) this.drawInspection(g, p.dim)
    if (this.learnFlash > 0.01) this.drawLearnFlash(g)
    if (p.cut > 0.02 && p.cut < 0.66) this.drawScissors(g, p.cut)

    this.drawGrain(g)
    g.restore()
  }

  private drawFrame(g: CanvasRenderingContext2D) {
    const x0 = this.lx
    const x1 = this.lx + this.lw
    const top = this.ly
    const bot = this.ly + this.lh

    // the two beams. Ink, flat, graphic — this is a diagram of a machine,
    // not a rendering of one.
    g.fillStyle = C.ink
    g.fillRect(x0 - 14, top - 13, this.lw + 28, 9)
    g.fillStyle = C.inkSoft
    g.fillRect(x0 - 14, top - 4, this.lw + 28, 2)
    g.fillStyle = C.ink
    g.fillRect(x0 - 14, bot + 5, this.lw + 28, 9)

    // side posts, hairline
    g.strokeStyle = 'rgba(20,19,16,0.22)'
    g.lineWidth = 1
    g.beginPath()
    g.moveTo(x0 - 9.5, top - 13)
    g.lineTo(x0 - 9.5, bot + 14)
    g.moveTo(x1 + 9.5, top - 13)
    g.lineTo(x1 + 9.5, bot + 14)
    g.stroke()

    // ruled ticks every 8 ends: the loom is a measuring instrument
    g.strokeStyle = 'rgba(20,19,16,0.3)'
    g.beginPath()
    for (let j = 0; j <= this.ends; j += 8) {
      const x = Math.round(x0 + j * this.cell) + 0.5
      g.moveTo(x, top - 20)
      g.lineTo(x, top - 15)
    }
    g.stroke()
  }

  private drawWarpSheet(
    g: CanvasRenderingContext2D,
    idx: number[],
    tension: number,
    layer: 1 | -1,
    cutFall: number,
    fell: number,
  ) {
    const top = this.ly
    const shedShift = this.shed * this.cell * 1.15 * layer
    const slack = cutFall

    if (layer === 1 && this.shed > 0.04) {
      g.save()
      g.shadowColor = 'rgba(20,19,16,0.3)'
      g.shadowBlur = 7 * this.shed
      g.shadowOffsetX = 3 * this.shed
    }

    for (const j of idx) {
      // staggered tensioning, centre-out, so the warp arrives like a chord
      const d = Math.abs(j - this.ends / 2) / (this.ends / 2)
      const local = Math.max(0, Math.min(1, (tension - d * 0.34) / 0.66))
      if (local <= 0.001) continue

      const end = this.warp[j]
      const x = this.lx + (j + 0.5) * this.cell + end.jitter
      const u = end.u
      const y1 = top + (fell - top) * (this.reducedMotion ? 1 : easeOutCubic(local))
      const bri = layer === 1 ? 14 : -26
      const base = warpColor(j)
      g.strokeStyle = shade(base, bri + (this.focusEnd === j ? 40 : 0))
      g.lineWidth = this.cell * 0.46 * end.gauge * (0.72 + local * 0.28)
      g.globalAlpha = (0.35 + local * 0.65) * (1 - slack * 0.35)

      g.beginPath()
      g.moveTo(x, top)
      if (slack > 0.01) {
        // released tension: the thread remembers being straight, badly
        const w1 = Math.sin(j * 0.7 + this.time * 0.0012) * slack * this.cell * 2.2
        const w2 = Math.cos(j * 0.5 + this.time * 0.0009) * slack * this.cell * 2.6
        g.bezierCurveTo(x + w1, top + (y1 - top) * 0.34, x + w2, top + (y1 - top) * 0.68, x + w1 * 0.4, y1)
      } else {
        const mid = (top + y1) / 2
        g.quadraticCurveTo(x + u + shedShift, mid, x + shedShift * 0.18, y1)
      }
      g.stroke()

      if (this.focusEnd === j) {
        g.globalAlpha = 0.9
        g.strokeStyle = C.madder
        g.lineWidth = 1.5
        g.beginPath()
        g.moveTo(x, top - 3)
        g.lineTo(x, top - 9)
        g.stroke()
      }
    }
    g.globalAlpha = 1
    if (layer === 1 && this.shed > 0.04) g.restore()
  }

  private drawLaidWeft(g: CanvasRenderingContext2D) {
    if (this.phase !== 'fly' && this.phase !== 'beat') return
    const y = this.fellY - this.cell * (1.9 - this.beat * 1.75)
    const x0 = this.lx
    const x1 = this.lx + this.lw
    const sx = x0 + this.shuttleX * this.lw
    const from = this.dir === 1 ? x0 : x1
    g.strokeStyle = weftColor(this.effectivePick(this.picks))
    g.lineWidth = this.cell * 0.46
    g.lineCap = 'round'
    g.beginPath()
    g.moveTo(from, y)
    g.lineTo(sx, y)
    g.stroke()
  }

  private drawCloth(g: CanvasRenderingContext2D, cutFall: number) {
    if (this.picks < 1 || !this.front || !this.back) return
    const s = this.cell * this.dpr
    const h = this.picks * this.cell
    const flip = this.params.flip
    const showBack = flip > 0.5
    const src = showBack ? this.back : this.front

    // flip: a page turn, not a fade. Horizontal compression through zero.
    const k = Math.abs(Math.cos(flip * Math.PI))
    const sw = Math.max(0.001, k)

    g.save()
    if (cutFall > 0) {
      const e = easeInQuad(cutFall)
      g.translate(0, e * (this.cssH - this.fellY + 60))
      g.rotate(e * 0.045)
      g.globalAlpha = 1 - Math.max(0, (cutFall - 0.72) / 0.28)
    }
    g.translate(this.lx + this.lw / 2, this.fellY)
    g.scale(sw, 1)
    g.translate(-this.lw / 2, 0)

    g.shadowColor = 'rgba(20,19,16,0.26)'
    g.shadowBlur = 12
    g.shadowOffsetY = 3
    g.drawImage(src, 0, this.rowY(this.picks - 1), this.ends * s, this.picks * s, 0, 0, this.lw, h)
    g.shadowBlur = 0
    g.shadowOffsetY = 0

    // the fell line: where the cloth is being made right now
    g.fillStyle = 'rgba(20,19,16,0.4)'
    g.fillRect(0, -1, this.lw, 1.5)
    g.restore()

    if (flip > 0.02 && flip < 0.98) {
      // the edge catching light as it turns
      g.save()
      g.globalAlpha = Math.sin(flip * Math.PI) * 0.5
      g.fillStyle = C.paper
      g.fillRect(this.lx + this.lw / 2 - 1.5, this.fellY, 3, h)
      g.restore()
    }
  }

  private drawShuttle(g: CanvasRenderingContext2D) {
    if (this.phase === 'idle') return
    const y = this.fellY - this.cell * (2.1 - this.beat * 1.6)
    const x = this.lx + this.shuttleX * this.lw
    const w = this.cell * 3.3
    const h = this.cell * 1.15
    const speed = this.phase === 'fly' ? 1 : 0.2

    g.save()
    g.translate(x, y)
    // motion smear: three ghosts behind, cheaper and better than blur
    for (let i = 3; i >= 1; i--) {
      g.globalAlpha = 0.1 * speed * (1 / i)
      g.fillStyle = C.ink
      this.shuttlePath(g, -this.dir * i * this.cell * 0.9, w, h)
    }
    g.globalAlpha = 1
    g.fillStyle = C.ink
    this.shuttlePath(g, 0, w, h)
    g.fillStyle = C.madder
    g.beginPath()
    g.arc(0, 0, h * 0.26, 0, 6.2832)
    g.fill()
    g.restore()
  }

  private shuttlePath(g: CanvasRenderingContext2D, dx: number, w: number, h: number) {
    g.beginPath()
    g.moveTo(dx - w / 2, 0)
    g.quadraticCurveTo(dx - w * 0.18, -h / 2, dx + w * 0.18, -h / 2)
    g.lineTo(dx + w / 2, 0)
    g.quadraticCurveTo(dx + w * 0.18, h / 2, dx - w * 0.18, h / 2)
    g.closePath()
    g.fill()
  }

  /**
   * The batten. It hangs tucked under the top beam at rest — a beater parked
   * halfway down the warp reads as a stray black bar, not a machine part —
   * and swings down onto the fell to pack each pick.
   */
  private drawBeater(g: CanvasRenderingContext2D) {
    if (this.beat < 0.012 || this.picks >= this.rows) return
    const rest = this.ly + 14
    const y = rest + (this.fellY - this.cell - rest) * this.beat
    const x0 = this.lx - 12
    const w = this.lw + 24

    g.save()
    g.globalAlpha = 0.16 * this.beat
    g.fillStyle = C.ink
    g.fillRect(x0, y + 6, w, 10 + 14 * this.beat)
    g.globalAlpha = 1
    g.fillStyle = C.ink
    g.fillRect(x0, y - 3, w, 6)
    // reed dents
    g.strokeStyle = 'rgba(20,19,16,0.34)'
    g.lineWidth = 1
    g.beginPath()
    for (let j = 0; j <= this.ends; j += 2) {
      const x = Math.round(this.lx + j * this.cell) + 0.5
      g.moveTo(x, y - 3)
      g.lineTo(x, y - 3 - 9 * (0.4 + this.beat * 0.6))
    }
    g.stroke()
    g.restore()
  }

  private drawStrands(g: CanvasRenderingContext2D) {
    for (const s of this.strands) {
      g.save()
      g.globalAlpha = Math.max(0, s.life) * 0.8
      g.strokeStyle = s.col
      g.lineWidth = this.cell * 0.38
      g.lineCap = 'round'
      g.beginPath()
      g.moveTo(s.x0 - 6, s.y + Math.sin(s.ph) * 4)
      const segs = 5
      for (let i = 1; i <= segs; i++) {
        const t = i / segs
        const x = s.x0 - 6 + (s.x1 - s.x0 + 12) * t
        const y = s.y + Math.sin(s.ph + t * 5.4) * (5 + t * 12) + t * 8
        g.lineTo(x, y)
      }
      g.stroke()
      g.restore()
    }
  }

  /**
   * The threading draft, drawn above the top beam in reserved space (see
   * `resize`) so it never collides with anything. Row pitch adapts to the
   * headroom available; below 3px it is unreadable and simply not drawn.
   */
  private drawNotation(g: CanvasRenderingContext2D, a: number) {
    const s = this.cell
    const top = this.ly
    const rows = SHAFTS
    const np = Math.min(s, (top - 34) / rows)
    if (np < 3.2) return
    const hy = top - 24 - rows * np

    g.save()
    g.globalAlpha = a
    g.strokeStyle = 'rgba(20,19,16,0.16)'
    g.lineWidth = 1
    g.beginPath()
    for (let r = 0; r <= rows; r++) {
      const y = Math.round(hy + r * np) + 0.5
      g.moveTo(this.lx - 8, y)
      g.lineTo(this.lx + this.lw + 8, y)
    }
    g.stroke()

    // one mark per end, on its shaft — a real threading draft, drawn in
    // the order it would be threaded, left to right.
    const visible = Math.ceil(this.ends * Math.min(1, a * 1.25))
    const m = Math.max(1.6, Math.min(s, np) * 0.56)
    for (let j = 0; j < visible; j++) {
      const shaft = this.draft.threading.fn(j)
      const x = this.lx + (j + 0.5) * s
      const y = hy + (rows - 1 - shaft + 0.5) * np
      g.fillStyle = j % 8 === 0 ? C.ink : C.indigo
      g.fillRect(x - m / 2, y - m / 2, m, m)
    }

    g.globalAlpha = a * 0.85
    g.fillStyle = C.graphite
    g.font = '500 9.5px "IBM Plex Mono", monospace'
    g.textBaseline = 'bottom'
    g.fillText(
      `THREADING · ${this.draft.threading.label} · ${SHAFTS} SHAFTS · ${this.ends} ENDS`,
      this.lx - 8,
      hy - 6,
    )
    g.restore()
  }

  /**
   * The turn. The machine has stopped, and it is looking at its own mistake.
   *
   * A veil of linen washes across everything the loom got *right*, leaving
   * only the bad picks at full strength. Inspection by subtraction: the eye
   * has nowhere else to go. This is why `dim` exists as a parameter — it is
   * not a fade, it is an act of attention.
   */
  private drawInspection(g: CanvasRenderingContext2D, a: number) {
    if (this.flawFrom >= this.picks || this.picks < 1) return
    const bandTop = this.fellY
    const bandBot = this.fellY + (this.picks - this.flawFrom) * this.cell
    const clothBot = this.ly + this.lh

    g.save()
    // veil the good cloth below the band
    if (bandBot < clothBot) {
      g.globalAlpha = a * 0.8
      g.fillStyle = C.linen
      g.fillRect(this.lx, bandBot, this.lw, clothBot - bandBot)
    }
    // and veil the free warp above, so the band is the only lit thing
    g.globalAlpha = a * 0.62
    g.fillStyle = C.linen
    g.fillRect(this.lx - 12, this.ly, this.lw + 24, Math.max(0, bandTop - this.ly))

    g.globalAlpha = a
    g.strokeStyle = C.madder
    g.lineWidth = 1.25
    g.beginPath()
    g.rect(this.lx - 3.5, bandTop - 3.5, this.lw + 7, bandBot - bandTop + 7)
    g.stroke()

    const x = this.lx + this.lw
    g.setLineDash([3, 3])
    g.beginPath()
    g.moveTo(x + 4, bandTop - 3.5)
    g.lineTo(x + 22, bandTop - 3.5)
    g.moveTo(x + 4, bandBot + 3.5)
    g.lineTo(x + 22, bandBot + 3.5)
    g.stroke()
    g.setLineDash([])

    g.fillStyle = C.madder
    g.font = '500 10px "IBM Plex Mono", monospace'
    g.textBaseline = 'middle'
    const n = this.picks - this.flawFrom
    if (this.narrow) {
      g.textAlign = 'right'
      g.fillText(`ERR ${n}`, x - 4, bandTop - 13)
    } else {
      g.fillText(`ERR · TREADLE +3`, x + 28, bandTop + 1)
      g.fillText(`${n} PICKS`, x + 28, bandBot - 1)
    }
    g.restore()
  }

  /** the moment it drops below the flaw: a bright line across the fell */
  private drawLearnFlash(g: CanvasRenderingContext2D) {
    const a = this.learnFlash
    g.save()
    g.globalAlpha = a
    g.strokeStyle = C.paper
    g.lineWidth = 2 + a * 4
    g.beginPath()
    g.moveTo(this.lx - 14, this.fellY)
    g.lineTo(this.lx + this.lw + 14, this.fellY)
    g.stroke()
    g.globalAlpha = a * 0.6
    g.strokeStyle = C.ochre
    g.lineWidth = 1
    g.stroke()
    g.restore()
  }

  private drawScissors(g: CanvasRenderingContext2D, cut: number) {
    const t = Math.min(1, cut / 0.62)
    const y = this.fellY
    const x = this.lx - 16 + (this.lw + 32) * easeOutCubic(t)
    g.save()
    g.strokeStyle = C.ink
    g.lineWidth = 1.5
    g.beginPath()
    g.moveTo(this.lx - 16, y)
    g.lineTo(x, y)
    g.stroke()
    g.fillStyle = C.madder
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x - 9, y - 6)
    g.lineTo(x - 9, y + 6)
    g.closePath()
    g.fill()
    g.restore()
  }

  private drawGrain(g: CanvasRenderingContext2D) {
    if (!this.grain) return
    g.save()
    g.globalCompositeOperation = 'multiply'
    g.globalAlpha = 0.16
    const pat = g.createPattern(this.grain, 'repeat')
    if (pat) {
      g.fillStyle = pat
      g.fillRect(0, 0, this.cssW, this.cssH)
    }
    g.restore()
  }
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInQuad = (t: number) => t * t
