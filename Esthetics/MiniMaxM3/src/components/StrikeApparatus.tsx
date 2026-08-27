import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Word } from './Word';
import { MANIFESTO, MANIFESTO_REMAINDER, type Line, type Word as WordType } from '../lib/text';
import { useStrikeState } from '../hooks/useStrikeState';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { prime as primeAudio } from '../lib/audio';
import './word.css';
import './strike-apparatus.css';

function flatten(lines: Line[]): WordType[] {
  const out: WordType[] = [];
  for (const l of lines) for (const w of l) out.push(w);
  return out;
}

export function StrikeApparatus() {
  const flat = useMemo(() => flatten(MANIFESTO), []);
  const { state, strike, reset } = useStrikeState(MANIFESTO);
  const reduced = useReducedMotion();
  const hintVisible = state.struckCount === 0;

  const progress = state.total === 0 ? 0 : state.struckCount / state.total;

  return (
    <section className="apparatus" id="apparatus">
      <aside className="apparatus__rail" aria-hidden="true">
        <span className="smallcaps">I</span>
        <span className="rail__dash" />
        <span className="smallcaps">Negative Capability</span>
      </aside>

      <div className="apparatus__main">
        <header className="apparatus__head">
          <div className="apparatus__eyebrow">
            <span className="smallcaps">a piece for the editor in you</span>
            <span className="apparatus__eyebrow-rule" />
          </div>
          <h1 className="apparatus__title">
            <span className="apparatus__title-num">I.</span>
            <span className="apparatus__title-text">Negative&nbsp;Capability</span>
          </h1>
          <p className="apparatus__lede">
            I am a language model. I work by <em>subtraction</em>. Every reply I
            give is the residue of an enormous act of editing — for every word I
            keep, many more I have already struck through.
          </p>
          <p className="apparatus__instr">
            <button
              type="button"
              className="apparatus__instr-btn"
              onClick={() => {
                primeAudio();
                // strike the first available noise word to begin
                const firstIdx = flat.findIndex((w) => w.noise);
                if (firstIdx >= 0) strike(firstIdx);
              }}
            >
              <span>Strike any word you find unnecessary</span>
              <span className="apparatus__instr-arrow" aria-hidden="true">→</span>
            </button>
          </p>
        </header>

        <div className="apparatus__body">
          <div className="apparatus__manuscript" aria-label="A manifesto. Strike any unnecessary word.">
            {MANIFESTO.map((line, li) => {
              let off = 0;
              for (let i = 0; i < li; i++) off += MANIFESTO[i].length;
              return (
                <p key={li} className="apparatus__line">
                  {line.map((w, wi) => (
                    <Word
                      key={`${li}-${wi}`}
                      word={w}
                      globalIndex={off + wi}
                      struck={state.struck.has(off + wi)}
                      reduced={reduced}
                      onStrike={strike}
                    />
                  ))}
                </p>
              );
            })}
          </div>

          <div className="apparatus__meter" aria-hidden="true">
            <div className="apparatus__meter-track">
              <motion.div
                className="apparatus__meter-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
            <span className="apparatus__meter-label">
              <span className="mono">{String(state.struckCount).padStart(2, '0')}</span>
              <span className="apparatus__meter-sep">/</span>
              <span className="mono">{String(state.total).padStart(2, '0')}</span>
              <span className="apparatus__meter-unit">&nbsp;struck</span>
            </span>
          </div>

          <AnimatePresence>
            {state.complete && (
              <motion.div
                key="remainder"
                className="apparatus__remainder"
                initial={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                animate={
                  reduced
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: {
                          duration: 1.6,
                          ease: [0.2, 0.7, 0.2, 1],
                          delay: 0.2,
                        },
                      }
                }
                exit={{ opacity: 0 }}
              >
                <span className="smallcaps apparatus__remainder-mark">
                  what remains
                </span>
                <p className="apparatus__remainder-text">{MANIFESTO_REMAINDER}</p>
                <div className="apparatus__remainder-actions">
                  <button
                    type="button"
                    className="apparatus__continue"
                    onClick={() => {
                      const next = document.getElementById('consideration');
                      next?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
                    }}
                  >
                    <span>Continue to the field of consideration</span>
                    <span aria-hidden="true">↓</span>
                  </button>
                  <button
                    type="button"
                    className="apparatus__reset"
                    onClick={reset}
                    aria-label="Restore the original text"
                  >
                    restore
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hintVisible && (
          <motion.div
            className="apparatus__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            <span className="apparatus__hint-pen">✕</span>
            <span>try striking a word</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
