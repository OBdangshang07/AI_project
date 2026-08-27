<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { bindEngine, engine, ui } from '../store'
import { a11y } from '../content/copy'

const cv = ref<HTMLCanvasElement | null>(null)
let tops: number[] = []
let heights: number[] = []
let ro: ResizeObserver | null = null
let forcedG: number | null = null

function measure(): void {
  const secs = Array.from(document.querySelectorAll<HTMLElement>('main .chapter'))
  tops = secs.map((s) => s.offsetTop)
  heights = secs.map((s) => s.offsetHeight)
  onScroll()
}

function onScroll(): void {
  if (forcedG != null) {
    engine.setScroll(forcedG)
    return
  }
  if (!tops.length) return
  const anchor = window.scrollY + window.innerHeight * 0.5
  let g = 4.999
  for (let i = 0; i < tops.length; i++) {
    const t = tops[i]!
    const h = Math.max(1, heights[i]!)
    if (anchor < t + h || i === tops.length - 1) {
      g = i + Math.min(1, Math.max(0, (anchor - t) / h))
      break
    }
  }
  engine.setScroll(Math.min(4.999, g))
}

function onResize(): void {
  engine.resize()
  measure()
}

const initAudio = (): void => engine.audio.gesture()
const onVis = (): void => {
  if (!document.hidden) engine.wake()
}

onMounted(() => {
  bindEngine()
  if (cv.value) engine.attach(cv.value)
  if (import.meta.env.DEV) {
    ;(window as unknown as { __studio?: unknown }).__studio = { engine, ui }
  }
  document.documentElement.classList.toggle('calm', ui.calm)
  measure()
  // 深链：?at=0..4 直达某一章
  const params = new URLSearchParams(location.search)
  const at = Number(params.get('at'))
  if (Number.isInteger(at) && at >= 0 && at <= 4) {
    const secs = document.querySelectorAll<HTMLElement>('main .chapter')
    const el = secs[at]
    if (el) window.scrollTo({ top: el.offsetTop + (at === 0 ? 0 : window.innerHeight * 0.6), behavior: 'auto' })
  }
  // 调试（仅 DEV）：?g=2.5 直接驱动舞台状态（不滚动页面）
  const gp = import.meta.env.DEV ? Number.parseFloat(params.get('g') ?? '') : NaN
  if (Number.isFinite(gp)) {
    forcedG = Math.min(4.999, Math.max(0, gp))
    engine.setScroll(forcedG)
    engine.simulate(forcedG >= 3 ? 45 : 12)
    const dbg = document.createElement('pre')
    dbg.style.cssText =
      'position:fixed;left:8px;top:8px;z-index:99;background:#000c;color:#0f0;font:12px monospace;padding:6px;pointer-events:none'
    document.body.appendChild(dbg)
    const probe = () => {
      dbg.textContent = engine.debugInfo()
      requestAnimationFrame(probe)
    }
    probe()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('pointerdown', initAudio, { once: true })
  window.addEventListener('keydown', initAudio, { once: true })
  document.addEventListener('visibilitychange', onVis)
  ro = new ResizeObserver(() => measure())
  const main = document.querySelector('main')
  if (main) ro.observe(main)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', onVis)
  ro?.disconnect()
  engine.destroy()
})
</script>

<template>
  <canvas ref="cv" class="stage-canvas" role="img" :aria-label="a11y.stageLabel"></canvas>
</template>
