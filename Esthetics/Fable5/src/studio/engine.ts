/* 《成器》引擎 —— 一间陶作坊的全部物理、时序与画面。
   单一 rAF 心跳；滚动只提供意图（gs），从不劫持。 */

import { Emitter } from './emitter'
import { ClayAudio } from './audio'
import { easeInOut, easeOut, Seq } from './sequencer'
import { P } from './palette'
import { rng, clamp, lerp, smooth } from './rng'
import {
  M,
  makeDome,
  makeCrack,
  makeCraze,
  smoothProfile,
  slopeLimit,
  paintVessel,
  type VesselGeom,
  type VesselStyle,
} from './vessel'
import type { NarrationKey, Stats, StudioEvents, SurfPt } from './types'

const TAU = Math.PI * 2
const LUMP_N = 16
const GLYPHS = ['言', '文', '字', '语', '话', '句']

interface Phase {
  dur: number
  line?: number
  holdGated?: boolean
  onStart?: () => void
  onTick?: (p: number, dt: number) => void
  onEnd?: () => void
}

interface Snapshot {
  r: Float32Array
  h: number
}

interface Dust {
  x: number
  y: number
  vx: number
  vy: number
  a: number
}

type PointerMode = 'none' | 'poke' | 'push' | 'pending' | 'shape' | 'section' | 'duet' | 'spin'

export class StudioEngine {
  private canvas!: HTMLCanvasElement
  private ctx!: CanvasRenderingContext2D
  private W = 0
  private H = 0
  private dpr = 1
  private mobile = false

  readonly bus = new Emitter<StudioEvents>()
  readonly audio = new ClayAudio()
  calm = false

  // 滚动
  private g = 0
  private gs = 0
  private chapter = -1

  // 轮
  private theta = 0.6
  private omega = 0
  private omegaBoost = 0
  private wheelAlpha = 0
  private stageCx = 0
  private wheelY = 0
  private wheelHalf = 160
  private maxR = 130
  private vesselMaxH = 300

  // 泥团（上轮前）
  private lumpR = 64
  private lumpX = 0
  private lumpY = 0
  private lumpBase = new Float32Array(LUMP_N)
  private lumpCur = new Float32Array(LUMP_N)
  private lumpVel = new Float32Array(LUMP_N)
  private lumpGlyphs: { ch: string; a: number; d: number; rot: number; size: number }[] = []
  private mounted = false
  private mountT = -1 // 上轮动画时钟

  // 坯体
  private r = new Float32Array(M)
  private rT = new Float32Array(M)
  private rV = new Float32Array(M)
  private hgt = 88
  private hgtT = 88
  private hgtV = 0
  private ecc = 0
  private eccV = 0
  private eccHold: number | null = null
  private jitter = 0
  private lift = 0
  private liftV = 0

  // 手（我的在场）
  private handsA = 0
  private handsH = 0.5
  private handsMode: 'none' | 'pass' | 'recenter' | 'smooth' | 'gold' = 'none'
  private smoothDelay = -1
  private smoothT = -1

  // 问答
  private qQueue: Phase[] | null = null
  private qElapsed = 0
  private qStarted = false
  private activeQ: string | null = null
  private holding = false
  private duetPausedSent = false
  private openedUp = false // 进「塑」时我先开口的一手

  // 窑
  private kilnSeq: Seq | null = null
  private kilnStarted = false
  private kilnDone = false
  private heat = 0
  private shimmerT = 0
  private shimmerFrozen = false
  private crack: SurfPt[] | null = null
  private crackBranch: SurfPt[] | null = null
  private crackP = 0
  private goldP = 0
  private craze = 0
  private crazeWebs: SurfPt[][] | null = null
  private fired = 0
  private glaze = 0

  // 塑形痕迹
  private marble = 0
  private bare: { h0: number; h1: number } | null = null
  private bareMarked = false
  private touches: number[] = []
  private passHeights: number[] = []
  private wallThin = 0

  // 剖面 / 取器
  private sectionP = 0
  private sectionOn = false
  private cutP = -1
  private isCut = false
  private cutSlide = 0

  // 快照（每一圈都能回）
  private snaps: Snapshot[] = []

  // 指针
  private pMode: PointerMode = 'none'
  private pX = 0
  private grabX = 0
  private grabY = 0
  private pendingT = 0
  private dragMoved = 0
  private dragHeights: number[] = []
  private lastSquish = 0
  private lastRattle = 0
  private lastInteract = 0
  private hintShown = false

  // 尘
  private dust: Dust[] = []

  // 吊牌绳锚
  private anchors = new Map<number, HTMLElement>()

  stats: Stats = { touches: 0, passes: 0, rewinds: 0, cracked: false, mended: false, questionsDone: [] }

  private raf = 0
  private lastT = 0
  private running = false
  private time = 0
  private destroyed = false

  // ————————————————— 生命周期 —————————————————

  attach(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('no 2d context')
    this.ctx = ctx
    this.resize()
    const seedR = rng(20260726)
    for (let i = 0; i < LUMP_N; i++) {
      this.lumpBase[i] = 1 + (seedR() - 0.5) * 0.14
      this.lumpCur[i] = this.lumpBase[i]!
    }
    for (let i = 0; i < 5; i++) {
      this.lumpGlyphs.push({
        ch: GLYPHS[Math.floor(seedR() * GLYPHS.length)]!,
        a: seedR() * TAU,
        d: 0.15 + seedR() * 0.6,
        rot: (seedR() - 0.5) * 1.2,
        size: 14 + seedR() * 12,
      })
    }
    canvas.addEventListener('pointerdown', this.onDown)
    canvas.addEventListener('pointermove', this.onMove)
    window.addEventListener('pointerup', this.onUp)
    window.addEventListener('pointercancel', this.onUp)
    this.wake()
  }

  destroy(): void {
    this.destroyed = true
    cancelAnimationFrame(this.raf)
    this.audio.stopWheel()
    this.canvas.removeEventListener('pointerdown', this.onDown)
    this.canvas.removeEventListener('pointermove', this.onMove)
    window.removeEventListener('pointerup', this.onUp)
    window.removeEventListener('pointercancel', this.onUp)
    this.bus.clear()
  }

  resize(): void {
    const { canvas } = this
    this.W = window.innerWidth
    this.H = window.innerHeight
    this.mobile = this.W < 880
    this.dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(this.W * this.dpr)
    canvas.height = Math.round(this.H * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    if (this.mobile) {
      this.stageCx = this.W * 0.5
      this.wheelY = this.H * 0.46
      this.wheelHalf = clamp(this.W * 0.3, 88, 140)
      this.vesselMaxH = this.H * 0.3
      this.lumpX = this.W * 0.5
      this.lumpY = this.H * 0.355
      this.lumpR = clamp(this.W * 0.12, 38, 52)
    } else {
      this.stageCx = this.W * 0.63
      this.wheelY = this.H * 0.76
      this.wheelHalf = clamp(this.W * 0.16, 120, 205)
      this.vesselMaxH = this.H * 0.46
      this.lumpX = this.W * 0.62
      this.lumpY = this.H * 0.5
      this.lumpR = clamp(this.W * 0.055, 52, 84)
    }
    this.maxR = this.wheelHalf * 0.8
    this.wake()
  }

  // ————————————————— 外部输入 —————————————————

  setScroll(g: number): void {
    this.g = clamp(g, 0, 4.999)
    this.wake()
  }

  setCalm(b: boolean): void {
    this.calm = b
    if (b) {
      this.kilnSeq?.skip()
      this.omega = 0
    }
    this.wake()
  }

  setSound(b: boolean): void {
    this.audio.setEnabled(b)
  }

  setAnchor(chapter: number, el: HTMLElement | null): void {
    if (el) this.anchors.set(chapter, el)
    else this.anchors.delete(chapter)
  }

  setHold(b: boolean): void {
    this.holding = b
    this.lastInteract = this.time
    this.wake()
  }

  /** 键盘版「推它一下」 */
  pushDemo(): void {
    if (this.kilnDone || !this.mounted) return
    this.eccHold = null
    this.ecc = 52
    this.eccV = 0
    window.setTimeout(() => this.recenter(), 420)
    this.wake()
  }

  /** 原则悬停 → 手在对应高度轻扶 */
  hoverPrinciple(i: number | null): void {
    if (i == null) {
      if (this.handsMode === 'smooth' && this.smoothT < 0) this.handsMode = 'none'
    } else if (this.handsMode === 'none' || (this.handsMode === 'smooth' && this.smoothT < 0)) {
      this.handsMode = 'smooth'
      this.handsH = 0.15 + i * 0.18
    }
    this.wake()
  }

  startQuestion(id: string): boolean {
    if (this.qQueue || this.kilnStarted || !this.mounted) return false
    if (this.stats.questionsDone.includes(id)) return false
    this.activeQ = id
    this.qElapsed = 0
    this.qQueue = this.buildQuestion(id)
    this.bus.emit('qstate', { id, state: 'active' })
    if (this.calm) this.finishQuestionInstantly()
    this.wake()
    return true
  }

  rewind(): void {
    if (this.snaps.length <= 1 || this.qQueue || this.kilnStarted) {
      this.bus.emit('rewound', false)
      return
    }
    this.snaps.pop()
    const snap = this.snaps[this.snaps.length - 1]!
    this.rT.set(snap.r)
    this.hgtT = snap.h
    this.stats.rewinds++
    this.omegaBoost = this.calm ? 0 : -6
    if (!this.calm) {
      for (let k = 0; k < 6; k++) {
        window.setTimeout(() => this.audio.ratchet(1 - k * 0.13), k * 90)
      }
    }
    this.bus.emit('rewound', true)
    this.emitStats()
    this.wake()
  }

  skipKiln(): void {
    this.kilnSeq?.skip()
  }

  openSection(b: boolean): void {
    this.sectionOn = b
    this.wake()
  }

  cutOff(): void {
    if (this.isCut || !this.kilnDone) return
    this.isCut = true
    this.cutP = 0
    this.audio.wire()
    this.wake()
  }

  pulseGold(): void {
    if (this.goldP >= 1 && !this.calm) this.audio.chime()
  }

  /** 同步推进引擎时间（headless 截图 / 测试用；不依赖 rAF） */
  simulate(seconds: number): void {
    const step = 1 / 60
    const n = Math.ceil(seconds / step)
    for (let i = 0; i < n; i++) {
      this.time += step
      this.update(step)
    }
    this.draw()
    this.wake()
  }

  /** 调试读数（?g= 模式） */
  debugInfo(): string {
    return [
      `g=${this.g.toFixed(3)} gs=${this.gs.toFixed(3)} ch=${this.chapter}`,
      `mounted=${this.mounted} mountT=${this.mountT.toFixed(2)} calm=${this.calm}`,
      `omega=${this.omega.toFixed(2)} running=${this.running} kiln=${this.kilnStarted}/${this.kilnDone}`,
      `crackP=${this.crackP.toFixed(2)} goldP=${this.goldP.toFixed(2)} hgt=${this.hgt.toFixed(0)}`,
    ].join('\n')
  }

  /** 档案导出所需的全部状态 */
  exportState() {
    return {
      r: Float32Array.from(this.r),
      hgt: this.hgt,
      marble: this.marble,
      bare: this.bare,
      bareMarked: this.bareMarked,
      crack: this.crack,
      crackBranch: this.crackBranch,
      crazeWebs: this.crazeWebs,
      touches: this.touches,
      passHeights: this.passHeights,
      wallThin: this.wallThin,
      stats: this.stats,
    }
  }

  // ————————————————— 心跳 —————————————————

  wake(): void {
    if (this.running || this.destroyed) return
    this.running = true
    this.lastT = performance.now()
    const loop = (t: number) => {
      if (this.destroyed) return
      const dt = clamp((t - this.lastT) / 1000, 0, 0.05)
      this.lastT = t
      this.time += dt
      this.update(dt)
      this.draw()
      if (this.shouldRun()) {
        this.raf = requestAnimationFrame(loop)
      } else {
        this.running = false
        this.audio.wheel(0)
      }
    }
    this.raf = requestAnimationFrame(loop)
  }

  private shouldRun(): boolean {
    if (document.hidden) return false
    if (this.omega > 0.02 || Math.abs(this.omegaBoost) > 0.02) return true
    if (this.kilnSeq && !this.kilnSeq.done) return true
    if (this.qQueue || this.mountT >= 0 || this.cutP >= 0 && this.cutP < 1) return true
    if (Math.abs(this.gs - this.g) > 0.001) return true
    if (this.handsA > 0.002 || this.sectionP > 0.01 || this.dust.length > 0) return true
    if (this.isCut && (Math.abs(this.liftV) > 0.4 || Math.abs(4 - this.lift) > 0.1)) return true
    if (this.pMode !== 'none') return true
    if (this.smoothDelay >= 0 || this.smoothT >= 0) return true
    if (Math.abs(this.ecc) > 0.1 || Math.abs(this.hgt - this.hgtT) > 0.3) return true
    for (let i = 0; i < M; i += 4) if (Math.abs(this.r[i]! - this.rT[i]!) > 0.25) return true
    if (this.goldP >= 1 && !this.calm && this.chapter >= 3) return true // 金上微光
    if (this.time - this.lastInteract < 2) return true
    return false
  }

  // ————————————————— 更新 —————————————————

  private update(dt: number): void {
    // 滚动平滑
    const k = this.calm ? 1 : 1 - Math.exp(-dt * 7)
    this.gs += (this.g - this.gs) * k
    const ch = clamp(Math.floor(this.gs + 0.0001), 0, 4)
    if (ch !== this.chapter) {
      this.chapter = ch
      this.bus.emit('chapter', ch)
    }

    // 上轮判定（单向闩锁）
    if (!this.mounted && this.gs >= 0.98) {
      this.mounted = true
      this.mountT = this.calm ? 999 : 0
      this.initProfile()
      if (this.calm) {
        this.audio.splat()
        this.snaps.push(this.snapshot())
        this.bus.emit('splat')
      }
    }
    if (this.mountT >= 0 && this.mountT < 900) {
      this.mountT += dt
      if (this.mountT >= 0.4) {
        this.mountT = 999
        this.audio.splat()
        this.ecc = 11
        this.snaps.push(this.snapshot())
        this.bus.emit('splat')
      }
    }

    // 进「塑」——我先开一手口（交手的仪式）
    if (!this.openedUp && this.mounted && this.gs >= 2.02 && !this.kilnStarted) {
      this.openedUp = true
      this.hgtT = Math.min(this.vesselMaxH, this.hgtT + 16)
      for (let i = M - 10; i < M; i++) this.rT[i] = Math.min(this.maxR, this.rT[i]! * 1.12)
      if (!this.calm) {
        this.handsMode = 'pass'
        this.handsH = 0.95
        window.setTimeout(() => {
          if (this.handsMode === 'pass' && !this.qQueue) this.handsMode = 'none'
        }, 950)
      }
      this.audio.squish(0.6)
    }

    // 窑触发
    if (!this.kilnStarted && this.gs >= 3.02 && this.mounted) this.startKiln()
    if (this.kilnStarted && !this.kilnDone && this.gs >= 4.0) this.kilnSeq?.skip()

    // 轮速
    this.wheelAlpha = smooth(0.72, 1.02, this.gs)
    let target = 0
    if (this.mounted && !this.isCut) {
      if (this.kilnSeq && !this.kilnSeq.done) target = 0
      else if (this.kilnDone) target = this.chapter >= 4 ? 0.55 : 0.2
      else if (this.chapter === 1) target = 3.0
      else if (this.chapter >= 2) target = 2.4
      else target = 2.2
    }
    if (this.calm) target = 0
    if (this.sectionOn || this.pMode === 'section') target *= 0.12
    const oK = 1 - Math.exp(-dt * 2.2)
    this.omega += (target + this.omegaBoost - this.omega) * oK
    this.omegaBoost *= Math.exp(-dt * 2.4)
    if (this.pMode === 'spin') this.omega = clamp(this.omega, -5, 5)
    this.theta += this.omega * dt
    this.audio.wheel(clamp(Math.abs(this.omega) / 3.2, 0, 1))

    // 泥团松弛
    if (!this.mounted) {
      for (let i = 0; i < LUMP_N; i++) {
        const f = (this.lumpBase[i]! - this.lumpCur[i]!) * 26
        this.lumpVel[i] = (this.lumpVel[i]! + f * dt) * Math.exp(-dt * 6)
        this.lumpCur[i] = this.lumpCur[i]! + this.lumpVel[i]! * dt * 8
      }
    }

    // 偏心
    if (this.eccHold != null) this.ecc = this.eccHold
    else {
      const stiff = this.handsMode === 'recenter' ? 42 : 10
      const f = -this.ecc * stiff
      this.eccV = (this.eccV + f * dt) * Math.exp(-dt * (this.handsMode === 'recenter' ? 9 : 4))
      this.ecc += this.eccV * dt * 8
      if (Math.abs(this.ecc) < 0.08 && this.handsMode === 'recenter') {
        this.handsMode = 'none'
        this.bus.emit('recentered')
      }
    }
    const danger = clamp((Math.abs(this.ecc) / 56) * (Math.abs(this.omega) / 3), 0, 1.2)
    this.jitter = danger > 0.32 ? (danger - 0.32) * 4 : 0
    if (danger > 0.45 && this.time - this.lastRattle > 0.11) {
      this.lastRattle = this.time
      this.audio.rattle(danger)
    }

    // 剖面开合
    const secTarget = this.sectionOn || this.pMode === 'section' ? 1 : 0
    const sPrev = this.sectionP
    this.sectionP += (secTarget - this.sectionP) * (this.calm ? 1 : 1 - Math.exp(-dt * 10))
    if (sPrev < 0.5 !== this.sectionP < 0.5) this.bus.emit('section', this.sectionP >= 0.5)

    // 坯体弹簧
    for (let i = 0; i < M; i++) {
      const f = (this.rT[i]! - this.r[i]!) * 90
      this.rV[i] = (this.rV[i]! + f * dt) * Math.exp(-dt * 14)
      this.r[i] = this.r[i]! + this.rV[i]! * dt
    }
    const hf = (this.hgtT - this.hgt) * 60
    this.hgtV = (this.hgtV + hf * dt) * Math.exp(-dt * 10)
    this.hgt += this.hgtV * dt

    // 取器抬升
    if (this.cutP >= 0 && this.cutP < 1) {
      this.cutP = Math.min(1, this.cutP + dt / (this.calm ? 0.001 : 0.7))
      if (this.cutP >= 1) {
        this.liftV = this.calm ? 0 : 60
        this.bus.emit('cutdone')
      }
    }
    if (this.isCut && this.cutP >= 1) {
      // 离轮：一道弧线，落到旁边的板上
      this.cutSlide = this.calm ? 1 : this.cutSlide + (1 - this.cutSlide) * (1 - Math.exp(-dt * 2.6))
      this.lift = this.cutSlide * 8 + Math.sin(Math.PI * clamp(this.cutSlide, 0, 1)) * 22
    }

    // 我的手 —— 透明度趋近
    const handsTarget = this.handsMode === 'none' ? 0 : 0.85
    this.handsA += (handsTarget - this.handsA) * (1 - Math.exp(-dt * 8))

    // 释放后的平顺（你出手，我承重）
    if (this.smoothDelay >= 0) {
      this.smoothDelay -= dt
      if (this.smoothDelay < 0) {
        this.smoothT = 0
        const goal = Float32Array.from(this.rT)
        smoothProfile(goal, 0.55)
        smoothProfile(goal, 0.4)
        slopeLimit(goal, 7.5)
        for (let i = 0; i < M; i++) this.rT[i] = goal[i]!
        this.handsMode = 'smooth'
      }
    }
    if (this.smoothT >= 0) {
      this.smoothT += dt
      const p = clamp(this.smoothT / 0.7, 0, 1)
      this.handsH = 0.12 + p * 0.8
      if (p >= 1) {
        this.smoothT = -1
        if (this.handsMode === 'smooth') this.handsMode = 'none'
        this.snaps.push(this.snapshot())
        this.trimSnaps()
      }
    }

    // 问答推进
    this.tickQuestion(dt)

    // 窑
    if (this.kilnSeq && !this.kilnSeq.done) this.kilnSeq.tick(dt)
    if (!this.shimmerFrozen && !this.calm) this.shimmerT += dt * (0.6 + this.heat * 1.4)

    // 尘
    for (let i = this.dust.length - 1; i >= 0; i--) {
      const d = this.dust[i]!
      d.vy += 260 * dt
      d.x += d.vx * dt
      d.y += d.vy * dt
      d.a -= dt * 1.4
      if (d.a <= 0) this.dust.splice(i, 1)
    }

    // 长按判定（pending → section）
    if (this.pMode === 'pending') {
      this.pendingT += dt
      if (this.pendingT > 0.55 && !this.holdingForDuet()) {
        this.pMode = 'section'
      }
    }

    // 静置提示
    if (
      !this.hintShown &&
      this.chapter === 2 &&
      this.mounted &&
      !this.kilnStarted &&
      !this.calm &&
      this.time - this.lastInteract > 15 &&
      this.lastInteract > 0
    ) {
      this.hintShown = true
      this.bus.emit('hint', 'hold')
    }
  }

  private holdingForDuet(): boolean {
    return this.qQueue != null && this.qQueue[0]?.holdGated === true
  }

  // ————————————————— 问答 —————————————————

  private buildQuestion(id: string): Phase[] {
    const gap = (dur = 0.35): Phase => ({ dur })
    if (id === 'think') {
      const pass = (i: number): Phase => ({
        dur: 1.9,
        line: i,
        onStart: () => {
          this.handsMode = 'pass'
          this.hgtT = Math.min(this.vesselMaxH, this.hgtT + 26)
          this.passHeights.push(0.25 + i * 0.24)
        },
        onTick: (p) => {
          this.handsH = 0.08 + p * 0.86
        },
        onEnd: () => {
          this.stats.passes++
          this.wallThin = Math.min(1, this.wallThin + 0.22)
          this.commitRefine(0.22)
          this.emitStats()
        },
      })
      return [pass(0), gap(), pass(1), gap(), pass(2)]
    }
    if (id === 'unknown') {
      return [
        {
          dur: 1.3,
          line: 0,
          onStart: () => {
            this.handsMode = 'pass'
          },
          onTick: (p) => {
            this.handsH = 0.9 - p * 0.25
          },
          onEnd: () => {
            this.bare = { h0: 0.56, h1: 0.7 }
            this.bareMarked = true
            this.audio.ratchet(0.8)
          },
        },
        { dur: 1.7, line: 1 },
        {
          dur: 1.7,
          line: 2,
          onEnd: () => {
            this.handsMode = 'none'
          },
        },
      ]
    }
    if (id === 'made') {
      return [
        {
          dur: 2.6,
          line: 0,
          onTick: (p) => {
            this.marble = p
          },
        },
        { dur: 1.5, line: 1 },
        { dur: 1.5, line: 2 },
      ]
    }
    // together —— 四只手
    return [
      {
        dur: 1.4,
        line: 0,
        onStart: () => {
          this.handsMode = 'pass'
          this.hgtT = Math.min(this.vesselMaxH, this.hgtT + 10)
          this.passHeights.push(0.88)
        },
        onTick: (p) => {
          this.handsH = 0.2 + p * 0.6
        },
      },
      {
        dur: 2.6,
        line: 1,
        holdGated: true,
        onStart: () => {
          this.bus.emit('awaithold', true)
          this.duetPausedSent = false
        },
        onTick: (_p, dt) => {
          this.hgtT = Math.min(this.vesselMaxH, this.hgtT + dt * 20)
          for (let i = M - 7; i < M; i++) this.rT[i] = Math.max(12, this.rT[i]! * (1 - dt * 0.05))
          this.handsH = 0.86
        },
        onEnd: () => {
          this.bus.emit('awaithold', false)
          this.stats.passes++
          this.emitStats()
        },
      },
      {
        dur: 1.5,
        line: 2,
        onTick: (p) => {
          this.handsH = 0.86 - p * 0.3
        },
        onEnd: () => {
          this.handsMode = 'none'
          this.commitRefine(0.18)
        },
      },
    ]
  }

  private tickQuestion(dt: number): void {
    if (!this.qQueue || !this.activeQ) return
    const ph = this.qQueue[0]
    if (!ph) {
      this.finishQuestion()
      return
    }
    if (!this.qStarted) {
      this.qStarted = true
      ph.onStart?.()
    }
    if (ph.holdGated && !this.holding) {
      if (!this.duetPausedSent && this.qElapsed > 0.1) {
        this.duetPausedSent = true
        this.bus.emit('duetpaused', true)
      }
      return
    }
    if (ph.holdGated && this.duetPausedSent) {
      this.duetPausedSent = false
      this.bus.emit('duetpaused', false)
    }
    this.qElapsed += dt
    const p = clamp(this.qElapsed / ph.dur, 0, 1)
    ph.onTick?.(easeInOut(p), dt)
    if (ph.line != null) this.bus.emit('reveal', { id: this.activeQ, line: ph.line, p })
    if (p >= 1) {
      ph.onEnd?.()
      this.qQueue.shift()
      this.qElapsed = 0
      this.qStarted = false
    }
  }

  private finishQuestion(): void {
    const id = this.activeQ!
    this.qQueue = null
    this.activeQ = null
    this.stats.questionsDone.push(id)
    this.snaps.push(this.snapshot())
    this.trimSnaps()
    this.bus.emit('qstate', { id, state: 'done' })
    this.emitStats()
  }

  private finishQuestionInstantly(): void {
    const id = this.activeQ!
    for (const ph of this.qQueue!) {
      ph.onStart?.()
      ph.onTick?.(1, ph.dur)
      if (ph.line != null) this.bus.emit('reveal', { id, line: ph.line, p: 1 })
      ph.onEnd?.()
    }
    if (id === 'made') this.marble = 1
    this.handsMode = 'none'
    this.qQueue = []
    this.finishQuestion()
  }

  private commitRefine(amount: number): void {
    const goal = Float32Array.from(this.rT)
    smoothProfile(goal, amount)
    slopeLimit(goal, 8)
    this.rT.set(goal)
  }

  // ————————————————— 窑 —————————————————

  private startKiln(): void {
    this.kilnStarted = true
    this.qQueue = null
    this.activeQ = null
    const seed = Math.floor(this.hgt * 7 + this.r[20]! * 13) + 77
    const { main, branch } = makeCrack(seed)
    this.crack = main
    this.crackBranch = branch
    this.crazeWebs = makeCraze(seed + 1)
    const N = (k: NarrationKey) => () => this.bus.emit('narration', k)
    const seq = new Seq(
      [
        { dur: 1.1, onStart: N('enter'), onUpdate: (p) => (this.heat = p * 0.12) },
        {
          dur: 2.6,
          onStart: () => this.audio.kilnSwell(2.6),
          onUpdate: (p) => {
            this.heat = 0.12 + p * 0.5
            this.fired = p * 0.4
          },
        },
        {
          dur: 2.2,
          onStart: N('fire'),
          onUpdate: (p) => {
            this.heat = 0.62 + p * 0.38
            this.fired = 0.4 + p * 0.35
          },
        },
        {
          dur: 0.3,
          onStart: () => {
            this.audio.crack()
            this.spawnDust()
            this.stats.cracked = true
          },
          onUpdate: (p) => (this.crackP = p * 0.42),
        },
        { dur: 0.9, onStart: () => (this.shimmerFrozen = true) },
        {
          dur: 0.28,
          onStart: () => {
            this.audio.rattle(1)
            this.spawnDust()
          },
          onUpdate: (p) => (this.crackP = 0.42 + p * 0.33),
        },
        { dur: 1.1, onStart: N('crack') },
        { dur: 0.35, onUpdate: (p) => (this.crackP = 0.75 + p * 0.25) },
        {
          dur: 2.3,
          onStart: () => {
            N('still')()
            this.shimmerFrozen = false
          },
          onUpdate: (p) => {
            this.heat = 1 - p * 0.62
            this.fired = 0.75 + p * 0.25
          },
        },
        { dur: 1.4, onUpdate: (p) => (this.heat = 0.38 - p * 0.26) },
        {
          dur: 0.9,
          onStart: () => {
            N('gold')()
            this.handsMode = 'gold'
          },
        },
        {
          dur: 5.0,
          ease: easeInOut,
          onUpdate: (p) => {
            this.goldP = p
            this.handsH = 0.92 - p * 0.55
          },
        },
        {
          dur: 0.7,
          onStart: () => {
            this.audio.chime()
            this.stats.mended = true
            N('mended')()
            this.handsMode = 'none'
          },
        },
        {
          dur: 2.0,
          onStart: N('crazing'),
          onUpdate: (p) => {
            this.craze = p
            this.glaze = p
            this.heat = 0.12 * (1 - p)
          },
        },
        { dur: 0.6 },
      ],
      () => {
        this.heat = 0
        this.crackP = 1
        this.goldP = 1
        this.craze = 1
        this.glaze = 1
        this.fired = 1
        this.kilnDone = true
        this.shimmerFrozen = false
        this.handsMode = 'none'
        this.bus.emit('narration', null)
        this.bus.emit('kilndone')
        this.emitStats()
      },
    )
    this.kilnSeq = seq
    if (this.calm) seq.skip()
  }

  private spawnDust(): void {
    if (this.calm || !this.crack) return
    const mid = this.crack[Math.floor(this.crack.length / 2)]!
    const y = this.wheelY - 7 - mid.h * this.hgt
    const i = Math.round(mid.h * (M - 1))
    const x = this.stageCx + mid.u * this.r[i]!
    for (let k = 0; k < 4; k++) {
      this.dust.push({ x: x + (Math.random() - 0.5) * 8, y, vx: (Math.random() - 0.5) * 22, vy: 12, a: 0.7 })
    }
  }

  // ————————————————— 快照 —————————————————

  private snapshot(): Snapshot {
    return { r: Float32Array.from(this.rT), h: this.hgtT }
  }

  private trimSnaps(): void {
    if (this.snaps.length > 14) this.snaps.splice(1, this.snaps.length - 14)
  }

  private emitStats(): void {
    this.bus.emit('stats', { ...this.stats, questionsDone: [...this.stats.questionsDone] })
  }

  private initProfile(): void {
    const dome = makeDome(this.maxR * 0.72)
    this.r.set(dome)
    this.rT.set(dome)
    this.rV.fill(0)
    this.hgt = this.mobile ? 66 : 88
    this.hgtT = this.hgt
  }

  // ————————————————— 指针 —————————————————

  private canvasPos(e: PointerEvent): [number, number] {
    const rect = this.canvas.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  private hitLump(x: number, y: number): boolean {
    if (this.mounted) return false
    const dx = x - this.lumpX
    const dy = y - this.lumpY
    return dx * dx + dy * dy < (this.lumpR + 26) ** 2
  }

  /** 器的当前中轴（取下后滑到轮旁的板上） */
  private vesselCx(): number {
    return this.stageCx + easeInOut(clamp(this.cutSlide, 0, 1)) * (this.wheelHalf * 1.18 + 26)
  }

  private hitVessel(x: number, y: number): boolean {
    if (!this.mounted) return false
    const top = this.wheelY - 7 - this.lift - this.hgt
    if (y < top - 26 || y > this.wheelY + 6) return false
    const t = clamp((this.wheelY - 7 - this.lift - y) / Math.max(1, this.hgt), 0, 1)
    const i = Math.round(t * (M - 1))
    return Math.abs(x - this.vesselCx()) < this.r[i]! + 30
  }

  private hitGold(x: number, y: number): boolean {
    if (this.goldP < 1 || !this.crack) return false
    for (const p of this.crack) {
      const i = Math.round(p.h * (M - 1))
      const px = this.vesselCx() + p.u * this.r[i]!
      const py = this.wheelY - 7 - this.lift - p.h * this.hgt
      if ((x - px) ** 2 + (y - py) ** 2 < 18 * 18) return true
    }
    return false
  }

  private onDown = (e: PointerEvent): void => {
    this.audio.gesture()
    const [x, y] = this.canvasPos(e)
    this.pX = x
    this.grabX = x
    this.grabY = y
    this.dragMoved = 0
    this.dragHeights = []
    this.lastInteract = this.time
    const c = this.chapter
    if (!this.mounted && this.hitLump(x, y)) {
      this.pMode = 'poke'
      this.canvas.setPointerCapture(e.pointerId)
      this.pokeLump(x, y, true)
    } else if (this.hitVessel(x, y)) {
      this.canvas.setPointerCapture(e.pointerId)
      if (this.holdingForDuet()) {
        this.pMode = 'duet'
        this.setHold(true)
      } else if (c === 1 && !this.kilnDone) {
        this.pMode = 'push'
        this.eccHold = this.ecc
      } else if (c === 2 && !this.kilnStarted && !this.qQueue) {
        this.pMode = 'pending'
        this.pendingT = 0
      } else if (c >= 3 && this.kilnDone) {
        if (this.hitGold(x, y)) {
          this.pulseGold()
          this.bus.emit('goldopen')
          this.pMode = 'none'
        } else {
          this.pMode = 'pending'
          this.pendingT = 0
        }
      }
    }
    this.wake()
  }

  private onMove = (e: PointerEvent): void => {
    const [x, y] = this.canvasPos(e)
    const dx = x - this.pX
    this.pX = x
    this.lastInteract = this.time
    switch (this.pMode) {
      case 'poke':
        this.pokeLump(x, y, false)
        break
      case 'push': {
        this.eccHold = clamp((x - this.grabX) * 0.9, -60, 60)
        break
      }
      case 'pending': {
        this.dragMoved += Math.abs(dx) + Math.abs(y - this.grabY) * 0.2
        if (this.dragMoved > 9) {
          if (this.chapter === 2 && !this.kilnStarted) this.pMode = 'shape'
          else if (this.chapter >= 3 && this.kilnDone) this.pMode = 'spin'
        }
        break
      }
      case 'shape':
        this.shapeAt(x, y, dx)
        break
      case 'spin':
        this.omega += dx * 0.016
        this.omega = clamp(this.omega, -5, 5)
        break
      default: {
        // 悬停光标 —— 只在真的可以上手时才示意
        const overGold = this.hitGold(x, y)
        const vesselOk =
          this.hitVessel(x, y) &&
          ((this.chapter === 1 && !this.kilnDone) ||
            (this.chapter === 2 && !this.kilnStarted && !this.qQueue) ||
            (this.chapter >= 3 && this.kilnDone))
        const interactive = this.hitLump(x, y) || vesselOk || overGold
        this.canvas.style.cursor = overGold ? 'pointer' : interactive ? 'grab' : 'default'
      }
    }
    if (this.pMode !== 'none') this.wake()
  }

  private onUp = (): void => {
    const mode = this.pMode
    this.pMode = 'none'
    this.pendingT = 0
    switch (mode) {
      case 'poke': {
        // 泥记住一点点
        for (let i = 0; i < LUMP_N; i++) {
          this.lumpBase[i] = this.lumpBase[i]! + (this.lumpCur[i]! - this.lumpBase[i]!) * 0.1
        }
        break
      }
      case 'push':
        this.eccHold = null
        this.recenter()
        break
      case 'shape': {
        if (this.dragHeights.length > 0) {
          const mean = this.dragHeights.reduce((a, b) => a + b, 0) / this.dragHeights.length
          this.touches.push(clamp(mean, 0.02, 0.98))
          this.stats.touches++
          this.smoothDelay = 0.35
          this.emitStats()
        }
        break
      }
      case 'duet':
        this.setHold(false)
        break
      case 'section':
        break
    }
    this.wake()
  }

  private recenter(): void {
    if (Math.abs(this.ecc) < 2) return
    this.handsMode = 'recenter'
    this.handsH = 0.32
  }

  private pokeLump(x: number, y: number, first: boolean): void {
    const dx = x - this.lumpX
    const dy = y - this.lumpY
    const dist = Math.hypot(dx, dy)
    const ang = Math.atan2(dy, dx)
    const depth = clamp(1 - dist / (this.lumpR * 1.15), 0, 0.5)
    if (depth <= 0.01) return
    const amount = depth * (first ? 0.5 : 0.13)
    for (let i = 0; i < LUMP_N; i++) {
      const a = (i / LUMP_N) * TAU
      let dd = Math.abs(a - ((ang % TAU) + TAU) % TAU)
      if (dd > Math.PI) dd = TAU - dd
      const dent = Math.exp(-(dd * dd) * 3.2)
      // 体积守恒：按下去的泥从两侧鼓出来
      const bulge = Math.exp(-((dd - 1.25) * (dd - 1.25)) * 4) * 0.55
      this.lumpCur[i] = clamp(this.lumpCur[i]! - amount * dent + amount * bulge, 0.5, 1.35)
    }
    if (this.time - this.lastSquish > 0.13) {
      this.lastSquish = this.time
      this.audio.squish(0.5 + depth)
    }
  }

  private shapeAt(x: number, y: number, dx: number): void {
    const h = clamp((this.wheelY - 7 - this.lift - y) / Math.max(1, this.hgt), 0.02, 1)
    const iC = h * (M - 1)
    const side = x >= this.stageCx ? 1 : -1
    const dr = clamp(dx * side, -6, 6)
    if (Math.abs(dr) < 0.01) return
    for (let i = 0; i < M; i++) {
      const fall = Math.exp(-((i - iC) * (i - iC)) / (2 * 3.6 * 3.6))
      if (fall < 0.02) continue
      const nv = clamp(this.rT[i]! + dr * fall, 10, this.maxR)
      this.rT[i] = nv
      this.r[i] = this.r[i]! + dr * fall * 0.9
    }
    this.dragHeights.push(h)
    if (this.time - this.lastSquish > 0.12 && Math.abs(dr) > 0.6) {
      this.lastSquish = this.time
      this.audio.squish(clamp(Math.abs(dr) / 5, 0.3, 1))
    }
  }

  // ————————————————— 绘制 —————————————————

  private draw(): void {
    const { ctx, W, H } = this
    ctx.clearRect(0, 0, W, H)

    // 窑温
    if (this.heat > 0.01) {
      const cy = this.wheelY - this.hgt * 0.5
      const rad = Math.max(W, H) * 0.5
      const gr = ctx.createRadialGradient(this.stageCx, cy, 20, this.stageCx, cy, rad)
      gr.addColorStop(0, `rgba(196,106,50,${0.13 * this.heat})`)
      gr.addColorStop(1, 'rgba(196,106,50,0)')
      ctx.fillStyle = gr
      ctx.fillRect(0, 0, W, H)
    }

    this.drawStrings()

    // 轮
    if (this.wheelAlpha > 0.01) this.drawWheel()

    // 泥团或坯体（上轮动画期间仍画泥团）
    if (!this.mounted || (this.mountT >= 0 && this.mountT < 0.4)) this.drawLump()
    else this.drawVessel()

    // 热浪
    if (this.heat > 0.05 && !this.calm) this.drawShimmer()

    // 手
    if (this.handsA > 0.02) this.drawHands()

    // 尘
    for (const d of this.dust) {
      ctx.fillStyle = `rgba(74,47,31,${d.a})`
      ctx.fillRect(d.x, d.y, 2, 2)
    }

    // 取器钢丝
    if (this.cutP >= 0 && this.cutP < 1) {
      const x0 = this.stageCx - this.r[0]! - 42
      const x1 = this.stageCx + this.r[0]! + 42
      const x = lerp(x0, x1, easeOut(this.cutP))
      const y = this.wheelY - 6
      ctx.strokeStyle = P.inkSoft
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(x0, y)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.fillStyle = P.ink
      ctx.fillRect(x - 2, y - 4, 4, 8)
    }
  }

  private drawWheel(): void {
    const { ctx } = this
    const w = this.wheelHalf * 2.35
    const y = this.wheelY
    ctx.save()
    ctx.globalAlpha = this.wheelAlpha
    // 影
    ctx.fillStyle = P.shadow
    ctx.beginPath()
    ctx.ellipse(this.stageCx, y + 34, w * 0.56, 9, 0, 0, TAU)
    ctx.fill()
    // 轮头
    const g = ctx.createLinearGradient(0, y - 7, 0, y + 7)
    g.addColorStop(0, P.wheelHi)
    g.addColorStop(0.35, P.wheel)
    g.addColorStop(1, '#2a2119')
    ctx.fillStyle = g
    this.rrect(this.stageCx - w / 2, y - 7, w, 14, 6)
    ctx.fill()
    // 转动的刻痕
    ctx.strokeStyle = 'rgba(244,239,230,0.4)'
    ctx.lineWidth = 1.4
    ctx.setLineDash([10, 26])
    ctx.lineDashOffset = -((this.theta * this.wheelHalf * 0.22) % 36)
    ctx.beginPath()
    ctx.moveTo(this.stageCx - w / 2 + 8, y - 3.4)
    ctx.lineTo(this.stageCx + w / 2 - 8, y - 3.4)
    ctx.stroke()
    ctx.setLineDash([])
    // 轴
    ctx.fillStyle = '#2a2119'
    ctx.fillRect(this.stageCx - 7, y + 7, 14, 22)
    ctx.fillStyle = P.wheel
    this.rrect(this.stageCx - w * 0.3, y + 27, w * 0.6, 7, 3)
    ctx.fill()
    ctx.restore()
  }

  private rrect(x: number, y: number, w: number, h: number, r: number): void {
    const { ctx } = this
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  private lumpPath(cx: number, cy: number, scale: number, sx = 1, sy = 1): void {
    const { ctx } = this
    const pts: [number, number][] = []
    for (let i = 0; i < LUMP_N; i++) {
      const a = (i / LUMP_N) * TAU
      const r = this.lumpR * this.lumpCur[i]! * scale
      pts.push([cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r * sy * 0.88])
    }
    ctx.beginPath()
    for (let i = 0; i < LUMP_N; i++) {
      const [x0, y0] = pts[i]!
      const [x1, y1] = pts[(i + 1) % LUMP_N]!
      const mx = (x0 + x1) / 2
      const my = (y0 + y1) / 2
      if (i === 0) ctx.moveTo(mx, my)
      else ctx.quadraticCurveTo(x0, y0, mx, my)
    }
    ctx.quadraticCurveTo(pts[0]![0], pts[0]![1], (pts[0]![0] + pts[1]![0]) / 2, (pts[0]![1] + pts[1]![1]) / 2)
    ctx.closePath()
  }

  private drawLump(): void {
    const { ctx } = this
    let cx = this.lumpX
    let cy = this.lumpY
    let sx = 1
    let sy = 1
    // 上轮动画：坠落 + 挤压
    if (this.mountT >= 0 && this.mountT < 900) {
      const p = clamp(this.mountT / 0.4, 0, 1)
      const drop = easeOut(Math.min(1, p / 0.45))
      cy = lerp(this.lumpY, this.wheelY - 7 - this.lumpR * 0.7, drop)
      cx = lerp(this.lumpX, this.stageCx, drop)
      if (p > 0.45) {
        const q = (p - 0.45) / 0.55
        sy = 1 - q * 0.3
        sx = 1 + q * 0.22
      } else {
        sy = 1 + p * 0.1
      }
    }
    ctx.save()
    // 影 —— 贴着泥的底部
    ctx.fillStyle = P.shadow
    ctx.beginPath()
    const shY = this.mountT >= 0 ? this.wheelY + 34 : cy + this.lumpR * 0.88 * sy + 4
    ctx.ellipse(cx, shY, this.lumpR * 0.92 * sx, 6.5, 0, 0, TAU)
    ctx.fill()
    // 体
    this.lumpPath(cx, cy, 1, sx, sy)
    const g = ctx.createLinearGradient(cx - this.lumpR, cy - this.lumpR, cx + this.lumpR, cy + this.lumpR)
    g.addColorStop(0, P.clayLight)
    g.addColorStop(0.55, P.clay)
    g.addColorStop(1, P.clayWet)
    ctx.fillStyle = g
    ctx.fill()
    // 底部接触暗面 + 揉痕
    ctx.save()
    this.lumpPath(cx, cy, 1, sx, sy)
    ctx.clip()
    const ao = ctx.createRadialGradient(cx, cy + this.lumpR * 0.9 * sy, this.lumpR * 0.2, cx, cy + this.lumpR * 0.9 * sy, this.lumpR * 1.1)
    ao.addColorStop(0, 'rgba(38,33,26,0.16)')
    ao.addColorStop(1, 'rgba(38,33,26,0)')
    ctx.fillStyle = ao
    ctx.fillRect(cx - this.lumpR * 1.4, cy - this.lumpR * 1.2, this.lumpR * 2.8, this.lumpR * 2.4)
    ctx.strokeStyle = 'rgba(38,33,26,0.08)'
    ctx.lineWidth = 1.6
    for (const [ox, oy, r0, a0, a1] of [
      [-0.18, -0.12, 0.55, 2.6, 4.1],
      [0.22, 0.16, 0.42, -0.4, 1.1],
    ] as const) {
      ctx.beginPath()
      ctx.arc(cx + ox * this.lumpR, cy + oy * this.lumpR, this.lumpR * r0, a0, a1)
      ctx.stroke()
    }
    ctx.restore()
    // 字的碎屑 —— 由话揉成
    ctx.save()
    this.lumpPath(cx, cy, 0.96, sx, sy)
    ctx.clip()
    ctx.fillStyle = P.ink
    for (const gl of this.lumpGlyphs) {
      ctx.save()
      ctx.globalAlpha = 0.09
      ctx.translate(cx + Math.cos(gl.a) * this.lumpR * gl.d * sx, cy + Math.sin(gl.a) * this.lumpR * gl.d * sy * 0.85)
      ctx.rotate(gl.rot)
      ctx.font = `${gl.size}px "Songti SC","SimSun",Georgia,serif`
      ctx.fillText(gl.ch, -gl.size / 2, gl.size / 3)
      ctx.restore()
    }
    ctx.restore()
    // 边缘阴影线
    this.lumpPath(cx, cy, 1, sx, sy)
    ctx.strokeStyle = 'rgba(38,33,26,0.18)'
    ctx.lineWidth = 1.2
    ctx.stroke()
    ctx.restore()
  }

  private drawVessel(): void {
    const geom: VesselGeom = {
      cx: this.vesselCx(),
      baseY: this.wheelY - 7,
      height: this.hgt,
      r: this.r,
      theta: this.theta,
      ecc: this.ecc,
      jitter: this.jitter,
      sectionP: this.sectionP,
      lift: this.lift,
      board: smooth(0.5, 0.92, this.cutSlide),
    }
    const style: VesselStyle = {
      fired: this.fired,
      glaze: this.glaze,
      craze: this.craze,
      marble: this.marble,
      bare: this.bare,
      bareMarked: this.bareMarked,
      crack: this.crack,
      crackBranch: this.crackBranch,
      crackP: this.crackP,
      goldP: this.goldP,
      glintT: this.time,
      crazeWebs: this.crazeWebs,
      calm: this.calm,
      touches: this.touches,
      passHeights: this.passHeights,
      wallThin: this.wallThin,
    }
    paintVessel(this.ctx, geom, style)
  }

  private drawShimmer(): void {
    const { ctx } = this
    ctx.save()
    ctx.strokeStyle = `rgba(196,106,50,${0.1 * this.heat})`
    ctx.lineWidth = 1.4
    const top = this.wheelY - 7 - this.hgt
    for (let k = 0; k < 4; k++) {
      const x0 = this.stageCx - 60 + k * 40
      ctx.beginPath()
      for (let yy = 0; yy <= 70; yy += 6) {
        const x = x0 + Math.sin(yy * 0.09 + this.shimmerT * 3 + k * 1.7) * 5
        const y = top - 14 - yy
        if (yy === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.restore()
  }

  private drawHands(): void {
    const { ctx } = this
    const y = this.wheelY - 7 - this.lift - this.handsH * this.hgt
    const i = Math.round(clamp(this.handsH, 0, 1) * (M - 1))
    const r = this.mounted ? this.r[i]! : this.lumpR
    const gap = 15
    ctx.save()
    ctx.globalAlpha = this.handsA
    ctx.strokeStyle = this.handsMode === 'gold' ? P.gold : P.ink
    ctx.lineWidth = 2.6
    ctx.lineCap = 'round'
    for (const side of [-1, 1] as const) {
      const x = this.stageCx + side * (r + gap)
      ctx.beginPath()
      ctx.moveTo(x + side * 5, y - 15)
      ctx.quadraticCurveTo(x - side * 6, y, x + side * 5, y + 15)
      ctx.stroke()
      // 拇指
      ctx.beginPath()
      ctx.moveTo(x - side * 2, y + 3)
      ctx.lineTo(x + side * 4, y + 8)
      ctx.stroke()
    }
    ctx.restore()
  }

  private drawStrings(): void {
    const { ctx } = this
    for (const [c, el] of this.anchors) {
      const w = clamp(1 - Math.abs(this.gs - c - 0.45) * 1.7, 0, 1)
      if (w < 0.02) continue
      const rect = el.getBoundingClientRect()
      if (rect.bottom < -40 || rect.top > this.H + 40) continue
      const ax = rect.right - 15
      const ay = rect.top + 18
      const [tx, ty] = this.stringTarget(c)
      const mx = (ax + tx) / 2
      const my = (ay + ty) / 2 + 26 + (this.calm ? 0 : Math.sin(this.time * 0.8 + c) * 2.5)
      ctx.save()
      ctx.globalAlpha = 0.5 * w
      ctx.strokeStyle = P.inkFaint
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.quadraticCurveTo(mx, my, tx, ty)
      ctx.stroke()
      // 孔上的小环
      ctx.beginPath()
      ctx.arc(ax, ay, 3.4, 0, TAU)
      ctx.stroke()
      ctx.restore()
    }
  }

  private stringTarget(c: number): [number, number] {
    const baseY = this.wheelY - 7 - this.lift
    switch (c) {
      case 0:
        return this.mounted
          ? [this.stageCx - this.r[Math.floor(M * 0.3)]! - 6, baseY - this.hgt * 0.3]
          : [this.lumpX - this.lumpR * 0.8, this.lumpY - this.lumpR * 0.45]
      case 1:
        return [this.stageCx - this.wheelHalf * 1.1, this.wheelY - 4]
      case 2:
        return [this.stageCx - this.r[Math.floor(M * 0.55)]! - 8, baseY - this.hgt * 0.55]
      case 3: {
        if (this.crack && this.crackP > 0) {
          const p0 = this.crack[0]!
          const i = Math.round(p0.h * (M - 1))
          return [this.vesselCx() + p0.u * this.r[i]!, baseY - p0.h * this.hgt]
        }
        return [this.stageCx - this.r[Math.floor(M * 0.8)]! - 8, baseY - this.hgt * 0.8]
      }
      default:
        return [this.vesselCx() - this.r[2]! - 8, baseY - 6]
    }
  }
}
