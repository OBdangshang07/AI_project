import { useEffect, useRef, useState } from 'react';
import { useStudio } from '../state/studio-context';

/**
 * The only number on the page, and it is not decoration: it is how many
 * candidate paths the device still has open. It falls from ~2,400 to 1 during
 * the collapse and climbs again in the margin. Sampled at 4Hz so the readout
 * never drags the render loop into React.
 */
export function Readout({ suffix = '' }: { suffix?: string }) {
  const { engine } = useStudio();
  const [paths, setPaths] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      const r = engine.current?.getReadout();
      if (!r) return;
      // ease the digits so they roll instead of jumping
      shown.current = shown.current === 0 ? r.paths : shown.current + (r.paths - shown.current) * 0.5;
      setPaths(Math.max(1, Math.round(shown.current)));
    }, 250);
    return () => window.clearInterval(id);
  }, [engine]);

  return <i>{paths.toLocaleString('en-US')}{suffix}</i>;
}
