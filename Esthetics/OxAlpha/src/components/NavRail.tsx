import { useState } from 'react'
import { audio } from '../sync/audio'

const ANCHORS = [
  { id: 'xu', label: '序' },
  { id: 'p1', label: '壹' },
  { id: 'p2', label: '贰' },
  { id: 'p3', label: '叁' },
  { id: 'coda', label: '终' },
]

export default function NavRail() {
  const [soundOn, setSoundOn] = useState(false)

  const toggleSound = () => {
    if (soundOn) {
      audio.disable()
      setSoundOn(false)
    } else {
      audio.enable()
      audio.pluck(3)
      setSoundOn(true)
    }
  }

  return (
    <nav className="rail" aria-label="章节">
      <span className="rail-brand" aria-hidden="true">
        同频 IN PHASE
      </span>
      <div className="rail-dots" role="list">
        {ANCHORS.map((a) => (
          <a key={a.id} href={`#${a.id}`} role="listitem" aria-label={`前往 ${a.label}`}>
            {a.label}
          </a>
        ))}
      </div>
      <button
        type="button"
        className="ghost-btn rail-sound"
        aria-pressed={soundOn}
        onClick={toggleSound}
      >
        {soundOn ? '声·开' : '声·关'}
      </button>
    </nav>
  )
}
