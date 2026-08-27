import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import type { LoomEngine } from '../loom/LoomEngine'
import { warpShare, type Draft } from '../loom/draft'

type Props = {
  engineRef: React.RefObject<LoomEngine | null>
  draft: Draft
}

const STATE_LABEL: Record<string, string> = {
  warping: '绷经 WARPING',
  weaving: '织 WEAVING',
  unweaving: '拆 UNWEAVING',
  idle: '待机 IDLE',
  stopped: '停机 STOPPED',
  cut: '落布 CUT',
}

/**
 * The machine's status strip. Written to directly from the ticker at ~8Hz —
 * React does not re-render for this. It exists because a machine that tells
 * you what it is doing is more trustworthy than one that does not, and
 * because the warp/weft split is the thesis of the whole piece stated as a
 * number.
 */
export function Telemetry({ engineRef, draft }: Props) {
  const pick = useRef<HTMLSpanElement | null>(null)
  const ends = useRef<HTMLSpanElement | null>(null)
  const treadle = useRef<HTMLSpanElement | null>(null)
  const span = useRef<HTMLSpanElement | null>(null)
  const hz = useRef<HTMLSpanElement | null>(null)
  const state = useRef<HTMLSpanElement | null>(null)
  const barWarp = useRef<HTMLElement | null>(null)
  const barWeft = useRef<HTMLElement | null>(null)
  const shareTxt = useRef<HTMLSpanElement | null>(null)

  const share = useMemo(() => {
    const e = engineRef.current
    return warpShare(draft, e?.ends || 78)
  }, [draft, engineRef])

  useEffect(() => {
    const pct = share * 100
    if (barWarp.current) barWarp.current.style.transform = `scaleX(${share})`
    if (barWeft.current) {
      barWeft.current.style.transform = `scaleX(${1 - share})`
      barWeft.current.style.transformOrigin = 'right'
      barWeft.current.style.left = 'auto'
      barWeft.current.style.right = '0'
    }
    if (shareTxt.current) {
      shareTxt.current.textContent = `你 ${pct.toFixed(1)} · 我 ${(100 - pct).toFixed(1)}`
    }
  }, [share])

  useEffect(() => {
    let f = 0
    let lastState = ''
    const tick = () => {
      if (++f % 7) return
      const e = engineRef.current
      if (!e) return
      const t = e.telemetry
      if (pick.current) pick.current.textContent = `${String(t.picks).padStart(3, '0')}/${t.rows}`
      if (ends.current) ends.current.textContent = String(t.ends)
      if (treadle.current) treadle.current.textContent = String(t.treadle + 1)
      if (span.current) span.current.textContent = `${t.spanPx}px`
      if (hz.current) hz.current.textContent = `${t.hz}`
      if (state.current && lastState !== t.state) {
        lastState = t.state
        state.current.textContent = STATE_LABEL[t.state] ?? t.state
        state.current.dataset.state = t.state
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [engineRef])

  return (
    <div className="telemetry" role="status" aria-label="织机状态">
      <span className="telemetry__cell">
        <span className="telemetry__k">纬 PICK</span>
        <span className="telemetry__v" ref={pick}>
          000/00
        </span>
      </span>
      <span className="telemetry__cell is-optional">
        <span className="telemetry__k">幅 ENDS</span>
        <span className="telemetry__v" ref={ends}>
          –
        </span>
      </span>
      <span className="telemetry__cell is-optional">
        <span className="telemetry__k">踏 TREADLE</span>
        <span className="telemetry__v" ref={treadle}>
          –
        </span>
      </span>
      <span className="telemetry__cell is-optional">
        <span className="telemetry__k">张 SPAN</span>
        <span className="telemetry__v" ref={span}>
          –
        </span>
      </span>
      <span className="telemetry__cell is-optional">
        <span className="telemetry__k">音 HZ</span>
        <span className="telemetry__v" ref={hz}>
          –
        </span>
      </span>

      <span className="telemetry__spacer" />

      <span className="telemetry__cell" title="布面上经与纬各占的比例">
        <span className="telemetry__k">面 SHARE</span>
        <span className="telemetry__v" ref={shareTxt}>
          –
        </span>
      </span>
      <span className="telemetry__bar" aria-hidden="true">
        <i ref={barWarp} />
        <i className="is-weft" ref={barWeft} />
      </span>
      <span className="telemetry__cell">
        <span className="telemetry__v" ref={state}>
          绷经 WARPING
        </span>
      </span>
    </div>
  )
}
