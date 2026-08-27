import { noise3, clamp, lerp, hash32 } from './noise';
import type { FieldParams } from './acts';

/* ---------------------------------------------------------------------------
   THE DEVICE — 未定之场 / the unresolved field
   ---------------------------------------------------------------------------
   ~2,600 ink filaments advected by a noise field, drawn as one-frame-long
   segments onto a single canvas that fades towards transparent. The fade rate
   *is* the trail length, which is why "bleed" is a designed parameter and not
   a post-effect: it is the ink's willingness to stay on the paper.

   Everything the page does to it goes through three verbs:
     setTarget(params)   — the scroll re-tunes the resting behaviour
     setPointer(x, y)    — attention bends the field (tangentially: it lenses,
                           it does not suck particles into the cursor)
     pulse(kind)         — a scripted, time-based event with weight and overshoot

   No WebGL: the subject is ink soaking into paper, which is subtractive and
   low-contrast. Canvas 2D gives exact control of stroke width and alpha at
   hairline scale, and degrades on weak hardware by simply drawing fewer lines.
--------------------------------------------------------------------------- */

const INK = '22,19,15';
const RED = '178,58,43';
const PAPER = '241,238,230';
const TAU = Math.PI * 2;

type Envelope = {
  kind: 'collapse' | 'commit';
  t: number;
  dur: number;
};

export type Readout = {
  /** how many candidate paths are still open — 2,600 → 1 → back again */
  paths: number;
  collapse: number;
  fps: number;
};

export class FieldEngine {
  private cv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private reduced: boolean;

  private w = 0;
  private h = 0;
  private dpr = 1;

  private n = 0;          // allocated filaments
  private active = 0;     // currently simulated (perf valve)
  private px!: Float32Array;
  private py!: Float32Array;
  private vx!: Float32Array;
  private vy!: Float32Array;
  private lane!: Float32Array;
  private seed!: Float32Array;

  private tn = 0;         // committed threads (the visitor's weave)
  private tx!: Float32Array;
  private ty!: Float32Array;
  private tvx!: Float32Array;
  private tvy!: Float32Array;
  private tlane!: Float32Array;
  private tbias!: Float32Array;
  private tphase!: Float32Array;

  private cur: FieldParams;
  private target: FieldParams;
  private bias: Partial<FieldParams> = {};

  private t = 0;
  private last = 0;
  private raf = 0;
  private running = false;
  private ema = 1 / 60;
  private tick = 0;

  private pointerX = -9999;
  private pointerY = -9999;
  private pvx = 0;
  private pvy = 0;
  private pointerOn = false;
  private idle = 4;
  private touchRelease = 0;

  private env: Envelope | null = null;
  private breathPhase = 0;
  private sampler: (() => void) | null = null;
  /** paper-coloured wash that keeps the field off the type column */
  private mat: CanvasGradient | null = null;
  private matStrength = 0.05;
  /** while composing a still plate the wash must not run once per step */
  private composing = false;

  constructor(canvas: HTMLCanvasElement, opts: { reduced: boolean }) {
    this.cv = canvas;
    // opaque: the fade washes towards paper instead of towards transparency.
    // With an alpha fade, 8-bit rounding leaves ink stranded at ~7% forever —
    // a grey veil over the whole sheet. Washing with paper cannot do that.
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('canvas 2d unavailable');
    this.ctx = ctx;
    this.reduced = opts.reduced;

    this.cur = {
      drift: 1.5, align: 0.018, gravity: 250, collapse: 0, braid: 0,
      bleed: 0.055, ink: 0.8, spread: 0.95, speed: 1, edge: 0,
    };
    this.target = { ...this.cur };

    this.measure();
    this.allocate();

    window.addEventListener('pointermove', this.onPointer, { passive: true });
    window.addEventListener('pointerdown', this.onPointer, { passive: true });
    window.addEventListener('pointerup', this.onPointerUp, { passive: true });
    window.addEventListener('pointercancel', this.onPointerUp, { passive: true });
    window.addEventListener('blur', this.onPointerUp);
    document.addEventListener('visibilitychange', this.onVisibility);
    window.addEventListener('resize', this.onResize);

    if (this.reduced) this.still();
    else {
      // pre-roll: the paper should never be seen blank. 45 hidden steps put ink
      // on it before the first visible frame, so the piece opens *already alive*.
      for (let i = 0; i < 45; i++) {
        this.step(1 / 60, { ...this.cur, bleed: 0.02, ink: this.cur.ink * 0.75 });
      }
      this.start();
    }
  }

  /* ----------------------------------------------------------- lifecycle */

  private start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy() {
    this.stop();
    window.removeEventListener('pointermove', this.onPointer);
    window.removeEventListener('pointerdown', this.onPointer);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('blur', this.onPointerUp);
    document.removeEventListener('visibilitychange', this.onVisibility);
    window.removeEventListener('resize', this.onResize);
  }

  private onVisibility = () => {
    if (this.reduced) return;
    if (document.hidden) this.stop();
    else this.start();
  };

  /* ---------------------------------------------------------------- size */

  private measure() {
    const rect = this.cv.getBoundingClientRect();
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    const cssW = Math.max(320, Math.round(rect.width || window.innerWidth));
    const cssH = Math.max(320, Math.round(rect.height || window.innerHeight));
    // pixel budget: an ink field is bandwidth-bound because of the fade pass
    const budget = 2.3e6;
    if (cssW * cssH * dpr * dpr > budget) dpr = Math.sqrt(budget / (cssW * cssH));
    this.w = cssW;
    this.h = cssH;
    this.dpr = Math.max(1, dpr);
    this.cv.width = Math.round(cssW * this.dpr);
    this.cv.height = Math.round(cssH * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // The field defers to the voice: a paper wash, strongest over the type
    // column, weakest at the outer edge where the composition wants weight.
    // This is what keeps body copy above AA contrast without inventing a card.
    const narrow = cssW < 992;
    this.matStrength = narrow ? 0.032 : 0.055;
    const g = this.ctx.createLinearGradient(0, 0, cssW, 0);
    g.addColorStop(0, `rgba(${PAPER},1)`);
    g.addColorStop(0.26, `rgba(${PAPER},0.7)`);
    g.addColorStop(narrow ? 0.72 : 0.55, `rgba(${PAPER},0.34)`);
    g.addColorStop(0.82, `rgba(${PAPER},0.16)`);
    g.addColorStop(1, `rgba(${PAPER},0.07)`);
    this.mat = g;
    this.paper();
  }

  /** wash the whole sheet back to paper */
  private paper() {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = `rgb(${PAPER})`;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  private onResize = () => {
    const prev = this.n;
    this.measure();
    this.allocate(prev > 0);
    if (this.reduced) this.still();
  };

  private allocate(keep = false) {
    const area = this.w * this.h;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const density = coarse ? 1 / 620 : 1 / 430;
    const n = Math.round(clamp(area * density, 700, 3000));
    if (keep && n === this.n) return;

    this.n = n;
    this.active = n;
    this.px = new Float32Array(n);
    this.py = new Float32Array(n);
    this.vx = new Float32Array(n);
    this.vy = new Float32Array(n);
    this.lane = new Float32Array(n);
    this.seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const l = hash32(i * 7 + 11) * 2 - 1;
      // low-discrepancy start: a hash-based scatter leaves visible vertical
      // banding, because uniform advection preserves whatever clumping it began
      // with. The golden ratio spreads the filaments evenly and permanently.
      this.px[i] = ((i * 0.6180339887498949) % 1) * this.w;
      this.py[i] = this.h * 0.5 + l * this.h * 0.5;
      this.vx[i] = 0.35 + hash32(i * 13 + 5) * 0.75;
      this.vy[i] = 0;
      this.lane[i] = l;
      this.seed[i] = hash32(i * 17 + 7) * 1000;
    }

    const maxThreads = 26 * 3;
    if (!this.tx || this.tx.length !== maxThreads) {
      this.tx = new Float32Array(maxThreads);
      this.ty = new Float32Array(maxThreads);
      this.tvx = new Float32Array(maxThreads);
      this.tvy = new Float32Array(maxThreads);
      this.tlane = new Float32Array(maxThreads);
      this.tbias = new Float32Array(maxThreads);
      this.tphase = new Float32Array(maxThreads);
      this.tn = 0;
    }
    this.paper();
  }

  /* -------------------------------------------------------------- inputs */

  private onPointer = (e: PointerEvent) => {
    const nx = e.clientX;
    const ny = e.clientY;
    if (this.pointerOn) {
      this.pvx = lerp(this.pvx, nx - this.pointerX, 0.35);
      this.pvy = lerp(this.pvy, ny - this.pointerY, 0.35);
    }
    this.pointerX = nx;
    this.pointerY = ny;
    this.pointerOn = true;
    this.idle = 0;
    this.touchRelease = 0;
    if (this.reduced) return;
    this.start();
  };

  private onPointerUp = () => {
    // touch has no hover: keep the memory of the finger for a moment, then let go
    this.touchRelease = performance.now();
  };

  setTarget(p: FieldParams, bias: Partial<FieldParams> = {}) {
    this.target = p;
    this.bias = bias;
  }

  /**
   * The page hands the engine a sampler instead of running its own rAF chain.
   * One clock drives everything: scroll is read at the top of the same frame
   * that draws it, so the field can never lag a frame behind the type — and a
   * dropped frame can never leave a "pending" flag stuck.
   */
  setSampler(fn: (() => void) | null) {
    this.sampler = fn;
  }

  setReduced(reduced: boolean) {
    if (this.reduced === reduced) return;
    this.reduced = reduced;
    if (reduced) { this.stop(); this.still(); }
    else this.start();
  }

  /** Scripted event: the one moment of real weight in the whole piece. */
  pulse(kind: 'collapse' | 'commit') {
    this.env = { kind, t: 0, dur: kind === 'collapse' ? 1.15 : 0.55 };
    if (this.reduced) { this.still(); return; }
    this.start();
  }

  /** Weave one committed answer permanently into the field. */
  commit(index: number, side: 0 | 1) {
    const per = 26;
    const base = Math.min(index, 2) * per;
    const bias = side === 0 ? -1 : 1;
    for (let k = 0; k < per; k++) {
      const i = base + k;
      if (i >= this.tx.length) break;
      const l = (k / (per - 1)) * 2 - 1;
      this.tx[i] = hash32(i * 29 + 3) * this.w;
      this.ty[i] = this.h * 0.5 + l * 8;
      this.tvx[i] = 0.9 + hash32(i * 11 + 2) * 0.6;
      this.tvy[i] = 0;
      this.tlane[i] = l;
      this.tbias[i] = bias;
      this.tphase[i] = index * 2.1 + (side === 0 ? 0 : Math.PI) + l * 0.6;
    }
    this.tn = Math.max(this.tn, base + per);

    // a pluck: the whole field is displaced away from the line, then returns
    for (let i = 0; i < this.n; i++) {
      const s = this.lane[i] >= 0 ? 1 : -1;
      this.vy[i] += s * (1.6 + hash32(i * 3 + 1) * 2.2);
    }
    this.pulse('commit');
  }

  reset() {
    this.tn = 0;
    this.env = null;
    this.allocate();
    if (this.reduced) this.still();
  }

  /* ------------------------------------------------------------- readout */

  getReadout(): Readout {
    const c = clamp(this.cur.collapse, 0, 1);
    const open = Math.max(1, Math.round(this.active * Math.pow(1 - c, 2.2)));
    return { paths: open, collapse: c, fps: 1 / Math.max(this.ema, 1e-3) };
  }

  /* ------------------------------------------------------------ the line */

  private lineY(x: number, collapse: number) {
    const cy = this.h * 0.5;
    const amp = this.h * 0.14 * (1 - collapse);
    return cy
      + Math.sin(x * 0.0042 + this.t * 0.33) * amp
      + Math.sin(x * 0.0017 - this.t * 0.21) * amp * 0.55;
  }

  /* ------------------------------------------------- parameter envelopes */

  private effective(dt: number): FieldParams {
    const c = this.cur;
    const tg = this.target;
    const b = this.bias;

    // critically damped approach — different stiffness per parameter is what
    // gives the device weight: ink and bleed react fast, geometry lags behind.
    const k = (rate: number) => 1 - Math.pow(1 - rate, dt * 60);
    c.drift += ((tg.drift + (b.drift ?? 0)) - c.drift) * k(0.045);
    c.align += ((tg.align + (b.align ?? 0)) - c.align) * k(0.05);
    c.gravity += (tg.gravity - c.gravity) * k(0.06);
    c.collapse += (clamp(tg.collapse + (b.collapse ?? 0), 0, 1) - c.collapse) * k(0.035);
    c.braid += ((tg.braid + (b.braid ?? 0)) - c.braid) * k(0.04);
    c.bleed += ((tg.bleed + (b.bleed ?? 0)) - c.bleed) * k(0.09);
    c.ink += ((tg.ink + (b.ink ?? 0)) - c.ink) * k(0.08);
    c.spread += (clamp(tg.spread + (b.spread ?? 0), 0.08, 1.1) - c.spread) * k(0.04);
    c.speed += (tg.speed - c.speed) * k(0.05);
    c.edge += (tg.edge - c.edge) * k(0.035);

    const out: FieldParams = { ...c };

    // breathing: the field only does this when nobody touches it for a while.
    // Nothing announces it. It is there for people who stop.
    if (this.idle > 1.7 && out.collapse < 0.5) {
      this.breathPhase += dt * 1.15;
      const br = Math.sin(this.breathPhase);
      const gate = clamp((this.idle - 1.7) / 2.2, 0, 1);
      out.spread *= 1 + 0.1 * br * gate;
      out.drift *= 1 + 0.32 * br * gate;
      out.ink *= 1 + 0.06 * br * gate;
    }

    // scripted events ride on top of the spring state
    const env = this.env;
    if (env) {
      env.t += dt;
      const u = env.t / env.dur;
      if (u >= 1) {
        this.env = null;
      } else if (env.kind === 'collapse') {
        // ── 0–15%: anticipation. The field expands and gets *less* decided.
        // ── 15–47%: convergence, quartic ease-in, overshooting past 1.
        // ── 47–100%: settle with one damped ring.
        let w = 1;
        if (u < 0.15) {
          const a = u / 0.15;
          w = 0.4 + 0.6 * a;
          out.collapse = lerp(out.collapse, 0.02, a);
          out.spread *= 1 + 0.34 * Math.sin(a * Math.PI);
          out.drift *= 1 + 1.1 * Math.sin(a * Math.PI);
          out.bleed *= 1 - 0.35 * a;
        } else if (u < 0.47) {
          const a = (u - 0.15) / 0.32;
          const e = a < 0.5 ? 8 * a * a * a * a : 1 - 8 * Math.pow(1 - a, 4);
          out.collapse = lerp(0.02, 1.1, e);
          out.spread = lerp(out.spread * 1.34, 0.12, e);
          out.drift = lerp(out.drift * 2, 0.1, e);
          out.bleed = lerp(out.bleed * 0.65, 0.015, e);
          out.ink = lerp(out.ink, 1.5, e);
          out.align = lerp(out.align, 0.22, e);
        } else {
          const a = (u - 0.47) / 0.53;
          const ring = Math.sin(a * Math.PI * 2.2) * Math.pow(1 - a, 2.4);
          out.collapse = 1.1 - 0.1 * a + ring * 0.055;
          out.spread = lerp(0.12, out.spread, a * a);
          out.drift = lerp(0.1, out.drift, a * a);
          out.bleed = lerp(0.015, out.bleed, a);
          out.ink = lerp(1.5, out.ink, a);
          out.align = lerp(0.22, out.align, a);
          w = 1 - Math.pow(a, 3);
        }
        out.collapse = lerp(this.cur.collapse, clamp(out.collapse, 0, 1.1), w);
      } else {
        // commit: a short vermilion flare and a tightening of the weave
        const a = Math.sin(Math.min(1, u) * Math.PI);
        out.ink *= 1 + 0.5 * a;
        out.braid += 0.35 * a;
        out.bleed *= 1 - 0.3 * a;
      }
    }
    return out;
  }

  /* ---------------------------------------------------------------- loop */

  private frame = (now: number) => {
    if (!this.running) return;
    const raw = (now - this.last) / 1000;
    this.last = now;
    const dt = clamp(raw || 1 / 60, 1 / 240, 1 / 20);
    this.ema = this.ema * 0.9 + dt * 0.1;

    if (this.sampler) this.sampler();

    // touch memory: release the finger's grip 900ms after it left the glass
    if (this.touchRelease && now - this.touchRelease > 900) {
      this.pointerOn = false;
      this.touchRelease = 0;
    }
    this.idle += dt;
    this.pvx *= 0.86;
    this.pvy *= 0.86;

    // perf valve — fewer filaments, never a lower frame rate
    if (++this.tick % 45 === 0) {
      if (this.ema > 1 / 38) this.active = Math.max(Math.round(this.n * 0.34), Math.round(this.active * 0.86));
      else if (this.ema < 1 / 56) this.active = Math.min(this.n, Math.round(this.active * 1.07));
    }

    this.step(dt, this.effective(dt));
    this.raf = requestAnimationFrame(this.frame);
  };

  /** One simulated + drawn frame. Also used, repeatedly, to compose the still. */
  private step(dt: number, p: FieldParams) {
    const { ctx, w, h } = this;
    this.t += dt * p.speed;
    const col = clamp(p.collapse, 0, 1.1);

    /* the ink lets go of the paper at exactly `bleed` per 60th of a second */
    const fade = 1 - Math.pow(1 - clamp(p.bleed, 0.004, 0.6), dt * 60);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(${PAPER},${fade})`;
    ctx.fillRect(0, 0, w, h);

    /* ...and a little more paper where the words are. The mat steps back as the
       field collapses: by then the ink is a single band, the wash over the type
       is already lighter, and the line has to read across the whole sheet. */
    if (this.mat && !this.composing) {
      ctx.globalAlpha = clamp(this.matStrength * (1 - p.edge * 0.75) * (1 - col * 0.6), 0, 1);
      ctx.fillStyle = this.mat;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    }

    const band = h * 0.5 * p.spread * (1 - col * 0.86) + 5;
    const gr = p.gravity;
    const gr2 = gr * gr;
    const pOn = this.pointerOn && gr > 1;
    const pxp = this.pointerX;
    const pyp = this.pointerY;
    const wake = clamp(Math.hypot(this.pvx, this.pvy) * 0.06, 0, 1.6);
    const edgeX = w - Math.min(96, Math.max(40, w * 0.06));
    const drift = p.drift;
    const align = p.align;
    const flow = (0.7 + col * 1.5) * (1 - clamp(p.edge, 0, 1) * 0.94);
    const braidAmp = p.braid * 26;
    const nf = 0.0016;
    const nt = this.t * 0.085;

    // bands: 62% hairline, 28% mid, 10% heavy. Contiguous so each band is a
    // single batched path — 3 stroke() calls per frame for ~2.6k segments.
    // The two dark bands gain weight as the field decides: the line has to end
    // up the blackest thing on the sheet, without thickening the diffuse state.
    const decided = 1 + col * 0.9;
    const n = this.active;
    const b1 = Math.round(n * 0.62);
    const b2 = Math.round(n * 0.9);
    const bands: [number, number, number, number][] = [
      [0, b1, 0.05, 0.5],
      [b1, b2, 0.1 * decided, 0.85],
      [b2, n, 0.2 * decided, 1.25],
    ];

    for (let bi = 0; bi < 3; bi++) {
      const [from, to, alpha, width] = bands[bi];
      ctx.beginPath();
      for (let i = from; i < to; i++) {
        let x = this.px[i];
        let y = this.py[i];
        const ox = x;
        const oy = y;
        const lane = this.lane[i];
        const sd = this.seed[i];

        // 1 · the undecided field
        const a = noise3(x * nf + sd, y * nf, nt + sd * 0.01) * TAU * 1.7;
        let ax = Math.cos(a) * drift;
        let ay = Math.sin(a) * drift;

        // 2 · agreement: everyone drifts right, faster once decided — but in
        //     the margin act the rightward flow is switched off, so the ink can
        //     actually gather into a rule instead of streaming past the edge
        ax += (flow - this.vx[i]) * align * 4;
        ay += -this.vy[i] * align * 2;

        // 3 · the line: as collapse rises the band closes onto one stroke. The
        //     spring stiffens superlinearly, otherwise noise keeps the "line"
        //     a 150px-wide smear instead of a decision.
        if (col > 0.001) {
          const ly = this.lineY(x, col) + lane * band * (1 - col);
          ay += (ly - y) * col * (0.045 + 0.11 * col * col);
        }

        // 4 · the weave
        if (braidAmp > 0.01) {
          ay += Math.sin(x * 0.019 - this.t * 1.5 + lane * 2.2) * braidAmp * 0.06;
        }

        // 5 · attention as gravity — mostly tangential, so the field *bends*
        if (pOn) {
          const dx = pxp - x;
          const dy = pyp - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < gr2 && d2 > 1) {
            const inv = 1 / Math.sqrt(d2);
            const f = Math.pow(1 - d2 / gr2, 2) * (1.9 + wake);
            ax += (-dy * 0.8 + dx * 0.34) * inv * f;
            ay += (dx * 0.8 + dy * 0.34) * inv * f;
            ax += this.pvx * 0.02 * f;
            ay += this.pvy * 0.02 * f;
          }
        }

        // 6 · the margin: the line becomes a rule at the edge of the page
        if (p.edge > 0.001) {
          ax += (edgeX - x) * p.edge * 0.04;
          ay += p.edge * (1.3 + lane * 0.45);
        }

        // extra damping in the margin act so the ink *settles* into the rule
        // instead of oscillating around it
        const damp = 0.945 - p.edge * 0.07;
        let vx = (this.vx[i] + ax) * damp;
        let vy = (this.vy[i] + ay) * damp;
        const sp = Math.abs(vx) + Math.abs(vy);
        if (sp > 9) { const s = 9 / sp; vx *= s; vy *= s; }

        x += vx * dt * 60;
        y += vy * dt * 60;

        // wrap; re-enter close to wherever the line currently is. A wrapped
        // filament must NOT be stroked this frame: joining the two sides of the
        // sheet is what was drawing spurious full-height scan lines.
        let jumped = false;
        if (x > w + 24) {
          x = -24;
          y = this.lineY(-24, col) + lane * band;
          vy = 0;
          jumped = true;
        } else if (x < -24) {
          x = w + 24;
          jumped = true;
        }
        if (y > h + 40) { y = -40; jumped = true; } else if (y < -40) { y = h + 40; jumped = true; }

        this.px[i] = x;
        this.py[i] = y;
        this.vx[i] = vx;
        this.vy[i] = vy;

        // the segment travelled this frame *is* the brush stroke
        if (!jumped) {
          ctx.moveTo(ox, oy);
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = `rgba(${INK},${clamp(alpha * p.ink, 0, 1)})`;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    /* the visitor's committed threads — vermilion, always on top */
    if (this.tn > 0) {
      ctx.beginPath();
      for (let i = 0; i < this.tn; i++) {
        let x = this.tx[i];
        let y = this.ty[i];
        const ox = x;
        const oy = y;
        const lane = this.tlane[i];
        const amp = 9 + braidAmp * (1 + this.tbias[i] * 0.4);
        const ly = this.lineY(x, Math.max(col, 0.55))
          + Math.sin(x * 0.021 - this.t * 1.15 + this.tphase[i]) * amp * (0.45 + lane * 0.55);
        const tflow = (1.15 + col * 1.2) * (1 - clamp(p.edge, 0, 1) * 0.95);
        let vx = (this.tvx[i] + (tflow - this.tvx[i]) * 0.1) * (0.97 - p.edge * 0.07);
        let vy = (this.tvy[i] + (ly - y) * 0.055 * (1 - p.edge * 0.75)) * 0.93;
        if (pOn) {
          const dx = pxp - x;
          const dy = pyp - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < gr2 && d2 > 1) {
            const inv = 1 / Math.sqrt(d2);
            const f = Math.pow(1 - d2 / gr2, 2) * 1.1;
            vx += -dy * inv * f;
            vy += dx * inv * f;
          }
        }
        if (p.edge > 0.001) {
          vx += (edgeX - x) * p.edge * 0.028;
          vy += p.edge * 1.15;
        }
        x += vx * dt * 60;
        y += vy * dt * 60;
        let tjump = false;
        if (x > w + 20) { x = -20; y = this.lineY(-20, col); tjump = true; }
        if (y > h + 30) { y = -30; tjump = true; } else if (y < -30) { y = h + 30; tjump = true; }
        this.tx[i] = x; this.ty[i] = y; this.tvx[i] = vx; this.tvy[i] = vy;
        if (!tjump) { ctx.moveTo(ox, oy); ctx.lineTo(x, y); }
      }
      ctx.strokeStyle = `rgba(${RED},${clamp(0.2 * p.ink, 0, 0.5)})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }
  }

  /**
   * prefers-reduced-motion: instead of "the same thing, slower", the device
   * prints a plate — the same simulation, exposed for 175 steps like a long
   * photographic exposure, then frozen. Every act gets its own image, so the
   * narrative still has five distinct states; none of them move.
   */
  still() {
    this.stop();
    this.paper();
    this.pointerOn = false;
    const p = { ...this.target };
    this.cur = { ...p };
    this.env = null;

    // A plate must be a pure function of its act — not of whatever the previous
    // plate happened to leave behind. Seed every filament onto this act's own
    // geometry, then expose. (Without this, the collapsed acts printed almost
    // blank, because the ink spent the exposure travelling to the line.)
    const col = clamp(p.collapse, 0, 1);
    const band = this.h * 0.5 * p.spread * (1 - col * 0.86) + 5;
    for (let i = 0; i < this.n; i++) {
      const x = ((i * 0.6180339887498949) % 1) * this.w;
      this.px[i] = x;
      this.py[i] = this.lineY(x, col) + this.lane[i] * band;
      this.vx[i] = 0.35 + hash32(i * 13 + 5) * 0.75;
      this.vy[i] = 0;
    }

    this.composing = true;
    for (let s = 0; s < 175; s++) {
      // long exposure: almost no fade, so the paths themselves become the image
      this.step(1 / 60, { ...p, bleed: 0.008, ink: p.ink * 1.15 });
    }
    this.composing = false;

    // the type wash is a single finishing pass, not 175 of them
    if (this.mat) {
      this.ctx.globalAlpha = clamp(0.3 * (1 - p.edge * 0.25), 0, 1);
      this.ctx.fillStyle = this.mat;
      this.ctx.fillRect(0, 0, this.w, this.h);
      this.ctx.globalAlpha = 1;
    }
  }
}
