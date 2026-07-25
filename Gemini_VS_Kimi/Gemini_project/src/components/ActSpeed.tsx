import React, { useState } from 'react';
import { Zap, Clock, FastForward, Play } from 'lucide-react';
import { audioController } from '../utils/audio';

interface ActSpeedProps {
  latencyMs: number;
  setLatencyMs: React.Dispatch<React.SetStateAction<number>>;
}

export const ActSpeed: React.FC<ActSpeedProps> = ({ latencyMs, setLatencyMs }) => {
  const [testInput, setTestInput] = useState('');
  const [tokensProcessed, setTokensProcessed] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLatencyMs(val);
    audioController.playModulation(1 - val / 300);
  };

  const handleRunSpeedTest = () => {
    if (!testInput.trim()) return;
    setIsProcessing(true);
    setTokensProcessed([]);

    const chars = testInput.split('');
    chars.forEach((ch, idx) => {
      setTimeout(() => {
        setTokensProcessed((prev) => [...prev, ch]);
        audioController.playPulseClick(1.0 + (idx % 5) * 0.2);
        if (idx === chars.length - 1) {
          setIsProcessing(false);
        }
      }, idx * (latencyMs / 10));
    });
  };

  return (
    <section
      id="act1"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center z-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Slider Controller */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>ACT 01 // FLASH SPEED</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            0.18 秒 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0066FF]">
              思考不是等待，而是瞬时爆发的光束
            </span>
          </h2>

          <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed">
            极速 (Flash Speed) 并非牺牲深度的简化，而是高维算力架构下的瞬时聚光。
            通过拖拽下方控制器，你可以直接改变折射体的**计算脉冲周期 (Sampling Latency)**，观察 WebGL 晶体与电荷粒子的高频震荡。
          </p>

          {/* Real-time Interactive Latency Controller */}
          <div className="bg-[#0e0e12] border border-white/10 p-6 rounded-2xl space-y-6 glow-blue">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00F0FF]" /> LATENCY MODULATOR (延迟调谐器)
              </label>
              <span className="text-xl font-mono font-bold text-[#00F0FF]">
                {latencyMs} <span className="text-xs text-gray-400">ms</span>
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={latencyMs}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                aria-label="Latency Modulator Slider"
              />
              <div className="flex justify-between text-[11px] font-mono text-gray-500">
                <span>20ms (Hyper-Flash)</span>
                <span>180ms (Standard Flash)</span>
                <span>300ms (Heavy Mode)</span>
              </div>
            </div>

            {/* Benchmark Speed Meter comparison */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="text-xs font-mono text-gray-400">MODEL LATENCY BENCHMARK COMPARISON</div>

              <div className="space-y-2 text-xs font-mono">
                {/* Legacy models */}
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-400">
                    <span>Legacy Heavy LLMs</span>
                    <span>1200ms</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-600 rounded-full w-[85%]" />
                  </div>
                </div>

                {/* Gemini 3.6 Flash Current */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[#00F0FF] font-semibold">
                    <span>GEMINI 3.6 FLASH (YOU ARE HERE)</span>
                    <span>{latencyMs}ms</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-[#00F0FF]/30 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((latencyMs / 1200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Live Token Refraction Simulator */}
        <div className="lg:col-span-6 bg-[#0e0e12]/90 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-gray-300 flex items-center gap-2">
              <FastForward className="w-4 h-4 text-[#00F0FF]" /> MICRO-TOKEN REFRACTION SIMULATOR
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
              LIVE PROBE
            </span>
          </div>

          <p className="text-xs font-mono text-gray-400">
            输入任意一句话，体验在当前 {latencyMs}ms 延迟配置下的逐 Token 折射速率：
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="输入你的创意灵感 (例: 探索高维折射体)"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF]"
              onKeyDown={(e) => e.key === 'Enter' && handleRunSpeedTest()}
            />
            <button
              onClick={handleRunSpeedTest}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#00F0FF] text-white hover:text-black font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>REFRACT</span>
            </button>
          </div>

          {/* Token Output Matrix */}
          <div className="min-h-[140px] bg-black/50 border border-white/10 p-4 rounded-xl font-mono text-xs space-y-3">
            <div className="text-gray-500 text-[10px] border-b border-white/5 pb-2">REFRACTED TOKEN STREAM:</div>
            <div className="flex flex-wrap gap-1.5">
              {tokensProcessed.map((token, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] animate-fade-in"
                >
                  {token}
                </span>
              ))}
              {tokensProcessed.length === 0 && (
                <span className="text-gray-600 italic">等待折射指令输入...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
