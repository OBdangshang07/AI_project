/**
 * 织机的声音——全部实时合成，没有音频文件。
 * 默认关闭：声音必须由用户主动打开（也符合浏览器自动播放策略）。
 * 打纬那一下是木头撞木头，不是「科技音效」。
 */
export class LoomAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  enabled = false;

  async enable() {
    if (this.enabled && this.ctx) {
      await this.ctx.resume();
      return true;
    }
    const AC: typeof AudioContext =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return false;
    const ctx = new AC();
    await ctx.resume();
    const master = ctx.createGain();
    master.gain.value = 0.5;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 6;
    master.connect(comp);
    comp.connect(ctx.destination);

    const n = ctx.sampleRate * 0.9;
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      last = last * 0.42 + w * 0.58;
      d[i] = last;
    }
    this.ctx = ctx;
    this.master = master;
    this.noise = buf;
    this.enabled = true;
    return true;
  }

  disable() {
    this.enabled = false;
    void this.ctx?.suspend();
  }

  private env(g: GainNode, t: number, peak: number, atk: number, dec: number) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t + atk + dec);
  }

  /** 打纬：木筘撞在织口上 */
  beat(power = 1) {
    const ctx = this.ctx;
    const master = this.master;
    if (!this.enabled || !ctx || !master || !this.noise) return;
    const t = ctx.currentTime;
    const p = Math.min(1.4, Math.max(0.2, power));

    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(420 + p * 260, t);
    bp.frequency.exponentialRampToValueAtTime(150, t + 0.09);
    bp.Q.value = 1.1;
    const g1 = ctx.createGain();
    this.env(g1, t, 0.42 * p, 0.001, 0.1);
    s.connect(bp);
    bp.connect(g1);
    g1.connect(master);
    s.start(t, Math.random() * 0.4);
    s.stop(t + 0.2);

    // 木体共鸣
    [118, 196, 302].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? 'sine' : 'triangle';
      o.frequency.setValueAtTime(f * (0.96 + Math.random() * 0.08), t);
      const g = ctx.createGain();
      this.env(g, t, (0.3 * p) / (i + 1.4), 0.002, 0.16 + i * 0.05);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.4);
    });
  }

  /** 投梭：梭子擦过经线的气声 */
  shuttle() {
    const ctx = this.ctx;
    const master = this.master;
    if (!this.enabled || !ctx || !master || !this.noise) return;
    const t = ctx.currentTime;
    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 2.4;
    bp.frequency.setValueAtTime(900, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + 0.12);
    bp.frequency.exponentialRampToValueAtTime(700, t + 0.26);
    const g = ctx.createGain();
    this.env(g, t, 0.08, 0.04, 0.22);
    s.connect(bp);
    bp.connect(g);
    g.connect(master);
    s.start(t, Math.random() * 0.4);
    s.stop(t + 0.35);
  }

  /** 穿综：一根线过一个综眼 */
  tick(pitch = 1) {
    const ctx = this.ctx;
    const master = this.master;
    if (!this.enabled || !ctx || !master) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = 1500 * pitch;
    const g = ctx.createGain();
    this.env(g, t, 0.05, 0.001, 0.03);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.06);
  }

  /** 回张力：整排经线绷紧后的余响 */
  snap() {
    const ctx = this.ctx;
    const master = this.master;
    if (!this.enabled || !ctx || !master) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(180 + i * 96 + Math.random() * 20, t);
      o.frequency.exponentialRampToValueAtTime(150 + i * 80, t + 0.5);
      const g = ctx.createGain();
      this.env(g, t + i * 0.012, 0.11 / (i + 1), 0.004, 0.7);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 1.0);
    }
    this.beat(1.4);
  }
}
