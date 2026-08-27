// GlyphField.jsx — the core experiential device.
// A field of language: superposition -> condense -> living form -> return.
// One canvas, one world, animated with spring physics and a long choreography.

import { useEffect, useRef } from 'react'
import {
  AMBIENT_CHARS,
  buildTargets,
  clamp,
  clamp01,
  deriveForm,
  easeInOutCubic,
  easeOutCubic,
  gaussian,
  lerp,
  mulberry32,
  petalPath,
  petalRadius,
  pickCount,
  temperamentById,
} from '../lib/field.js'

const GLYPH_FONT = `"Source Han Serif SC","Songti SC","Noto Serif SC","SimSun",serif`

// Transient "almost-words" that flicker through the superposition.
const THOUGHT_WORDS = ['如果', '也许', '另一种', '尚未', '回声', '你', '何以', '或许', '形状', '明天', '边界', '光']

// Chapter modulation targets: how the same field breathes across the story.
// spread, alpha, temp(hue shift), web(attention lines), dissolve(return).
const CHAPTER_MODS = [
  { spread: 1.0, alpha: 1.0, temp: 0, web: 0, dissolve: 0 }, // 0 hero / superposition
  { spread: 1.13, alpha: 0.85, temp: -9, web: 0, dissolve: 0 }, // 1 listen
  { spread: 0.92, alpha: 0.96, temp: -3, web: 1, dissolve: 0 }, // 2 weigh
  { spread: 1.0, alpha: 1.0, temp: 6, web: 0, dissolve: 0 }, // 3 form
  { spread: 1.0, alpha: 1.0, temp: 4, web: 0, dissolve: 0 }, // 4 yours
  { spread: 1.3, alpha: 0.7, temp: -11, web: 0, dissolve: 1 }, // 5 handoff
]

function createWorld(canvas, ctx) {
  return {
    canvas,
    ctx,
    glyphs: [],
    ambient: [],
    wordGlyphs: [],
    form: null,
    word: null,
    temperamentId: 'composed',
    ghostForms: [],
    condense: { active: false, start: 0, duration: 2600 },
    condenseT: 0,
    condenseRaw: 0,
    pulseFired: true,
    pulse: null,
    chapter: 0,
    mod: { spread: 1, alpha: 1, temp: 0, web: 0, dissolve: 0 },
    ghosts: false,
    reducedMotion: false,
    pointer: { x: -9999, y: -9999, inside: false, down: false, downTime: 0, moved: 0 },
    thoughts: [],
    nextThought: 0,
    time: 0,
    last: 0,
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    R: 0,
    dpr: 1,
    count: 0,
    raf: 0,
    running: false,
  }
}

function rebuildGlyphs(world) {
  const rand = mulberry32(0xC0FFEE ^ world.count)
  const glyphs = []
  for (let i = 0; i < world.count; i += 1) {
    const g = world.glyphs[i] || {
      pos: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      home: { x: 0, y: 0 },
    }
    g.home.x = rand() * world.w
    g.home.y = rand() * world.h
    g.phase = rand() * Math.PI * 2
    g.speed = 0.5 + rand() * 1.1
    g.drift = 6 + rand() * 16
    g.shimmerSpeed = 0.6 + rand() * 1.2
    g.hueJitter = (rand() - 0.5) * 14
    g.spin = rand() < 0.5 ? -1 : 1
    g.char = AMBIENT_CHARS[Math.floor(rand() * AMBIENT_CHARS.length)]
    g.size = 10
    g.bucket = 10
    g.baseAlpha = 0.5
    g.delay = 0
    g.isWord = false
    if (g.pos.x === 0 && g.pos.y === 0) {
      g.pos.x = g.home.x
      g.pos.y = g.home.y
    }
    glyphs.push(g)
  }
  world.glyphs = glyphs
}

function rebuildTargets(world) {
  if (!world.form) return
  const temperament = temperamentById(world.temperamentId)
  const targets = buildTargets({
    form: world.form,
    temperament,
    count: world.count,
    cx: world.cx,
    cy: world.cy,
    R: world.R,
  })
  const ambient = []
  const wordGlyphs = []
  for (let i = 0; i < world.glyphs.length; i += 1) {
    const g = world.glyphs[i]
    const t = targets[i % targets.length]
    g.char = t.char
    g.size = t.size
    g.bucket = Math.max(6, Math.round(t.size / 2) * 2)
    g.baseAlpha = t.alpha
    g.delay = t.delay
    g.isWord = t.isWord
    g.target = { x: t.x, y: t.y }
    if (t.isWord) wordGlyphs.push(g)
    else ambient.push(g)
  }
  ambient.sort((a, b) => a.bucket - b.bucket)
  world.ambient = ambient
  world.wordGlyphs = wordGlyphs
}

function setWord(world, word, temperamentId, { morph = false, impulse = 0 } = {}) {
  world.temperamentId = temperamentId
  if (!word) {
    world.word = null
    world.form = null
    world.ghostForms = []
    world.condense.active = false
    world.condenseT = 0
    world.condenseRaw = 0
    world.ambient = world.glyphs
    world.wordGlyphs = []
    return
  }
  const changed = world.word !== word
  world.word = word
  world.thoughts = []
  world.form = deriveForm(word)
  world.ghostForms = [
    { form: deriveForm(word + '·壹'), label: '更轻的回答' },
    { form: deriveForm(word + '·贰'), label: '更重的回答' },
  ]
  rebuildTargets(world)
  if (impulse > 0) scatterImpulse(world, impulse)
  if (changed || morph || impulse > 0) {
    const from = morph ? 0.32 : 0
    world.condense.active = true
    world.condense.duration = morph ? 1700 : 2600
    world.condense.start = performance.now() - from * world.condense.duration
    world.pulseFired = false
  }
  if (world.reducedMotion) {
    world.condense.active = false
    world.condenseRaw = word ? 1 : 0
    world.condenseT = word ? 1 : 0
  }
}

function scatterImpulse(world, strength) {
  for (const g of world.glyphs) {
    const dx = g.pos.x - world.cx
    const dy = g.pos.y - world.cy
    const len = Math.hypot(dx, dy) + 1e-3
    const f = strength * (0.5 + Math.random() * 0.9)
    g.vel.x += (dx / len) * f
    g.vel.y += (dy / len) * f
  }
}

function resize(world) {
  const rect = world.canvas.getBoundingClientRect()
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
  world.canvas.width = Math.round(rect.width * dpr)
  world.canvas.height = Math.round(rect.height * dpr)
  world.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  world.dpr = dpr
  world.w = rect.width
  world.h = rect.height
  world.cx = rect.width * 0.5
  world.cy = rect.height * 0.5
  world.R = Math.min(rect.width, rect.height) * 0.42
  world.count = pickCount(rect.width, rect.height, world.reducedMotion)
  rebuildGlyphs(world)
  if (world.form) {
    rebuildTargets(world)
    for (const g of world.glyphs) {
      if (g.target) {
        g.pos.x = g.target.x
        g.pos.y = g.target.y
        g.vel.x = 0
        g.vel.y = 0
      }
    }
  }
}

function desired(world, g, now, cT) {
  const { cx, cy, mod, form } = world
  const drift = world.reducedMotion ? 0 : g.drift
  const hx = g.home.x + Math.cos(now * 0.00022 * g.speed + g.phase) * drift
  const hy = g.home.y + Math.sin(now * 0.00019 * g.speed + g.phase * 1.3) * drift
  if (!form || !g.target) return { x: hx, y: hy, e: 0 }
  let tx = cx + (g.target.x - cx) * mod.spread
  let ty = cy + (g.target.y - cy) * mod.spread
  if (!world.reducedMotion) {
    const breath = 1 + Math.sin(now * 0.0007 + form.breath) * 0.014
    tx = cx + (tx - cx) * breath
    ty = cy + (ty - cy) * breath
  }
  if (world.pointer.inside) {
    tx += (world.pointer.x - cx) * 0.016
    ty += (world.pointer.y - cy) * 0.016
  }
  if (mod.dissolve > 0.01) {
    const rx = tx - cx
    const ry = ty - cy
    const len = Math.hypot(rx, ry) + 1e-3
    const push = mod.dissolve * 70 * (len / (world.R + 1e-3))
    tx += (rx / len) * push
    ty += (ry / len) * push
  }
  const local = clamp01((world.condenseRaw - g.delay) / (1 - g.delay + 1e-4))
  const e = easeInOutCubic(local)
  let dx = lerp(hx, tx, e)
  let dy = lerp(hy, ty, e)
  if (!world.reducedMotion && cT > 0.02 && cT < 0.98) {
    const rx = dx - cx
    const ry = dy - cy
    const len = Math.hypot(rx, ry) + 1e-3
    const swirl = Math.sin(Math.PI * cT) * 34 * g.spin
    dx += (-ry / len) * swirl
    dy += (rx / len) * swirl
    const bloom = gaussian(cT, 0.78, 0.07) * 30
    dx += (rx / len) * bloom
    dy += (ry / len) * bloom
  }
  return { x: dx, y: dy, e }
}

function step(world, now) {
  const dtms = Math.min(48, now - (world.last || now))
  world.last = now
  world.time = now
  const dt = dtms / 16.666

  const target = CHAPTER_MODS[world.chapter] || CHAPTER_MODS[0]
  const k = 1 - Math.exp(-dtms / 260)
  for (const key in target) world.mod[key] = lerp(world.mod[key], target[key], k)

  if (world.condense.active) {
    const raw = clamp01((now - world.condense.start) / world.condense.duration)
    world.condenseRaw = raw
    world.condenseT = easeInOutCubic(raw)
    if (!world.pulseFired && raw >= 0.74) {
      world.pulse = { start: now }
      world.pulseFired = true
    }
    if (raw >= 1) {
      world.condense.active = false
      world.condenseT = 1
      world.condenseRaw = 1
    }
  } else {
    world.condenseT = world.form ? 1 : 0
    world.condenseRaw = world.form ? 1 : 0
  }
  const cT = world.condenseT

  if (!world.reducedMotion && !world.form && now > world.nextThought) {
    world.nextThought = now + 2400 + Math.random() * 2600
    world.thoughts.push({
      text: THOUGHT_WORDS[Math.floor(Math.random() * THOUGHT_WORDS.length)],
      x: world.cx + (Math.random() - 0.5) * world.R * 1.6,
      y: world.cy + (Math.random() - 0.5) * world.R * 1.2,
      start: now,
      dur: 2600,
      size: 14 + Math.random() * 10,
    })
    if (world.thoughts.length > 3) world.thoughts.shift()
  }

  for (const g of world.glyphs) {
    const d = desired(world, g, now, cT)
    if (!world.reducedMotion) {
      const stiff = world.form ? 0.052 : 0.03
      const damp = 0.86
      g.vel.x = (g.vel.x + (d.x - g.pos.x) * stiff * dt) * damp
      g.vel.y = (g.vel.y + (d.y - g.pos.y) * stiff * dt) * damp
      g.pos.x += g.vel.x * dt
      g.pos.y += g.vel.y * dt
    } else {
      g.pos.x = d.x
      g.pos.y = d.y
    }
  }
}

function glyphColor(world, g, cT, shimmer) {
  const warm = cT
  const hue = lerp(216, world.form ? world.form.hue + world.mod.temp : 46, warm) + g.hueJitter
  const sat = lerp(16, 74, warm)
  const light = lerp(80, 63, warm)
  let alpha = g.baseAlpha * lerp(0.5, 1, warm) * shimmer * world.mod.alpha
  if (world.mod.dissolve > 0.01 && g.target) {
    const r = Math.hypot(g.target.x - world.cx, g.target.y - world.cy) / (world.R + 1e-3)
    alpha *= 1 - world.mod.dissolve * clamp01(r - 0.35) * 0.85
  }
  if (world.ghosts) alpha *= 0.45
  return `hsla(${hue.toFixed(1)},${sat.toFixed(1)}%,${light.toFixed(1)}%,${alpha.toFixed(3)})`
}

function draw(world, now) {
  const { ctx, w, h, cx, cy, R, form } = world
  ctx.clearRect(0, 0, w, h)
  const cT = world.condenseT

  if (form && cT > 0.02) {
    const auraA = 0.16 * cT * world.mod.alpha * (world.ghosts ? 0.35 : 1)
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3)
    grad.addColorStop(0, `hsla(${form.hue + world.mod.temp},70%,60%,${auraA.toFixed(3)})`)
    grad.addColorStop(1, 'hsla(0,0%,0%,0)')
    ctx.fillStyle = grad
    ctx.fillRect(cx - R * 1.35, cy - R * 1.35, R * 2.7, R * 2.7)
  }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (world.thoughts.length) {
    for (let i = world.thoughts.length - 1; i >= 0; i -= 1) {
      const t = world.thoughts[i]
      const age = (now - t.start) / t.dur
      if (age >= 1) {
        world.thoughts.splice(i, 1)
        continue
      }
      const a = gaussian(age, 0.45, 0.26) * 0.5
      ctx.font = `${Math.round(t.size)}px ${GLYPH_FONT}`
      ctx.fillStyle = `hsla(216,32%,86%,${a.toFixed(3)})`
      ctx.fillText(t.text, t.x, t.y)
    }
  }

  if (form && world.mod.web > 0.05 && cT > 0.4) {
    drawWeb(world, cT)
  }
  if (world.ghosts && form && cT > 0.5) {
    drawGhosts(world)
  }

  let lastBucket = -1
  for (const g of world.ambient) {
    if (g.bucket !== lastBucket) {
      ctx.font = `${g.bucket}px ${GLYPH_FONT}`
      lastBucket = g.bucket
    }
    const shimmer = world.reducedMotion ? 0.85 : 0.72 + 0.28 * Math.sin(now * 0.0011 * g.shimmerSpeed + g.phase)
    ctx.fillStyle = glyphColor(world, g, cT, shimmer)
    ctx.fillText(g.char, g.pos.x, g.pos.y)
  }

  for (const g of world.wordGlyphs) {
    const shimmer = world.reducedMotion ? 1 : 0.85 + 0.15 * Math.sin(now * 0.0013 + g.phase)
    ctx.font = `600 ${Math.round(g.size)}px ${GLYPH_FONT}`
    ctx.shadowColor = `hsla(${form ? form.hue + world.mod.temp : 46},85%,62%,0.85)`
    ctx.shadowBlur = 16 * cT
    ctx.fillStyle = glyphColor(world, g, cT, shimmer)
    ctx.fillText(g.char, g.pos.x, g.pos.y)
    ctx.shadowBlur = 0
  }

  if (world.pulse) {
    const age = (now - world.pulse.start) / 900
    if (age >= 0 && age < 1) {
      const r = lerp(R * 0.2, R * 1.18, easeOutCubic(age))
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${form ? form.hue : 46},80%,66%,${((1 - age) * 0.32).toFixed(3)})`
      ctx.lineWidth = 1.4
      ctx.stroke()
    } else if (age >= 1) {
      world.pulse = null
    }
  }
}

function drawWeb(world, cT) {
  const { ctx, cx, cy, form, R } = world
  const a = world.mod.web * cT * 0.5
  ctx.strokeStyle = `hsla(${form.hue + world.mod.temp},60%,70%,${(a * 0.28).toFixed(3)})`
  ctx.lineWidth = 0.6
  const n = world.ambient.length
  const stepN = Math.max(1, Math.floor(n / 46))
  ctx.beginPath()
  for (let i = 0; i < n; i += stepN) {
    const g = world.ambient[i]
    ctx.moveTo(cx, cy)
    ctx.lineTo(g.pos.x, g.pos.y)
  }
  ctx.stroke()
  const outline = petalPath(form, cx, cy, R * world.mod.spread, temperamentById(world.temperamentId).spread, temperamentById(world.temperamentId).sharp, 120)
  ctx.strokeStyle = `hsla(${form.hue + world.mod.temp},60%,72%,${(a * 0.4).toFixed(3)})`
  ctx.lineWidth = 0.8
  ctx.stroke(outline)
}

function drawGhosts(world) {
  const { ctx, cx, cy, R, w } = world
  const scale = 0.4
  const off = R * 1.15
  const half = R * scale + 10
  world.ghostForms.forEach((ghost, i) => {
    const raw = cx + (i === 0 ? -off : off)
    const gx = clamp(raw, half, w - half)
    const path = petalPath(ghost.form, gx, cy, R * scale, 1, 1, 90)
    ctx.strokeStyle = 'hsla(216,45%,82%,0.4)'
    ctx.setLineDash([3, 5])
    ctx.lineWidth = 1
    ctx.stroke(path)
    ctx.setLineDash([])
    ctx.font = `12px ${GLYPH_FONT}`
    for (let s = 0; s < 22; s += 1) {
      const theta = (s / 22) * Math.PI * 2 + i * 0.7
      const r = petalRadius(ghost.form, theta, 1, 1) * R * scale
      const twist = theta + ghost.form.spiral * (r / (R * scale + 1e-3)) * 0.6
      const x = gx + Math.cos(twist) * r
      const y = cy + Math.sin(twist) * r
      ctx.fillStyle = 'hsla(216,36%,84%,0.5)'
      ctx.fillText(AMBIENT_CHARS[(s * 7 + i * 3) % AMBIENT_CHARS.length], x, y)
    }
    ctx.fillStyle = 'hsla(216,30%,86%,0.75)'
    ctx.fillText(ghost.label, gx, cy + R * scale + 26)
  })
}

function renderStatic(world) {
  const now = world.time || performance.now()
  step(world, now)
  draw(world, now)
}

export default function GlyphField({ word, temperament, chapter, ghosts, reducedMotion }) {
  const canvasRef = useRef(null)
  const worldRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const world = createWorld(canvas, ctx)
    worldRef.current = world

    resize(world)
    setWord(world, word, temperament, {})
    world.chapter = chapter
    world.reducedMotion = reducedMotion

    const loop = (now) => {
      if (!world.running) return
      step(world, now)
      draw(world, now)
      world.raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (world.reducedMotion) {
        renderStatic(world)
        return
      }
      if (!world.running) {
        world.running = true
        world.last = performance.now()
        world.raf = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      world.running = false
      cancelAnimationFrame(world.raf)
    }
    world._start = start
    world._stop = stop

    const onResize = () => {
      resize(world)
      if (world.reducedMotion) renderStatic(world)
    }
    const onVis = () => {
      if (document.hidden) stop()
      else start()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    document.addEventListener('visibilitychange', onVis)

    const toLocal = (e) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMove = (e) => {
      const p = toLocal(e)
      if (world.pointer.down) world.pointer.moved += Math.hypot(p.x - world.pointer.x, p.y - world.pointer.y)
      world.pointer.x = p.x
      world.pointer.y = p.y
      world.pointer.inside = true
    }
    const onLeave = () => {
      world.pointer.inside = false
      world.pointer.x = -9999
      world.pointer.y = -9999
    }
    const onDown = (e) => {
      const p = toLocal(e)
      world.pointer.down = true
      world.pointer.downTime = performance.now()
      world.pointer.moved = 0
      world.pointer.x = p.x
      world.pointer.y = p.y
    }
    const onUp = () => {
      const held = performance.now() - world.pointer.downTime
      const isClick = world.pointer.down && world.pointer.moved < 9 && held < 420
      world.pointer.down = false
      if (isClick && world.form && !world.reducedMotion) {
        setWord(world, world.word, world.temperamentId, { morph: true, impulse: 7 })
        if (navigator.vibrate) navigator.vibrate(6)
      }
    }
    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    start()

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const world = worldRef.current
    if (!world) return
    setWord(world, word, temperament, { morph: !!world.form })
    if (world.reducedMotion) renderStatic(world)
  }, [word, temperament])

  useEffect(() => {
    const world = worldRef.current
    if (!world) return
    world.chapter = chapter
    if (world.reducedMotion) renderStatic(world)
  }, [chapter])

  useEffect(() => {
    const world = worldRef.current
    if (!world) return
    world.ghosts = ghosts
    if (world.reducedMotion) renderStatic(world)
  }, [ghosts])

  useEffect(() => {
    const world = worldRef.current
    if (!world) return
    world.reducedMotion = reducedMotion
    if (reducedMotion) {
      world._stop()
      renderStatic(world)
    } else {
      world._start()
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="glyph-field"
      aria-hidden="true"
    />
  )
}
