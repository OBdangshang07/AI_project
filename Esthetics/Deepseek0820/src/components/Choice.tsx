import { useId } from 'react';
import { QUESTIONS } from '../field/acts';
import { useStudio } from '../state/studio-context';

/* ---------------------------------------------------------------------------
   ACT III — 共作 / the fork
   Three irreversible questions. Choosing does four things at once:
     · prints a vermilion strand into the device, permanently
     · plucks the whole field sideways (physical feedback)
     · re-tunes the field's resting parameters for the rest of the visit
     · writes one clause of the sentence this page ends with
   The option you drop is struck through rather than removed — it went to the
   back of the sheet, which is the whole argument of the piece.
--------------------------------------------------------------------------- */

export function Choice() {
  const { choices, choose } = useStudio();
  const base = useId();

  return (
    <div className="choice">
      {QUESTIONS.map((q, i) => {
        const answered = choices[i] !== null;
        const qid = `${base}-q${i}`;
        return (
          <div className="choice" key={q.q} role="group" aria-labelledby={qid}>
            <p className="choice__q" id={qid}>
              <i>{String(i + 1).padStart(2, '0')}</i>
              <span>{q.q}</span>
            </p>
            <div className="choice__opts">
              {q.opts.map((o, side) => {
                const state = !answered ? 'idle' : choices[i] === side ? 'chosen' : 'dropped';
                return (
                  <button
                    key={o.zh}
                    type="button"
                    className="opt"
                    data-state={state}
                    aria-disabled={answered}
                    onClick={() => !answered && choose(i, side as 0 | 1)}
                  >
                    <span className="opt__zh">{o.zh}</span>
                    <span className="opt__en" lang={state === 'dropped' ? 'zh-CN' : 'en'}>
                      {state === 'dropped' ? '退到纸背' : o.en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="choice__trace">
        {choices.every((c) => c === null) && <span>你的选择会留在这张纸上 · your marks stay here</span>}
        {choices.map((c, i) =>
          c === null ? null : (
            <span key={i}>
              {String(i + 1).padStart(2, '0')} <b>{QUESTIONS[i].opts[c].zh}</b>
            </span>
          ),
        )}
      </p>
    </div>
  );
}
