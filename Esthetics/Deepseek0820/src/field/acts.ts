import { lerp, smoothstep } from './noise';

/**
 * The five states of the field.
 *
 * Every act is a *complete* parameter set, not a delta — so the device always
 * has a defined resting behaviour, and scroll only ever interpolates between
 * two well-designed states. That is what makes the chapters feel causally
 * connected instead of stitched together.
 */
export type FieldParams = {
  /** curl-noise amplitude — how undecided the field is */
  drift: number;
  /** how strongly filaments agree with each other */
  align: number;
  /** pointer lensing radius in px (0 = the pointer is ignored) */
  gravity: number;
  /** 0 → free field, 1 → every filament belongs to the one line */
  collapse: number;
  /** twist around the line: the weave of the visitor's choices */
  braid: number;
  /** trail fade per frame; low = long ink trails, high = dry brush */
  bleed: number;
  /** global ink density */
  ink: number;
  /** vertical extent of the field, as a fraction of half the viewport */
  spread: number;
  /** simulation time scale */
  speed: number;
  /** 0 → centre stage, 1 → the ink migrates into the right-hand margin */
  edge: number;
};

export type ActId = 'field' | 'gravity' | 'collapse' | 'choice' | 'margin';

export type Act = {
  id: ActId;
  /** roman numeral + name, used by the rail and the act tags */
  num: string;
  name: string;
  en: string;
  params: FieldParams;
  /**
   * Where inside this act the morph towards the next one begins (0–1).
   * Act I holds its identity until the very last moment (0.88) so that the
   * collapse arrives as an event, not as a gradual slide.
   */
  blendStart: number;
};

export const ACTS: Act[] = [
  {
    id: 'field', num: '零', name: '场', en: 'the field',
    // act zero is already half-consumed at load (the viewport centre rule),
    // so its handover starts late to keep the opening state pure
    blendStart: 0.72,
    params: { drift: 1.5, align: 0.018, gravity: 330, collapse: 0, braid: 0, bleed: 0.032, ink: 1.15, spread: 0.95, speed: 1, edge: 0 },
  },
  {
    id: 'gravity', num: '一', name: '引力', en: 'gravity',
    blendStart: 0.88,
    params: { drift: 0.9, align: 0.05, gravity: 470, collapse: 0.05, braid: 0, bleed: 0.03, ink: 1.2, spread: 0.8, speed: 1, edge: 0 },
  },
  {
    id: 'collapse', num: '二', name: '抉择', en: 'the collapse',
    blendStart: 0.6,
    params: { drift: 0.1, align: 0.11, gravity: 300, collapse: 1, braid: 0.05, bleed: 0.026, ink: 1.15, spread: 0.26, speed: 1, edge: 0 },
  },
  {
    id: 'choice', num: '三', name: '共作', en: 'co-authorship',
    blendStart: 0.62,
    params: { drift: 0.24, align: 0.09, gravity: 350, collapse: 0.84, braid: 0.8, bleed: 0.032, ink: 1.05, spread: 0.4, speed: 1, edge: 0 },
  },
  {
    id: 'margin', num: '四', name: '留白', en: 'the margin',
    blendStart: 1,
    params: { drift: 0.45, align: 0.055, gravity: 200, collapse: 0.12, braid: 0.3, bleed: 0.052, ink: 0.72, spread: 0.95, speed: 0.85, edge: 1 },
  },
];

const KEYS = Object.keys(ACTS[0].params) as (keyof FieldParams)[];

export function blendParams(a: FieldParams, b: FieldParams, t: number): FieldParams {
  const out = {} as FieldParams;
  for (const k of KEYS) out[k] = lerp(a[k], b[k], t);
  return out;
}

/**
 * Scroll position → the field's target state.
 * `index` is the current act, `p` the progress inside it.
 */
export function paramsFor(index: number, p: number): FieldParams {
  const act = ACTS[Math.max(0, Math.min(ACTS.length - 1, index))];
  const next = ACTS[Math.min(ACTS.length - 1, index + 1)];
  const w = smoothstep(act.blendStart, 1, p);
  return blendParams(act.params, next.params, w);
}

/**
 * The three questions of act III. Each answer bends the field permanently —
 * so two visitors never leave with the same drawing.
 */
export type Question = {
  q: string;
  qEn: string;
  opts: [Opt, Opt];
};
export type Opt = {
  zh: string;
  en: string;
  /** how this answer re-tunes the device */
  bias: Partial<FieldParams>;
  /** the fragment this answer contributes to the closing sentence */
  closing: string;
};

export const QUESTIONS: Question[] = [
  {
    q: '这条线应该更像哪一种诚实？',
    qEn: 'which kind of honesty',
    opts: [
      { zh: '更准确', en: 'precise', bias: { drift: -0.16, align: 0.05, spread: -0.08 }, closing: '把话说准' },
      { zh: '更大胆', en: 'daring', bias: { drift: 0.5, spread: 0.14, braid: 0.16 }, closing: '敢往前走一步' },
    ],
  },
  {
    q: '先给你结论，还是先说清代价？',
    qEn: 'answer first, or cost first',
    opts: [
      { zh: '先给结论', en: 'answer first', bias: { align: 0.05, bleed: 0.008, collapse: 0.06 }, closing: '先给你一个落点' },
      { zh: '先说代价', en: 'cost first', bias: { braid: 0.3, bleed: -0.008, drift: 0.1 }, closing: '先把代价摊开' },
    ],
  },
  {
    q: '最后这一步，谁来落笔？',
    qEn: 'who holds the pen',
    opts: [
      { zh: '你替我决定', en: 'you decide', bias: { collapse: 0.1, align: 0.04, ink: 0.12 }, closing: '必要时替你落笔' },
      { zh: '留给我决定', en: 'leave it to me', bias: { collapse: -0.16, spread: 0.12, drift: 0.16 }, closing: '把笔留在你手里' },
    ],
  },
];

/** Sum of the chosen options' biases, applied on top of the act state. */
export function biasFor(choices: (0 | 1 | null)[]): Partial<FieldParams> {
  const out: Partial<FieldParams> = {};
  choices.forEach((c, i) => {
    if (c === null || !QUESTIONS[i]) return;
    const b = QUESTIONS[i].opts[c].bias;
    for (const k of Object.keys(b) as (keyof FieldParams)[]) {
      out[k] = (out[k] ?? 0) + (b[k] ?? 0);
    }
  });
  return out;
}
