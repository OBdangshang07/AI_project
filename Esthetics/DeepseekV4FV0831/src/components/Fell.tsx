import { useEffect, useRef } from 'react';
import { useLoom } from '../loom/LoomContext';

/**
 * 织口线。每一次打纬，它跳一下。
 * 这不是装饰——它是排版层与机器之间唯一的、直接的因果连线。
 */
export function Fell() {
  const { onBeat, reduced } = useLoom();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    return onBeat((power) => {
      const el = ref.current;
      if (!el || typeof el.animate !== 'function') return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return; // 只有看得见的才跳
      el.animate(
        [
          { transform: 'scaleY(1) translateX(0)' },
          { transform: `scaleY(${1 + power * 2.4}) translateX(${power * 2.6}px)`, offset: 0.14 },
          { transform: 'scaleY(1) translateX(0)' },
        ],
        { duration: 420, easing: 'cubic-bezier(0.16,0.9,0.24,1)' },
      );
    });
  }, [onBeat, reduced]);

  return <div className="fell" ref={ref} aria-hidden="true" />;
}
