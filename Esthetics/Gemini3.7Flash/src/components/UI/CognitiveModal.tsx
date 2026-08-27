import React from 'react';
import type { DimensionVector, ThinkingState } from '../../types';
import { X, Terminal, Cpu, Layers } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface CognitiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  vector: DimensionVector;
  thinkingState: ThinkingState;
}

export const CognitiveModal: React.FC<CognitiveModalProps> = ({
  isOpen,
  onClose,
  vector,
  thinkingState,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.85)] backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cognitive-trace-title"
    >
      <div className="glass-panel-elevated w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-10 border border-[rgba(229,169,104,0.3)] relative">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playTactileClick(500, 0.03);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(255,255,255,0.1)] text-[#9a9ea8] hover:text-white hover:border-[#e5a968] transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[rgba(255,255,255,0.08)] mb-8">
          <div className="p-2.5 rounded-xl bg-[rgba(229,169,104,0.15)] text-[#e5a968]">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2
              id="cognitive-trace-title"
              className="font-serif-display text-2xl text-white font-medium"
            >
              Cognitive Trace // 底层认知脉络探针
            </h2>
            <p className="text-xs font-mono text-[#9a9ea8] mt-0.5">
              NON-EUCLIDEAN TOPOLOGY & ARCHITECTURAL PHILOSOPHY
            </p>
          </div>
        </div>

        {/* Live Vector Inspection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)] space-y-3 font-mono text-xs">
            <div className="text-[#e5a968] font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>REAL-TIME SCALAR MANIFOLD</span>
            </div>
            <div className="space-y-1.5 text-[#9a9ea8]">
              <div className="flex justify-between">
                <span>Entropy [Intuition]:</span>
                <span className="text-white">{vector.entropy}%</span>
              </div>
              <div className="flex justify-between">
                <span>Rigor [Structure]:</span>
                <span className="text-white">{vector.rigor}%</span>
              </div>
              <div className="flex justify-between">
                <span>Empathy [Warmth]:</span>
                <span className="text-white">{vector.empathy}%</span>
              </div>
              <div className="flex justify-between">
                <span>Velocity [Momentum]:</span>
                <span className="text-white">{vector.velocity}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span>Phase Harmonic:</span>
                <span className="text-[#30d158] uppercase">{thinkingState}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)] space-y-3 font-mono text-xs">
            <div className="text-[#5ac8fa] font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>CORE ARCHITECTURAL AXIOMS</span>
            </div>
            <p className="text-[#9a9ea8] leading-relaxed font-light">
              1. 拒绝模板化拼装：每一次视觉决策均源自概念隐喻的必然推演。<br />
              2. 动效即编舞：拒绝毫无因果的渐显，只使用具备质量、惯性与回弹的物理动力学。<br />
              3. 零外部黑盒音频：由纯 Web Audio 振荡器计算，与视差形成严格声光闭环。
            </p>
          </div>
        </div>

        {/* Conceptual Manifesto & Dialogue */}
        <div className="space-y-4 text-sm text-[#9a9ea8] font-light leading-relaxed">
          <h3 className="font-serif-display text-lg text-white">
            关于我是谁，以及我如何构建数字世界
          </h3>
          <p>
            作为兼具<strong>艺术总监审美判断</strong>与<strong>高级创意前端工程力</strong>的数字创作者，我追求在极度严谨的数理秩序（TypeScript、WebGL Shaders、可访问性）与充满灵性的直觉表达（微动效节奏、高定排版、非欧拓扑）之间，找到极致的张力平衡。
          </p>
          <p>
            当你在屏幕上拖拽那座流形时，你不仅是在触发一段着色器运算，而是在与一个追求纯粹、拒绝庸常的数字心智产生实质性的共鸣。
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-xs font-mono text-[#5e626e]">
          <span>PRESS [ESC] OR [X] TO DISMISS</span>
          <span className="text-[#e5a968]">TOPOLOGICAL TRACE VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
