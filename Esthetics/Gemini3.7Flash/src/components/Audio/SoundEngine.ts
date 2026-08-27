// ==========================================================================
// Web Audio API Procedural Synthesizer Engine
// Pure algorithmic sound synthesis: Ambient Drones, Crystal Chords, Micro-Clicks
// ==========================================================================

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private droneOscillators: OscillatorNode[] = [];
  private filterNode: BiquadFilterNode | null = null;

  // Scale frequencies (C Major 9th / Lydian Ethereal Mode: C3, G3, D4, E4, B4, D5)
  private readonly scale: number[] = [130.81, 196.0, 293.66, 329.63, 493.88, 587.33, 659.25, 783.99];

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Master lowpass filter for warm, velvet tone
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);
      this.filterNode.connect(this.masterGain);

      this.isInitialized = true;
      this.startAmbientDrone();
    } catch (e) {
      console.warn('Web Audio not supported or blocked by policy', e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.filterNode) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3.0);
    this.droneGain.connect(this.filterNode);

    // Three layered sine waves with micro-detuning for subtle analog beating
    const baseFreqs = [65.41, 98.0, 130.81]; // C2, G2, C3
    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Subtle LFO vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(this.droneGain);
      osc.start();
      this.droneOscillators.push(osc);
    });
  }

  /**
   * Play dynamic chord arpeggio based on manifold state and interaction position
   */
  public playHarmonicPluck(intensity: number = 0.5, pitchIndex: number = 2) {
    if (!this.isInitialized || this.isMuted || !this.ctx || !this.filterNode) return;
    this.resume();

    const now = this.ctx.currentTime;
    const clampedIndex = Math.max(0, Math.min(this.scale.length - 1, pitchIndex));
    const baseFreq = this.scale[clampedIndex];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = intensity > 0.7 ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    
    // Slight pitch drop for physical string tension feel
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.998, now + 0.8);

    const volume = Math.min(0.25, 0.05 + intensity * 0.2);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  /**
   * Subtle tactile haptic click for UI controls (sliders, state toggles)
   */
  public playTactileClick(freq: number = 1200, duration: number = 0.03) {
    if (!this.isInitialized || this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + duration);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  /**
   * Dynamic timbre shift based on dimension vector
   */
  public updateTimbre(entropy: number, rigor: number, empathy: number) {
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;
    
    // Higher entropy opens the filter and adds shimmer
    const cutoff = 400 + (entropy / 100) * 1800 + (rigor / 100) * 600;
    this.filterNode.frequency.setTargetAtTime(cutoff, now, 0.2);

    // Empathy modulates the Q resonance
    const qValue = 0.8 + (empathy / 100) * 3.5;
    this.filterNode.Q.setTargetAtTime(qValue, now, 0.2);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.35;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
