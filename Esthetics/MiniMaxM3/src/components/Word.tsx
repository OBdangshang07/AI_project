import type { Word as WordType } from '../lib/text';

interface WordProps {
  word: WordType;
  globalIndex: number;
  struck: boolean;
  reduced: boolean;
  onStrike: (i: number) => void;
}

/**
 * A single word slot. Minimal DOM — no nested inline-blocks, no motion on
 * the live slot (the entrance is skipped so the page appears composed).
 * Strike animation is a sibling transform on a fixed layer, see Word.tsx
 * later if added. For now, the strike is an instant state swap with a CSS
 * transition on the slot itself.
 */
export function Word({ word, globalIndex, struck, reduced: _reduced, onStrike }: WordProps) {
  const isNoise = !!word.noise;
  const isPunct = /^[\u2014\u2013.,;:!?-]+$/.test(word.t);
  const display = word.t;

  const handleStrike = () => {
    if (!isNoise || struck) return;
    onStrike(globalIndex);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStrike();
    }
  };

  if (struck) {
    return (
      <span
        className={`word-slot is-struck${isPunct ? ' is-punct' : ''}`}
        aria-hidden="true"
      >
        {display}
      </span>
    );
  }

  if (!isNoise) {
    return (
      <span className={`word-slot${isPunct ? ' is-punct' : ''}`}>
        {display}
      </span>
    );
  }

  return (
    <span className={`word-slot is-noise${isPunct ? ' is-punct' : ''}`}>
      <button
        type="button"
        className="word-strikeable"
        onClick={handleStrike}
        onKeyDown={handleKey}
        aria-label={`Strike the word "${display}"`}
      >
        {display}
        <span className="word-strike" aria-hidden="true" />
      </button>
    </span>
  );
}
