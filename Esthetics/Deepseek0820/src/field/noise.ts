/**
 * A tiny, allocation-free value-noise field.
 *
 * Why hand-rolled instead of a library: the whole device needs exactly one
 * scalar field with a controllable time axis, and it is evaluated ~3k times per
 * frame. A permutation table + smoothstep interpolation is faster than any
 * generic noise package and keeps the bundle honest (zero dependencies).
 */

const P = new Uint8Array(512);
{
  // deterministic shuffle — the field must look identical on every visit,
  // so the *visitor's* choices are the only source of variation.
  let s = 1337;
  const perm = new Uint8Array(256);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
}

const fade = (t: number) => t * t * (3 - 2 * t);

/** 3D value noise in [0,1). Third axis is used as time. */
export function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = fade(xf), v = fade(yf), w = fade(zf);

  const X = xi & 255, Y = yi & 255, Z = zi & 255;
  const a = P[X] + Y, b = P[X + 1] + Y;
  const aa = P[a] + Z, ab = P[a + 1] + Z;
  const ba = P[b] + Z, bb = P[b + 1] + Z;

  const n000 = P[aa] / 255, n001 = P[aa + 1] / 255;
  const n010 = P[ab] / 255, n011 = P[ab + 1] / 255;
  const n100 = P[ba] / 255, n101 = P[ba + 1] / 255;
  const n110 = P[bb] / 255, n111 = P[bb + 1] / 255;

  const x00 = n000 + u * (n100 - n000);
  const x10 = n010 + u * (n110 - n010);
  const x01 = n001 + u * (n101 - n001);
  const x11 = n011 + u * (n111 - n011);
  const y0 = x00 + v * (x10 - x00);
  const y1 = x01 + v * (x11 - x01);
  return y0 + w * (y1 - y0);
}

/** Deterministic 32-bit hash → [0,1). Used for seeds and the visitor's sigil. */
export function hash32(n: number): number {
  let h = n | 0;
  h = (h ^ 61) ^ (h >>> 16);
  h = h + (h << 3);
  h = h ^ (h >>> 4);
  h = Math.imul(h, 0x27d4eb2d);
  h = h ^ (h >>> 15);
  return (h >>> 0) / 4294967296;
}

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};
