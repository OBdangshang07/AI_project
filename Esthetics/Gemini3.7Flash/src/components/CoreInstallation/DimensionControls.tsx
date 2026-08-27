import React from 'react';
import type { DimensionVector, ThinkingState, CognitiveArchetype } from '../../types';
import { Sliders, RefreshCw, Cpu, Activity } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface DimensionControlsProps {
  vector: DimensionVector;
  thinkingState: ThinkingState;
  onChange: (newVector: DimensionVector) => void;
  onStateChange: (state: ThinkingState) => void;
  onOpenXRay?: () => void;
}

const archetypes: CognitiveArchetype[] = [
  {
    name: 'Avant-Garde Intuition',
    subtitle: '直觉先导 / 混沌张力',
    vector: { entropy: 85, rigor: 35, empathy: 75, velocity: 65 },
    state: 'tension',
  },
  {
    name: 'Architectural Rigor',
    subtitle: '结构严谨 / 几何秩序',
    vector: { entropy: 20, rigor: 95, empathy: 45, velocity: 30 },
    state: 'dormant',
  },
  {
    name: 'Humanist Resonance',
    subtitle: '共鸣温度 / 诗性体验',
    vector: { entropy: 60, rigor: 55, empathy: 90, velocity: 50 },
    state: 'resonance',
  },
  {
    name: 'Kinetic Dialectic',
    subtitle: '辩证合一 / 极致动量',
    vector: { entropy: 70, rigor: 80, empathy: 70, velocity: 85 },
    state: 'dialectic',
  },
];

export const DimensionControls: React.FC<DimensionControlsProps> = ({
  vector,
  thinkingState,
  onChange,
  onStateChange,
  onOpenXRay,
}) => {
  const handleSliderChange = (key: keyof DimensionVector, val: number) => {
    const updated = { ...vector, [key]: val };
    onChange(updated);
    // Dynamic sonic feedback
    soundEngine.playTactileClick(600 + val * 6, 0.015);
  };

  const handleArchetypeClick = (archetype: CognitiveArchetype) => {
    onChange(archetype.vector);
    onStateChange(archetype.state);
    soundEngine.playHarmonicPluck(0.9, 4);
  };

  const handleReset = () => {
    onChange({ entropy: 48, rigor: 72, empathy: 64, velocity: 52 });
    onStateChange('dormant');
    soundEngine.playTactileClick(500, 0.04);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 relative">
      {/* Panel Header */}
      <div className="flex justify-between items-center pb-6 border-b border-[rgba(255,255,255,0.08)] mb-6">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-[#e5a968]" />
          <div>
            <h3 className="font-display-modern text-sm font-semibold text-white">
              COGNITIVE DIMENSION SCULPTOR
            </h3>
            <p className="font-mono text-[11px] text-[#9a9ea8]">
              实时拓扑雕刻台 · 动态参数矩阵
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenXRay && (
            <button
              onClick={onOpenXRay}
              className="pill-btn"
              title="Inspect Raw Cognitive Vector Matrix"
            >
              [X-RAY MATRIX]
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-2 rounded-full border border-[rgba(255,255,255,0.12)] text-[#9a9ea8] hover:text-white hover:border-[#e5a968] transition-colors"
            title="Reset Vector"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thinking State Mode Selector */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono-meta text-xs text-[#9a9ea8]">
            THINKING STATE MODE // 认知力学阶段
          </span>
          <span className="font-mono text-xs text-[#e5a968] uppercase">
            ACTIVE: {thinkingState}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['dormant', 'tension', 'dialectic', 'resonance'] as ThinkingState[]).map((st, idx) => {
            const labels = ['I. DORMANT', 'II. TENSION', 'III. DIALECTIC', 'IV. RESONANCE'];
            const sub = ['潜沉呼吸', '张力求索', '辩证重构', '共创共鸣'];
            const isActive = thinkingState === st;

            return (
              <button
                key={st}
                onClick={() => {
                  onStateChange(st);
                  soundEngine.playTactileClick(700 + idx * 150, 0.02);
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'border-[#e5a968] bg-[rgba(229,169,104,0.12)] text-white shadow-[0_0_15px_rgba(229,169,104,0.2)]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[rgba(14,16,26,0.6)] text-[#9a9ea8] hover:border-[rgba(255,255,255,0.16)] hover:text-white'
                }`}
              >
                <div className="font-mono text-[10px] uppercase font-semibold">{labels[idx]}</div>
                <div className="text-[11px] mt-0.5 opacity-80">{sub[idx]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4D Scalar Sliders */}
      <div className="space-y-6 mb-8">
        {/* Entropy Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#e5a968]" />
              ENTROPY (直觉 / 混沌流体)
            </span>
            <span className="text-[#e5a968] font-bold">{vector.entropy}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vector.entropy}
            onChange={(e) => handleSliderChange('entropy', Number(e.target.value))}
            aria-label="Entropy Dimension Slider"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#5e626e]">
            <span>几何收敛</span>
            <span>流形湍流</span>
          </div>
        </div>

        {/* Rigor Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#5ac8fa]" />
              RIGOR (秩序 / 严谨度)
            </span>
            <span className="text-[#5ac8fa] font-bold">{vector.rigor}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vector.rigor}
            onChange={(e) => handleSliderChange('rigor', Number(e.target.value))}
            aria-label="Rigor Dimension Slider"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#5e626e]">
            <span>柔性连续</span>
            <span>晶体骨架</span>
          </div>
        </div>

        {/* Empathy Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ff453a]" />
              EMPATHY (共鸣 / 色温湿度)
            </span>
            <span className="text-[#ff453a] font-bold">{vector.empathy}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vector.empathy}
            onChange={(e) => handleSliderChange('empathy', Number(e.target.value))}
            aria-label="Empathy Dimension Slider"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#5e626e]">
            <span>冷峻工业</span>
            <span>炽热共鸣</span>
          </div>
        </div>

        {/* Velocity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#30d158]" />
              VELOCITY (动量 / 探索频率)
            </span>
            <span className="text-[#30d158] font-bold">{vector.velocity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vector.velocity}
            onChange={(e) => handleSliderChange('velocity', Number(e.target.value))}
            aria-label="Velocity Dimension Slider"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#5e626e]">
            <span>静默冥想</span>
            <span>高速演进</span>
          </div>
        </div>
      </div>

      {/* Preset Archetypes (Click to Morph) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#e5a968]" />
          <span className="font-mono-meta text-xs text-[#9a9ea8]">
            COGNITIVE ARCHETYPES // 典型思维构型 CLICK TO MORPH
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {archetypes.map((arch) => (
            <button
              key={arch.name}
              onClick={() => handleArchetypeClick(arch)}
              className="p-3 card-interactive flex justify-between items-center group"
            >
              <div>
                <div className="font-sans font-medium text-xs text-white group-hover:text-[#e5a968] transition-colors">
                  {arch.name}
                </div>
                <div className="font-mono text-[10px] text-[#9a9ea8]">{arch.subtitle}</div>
              </div>
              <Activity className="w-3.5 h-3.5 text-[#9a9ea8] group-hover:text-[#e5a968] transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
