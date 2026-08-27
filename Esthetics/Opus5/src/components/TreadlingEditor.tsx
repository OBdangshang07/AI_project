import { useEffect, useRef, useState } from 'react'
import { TREADLES, TREADLING_PRESETS, TREADLING_STEPS } from '../loom/draft'
import type { LoomEngine } from '../loom/LoomEngine'

type Props = {
  value: number[]
  onChange: (seq: number[]) => void
  engineRef: React.RefObject<LoomEngine | null>
  live: boolean
}

/**
 * Act III — the treadling draft, drawn the way weavers have drawn it for
 * centuries: one filled square per pick, telling you which treadle. Exactly
 * one per row, so it is a stack of radio groups, not a checkbox field.
 *
 * A single tab stop; arrows move in two dimensions; space commits. The row
 * currently under the shuttle is ringed in madder, live.
 */
export function TreadlingEditor({ value, onChange, engineRef, live }: Props) {
  const [cursor, setCursor] = useState({ r: 0, c: value[0] ?? 0 })
  const [step, setStep] = useState(-1)
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!live) {
      setStep(-1)
      return
    }
    const id = window.setInterval(() => {
      const e = engineRef.current
      if (!e) return
      setStep(e.wovenPicks > 0 ? (e.wovenPicks - 1) % TREADLING_STEPS : -1)
    }, 110)
    return () => window.clearInterval(id)
  }, [live, engineRef])

  const set = (r: number, c: number) => {
    if (value[r] === c) return
    const next = value.slice()
    next[r] = c
    onChange(next)
  }

  const focusCell = (r: number, c: number) => {
    setCursor({ r, c })
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-rc="${r}-${c}"]`)?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const { r, c } = cursor
    const m = TREADLING_STEPS
    switch (e.key) {
      case 'ArrowUp':
        focusCell((r - 1 + m) % m, c)
        break
      case 'ArrowDown':
        focusCell((r + 1) % m, c)
        break
      case 'ArrowLeft':
        focusCell(r, (c - 1 + TREADLES) % TREADLES)
        break
      case 'ArrowRight':
        focusCell(r, (c + 1) % TREADLES)
        break
      case 'Home':
        focusCell(r, 0)
        break
      case 'End':
        focusCell(r, TREADLES - 1)
        break
      case ' ':
      case 'Enter':
        set(r, c)
        break
      default:
        return
    }
    e.preventDefault()
  }

  return (
    <div className="treadling">
      <div className="treadling__head">
        <span>TREADLING · {TREADLING_STEPS}×{TREADLES}</span>
        <span aria-hidden="true">踏板 →</span>
      </div>

      <div
        className="treadling__grid"
        ref={gridRef}
        role="grid"
        aria-label={`纬序：${TREADLING_STEPS} 步，每步选一个踏板`}
        onKeyDown={onKeyDown}
      >
        {value.slice(0, TREADLING_STEPS).map((sel, r) => (
          <div key={r} role="row" style={{ display: 'contents' }}>
            <span className="treadling__rownum" role="rowheader" aria-hidden="true">
              {r + 1}
            </span>
            {Array.from({ length: TREADLES }, (_, c) => (
              <button
                key={c}
                type="button"
                role="radio"
                data-rc={`${r}-${c}`}
                data-woven={step === r ? '1' : undefined}
                className="tcell"
                aria-checked={sel === c}
                aria-label={`第 ${r + 1} 纬 · 踏板 ${c + 1}`}
                tabIndex={cursor.r === r && cursor.c === c ? 0 : -1}
                onFocus={() => setCursor({ r, c })}
                onClick={() => set(r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="treadling__foot">
        <span aria-hidden="true">纬 ↓</span>
        <span>
          {TREADLING_PRESETS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className="treadling__preset"
              style={{ marginLeft: i ? 9 : 0 }}
              onClick={() => onChange(p.seq.slice())}
            >
              {p.name}
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}
