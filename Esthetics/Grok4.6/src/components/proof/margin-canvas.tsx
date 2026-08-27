import { useEffect, useRef } from "react";
import { idleNotes } from "@/lib/proof/content";
import { useProof } from "./proof-context";

export function MarginCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    ink,
    reduced,
    annotations,
    wordEls,
    noteEls,
    titleEl,
    padEl,
    markTouched,
    setReplyKind,
    idleNote,
    setIdleNote,
  } = useProof();

  const drawing = useRef(false);
  const lastPtr = useRef(0);
  const idleArmed = useRef(true);

  useEffect(() => {
    ink.onReply = (kind) => {
      setReplyKind(kind);
      markTouched();
      window.setTimeout(() => setReplyKind(null), 2200);
    };
    return () => {
      ink.onReply = null;
    };
  }, [ink, markTouched, setReplyKind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink.resize(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const syncGeometry = () => {
      const ids = new Set<string>();
      for (const [id, ann] of Object.entries(annotations)) {
        const word = wordEls.current.get(id);
        const note = noteEls.current.get(id);
        if (!word) continue;
        ids.add(id);
        const wr = word.getBoundingClientRect();
        ink.addCircle(
          id,
          wr.left + wr.width / 2,
          wr.top + wr.height / 2,
          wr.width / 2 + 7,
          wr.height / 2 + 6,
        );
        if (note) {
          const nr = note.getBoundingClientRect();
          ink.upsertThread(
            id,
            wr.right + 4,
            wr.top + wr.height * 0.55,
            nr.left + 2,
            nr.top + 10,
            ann.createdAt,
          );
        }
      }
      ink.removeOrphans(ids);
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      syncGeometry();
      ink.tick(dt, now);
      ink.draw(ctx);
      raf = requestAnimationFrame(loop);
    };

    const onVis = () => {
      ink.visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ink, annotations, wordEls, noteEls]);

  useEffect(() => {
    if (reduced) {
      ink.markEntered();
      return;
    }
    const t = window.setTimeout(() => {
      const el = titleEl.current;
      if (!el) {
        ink.markEntered();
        return;
      }
      const r = el.getBoundingClientRect();
      ink.enterTo(r.left + r.width * 0.62, r.bottom + 10);
      const path = [
        { x: r.left + 8, y: r.bottom + 6, t: 0, p: 0.6 },
        { x: r.left + r.width * 0.36, y: r.bottom + 10, t: 1, p: 0.7 },
        { x: r.left + r.width * 0.72, y: r.bottom + 8, t: 2, p: 0.55 },
        { x: r.right - 6, y: r.bottom + 5, t: 3, p: 0.5 },
      ];
      window.setTimeout(() => ink.queueWrite(path), 1200);
      window.setTimeout(() => ink.markEntered(), 2800);
    }, 700);
    return () => clearTimeout(t);
  }, [ink, reduced, titleEl]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      lastPtr.current = performance.now();
      ink.setPointer(e.clientX, e.clientY);
      if (drawing.current) ink.addUserPoint(e.clientX, e.clientY, e.timeStamp);
    };
    const onDown = (e: PointerEvent) => {
      lastPtr.current = performance.now();
      if (e.button !== 0) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-no-ink]")) return;
      if (t.closest("a, button, input, textarea, label")) return;
      const inPad = Boolean(t.closest("[data-ink-pad]"));
      const inEmpty =
        t.closest("[data-draw]") ||
        t === document.body ||
        t.dataset.desk === "true" ||
        inPad;
      const coarse =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      if (coarse && !inPad) return;
      if (!inEmpty && !t.closest(".sheet")) return;
      if (!inPad && t.closest(".proof-p, .title-row, .draft-line, .query-row"))
        return;
      drawing.current = true;
      idleArmed.current = false;
      ink.beginUserStroke(e.clientX, e.clientY, e.timeStamp);
      try {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const end = () => {
      if (!drawing.current) return;
      drawing.current = false;
      ink.endUserStroke();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [ink]);

  useEffect(() => {
    if (reduced || idleNote) return;
    const id = window.setInterval(() => {
      if (!idleArmed.current) return;
      if (performance.now() - lastPtr.current < 8000) return;
      if (document.visibilityState !== "visible") return;
      idleArmed.current = false;
      const note = idleNotes[Math.floor(Math.random() * idleNotes.length)];
      setIdleNote(note);
      const pad = padEl.current;
      const padRect = pad?.getBoundingClientRect();
      const padOnScreen =
        padRect && padRect.top < window.innerHeight && padRect.bottom > 0;
      const x = padOnScreen ? padRect.left + 48 : window.innerWidth * 0.78;
      const y = padOnScreen ? padRect.top + 36 : window.innerHeight * 0.36;
      ink.queueWrite([
        { x, y, t: 0, p: 0.6 },
        { x: x + 64, y: y + 3, t: 1, p: 0.5 },
      ]);
    }, 1200);
    return () => clearInterval(id);
  }, [ink, reduced, idleNote, padEl, setIdleNote]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  );
}
