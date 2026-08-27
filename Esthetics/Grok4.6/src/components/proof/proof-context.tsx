import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { InkField } from "@/lib/proof/ink-field";
import { replyToQuery, wordIndex } from "@/lib/proof/content";

export type Annotation = {
  id: string;
  wordId: string;
  note: string;
  clicks: number;
  createdAt: number;
};

type ProofContextValue = {
  ink: InkField;
  reduced: boolean;
  annotations: Record<string, Annotation>;
  annotate: (wordId: string) => void;
  registerWord: (id: string, el: HTMLElement | null) => void;
  registerNote: (id: string, el: HTMLElement | null) => void;
  wordEls: MutableRefObject<Map<string, HTMLElement>>;
  noteEls: MutableRefObject<Map<string, HTMLElement>>;
  titleEl: MutableRefObject<HTMLElement | null>;
  padEl: MutableRefObject<HTMLElement | null>;
  query: { q: string; a: string } | null;
  submitQuery: (q: string) => void;
  hasMarked: boolean;
  markTouched: () => void;
  replyKind: string | null;
  setReplyKind: (k: string | null) => void;
  idleNote: string | null;
  setIdleNote: (n: string | null) => void;
};

const ProofContext = createContext<ProofContextValue | null>(null);

export function ProofProvider({
  children,
  reduced,
}: {
  children: ReactNode;
  reduced: boolean;
}) {
  const ink = useMemo(() => new InkField(), []);
  ink.reduced = reduced;

  const [annotations, setAnnotations] = useState<Record<string, Annotation>>(
    {},
  );
  const [query, setQuery] = useState<{ q: string; a: string } | null>(null);
  const [hasMarked, setHasMarked] = useState(false);
  const [replyKind, setReplyKind] = useState<string | null>(null);
  const [idleNote, setIdleNote] = useState<string | null>(null);

  const wordEls = useRef(new Map<string, HTMLElement>());
  const noteEls = useRef(new Map<string, HTMLElement>());
  const titleEl = useRef<HTMLElement | null>(null);
  const padEl = useRef<HTMLElement | null>(null);

  const markTouched = useCallback(() => setHasMarked(true), []);

  const registerWord = useCallback((id: string, el: HTMLElement | null) => {
    if (el) wordEls.current.set(id, el);
    else wordEls.current.delete(id);
  }, []);

  const registerNote = useCallback((id: string, el: HTMLElement | null) => {
    if (el) noteEls.current.set(id, el);
    else noteEls.current.delete(id);
  }, []);

  const annotate = useCallback((wordId: string) => {
    const part = wordIndex[wordId];
    if (!part?.notes?.length) return;
    setAnnotations((prev) => {
      const existing = prev[wordId];
      const clicks = (existing?.clicks ?? 0) + 1;
      const note =
        part.notes![Math.min(clicks - 1, part.notes!.length - 1)] ??
        part.notes![0];
      return {
        ...prev,
        [wordId]: {
          id: wordId,
          wordId,
          note,
          clicks,
          createdAt: existing?.createdAt ?? performance.now(),
        },
      };
    });
    setHasMarked(true);
  }, []);

  const submitQuery = useCallback((q: string) => {
    const a = replyToQuery(q);
    setQuery({ q: q.trim(), a });
    setHasMarked(true);
    try {
      localStorage.setItem(
        "second-pen-query",
        JSON.stringify({ q: q.trim(), a }),
      );
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      ink,
      reduced,
      annotations,
      annotate,
      registerWord,
      registerNote,
      wordEls,
      noteEls,
      titleEl,
      padEl,
      query,
      submitQuery,
      hasMarked,
      markTouched,
      replyKind,
      setReplyKind,
      idleNote,
      setIdleNote,
    }),
    [
      ink,
      reduced,
      annotations,
      annotate,
      registerWord,
      registerNote,
      query,
      submitQuery,
      hasMarked,
      markTouched,
      replyKind,
      idleNote,
    ],
  );

  return (
    <ProofContext.Provider value={value}>{children}</ProofContext.Provider>
  );
}

export function useProof() {
  const ctx = useContext(ProofContext);
  if (!ctx) throw new Error("useProof must be used within ProofProvider");
  return ctx;
}
