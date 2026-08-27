import React from 'react';
import type { ThinkingState, DimensionVector } from '../../types';
import { Compass, MousePointerClick, ArrowDown, Activity } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface HeroSectionProps {
  thinkingState: ThinkingState;
  vector: DimensionVector;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  thinkingState,
  vector,
  onExploreClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 z-10 pointer-events-none"
    >
      {/* Top Meta Bar */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded border border-[rgba(229,169,104,0.3)] bg-[rgba(229,169,104,0.06)] text-[#e5a968] font-mono text-xs">
            OPUS // 2026
          </span>
          <span className="text-xs font-mono text-[#9a9ea8]">
            SPATIAL COGNITIVE MATRIX · NON-EUCLIDEAN TOPOLOGY
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-[#9a9ea8]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ac8fa]"></span>
            <span>RIGOR: {vector.rigor}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5a968]"></span>
            <span>ENTROPY: {vector.entropy}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff453a]"></span>
            <span>EMPATHY: {vector.empathy}%</span>
          </div>
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="max-w-[1400px] w-full mx-auto my-auto py-12 pointer-events-none">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono-meta text-[#e5a968] tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>A Living Manifesto on Thought, Form & Resonance</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.04] text-white tracking-tight">
            I do not build pages.{' '}
            <span className="italic font-light text-[#e5a968] block">
              I sculpt thought under tension.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#9a9ea8] max-w-2xl font-light leading-relaxed">
            思维并非静态的履历，而是一座受直觉与理性双重张力驱动的动态流形。
            在此，代码即材料，交互即对话，每一次触碰都在重塑认知的几何边界。
          </p>

          {/* Interactive Action Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                soundEngine.playHarmonicPluck(0.9, 4);
                onExploreClick();
              }}
              className="btn-sculptural active"
            >
              <Compass className="w-4 h-4" />
              <span>进入认知辩证雕刻场</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel text-xs font-mono text-[#9a9ea8]">
              <MousePointerClick className="w-3.5 h-3.5 text-[#e5a968] animate-bounce" />
              <span>按住并拖拽中央流形以激发共振弦波</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue & Dimensional Readout */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[rgba(255,255,255,0.06)] pt-6 pointer-events-auto">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-[10px] font-mono text-[#5e626e] tracking-widest uppercase">
              Current Mode
            </div>
            <div className="text-sm font-mono text-white font-medium capitalize mt-0.5">
              {thinkingState}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#5e626e] tracking-widest uppercase">
              Resonance Frequency
            </div>
            <div className="text-sm font-mono text-[#e5a968] font-medium mt-0.5">
              {(130.81 + vector.velocity * 4.2).toFixed(1)} Hz
            </div>
          </div>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 text-xs font-mono text-[#9a9ea8] hover:text-white transition-colors group"
        >
          <span>SCROLL TO TRAVERSE MOVEMENTS</span>
          <ArrowDown className="w-4 h-4 text-[#e5a968] group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
