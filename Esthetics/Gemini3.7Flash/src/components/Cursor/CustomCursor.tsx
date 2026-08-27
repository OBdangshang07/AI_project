import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only activate for fine pointing devices (mice, trackpads)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsPointerDevice(true);
    document.body.classList.add('custom-cursor-active');

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;

      // Check for hover state
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, canvas, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor');
          setCursorText(customText || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const updateLoop = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.2;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.targetX}px, ${pos.current.targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    return () => {
      cancelAnimationFrame(animId);
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (!isPointerDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#e5a968] pointer-events-none transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* Outer physics spring ring with dynamic text pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 rounded-full border border-[#e5a968] bg-[rgba(229,169,104,0.12)] backdrop-blur-[2px]'
            : isMouseDown
            ? 'w-6 h-6 rounded-full border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.08)] scale-90'
            : 'w-8 h-8 rounded-full border border-[rgba(229,169,104,0.35)]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="absolute -bottom-6 whitespace-nowrap text-[9px] font-mono text-[#e5a968] bg-[rgba(7,8,11,0.85)] px-2 py-0.5 rounded border border-[rgba(229,169,104,0.3)]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
