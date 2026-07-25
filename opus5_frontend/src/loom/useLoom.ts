/**
 * useLoom — wires the apparatus to the document.
 *
 * One shared ticker (gsap's) drives the simulation, so ScrollTrigger and the
 * loom never fight over frames. Scroll writes *intentions* into a mutable
 * params object; React never re-renders on a frame boundary. The only React
 * state here is discrete: which act, has the secret been found, is sound on.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LoomEngine } from './LoomEngine'
import { LoomAudio, buzz } from './audio'
import { ACTS, FLAW_AT, actScore, type ActId } from '../scroll/score'

gsap.registerPlugin(ScrollTrigger)

/** how many distinct ends one gesture must cross to count as a strum */
const STRUM_THRESHOLD = 14

const SECRET_NOTE = '你把整幅经线扫过去了。<b>「私」这种读法解锁了</b>——回到第二幕。'
const REVERSE_NOTE = '你把布翻过来了。<b>背面是我实际怎么想的。</b>松手放回去。'

export function useLoom() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<LoomEngine | null>(null)
  const audioRef = useRef<LoomAudio | null>(null)
  const visibleRef = useRef(true)
  const flipTween = useRef<gsap.core.Tween | null>(null)
  const flipState = useRef(false)

  const [act, setAct] = useState<ActId>('warp')
  const [reduced, setReduced] = useState(false)
  const [ready, setReady] = useState(false)
  const [secret, setSecret] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  if (!audioRef.current) audioRef.current = new LoomAudio()

  /* ---------------- turning the cloth over ---------------- */

  const setFlip = useCallback((on: boolean) => {
    const engine = engineRef.current
    if (!engine || flipState.current === on) return
    flipState.current = on
    setFlipped(on)
    flipTween.current?.kill()
    flipTween.current = gsap.to(engine.params, {
      flip: on ? 1 : 0,
      duration: engine.reducedMotion ? 0 : 0.62,
      ease: 'power3.inOut',
    })
    if (audioRef.current?.enabled) audioRef.current.tension(0.32)
  }, [])

  const reveal = useCallback((text: string) => {
    setNote((prev) => prev ?? text)
  }, [])

  /** the visitor may overrule the OS motion preference in either direction */
  const overrideMotion = useCallback((wantReduced: boolean) => {
    setReduced(wantReduced)
    const engine = engineRef.current
    if (engine) {
      engine.reducedMotion = wantReduced
      if (wantReduced) engine.params.warpTension = 1
    }
    ScrollTrigger.refresh()
  }, [])

  /* ---------------- engine lifecycle ---------------- */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new LoomEngine(canvas)
    engineRef.current = engine

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyMotion = () => {
      engine.reducedMotion = mq.matches
      setReduced(mq.matches)
    }
    applyMotion()
    mq.addEventListener('change', applyMotion)

    let lastW = 0
    let lastH = 0
    const resize = () => {
      // ignore the mobile URL-bar height wobble: it would rebuild the cloth
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === lastW && Math.abs(h - lastH) < 90) return
      lastW = w
      lastH = h
      engine.resize(w, h)
      engine.flawFrom = Math.round(engine.rows * FLAW_AT)
      ScrollTrigger.refresh()
    }
    resize()

    // Sound & haptics are a substitute feedback channel for the machine's
    // rhythm. Nothing plays until the visitor asks for it.
    engine.onEvent = (e) => {
      const audio = audioRef.current
      if (!audio?.enabled) return
      if (e.kind === 'beat') {
        audio.beat(e.force, e.at)
        if (e.force > 0.9) buzz(8)
      } else if (e.kind === 'unravel') {
        audio.unravel()
      } else if (e.kind === 'learned') {
        audio.tension(1.1)
        buzz([12, 40, 22])
      } else if (e.kind === 'snip') {
        audio.snip()
        buzz([6, 30, 6])
      } else if (e.kind === 'tension') {
        audio.pluck(engine.pitchOf(Math.round(e.at * Math.max(1, engine.ends - 1))), e.force)
      }
    }

    // the warp coming into tension: an entrance for the *machine*, on load,
    // not on scroll. The first screen is alive before you touch anything.
    let teach = 0
    if (mq.matches) {
      engine.params.warpTension = 1
    } else {
      gsap.fromTo(
        engine.params,
        { warpTension: 0 },
        { warpTension: 1, duration: 2.1, ease: 'power2.out', delay: 0.15 },
      )
      // one soft pluck, unasked, to teach the gesture
      teach = window.setTimeout(() => {
        engineRef.current?.pluck(Math.floor(engine.ends * 0.42), 0.55, 3.4)
      }, 2400)
    }

    setReady(true)
    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    return () => {
      window.clearTimeout(teach)
      ro.disconnect()
      mq.removeEventListener('change', applyMotion)
      engine.onEvent = null
      engineRef.current = null
    }
  }, [])

  /* ---------------- one ticker for everything ---------------- */

  useEffect(() => {
    if (!ready) return
    const tick = (_time: number, dt: number) => {
      const engine = engineRef.current
      if (!engine || document.hidden || !visibleRef.current) return
      engine.tick(dt)
      engine.render()
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [ready])

  /* ---------------- the score ---------------- */

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      for (const a of ACTS) {
        ScrollTrigger.create({
          trigger: `[data-act="${a.id}"]`,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const engine = engineRef.current
            if (!engine) return
            // reduced motion: four discrete stops per act instead of a
            // continuum. The narrative survives; the motion does not.
            const t = engine.reducedMotion ? Math.round(self.progress * 3) / 3 : self.progress
            Object.assign(engine.params, actScore(a.id, t, engine.rows))
          },
          onToggle: (self) => {
            if (self.isActive) setAct(a.id)
          },
        })
      }
      // once the colophon covers the loom, stop simulating it and take its
      // instruments off the screen with it.
      ScrollTrigger.create({
        trigger: '#colophon',
        start: 'top 34%',
        onToggle: (self) => {
          visibleRef.current = !self.isActive
          document.body.dataset.chrome = self.isActive ? 'off' : 'on'
        },
      })
    })
    return () => ctx.revert()
  }, [ready])

  /* ---------------- the warp as an instrument ---------------- */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !ready) return

    let down = false
    let lastEnd = -1
    let lastT = 0
    let holdTimer = 0
    let holding = false
    const touched = new Set<number>()

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    const strum = () => {
      setSecret((s) => {
        if (!s) reveal(SECRET_NOTE)
        return true
      })
    }

    const onDown = (e: PointerEvent) => {
      const engine = engineRef.current
      if (!engine) return
      const { x, y } = local(e)

      // Holding finished cloth turns it over. Nothing tells you this;
      // the copy in act V only hints. This is the layer you find.
      if (engine.isOnCloth(x, y)) {
        holdTimer = window.setTimeout(() => {
          holding = true
          setFlip(true)
          buzz(14)
          reveal(REVERSE_NOTE)
        }, 220)
        return
      }

      const j = engine.endAt(x, y)
      if (j === null) return
      down = true
      touched.clear()
      touched.add(j)
      lastEnd = j
      lastT = e.timeStamp
      engine.pluck(j, 1)
      canvas.setPointerCapture?.(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      const engine = engineRef.current
      if (!engine) return
      const { x, y } = local(e)
      const j = engine.endAt(x, y)
      engine.focusEnd = j
      if (!down || j === null || j === lastEnd) return
      const dt = Math.max(8, e.timeStamp - lastT)
      const speed = Math.min(1.3, Math.abs(j - lastEnd) / (dt / 55))
      const step = j > lastEnd ? 1 : -1
      for (let k = lastEnd + step; ; k += step) {
        engine.pluck(k, 0.26 + speed * 0.5, 1.3)
        touched.add(k)
        if (k === j) break
      }
      lastEnd = j
      lastT = e.timeStamp
    }

    const onUp = (e: PointerEvent) => {
      window.clearTimeout(holdTimer)
      if (holding) {
        holding = false
        setFlip(false)
      }
      if (down && touched.size >= STRUM_THRESHOLD) strum()
      down = false
      lastEnd = -1
      touched.clear()
      if (canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    }

    const onLeave = () => {
      const engine = engineRef.current
      if (engine && !down) engine.focusEnd = null
    }

    /* the loom is playable without a pointer */
    const onKey = (e: KeyboardEvent) => {
      const engine = engineRef.current
      if (!engine) return
      const cur = engine.focusEnd ?? Math.floor(engine.ends / 2)
      const step = e.shiftKey ? 6 : 1
      const k = e.key.toLowerCase()
      if (e.key === 'ArrowLeft') {
        engine.focusEnd = Math.max(0, cur - step)
        e.preventDefault()
      } else if (e.key === 'ArrowRight') {
        engine.focusEnd = Math.min(engine.ends - 1, cur + step)
        e.preventDefault()
      } else if (e.key === ' ' || e.key === 'Enter') {
        engine.pluck(cur, 1)
        e.preventDefault()
      } else if (k === 'g') {
        let i = 0
        const id = window.setInterval(() => {
          const en = engineRef.current
          if (!en) return window.clearInterval(id)
          en.pluck(Math.floor((i / 18) * Math.max(1, en.ends - 1)), 0.72, 1.5)
          if (++i > 18) {
            window.clearInterval(id)
            strum()
          }
        }, 44)
        e.preventDefault()
      } else if (k === 'f') {
        setFlip(!flipState.current)
        e.preventDefault()
      }
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(holdTimer)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('keydown', onKey)
    }
  }, [ready, reveal, setFlip])

  /* ---------------- sound ---------------- */

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on
      void audioRef.current?.toggle(next)
      return next
    })
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    return () => audio?.dispose()
  }, [])

  useEffect(() => {
    if (!note) return
    const id = window.setTimeout(() => setNote(null), 8000)
    return () => window.clearTimeout(id)
  }, [note])

  return {
    canvasRef,
    engineRef,
    act,
    reduced,
    ready,
    secret,
    soundOn,
    toggleSound,
    flipped,
    setFlip,
    note,
    overrideMotion,
    dismissNote: useCallback(() => setNote(null), []),
  }
}
