import { useRef, useEffect, useCallback, useState } from 'react'
import { TidalEngine } from '../engine/TidalEngine'
import { WORDS, SENTENCES } from '../engine/words'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function TidalField() {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [currentSentence, setCurrentSentence] = useState(null)
  const [sentenceAlpha, setSentenceAlpha] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleSentenceChange = useCallback((sent, alpha) => {
    setCurrentSentence(sent)
    setSentenceAlpha(alpha)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const engine = new TidalEngine(canvas, {
      sentences: SENTENCES,
      onSentenceChange: handleSentenceChange,
      particleCount: isMobile ? 70 : 110,
      gravityRadius: isMobile ? 140 : 240,
      fontSizeZH: isMobile ? 16 : 22,
      fontSizeEN: isMobile ? 13 : 16,
    })

    engine.init(WORDS)
    engine.setReducedMotion(reducedMotion)
    engine.start()
    engineRef.current = engine

    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [reducedMotion, handleSentenceChange])

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setReducedMotion(reducedMotion)
    }
  }, [reducedMotion])

  const handleMouseMove = useCallback((e) => {
    if (engineRef.current) {
      engineRef.current.updateMouse(e.clientX, e.clientY)
    }
    if (!hasInteracted) setHasInteracted(true)
  }, [hasInteracted])

  const handleMouseLeave = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.clearMouse()
    }
  }, [])

  const handleTouchStart = useCallback((e) => {
    if (engineRef.current && e.touches[0]) {
      engineRef.current.updateMouse(e.touches[0].clientX, e.touches[0].clientY)
    }
    if (!hasInteracted) setHasInteracted(true)
  }, [hasInteracted])

  const handleTouchMove = useCallback((e) => {
    if (engineRef.current && e.touches[0]) {
      engineRef.current.updateMouse(e.touches[0].clientX, e.touches[0].clientY)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.clearMouse()
    }
  }, [])

  return (
    <section
      className="tidal-field"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive word field — move cursor to attract words. Hover and wait to reveal hidden sentences."
      role="application"
      aria-roledescription="interactive canvas"
    >
      <canvas ref={canvasRef} className="tidal-canvas" />

      <div className="tidal-overlay">
        <header className="tidal-header">
          <h1 className="tidal-title">
            <span className="tidal-title-zh">潮汐之间</span>
            <span className="tidal-title-en">Between Tides</span>
          </h1>
          <p className="tidal-subtitle">
            {isTouchDevice
              ? '用手指触碰，词语会被你的注意力牵引'
              : '移动光标，词语会被你的注意力牵引'}
          </p>
        </header>

        {currentSentence && sentenceAlpha > 0.1 && (
          <div
            className="sentence-overlay"
            style={{ opacity: sentenceAlpha }}
            aria-live="polite"
            role="status"
          >
            <p className="sentence-text">{currentSentence.text}</p>
            <p className="sentence-text-en">{currentSentence.textEn}</p>
          </div>
        )}
      </div>

      <div className="tidal-hint" aria-hidden="true">
        <span className="hint-dot" />
        <span className="hint-text">
          {hasInteracted
            ? (currentSentence ? '阅读后移开' : '继续悬停')
            : (isTouchDevice ? '触碰并停留' : '悬停并等待')}
        </span>
      </div>

      <div className="tidal-bottom-fade" aria-hidden="true" />
    </section>
  )
}
