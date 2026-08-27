const TAU = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const rand = (lo, hi) => lo + Math.random() * (hi - lo)
const randInt = (lo, hi) => Math.floor(rand(lo, hi + 1))

export class TidalEngine {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.particles = []
    this.ripples = []
    this.running = false
    this.frameId = null
    this.lastTime = 0
    this.time = 0
    this.reducedMotion = false
    this.mouse = { x: -9999, y: -9999, active: false }
    this.mouseSmooth = { x: -9999, y: -9999 }
    this.mouseVel = { x: 0, y: 0 }
    this.mousePrev = { x: -9999, y: -9999 }
    this.hoverTime = 0
    this.activeSentence = null
    this.sentenceAlpha = 0
    this.sentenceParticles = []
    this.sentences = opts.sentences || []
    this._onSentenceChange = opts.onSentenceChange || null
    this._clickCount = 0
    this._secretTriggered = false
    this._sortedCache = []

    this.config = {
      gravityRadius: opts.gravityRadius || 240,
      gravityStrength: opts.gravityStrength || 0.5,
      tidalAmplitude: opts.tidalAmplitude || 20,
      tidalSpeed: opts.tidalSpeed || 0.22,
      damping: opts.damping || 0.95,
      brownianStrength: opts.brownianStrength || 0.1,
      gatherThreshold: opts.gatherThreshold || 2.8,
      gatherRadius: opts.gatherRadius || 200,
      fontFamily: opts.fontFamily || '"Noto Serif SC", "Songti SC", "STSong", Georgia, serif',
      fontSizeZH: opts.fontSizeZH || 22,
      fontSizeEN: opts.fontSizeEN || 16,
      colorInk: opts.colorInk || '#2a2520',
      colorAccent: opts.colorAccent || '#b84a2a',
      colorPaper: opts.colorPaper || '#efe8da',
    }
  }

  init(words) {
    this._generateParticles(words)
    this._resize()
    this._resizeHandler = () => this._resize()
    window.addEventListener('resize', this._resizeHandler)
    this.canvas.addEventListener('click', this._handleClick)
  }

  _handleClick = () => {
    this._clickCount++
    if (this._clickCount >= 5 && !this._secretTriggered) {
      this._secretTriggered = true
      this._triggerSecretRipple()
    }
  }

  _triggerSecretRipple() {
    const cx = this.mouseSmooth.x > -9000 ? this.mouseSmooth.x : this.W / 2
    const cy = this.mouseSmooth.y > -9000 ? this.mouseSmooth.y : this.H / 2
    this.ripples.push({
      x: cx, y: cy,
      radius: 0,
      maxRadius: Math.max(this.W, this.H) * 0.8,
      alpha: 0.6,
      speed: 400,
    })
    for (const p of this.particles) {
      const dx = p.x - cx
      const dy = p.y - cy
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const force = 800 / (d + 50)
      p.vx += (dx / d) * force
      p.vy += (dy / d) * force
    }
    setTimeout(() => { this._secretTriggered = false; this._clickCount = 0 }, 3000)
  }

  _generateParticles(words) {
    const c = this.config
    const W = this.canvas.parentElement?.clientWidth || window.innerWidth
    const H = this.canvas.parentElement?.clientHeight || window.innerHeight
    this.W = W
    this.H = H
    this.particles = words.map((w, i) => {
      const isZH = w.lang === 'zh'
      const fontSize = isZH ? c.fontSizeZH : c.fontSizeEN
      const depth = rand(0, 1)
      return {
        word: w.text,
        cat: w.cat,
        lang: w.lang,
        fontSize,
        x: rand(fontSize * 4, W - fontSize * 4),
        y: rand(fontSize * 4, H - fontSize * 4),
        baseX: 0,
        baseY: 0,
        vx: 0,
        vy: 0,
        depth,
        phase: rand(0, TAU),
        opacity: 0,
        targetOpacity: 0,
        rotation: 0,
        targetRotation: 0,
        scale: lerp(0.6, 1.2, 1 - depth),
        gathered: false,
        gatherX: 0,
        gatherY: 0,
        highlight: 0,
        i,
      }
    })
    this.particles.forEach(p => {
      p.baseX = p.x
      p.baseY = p.y
    })
    this._sortedCache = [...this.particles]
  }

  _resize() {
    const parent = this.canvas.parentElement
    const w = parent ? parent.clientWidth : window.innerWidth
    const h = parent ? parent.clientHeight : window.innerHeight
    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr
    this.canvas.style.width = w + 'px'
    this.canvas.style.height = h + 'px'
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.W = w
    this.H = h
  }

  updateMouse(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    this.mousePrev.x = this.mouse.x
    this.mousePrev.y = this.mouse.y
    this.mouse.x = x
    this.mouse.y = y
    this.mouse.active = true
    this.mouseVel.x = x - this.mousePrev.x
    this.mouseVel.y = y - this.mousePrev.y
  }

  clearMouse() {
    this.mouse.active = false
  }

  setReducedMotion(v) {
    this.reducedMotion = v
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    this._tick()
  }

  stop() {
    this.running = false
    if (this.frameId) cancelAnimationFrame(this.frameId)
  }

  destroy() {
    this.stop()
    if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler)
    this.canvas.removeEventListener('click', this._handleClick)
  }

  _tick = () => {
    if (!this.running) return
    const now = performance.now()
    const dt = Math.min((now - this.lastTime) / 1000, 0.05)
    this.lastTime = now
    this.time += dt
    this._update(dt)
    this._draw()
    this.frameId = requestAnimationFrame(this._tick)
  }

  _update(dt) {
    const c = this.config
    const m = this.mouse
    const ms = this.mouseSmooth
    const rm = this.reducedMotion

    ms.x = lerp(ms.x, m.active ? m.x : -9999, 0.06)
    ms.y = lerp(ms.y, m.active ? m.y : -9999, 0.06)

    const mouseAlive = ms.x > -9000
    if (m.active && mouseAlive) {
      this.hoverTime += dt
    } else {
      this.hoverTime = Math.max(0, this.hoverTime - dt * 1.5)
    }

    const gravR = c.gravityRadius
    const gravR2 = gravR * gravR
    const gatherR = c.gatherRadius
    const gatherR2 = gatherR * gatherR
    let nearbyCount = 0

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]
      const depthFactor = lerp(0.25, 1.0, 1 - p.depth)
      const tidalOffset = rm
        ? 0
        : Math.sin(this.time * c.tidalSpeed * depthFactor + p.phase) * c.tidalAmplitude * depthFactor

      if (!rm) {
        const targetY = p.baseY + tidalOffset
        p.vy += (targetY - p.y) * 0.015 * depthFactor
        p.vx += Math.sin(this.time * 0.08 + p.phase * 3) * c.brownianStrength * depthFactor
        p.vy += Math.cos(this.time * 0.1 + p.phase * 7) * c.brownianStrength * 0.3 * depthFactor
      }

      if (mouseAlive) {
        const dx = ms.x - p.x
        const dy = ms.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < gravR2 && d2 > 1) {
          const d = Math.sqrt(d2)
          const force = (1 - d / gravR) * c.gravityStrength * depthFactor
          p.vx += (dx / d) * force
          p.vy += (dy / d) * force
          p.highlight = lerp(p.highlight, 1 - d / gravR, 0.08)
          if (d2 < gatherR2) nearbyCount++
        } else {
          p.highlight = lerp(p.highlight, 0, 0.04)
        }
      } else {
        p.highlight = lerp(p.highlight, 0, 0.04)
      }

      if (!p.gathered) {
        const returnStr = 0.005
        p.vx += (p.baseX - p.x) * returnStr * depthFactor
        p.vy += (p.baseY - p.y) * returnStr * depthFactor
      }

      p.vx *= c.damping
      p.vy *= c.damping
      p.x += p.vx
      p.y += p.vy

      const margin = 40
      if (p.x < margin) { p.x = margin; p.vx = Math.abs(p.vx) * 0.3 }
      if (p.x > this.W - margin) { p.x = this.W - margin; p.vx = -Math.abs(p.vx) * 0.3 }
      if (p.y < margin) { p.y = margin; p.vy = Math.abs(p.vy) * 0.3 }
      if (p.y > this.H - margin) { p.y = this.H - margin; p.vy = -Math.abs(p.vy) * 0.3 }

      p.targetRotation = clamp(p.vx * 0.01, -0.1, 0.1)
      p.rotation = lerp(p.rotation, p.targetRotation, 0.06)

      const nearness = mouseAlive
        ? clamp(1 - Math.sqrt((ms.x - p.x) ** 2 + (ms.y - p.y) ** 2) / gravR, 0, 1)
        : 0
      p.targetOpacity = lerp(0.1, 0.9, 1 - p.depth) + nearness * 0.5
      p.opacity = lerp(p.opacity, p.targetOpacity, 0.04)
    }

    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i]
      r.radius += r.speed * dt
      r.alpha -= dt * 0.8
      if (r.alpha <= 0 || r.radius > r.maxRadius) {
        this.ripples.splice(i, 1)
      }
    }

    const shouldGather = nearbyCount >= 4 && this.hoverTime > c.gatherThreshold
    if (shouldGather && !this.activeSentence) {
      this._tryGather(ms.x, ms.y)
    }
    if (this.activeSentence && this.sentenceAlpha < 1) {
      this.sentenceAlpha = Math.min(1, this.sentenceAlpha + dt * 1.0)
      if (this._onSentenceChange) {
        this._onSentenceChange(this.activeSentence, this.sentenceAlpha)
      }
    }
    if (!shouldGather && this.activeSentence) {
      this.sentenceAlpha -= dt * 0.5
      if (this.sentenceAlpha <= 0) {
        this._releaseGather()
      } else if (this._onSentenceChange) {
        this._onSentenceChange(this.activeSentence, this.sentenceAlpha)
      }
    }

    for (const sp of this.sentenceParticles) {
      if (sp.gathered) {
        sp.x = lerp(sp.x, sp.gatherX, 0.04)
        sp.y = lerp(sp.y, sp.gatherY, 0.04)
      }
    }

    if (this._sortedCache.length !== this.particles.length) {
      this._sortedCache = [...this.particles]
    }
    this._sortedCache.sort((a, b) => a.depth - b.depth)
  }

  _tryGather(mx, my) {
    const c = this.config
    const nearby = this.particles
      .filter(p => (p.x - mx) ** 2 + (p.y - my) ** 2 < c.gatherRadius * c.gatherRadius)
      .sort((a, b) => ((a.x - mx) ** 2 + (a.y - my) ** 2) - ((b.x - mx) ** 2 + (b.y - my) ** 2))

    let bestSentence = null
    let bestScore = 0

    for (const sent of this.sentences) {
      let matched = 0
      for (const sw of sent.words) {
        for (const np of nearby) {
          if (np.word === sw) { matched++; break }
        }
      }
      if (matched > bestScore) {
        bestScore = matched
        bestSentence = sent
      }
    }

    if (bestSentence && bestScore >= 3) {
      this.activeSentence = bestSentence
      this.sentenceAlpha = 0
      this.sentenceParticles = []

      const matched = []
      for (const sw of bestSentence.words) {
        for (const np of nearby) {
          if (np.word === sw && !matched.includes(np)) {
            matched.push(np)
            break
          }
        }
      }

      const spacing = Math.min(44, (this.W - 120) / matched.length)
      const startX = mx - ((matched.length - 1) * spacing) / 2
      matched.forEach((p, i) => {
        p.gathered = true
        p.gatherX = clamp(startX + i * spacing, 60, this.W - 60)
        p.gatherY = clamp(my - 30, 60, this.H - 100)
        this.sentenceParticles.push(p)
      })

      this.ripples.push({
        x: mx, y: my,
        radius: 0,
        maxRadius: c.gatherRadius * 1.5,
        alpha: 0.3,
        speed: 200,
      })
    }
  }

  _releaseGather() {
    for (const sp of this.sentenceParticles) {
      sp.gathered = false
    }
    this.sentenceParticles = []
    this.activeSentence = null
    this.sentenceAlpha = 0
    this.hoverTime = 0
    if (this._onSentenceChange) {
      this._onSentenceChange(null, 0)
    }
  }

  _draw() {
    const ctx = this.ctx
    const c = this.config
    ctx.clearRect(0, 0, this.W, this.H)

    this._drawWaveLines(ctx)

    for (const r of this.ripples) {
      if (r.alpha <= 0) continue
      ctx.save()
      ctx.strokeStyle = c.colorAccent
      ctx.lineWidth = 1.5
      ctx.globalAlpha = r.alpha * 0.5
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.radius, 0, TAU)
      ctx.stroke()
      if (r.radius > 30) {
        ctx.globalAlpha = r.alpha * 0.2
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius * 0.6, 0, TAU)
        ctx.stroke()
      }
      ctx.restore()
    }

    if (this.mouseSmooth.x > -9000) {
      this._drawConnectionLines(ctx)
      this._drawCursorField(ctx)
    }

    const sorted = this._sortedCache
    for (const p of sorted) {
      if (p.opacity < 0.02) continue
      const size = p.fontSize * p.scale
      const depthTint = lerp(0.35, 1.0, 1 - p.depth)
      const ink = c.colorInk
      const ir = parseInt(ink.slice(1, 3), 16)
      const ig = parseInt(ink.slice(3, 5), 16)
      const ib = parseInt(ink.slice(5, 7), 16)

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      const finalOpacity = p.opacity * depthTint + p.highlight * 0.3
      ctx.globalAlpha = Math.min(1, finalOpacity)
      ctx.font = `${p.lang === 'zh' ? '600' : '400'} ${size}px ${c.fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (p.highlight > 0.3) {
        const accentR = parseInt(c.colorAccent.slice(1, 3), 16)
        const accentG = parseInt(c.colorAccent.slice(3, 5), 16)
        const accentB = parseInt(c.colorAccent.slice(5, 7), 16)
        const t = clamp(p.highlight, 0, 1)
        const rr = Math.round(lerp(ir, accentR, t))
        const gg = Math.round(lerp(ig, accentG, t))
        const bb = Math.round(lerp(ib, accentB, t))
        ctx.fillStyle = `rgb(${rr},${gg},${bb})`

        if (p.highlight > 0.6) {
          ctx.shadowColor = `rgba(${accentR},${accentG},${accentB}, 0.25)`
          ctx.shadowBlur = 8
        }
      } else {
        ctx.fillStyle = `rgb(${ir},${ig},${ib})`
      }

      ctx.fillText(p.word, 0, 0)
      ctx.restore()
    }

    if (this.activeSentence && this.sentenceAlpha > 0.01) {
      this._drawSentence(ctx)
    }
  }

  _drawWaveLines(ctx) {
    const rm = this.reducedMotion
    if (rm) return
    const t = this.time
    ctx.save()
    ctx.globalAlpha = 0.025
    ctx.strokeStyle = this.config.colorInk
    ctx.lineWidth = 0.5
    for (let i = 0; i < 5; i++) {
      const y = this.H * (0.2 + i * 0.15) + Math.sin(t * 0.3 + i) * 15
      ctx.beginPath()
      for (let x = 0; x <= this.W; x += 8) {
        const yy = y + Math.sin(x * 0.005 + t * 0.2 + i * 1.5) * 8
        if (x === 0) ctx.moveTo(x, yy)
        else ctx.lineTo(x, yy)
      }
      ctx.stroke()
    }
    ctx.restore()
  }

  _drawConnectionLines(ctx) {
    const ms = this.mouseSmooth
    const gravR = this.config.gravityRadius
    const gravR2 = gravR * gravR
    const nearParticles = []

    for (const p of this.particles) {
      const d2 = (ms.x - p.x) ** 2 + (ms.y - p.y) ** 2
      if (d2 < gravR2 * 0.5 && p.opacity > 0.2) {
        nearParticles.push(p)
      }
    }

    if (nearParticles.length < 2) return

    ctx.save()
    ctx.strokeStyle = this.config.colorAccent
    ctx.lineWidth = 0.3
    const maxLines = Math.min(nearParticles.length, 8)
    for (let i = 0; i < maxLines; i++) {
      for (let j = i + 1; j < maxLines; j++) {
        const a = nearParticles[i]
        const b = nearParticles[j]
        const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2)
          ctx.globalAlpha = (1 - d / 150) * 0.08 * Math.min(a.highlight, b.highlight) * 3
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }
    ctx.restore()
  }

  _drawCursorField(ctx) {
    const ms = this.mouseSmooth
    const c = this.config
    const r = c.gravityRadius
    const hoverIntensity = clamp(this.hoverTime / 3, 0, 1)

    ctx.save()
    const grad = ctx.createRadialGradient(ms.x, ms.y, 0, ms.x, ms.y, r)
    const a = 0.03 + hoverIntensity * 0.04
    grad.addColorStop(0, `rgba(184, 74, 42, ${a * 3})`)
    grad.addColorStop(0.3, `rgba(184, 74, 42, ${a * 1.5})`)
    grad.addColorStop(0.7, `rgba(184, 74, 42, ${a * 0.5})`)
    grad.addColorStop(1, 'rgba(184, 74, 42, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(ms.x, ms.y, r, 0, TAU)
    ctx.fill()

    ctx.globalAlpha = 0.08 + hoverIntensity * 0.12
    ctx.strokeStyle = c.colorAccent
    ctx.lineWidth = 0.5
    const ringR = 20 + hoverIntensity * 30
    ctx.beginPath()
    ctx.arc(ms.x, ms.y, ringR, 0, TAU)
    ctx.stroke()

    ctx.restore()
  }

  _drawSentence(ctx) {
    const sent = this.activeSentence
    const alpha = this.sentenceAlpha
    if (!sent) return

    const c = this.config
    const fontSize = 15
    const lineHeight = 28
    const lines = sent.text.split('\n')

    let cx = 0, cy = 0
    if (this.sentenceParticles.length > 0) {
      for (const sp of this.sentenceParticles) {
        cx += sp.x
        cy += sp.y
      }
      cx /= this.sentenceParticles.length
      cy /= this.sentenceParticles.length
    } else {
      cx = this.mouseSmooth.x
      cy = this.mouseSmooth.y
    }

    ctx.save()
    ctx.font = `400 ${fontSize}px ${c.fontFamily}`
    const maxWidth = Math.max(...lines.map(l => ctx.measureText(l).width))
    const boxW = maxWidth + 56
    const boxH = lines.length * lineHeight + 36
    const boxX = clamp(cx - boxW / 2, 16, this.W - boxW - 16)
    const boxY = clamp(cy + 50, 16, this.H - boxH - 16)

    ctx.globalAlpha = alpha * 0.05
    ctx.fillStyle = c.colorPaper
    ctx.fillRect(boxX - 2, boxY - 2, boxW + 4, boxH + 4)

    ctx.globalAlpha = alpha * 0.3
    ctx.strokeStyle = c.colorAccent
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(boxX, boxY)
    ctx.lineTo(boxX + boxW, boxY)
    ctx.stroke()

    ctx.globalAlpha = alpha * 0.15
    ctx.setLineDash([4, 4])
    ctx.lineDashOffset = -this.time * 20
    ctx.beginPath()
    ctx.moveTo(boxX, boxY + boxH)
    ctx.lineTo(boxX + boxW, boxY + boxH)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.globalAlpha = alpha
    ctx.fillStyle = c.colorInk
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    lines.forEach((line, i) => {
      ctx.fillText(line, boxX + boxW / 2, boxY + 18 + i * lineHeight)
    })

    if (sent.textEn) {
      ctx.globalAlpha = alpha * 0.35
      ctx.font = `italic 300 ${fontSize - 2}px ${c.fontFamily}`
      ctx.fillStyle = c.colorAccent
      ctx.textAlign = 'center'
      const enLines = sent.textEn.split('\n')
      enLines.forEach((line, i) => {
        ctx.fillText(line, boxX + boxW / 2, boxY + boxH + 12 + i * 18)
      })
    }

    ctx.restore()
  }
}
