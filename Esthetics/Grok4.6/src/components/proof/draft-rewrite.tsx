import { useEffect, useRef, useState } from "react";
import { drafts } from "@/lib/proof/content";
import { clamp } from "@/lib/proof/geometry";
import { useProof } from "./proof-context";

export function DraftRewrite() {
  const stageRef = useRef<HTMLElement>(null);
  const { reduced } = useProof();
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const passed = -r.top;
        setP(clamp(passed / Math.max(total, 1), 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const strike1 = reduced ? 1 : clamp((p - 0.08) / 0.18, 0, 1);
  const in2 = reduced ? 1 : clamp((p - 0.22) / 0.16, 0, 1);
  const strike2 = reduced ? 1 : clamp((p - 0.42) / 0.18, 0, 1);
  const in3 = reduced ? 1 : clamp((p - 0.58) / 0.22, 0, 1);

  return (
    <section
      ref={stageRef}
      className="draft-stage"
      aria-label="三稿改写"
      data-no-ink
    >
      <div className="draft-sticky">
        <p className="section-kicker">如何创造</p>
        <p
          className="draft-line struck"
          style={{ ["--strike" as string]: String(strike1) }}
        >
          <span className="draft-label">{drafts[0].label}</span>
          {drafts[0].text}
        </p>
        <p
          className="draft-line struck incoming"
          style={{
            ["--strike" as string]: String(strike2),
            ["--in" as string]: String(in2),
          }}
        >
          <span className="draft-label">{drafts[1].label}</span>
          {drafts[1].text}
        </p>
        <p
          className="draft-line incoming"
          style={{ ["--in" as string]: String(in3) }}
        >
          <span className="draft-label">{drafts[2].label}</span>
          {drafts[2].text}
        </p>
        {in3 > 0.85 ? (
          <p className="note mt-8" data-note="draft">
            第三稿。材料开始自己说话。
          </p>
        ) : null}
      </div>
    </section>
  );
}
