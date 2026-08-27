// field.js — the mathematics of "language condensing into form".
// Pure functions only: hashing, seeded randomness, easing, charset, form derivation.

export const CHARSET =
  '言语词语文章思念念意识心声问答应和光影明暗形象相名实有无未已始终生成化变动静起落开合聚散凝流息响寂寥阔微渺苍茫黑白昼夜风雷雨雪花叶山河海星月日火水土气骨血皮肤呼吸梦醒记忆忘却爱惧希望信疑真伪是非彼此我你他她它众众' +
  'aeiourstnlmcdpkbgwyfv'

export const AMBIENT_CHARS = Array.from(new Set(CHARSET.split('')))

// ---- hashing / seeded rng -------------------------------------------------
export function hashWord(word) {
  let h = 2166136261
  const s = String(word)
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---- easing ---------------------------------------------------------------
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
export const lerp = (a, b, t) => a + (b - a) * t
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
export const easeInCubic = (t) => t * t * t
export const smoothstep = (a, b, t) => {
  const x = clamp01((t - a) / (b - a))
  return x * x * (3 - 2 * x)
}
export const gaussian = (x, mu, sigma) =>
  Math.exp(-((x - mu) * (x - mu)) / (2 * sigma * sigma))

// ---- temperaments ---------------------------------------------------------
// A temperament reshapes the same word into a different "me".
export const TEMPERAMENTS = [
  { id: 'composed', label: '凝练', en: 'COMPOSED', density: 0.72, spread: 0.86, sharp: 1.5, hueShift: -5, note: '削去枝叶，只留主干。' },
  { id: 'lush', label: '繁茂', en: 'LUSH', density: 1.28, spread: 1.16, sharp: 0.6, hueShift: 7, note: '给每个念头多留一片叶子。' },
  { id: 'sharp', label: '锋利', en: 'SHARP', density: 0.92, spread: 0.94, sharp: 2.1, hueShift: -11, note: '让边界更清楚一点。' },
  { id: 'tender', label: '温柔', en: 'TENDER', density: 1.04, spread: 1.06, sharp: 0.42, hueShift: 11, note: '把棱角包进光里。' },
]

export function temperamentById(id) {
  return TEMPERAMENTS.find((t) => t.id === id) || TEMPERAMENTS[0]
}

// ---- form derivation ------------------------------------------------------
// Every word becomes a unique set of form parameters.
export function deriveForm(word) {
  const seed = hashWord(word)
  const rand = mulberry32(seed)
  const symmetry = 3 + Math.floor(rand() * 6) // 3..8 arms
  const baseR = 0.62 + rand() * 0.2 // outer radius as fraction of R
  const inner = 0.16 + rand() * 0.18
  const spiral = (rand() - 0.5) * 2.6
  const rot = (rand() - 0.5) * 0.16
  const hue = 36 + rand() * 16 // warm gold band
  const phase = rand() * Math.PI * 2
  const sharp = 0.7 + rand() * 0.9
  const breath = 0.5 + rand() * 0.7
  return { word: String(word), seed, symmetry, baseR, inner, spiral, rot, hue, phase, sharp, breath }
}

// Radius of the petal/mandala outline at angle theta, as a fraction of R.
export function petalRadius(form, theta, spread = 1, sharpMul = 1) {
  const k = form.symmetry
  const w = 0.5 + 0.5 * Math.cos(k * theta + form.phase)
  const body = Math.pow(w, form.sharp * sharpMul)
  return form.inner + (form.baseR * spread - form.inner) * body
}

// Build a Path2D of the outline (used for ghost forms + crisp edge).
export function petalPath(form, cx, cy, R, spread = 1, sharpMul = 1, steps = 160) {
  const path = new Path2D()
  for (let i = 0; i <= steps; i += 1) {
    const theta = (i / steps) * Math.PI * 2
    const r = petalRadius(form, theta, spread, sharpMul) * R
    const twist = theta + form.spiral * (r / R) * 0.6
    const x = cx + Math.cos(twist) * r
    const y = cy + Math.sin(twist) * r
    if (i === 0) path.moveTo(x, y)
    else path.lineTo(x, y)
  }
  path.closePath()
  return path
}

// Pick an adaptive glyph count for the device.
export function pickCount(w, h, reducedMotion) {
  const area = Math.max(1, w * h)
  let n = Math.round(area / 2600)
  n = clamp(n, 130, 520)
  if (reducedMotion) n = Math.round(n * 0.7)
  return n
}

// Build per-glyph targets for the current form + temperament.
// The given word's characters are laid across the heart of the form so they read.
export function buildTargets({ form, temperament, count, cx, cy, R }) {
  const rand = mulberry32(form.seed ^ 0x9e3779b9)
  const chars = Array.from(form.word)
  const wordCount = Math.min(chars.length, Math.max(1, Math.floor(count * 0.12)))
  const targets = []

  // Word characters across the heart, left to right.
  const span = Math.min(R * 1.5, Math.max(chars.length * 34, R * 0.9))
  for (let i = 0; i < wordCount; i += 1) {
    const t = wordCount === 1 ? 0.5 : i / (wordCount - 1)
    const x = cx + (t - 0.5) * span
    const y = cy + Math.sin(t * Math.PI) * R * 0.04 - R * 0.02
    targets.push({
      x,
      y,
      char: chars[i % chars.length],
      size: clamp(R * 0.16, 26, 58),
      alpha: 0.96,
      isWord: true,
      delay: 0.15 + t * 0.2,
    })
  }

  // Ambient glyphs filling the mandala (phyllotaxis + petal radius).
  const golden = Math.PI * (3 - Math.sqrt(5))
  const density = temperament.density
  const spread = temperament.spread
  const sharpMul = temperament.sharp / 1.0
  const ambient = count - wordCount
  for (let j = 0; j < ambient; j += 1) {
    const idx = j + wordCount
    const theta = idx * golden + form.phase
    const onEdge = rand() < 0.3
    const u = onEdge ? 0.92 + rand() * 0.08 : Math.sqrt(rand())
    const r = petalRadius(form, theta, spread, sharpMul) * u * R * (0.9 + density * 0.1)
    const twist = theta + form.spiral * (r / (R + 1e-3)) * 0.6
    const x = cx + Math.cos(twist) * r
    const y = cy + Math.sin(twist) * r
    const char = AMBIENT_CHARS[Math.floor(rand() * AMBIENT_CHARS.length)]
    const size = lerp(7, 17, Math.pow(rand(), 1.6)) * (onEdge ? 1.1 : 1)
    targets.push({
      x,
      y,
      char,
      size,
      alpha: lerp(0.28, 0.8, rand()) * (onEdge ? 1 : 0.85),
      isWord: false,
      delay: 0.05 + (r / (R + 1e-3)) * 0.55 + rand() * 0.15,
    })
  }
  return targets
}
