import { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { FieldEngine } from '../field/FieldEngine';
import type { Choices } from '../field/glyph';

/* The store's shape and its reader live apart from the provider component, so
   the module boundary stays clean (and fast refresh keeps working). */

export type Studio = {
  engine: RefObject<FieldEngine | null>;
  act: number;
  setAct: (n: number) => void;
  choices: Choices;
  choose: (i: number, side: 0 | 1) => void;
  reset: () => void;
  sound: boolean;
  toggleSound: () => void;
  drafts: boolean;
  toggleDrafts: () => void;
  reduced: boolean;
  setReduced: (v: boolean) => void;
  message: string;
  announce: (m: string) => void;
};

export const StudioCtx = createContext<Studio | null>(null);

export function useStudio(): Studio {
  const v = useContext(StudioCtx);
  if (!v) throw new Error('useStudio must be used inside <StudioProvider>');
  return v;
}
