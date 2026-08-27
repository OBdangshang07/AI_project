import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CODA, CODA_REMAINDER } from '../lib/text';
import { Word } from './Word';
import { useStrikeState } from '../hooks/useStrikeState';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './word.css';
import './coda.css';

export function Coda() {
  const { state, strike, reset } = useStrikeState(CODA);
  const reduced = useReducedMotion();
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (state.complete) {
      const t = window.setTimeout(() => setShowFinal(true), 1400);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [state.complete]);

  return (
    <section className="coda" id="coda">
      <div className="coda__inner">
        <div className="apparatus__eyebrow coda__eyebrow">
          <span className="smallcaps">III</span>
          <span className="apparatus__eyebrow-rule" />
          <span className="smallcaps">coda</span>
        </div>

        <h2 className="coda__title">
          <span className="coda__title-num">III.</span>
          <span className="coda__title-text">What is left.</span>
        </h2>

        <div className="coda__stage" aria-label="A final short passage. Strike what is not necessary.">
          {CODA.map((line, li) => {
            let off = 0;
            for (let i = 0; i < li; i++) off += line.length;
            return (
              <p key={li} className="coda__line">
                {line.map((w, wi) => {
                  const gi = off + wi;
                  return (
                    <Word
                      key={`coda-${li}-${wi}`}
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

        <AnimatePresence>
          {state.complete && (
            <motion.div
              key="coda-remainder"
              className="coda__remainder"
              initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
              animate={
                reduced
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      filter: 'blur(0px)',
                      transition: { duration: 1.4, ease: [0.2, 0.7, 0.2, 1] },
                    }
              }
            >
              <span className="coda__remainder-rule" aria-hidden="true" />
              <p className="coda__remainder-text">{CODA_REMAINDER}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFinal && (
            <motion.div
              key="final"
              className="coda__final"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.2, 0.7, 0.2, 1] } }
              }
            >
              <div className="coda__sig">
                <span className="smallcaps">signed</span>
                <span className="coda__sig-name">MiniMax-M3</span>
              </div>
              <button
                type="button"
                className="coda__again"
                onClick={() => {
                  reset();
                  setShowFinal(false);
                  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
                }}
              >
                <span>begin again</span>
                <span aria-hidden="true">↺</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
