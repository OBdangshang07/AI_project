/* 手写时序器 —— 全站唯一的时间轴权威。
   一个 Seq 是一列首尾相接的 Step；可整体跳过（无声快进）。 */

export interface Step {
  dur: number
  ease?: (t: number) => number
  onStart?: () => void
  onUpdate?: (p: number) => void
  onEnd?: () => void
}

export const linear = (t: number) => t
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeIn = (t: number) => t * t * t
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
/** 手的走法：起步蓄力，中段匀速，收尾轻收 */
export const handEase = (t: number) => {
  const a = 0.18
  if (t < a) return (t * t) / (a * 2)
  if (t > 1 - a) {
    const u = 1 - t
    return 1 - (u * u) / (a * 2)
  }
  return (t - a / 2) / (1 - a)
}

export class Seq {
  private i = 0
  private t = 0
  private started = false
  done = false

  constructor(
    private steps: Step[],
    private onComplete?: () => void,
  ) {}

  tick(dt: number): void {
    if (this.done) return
    this.t += dt
    while (!this.done) {
      const s = this.steps[this.i]
      if (!s) return this.finish()
      if (!this.started) {
        this.started = true
        s.onStart?.()
      }
      if (this.t < s.dur) {
        const p = s.dur <= 0 ? 1 : this.t / s.dur
        s.onUpdate?.((s.ease ?? linear)(p))
        return
      }
      s.onUpdate?.(1)
      s.onEnd?.()
      this.t -= s.dur
      this.i++
      this.started = false
    }
  }

  /** 无声快进：把剩余步骤全部按完成态执行 */
  skip(): void {
    if (this.done) return
    for (; this.i < this.steps.length; this.i++) {
      const s = this.steps[this.i]
      if (!this.started) s.onStart?.()
      this.started = false
      s.onUpdate?.(1)
      s.onEnd?.()
    }
    this.finish()
  }

  private finish(): void {
    if (this.done) return
    this.done = true
    this.onComplete?.()
  }
}
