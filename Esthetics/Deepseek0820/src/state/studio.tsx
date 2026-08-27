import { useCallback, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { FieldEngine } from '../field/FieldEngine';
import { QUESTIONS } from '../field/acts';
import type { Choices } from '../field/glyph';
import { play, setSound, haptic } from '../lib/sound';
import { StudioCtx } from './studio-context';
import type { Studio } from './studio-context';

/* ---------------------------------------------------------------------------
   One small store. The continuous state (scroll → field) never passes through
   React: it goes straight from the sampler into the engine. React only holds
   discrete state — which act, which answers, which switches — so nothing here
   re-renders at 60fps.
--------------------------------------------------------------------------- */

export function StudioProvider({ children }: { children: ReactNode }) {
  const engine = useRef<FieldEngine | null>(null);
  const [act, setAct] = useState(0);
  const [choices, setChoices] = useState<Choices>([null, null, null]);
  const [sound, setSoundOn] = useState(false);
  const [drafts, setDrafts] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [message, setMessage] = useState('');

  const announce = useCallback((m: string) => setMessage(m), []);

  const choose = useCallback((i: number, side: 0 | 1) => {
    setChoices((prev) => {
      if (prev[i] !== null) return prev;
      const next = prev.slice() as Choices;
      next[i] = side;
      return next;
    });
    engine.current?.commit(i, side);
    play('commit');
    haptic(14);
    const opt = QUESTIONS[i]?.opts[side];
    if (opt) announce(`已选择：${opt.zh}。这一笔已经织进画面。`);
  }, [announce]);

  const reset = useCallback(() => {
    setChoices([null, null, null]);
    engine.current?.reset();
    announce('画面已清空，可以重新开始。');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [announce]);

  const toggleSound = useCallback(() => {
    setSoundOn((s) => {
      const next = !s;
      setSound(next);
      if (next) play('commit');     // hear it the moment you ask for it
      return next;
    });
  }, []);

  const toggleDrafts = useCallback(() => setDrafts((d) => !d), []);

  const value = useMemo<Studio>(() => ({
    engine, act, setAct, choices, choose, reset,
    sound, toggleSound, drafts, toggleDrafts, reduced, setReduced,
    message, announce,
  }), [act, choices, choose, reset, sound, toggleSound, drafts, toggleDrafts, reduced, message, announce]);

  return <StudioCtx.Provider value={value}>{children}</StudioCtx.Provider>;
}
