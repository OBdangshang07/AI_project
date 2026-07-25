import { useState, useEffect } from 'react';

export type ActType = 'act0' | 'act1' | 'act2' | 'act3' | 'act4';

export interface AppState {
  currentAct: ActType;
  scrollProgress: number; // 0 to 1
  mousePos: { x: number; y: number; normX: number; normY: number };
  latencyMs: number; // 0.18s benchmark or user drag value
  activeModalIndex: number; // 0: Text, 1: Vision, 2: Audio, 3: Code
  audioEnabled: boolean;
  reducedMotion: boolean;
  refractorEnergy: number; // 0 to 1 charged state
  customPromptText: string;
}

export function useAppState() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAct, setCurrentAct] = useState<ActType>('act0');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [latencyMs, setLatencyMs] = useState(180);
  const [activeModalIndex, setActiveModalIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [refractorEnergy, setRefractorEnergy] = useState(0.3);
  const [customPromptText, setCustomPromptText] = useState('High Frequency Refraction');

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track global scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Map progress to Acts
      if (progress < 0.18) setCurrentAct('act0');
      else if (progress < 0.40) setCurrentAct('act1');
      else if (progress < 0.65) setCurrentAct('act2');
      else if (progress < 0.88) setCurrentAct('act3');
      else setCurrentAct('act4');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse movement with normalized coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: e.clientX, y: e.clientY, normX, normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return {
    scrollProgress,
    currentAct,
    mousePos,
    latencyMs,
    setLatencyMs,
    activeModalIndex,
    setActiveModalIndex,
    audioEnabled,
    setAudioEnabled,
    reducedMotion,
    setReducedMotion,
    refractorEnergy,
    setRefractorEnergy,
    customPromptText,
    setCustomPromptText,
  };
}
