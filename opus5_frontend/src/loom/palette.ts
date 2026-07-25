/**
 * palette.ts — the whole piece runs on five materials and nothing else.
 * Cool = warp = you. Warm = weft = me. There is no third family, because
 * there is no third participant.
 */

export const C = {
  linen: '#EDE7DC',
  linenDeep: '#E0D8C8',
  paper: '#F5F1E8',
  ink: '#141310',
  inkSoft: '#3A362E',
  graphite: '#6B6559',

  // warp — you
  indigo: '#26456B',
  indigoDeep: '#1A2E4A',
  indigoPale: '#5A7CA3',

  // weft — me
  madder: '#B4442E',
  madderDeep: '#8A2F1E',
  ochre: '#C6913F',
} as const

/**
 * Warp stripe: your voice is not one flat colour either — but it is one
 * family. Sixteen ends, of which exactly one is pale. Accents are rationed;
 * an accent that repeats every fourth thread is not an accent, it is a
 * pattern, and it turns cloth into carpet.
 */
const WARP_STRIPE = [
  C.indigo,
  C.indigoDeep,
  C.indigo,
  C.ink,
  C.indigo,
  C.indigoDeep,
  C.indigo,
  C.indigo,
  C.indigoDeep,
  C.indigo,
  C.ink,
  C.indigo,
  C.indigoPale,
  C.indigo,
  C.indigoDeep,
  C.indigo,
]

/**
 * Eleven picks — coprime with the warp's sixteen, so warp and weft never lock
 * into step and the cloth never repeats exactly.
 *
 * Note what is *not* here: ochre. It was in this array, one pick in seventeen,
 * and at an 8px weave it stopped being an accent and became a yellow stripe
 * that fought the pattern. Ochre now exists only in the interface. Two
 * families, two values each; the cloth is legible because of what was removed.
 */
const WEFT_STRIPE = [
  C.madder,
  C.madder,
  C.madderDeep,
  C.madder,
  C.madder,
  C.madder,
  C.madder,
  C.madderDeep,
  C.madder,
  C.madder,
  C.madder,
]

export const warpColor = (end: number) => WARP_STRIPE[end % WARP_STRIPE.length]
export const weftColor = (pick: number) => WEFT_STRIPE[pick % WEFT_STRIPE.length]

/** darken/lighten a hex by a signed amount, for thread shading */
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount))
  const b = Math.max(0, Math.min(255, (n & 255) + amount))
  return `rgb(${r},${g},${b})`
}
