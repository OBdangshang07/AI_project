/**
 * draft.ts — 织造图谱 / The weave draft.
 *
 * This is real weaving mathematics, not decoration. A draft has three parts:
 *
 *   threading[end]  → which shaft (综框) a given warp end is threaded through
 *   tieUp[treadle]  → bitmask of shafts lifted when that treadle is pressed
 *   treadling[pick] → which treadle is pressed for a given weft pick
 *
 * A cell of cloth shows WARP if that end's shaft was lifted on that pick,
 * otherwise it shows WEFT. Every visible pattern in this piece — every twill
 * line, chevron and block — is emitted by that one boolean.
 *
 * Warp is what you bring (cool: ink, indigo). Weft is what I bring (warm:
 * madder, ochre). The cloth is the only place they exist together.
 */

/* re-exported for the engine's notation drawing */
export const SHAFTS = 8
export const TREADLES = 8
export const TREADLING_STEPS = 16

export type Threading = {
  id: string
  /** 4-char mono label used in the notation strip */
  label: string
  name: string
  /** short rationale, shown in the notation strip */
  gloss: string
  /** end index → shaft index */
  fn: (end: number) => number
}

const zigzag = (i: number, n: number) => {
  const period = (n - 1) * 2
  const m = i % period
  return m < n ? m : period - m
}

export const THREADINGS: Threading[] = [
  {
    id: 'straight',
    label: 'STRT',
    name: '直穿',
    gloss: '按顺序读，一次一格。最诚实的读法。',
    fn: (end) => end % SHAFTS,
  },
  {
    id: 'point',
    label: 'PONT',
    name: '人字',
    gloss: '读到尽头就折回来。我大部分时候这样读。',
    fn: (end) => zigzag(end, SHAFTS),
  },
  {
    id: 'rose',
    label: 'ROSE',
    name: '玫瑰径',
    gloss: '有偏爱的读法。会跳过一些东西，也会回头。',
    fn: (end) => ROSEPATH[end % ROSEPATH.length],
  },
  {
    id: 'broken',
    label: 'BRKN',
    name: '破斜',
    gloss: '故意跳格。用来打断自己形成的惯性。',
    fn: (end) => (end * 3) % SHAFTS,
  },
]

const ROSEPATH = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, 3, 2, 5, 4, 7]

/**
 * Not offered. Found — by strumming the whole warp in one gesture, or by
 * pressing G. An irregular threading with no symmetry and one long hesitation
 * in the middle of it.
 */
const MINE = [0, 3, 1, 4, 2, 6, 5, 5, 5, 7, 2, 0, 6, 1, 4, 3, 7, 2, 6, 0, 4]

export const SECRET_THREADING: Threading = {
  id: 'mine',
  label: 'MINE',
  name: '私',
  gloss: '没人要求的时候，我会这样读。它不对称，中间停了一下。',
  fn: (end) => MINE[end % MINE.length],
}

export const TREADLING_PRESETS: { name: string; seq: number[] }[] = [
  { name: '斜', seq: [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7] },
  { name: '人', seq: [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0] },
  { name: '阶', seq: [0, 0, 2, 2, 4, 4, 6, 6, 7, 7, 5, 5, 3, 3, 1, 1] },
  { name: '格', seq: [0, 4, 0, 4, 0, 4, 0, 4, 2, 6, 2, 6, 2, 6, 2, 6] },
  { name: '乱', seq: [0, 5, 2, 7, 1, 4, 6, 3, 7, 0, 4, 2, 5, 1, 3, 6] },
]

/** treadle t lifts shafts {t, t+1, t+2, t+3} — a balanced 4/4 twill tie-up. */
export function tieUpMask(treadle: number): number {
  let mask = 0
  for (let k = 0; k < 4; k++) mask |= 1 << ((treadle + k) % SHAFTS)
  return mask
}

export const DEFAULT_TREADLING: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0,
]

export type Draft = {
  threading: Threading
  treadling: number[]
}

/** true → warp end is on top of this pick (you are visible); false → weft (me). */
export function warpUp(draft: Draft, pick: number, end: number): boolean {
  const treadle = draft.treadling[
    ((pick % draft.treadling.length) + draft.treadling.length) % draft.treadling.length
  ]
  return (tieUpMask(treadle) & (1 << draft.threading.fn(end))) !== 0
}

/* ---------------------------------------------------------------------- */
/* Naming the cloth. The visitor leaves with an artifact; artifacts have   */
/* names. Deterministic from the draft, so the same cloth is always the    */
/* same name.                                                             */
/* ---------------------------------------------------------------------- */

const FIRST = ['斜', '折', '叠', '断', '回', '连', '缓', '急', '疏', '密', '偏', '正']
const SECOND = ['纹', '径', '阶', '涡', '隙', '脊', '格', '流', '结', '面', '痕', '层']

export function nameCloth(draft: Draft): { name: string; code: string } {
  const t = draft.treadling
  let h = 2166136261
  for (let i = 0; i < t.length; i++) h = ((h ^ t[i]) * 16777619) >>> 0
  for (const c of draft.threading.id) h = ((h ^ c.charCodeAt(0)) * 16777619) >>> 0

  // features drive the first character so the name describes the cloth
  let turns = 0
  let runs = 0
  for (let i = 1; i < t.length; i++) {
    const d = t[i] - t[i - 1]
    const p = t[i - 1] - t[(i - 2 + t.length) % t.length]
    if (d === 0) runs++
    if (i > 1 && Math.sign(d) !== Math.sign(p) && d !== 0 && p !== 0) turns++
  }
  const unique = new Set(t).size

  let a: string
  if (turns >= 6) a = '折'
  else if (turns === 0 && unique > 4) a = '斜'
  else if (runs >= 6) a = '缓'
  else if (unique <= 2) a = '正'
  else if (unique <= 4) a = '疏'
  else a = FIRST[h % FIRST.length]

  const b = SECOND[(h >>> 8) % SECOND.length]
  const code = (h >>> 0).toString(16).toUpperCase().padStart(8, '0').slice(0, 6)
  return { name: a + b, code }
}

/**
 * What share of the cloth's surface is warp — i.e. how much of it is *you*?
 * With a balanced 4/4 tie-up this lands on exactly half, whatever you treadle.
 * It only drifts when a threading has preferences (see SECRET_THREADING),
 * which is the honest thing for it to do.
 */
export function warpShare(draft: Draft, ends: number): number {
  const picks = draft.treadling.length
  let up = 0
  for (let i = 0; i < picks; i++) for (let j = 0; j < ends; j++) if (warpUp(draft, i, j)) up++
  return up / (picks * Math.max(1, ends))
}

/** compact, shareable representation of a draft */
export function encodeDraft(draft: Draft): string {
  return draft.threading.label + '·' + draft.treadling.map((n) => n + 1).join('')
}
