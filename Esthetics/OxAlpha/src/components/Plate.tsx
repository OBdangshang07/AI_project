import type { ReactNode } from 'react'
import { useEngineVersion } from '../sync/react'

/** 图版外壳：版号 + 小仪表 + 标题 + 会随序参量"站直"的墨线。 */
export default function Plate({
  id,
  num,
  title,
  children,
}: {
  id: string
  num: string
  title: string
  children: ReactNode
}) {
  useEngineVersion()
  return (
    <section id={id} className="plate" data-section aria-labelledby={`${id}-t`}>
      <header className="phead">
        <span className="ptag">
          图版 · {num}
          <svg className="mini" viewBox="0 0 20 12" aria-hidden="true">
            <path d="M2 10 A8 8 0 0 1 18 10" fill="none" stroke="#8d8271" strokeWidth="1" />
            <line className="mini-n" x1="10" y1="10" x2="10" y2="3.5" stroke="#b3402a" strokeWidth="1.4" />
          </svg>
        </span>
        <h2 id={`${id}-t`}>{title}</h2>
        <i className="rule" aria-hidden="true" />
      </header>
      {children}
    </section>
  )
}
