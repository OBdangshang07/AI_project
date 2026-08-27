/* ---------------------------------------------------------------------------
   SOUND — synthesised, never sampled. Off until the visitor asks for it.

   Two cues only, both of them physical rather than musical: a low thump for the
   collapse (weight) and a woodblock + paper rustle for a commitment (contact).
   On touch devices the same events also fire navigator.vibrate — the haptic is
   not an afterthought, it is the same feedback in another channel.
--------------------------------------------------------------------------- */

type Kind = 'thump' | 'commit';

let ac: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = false;

function ensure(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ac) {
    ac = new Ctor();
    master = ac.createGain();
    master.gain.value = 0.16;
    master.connect(ac.destination);
    const len = Math.floor(ac.sampleRate * 0.5);
    noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ac.state === 'suspended') void ac.resume();
  return ac;
}

export function setSound(on: boolean) {
  enabled = on;
  if (on) ensure();
}

export function isSound() {
  return enabled;
}

export function play(kind: Kind) {
  if (!enabled) return;
  const c = ensure();
  if (!c || !master || !noiseBuf) return;
  const t = c.currentTime;

  if (kind === 'thump') {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(96, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.4);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.9, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.52);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + 0.55);

    const n = c.createBufferSource();
    const nf = c.createBiquadFilter();
    const ng = c.createGain();
    n.buffer = noiseBuf;
    nf.type = 'lowpass';
    nf.frequency.value = 520;
    ng.gain.setValueAtTime(0.5, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    n.connect(nf).connect(ng).connect(master);
    n.start(t);
    n.stop(t + 0.32);
    return;
  }

  // commit — woodblock click
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1290, t);
  osc.frequency.exponentialRampToValueAtTime(560, t + 0.05);
  g.gain.setValueAtTime(0.5, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + 0.1);

  // ...and paper
  const n = c.createBufferSource();
  const nf = c.createBiquadFilter();
  const ng = c.createGain();
  n.buffer = noiseBuf;
  nf.type = 'bandpass';
  nf.frequency.value = 2900;
  nf.Q.value = 0.7;
  ng.gain.setValueAtTime(0.28, t + 0.01);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  n.connect(nf).connect(ng).connect(master);
  n.start(t + 0.01);
  n.stop(t + 0.18);
}

export function haptic(ms: number) {
  const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate === 'function') nav.vibrate(ms);
}
