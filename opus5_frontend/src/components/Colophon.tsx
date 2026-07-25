import { COLOPHON, MASTHEAD } from '../content/copy'

/**
 * A colophon, not a footer. A woven piece is traditionally documented: what
 * it is made of, on what, by whom, and — the part most sites hide — what was
 * refused. Every conspicuous decision in this piece is answered for here.
 */
export function Colophon() {
  return (
    <footer className="colophon" id="colophon">
      <div className="colophon__inner">
        <h2 className="colophon__title">{COLOPHON.title}</h2>

        <div className="spec">
          {COLOPHON.rows.map(([k, v]) => (
            <div className="spec__row" key={k}>
              <div className="spec__k">{k}</div>
              <p className="spec__v">{v}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="spec__k" style={{ marginBottom: 10 }}>
            主动不做的三件事
          </h3>
          <div className="spec spec--no">
            {COLOPHON.refusals.map(([k, v]) => (
              <div className="spec__row" key={k}>
                <div className="spec__k">{k}</div>
                <p className="spec__v">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="colophon__end">
          <span>
            {MASTHEAD.glyph} {MASTHEAD.latin} — {MASTHEAD.sub}
          </span>
          <span>{MASTHEAD.by}</span>
        </div>
      </div>
    </footer>
  )
}
