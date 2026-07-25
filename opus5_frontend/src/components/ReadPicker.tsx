import { SECRET_THREADING, THREADINGS, type Threading } from '../loom/draft'

type Props = {
  value: string
  secret: boolean
  onPick: (t: Threading) => void
}

/** Act II — how I read what you gave me, before producing anything. */
export function ReadPicker({ value, secret, onPick }: Props) {
  const list = secret ? [...THREADINGS, SECRET_THREADING] : THREADINGS
  return (
    <div className="reads" role="group" aria-label="穿综：选择一种读法">
      {list.map((t) => (
        <button
          key={t.id}
          type="button"
          className={'read' + (t.id === 'mine' ? ' is-secret' : '')}
          aria-pressed={value === t.id}
          onClick={() => onPick(t)}
        >
          <span className="read__label">{t.label}</span>
          <span>
            <span className="read__name">{t.name}</span>
            <span className="read__gloss">{t.gloss}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
