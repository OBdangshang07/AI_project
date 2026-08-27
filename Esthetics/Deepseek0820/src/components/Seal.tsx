import { useEffect, useRef } from 'react';
import { drawGlyph, codeFor } from '../field/glyph';
import { useStudio } from '../state/studio-context';

/**
 * The mark this visit leaves behind. It is drawn from the three answers, so it
 * completes as the visitor commits, and it is deterministic: the same answers
 * always cut the same chop. Breathes very slowly — a seal pressed by hand is
 * never perfectly still — and freezes entirely under reduced motion.
 */
export function Seal() {
  const { choices, reduced } = useStudio();
  const cv = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 136;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (reduced) {
      drawGlyph(ctx, size, choices, 0.6);
      return;
    }

    // the seal only breathes while it is on screen — no loop for a canvas that
    // nobody is looking at
    let visible = true;
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf.current) loop();
        else if (!visible && raf.current) { cancelAnimationFrame(raf.current); raf.current = 0; }
      }, { threshold: 0.05 })
      : null;

    const t0 = performance.now();
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      drawGlyph(ctx, size, choices, t * 0.55);
      raf.current = visible ? requestAnimationFrame(loop) : 0;
    };
    drawGlyph(ctx, size, choices, 0.6);
    if (io) io.observe(canvas); else loop();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      io?.disconnect();
    };
  }, [choices, reduced]);

  const done = choices.every((c) => c !== null);

  return (
    <figure className="seal">
      <canvas ref={cv} role="img" aria-label={done ? '由你的三次选择织成的印记' : '尚未完成的印记'} />
      <figcaption>
        印 · seal <b>V4·{codeFor(choices)}</b>
        <br />
        {done ? '此印只属于这一次访问' : `还差 ${choices.filter((c) => c === null).length} 次选择`}
      </figcaption>
    </figure>
  );
}
