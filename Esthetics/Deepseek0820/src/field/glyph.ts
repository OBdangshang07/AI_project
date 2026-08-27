import { hash32 } from './noise';

/* ---------------------------------------------------------------------------
   THE SEAL — 印
   The visitor's three answers are woven into a small chop mark. Two people who
   answer differently leave with different marks; the same answers always give
   the same mark, because a signature that changes at random is not a signature.
--------------------------------------------------------------------------- */

export type Choices = (0 | 1 | null)[];

const RED = '#b23a2b';
const GHOST = 'rgba(22,19,15,0.22)';

export function codeFor(choices: Choices): string {
  const answered = choices.filter((c) => c !== null).length;
  const bits = choices.reduce<number>((acc, c, i) => acc + ((c ?? 0) << i), 0);
  const h = Math.floor(hash32(bits * 2654435761 + answered * 97 + 13) * 1679615);
  return h.toString(36).toUpperCase().padStart(4, '0').slice(0, 4);
}

/** One woven strand per answer; unanswered strands stay open. */
export function drawGlyph(
  ctx: CanvasRenderingContext2D,
  size: number,
  choices: Choices,
  phase: number,
) {
  ctx.clearRect(0, 0, size, size);
  const pad = size * 0.1;
  const inner = size - pad * 2;
  ctx.lineCap = 'round';

  // hand-cut border: four strokes that overshoot, never a closed rectangle
  ctx.strokeStyle = RED;
  ctx.lineWidth = Math.max(1.2, size * 0.011);
  const o = size * 0.035;
  const seg: [number, number, number, number][] = [
    [pad - o * 0.6, pad, pad + inner + o, pad],
    [pad + inner, pad - o * 0.5, pad + inner, pad + inner + o * 0.8],
    [pad + inner + o * 0.6, pad + inner, pad - o * 0.8, pad + inner],
    [pad, pad + inner + o * 0.5, pad, pad - o * 0.7],
  ];
  ctx.beginPath();
  for (const [x1, y1, x2, y2] of seg) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); }
  ctx.stroke();

  // three rows, one per question
  const rows = 3;
  const gap = inner / (rows + 1);
  for (let r = 0; r < rows; r++) {
    const y = pad + gap * (r + 1);
    const c = choices[r];
    if (c === null || c === undefined) {
      ctx.strokeStyle = GHOST;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(pad + inner * 0.08, y);
      ctx.lineTo(pad + inner * 0.92, y);
      ctx.stroke();
      ctx.setLineDash([]);
      continue;
    }
    // side 0 → tight, disciplined weave. side 1 → loose, wider swing.
    const amp = (c === 0 ? 0.055 : 0.115) * inner;
    const freq = c === 0 ? 5.2 : 3.1;
    ctx.strokeStyle = RED;
    ctx.lineWidth = Math.max(1, size * 0.0085);
    for (let s = 0; s < 2; s++) {
      ctx.beginPath();
      const ph = phase * (c === 0 ? 0.6 : 0.95) + r * 1.7 + s * Math.PI;
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const x = pad + inner * (0.08 + t * 0.84);
        const yy = y + Math.sin(t * freq * Math.PI + ph) * amp * Math.sin(t * Math.PI);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  }

  // warp threads tie the strands together; their count is part of the identity
  const bits = choices.reduce<number>((acc, c, i) => acc + ((c ?? 0) << i), 0);
  const warps = 2 + Math.floor(hash32(bits * 31 + 5) * 3);
  ctx.strokeStyle = 'rgba(22,19,15,0.4)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let i = 0; i < warps; i++) {
    const x = pad + inner * (0.22 + (0.56 * (i + 0.5)) / warps + hash32(i * 13 + bits) * 0.05);
    ctx.moveTo(x, pad + gap * 0.45);
    ctx.lineTo(x, pad + inner - gap * 0.45);
  }
  ctx.stroke();

  // the chop: only once all three answers exist
  if (choices.every((c) => c !== null)) {
    const corner = Math.floor(hash32(bits * 7 + 3) * 4);
    const s = size * 0.055;
    const cx = corner % 2 === 0 ? pad + inner * 0.1 : pad + inner * 0.9 - s;
    const cy = corner < 2 ? pad + inner * 0.1 : pad + inner * 0.9 - s;
    ctx.fillStyle = RED;
    ctx.fillRect(cx, cy, s, s);
  }
}
