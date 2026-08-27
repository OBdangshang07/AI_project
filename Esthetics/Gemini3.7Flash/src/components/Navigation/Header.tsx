import React from 'react';
import { AudioToggle } from '../Audio/AudioToggle';
import { Eye, HelpCircle, Activity } from '../UI/Icons';
import type { ThinkingState } from '../../types';

interface HeaderProps {
  activeSection: string;
  thinkingState: ThinkingState;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenHelp: () => void;
  onOpenXRay: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  thinkingState,
  reducedMotion,
  onToggleReducedMotion,
  onOpenHelp,
  onOpenXRay,
}) => {
  const sections = [
    { id: 'hero', label: 'OVERTURE' },
    { id: 'tension', label: 'I. TENSION' },
    { id: 'crucible', label: 'II. CRUCIBLE' },
    { id: 'artifacts', label: 'III. SYNTHESIS' },
    { id: 'coda', label: 'IV. CODA' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Conceptual Signature */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e5a968] animate-pulse shadow-[0_0_12px_#e5a968]" />
          <div className="flex flex-col">
            <span className="font-serif-display text-base tracking-wide text-white font-medium">
              Topology of Thought
            </span>
            <span className="font-mono text-[10px] text-[#9a9ea8] tracking-widest uppercase">
              Creative Art Direction & Kinetic Engineering
            </span>
          </div>
        </div>

        {/* Center Chapter Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full glass-panel border-[rgba(255,255,255,0.08)]">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-[#e5a968] text-[#07080b] font-semibold shadow-[0_0_16px_rgba(229,169,104,0.4)]'
                    : 'text-[#9a9ea8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-2.5">
          {/* Live State Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-xs font-mono text-[#9a9ea8]">
            <Activity className="w-3 h-3 text-[#e5a968]" />
            <span className="text-[#e5a968] font-medium">{thinkingState.toUpperCase()}</span>
          </div>

          {/* Audio Synthesizer Toggle */}
          <AudioToggle />

          {/* X-Ray Cognitive Matrix Toggle */}
          <button
            onClick={onOpenXRay}
            className="p-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:border-[#e5a968] hover:text-[#e5a968] text-[#9a9ea8] transition-all"
            title="查看底层思考脉络矩阵 (X)"
            aria-label="View cognitive trace matrix"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all ${
              reducedMotion
                ? 'border-[#30d158] text-[#30d158] bg-[rgba(48,209,88,0.1)]'
                : 'border-[rgba(255,255,255,0.1)] text-[#9a9ea8] hover:text-white'
            }`}
            title="减弱动效模式 / Reduced Motion Mode"
            aria-label="Toggle reduced motion"
          >
            {reducedMotion ? 'CALM ON' : 'MOTION'}
          </button>

          {/* Keyboard Shortcuts Modal Trigger */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:border-[#e5a968] text-[#9a9ea8] hover:text-white transition-all"
            title="查看交互快捷指南 (?)"
            aria-label="Keyboard shortcuts and help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
