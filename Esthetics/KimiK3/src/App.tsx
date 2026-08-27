import { useEffect, useRef, useState } from "react";
import { PrismEngine, EngineTargets, BAND_HUES } from "./engine";
import { HERO, CHAPTERS, CODA, CHAPTER_HUES, TRAP_STATUS } from "./content";

/**
 * journey: 0..4，五个停靠点 = 序 / 思考 / 创造 / 协作 / 收束。
 * 滚动只是时间轴，装置的状态全部由它插值而来——章节之间共享同一台装置。
 */
/*
 * 全程棱镜只朝一个方向转动（0.25 → 2.444），像仪器上的一只刻度盘——
 * 末章 2.444 ≡ 0.35 + 2π/3，利用等边三角形的三重对称回到"初始"姿态，
 * 但光是实实在在转了一整圈才回到白光的。
 * 创造章取 0.95：此处主光束与第二束光都能干净出射，两片光谱在棱镜上方交叉叠印。
 */
const KEYFRAMES: EngineTargets[] = [
  { rotation: 0.25, spread: 0.55, converge: 0, secondBeam: 0, weave: 0, trap: 0, release: 0 },
  { rotation: 0.45, spread: 1.0, converge: 0, secondBeam: 0, weave: 0.12, trap: 0, release: 0 },
  { rotation: 0.95, spread: 0.85, converge: 0, secondBeam: 1, weave: 0.4, trap: 0, release: 0 },
  { rotation: 0.95, spread: 0.9, converge: 0, secondBeam: 0, weave: 0, trap: 1, release: 0 },
  { rotation: 2.444, spread: 0.6, converge: 1, secondBeam: 0, weave: 0, trap: 0, release: 0 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function targetsAt(journey: number, release: number): EngineTargets {
  const j = Math.min(4, Math.max(0, journey));
  const i = Math.min(3, Math.floor(j));
  const t = j - i;
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const out = {} as EngineTargets;
  (Object.keys(a) as (keyof EngineTargets)[]).forEach((k) => {
    out[k] = lerp(a[k], b[k], t);
  });
  out.release = release;
  return out;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PrismEngine | null>(null);
  const stopRefs = useRef<(HTMLElement | null)[]>([]);
  const chapter3Ref = useRef<HTMLElement | null>(null);
  const [journey, setJourney] = useState(0);
  const [trapState, setTrapState] = useState<"idle" | "trapped" | "free">("idle");
  const [trapHint, setTrapHint] = useState(false);

  useEffect(() => {
    const engine = new PrismEngine(canvasRef.current!);
    engineRef.current = engine;
    engine.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    engine.start();

    let freeTimer = 0;
    let hintTimer = 0;
    engine.onTrapChange = (trapped) => {
      window.clearTimeout(freeTimer);
      window.clearTimeout(hintTimer);
      if (trapped) {
        setTrapState("trapped");
        setTrapHint(false);
        // 困住 6 秒还没找到出口，给一个更明确的方向提示
        hintTimer = window.setTimeout(() => setTrapHint(true), 6000);
      } else {
        setTrapState("free");
        setTrapHint(false);
        freeTimer = window.setTimeout(() => setTrapState("idle"), 2600);
      }
    };

    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      const stops = stopRefs.current.map((el) =>
        el ? el.offsetTop + el.offsetHeight * 0.5 : 0,
      );
      let j = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (mid >= stops[i] && mid <= stops[i + 1]) {
          j = i + (mid - stops[i]) / Math.max(1, stops[i + 1] - stops[i]);
          break;
        }
        if (mid > stops[stops.length - 1]) j = stops.length - 1;
      }
      // 协作章内部进度：即使不动光标，滚到底也会把光放出来（移动端兜底）
      let release = 0;
      const ch3 = chapter3Ref.current;
      if (ch3) {
        release = clamp01((mid - (ch3.offsetTop + ch3.offsetHeight * 0.5)) / (ch3.offsetHeight * 0.5));
      }
      engine.setTargets(targetsAt(j, release));
      setJourney(j);
    };

    // 可分享的旅程坐标：?j=3 直达「协作 · 全反射」一章的装置状态
    const jParam = new URLSearchParams(window.location.search).get("j");
    if (jParam !== null) {
      const jv = Math.min(4, Math.max(0, parseFloat(jParam) || 0));
      requestAnimationFrame(() => {
        const stops = stopRefs.current.map((el) =>
          el ? el.offsetTop + el.offsetHeight * 0.5 : 0,
        );
        const i = Math.min(3, Math.floor(jv));
        const mid = stops[i] + (jv - i) * (stops[i + 1] - stops[i]);
        window.scrollTo({ top: mid - window.innerHeight * 0.5, behavior: "instant" as ScrollBehavior });
        onScroll();
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      engine.setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (engine.isNearPrism(e.clientX, e.clientY)) engine.setPress(true);
    };
    const onPointerUp = () => engine.setPress(false);
    const onKey = (e: KeyboardEvent) => {
      const step = 16;
      if (e.key === "ArrowLeft") engine.nudge(-step, 0);
      else if (e.key === "ArrowRight") engine.nudge(step, 0);
      else if (e.key === "ArrowUp") engine.nudge(0, -step);
      else if (e.key === "ArrowDown") engine.nudge(0, step);
      else return;
    };
    const onResize = () => {
      engine.resize();
      onScroll();
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      engine.reduced = motionQuery.matches;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotion);
    return () => {
      engine.stop();
      window.clearTimeout(freeTimer);
      window.clearTimeout(hintTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotion);
    };
  }, []);

  const setStop = (i: number) => (el: HTMLElement | null) => {
    stopRefs.current[i] = el;
    if (i === 3) chapter3Ref.current = el;
  };

  return (
    <>
      <a className="skip-link" href="#coda">
        跳到尾注
      </a>

      {/* 核心体验装置：整站唯一的一块画布，贯穿所有章节 */}
      <canvas ref={canvasRef} className="bench" aria-hidden="true" />
      <p className="visually-hidden">
        本页核心是一座二维光学装置：一道白光从你光标所在的一侧射入棱镜，
        按斯涅尔定律折射出五条谱带；某些角度下光会发生全反射而困在棱镜内，
        改变入射角即可将其释放。滚动页面驱动装置依次呈现色散、叠印、全反射与重组四个状态。
      </p>

      {/* 旅程标尺：右缘的五段谱带，标记你走到哪一站 */}
      <nav className="rail" aria-label="章节进度">
        {BAND_HUES.map((hue, i) => (
          <span key={hue} className="rail-seg" style={{ background: hue }} data-active={journey >= i - 0.5 && journey < i + 0.5} />
        ))}
        <span className="rail-marker" style={{ top: `${(journey / 4) * 100}%` }} />
      </nav>

      {/* 全反射状态（仅协作章内提示；其它章节全反射照常发生，但不抢叙事） */}
      <div
        className="trap-status"
        data-show={trapState !== "idle" && journey > 2.25 && journey < 3.8}
        data-trapped={trapState === "trapped"}
        role="status"
        aria-live="polite"
      >
        {trapState === "trapped"
          ? trapHint
            ? TRAP_STATUS.trappedHint
            : TRAP_STATUS.trapped
          : TRAP_STATUS.free}
      </div>

      <main>
        {/* 序 · 白光 */}
        <section className="hero" ref={setStop(0)} aria-label="序">
          <div className="hero-inner">
            <p className="eyebrow">{HERO.eyebrow}</p>
            <h1 className="hero-title">{HERO.title}</h1>
            <p className="lede">{HERO.lede}</p>
            <ul className="hints">
              {HERO.hints.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <p className="scroll-cue" aria-hidden="true">
            <span />
            向下，让光走完它的路
          </p>
        </section>

        {/* 四个章节：文字版覆盖在装置之上，装置在留白处持续运转 */}
        {CHAPTERS.map((ch, i) => (
          <section
            className="chapter"
            id={`ch-${i + 1}`}
            ref={setStop(i + 1)}
            key={ch.name}
            aria-label={`第${ch.no}章 · ${ch.name}`}
          >
            <article className="plate" style={{ ["--hue" as string]: CHAPTER_HUES[i + 1] }}>
              <header className="plate-head">
                <span className="plate-no">{ch.no}</span>
                <div>
                  <h2>{ch.name}</h2>
                  <p className="plate-term">{ch.term}</p>
                </div>
              </header>
              <span className="spectral-rule" aria-hidden="true" />
              {ch.body.map((p) => (
                <p key={p.slice(0, 8)}>{p}</p>
              ))}
            </article>
          </section>
        ))}

        {/* 尾注 */}
        <section className="coda" id="coda" aria-label="尾注">
          <div className="plate coda-plate" style={{ ["--hue" as string]: CHAPTER_HUES[0] }}>
            <h2>{CODA.title}</h2>
            <span className="spectral-rule" aria-hidden="true" />
            {CODA.lines.map((l) => (
              <p key={l.slice(0, 8)} className="coda-line">
                {l}
              </p>
            ))}
            <p className="sign">{CODA.sign}</p>
          </div>
        </section>
      </main>
    </>
  );
}
