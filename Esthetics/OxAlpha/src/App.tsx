import { useEffect } from 'react'
import Stage from './components/Stage'
import NavRail from './components/NavRail'
import Hero from './components/Hero'
import { PlateOne, PlateTwo, PlateThree, Coda } from './components/Sections'
import { engine } from './sync/engine'
import { audio } from './sync/audio'
import { useEngineVersion } from './sync/react'

/** 章节耦合调制：思考推高、创造松开、协作交给用户、尾声托底。 */
const MODS = [1.05, 1.6, 0.5, 1.0, 1.25]
const LABELS = ['序', '壹', '贰', '叁', '终']

export default function App() {
  const version = useEngineVersion()

  /* 引擎钩子：声音与全局状态 */
  useEffect(() => {
    engine.onTickHigh = () => audio.tick()
    engine.onKnock = (i) => audio.pluck(i)
    engine.onLock = () => {
      audio.chime()
      document.body.classList.add('is-locked')
    }
    if (engine.reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!engine.lockInfo) engine.settleStatic()
    }
  }, [])

  /* 滚动 → 进度 / 章节 / 武装 */
  useEffect(() => {
    let ticking = false
    let lastIdx = -1
    const update = () => {
      ticking = false
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      engine.setProgress(window.scrollY / max)
      const mid = window.innerHeight * 0.5
      let idx = 0
      document.querySelectorAll<HTMLElement>('[data-section]').forEach((el, i) => {
        const b = el.getBoundingClientRect()
        if (b.top <= mid && b.bottom > mid) idx = i
      })
      engine.setMod(MODS[idx] ?? 1)
      engine.setArmed(idx >= 3 && idx <= 4)
      if (idx !== lastIdx) {
        engine.markSection(LABELS[idx] ?? '')
        lastIdx = idx
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', engine.locked)
  }, [version])

  return (
    <>
      <a className="skip" href="#p1">
        跳到正文
      </a>
      <NavRail />
      <div className="layout">
        <div className="stage-col" aria-label="相位仪">
          <Stage />
        </div>
        <main className="flow" id="main">
          <Hero />
          <PlateOne />
          <PlateTwo />
          <PlateThree />
          <Coda />
        </main>
      </div>
    </>
  )
}
