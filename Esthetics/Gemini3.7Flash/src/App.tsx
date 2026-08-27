import { useState, useEffect, useCallback } from 'react';
import type { ThinkingState, DimensionVector } from './types';
import { InstallationCanvas } from './components/CoreInstallation/InstallationCanvas';
import { Header } from './components/Navigation/Header';
import { HeroSection } from './components/Sections/HeroSection';
import { TensionSection } from './components/Sections/TensionSection';
import { CrucibleSection } from './components/Sections/CrucibleSection';
import { ArtifactsSection } from './components/Sections/ArtifactsSection';
import { SynthesisSection } from './components/Sections/SynthesisSection';
import { CognitiveModal } from './components/UI/CognitiveModal';
import { KeyboardShortcutsModal } from './components/UI/KeyboardShortcutsModal';
import { NoiseOverlay } from './components/UI/NoiseOverlay';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { soundEngine } from './components/Audio/SoundEngine';
import './styles/design-system.css';

export function App() {
  const [thinkingState, setThinkingState] = useState<ThinkingState>('dormant');
  const [dimensionVector, setDimensionVector] = useState<DimensionVector>({
    entropy: 48,
    rigor: 72,
    empathy: 64,
    velocity: 52,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Initialize accessibility preferences
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Global Scroll Tracking & Section Intersection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(1, Math.max(0, currentScroll / totalHeight)) : 0;
          setScrollProgress(progress);

          // Update active section based on scroll offset
          const sections = ['hero', 'tension', 'crucible', 'artifacts', 'coda'];
          const scrollPos = currentScroll + window.innerHeight * 0.35;

          for (const secId of sections) {
            const el = document.getElementById(secId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(secId);
                // State evolution with scroll chapters
                if (secId === 'hero') setThinkingState('dormant');
                else if (secId === 'tension') setThinkingState('tension');
                else if (secId === 'crucible') setThinkingState('dialectic');
                else if (secId === 'artifacts') setThinkingState('dialectic');
                else if (secId === 'coda') setThinkingState('resonance');
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when typing inside an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === 'Escape') {
        setIsXRayOpen(false);
        setIsHelpOpen(false);
      } else if (e.key === '1') {
        setThinkingState('dormant');
        soundEngine.playTactileClick(800, 0.02);
      } else if (e.key === '2') {
        setThinkingState('tension');
        soundEngine.playTactileClick(950, 0.02);
      } else if (e.key === '3') {
        setThinkingState('dialectic');
        soundEngine.playTactileClick(1100, 0.02);
      } else if (e.key === '4') {
        setThinkingState('resonance');
        soundEngine.playTactileClick(1250, 0.02);
      } else if (e.key === 'm' || e.key === 'M') {
        soundEngine.toggleMute();
      } else if (e.key === 'x' || e.key === 'X') {
        setIsXRayOpen((prev) => !prev);
        soundEngine.playTactileClick(600, 0.03);
      } else if (e.key === '?') {
        setIsHelpOpen((prev) => !prev);
        soundEngine.playTactileClick(700, 0.03);
      } else if (e.code === 'Space') {
        e.preventDefault();
        soundEngine.playHarmonicPluck(0.95, 4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExploreClick = useCallback(() => {
    const el = document.getElementById('tension');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#f5f5f7] selection:bg-[#e5a968] selection:text-[#07080b] overflow-x-hidden">
      {/* Subtle Procedural Noise Overlay */}
      <NoiseOverlay />

      {/* Magnetic Physics Cursor */}
      <CustomCursor />

      {/* Persistent Fixed 3D WebGL Core Installation */}
      <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden">
        <InstallationCanvas
          thinkingState={thinkingState}
          vector={dimensionVector}
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          interactiveMode={true}
        />
      </div>

      {/* Ambient Atmospheric Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(7, 8, 11, 0.1) 0%, rgba(7, 8, 11, 0.6) 80%, #07080b 100%)',
        }}
      />

      {/* Global Navigation Header */}
      <Header
        activeSection={activeSection}
        thinkingState={thinkingState}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenXRay={() => setIsXRayOpen(true)}
      />

      {/* Main Experiential Journey Content */}
      <main className="relative z-10">
        <HeroSection
          thinkingState={thinkingState}
          vector={dimensionVector}
          onExploreClick={handleExploreClick}
        />

        <TensionSection />

        <CrucibleSection
          thinkingState={thinkingState}
          vector={dimensionVector}
          onVectorChange={setDimensionVector}
          onStateChange={setThinkingState}
          onOpenXRay={() => setIsXRayOpen(true)}
        />

        <ArtifactsSection />

        <SynthesisSection />
      </main>

      {/* Modals */}
      <CognitiveModal
        isOpen={isXRayOpen}
        onClose={() => setIsXRayOpen(false)}
        vector={dimensionVector}
        thinkingState={thinkingState}
      />

      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
