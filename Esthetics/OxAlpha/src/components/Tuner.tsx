import { useEffect, useRef, useState } from 'react'
import { engine } from '../sync/engine'

type Status = 'idle' | 'seek' | 'hot' | 'locked'

const STATUS_TEXT: Record<Status, string> = {
  idle: '尚未进入协作章节。',
  seek: '搜索中——两颗点转得越接近，离答案越近。',
  hot: '热了！拍频正在变慢，稳住……',
  locked: '已锁定。这一页记住了你的频率。',
}

/** 拍频示波器：两个点分别按 ω₀ 与用户频率旋转，转速差即偏差。 */
function BeatScope() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = 148
    const h = 76
    c.width = w * dpr
    c.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let raf = 0
    let a = 0.6
    let b = 2.3
    let last = performance.now()

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(109,99,83,0.45)'
      ctx.lineWidth = 1
      ;[28, 48].forEach((y) => {
        ctx.beginPath()
        ctx.arc(w / 2, y, 16, 0, Math.PI * 2)
        ctx.stroke()
      })
      const hot = engine.isHot || engine.locked
      const dot = (ang: number, y: number, verm: boolean) => {
        const x = w / 2 + Math.cos(ang) * 16
        const yy = y + Math.sin(ang) * 16
        ctx.fillStyle = verm ? '#b3402a' : '#26211a'
        ctx.beginPath()
        ctx.arc(x, yy, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
      if (hot) {
        ctx.strokeStyle = 'rgba(179,64,42,0.55)'
        ctx.beginPath()
        ctx.moveTo(w / 2 + Math.cos(a) * 22, 28 + Math.sin(a) * 22)
        ctx.lineTo(w / 2 + Math.cos(b) * 22, 48 + Math.sin(b) * 22)
        ctx.stroke()
      }
      dot(b, 28, false) // 我：ω₀
      dot(a, 48, true) // 你：f
    }

    if (engine.reduced) {
      draw()
      return () => void 0
    }

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      a += (0.55 + engine.userFreq * 1.35) * dt
      b += (0.55 + 1.35 * 1.0) * dt
      draw()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="beat" width={148} height={76} aria-hidden="true" />
}

export default function Tuner() {
  const [uf, setUf] = useState(engine.userFreq)
  const [gain, setGain] = useState(engine.gain)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const id = window.setInterval(() => {
      const s: Status =
        engine.locked ? 'locked' : !engine.armed ? 'idle' : engine.isHot ? 'hot' : 'seek'
      setStatus((prev) => (prev === s ? prev : s))
      setUf((p) => (Math.abs(p - engine.userFreq) > 0.004 ? engine.userFreq : p))
      setGain((p) => (Math.abs(p - engine.gain) > 0.004 ? engine.gain : p))
    }, 140)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="tuner">
      <BeatScope />
      <div className="knobs">
        <label>
          <span className="klabel">
            你的频率 <em>f</em>
            <output>{uf.toFixed(2)}</output>
          </span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.01}
            value={uf}
            disabled={engine.locked}
            onChange={(e) => {
              engine.setUserFreq(parseFloat(e.target.value))
              setUf(engine.userFreq)
            }}
          />
        </label>
        <label>
          <span className="klabel">
            耦合力度 <em>κ</em>
            <output>{gain.toFixed(2)}</output>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={gain}
            disabled={engine.locked}
            onChange={(e) => {
              engine.setGain(parseFloat(e.target.value))
              setGain(engine.gain)
            }}
          />
        </label>
      </div>
      <p className="status" role="status" aria-live="polite">
        {STATUS_TEXT[status]}
      </p>
      {!engine.locked && (
        <button type="button" className="btn" onClick={() => engine.requestAutoTune()}>
          不想找了，替我调好
        </button>
      )}
    </div>
  )
}
