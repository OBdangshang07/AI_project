/**
 * 字云引擎 —— 整站唯一的核心装置。
 *
 * 满屏漂浮的候选字是一切可能的说法：
 * - 温度 temp：随机度。低温结晶成格，高温沸腾、部分字烧成朱砂。
 * - 秩序 coh ：向「行」收拢的程度（上下文让世界变得有序）。
 * - 注意力 att：光标附近的字被牵动、停止闪变、墨色变实。
 * - 锚点 anchor：§01 用户敲下的字，绕光标运行，联想邻居被点亮。
 * - 坍缩 slots：字符弹簧聚合为一句采样，松手带着动量散开。
 *
 * 单画布、单 rAF、零依赖；reduced-motion 下退化为静态构图 + 即时状态切换。
 */

export interface Slot {
  ch: string
  x: number
  y: number
}

interface Particle {
  ch: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  baseA: number
  a: number
  flick: number // 下次换字的时间戳
  hold: boolean // 注意力/锚点范围内：暂停闪变
  boost: number // 外部增亮（注意力/联想），随时间衰减
  slot: number // >=0：坍缩句中的座位
  gx: number // 冷态晶格座位
  gy: number
  seed: number
}

interface Anchor {
  ch: string
  ang: number
  r: number
  born: number
  life: number
}

const INK = '28,25,20'
const RED = '193,59,42'
const SERIF = `"Noto Serif SC","Source Han Serif SC","Songti SC",SimSun,serif`

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export class GlyphField {
  private cv: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private w = 0
  private h = 0

  private ps: Particle[] = []
  private anchors: Anchor[] = []
  private nei = new Set<string>()
  private glyphPool: string[] = []
  private neighborMap = new Map<string, string>()

  /** 目标态（章节驱动）与当前态（指数平滑追随） */
  private tTemp = 0.55
  private tCoh = 0.16
  temp = 0
  coh = 0

  private att = { x: -999, y: -999, s: 0, ts: 0, on: false }
  private lastMove = -1e9
  private inside = false
  private stillFired = false

  private slots: Slot[] | null = null
  private slotFont = 30
  private sentence = ''
  private formedAt = 0
  private allSettled = false

  private raf = 0
  private last = 0
  private dirty = true
  private running = false
  private lastTempReport = 0
  private fontCache = new Map<number, string>()
  private cleanup: (() => void) | null = null

  reduced = false
  coarse = false

  onTemp: ((t: number) => void) | null = null
  onStill: ((on: boolean) => void) | null = null
  onFormed: (() => void) | null = null

  // ---------------------------------------------------------------- 生命周期

  mount(canvas: HTMLCanvasElement, pool: string[], neighbors: Map<string, string>) {
    this.cv = canvas
    this.ctx = canvas.getContext('2d')
    if (!this.ctx) return
    this.glyphPool = pool.length ? pool : Array.from('下一个词概率坍缩温度')
    this.neighborMap = neighbors
    this.coarse = window.matchMedia('(pointer: coarse)').matches

    let rsTimer = 0
    const onResize = () => {
      clearTimeout(rsTimer)
      rsTimer = window.setTimeout(() => this.resize(), 120)
    }
    const onMove = (e: PointerEvent) => {
      this.att.x = e.clientX
      this.att.y = e.clientY
      this.att.on = true
      this.lastMove = performance.now()
      if (this.stillFired) {
        this.stillFired = false
        this.onStill?.(false)
      }
      this.att.ts = 0.5
      this.inside = true
    }
    const onDown = (e: PointerEvent) => {
      this.inside = true
      const t = e.target as HTMLElement | null
      if (t && t.closest('a,button,input,textarea,select,label,nav,header,[data-ui]')) return
      this.resample(e.clientX, e.clientY)
    }
    const onLeave = () => {
      this.inside = false
      this.att.on = false
      this.att.ts = 0
      if (this.stillFired) {
        this.stillFired = false
        this.onStill?.(false)
      }
    }
    const onVis = () => (document.hidden ? this.stop() : this.start())

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    this.cleanup = () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }

    this.resize()
    this.start()
  }

  destroy() {
    this.stop()
    this.cleanup?.()
    this.cleanup = null
  }

  private start() {
    if (this.running || !this.ctx) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private loop = (now: number) => {
    if (!this.running) return
    this.raf = requestAnimationFrame(this.loop)
    const dt = Math.min(0.033, Math.max(0.001, (now - this.last) / 1000))
    this.last = now
    this.step(dt, now)
    if (!this.reduced || this.dirty) {
      this.draw(now)
      if (this.reduced) this.dirty = false
    }
    if (now - this.lastTempReport > 120) {
      this.lastTempReport = now
      this.onTemp?.(this.temp)
    }
  }

  // ---------------------------------------------------------------- 尺寸与粒子

  private resize() {
    if (!this.cv || !this.ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, this.coarse ? 1.5 : 2)
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.cv.width = Math.round(this.w * dpr)
    this.cv.height = Math.round(this.h * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.populate()
    if (this.slots && this.sentence) this.layoutSlots(this.sentence, this.h * 0.42, true)
    this.dirty = true
  }

  private populate() {
    const target = Math.round(
      clamp((this.w * this.h) / (this.coarse ? 2100 : 1500), 240, this.coarse ? 480 : 900)
    )
    const now = performance.now()
    while (this.ps.length > target) this.ps.pop()
    const sp = 64
    const cols = Math.max(4, Math.floor(this.w / sp))
    const rows = Math.max(4, Math.floor(this.h / sp))
    while (this.ps.length < target) {
      const i = this.ps.length
      const r = Math.random()
      const size = r < 0.62 ? rand(11, 15) : r < 0.9 ? rand(17, 24) : rand(26, 40)
      // 晶格座位：确定性散布，冷态时像一版排好的活字
      const h1 = ((i * 2654435761) % 9973) / 9973
      const h2 = ((i * 40503) % 7919) / 7919
      this.ps.push({
        ch: this.glyphPool[(Math.random() * this.glyphPool.length) | 0],
        x: rand(0, this.w),
        y: rand(0, this.h),
        vx: 0,
        vy: 0,
        size,
        baseSize: size,
        baseA: size < 16 ? rand(0.05, 0.16) : size < 25 ? rand(0.1, 0.22) : rand(0.16, 0.3),
        a: 0,
        flick: now + rand(200, 7000),
        hold: false,
        boost: 0,
        slot: -1,
        gx: (Math.floor(h1 * cols) + 0.5) * (this.w / cols),
        gy: (Math.floor(h2 * rows) + 0.5) * (this.h / rows),
        seed: Math.random(),
      })
    }
  }

  // ---------------------------------------------------------------- 对外 API

  setTarget(temp: number, coh: number) {
    this.tTemp = temp
    this.tCoh = coh
  }

  setReduced(v: boolean) {
    this.reduced = v
    if (v) {
      this.att.ts = 0
      this.att.s = 0
    }
    this.dirty = true
  }

  addAnchor(ch: string) {
    if (!this.anchors) return
    this.anchors.push({
      ch,
      ang: rand(0, Math.PI * 2),
      r: rand(44, 86),
      born: performance.now(),
      life: 9000,
    })
    if (this.anchors.length > 12) this.anchors.shift()
    this.dirty = true
  }

  /** 点击空白处：重采样涟漪 */
  resample(x: number, y: number) {
    const now = performance.now()
    const R = 140
    let hit = false
    for (const p of this.ps) {
      if (p.slot >= 0) continue
      const dx = p.x - x
      const dy = p.y - y
      const d2 = dx * dx + dy * dy
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1
        const f = (1 - d / R) * 200
        p.vx += (dx / d) * f
        p.vy += (dy / d) * f
        p.ch = this.glyphPool[(Math.random() * this.glyphPool.length) | 0]
        p.flick = now + rand(400, 2600)
        p.boost = Math.max(p.boost, 0.5)
        hit = true
      }
    }
    if (hit) this.dirty = true
  }

  /** 坍缩：把句子排进云里 */
  collapse(sentence: string) {
    if (!this.ctx) return
    this.sentence = sentence
    this.layoutSlots(sentence, this.h * 0.42, false)
  }

  private layoutSlots(sentence: string, cy: number, keep: boolean) {
    const ctx = this.ctx!
    let size = clamp(this.w * 0.05, 22, 46)
    const chars = Array.from(sentence)
    const measure = (s: number) => {
      ctx.font = `900 ${s}px ${SERIF}`
      const ws = chars.map((c) => ctx.measureText(c).width)
      const gap = s * 0.1
      return { ws, gap, total: ws.reduce((a, b) => a + b, 0) + gap * (chars.length - 1) }
    }
    let m = measure(size)
    while (m.total > this.w * 0.88 && size > 15) {
      size -= 2
      m = measure(size)
    }
    this.slotFont = size
    let x = (this.w - m.total) / 2
    this.slots = chars.map((ch, i) => {
      const s = { ch, x: x + m.ws[i] / 2, y: cy }
      x += m.ws[i] + m.gap
      return s
    })
    if (!keep) {
      // 为每个座位挑最近的自由粒子（距离 + 字号差加权）
      for (let si = 0; si < this.slots.length; si++) {
        const s = this.slots[si]
        let best = -1
        let bestCost = Infinity
        for (let i = 0; i < this.ps.length; i++) {
          const p = this.ps[i]
          if (p.slot !== -1) continue
          const dx = p.x - s.x
          const dy = p.y - s.y
          const cost = dx * dx + dy * dy + Math.abs(p.size - size) * 900
          if (cost < bestCost) {
            bestCost = cost
            best = i
          }
        }
        if (best >= 0) {
          const p = this.ps[best]
          p.slot = si
          p.ch = s.ch
          p.size = size
          p.flick = Number.MAX_SAFE_INTEGER
        }
      }
      this.allSettled = false
      this.formedAt = 0
    }
    this.dirty = true
  }

  /** 松手：带着动量散开 */
  release() {
    if (!this.slots) return
    const now = performance.now()
    for (const p of this.ps) {
      if (p.slot >= 0) {
        p.slot = -1
        const a = rand(0, Math.PI * 2)
        const v = rand(140, 420)
        p.vx = Math.cos(a) * v
        p.vy = Math.sin(a) * v - 60
        p.size = p.baseSize
        p.flick = now + rand(600, 2800)
        // reduced 下速度不会被积分，直接散位
        if (this.reduced) {
          p.x = rand(0, this.w)
          p.y = rand(0, this.h)
        }
      }
    }
    this.slots = null
    this.sentence = ''
    this.formedAt = 0
    this.allSettled = false
    this.dirty = true
  }

  // ---------------------------------------------------------------- 模拟

  private step(dt: number, now: number) {
    const k = 1 - Math.exp(-dt * 2.2)
    this.temp += (this.tTemp - this.temp) * k
    this.coh += (this.tCoh - this.coh) * k
    this.att.s += (this.att.ts - this.att.s) * (1 - Math.exp(-dt * 5))

    // 静止检测：安静的注视也是一种输入
    if (
      this.inside &&
      !this.reduced &&
      !this.stillFired &&
      !this.slots &&
      now - this.lastMove > 3500
    ) {
      this.stillFired = true
      this.att.ts = 1
      this.onStill?.(true)
    }

    // 锚点衰减 + 联想集合
    this.nei.clear()
    for (let i = this.anchors.length - 1; i >= 0; i--) {
      if (now - this.anchors[i].born > this.anchors[i].life) {
        this.anchors.splice(i, 1)
        this.dirty = true
        continue
      }
      for (const c of this.neighborMap.get(this.anchors[i].ch) ?? []) this.nei.add(c)
    }

    const R = this.w < 720 ? 130 : 185
    const ocx = this.att.on ? this.att.x : this.w * 0.5
    const ocy = this.att.on ? this.att.y : this.h * 0.34
    const slotY = this.slots ? this.slots[0].y : 0
    const meanFlick = 6500 - this.temp * 6000

    for (const p of this.ps) {
      p.hold = false

      if (p.slot >= 0 && this.slots) {
        // —— 坍缩座位：带过冲的弹簧
        const s = this.slots[p.slot]
        if (this.reduced) {
          p.x = s.x
          p.y = s.y
          p.vx = p.vy = 0
        } else {
          const K = 130
          const D = 13
          p.vx += ((s.x - p.x) * K - p.vx * D) * dt
          p.vy += ((s.y - p.y) * K - p.vy * D) * dt
          p.x += p.vx * dt
          p.y += p.vy * dt
        }
        p.hold = true
        continue
      }

      // —— 自由粒子（reduced-motion 下完全冻结：不积分、不漂移、不闪变）
      if (!this.reduced) {
        const fx = Math.sin(p.y * 0.0022 + now * 0.00021) + Math.cos(p.x * 0.0018 - now * 0.00016)
        const ang = fx * 2.6
        const sp = (10 + this.temp * 150) * (0.5 + p.seed)
        p.vx += Math.cos(ang) * sp * dt
        p.vy += Math.sin(ang) * sp * 0.6 * dt
        p.vx += (Math.random() - 0.5) * this.temp * 160 * dt
        p.vy += (Math.random() - 0.5) * this.temp * 110 * dt

        // 秩序：向「行」收拢，像被读到的文字
        const rowH = Math.max(56, this.h * 0.085)
        const ry = Math.round(p.y / rowH) * rowH + rowH * 0.5
        p.vy += (ry - p.y) * this.coh * 5 * dt
        p.vx += (14 * this.coh - p.vx * 0.22) * dt * 2

        // 低温：晶格结晶
        const cold = Math.max(0, (0.16 - this.temp) / 0.16)
        if (cold > 0) {
          p.vx += (p.gx - p.x) * cold * 9 * dt
          p.vy += (p.gy - p.y) * cold * 9 * dt
        }

        // 注意力井
        if (this.att.s > 0.03) {
          const dx = this.att.x - p.x
          const dy = this.att.y - p.y
          const d2 = dx * dx + dy * dy
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / R) * this.att.s
            p.vx += (dx / d) * f * 210 * dt
            p.vy += (dy / d) * f * 210 * dt
            p.hold = true
            p.boost = Math.max(p.boost, f * 0.5)
          }
        }

        // 联想邻居：被点亮、向最近的锚字靠拢
        if (this.nei.size && this.nei.has(p.ch) && this.anchors.length) {
          p.hold = true
          p.boost = Math.max(p.boost, 0.42)
          const A = this.anchors[0]
          const age = (now - A.born) / 1000
          const ax = ocx + Math.cos(A.ang + now * 0.0004) * A.r
          const ay = ocy + Math.sin(A.ang + now * 0.0004) * A.r * 0.7 - Math.min(60, age * 6)
          const dx = ax - p.x
          const dy = ay - p.y
          const d = Math.hypot(dx, dy) || 1
          if (d < R * 1.8) {
            p.vx += (dx / d) * 120 * dt
            p.vy += (dy / d) * 120 * dt
          }
        }

        // 坍缩期间：闲字避开句子带
        if (this.slots) {
          const dy = p.y - slotY
          if (Math.abs(dy) < this.h * 0.13) p.vy += (dy >= 0 ? 1 : -1) * 260 * dt
        }

        const damp = Math.exp(-dt * 1.1)
        p.vx *= damp
        p.vy *= damp
        const vmax = 90 + this.temp * 460
        const v2 = p.vx * p.vx + p.vy * p.vy
        if (v2 > vmax * vmax) {
          const s = vmax / Math.sqrt(v2)
          p.vx *= s
          p.vy *= s
        }
        p.x += p.vx * dt
        p.y += p.vy * dt

        const m = 40
        if (p.x < -m) p.x = this.w + m
        else if (p.x > this.w + m) p.x = -m
        if (p.y < -m) p.y = this.h + m
        else if (p.y > this.h + m) p.y = -m

        // 闪变：温度越高，候选字换得越快
        if (!p.hold && now > p.flick) {
          p.ch = this.glyphPool[(Math.random() * this.glyphPool.length) | 0]
          p.flick =
            now +
            Math.min(20000, -Math.log(1 - Math.random()) * Math.max(300, meanFlick)) +
            p.size * 30
        }
      }

      // 墨度平滑与增亮衰减：按 dt 计，与帧率无关
      let ta = p.slot >= 0 ? 0.96 : p.baseA
      if (p.slot < 0 && !this.reduced) {
        ta *= 0.8 + 0.2 * Math.sin(now * 0.0011 + p.seed * 9.4)
        ta += p.boost
      }
      p.a += (Math.min(0.97, ta) - p.a) * (this.reduced ? 1 : Math.min(1, dt * 4.8))
      p.boost *= this.reduced ? 0 : Math.exp(-dt * 3.5)
    }

    // 成句检测
    if (this.slots && !this.allSettled) {
      let ok = true
      for (const p of this.ps) {
        if (p.slot < 0) continue
        const s = this.slots[p.slot]
        if (Math.abs(p.x - s.x) > 2 || Math.abs(p.y - s.y) > 2) {
          ok = false
          break
        }
      }
      if (ok) {
        this.allSettled = true
        this.formedAt = now
        this.onFormed?.()
        this.dirty = true
      }
    }
  }

  // ---------------------------------------------------------------- 绘制

  private fontFor(size: number): string {
    let f = this.fontCache.get(size)
    if (!f) {
      const weight = size >= 26 ? 900 : size >= 16 ? 600 : 400
      f = `${weight} ${size}px ${SERIF}`
      this.fontCache.set(size, f)
    }
    return f
  }

  private draw(now: number) {
    const ctx = this.ctx
    if (!ctx) return
    ctx.clearRect(0, 0, this.w, this.h)
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    const hot = Math.max(0, Math.min(1, (this.temp - 0.66) / 0.34)) * 0.22

    // 成句后的下划线：从中心长出
    if (this.slots && this.formedAt) {
      const prog = easeOutCubic(Math.min(1, (now - this.formedAt) / 550))
      const total = this.sentence.length * this.slotFont * 1.05
      const half = (total * prog) / 2
      ctx.strokeStyle = `rgba(${INK},${0.3 * prog})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(this.w / 2 - half, this.slots[0].y + this.slotFont * 0.72)
      ctx.lineTo(this.w / 2 + half, this.slots[0].y + this.slotFont * 0.72)
      ctx.stroke()
    }

    let lastFont = ''
    for (let i = 0; i < this.ps.length; i++) {
      const p = this.ps[i]
      const f = this.fontFor(p.size)
      if (f !== lastFont) {
        ctx.font = f
        lastFont = f
      }
      ctx.fillStyle = p.seed < hot ? `rgb(${RED})` : `rgb(${INK})`
      ctx.globalAlpha = p.a
      ctx.fillText(p.ch, p.x, p.y)
    }

    // 锚字：绕光标运行的重字符
    if (this.anchors.length) {
      const ocx = this.att.on ? this.att.x : this.w * 0.5
      const ocy = this.att.on ? this.att.y : this.h * 0.34
      ctx.font = this.fontFor(24)
      for (const A of this.anchors) {
        const age = now - A.born
        const ax = ocx + Math.cos(A.ang + now * 0.0004) * A.r
        const ay = ocy + Math.sin(A.ang + now * 0.0004) * A.r * 0.7 - Math.min(60, (age / 1000) * 6)
        const fadeIn = Math.min(1, age / 200)
        const fadeOut = Math.min(1, (A.life - age) / 1500)
        const al = Math.min(fadeIn, fadeOut)
        ctx.globalAlpha = 0.9 * al
        ctx.fillStyle = `rgb(${RED})`
        ctx.fillText(A.ch, ax, ay)
        ctx.globalAlpha = 0.3 * al
        ctx.strokeStyle = `rgb(${RED})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(ax, ay, 15, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // 注意力标线（准星）：字会看你的那个「你」
    if (this.att.s > 0.04 && this.att.on && !this.reduced) {
      const s = this.att.s
      const RR = this.w < 720 ? 130 : 185
      ctx.globalAlpha = 1
      ctx.strokeStyle = `rgba(${INK},${0.55 * s})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(this.att.x, this.att.y, 4 + 5 * s, 0, Math.PI * 2)
      ctx.stroke()
      ctx.strokeStyle = `rgba(${INK},${0.07 * s})`
      ctx.beginPath()
      ctx.arc(this.att.x, this.att.y, RR * easeOutCubic(s), 0, Math.PI * 2)
      ctx.stroke()
      ctx.strokeStyle = `rgba(${INK},${0.4 * s})`
      for (let a = 0; a < 4; a++) {
        const ang = (a * Math.PI) / 2 + Math.PI / 4
        const r1 = 12
        const r2 = 12 + 7 * s
        ctx.beginPath()
        ctx.moveTo(this.att.x + Math.cos(ang) * r1, this.att.y + Math.sin(ang) * r1)
        ctx.lineTo(this.att.x + Math.cos(ang) * r2, this.att.y + Math.sin(ang) * r2)
        ctx.stroke()
      }
    }

    ctx.globalAlpha = 1
  }
}

/** 全站单例：一块画布，一具身体 */
export const field = new GlyphField()
