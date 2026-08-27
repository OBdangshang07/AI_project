import { useCallback, useEffect, useState } from 'react';
import { playReveal, playStrike } from '../lib/audio';
import type { Line, Word } from '../lib/text';

interface StrikeState {
  struck: Set<number>;
  total: number;
  struckCount: number;
  complete: boolean;
  revealed: boolean;
}

function flatten(lines: Line[]): Word[] {
  const out: Word[] = [];
  for (const l of lines) for (const w of l) out.push(w);
  return out;
}

export function useStrikeState(lines: Line[]) {
  const flat = flatten(lines);
  const noiseIndices = flat
    .map((w, i) => (w.noise ? i : -1))
    .filter((i) => i >= 0);
  const total = noiseIndices.length;
  const [struck, setStruck] = useState<Set<number>>(() => new Set());
  const [revealed, setRevealed] = useState<boolean>(false);

  const strike = useCallback(
    (idx: number) => {
      const w = flat[idx];
      if (!w?.noise) return;
      setStruck((prev) => {
        if (prev.has(idx)) return prev;
        const next = new Set(prev);
        next.add(idx);
        playStrike();
        return next;
      });
    },
    [flat],
  );

  useEffect(() => {
    if (struck.size === total && total > 0 && !revealed) {
      const t = window.setTimeout(() => {
        setRevealed(true);
        playReveal();
      }, 720);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [struck.size, total, revealed]);

  const reset = useCallback(() => {
    setStruck(new Set());
    setRevealed(false);
  }, []);

  const state: StrikeState = {
    struck,
    total,
    struckCount: struck.size,
    complete: total > 0 && struck.size === total,
    revealed,
  };

  return { state, strike, reset };
}
