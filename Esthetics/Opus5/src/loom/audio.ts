/**
 * audio.ts — synthesised, never sampled. No audio files, no network, no keys.
 *
 * Sound here is a *substitute feedback channel*, not decoration: the loom's
 * beat, the pitch of a plucked end, the snip of the cut-off. It is off until
 * the visitor asks for it, and it never plays under prefers-reduced-motion
 * unless explicitly enabled.
 */

export class LoomAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noise: AudioBuffer | null = null
  enabled = false
  private lastBeat = 0

  private ensure(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (this.ctx) return this.ctx
    const AC: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    const master = ctx.createGain()
    master.gain.value = 0.5
    // a gentle shelf so nothing is shrill on laptop speakers
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 7200
    master.connect(lp).connect(ctx.destination)
    this.ctx = ctx
    this.master = master

    const len = Math.floor(ctx.sampleRate * 0.5)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    this.noise = buf
    return ctx
  }

  async toggle(on: boolean) {
    this.enabled = on
    if (on) {
      const ctx = this.ensure()
      if (ctx && ctx.state === 'suspended') await ctx.resume()
      this.tension(0.35)
    }
  }

  /** a plucked warp end — two detuned partials through a resonant band */
  pluck(freq: number, amp = 1) {
    const ctx = this.gate()
    if (!ctx || !this.master) return
    const t = ctx.currentTime
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.16 * amp, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.15)

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq * 1.6
    bp.Q.value = 1.1

    for (const [ratio, gain, type] of [
      [1, 1, 'triangle'],
      [2.01, 0.34, 'triangle'],
      [3.02, 0.12, 'sine'],
    ] as const) {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.value = freq * ratio
      const og = ctx.createGain()
      og.gain.value = gain
      o.connect(og).connect(bp)
      o.start(t)
      o.stop(t + 1.2)
    }
    bp.connect(g).connect(this.master)
  }

  /** the beater packing a pick: wood thock + a short body thump */
  beat(force = 1, pan = 0.5) {
    const ctx = this.gate()
    if (!ctx || !this.master || !this.noise) return
    const t = ctx.currentTime
    if (t - this.lastBeat < 0.045) return
    this.lastBeat = t

    const p = ctx.createStereoPanner()
    p.pan.value = (pan - 0.5) * 1.3
    p.connect(this.master)

    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 950
    bp.Q.value = 0.9
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.09 * force, t)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.075)
    src.connect(bp).connect(ng).connect(p)
    src.start(t)
    src.stop(t + 0.1)

    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(58, t + 0.09)
    const og = ctx.createGain()
    og.gain.setValueAtTime(0.1 * force, t)
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
    o.connect(og).connect(p)
    o.start(t)
    o.stop(t + 0.16)
  }

  /** a pick being pulled back out — reversed, airy, unresolved */
  unravel() {
    const ctx = this.gate()
    if (!ctx || !this.master || !this.noise) return
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const hp = ctx.createBiquadFilter()
    hp.type = 'bandpass'
    hp.frequency.setValueAtTime(1600, t)
    hp.frequency.linearRampToValueAtTime(4200, t + 0.2)
    hp.Q.value = 2.2
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(0.05, t + 0.16)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26)
    src.connect(hp).connect(g).connect(this.master)
    src.start(t)
    src.stop(t + 0.3)
  }

  /** tension coming on / the warp arriving */
  tension(amp = 1) {
    const ctx = this.gate()
    if (!ctx || !this.master) return
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(70, t)
    o.frequency.exponentialRampToValueAtTime(196, t + 0.5)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(0.05 * amp, t + 0.24)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
    o.connect(g).connect(this.master)
    o.start(t)
    o.stop(t + 1)
  }

  snip() {
    const ctx = this.gate()
    if (!ctx || !this.master || !this.noise) return
    const t = ctx.currentTime
    for (const off of [0, 0.035]) {
      const src = ctx.createBufferSource()
      src.buffer = this.noise
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 5200
      bp.Q.value = 5
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.075, t + off)
      g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.05)
      src.connect(bp).connect(g).connect(this.master)
      src.start(t + off)
      src.stop(t + off + 0.06)
    }
  }

  private gate(): AudioContext | null {
    if (!this.enabled) return null
    const ctx = this.ensure()
    if (!ctx) return null
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  }

  dispose() {
    void this.ctx?.close()
    this.ctx = null
  }
}

/**
 * Haptic substitute for the machine's rhythm on touch devices, where the
 * beater's weight cannot be seen and heard at the same time. Patterns, not
 * just durations: learning and cutting feel different from a plain pick.
 */
export function buzz(pattern: number | number[]) {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return
  try {
    navigator.vibrate(pattern)
  } catch {
    /* a refused vibration is not an error */
  }
}
