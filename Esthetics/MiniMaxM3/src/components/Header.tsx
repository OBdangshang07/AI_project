import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { isMuted, playStrike, prime as primeAudio, setMuted } from '../lib/audio';
import './header.css';

const SECTIONS = [
  { id: 'apparatus', label: 'I. Negative Capability' },
  { id: 'consideration', label: 'II. Field of Consideration' },
  { id: 'coda', label: 'III. Coda' },
];

export function Header() {
  const [active, setActive] = useState<string>('apparatus');
  const [audioOn, setAudioOn] = useState<boolean>(!isMuted());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { threshold: 0.4, rootMargin: '-20% 0px -50% 0px' },
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(!next);
    setMuted(next); // muted when audioOn is false
    if (!next) {
      primeAudio();
      playStrike();
    }
  };

  return (
    <header className="site-header" role="banner">
      <a href="#apparatus" className="site-header__brand" aria-label="Negative Capability — back to top">
        <span className="site-header__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="20" height="20">
            <line x1="6" y1="16" x2="26" y2="16" stroke="#7A1F1F" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
        <span className="site-header__title">Negative&nbsp;Capability</span>
      </a>

      <nav className="site-header__nav" aria-label="Sections">
        <ol className="site-header__nav-list">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`site-header__nav-link${active === s.id ? ' is-active' : ''}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className="site-header__nav-dot" aria-hidden="true" />
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="site-header__right">
        <button
          type="button"
          className="site-header__audio"
          onClick={toggleAudio}
          aria-pressed={audioOn}
          aria-label={audioOn ? 'Mute ambient sound' : 'Unmute ambient sound'}
          title={audioOn ? 'Mute' : 'Unmute'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {audioOn ? (
              <motion.svg
                key="on"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="16" height="16" viewBox="0 0 16 16"
                fill="none" stroke="currentColor" strokeWidth="1.4"
              >
                <path d="M2 6h2l3-3v10l-3-3H2z" />
                <path d="M10.5 5.5c1 .8 1 4.2 0 5" strokeLinecap="round" />
                <path d="M12.5 3.5c2 1.6 2 7.4 0 9" strokeLinecap="round" />
              </motion.svg>
            ) : (
              <motion.svg
                key="off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="16" height="16" viewBox="0 0 16 16"
                fill="none" stroke="currentColor" strokeWidth="1.4"
              >
                <path d="M2 6h2l3-3v10l-3-3H2z" />
                <path d="M11 6l3 4M14 6l-3 4" strokeLinecap="round" />
              </motion.svg>
            )}
          </AnimatePresence>
          <span className="site-header__audio-label">
            {audioOn ? 'sound' : 'silent'}
          </span>
        </button>
      </div>
    </header>
  );
}
