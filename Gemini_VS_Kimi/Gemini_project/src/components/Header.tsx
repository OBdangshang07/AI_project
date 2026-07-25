import React from 'react';
import { Volume2, VolumeX, Zap, Activity } from 'lucide-react';
import { ActType } from '../utils/store';
import { audioController } from '../utils/audio';

interface HeaderProps {
  currentAct: ActType;
  scrollProgress: number;
  latencyMs: number;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentAct,
  scrollProgress,
  latencyMs,
  audioEnabled,
  setAudioEnabled,
  reducedMotion,
  setReducedMotion,
}) => {
  const acts: { id: ActType; label: string; num: string }[] = [
    { id: 'act0', label: 'Ignition', num: '00' },
    { id: 'act1', label: 'Flash Speed', num: '01' },
    { id: 'act2', label: 'Multimodal', num: '02' },
    { id: 'act3', label: 'Architecture', num: '03' },
    { id: 'act4', label: 'Co-Creation', num: '04' },
  ];

  const handleActClick = (actId: ActType) => {
    const actElement = document.getElementById(actId);
    if (actElement) {
      actElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      audioController.playPulseClick(1.2);
    }
  };

  const toggleAudio = () => {
    const isMutedNow = audioController.toggleMute();
    setAudioEnabled(!isMutedNow);
  };

  const toggleMotion = () => {
    setReducedMotion(!reducedMotion);
    audioController.playPulseClick(0.9);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070709]/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      {/* Top Scroll Indicator Bar */}
      <div
        className="h-[2px] bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-[#8A2BE2] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0066FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-widest text-white">
                GEMINI <span className="text-[#00F0FF]">3.6 FLASH</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-gray-400">
                MODEL ID: FLASH-3.6
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              <span>REFRACTOR ACTIVE</span>
              <span className="text-gray-600">|</span>
              <span className="text-[#00F0FF]">{latencyMs}ms</span>
            </div>
          </div>
        </div>

        {/* Act Navigation Markers */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {acts.map((act) => {
            const isActive = currentAct === act.id;
            return (
              <button
                key={act.id}
                onClick={() => handleActClick(act.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/30 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="opacity-60">{act.num}</span>
                <span>{act.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Audio & Motion Toggle */}
        <div className="flex items-center gap-2">
          {/* Audio Switch */}
          <button
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute Audio Synth' : 'Enable Interactive Web Audio Synth'}
            className={`p-2 rounded-lg border transition-all text-xs font-mono flex items-center gap-1.5 ${
              audioEnabled
                ? 'bg-[#00F0FF]/10 border-[#00F0FF]/40 text-[#00F0FF]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Motion Toggle */}
          <button
            onClick={toggleMotion}
            title="Toggle Reduced Motion"
            className={`p-2 rounded-lg border transition-all text-xs font-mono flex items-center gap-1.5 ${
              reducedMotion
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">{reducedMotion ? 'REDUCED' : 'FULL 3D'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
