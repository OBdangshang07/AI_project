import { useEffect, useRef } from 'react';

export interface ScrollState {
  progress: number;
  velocity: number;
}

/**
 * 不劫持滚动。只读取——原生滚动条、键盘、触控板、移动端惯性全部保持原样。
 */
export function useScrollProgress(onChange: (s: ScrollState) => void) {
  const cb = useRef(onChange);
  cb.current = onChange;

  useEffect(() => {
    let raf = 0;
    let last = window.scrollY;
    let lastT = performance.now();
    let queued = false;

    const measure = () => {
      queued = false;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const velocity = ((y - last) / dt) * 16.7 / Math.max(1, window.innerHeight * 0.012);
      last = y;
      lastT = now;
      cb.current({ progress: y / max, velocity });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
