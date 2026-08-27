import { useEffect, useId, useRef, useState } from 'react';
import { useStudio } from '../state/studio-context';

/* ---------------------------------------------------------------------------
   PALIMPSEST — 纸背
   The hidden layer of the piece. Every one of these paragraphs is a survivor;
   press and hold it and the versions I threw away rise from the back of the
   sheet, struck through in the editor's red.

   Quick tap latches it open (touch + keyboard); press-and-hold peeks (mouse).
   The global `D` switch opens all of them at once, for anyone who would rather
   read than fidget.
--------------------------------------------------------------------------- */

type Props = {
  surface: string;
  drafts: string[];
  note?: string;
  /** show the discovery cue once the reader has been here a while */
  cue?: boolean;
};

export function Palimpsest({ surface, drafts, note = '三个版本，都被我划掉了。', cue = false }: Props) {
  const { drafts: globalOpen } = useStudio();
  const [sticky, setSticky] = useState(false);
  const [holding, setHolding] = useState(false);
  const [showCue, setShowCue] = useState(false);
  const holdTimer = useRef(0);
  const engaged = useRef(false);
  const origin = useRef<{ x: number; y: number } | null>(null);
  const id = useId();

  const open = sticky || holding || globalOpen;

  useEffect(() => {
    if (!cue) return;
    const t = window.setTimeout(() => setShowCue(true), 6500);
    return () => window.clearTimeout(t);
  }, [cue]);

  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  const down = (e: React.PointerEvent) => {
    engaged.current = false;
    origin.current = { x: e.clientX, y: e.clientY };
    holdTimer.current = window.setTimeout(() => {
      engaged.current = true;
      setHolding(true);
    }, 190);
  };
  // On a phone, a drag that starts on this paragraph is almost always a scroll.
  // Give up the hold as soon as the finger travels.
  const move = (e: React.PointerEvent) => {
    const o = origin.current;
    if (!o) return;
    if (Math.abs(e.clientX - o.x) + Math.abs(e.clientY - o.y) > 10) {
      window.clearTimeout(holdTimer.current);
      origin.current = null;
      if (holding) setHolding(false);
      engaged.current = true;      // and do not latch on the click that follows
    }
  };
  const up = () => {
    window.clearTimeout(holdTimer.current);
    origin.current = null;
    setHolding(false);
  };
  const click = () => {
    // a hold already showed the drafts; don't also latch
    if (engaged.current) { engaged.current = false; return; }
    setSticky((s) => !s);
  };

  return (
    <div className="palim" data-open={open}>
      <button
        type="button"
        className="palim__hold"
        aria-expanded={open}
        aria-controls={id}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        onClick={click}
      >
        <span className="body palim__surface">{surface}</span>
      </button>

      <ul className="palim__drafts" id={id} aria-hidden={!open} aria-label="被我划掉的版本">
        {drafts.map((d, i) => (
          <li key={d} style={{ ['--d' as string]: `${i * 110}ms` }}>{d}</li>
        ))}
      </ul>

      <p className="palim__note">{note}</p>
      {cue && !open && (
        <p className="palim__cue" data-show={showCue}>按住这段文字 · press &amp; hold</p>
      )}
    </div>
  );
}
