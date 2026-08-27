/**
 * SyncEngine —— 全站唯一动效源。
 * Kuramoto 相位模型:  θ̇ᵢ = ωᵢ + K·r·sin(ψ − θᵢ)
 * 序参量 r ∈ [0,1] 由引擎持续积分得出，驱动画布、仪表与 CSS 变量 --r。
 * 所有外部输入（滚动、章节、旋钮、敲击）都只是改参数，运动永远连续。
 */

export const OMEGA0 = 1.0

export interface LockInfo {
  freq: number
  gain: number
  seconds: number
  attempts: number
}

interface Dot {
  th: number // 相位
  om: number // 固有频率
  radF: number // 轨道半径系数 0..1
  off: number // 位置角偏移
  loose: boolean // 故意不同步的红色声部
  kick: number // 被弹开的冲量 0..1
  sx: number // 屏幕坐标（渲染时写入，供命中检测）
  sy: number
}

type Listener = () => void

const TAU = Math.PI * 2
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function mulberry32(seed: number) {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class SyncEngine {
  /* ---------- 场 ---------- */
  N = 110
  dots: Dot[] = []
  r = 0 // 序参量
  psi = 0 // 平均相位
  time = 0

  /* ---------- 几何（由 Stage 写入） ---------- */
  W = 0
  H = 0
  dpr = 1

  /* ---------- 外部驱动 ---------- */
  progress = 0 // 页面滚动进度 0..1
  mod = 1.05 // 章节耦合调制（App 按所在章节写入）
  userFreq = -0.4
  gain = 0.18
  armed = false // 进入协作章节后才允许锁定
  locked = false
  lockInfo: LockInfo | null = null
  attempts = 0
  xray = false
  reduced = false

  /* ---------- 内部状态 ---------- */
  private prevR = 0
  private lastTickAt = -10
  private hot = false
  private hotSince = 0
  private hotWasInside = false
  private enter3At = 0
  private introT = 0
  private autoTune: { from: number; until: number } | null = null
  private pulses: { t0: number }[] = []
  sectionMark: { label: string; t0: number } | null = null
  private leaderTrail: { x: number; y: number }[] = []
  private rnd = mulberry32(20260824)

  /* ---------- 订阅 ---------- */
  version = 0
  private listeners = new Set<Listener>()

  /* ---------- 音频钩子（由 Audio 注入） ---------- */
  onTickHigh: (() => void) | null = null
  onKnock: ((i: number) => void) | null = null
  onLock: (() => void) | null = null

  constructor() {
    this.seed(this.N)
  }

  private seed(n: number) {
    this.N = n
    this.dots = []
    for (let i = 0; i < n; i++) {
      const q = this.rnd()
      const wide = q < 0.14 // 少数天生走极端
      const spread = wide ? 5.6 : 2.4
      this.dots.push({
        th: this.rnd() * TAU,
        om: OMEGA0 * (1 + (this.rnd() - 0.5) * spread),
        radF: 0.22 + Math.pow(this.rnd(), 0.72) * 0.78,
        off: this.rnd() * TAU,
        loose: false,
        kick: 0,
        sx: 0,
        sy: 0,
      })
    }
    // 红色声部：固定挑 7 颗，固有频率偏离更远
    for (let k = 0; k < 7; k++) {
      const i = Math.floor((k + 0.5) * (n / 7)) % n
      const d = this.dots[i]
      if (d) {
        d.loose = true
        d.om = OMEGA0 * (1 + (this.rnd() > 0.5 ? 1 : -1) * (3.4 + this.rnd() * 2))
      }
    }
  }

  setDensity(width: number) {
    const n = width < 720 ? 72 : width < 1200 ? 92 : 112
    if (Math.abs(n - this.N) > 4) this.seed(n)
  }

  resize(w: number, h: number, dpr: number) {
    this.W = w
    this.H = h
    this.dpr = dpr
  }

  get R() {
    return Math.min(this.W, this.H) * 0.37
  }
  get cx() {
    return this.W / 2
  }
  get cy() {
    return this.H / 2
  }

  /* ---------- 输入 ---------- */
  setProgress(p: number) {
    this.progress = clamp(p, 0, 1)
  }
  setMod(m: number) {
    this.mod = m
  }
  markSection(label: string) {
    this.sectionMark = { label, t0: this.time }
  }
  setArmed(b: boolean) {
    if (b && !this.armed && !this.locked) this.enter3At = this.time
    this.armed = b
  }
  setXray(b: boolean) {
    if (this.xray !== b) {
      this.xray = b
      this.bump()
    }
  }
  setUserFreq(v: number) {
    this.userFreq = clamp(v, -3, 3)
    this.autoTune = null
  }
  setGain(v: number) {
    this.gain = clamp(v, 0, 1)
  }
  requestAutoTune() {
    if (this.locked) return
    this.autoTune = { from: this.userFreq, until: this.time + 1.15 }
    this.setGain(Math.max(this.gain, 0.62))
    this.bump()
  }
  get autoTuning() {
    return !!this.autoTune
  }
  get isHot() {
    return this.hot
  }

  /** 命中检测并弹开一颗 */
  knockAt(x: number, y: number): boolean {
    let best = -1
    let bd = 30 * 30
    for (let i = 0; i < this.N; i++) {
      const d = this.dots[i]
      const dx = d.sx - x
      const dy = d.sy - y
      const dd = dx * dx + dy * dy
      if (dd < bd) {
        bd = dd
        best = i
      }
    }
    if (best < 0) return false
    this.kick(best)
    return true
  }

  knockRandom() {
    this.kick(Math.floor(this.rnd() * this.N))
  }

  private kick(i: number) {
    const d = this.dots[i]
    if (!d || this.reduced) return
    d.th += Math.PI * (0.75 + this.rnd() * 0.55)
    d.kick = 1
    this.onKnock?.(i)
  }

  /* ---------- 订阅 ---------- */
  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }
  bump() {
    this.version++
    this.listeners.forEach((l) => l())
  }

  /* ---------- 物理推进 ---------- */
  step(dtRaw: number, warmupOnly = false) {
    const dt = clamp(dtRaw, 0.001, 0.033)
    this.time += dt

    if (this.autoTune) {
      const ip = clamp(1 - (this.autoTune.until - this.time) / 1.15, 0, 1)
      const e = ip < 0.5 ? 2 * ip * ip : 1 - Math.pow(-2 * ip + 2, 2) / 2
      this.userFreq = lerp(this.autoTune.from, OMEGA0 - 0.008, e)
      this.gain = Math.max(this.gain, 0.62)
      if (ip >= 1) {
        this.autoTune = null
        this.bump()
      }
    }

    // 开场编舞：前 3.4 秒额外注入耦合，让首屏标题"自己合拍"，随后松手回落
    let introBoost = 0
    if (!warmupOnly && !this.reduced) {
      this.introT += dt
      const ip = Math.min(this.introT / 3.4, 1)
      introBoost = 5.6 * (1 - Math.pow(1 - ip, 3))
    }

    // 基础耦合只在序章→图版一之间爬过临界，之后维持平台；
    // 协作章节未锁定时引擎主动让位（自降 40%），把同步的主导权交给用户。
    const rampX = clamp(this.progress / 0.4, 0, 1)
    const rampSS = rampX * rampX * (3 - 2 * rampX)
    let K =
      (0.08 + 2.9 * rampSS) * this.mod +
      this.gain * 2.6 +
      introBoost +
      (this.locked ? 2.6 : 0)
    if (this.armed && !this.locked) K *= 0.6

    // 平均相位与序参量
    let sSin = 0
    let sCos = 0
    for (let i = 0; i < this.N; i++) {
      sSin += Math.sin(this.dots[i].th)
      sCos += Math.cos(this.dots[i].th)
    }
    this.psi = Math.atan2(sSin, sCos)
    this.prevR = this.r
    this.r = Math.hypot(sSin, sCos) / this.N

    if (!this.reduced || warmupOnly) {
      for (let i = 0; i < this.N; i++) {
        const d = this.dots[i]
        const kEff = K * (d.loose ? 0.16 : 1)
        d.th += (d.om + kEff * this.r * Math.sin(this.psi - d.th)) * dt
        if (d.th > TAU) d.th -= TAU
        else if (d.th < 0) d.th += TAU
        d.kick *= Math.exp(-dt * 2.6)
      }
    }

    // r 上穿 0.88 → 一次"咔"
    if (this.r > 0.88 && this.prevR <= 0.88 && this.time - this.lastTickAt > 0.6) {
      this.lastTickAt = this.time
      this.onTickHigh?.()
    }

    // 锁定判定
    if (!this.locked && this.armed && !warmupOnly) {
      const detune = Math.abs(this.userFreq - OMEGA0)
      const inside = detune < 0.12 && this.gain >= 0.5
      if (inside && !this.hotWasInside) {
        this.attempts++
        this.hotSince = this.time
        this.bump()
      }
      this.hotWasInside = inside
      this.hot = inside
      if (inside && this.time - this.hotSince > 0.9) {
        this.locked = true
        this.hot = false
        this.lockInfo = {
          freq: this.userFreq,
          gain: this.gain,
          seconds: Math.max(1, Math.round(this.time - (this.enter3At || this.time))),
          attempts: this.attempts,
        }
        this.pulses.push({ t0: this.time })
        this.onLock?.()
        this.bump()
      }
    }

    // 锁定后序参量托底，保证全页维持合拍态
    if (this.locked && this.r < 0.9) this.r = lerp(this.r, 0.93, dt * 2)
  }

  /* ---------- 渲染 ---------- */
  render(ctx: CanvasRenderingContext2D) {
    const { W, H, cx, cy } = this
    const R = this.R

    if (this.xray) {
      ctx.fillStyle = 'rgba(243,236,220,0.92)'
      ctx.fillRect(0, 0, W, H)
      this.drawMachinery(ctx, R)
      return
    }

    // 长曝光拖尾：半透明纸色覆盖
    ctx.fillStyle = 'rgba(243,236,220,0.16)'
    ctx.fillRect(0, 0, W, H)

    // 中央刻度盘：随 r 浮现
    const dialA = 0.1 + this.r * 0.42
    ctx.strokeStyle = `rgba(38,33,26,${dialA})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(cx, cy, R * 1.06, 0, TAU)
    ctx.stroke()
    const ticks = 72
    ctx.strokeStyle = `rgba(38,33,26,${dialA * 0.85})`
    ctx.beginPath()
    for (let i = 0; i < ticks; i++) {
      const a = (i / ticks) * TAU
      const big = i % 6 === 0
      const r0 = R * (big ? 1.0 : 1.03)
      const r1 = R * 1.06
      ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
      ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
    }
    ctx.stroke()

    // 章节针脚：换挡时在盘心上方浮出的版号
    if (this.sectionMark) {
      const age = (this.time - this.sectionMark.t0) / 1.7
      if (age > 1) this.sectionMark = null
      else {
        const a = age < 0.18 ? age / 0.18 : 1 - (age - 0.18) / 0.82
        ctx.fillStyle = `rgba(38,33,26,${a * 0.34})`
        ctx.font = `${Math.round(R * 0.42)}px "Songti SC","STSong","SimSun",serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.sectionMark.label, cx, cy - R * 0.62)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'alphabetic'
      }
    }

    // 领头针：指向平均相位 ψ —— 全场围绕它收敛的那根朱砂针
    const breathe = 1 + (this.locked ? 0.02 * Math.sin(this.time * 2.4) : 0)
    const na = this.psi
    ctx.strokeStyle = `rgba(179,64,42,${0.35 + this.r * 0.5})`
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(
      cx + Math.cos(na) * R * 1.14 * breathe,
      cy + Math.sin(na) * R * 1.14 * breathe,
    )
    ctx.stroke()
    ctx.fillStyle = '#b3402a'
    ctx.beginPath()
    ctx.arc(
      cx + Math.cos(na) * R * 1.14 * breathe,
      cy + Math.sin(na) * R * 1.14 * breathe,
      3.4,
      0,
      TAU,
    )
    ctx.fill()
    // 针根配重
    ctx.strokeStyle = 'rgba(179,64,42,0.7)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cx - Math.cos(na) * R * 0.14, cy - Math.sin(na) * R * 0.14)
    ctx.lineTo(cx, cy)
    ctx.stroke()

    // 锁定冲击环
    for (let p = this.pulses.length - 1; p >= 0; p--) {
      const age = (this.time - this.pulses[p].t0) / 1.1
      if (age > 1) {
        this.pulses.splice(p, 1)
        continue
      }
      ctx.strokeStyle = `rgba(179,64,42,${(1 - age) * 0.5})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.2 + age * Math.max(W, H) * 0.7, 0, TAU)
      ctx.stroke()
    }

    // 引点拖尾（第 0 颗）
    if (this.dots[0]) {
      const d = this.dots[0]
      const a = d.off + d.th
      d.sx = cx + Math.cos(a) * d.radF * R
      d.sy = cy + Math.sin(a) * d.radF * R
      this.leaderTrail.unshift({ x: d.sx, y: d.sy })
      if (this.leaderTrail.length > 34) this.leaderTrail.pop()
      ctx.strokeStyle = 'rgba(38,33,26,0.28)'
      ctx.lineWidth = 1
      ctx.beginPath()
      this.leaderTrail.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.stroke()
    }

    // 点阵
    for (let i = 0; i < this.N; i++) {
      const d = this.dots[i]
      const a = d.off + d.th
      const wob = 1 + d.kick * 0.09 * Math.sin(this.time * 26 + i)
      const rr = d.radF * R * wob
      const x = cx + Math.cos(a) * rr
      const y = cy + Math.sin(a) * rr
      d.sx = x
      d.sy = y

      const sz = d.loose ? 2.5 : i === 0 ? 3 : 1.9
      ctx.fillStyle = d.loose ? '#b3402a' : 'rgba(38,33,26,0.88)'
      ctx.beginPath()
      ctx.arc(x, y, sz, 0, TAU)
      ctx.fill()

      if (i === 0) {
        ctx.strokeStyle = 'rgba(38,33,26,0.35)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, 6.5, 0, TAU)
        ctx.stroke()
      }
    }
  }

  /** 机括视图：露出每个振子的表盘与相位辐条 */
  private drawMachinery(ctx: CanvasRenderingContext2D, R: number) {
    const { cx, cy } = this
    ctx.font = '10px Georgia, serif'
    const showN = Math.min(this.N, 36)
    for (let i = 0; i < showN; i++) {
      const d = this.dots[i]
      const a = d.off + d.th
      const rr = d.radF * R
      const x = cx + Math.cos(a) * rr
      const y = cy + Math.sin(a) * rr
      const col = d.loose ? 'rgba(179,64,42,0.85)' : 'rgba(109,99,83,0.8)'
      ctx.strokeStyle = col
      ctx.lineWidth = 0.75
      ctx.beginPath()
      ctx.arc(x, y, 9, 0, TAU)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(d.th) * 13, y + Math.sin(d.th) * 13)
      ctx.stroke()
      if (i % 3 === 0) {
        ctx.fillStyle = col
        ctx.fillText(`#${i}`, x + 12, y - 10)
      }
    }
    ctx.fillStyle = 'rgba(38,33,26,0.65)'
    ctx.fillText(`r = ${this.r.toFixed(3)}   ψ = ${(this.psi % TAU).toFixed(2)} rad`, 18, this.H - 20)
  }

  /** 减动效模式：用强耦合直接预收敛到一个安静的合拍态 */
  settleStatic() {
    this.reduced = true
    const keepGain = this.gain
    const keepProgress = this.progress
    const keepMod = this.mod
    this.gain = 0.95
    this.progress = 1
    this.mod = 1.3
    for (let i = 0; i < 900; i++) this.step(1 / 60, true)
    this.gain = keepGain
    this.progress = keepProgress
    this.mod = keepMod
    this.bump()
  }
}

export const engine = new SyncEngine()
