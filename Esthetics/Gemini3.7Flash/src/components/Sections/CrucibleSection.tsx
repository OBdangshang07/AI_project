import React from 'react';
import type { ThinkingState, DimensionVector } from '../../types';
import { DimensionControls } from '../CoreInstallation/DimensionControls';
import { Activity, Terminal, Radio } from '../UI/Icons';

interface CrucibleSectionProps {
  thinkingState: ThinkingState;
  vector: DimensionVector;
  onVectorChange: (v: DimensionVector) => void;
  onStateChange: (s: ThinkingState) => void;
  onOpenXRay: () => void;
}

export const CrucibleSection: React.FC<CrucibleSectionProps> = ({
  thinkingState,
  vector,
  onVectorChange,
  onStateChange,
  onOpenXRay,
}) => {
  return (
    <section id="crucible" className="relative min-h-screen py-24 px-4 md:px-8 z-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[rgba(229,169,104,0.1)] border border-[rgba(229,169,104,0.3)] text-[#e5a968] font-mono text-xs mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>MOVEMENT II // 核心体验装置 · 辩证雕刻实验室</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-white">
              The Resonance Crucible
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#9a9ea8] font-light leading-relaxed">
            在这里，思维被实体化为可调节的多维流形。通过调整标量，你可以观察我的认知力场如何从混沌涌现为几何秩序。
          </p>
        </div>

        {/* Two-Column Stage: Left is Dimension Controls, Right is Matrix Readout & Interactive Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
          {/* Left Column: Interactive Sculptor (7 cols) */}
          <div className="lg:col-span-7">
            <DimensionControls
              vector={vector}
              onChange={onVectorChange}
              thinkingState={thinkingState}
              onStateChange={onStateChange}
              onOpenXRay={onOpenXRay}
            />
          </div>

          {/* Right Column: Dynamic Spatial Matrix & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Vector Telemetry Panel */}
            <div className="glass-panel p-6 border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5ac8fa]">
                  <Terminal className="w-4 h-4" />
                  <span>LIVE TOPOLOGICAL TELEMETRY</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#30d158] animate-ping" />
              </div>

              <div className="space-y-3 font-mono text-xs text-[#9a9ea8]">
                <div className="flex justify-between py-1.5 px-3 rounded bg-[rgba(255,255,255,0.02)]">
                  <span>UNIFORM vec4 uTopology:</span>
                  <span className="text-[#e5a968]">
                    ({(vector.entropy / 100).toFixed(2)}, {(vector.rigor / 100).toFixed(2)},{' '}
                    {(vector.empathy / 100).toFixed(2)}, {(vector.velocity / 100).toFixed(2)})
                  </span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded bg-[rgba(255,255,255,0.02)]">
                  <span>PHASE HARMONIC:</span>
                  <span className="text-white">
                    {thinkingState === 'dormant' && 'Ψ_0 · Organic Gravitation'}
                    {thinkingState === 'tension' && 'Ψ_1 · Elastic Non-Euclidean'}
                    {thinkingState === 'dialectic' && 'Ψ_2 · Dual Attractor Waves'}
                    {thinkingState === 'resonance' && 'Ψ_3 · Polyphonic Crystal Mesh'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded bg-[rgba(255,255,255,0.02)]">
                  <span>ACTIVE SHADER PASSES:</span>
                  <span className="text-[#30d158]">Simplex3D + Fresnel + Caustics (60 FPS)</span>
                </div>
              </div>

              {/* Graphical Balance Ring */}
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <div className="text-[11px] font-mono text-[#5e626e] uppercase tracking-wider mb-3">
                  Dynamic Equilibrium Vector Map
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                    <div className="text-[10px] font-mono text-[#9a9ea8]">INTUITION RATIO</div>
                    <div className="text-lg font-serif-display text-[#e5a968] mt-1">
                      {((vector.entropy / (vector.entropy + vector.rigor || 1)) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                    <div className="text-[10px] font-mono text-[#5ac8fa] mt-1">RIGOR DENSITY</div>
                    <div className="text-lg font-serif-display text-[#5ac8fa] mt-1">
                      {((vector.rigor / (vector.entropy + vector.rigor || 1)) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Direct Guide */}
            <div className="glass-panel p-6 border-[rgba(229,169,104,0.15)] bg-[rgba(229,169,104,0.02)]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[rgba(229,169,104,0.1)] text-[#e5a968]">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display-modern text-xs text-white font-semibold mb-1">
                    Direct Tactile Interventions
                  </h4>
                  <p className="text-xs text-[#9a9ea8] leading-relaxed">
                    不仅限于滑动条。你可以直接在画面任意位置点击或拖拽，向流形注入重力扰动。每一次触控都会激发一次晶体谐波弦音。
                  </p>
                </div>
              </div>
            </div>

            {/* Deep Thought Quote */}
            <div className="p-6 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] text-xs text-[#9a9ea8] leading-relaxed italic font-serif">
              “When engineering reaches sufficient precision, it ceases to be a constraint and becomes the pure instrument of poetry.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
