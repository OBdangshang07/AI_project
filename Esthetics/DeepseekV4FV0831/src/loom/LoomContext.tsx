import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Loom, type LoomSnapshot } from './engine';
import { LoomAudio } from './audio';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';

type BeatFn = (power: number, pick: number) => void;

interface LoomApi {
  loomRef: React.MutableRefObject<Loom | null>;
  snapshot: LoomSnapshot;
  onBeat: (fn: BeatFn) => () => void;
  shiftStage: string | null;
  soundOn: boolean;
  toggleSound: () => void;
  reduced: boolean;
  progress: number;
}

const Ctx = createContext<LoomApi | null>(null);

export function useLoom() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLoom outside provider');
  return v;
}

const EMPTY: LoomSnapshot = {
  phase: 'warping',
  structure: 'plain',
  picks: 0,
  beats: 0,
  tension: 1,
  weftName: '生成',
  reversed: false,
  woven: null,
  running: false,
  parked: false,
  shiftStage: null,
};

export function LoomProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loomRef = useRef<Loom | null>(null);
  const audioRef = useRef<LoomAudio | null>(null);
  const beatSubs = useRef(new Set<BeatFn>());
  const [snapshot, setSnapshot] = useState<LoomSnapshot>(EMPTY);
  const [shiftStage, setShiftStage] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [band, setBand] = useState({ x: 0, w: 0, shedY: 0, compact: false });
  const [announce, setAnnounce] = useState('');
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  const onBeat = useCallback((fn: BeatFn) => {
    beatSubs.current.add(fn);
    return () => {
      beatSubs.current.delete(fn);
    };
  }, []);

  // ---- 引擎生命周期 ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = new LoomAudio();
    audioRef.current = audio;

    const loom = new Loom(canvas, {
      onBeat: (power, pick) => {
        beatSubs.current.forEach((fn) => fn(power, pick));
        audio.beat(power);
      },
      onShuttle: () => audio.shuttle(),
      onSnapshot: (s) => setSnapshot(s),
      onShiftStage: (stage) => {
        setShiftStage(stage === 'done' ? null : stage);
        if (stage === 'rethread') {
          audio.tick(1);
          setAnnounce('正在重新穿综，组织即将改变。');
        }
        if (stage === 'retension') {
          audio.snap();
          navigator.vibrate?.([14, 40, 22]);
          setAnnounce('换综完成，张力已回，组织变为斜纹。');
        }
      },
    });
    loomRef.current = loom;
    loom.setReducedMotion(reduced);
    setBand(loom.getBand());
    setSnapshot(loom.snapshot());
    loom.start();
    // 开机第一件事：织出自己的名字
    loom.weaveTitle('織');

    const measure = () => {
      const col = document.querySelector('#start .col');
      loom.setContentRight(col ? col.getBoundingClientRect().right : 0);
    };
    const onResize = () => {
      loom.resize();
      setBand(loom.getBand());
      measure();
    };
    requestAnimationFrame(measure);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    const onVis = () => {
      if (document.hidden) loom.stop();
      else loom.start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('visibilitychange', onVis);
      loom.dispose();
      loomRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loomRef.current?.setReducedMotion(reduced);
  }, [reduced]);

  // 屏幕阅读器：布上发生的事要能被读到，而不是只存在于画面里
  useEffect(() => {
    if (snapshot.parked) setAnnounce('织机停机，布已下机。');
  }, [snapshot.parked]);
  useEffect(() => {
    if (snapshot.reversed) setAnnounce('已翻到布的背面，花纹是反的。');
  }, [snapshot.reversed]);

  useScrollProgress(({ progress: p, velocity }) => {
    loomRef.current?.setProgress(p, velocity);
    setProgress(p);
    document.documentElement.style.setProperty('--p', String(p));
  });

  const toggleSound = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.enabled) {
      a.disable();
      setSoundOn(false);
    } else {
      void a.enable().then((ok) => setSoundOn(!!ok));
    }
  }, []);

  /* ---------------- 指针 / 触摸 / 键盘 ---------------- */
  const drag = useRef({ active: false, y0: 0, t0: 0, tension0: 1, moved: 0, long: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const loom = loomRef.current;
    if (!loom) return;
    try {
      if (e.pointerId != null) (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      /* 某些环境不支持指针捕获，不影响交互 */
    }
    drag.current = {
      active: true,
      y0: e.clientY,
      t0: performance.now(),
      tension0: loom.getTension(),
      moved: 0,
      long: window.setTimeout(() => {
        loom.setReversed(true);
        navigator.vibrate?.(10);
      }, 420),
    };
  };

  const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    const loom = loomRef.current;
    const d = drag.current;
    if (!d.active || !loom) return;
    window.clearTimeout(d.long);
    d.active = false;
    loom.setReversed(false);
    const dur = performance.now() - d.t0;
    if (d.moved < 6 && dur < 400) {
      loom.throwPick();
      navigator.vibrate?.(8);
    }
    try {
      if (e.pointerId != null) (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const loom = loomRef.current;
    if (!loom) return;
    loom.setPointer(e.clientX, e.clientY);
    const d = drag.current;
    if (!d.active) return;
    const dy = e.clientY - d.y0;
    d.moved = Math.max(d.moved, Math.abs(dy));
    if (d.moved > 6) {
      window.clearTimeout(d.long);
      loom.setTension(d.tension0 - dy / 260);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const loom = loomRef.current;
    if (!loom) return;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        loom.nudgeFocusEnd(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        loom.nudgeFocusEnd(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        loom.nudgeTension(0.08);
        break;
      case 'ArrowDown':
        e.preventDefault();
        loom.nudgeTension(-0.08);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        loom.throwPick();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        loom.setReversed(!loom.isReversed());
        break;
    }
  };

  const api = useMemo<LoomApi>(
    () => ({ loomRef, snapshot, onBeat, shiftStage, soundOn, toggleSound, reduced, progress }),
    [snapshot, onBeat, shiftStage, soundOn, toggleSound, reduced, progress],
  );

  const hitStyle: React.CSSProperties = {
    left: Math.max(0, band.x - 14),
    width: band.w + 28,
    top: 0,
    height: '100svh',
  };

  return (
    <Ctx.Provider value={api}>
      <canvas ref={canvasRef} className="stage-canvas" aria-hidden="true" />
      <button
        className="stage-hit"
        style={hitStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => loomRef.current?.setPointer(null, null)}
        onKeyDown={onKeyDown}
        onBlur={() => loomRef.current?.clearFocusEnd()}
        aria-label="织机。左右方向键选一根经线，上下方向键调张力，空格投一梭，按 R 翻看布的背面。"
      />
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <p className="sr-only">
        画面右侧是一台正在运转的织机：上方是绷紧的经线，中间是织口，下方是已经织成的布。
        布上依次织出了「織」字、平纹、斜纹与人字花纹。
      </p>
      {children}
    </Ctx.Provider>
  );
}
