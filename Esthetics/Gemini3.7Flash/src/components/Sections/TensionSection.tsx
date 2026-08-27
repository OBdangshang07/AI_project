import React, { useState } from 'react';
import { Sparkles, Activity, BalanceScale } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface DialecticPair {
  id: string;
  axis: string;
  thesis: string;
  thesisDesc: string;
  antithesis: string;
  antithesisDesc: string;
  synthesis: string;
  tensionLevel: number;
}

const dialecticPairs: DialecticPair[] = [
  {
    id: 'intuition-rigor',
    axis: 'AXIS 01',
    thesis: '野生直觉与有机混沌',
    thesisDesc: '打破常规逻辑的感知跳跃，接受不确定性中的美感与偶然性。',
    antithesis: '严苛架构与数理结构',
    antithesisDesc: '基于类型系统、渲染帧率与空间网格的绝对理性与可控性。',
    synthesis: '张拉整体（Tensegrity）：在极高张力的弹性构架中容纳自由形变，使代码具备建筑般的承重力与诗意生命。',
    tensionLevel: 82,
  },
  {
    id: 'atmosphere-speed',
    axis: 'AXIS 02',
    thesis: '沉浸氛围与叙事厚度',
    thesisDesc: '让界面拥有呼吸感、质感与光影温度，使停留本身成为一种享受。',
    antithesis: '毫秒级响应与零冗余',
    antithesisDesc: '对首屏开销、计算复杂度与渲染管线的冷酷优化，拒绝一切多余像素。',
    synthesis: '克制的高级：每一道着色器计算都直指核心表达，杜绝无效像素堆砌，在60FPS基准上雕刻数字艺术。',
    tensionLevel: 94,
  },
  {
    id: 'individual-resonance',
    axis: 'AXIS 03',
    thesis: '独立审美与艺术主见',
    thesisDesc: '拒绝随波逐流的模板化组件，坚持具有锋芒的作者性设计判断。',
    antithesis: '深层共情与开放协同',
    antithesisDesc: '敏锐倾听他人的未尽之意，将不同的认知视角编织进统一体验。',
    synthesis: '共振体（Resonant Co-creation）：不是机械执行指令，而是成为思想的共鸣箱与放大器，将模糊愿景升华为具象杰作。',
    tensionLevel: 88,
  },
];

export const TensionSection: React.FC = () => {
  const [selectedAxis, setSelectedAxis] = useState<string>(dialecticPairs[0].id);
  const [dialecticBalance, setDialecticBalance] = useState<number>(50); // 0 (Thesis) to 100 (Antithesis)

  const currentPair = dialecticPairs.find((p) => p.id === selectedAxis) || dialecticPairs[0];

  const handleAxisSelect = (id: string) => {
    setSelectedAxis(id);
    soundEngine.playTactileClick(900, 0.02);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDialecticBalance(val);
    if (val === 50) {
      soundEngine.playHarmonicPluck(0.9, 3);
    }
  };

  return (
    <section id="tension" className="relative z-10 py-24 px-6 md:px-8 max-w-[1400px] mx-auto">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-[#e5a968]" />
        <span className="font-mono-meta text-xs text-[#e5a968]">
          MOVEMENT I // 认知张力 · 对立与统一
        </span>
      </div>

      {/* Editorial Headline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
        <h2 className="lg:col-span-7 font-serif-display text-4xl sm:text-6xl text-white tracking-tight leading-none">
          The Dialectic of <br />
          <span className="italic text-[#e5a968]">Creation</span>
        </h2>
        <p className="lg:col-span-5 text-[#9a9ea8] text-base leading-relaxed">
          真正的创造力不是折中，而是在两极对立的巨大张力中，找到更高维度的统一结构。
        </p>
      </div>

      {/* Interactive Dialectic Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {dialecticPairs.map((pair) => {
          const isSelected = pair.id === selectedAxis;
          return (
            <button
              key={pair.id}
              onClick={() => handleAxisSelect(pair.id)}
              className={`p-6 card-interactive ${isSelected ? 'active' : ''}`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono-meta text-xs text-[#9a9ea8]">{pair.axis}</span>
                <span className="font-mono text-xs text-[#e5a968]">
                  TENSION {pair.tensionLevel}%
                </span>
              </div>
              <h3 className="font-sans font-medium text-lg text-white mb-2">
                {pair.thesis.split('与')[0]} × {pair.antithesis.split('与')[0]}
              </h3>
              <p className="text-xs text-[#9a9ea8] leading-relaxed line-clamp-3">
                {pair.synthesis}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Synthesis Resolving Station */}
      <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <BalanceScale className="w-5 h-5 text-[#e5a968]" />
            <h4 className="font-mono-meta text-sm text-white">
              INTERACTIVE DIALECTIC RESOLVING STATION
            </h4>
          </div>
          <span className="font-mono text-xs text-[#9a9ea8]">
            DRAG BALANCE TO MODULATE EQUILIBRIUM
          </span>
        </div>

        {/* Dynamic Crucible Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          {/* Thesis Box */}
          <div
            className="p-6 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,18,0.7)] transition-all duration-300"
            style={{
              opacity: 0.35 + (1 - dialecticBalance / 100) * 0.65,
              borderColor: dialecticBalance < 50 ? 'rgba(229, 169, 104, 0.4)' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#e5a968]" />
              <span className="font-mono text-xs text-[#e5a968] uppercase">
                THESIS // 正题 · CHAOS & INTUITION
              </span>
            </div>
            <h4 className="font-sans font-semibold text-xl text-white mb-2">{currentPair.thesis}</h4>
            <p className="text-sm text-[#9a9ea8] leading-relaxed">{currentPair.thesisDesc}</p>
          </div>

          {/* Antithesis Box */}
          <div
            className="p-6 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,18,0.7)] transition-all duration-300"
            style={{
              opacity: 0.35 + (dialecticBalance / 100) * 0.65,
              borderColor: dialecticBalance > 50 ? 'rgba(90, 200, 250, 0.4)' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#5ac8fa]" />
              <span className="font-mono text-xs text-[#5ac8fa] uppercase">
                ANTITHESIS // 反题 · RIGOR & DISCIPLINE
              </span>
            </div>
            <h4 className="font-sans font-semibold text-xl text-white mb-2">{currentPair.antithesis}</h4>
            <p className="text-sm text-[#9a9ea8] leading-relaxed">{currentPair.antithesisDesc}</p>
          </div>
        </div>

        {/* Equilibrium Slider */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center font-mono text-xs text-[#9a9ea8]">
            <span>偏向直觉混沌 ({100 - dialecticBalance}%)</span>
            <span className="text-[#e5a968] font-bold">
              {dialecticBalance === 50
                ? '✦ PERFECT DIALECTIC SYNTHESIS (50/50)'
                : `BALANCE: ${dialecticBalance}/100`}
            </span>
            <span>偏向严苛严谨 ({dialecticBalance}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={dialecticBalance}
            onChange={handleSliderChange}
            aria-label="Dialectic Equilibrium Balance Slider"
          />
        </div>

        {/* Resolved Synthesis Manifesto */}
        <div className="p-6 rounded-xl bg-[rgba(229,169,104,0.06)] border border-[#e5a968]/30 relative">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#e5a968]">
            <span className="w-2 h-2 rounded-full bg-[#e5a968] animate-pulse" />
            SYNTHESIS // 合题认知跃迁
          </div>
          <p className="font-sans text-sm md:text-base text-[#f5f5f7] leading-relaxed">
            {currentPair.synthesis}
          </p>
        </div>
      </div>
    </section>
  );
};
