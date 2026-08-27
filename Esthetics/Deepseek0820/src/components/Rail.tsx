import { ACTS } from '../field/acts';
import { useStudio } from '../state/studio-context';

/** Chapter rail. Desktop only — on small screens the hairline at the top of the
 *  page carries the same information without stealing a thumb's worth of space. */
export function Rail() {
  const { act } = useStudio();

  const go = (i: number) => {
    const el = document.querySelectorAll<HTMLElement>('[data-act]')[i];
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="rail" aria-label="幕次">
      {ACTS.map((a, i) => (
        <button
          key={a.id}
          type="button"
          aria-current={act === i}
          onClick={() => go(i)}
        >
          <span>{a.num} {a.name}</span>
        </button>
      ))}
    </nav>
  );
}
