/**
 * WebAudio synthesizer for ambient paper-like sounds.
 * No external assets — pure synthesized noise burst with a quick
 * lowpass envelope, evoking the sound of a pen sweeping across paper.
 */

let ctx: AudioContext | null = null;
let muted = false;
let masterGain: GainNode | null = null;

export function isMuted(): boolean {
  return muted;
}

export function setMuted(v: boolean): void {
  muted = v;
}

function ensure(): AudioContext | null {
  if (muted) return null;
  if (!ctx) {
    const Ctor = (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.18;
      masterGain.connect(ctx.destination);
    } catch {
      ctx = null;
      masterGain = null;
    }
  }
  if (ctx && ctx.state === 'suspended') {
    void ctx.resume();
  }
  return ctx;
}

export function prime(): void {
  ensure();
}

/** Soft strike — like a single pen stroke. */
export function playStrike(): void {
  const c = ensure();
  if (!c || !masterGain) return;
  const t0 = c.currentTime;

  // White-noise burst
  const dur = 0.18;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.4);
  }
  const src = c.createBufferSource();
  src.buffer = buf;

  // Lowpass to remove harshness
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 1800;
  lp.Q.value = 0.7;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(0.5, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);

  src.connect(lp).connect(gain).connect(masterGain);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

/** Quieter ambient ink-bleed — used when a "remainder" reveals. */
export function playReveal(): void {
  const c = ensure();
  if (!c || !masterGain) return;
  const t0 = c.currentTime;

  const o = c.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(220, t0);
  o.frequency.exponentialRampToValueAtTime(140, t0 + 1.4);

  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 800;
  lp.Q.value = 0.4;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(0.16, t0 + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + 1.6);

  o.connect(lp).connect(gain).connect(masterGain);
  o.start(t0);
  o.stop(t0 + 1.7);
}
