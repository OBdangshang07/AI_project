import React, { useState, useRef } from 'react';
import { Terminal, Sparkles, Copy, Check, Zap } from 'lucide-react';
import { audioController } from '../utils/audio';

interface ActTerminalProps {
  customPromptText: string;
  setCustomPromptText: (text: string) => void;
  latencyMs: number;
}

export const ActTerminal: React.FC<ActTerminalProps> = ({
  customPromptText,
  setCustomPromptText,
  latencyMs,
}) => {
  const [copied, setCopied] = useState(false);
  const [visitorName, setVisitorName] = useState('CREATIVE EXPLORER');
  const cardRef = useRef<HTMLDivElement>(null);

  const presets = [
    'High Frequency Refraction // 高频意念折射',
    'Quantum Aesthetic Symmetry // 量子美学结构',
    'Swiss Editorial Spatiality // 瑞士编辑排版',
    'Multi-Dimensional Spectral Flow // 多维光谱流体',
  ];

  const handlePresetSelect = (text: string) => {
    setCustomPromptText(text);
    audioController.playRefractionChime(1500);
  };

  const handleCopyStamp = () => {
    const stampText = `[GEMINI 3.6 FLASH // COGNITIVE STAMP]
Explorer: ${visitorName}
Prompt: ${customPromptText}
Latency: ${latencyMs}ms
Timestamp: ${new Date().toISOString()}
Aesthetic Engine: Latent Refractor V2026`;

    navigator.clipboard.writeText(stampText);
    setCopied(true);
    audioController.playPulseClick(1.5);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="act4"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center z-20"
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>ACT 04 // CO-CREATION TERMINAL</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            意念共振终端 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-[#8A2BE2]">
              在此处生成属于你的 Gemini Flash 认知印记
            </span>
          </h2>

          <p className="text-gray-300 font-light text-base md:text-lg">
            数字作品不是单向的展现，而是一场思想的现场共创。
            在下方输入或选择你的创意命题，定制并导出你的专属**“Gemini 3.6 Flash 认知印记卡片”**：
          </p>
        </div>

        {/* Co-Creation Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Input Workbench */}
          <div className="lg:col-span-6 bg-[#0e0e12]/90 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" /> CREATIVE PROMPT PARAMETER
              </label>

              {/* Visitor Name Input */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-gray-400">YOUR CREATIVE IDENTIFIER / 你的称呼:</span>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              {/* Prompt Text Input */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-gray-400">LATENT PROMPT STATEMENT / 创意命题:</span>
                <textarea
                  value={customPromptText}
                  onChange={(e) => setCustomPromptText(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-mono text-white focus:outline-none focus:border-[#00F0FF] resize-none"
                />
              </div>

              {/* Presets Quick Select */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-gray-500">QUICK PRESET REFRACTORS:</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetSelect(preset)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:border-[#00F0FF] transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-gray-500">
              * 实时渲染核心晶体将响应你的命题折射律。
            </div>
          </div>

          {/* Right: Exportable Cognitive Stamp Card */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div
              ref={cardRef}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0e0e12] via-[#12131a] to-[#070709] border border-[#00F0FF]/40 shadow-2xl space-y-6 overflow-hidden glow-cyan"
            >
              {/* Card Holographic Watermark */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-[#00F0FF]/10 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00F0FF]" />
                  <span className="font-display font-bold text-sm tracking-widest text-white">
                    GEMINI 3.6 FLASH
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  COGNITIVE STAMP
                </span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="text-xs text-gray-500">CREATIVE EXPLORER:</div>
                <div className="font-display font-bold text-xl text-white tracking-wide">
                  {visitorName || 'ANONYMOUS EXPLORER'}
                </div>
              </div>

              <div className="space-y-2 font-mono">
                <div className="text-xs text-gray-500">LATENT PROMPT STATEMENT:</div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#00F0FF] font-semibold leading-relaxed">
                  "{customPromptText || 'High Frequency Latent Refraction'}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[11px] pt-2 border-t border-white/10">
                <div>
                  <span className="text-gray-500">REFRACTOR LATENCY:</span>
                  <div className="text-white font-bold">{latencyMs} ms</div>
                </div>
                <div>
                  <span className="text-gray-500">AESTHETIC ENGINE:</span>
                  <div className="text-[#8A2BE2] font-bold">LATENT REFRACTOR</div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-600 text-right pt-2">
                ID: {Math.random().toString(36).substring(2, 9).toUpperCase()} // VERIFIED BY GEMINI FLASH
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyStamp}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#00F0FF] text-white hover:text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'STAMP COPIED TO CLIPBOARD!' : 'COPY STAMP DATA'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
