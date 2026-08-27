import { useEffect, useRef } from 'react'
import { engine } from '../sync/engine'

/** 舞台：相位仪的宿主。连续量全部绕过 React，直接操作画布与 SVG。 */
export default function Stage() {
  const cvs = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const needle = useRef<SVGGElement>(null)
  const num = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const c = cvs.current
    const wrapEl = wrap.current
    if (!c || !wrapEl) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let raf = 0
    let last = performance.now()
    let ns = 0 // 表针弹簧位置
    let nv = 0 // 表针弹簧速度
    let lastCss = -1

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = wrapEl.clientWidth
      const h = wrapEl.clientHeight
      c.width = Math.max(1, Math.round(w * dpr))
      c.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      engine.resize(w, h, dpr)
      engine.setDensity(w)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(wrapEl)

    const pushCss = () => {
      document.documentElement.style.setProperty('--r', engine.r.toFixed(3))
    }

    const frame = (t: number) => {
      if (engine.reduced) {
        // 会话中途开启减动效：停机并定格
        running = false
        engine.render(ctx)
        pushCss()
        return
      }
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      engine.step(dt)
      engine.render(ctx)

      if (Math.abs(engine.r - lastCss) > 0.002) {
        lastCss = engine.r
        pushCss()
      }
      // 欠阻尼表针：有重量、有过冲
      const target = engine.r
      nv += (target - ns) * 88 * dt - nv * 10.5 * dt
      ns += nv * dt
      const s = Math.max(0, Math.min(1, ns))
      needle.current?.setAttribute('transform', `rotate(${(-80 + 160 * s).toFixed(2)} 42 42)`)
      if (num.current) num.current.textContent = engine.r.toFixed(2)

      raf = requestAnimationFrame(frame)
    }

    let running = false
    const start = () => {
      if (!running && !engine.reduced) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    if (engine.reduced) {
      engine.render(ctx)
      pushCss()
    } else {
      start()
    }
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    /* ---- 指针：掠过即扰，点按弹飞，按住透视 ---- */
    let downT = 0
    let movedFar = false
    let dx0 = 0
    let dy0 = 0
    let heldXray = false
    let holdTimer = 0
    let lastProbe = 0
    let lastPx = -99
    let lastPy = -99

    const toLocal = (e: PointerEvent) => {
      const b = c.getBoundingClientRect()
      return { x: e.clientX - b.left, y: e.clientY - b.top }
    }
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e)
      dx0 = p.x
      dy0 = p.y
      downT = performance.now()
      movedFar = false
      holdTimer = window.setTimeout(() => {
        if (!movedFar && !engine.xray) {
          heldXray = true
          engine.setXray(true)
        }
      }, 460)
    }
    const disturb = (p: { x: number; y: number }, now: number) => {
      if (engine.xray || engine.reduced) return
      if (Math.hypot(p.x - lastPx, p.y - lastPy) < 22) return
      lastPx = p.x
      lastPy = p.y
      if (now - lastProbe < 110) return
      lastProbe = now
      engine.knockAt(p.x, p.y)
    }
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e)
      if (Math.hypot(p.x - dx0, p.y - dy0) > 9) {
        movedFar = true
        clearTimeout(holdTimer)
      }
      disturb(p, performance.now())
    }
    const onUp = () => {
      clearTimeout(holdTimer)
      if (heldXray) {
        engine.setXray(false)
        heldXray = false
        return
      }
      if (!movedFar && performance.now() - downT < 460) {
        engine.knockAt(dx0, dy0)
      }
    }
    const onLeave = () => {
      clearTimeout(holdTimer)
    }

    c.addEventListener('pointerdown', onDown)
    c.addEventListener('pointermove', onMove)
    c.addEventListener('pointerup', onUp)
    c.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      c.removeEventListener('pointerdown', onDown)
      c.removeEventListener('pointermove', onMove)
      c.removeEventListener('pointerup', onUp)
      c.removeEventListener('pointerleave', onLeave)
      clearTimeout(holdTimer)
    }
  }, [])

  return (
    <div className="stage" ref={wrap}>
      <canvas
        ref={cvs}
        aria-hidden="true"
      />
      <button
        type="button"
        className="ghost-btn xbtn"
        onClick={() => engine.setXray(!engine.xray)}
        aria-pressed={engine.xray}
      >
        {engine.xray ? '返回纸面' : '机括'}
      </button>
      <div className="gauge" aria-hidden="true">
        <svg viewBox="0 0 84 50" width="126" height="75">
          <path d="M10 42 A32 32 0 0 1 74 42" fill="none" stroke="#8d8271" strokeWidth="1" />
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const a = (-80 + 160 * t) * (Math.PI / 180)
            const x0 = 42 + Math.sin(a) * 26
            const y0 = 42 - Math.cos(a) * 26
            const x1 = 42 + Math.sin(a) * 32
            const y1 = 42 - Math.cos(a) * 32
            return <line key={t} x1={x0} y1={y0} x2={x1} y2={y1} stroke="#8d8271" strokeWidth={t === 0 || t === 1 ? 1.4 : 0.7} />
          })}
          <text x="6" y="49" fontSize="7" fill="#8d8271">0</text>
          <text x="73" y="49" fontSize="7" fill="#8d8271">1</text>
          <g ref={needle} transform="rotate(-80 42 42)">
            <line x1="42" y1="42" x2="42" y2="13" stroke="#b3402a" strokeWidth="1.6" />
          </g>
          <circle cx="42" cy="42" r="2.6" fill="#26211a" />
        </svg>
        <span className="gauge-label">
          序参量 r = <span ref={num}>0.00</span>
        </span>
      </div>
      <p className="stage-hint" aria-hidden="true">
        掠过会扰动 · 点按会弹开 · 按住看机括
      </p>
    </div>
  )
}
