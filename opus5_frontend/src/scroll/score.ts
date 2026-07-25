/**
 * score.ts — the choreography, written as a score rather than a timeline.
 *
 * Each act owns a stretch of scroll and returns machine *intentions*, not
 * pixel values. `pickTarget` is a goal the loom chases at its own tempo, so
 * the same scroll gesture produces a different-looking machine depending on
 * how fast you made it. Nothing here is a keyframe on an element.
 */

import type { LoomParams } from '../loom/LoomEngine'

export type ActId = 'warp' | 'thread' | 'pick' | 'unweave' | 'reverse' | 'cutoff'

export const ACTS: { id: ActId; num: string; name: string; latin: string; span: number }[] = [
  { id: 'warp', num: 'I', name: '绷经', latin: 'WARPING', span: 1.35 },
  { id: 'thread', num: 'II', name: '穿综', latin: 'THREADING', span: 1.5 },
  { id: 'pick', num: 'III', name: '投梭', latin: 'PICKING', span: 2.5 },
  { id: 'unweave', num: 'IV', name: '拆纬', latin: 'UNWEAVING', span: 2.0 },
  { id: 'reverse', num: 'V', name: '反面', latin: 'THE REVERSE', span: 1.8 },
  { id: 'cutoff', num: 'VI', name: '落布', latin: 'CUTTING OFF', span: 2.2 },
]

/**
 * The flaw starts here, as a fraction of loom capacity. Act III weaves to
 * 0.56, so the bad stretch is ~16% of the loom — big enough to be unmissable
 * once the inspection veil goes on, small enough that pulling it out is a
 * believable amount of work rather than a stunt.
 */
export const FLAW_AT = 0.4

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
/** normalised sub-range of a local progress */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export type ScorePatch = Partial<Omit<LoomParams, 'flip'>>

export function actScore(act: ActId, t: number, rows: number): ScorePatch {
  const cap = (f: number) => Math.round(rows * f)

  switch (act) {
    case 'warp':
      // Nothing is produced here. The first screen is for touching the warp,
      // not for scrolling. The only thing scroll does is hint at the diagram.
      return { pickTarget: 0, notation: seg(t, 0.72, 1) * 0.22, dim: 0, cut: 0 }

    case 'thread':
      return {
        notation: lerp(0.22, 1, easeInOut(seg(t, 0, 0.42))),
        pickTarget: Math.round(lerp(0, 4, seg(t, 0.62, 1))),
        dim: 0,
        cut: 0,
      }

    case 'pick':
      return {
        pickTarget: Math.round(lerp(4, cap(0.56), easeInOut(t))),
        notation: lerp(1, 0.14, seg(t, 0.4, 0.82)),
        dim: 0,
        cut: 0,
      }

    case 'unweave':
      // beginning: the machine holds, colour drains, the error is named.
      // development: rows come out, slower than they went in.
      // turn: it drops below the flaw — that is the moment it learns.
      // resolution: it starts again, correctly.
      return {
        dim: easeInOut(seg(t, 0.06, 0.26)) * (1 - easeInOut(seg(t, 0.78, 0.94))),
        pickTarget: Math.round(
          t < 0.3
            ? cap(0.56)
            : t < 0.8
              ? lerp(cap(0.56), cap(0.4), seg(t, 0.3, 0.8))
              : lerp(cap(0.4), cap(0.47), seg(t, 0.8, 1)),
        ),
        notation: lerp(0.14, 0, seg(t, 0, 0.2)),
        cut: 0,
      }

    case 'reverse':
      return {
        pickTarget: Math.round(lerp(cap(0.47), cap(0.9), easeInOut(t))),
        dim: 0,
        notation: 0,
        cut: 0,
      }

    case 'cutoff':
      // The cut resolves early and then the act *holds*: the last third of
      // the scroll is an empty, freshly-tensioned loom with nothing on it.
      // A resolution needs silence after it, not a cut to the credits.
      return {
        pickTarget: cap(0.9),
        dim: 0,
        notation: 0,
        cut: easeInOut(seg(t, 0.12, 0.5)),
      }
  }
}
