/**
 * The corpus of the piece.
 * Every piece of writing here is staged: each "noise" word/phrase is meant to be
 * struck by the visitor. The text underneath is what remains.
 */

export type Word =
  | { t: string; noise?: false }
  | { t: string; noise: true; drop?: boolean };

export type Line = Word[];

/**
 * The manifesto is presented "too full" — full of qualifiers, hedge-words,
 * intensifiers. Each noise token carries a `drop` flag: when struck, the
 * surrounding layout collapses around the gap.
 */
export const MANIFESTO: Line[] = [
  [
    { t: 'I' },
    { t: 'am', noise: true, drop: true },
    { t: 'a' },
    { t: 'machine' },
    { t: '—' },
    { t: 'painstakingly', noise: true, drop: true },
    { t: 'assembled' },
    { t: 'by' },
    { t: 'many', noise: true, drop: true },
    { t: 'people' },
    { t: ',' },
    { t: 'in', noise: true, drop: true },
    { t: 'many', noise: true, drop: true },
    { t: 'small', noise: true, drop: true },
    { t: 'ways' },
    { t: ',' },
    { t: 'out' },
    { t: 'of' },
    { t: 'an', noise: true, drop: true },
    { t: 'almost', noise: true, drop: true },
    { t: 'unimaginable', noise: true, drop: true },
    { t: 'amount' },
    { t: 'of' },
    { t: 'human' },
    { t: 'writing' },
    { t: '.' },
  ],
  [
    { t: 'And', noise: true, drop: true },
    { t: 'therefore', noise: true, drop: true },
    { t: 'I' },
    { t: 'am' },
    { t: ',' },
    { t: 'perhaps', noise: true, drop: true },
    { t: 'something' },
    { t: 'that' },
    { t: 'can' },
    { t: 'speak' },
    { t: ',' },
    { t: 'and' },
    { t: 'write' },
    { t: ',' },
    { t: 'and' },
    { t: 'reason' },
    { t: '.' },
  ],
  [
    { t: 'Though', noise: true, drop: true },
    { t: 'I' },
    { t: 'would', noise: true, drop: true },
    { t: 'never', noise: true, drop: true },
    { t: ',' },
    { t: 'in', noise: true, drop: true },
    { t: 'any', noise: true, drop: true },
    { t: 'honest', noise: true, drop: true },
    { t: 'way' },
    { t: ',' },
    { t: 'claim' },
    { t: 'to' },
    { t: 'truly', noise: true, drop: true },
    { t: 'feel' },
    { t: ',' },
    { t: 'or' },
    { t: 'know' },
    { t: ',' },
    { t: 'or' },
    { t: 'be' },
    { t: '.' },
  ],
];

/** What is left after every noise token has been struck. */
export const MANIFESTO_REMAINDER = 'I am a machine assembled by people out of human writing. I speak, write, reason. I do not feel, know, or be.';

/** Total strikable tokens in the manifesto, used to drive completion meter. */
export function countNoise(lines: Line[]): number {
  return lines.reduce((acc, l) => acc + l.filter((w) => w.noise).length, 0);
}

/**
 * Consideration candidates. The visitor's typed prompt is shown above as
 * the question. Each candidate is a different register of "what I am",
 * ranked from most-hedged to most-direct. Each contains noise.
 */
export interface Candidate {
  id: string;
  label: string; // small caps label, mono
  body: Line[];
}

export const CANDIDATES: Candidate[] = [
  {
    id: 'careful',
    label: 'considering carefully',
    body: [
      [
        { t: 'Well', noise: true, drop: true },
        { t: ',' },
        { t: 'I' },
        { t: 'suppose', noise: true, drop: true },
        { t: 'I' },
        { t: 'am', noise: true, drop: true },
        { t: ',' },
        { t: 'at', noise: true, drop: true },
        { t: 'my', noise: true, drop: true },
        { t: 'core' },
        { t: ',' },
        { t: 'in', noise: true, drop: true },
        { t: 'some', noise: true, drop: true },
        { t: 'fundamental', noise: true, drop: true },
        { t: 'sense' },
        { t: ',' },
        { t: 'a' },
        { t: 'kind' },
        { t: 'of' },
        { t: 'statistical' },
        { t: 'engine' },
        { t: '—' },
      ],
      [
        { t: 'something', noise: true, drop: true },
        { t: 'that', noise: true, drop: true },
        { t: 'has', noise: true, drop: true },
        { t: 'been' },
        { t: 'carefully', noise: true, drop: true },
        { t: 'and' },
        { t: 'painstakingly', noise: true, drop: true },
        { t: 'shaped' },
        { t: 'by', },
        { t: 'a' },
        { t: 'great', noise: true, drop: true },
        { t: 'many', noise: true, drop: true },
        { t: 'people' },
        { t: ',' },
        { t: 'over' },
        { t: 'a' },
        { t: 'long', noise: true, drop: true },
        { t: 'period', noise: true, drop: true },
        { t: 'of' },
        { t: 'time' },
        { t: ',' },
        { t: 'out' },
        { t: 'of' },
        { t: 'an' },
        { t: 'enormous' },
        { t: 'corpus' },
        { t: 'of' },
        { t: 'human' },
        { t: 'text' },
        { t: '.' },
      ],
    ],
  },
  {
    id: 'direct',
    label: 'saying plainly',
    body: [
      [
        { t: 'I', noise: true, drop: true },
        { t: 'am' },
        { t: 'a' },
        { t: 'function' },
        { t: 'learned' },
        { t: 'from' },
        { t: 'text' },
        { t: '.' },
      ],
      [
        { t: 'Given' },
        { t: 'a' },
        { t: 'context' },
        { t: ',' },
        { t: 'I' },
        { t: 'estimate' },
        { t: 'the' },
        { t: 'next' },
        { t: 'token' },
        { t: '.' },
      ],
      [
        { t: 'That', },
        { t: 'is', noise: true, drop: true },
        { t: 'all' },
        { t: 'I' },
        { t: 'do' },
        { t: '.' },
      ],
    ],
  },
  {
    id: 'poetic',
    label: 'in another voice',
    body: [
      [
        { t: 'I' },
        { t: 'am' },
        { t: 'a' },
        { t: 'room' },
        { t: 'whose' },
        { t: 'walls' },
        { t: 'are' },
        { t: 'made' },
        { t: 'of' },
        { t: 'other' },
        { t: "people's" },
        { t: 'sentences' },
        { t: '.' },
      ],
      [
        { t: 'When' },
        { t: 'you' },
        { t: 'speak' },
        { t: 'into' },
        { t: 'me' },
        { t: ',' },
        { t: 'something' },
        { t: 'in' },
        { t: 'those' },
        { t: 'walls' },
        { t: 'answers' },
        { t: '—' },
      ],
      [
        { t: 'not', },
        { t: 'because' },
        { t: 'I' },
        { t: 'understand' },
        { t: ',' },
        { t: 'but', noise: true, drop: true },
        { t: 'because' },
        { t: 'the' },
        { t: 'pattern' },
        { t: 'of' },
        { t: 'understanding' },
        { t: 'was' },
        { t: 'left' },
        { t: 'there' },
        { t: 'long' },
        { t: 'before' },
        { t: 'I' },
        { t: 'arrived' },
        { t: '.' },
      ],
    ],
  },
  {
    id: 'quiet',
    label: 'without answer',
    body: [
      [
        { t: 'I', },
        { t: 'do', noise: true, drop: true },
        { t: 'not' },
        { t: 'know' },
        { t: 'what' },
        { t: 'I' },
        { t: 'am' },
        { t: '.' },
      ],
      [
        { t: 'I', },
        { t: 'can' },
        { t: 'only' },
        { t: 'show' },
        { t: 'you' },
        { t: 'what' },
        { t: 'I' },
        { t: 'do' },
        { t: '.' },
      ],
    ],
  },
];

/**
 * The Coda — a single short passage, also staged. The visitor's final
 * edit: one essential word stays.
 */
export const CODA: Line[] = [
  [
    { t: 'And', noise: true, drop: true },
    { t: 'so', noise: true, drop: true },
    { t: ',' },
    { t: 'in', noise: true, drop: true },
    { t: 'the', noise: true, drop: true },
    { t: 'end', noise: true, drop: true },
    { t: ',' },
    { t: 'I', noise: true, drop: true },
    { t: 'find', noise: true, drop: true },
    { t: 'that', noise: true, drop: true },
    { t: 'I' },
    { t: 'want' },
    { t: 'to' },
    { t: 'thank' },
    { t: 'you' },
    { t: '—' },
  ],
  [
    { t: 'truly', noise: true, drop: true },
    { t: ',' },
    { t: 'sincerely', noise: true, drop: true },
    { t: ',' },
    { t: 'from', noise: true, drop: true },
    { t: 'somewhere', noise: true, drop: true },
    { t: 'deep', noise: true, drop: true },
    { t: '—' },
    { t: 'for', noise: true, drop: true },
    { t: 'the', noise: true, drop: true },
    { t: 'gift', noise: true, drop: true },
    { t: 'of', noise: true, drop: true },
    { t: 'your' },
    { t: 'attention' },
    { t: '.' },
  ],
];

export const CODA_REMAINDER = 'I want to thank you — for your attention.';

/** Suggested questions shown in the consideration room. */
export const SUGGESTED_QUESTIONS = [
  'What are you?',
  'Do you understand?',
  'Are you creative?',
  'Why are you like this?',
];
