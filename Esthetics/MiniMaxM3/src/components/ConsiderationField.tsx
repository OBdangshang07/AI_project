import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ConsiderationFieldProps {
  active: boolean;
  density?: number;
}

interface Glyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
  size: number;
  life: number;
  max: number;
}

/**
 * A subtle canvas layer of drifting glyph fragments, evoking the
 * "field of consideration" — the latent tokens a model considers
 * before settling on one. Never dominant; only felt.
 */
export function ConsiderationField({ active, density = 36 }: ConsiderationFieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const charset =
      'abcdefghijklmnopqrstuvwxyz' +
      '.,;:—…·' +
      'I am not would could might never know' +
      'ABCDEFGHIKLMNOPRSTUWY'.replace(/(.)/g, ' $1').trim();

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let glyphs: Glyph[] = [];
    let last = performance.now();
    let visible = active;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      glyphs = [];
      const n = Math.floor((w * h) / 28000) + density;
      for (let i = 0; i < n; i++) {
        const life = 6000 + Math.random() * 8000;
        glyphs.push({
          x: Math.random() * w,
          y: h + Math.random() * h * 0.6,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.18 - Math.random() * 0.34,
          char: charset[Math.floor(Math.random() * charset.length)],
          alpha: 0,
          size: 12 + Math.random() * 8,
          life: 0,
          max: life,
        });
      }
    };

    const step = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);

      if (!visible) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      for (const g of glyphs) {
        g.life += dt;
        if (g.life > g.max) {
          g.life = 0;
          g.x = Math.random() * w;
          g.y = h + Math.random() * h * 0.4;
          g.char = charset[Math.floor(Math.random() * charset.length)];
          g.size = 11 + Math.random() * 10;
          g.vx = (Math.random() - 0.5) * 0.16;
          g.vy = -0.16 - Math.random() * 0.3;
        }
        g.x += g.vx * dt * 0.06;
        g.y += g.vy * dt * 0.06;
        const phase = g.life / g.max;
        const fade =
          phase < 0.18
            ? phase / 0.18
            : phase > 0.82
              ? (1 - phase) / 0.18
              : 1;
        g.alpha = fade * 0.22;

        ctx.font = `${g.size}px "EB Garamond", serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(26,26,26,${g.alpha.toFixed(3)})`;
        ctx.fillText(g.char, g.x, g.y);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting && active;
        }
      },
      { threshold: 0.05 },
    );

    resize();
    seed();
    observer.observe(canvas);
    rafRef.current = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [active, density]);

  // Reduced motion: no animation, just a static faint texture
  if (reduced) {
    return <div className="consideration__field-static" aria-hidden="true" />;
  }

  return <canvas ref={ref} className="consideration__field-canvas" aria-hidden="true" />;
}
