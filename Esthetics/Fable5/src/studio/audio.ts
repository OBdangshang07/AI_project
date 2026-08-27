/* WebAudio 合成 —— 没有一个音频文件。
   轮声：循环噪声缓冲 + 低通，转速映射音高与音量。
   其余皆是短促的物理声：拍泥、揉捏、裂、金鸣。 */

export class ClayAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noiseBuf: AudioBuffer | null = null
  private wheelSrc: AudioBufferSourceNode | null = null
  private wheelGain: GainNode | null = null
  private wheelFilter: BiquadFilterNode | null = null
  private gestured = false
  enabled = true

  /** 首次用户手势 —— 只有这条路径允许创建 AudioContext */
  gesture(): void {
    this.gestured = true
    this.init()
  }

  private init(): void {
    if (this.ctx || !this.gestured || !this.enabled) return
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.16
      this.master.connect(this.ctx.destination)
      const len = Math.floor(this.ctx.sampleRate * 1.2)
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
      const d = this.noiseBuf.getChannelData(0)
      let last = 0
      for (let i = 0; i < len; i++) {
        // 棕噪声更像摩擦
        const w = Math.random() * 2 - 1
        last = (last + 0.02 * w) / 1.02
        d[i] = last * 3.2
      }
    } catch {
      this.ctx = null
    }
  }

  private get ok(): boolean {
    if (!this.enabled || !this.ctx || !this.master) return false
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx.state !== 'closed'
  }

  private noise(dur: number, dest: AudioNode): void {
    if (!this.ctx || !this.noiseBuf) return
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuf
    const off = Math.random() * 0.6
    src.connect(dest)
    src.start(this.ctx.currentTime, off)
    src.stop(this.ctx.currentTime + dur)
  }

  /** 轮的持续嗡鸣 —— omega ∈ [0,1] 归一转速，每帧节流调用 */
  wheel(omega: number): void {
    if (!this.ok) {
      this.stopWheel()
      return
    }
    const c = this.ctx!
    if (!this.wheelSrc && omega > 0.02 && this.noiseBuf) {
      this.wheelSrc = c.createBufferSource()
      this.wheelSrc.buffer = this.noiseBuf
      this.wheelSrc.loop = true
      this.wheelFilter = c.createBiquadFilter()
      this.wheelFilter.type = 'lowpass'
      this.wheelFilter.frequency.value = 220
      this.wheelGain = c.createGain()
      this.wheelGain.gain.value = 0
      this.wheelSrc.connect(this.wheelFilter)
      this.wheelFilter.connect(this.wheelGain)
      this.wheelGain.connect(this.master!)
      this.wheelSrc.start()
    }
    if (this.wheelSrc && this.wheelGain && this.wheelFilter) {
      const t = c.currentTime
      const g = omega < 0.02 ? 0 : 0.05 + omega * 0.1
      this.wheelGain.gain.setTargetAtTime(g, t, 0.12)
      this.wheelFilter.frequency.setTargetAtTime(160 + omega * 420, t, 0.12)
      this.wheelSrc.playbackRate.setTargetAtTime(0.6 + omega * 0.9, t, 0.12)
    }
  }

  stopWheel(): void {
    if (this.wheelSrc) {
      try {
        this.wheelSrc.stop()
      } catch { /* already stopped */ }
      this.wheelSrc.disconnect()
      this.wheelSrc = null
      this.wheelGain = null
      this.wheelFilter = null
    }
  }

  /** 手在湿泥上的一下 —— 拖动塑形时节流触发 */
  squish(strength = 1): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const g = c.createGain()
    g.gain.setValueAtTime(0.12 * strength, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 420 + Math.random() * 360
    bp.Q.value = 1.6
    bp.connect(g)
    g.connect(this.master!)
    this.noise(0.12, bp)
  }

  /** 拍泥上轮 —— 低沉的一声 */
  splat(): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, t)
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.14)
    const g = c.createGain()
    g.gain.setValueAtTime(0.55, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
    osc.connect(g)
    g.connect(this.master!)
    osc.start(t)
    osc.stop(t + 0.25)
    const ng = c.createGain()
    ng.gain.setValueAtTime(0.25, t)
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 900
    lp.connect(ng)
    ng.connect(this.master!)
    this.noise(0.08, lp)
  }

  /** 偏心晃动的警告 —— 粗糙的咔嗒，rate 随危险度 */
  rattle(danger: number): void {
    if (!this.ok || danger < 0.1) return
    const c = this.ctx!, t = c.currentTime
    const g = c.createGain()
    g.gain.setValueAtTime(0.05 * danger, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
    const hp = c.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1400
    hp.connect(g)
    g.connect(this.master!)
    this.noise(0.05, hp)
  }

  /** 窑内升温 —— 低鸣渐强，dur 秒 */
  kilnSwell(dur: number): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(90, t)
    lp.frequency.linearRampToValueAtTime(260, t + dur)
    const g = c.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.09, t + dur * 0.7)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    lp.connect(g)
    g.connect(this.master!)
    this.noise(dur, lp)
  }

  /** 开裂 —— 短促的裂响，随后全场压低一拍 */
  crack(): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const g = c.createGain()
    g.gain.setValueAtTime(0.9, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2600
    bp.Q.value = 0.9
    bp.connect(g)
    g.connect(this.master!)
    this.noise(0.09, bp)
    const low = c.createOscillator()
    low.type = 'sine'
    low.frequency.setValueAtTime(80, t)
    low.frequency.exponentialRampToValueAtTime(36, t + 0.22)
    const lg = c.createGain()
    lg.gain.setValueAtTime(0.3, t)
    lg.gain.exponentialRampToValueAtTime(0.001, t + 0.26)
    low.connect(lg)
    lg.connect(this.master!)
    low.start(t)
    low.stop(t + 0.3)
    const m = this.master!.gain
    m.cancelScheduledValues(t)
    m.setValueAtTime(0.16, t)
    m.linearRampToValueAtTime(0.045, t + 0.05)
    m.linearRampToValueAtTime(0.16, t + 1.4)
  }

  /** 金鸣 —— 修补完成时一声轻响（近磬） */
  chime(): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    for (const [f, a, d] of [
      [1244.5, 0.1, 2.2],
      [1866.2, 0.05, 1.6],
      [3110.4, 0.02, 1.0],
    ] as const) {
      const osc = c.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      const g = c.createGain()
      g.gain.setValueAtTime(a, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + d)
      osc.connect(g)
      g.connect(this.master!)
      osc.start(t)
      osc.stop(t + d)
    }
  }

  /** 倒转的棘轮 */
  ratchet(pitch: number): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const g = c.createGain()
    g.gain.setValueAtTime(0.06, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 700 + 1100 * pitch
    bp.Q.value = 7
    bp.connect(g)
    g.connect(this.master!)
    this.noise(0.04, bp)
  }

  /** 钢丝线取器 —— 两声细响 */
  wire(): void {
    if (!this.ok) return
    const c = this.ctx!, t = c.currentTime
    const g = c.createGain()
    g.gain.setValueAtTime(0.09, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(2200, t)
    bp.frequency.exponentialRampToValueAtTime(600, t + 0.3)
    bp.Q.value = 4
    bp.connect(g)
    g.connect(this.master!)
    this.noise(0.3, bp)
  }

  setEnabled(b: boolean): void {
    this.enabled = b
    if (b) this.init()
    else this.stopWheel()
  }

  get hasGesture(): boolean {
    return this.gestured
  }
}
