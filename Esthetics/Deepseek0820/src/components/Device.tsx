import { useEffect, useRef } from 'react';
import { FieldEngine } from '../field/FieldEngine';
import { ACTS, paramsFor, biasFor } from '../field/acts';
import { clamp } from '../field/noise';
import { useStudio } from '../state/studio-context';
import { play, haptic } from '../lib/sound';

/* ---------------------------------------------------------------------------
   The device's mount point, and the only place where scrolling becomes field
   state.

   Design notes that matter:
   · Section geometry is measured once (and on resize) into a cache, so the
     per-frame sampler touches no layout at all — scrolling stays free.
   · The sampler runs inside the engine's own animation frame. One clock for the
     whole page: no second rAF chain, no "pending" flag that can wedge when the
     tab is backgrounded, and the ink can never be a frame behind the type.
   · Under reduced motion there is no loop, so the scroll listener samples
     directly and re-prints the plate when the act changes.
--------------------------------------------------------------------------- */

type Slot = { top: number; h: number };

export function Device() {
  const cv = useRef<HTMLCanvasElement | null>(null);
  const { engine, setAct, choices, announce, setReduced } = useStudio();

  // the scroll sampler reads these refs, so it never needs re-binding
  const biasRef = useRef(biasFor(choices));
  biasRef.current = biasFor(choices);

  const actRef = useRef(-1);
  const firedRef = useRef(false);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mq.matches;
    const eng = new FieldEngine(canvas, { reduced });
    engine.current = eng;
    setReduced(reduced);

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-act]'));
    let slots: Slot[] = [];

    const layout = () => {
      const sy = window.scrollY;
      slots = sections.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + sy, h: r.height || window.innerHeight };
      });
    };

    const sample = () => {
      if (!slots.length) return;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const y = sy + vh * 0.5;
      let idx = 0;
      let p = 0;
      for (let i = 0; i < slots.length; i++) {
        if (y >= slots[i].top) { idx = i; p = (y - slots[i].top) / slots[i].h; }
      }
      p = clamp(p, 0, 1);
      eng.setTarget(paramsFor(idx, p), biasRef.current);

      const docH = document.documentElement.scrollHeight - vh;
      document.documentElement.style.setProperty('--p', (sy / Math.max(1, docH)).toFixed(4));

      if (idx !== actRef.current) {
        actRef.current = idx;
        setAct(idx);
        const act = ACTS[idx];
        if (act) announce(`第${act.num}幕 · ${act.name}`);
        if (reduced) eng.still();      // one printed plate per chapter
      }

      // ── the turn. Fires inside act II, not at its edge, and re-arms if the
      //    reader scrolls back up — the marginalia invites exactly that.
      if (idx === 2 && p > 0.26 && !firedRef.current) {
        firedRef.current = true;
        eng.pulse('collapse');
        play('thump');
        haptic(24);
        document.documentElement.dataset.collapsed = 'true';
        announce('场已经坍缩为一条线。几千条可能，现在只剩一条。');
      }
      if (idx < 2 || (idx === 2 && p < 0.1)) {
        firedRef.current = false;
        if (idx < 2) delete document.documentElement.dataset.collapsed;
      }
    };

    layout();
    sample();
    eng.setSampler(sample);

    const onScroll = () => { if (reduced) sample(); };
    const onResize = () => { layout(); sample(); };
    const onMq = () => {
      reduced = mq.matches;
      eng.setReduced(reduced);
      setReduced(reduced);
      sample();
    };

    // body height changes when answers change the copy — keep the cache honest
    const ro = new ResizeObserver(() => { layout(); });
    ro.observe(document.body);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', onMq);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMq);
      ro.disconnect();
      eng.setSampler(null);
      eng.destroy();
      engine.current = null;
    };
    // the effect owns the device for the lifetime of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="device" aria-hidden="true">
      <canvas ref={cv} />
    </div>
  );
}
