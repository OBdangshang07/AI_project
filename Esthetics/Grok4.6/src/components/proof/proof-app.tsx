import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Colophon, Folio, Legend } from "./colophon";
import { Galley } from "./galley";
import { HeroTitle, Spine } from "./hero-title";
import { MarginCanvas } from "./margin-canvas";
import { ProofProvider, useProof } from "./proof-context";

function IdleMargin() {
  const { idleNote } = useProof();
  if (!idleNote) return null;
  return (
    <aside
      className="note pointer-events-none fixed top-[32vh] right-[var(--space-gutter)] z-30 hidden md:block"
      role="status"
    >
      {idleNote}
    </aside>
  );
}

function KeyboardHints() {
  const { reduced } = useProof();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        document.getElementById("ink-pad")?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);
  return null;
}

export function ProofApp() {
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ProofProvider reduced={reduced}>
      <a className="skip-link" href="#galley">
        跳到正文
      </a>
      <div
        className={`desk${scrolled ? " is-scrolled" : ""}`}
        data-desk="true"
        data-draw="true"
      >
        <KeyboardHints />
        <MarginCanvas />
        <Folio />
        <Spine />
        <Legend />
        <IdleMargin />
        <span className="crop crop-tl" aria-hidden="true" />
        <span className="crop crop-tr" aria-hidden="true" />
        <span className="crop crop-bl" aria-hidden="true" />
        <span className="crop crop-br" aria-hidden="true" />
        <div className="sheet">
          <HeroTitle />
          <Galley />
          <Colophon />
        </div>
      </div>
    </ProofProvider>
  );
}
