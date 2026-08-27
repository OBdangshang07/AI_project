import { useStudio } from '../state/studio-context';

/** Three switches, bottom-left, in the margin where a printer's marks would be.
 *  Sound is off until asked for; the drafts switch is the accessible twin of
 *  press-and-hold; restart clears the weave and the seal. */
export function Toggles() {
  const { sound, toggleSound, drafts, toggleDrafts, reset, reduced } = useStudio();
  return (
    <div className="toggles">
      <button type="button" className="tgl" aria-pressed={sound} onClick={toggleSound}>
        声音 <span aria-hidden="true">S</span>
      </button>
      <button type="button" className="tgl" aria-pressed={drafts} onClick={toggleDrafts}>
        纸背 <span aria-hidden="true">D</span>
      </button>
      <button type="button" className="tgl" onClick={reset}>
        重来 <span aria-hidden="true">R</span>
      </button>
      {reduced && <span className="tgl" aria-hidden="true" style={{ cursor: 'default' }}>静止版画</span>}
    </div>
  );
}
