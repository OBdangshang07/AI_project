import { useEffect, useMemo, useState } from 'react'
import { encodeDraft, nameCloth, type Draft } from '../loom/draft'
import type { LoomEngine } from '../loom/LoomEngine'

type Props = {
  draft: Draft
  engineRef: React.RefObject<LoomEngine | null>
  flipped: boolean
  edits: number
  active: boolean
}

/**
 * Act VI — the cloth leaves. Named deterministically from the draft, so the
 * same choices always make the same cloth, and different choices never do.
 * The PNG is generated from the very offscreen canvas the loom wove into;
 * nothing is re-drawn for export, and nothing leaves the browser.
 */
export function Artifact({ draft, engineRef, flipped, edits, active }: Props) {
  const [saved, setSaved] = useState(false)
  const [thumb, setThumb] = useState('')
  const [learned, setLearned] = useState(false)
  const id = useMemo(() => nameCloth(draft), [draft])
  const code = useMemo(() => encodeDraft(draft), [draft])

  // The cloth has left the loom, so it appears here instead — a specimen,
  // taken from the very offscreen canvas the machine wove into.
  useEffect(() => {
    if (!active) return
    const grab = () => {
      const e = engineRef.current
      if (!e) return
      setThumb(e.clothThumb(300))
      setLearned(e.telemetry.learned)
    }
    grab()
    const id2 = window.setInterval(grab, 900)
    return () => window.clearInterval(id2)
  }, [active, engineRef, draft, flipped])

  const take = () => {
    const engine = engineRef.current
    if (!engine) return
    const url = engine.exportCloth()
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = `loom-${id.name}-${id.code}${flipped ? '-reverse' : ''}.png`
    a.click()
    setSaved(true)
  }

  return (
    <figure className="artifact">
      <div className="artifact__top">
        {thumb ? (
          <img className="artifact__specimen" src={thumb} alt="你织出的这块布" />
        ) : (
          <span className="artifact__specimen is-empty" aria-hidden="true" />
        )}
        <div className="artifact__id">
          <span className="artifact__glyph" aria-hidden="true">
            {id.name}
          </span>
          <span className="artifact__meta">
            <span>
              NO. <b>{id.code}</b>
            </span>
            <span>{code}</span>
            <span>{flipped ? '背面' : '正面'}</span>
          </span>
        </div>
      </div>

      <figcaption className="artifact__acts">
        <span>
          读法 <b>{draft.threading.name}</b>
          {draft.threading.id === 'mine' ? '（你自己找到的那种）' : ''}
        </span>
        <span>踏板序列 {edits > 0 ? `被你改过 ${edits} 次` : '沿用了默认'}</span>
        <span>{learned ? '有一段错行被拆掉重织过' : '没有拆过'}</span>
      </figcaption>

      <button type="button" className="btn-take" onClick={take} disabled={!thumb}>
        {saved ? '已带走 · 再存一次' : '带走这块布 (PNG)'}
      </button>
    </figure>
  )
}
