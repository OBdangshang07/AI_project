/** 极简 Web Audio：木鱼咔哒、弹拨、合鸣。默认关闭，首次手势时初始化。 */
class SyncAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  enabled = false

  enable() {
    this.ensure()
    if (this.ctx?.state === 'suspended') void this.ctx.resume()
    this.enabled = true
  }
  disable() {
    this.enabled = false
  }

  private ensure() {
    if (!this.ctx) {
      const AC: typeof AudioContext | undefined =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.14
      this.master.connect(this.ctx.destination)
    }
  }

  /** 高序参量上穿时的木鱼咔哒 */
  tick() {
    if (!this.enabled) return
    this.ensure()
    const c = this.ctx
    const m = this.master
    if (!c || !m) return
    const t = c.currentTime
    const o = c.createOscillator()
    o.type = 'square'
    o.frequency.setValueAtTime(1720, t)
    o.frequency.exponentialRampToValueAtTime(980, t + 0.03)
    const g = c.createGain()
    g.gain.setValueAtTime(0.5, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1500
    bp.Q.value = 2.2
    o.connect(bp).connect(g).connect(m)
    o.start(t)
    o.stop(t + 0.07)
  }

  /** 弹开一颗的拨弦 */
  pluck(i: number) {
    if (!this.enabled) return
    this.ensure()
    const c = this.ctx
    const m = this.master
    if (!c || !m) return
    const t = c.currentTime
    const f = 300 + (i % 7) * 46
    const o = c.createOscillator()
    o.type = 'sine'
    o.frequency.value = f
    const g = c.createGain()
    g.gain.setValueAtTime(0.4, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
    o.connect(g).connect(m)
    o.start(t)
    o.stop(t + 0.18)
  }

  /** 锁定合鸣：纯五度双音 */
  chime() {
    if (!this.enabled) return
    this.ensure()
    const c = this.ctx
    const m = this.master
    if (!c || !m) return
    const t = c.currentTime
    ;[523.25, 784].forEach((f, k) => {
      const o = c!.createOscillator()
      o.type = 'sine'
      o.frequency.value = f * (1 + k * 0.0006)
      const g = c!.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.34, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5)
      o.connect(g).connect(m!)
      o.start(t)
      o.stop(t + 1.6)
    })
  }
}

export const audio = new SyncAudio()
