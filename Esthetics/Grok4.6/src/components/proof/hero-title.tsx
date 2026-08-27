import { useEffect, useRef, useState } from "react";
import { OPENING_LINE, SUBTITLE, TITLE_CHARS } from "@/lib/proof/content";
import { useProof } from "./proof-context";

export function HeroTitle() {
  const { titleEl, reduced } = useProof();
  const rowRef = useRef<HTMLHeadingElement>(null);
  const [signed, setSigned] = useState(reduced);

  useEffect(() => {
    titleEl.current = rowRef.current;
    return () => {
      titleEl.current = null;
    };
  }, [titleEl]);

  useEffect(() => {
    if (reduced) {
      setSigned(true);
      return;
    }
    const t = window.setTimeout(() => setSigned(true), 2400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <header className="hero" data-draw="true">
      <div data-no-ink>
        <p className="colophon-latin mb-8 text-center">
          Proof copy · not for press
        </p>
        <h1
          ref={rowRef}
          className={`title-row justify-center${signed ? " is-signed" : ""}`}
          aria-label="第二支笔"
        >
          {TITLE_CHARS.map((ch) => (
            <span key={ch} className={reduced ? "inline-block" : "stamp-char"}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="subtitle">{SUBTITLE}</p>
        <p className="opening-line">{OPENING_LINE}</p>
      </div>
      <p className="scroll-cue">向下翻阅这份校样</p>
    </header>
  );
}

export function Spine() {
  return (
    <div className="spine" aria-hidden="true">
      {TITLE_CHARS.map((ch) => (
        <span key={ch}>{ch}</span>
      ))}
    </div>
  );
}
