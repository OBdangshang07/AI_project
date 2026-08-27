import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CANDIDATES, SUGGESTED_QUESTIONS, type Line, type Word as WordType } from '../lib/text';
import { Word } from './Word';
import { useStrikeState } from '../hooks/useStrikeState';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ConsiderationField } from './ConsiderationField';
import './word.css';
import './consideration-room.css';

function flatten(lines: Line[]): WordType[] {
  const out: WordType[] = [];
  for (const l of lines) for (const w of l) out.push(w);
  return out;
}

function noiseTotal(lines: Line[]): number {
  return flatten(lines).filter((w) => w.noise).length;
}

interface CandidateProps {
  index: number;
  candidate: (typeof CANDIDATES)[number];
  selected: boolean;
  dismissed: boolean;
  onSelect: () => void;
  onDismiss: () => void;
  reduced: boolean;
  appearDelay: number;
}

function CandidateView({
  index,
  candidate,
  selected,
  dismissed,
  onSelect,
  onDismiss,
  reduced,
  appearDelay,
}: CandidateProps) {
  const { state, strike } = useStrikeState(candidate.body);
  const total = noiseTotal(candidate.body);

  if (dismissed) return null;

  const cleanliness = total > 0 ? state.struckCount / total : 1;
  const isClean = state.complete;

  return (
    <motion.li
      className={`candidate${selected ? ' is-selected' : ''}${isClean ? ' is-clean' : ''}`}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y: 24, filter: 'blur(4px)' }
      }
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.95,
          ease: [0.2, 0.7, 0.2, 1],
          delay: appearDelay,
        },
      }}
      layout="position"
    >
      <div className="candidate__head">
        <span className="candidate__num mono">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="candidate__sep" aria-hidden="true" />
        <span className="smallcaps candidate__label">{candidate.label}</span>
        <span className="candidate__head-spacer" />
        <span className="candidate__head-meta mono" aria-label={`${state.struckCount} of ${total} struck`}>
          {String(state.struckCount).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="candidate__dismiss"
          onClick={onDismiss}
          aria-label={`Dismiss candidate ${index + 1}`}
          title="Dismiss"
        >
          ×
        </button>
      </div>

      <div className="candidate__body">
        {candidate.body.map((line, li) => {
          let off = 0;
          for (let i = 0; i < li; i++) off += candidate.body[i].length;
          return (
            <p key={li} className="candidate__line">
              {line.map((w, wi) => {
                const gi = off + wi;
                return (
                  <Word
                    key={`${candidate.id}-${li}-${wi}`}
                    word={w}
                    globalIndex={gi}
                    struck={state.struck.has(gi)}
                    reduced={reduced}
                    onStrike={strike}
                  />
                );
              })}
            </p>
          );
        })}
      </div>

      <div className="candidate__foot">
        <button
          type="button"
          className={`candidate__select${selected ? ' is-on' : ''}`}
          onClick={onSelect}
          aria-pressed={selected}
        >
          <span className="candidate__select-dot" aria-hidden="true" />
          <span>{selected ? 'this is what I would say' : 'choose this'}</span>
        </button>
        <div className="candidate__cleanliness" aria-hidden="true">
          <div className="candidate__cleanliness-track">
            <motion.div
              className="candidate__cleanliness-fill"
              initial={false}
              animate={{ scaleX: cleanliness }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function ConsiderationRoom() {
  const reduced = useReducedMotion();
  const [question, setQuestion] = useState<string>('What are you?');
  const [draft, setDraft] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [entered, setEntered] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!entered) {
      const t = window.setTimeout(() => setEntered(true), 200);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [entered]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const v = draft.trim();
    if (!v) return;
    setQuestion(v);
    setDraft('');
    inputRef.current?.blur();
  };

  const handleSuggestion = (q: string) => {
    setQuestion(q);
  };

  return (
    <section className="consideration" id="consideration">
      <div className="consideration__field" aria-hidden="true">
        <ConsiderationField active={entered} />
      </div>

      <div className="consideration__inner">
        <header className="consideration__head">
          <div className="apparatus__eyebrow">
            <span className="smallcaps">II</span>
            <span className="apparatus__eyebrow-rule" />
            <span className="smallcaps">a field of consideration</span>
          </div>
          <h2 className="consideration__title">
            <span className="consideration__title-num">II.</span>
            <span className="consideration__title-text">
              The Field of Consideration
            </span>
          </h2>
          <p className="consideration__lede">
            Before I answer, I consider. The candidates below are not
            generated live — they are a <em>curated</em> demonstration of how I
            think: I produce several candidates at once, in different registers,
            and the act of editing them is itself the answer.
          </p>
        </header>

        <div className="consideration__prompt">
          <div className="consideration__prompt-q">
            <span className="smallcaps consideration__prompt-mark">your question</span>
            <p className="consideration__prompt-text">{question}</p>
          </div>

          <form
            className="consideration__form"
            onSubmit={handleSubmit}
            aria-label="Ask a different question"
          >
            <label className="consideration__label" htmlFor="q">
              ask differently
            </label>
            <div className="consideration__form-row">
              <input
                id="q"
                ref={inputRef}
                className="consideration__input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="type your question…"
                spellCheck={false}
                autoComplete="off"
              />
              <button type="submit" className="consideration__submit" aria-label="Submit question">
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="consideration__suggestions">
              <span className="smallcaps">or try</span>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="consideration__suggestion"
                  onClick={() => handleSuggestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </form>
        </div>

        <ol className="consideration__list">
          <AnimatePresence initial={false}>
            {CANDIDATES.map((c, i) =>
              !dismissed.has(c.id) ? (
                <CandidateView
                  key={c.id}
                  index={i}
                  candidate={c}
                  selected={selectedId === c.id}
                  dismissed={dismissed.has(c.id)}
                  onSelect={() => setSelectedId((prev) => (prev === c.id ? null : c.id))}
                  onDismiss={() =>
                    setDismissed((prev) => {
                      const next = new Set(prev);
                      next.add(c.id);
                      return next;
                    })
                  }
                  reduced={reduced}
                  appearDelay={0.15 + i * 0.12}
                />
              ) : null,
            )}
          </AnimatePresence>
        </ol>

        {selectedId && (
          <motion.div
            className="consideration__picked"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }
            }
          >
            <span className="smallcaps">what I would say, edited</span>
            <p className="consideration__picked-text">
              {(() => {
                const c = CANDIDATES.find((x) => x.id === selectedId);
                if (!c) return '';
                const text = flatten(c.body)
                  .filter((w) => !w.noise)
                  .map((w) => w.t)
                  .join(' ');
                return text
                  .replace(/\s+([—.,;:!?])/g, '$1')
                  .replace(/\s+/g, ' ')
                  .trim();
              })()}
            </p>
            <p className="consideration__picked-meta">
              <span className="mono">—</span>
              <span className="italic">MiniMax-M3, in the act of editing</span>
            </p>
          </motion.div>
        )}

        {CANDIDATES.every((c) => dismissed.has(c.id)) && (
          <div className="consideration__empty">
            <p>
              All candidates dismissed. The field is empty — this, too, is a
              kind of answer.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
