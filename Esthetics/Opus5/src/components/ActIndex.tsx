import { ACTS, type ActId } from '../scroll/score'

/** A table of contents for a machine's working day. Also the only navigation. */
export function ActIndex({ act }: { act: ActId }) {
  return (
    <nav className="index" aria-label="幕次">
      {ACTS.map((a) => (
        <a
          key={a.id}
          className="index__item"
          href={`#act-${a.id}`}
          aria-current={a.id === act}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(`act-${a.id}`)?.scrollIntoView({ block: 'start' })
          }}
        >
          <span>
            {a.num}
            <i className="index__tick" />
          </span>
          <span>{a.name}</span>
        </a>
      ))}
    </nav>
  )
}
