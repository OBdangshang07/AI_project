import React from 'react';
import { useAppState } from './utils/store';
import { Header } from './components/Header';
import { RefractorContainer } from './components/RefractorEngine/RefractorContainer';
import { Hero } from './components/Hero';
import { ActSpeed } from './components/ActSpeed';
import { ActMultimodal } from './components/ActMultimodal';
import { ActStructure } from './components/ActStructure';
import { ActTerminal } from './components/ActTerminal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
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
  } = useAppState();

  return (
    <div className="relative min-h-screen bg-[#070709] text-gray-100 bg-grain overflow-hidden selection:bg-[#0066FF] selection:text-white">
      {/* Fixed Core Experience Device (WebGL / SVG Fallback) */}
      <RefractorContainer
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        latencyMs={latencyMs}
        activeModalIndex={activeModalIndex}
        refractorEnergy={refractorEnergy}
        reducedMotion={reducedMotion}
      />

      {/* Persistent Navigation Header */}
      <Header
        currentAct={currentAct}
        scrollProgress={scrollProgress}
        latencyMs={latencyMs}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />

      {/* Act 00: Hero Ignition */}
      <Hero
        refractorEnergy={refractorEnergy}
        setRefractorEnergy={setRefractorEnergy}
        mousePos={mousePos}
      />

      {/* Act 01: Flash Speed */}
      <ActSpeed latencyMs={latencyMs} setLatencyMs={setLatencyMs} />

      {/* Act 02: Multimodal Synthesis */}
      <ActMultimodal
        activeModalIndex={activeModalIndex}
        setActiveModalIndex={setActiveModalIndex}
      />

      {/* Act 03: Spatial Architecture */}
      <ActStructure />

      {/* Act 04: Co-Creation Terminal */}
      <ActTerminal
        customPromptText={customPromptText}
        setCustomPromptText={setCustomPromptText}
        latencyMs={latencyMs}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
