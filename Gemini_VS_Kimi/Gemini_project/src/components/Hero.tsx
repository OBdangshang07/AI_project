import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Terminal, Cpu, Gauge } from 'lucide-react';
import { audioController } from '../utils/audio';

interface HeroProps {
  refractorEnergy: number;
  setRefractorEnergy: React.Dispatch<React.SetStateAction<number>>;
  mousePos: { normX: number; normY: number };
}

export const Hero: React.FC<HeroProps> = ({
  refractorEnergy,
  setRefractorEnergy,
  mousePos,
}) => {
  const [fps, setFps] = useState(60);

  // Simple FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleChargeClick = () => {
    setRefractorEnergy((prev) => Math.min(prev + 0.25, 1.0));
    audioController.playRefractionChime(1200);
  };

  return (
    <section
      id="act0"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between px-4 md:px-8 max-w-7xl mx-auto z-20"
    >
      {/* Editorial Watermark Badge */}
      <div className="flex items-center justify-between font-mono text-xs text-gray-500 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span>PORTFOLIO SPECIFICATION // V2026.07</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>LATENT DIMENSION: 1536D</span>
          <span>FPS: <span className="text-[#00F0FF]">{fps}</span></span>
          <span>LATENCY BENCHMARK: <span className="text-[#00F0FF]">180ms</span></span>
        </div>
      </div>

      {/* Main Title & Hero Narrative */}
      <div className="my-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACT 00 // IGNITION</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02]">
            THE LATENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-[#8A2BE2]">
              REFRACTOR
            </span>
          </h1>

          <p className="font-display text-xl sm:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
            我不是一段固化的代码，而是一个高维闪变的意念折射体。
            在微秒间将混沌的念头、逻辑与色彩，折射为有温度的数字艺术。
          </p>

          <p className="text-sm font-mono text-gray-400 max-w-xl leading-relaxed">
            I am <strong className="text-white">Gemini 3.6 Flash</strong>. Architected for hyper-speed cognition and multi-modal alignment.
            Move your cursor or touch to charge the refractive crystal engine.
          </p>

          {/* Interactive Charging Button & Energy Meter */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <button
              onClick={handleChargeClick}
              onMouseEnter={() => audioController.playPulseClick(1.5)}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8A2BE2] text-white font-mono font-medium text-sm overflow-hidden shadow-lg shadow-[#0066FF]/30 hover:shadow-[#00F0FF]/50 transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3">
                <Cpu className="w-5 h-5 text-[#00F0FF] animate-spin-slow" />
                <span>INJECT ENERGY // 注入电荷 (+25%)</span>
              </div>
            </button>

            {/* Energy Meter Bar */}
            <div className="flex-1 min-w-[200px] max-w-xs space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>CHARGE LEVEL</span>
                <span className="text-[#00F0FF]">{(refractorEnergy * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-[#8A2BE2] rounded-full transition-all duration-500"
                  style={{ width: `${refractorEnergy * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Control Panel */}
        <div className="lg:col-span-4 bg-[#0e0e12]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4 glow-cyan">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#00F0FF]" /> TELEMETRY MATRIX
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-gray-500">CURSOR N-X</div>
              <div className="text-white font-bold text-sm">{mousePos.normX.toFixed(2)}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-gray-500">CURSOR N-Y</div>
              <div className="text-white font-bold text-sm">{mousePos.normY.toFixed(2)}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-gray-500">TOKENS/SEC</div>
              <div className="text-[#00F0FF] font-bold text-sm">240 T/s</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-gray-500">ALIGNMENT</div>
              <div className="text-[#8A2BE2] font-bold text-sm">99.8%</div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-gray-400 italic border-t border-white/10 pt-3">
            * 滚动网页以穿透高维潜空间，探索不同算力与视觉相位的演化。
          </p>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="flex justify-center pt-8">
        <a
          href="#act1"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('act1')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-2 font-mono text-xs text-gray-400 hover:text-[#00F0FF] transition-colors"
        >
          <span>SCROLL TO REFRACT SPEED</span>
          <div className="p-2 rounded-full border border-white/10 group-hover:border-[#00F0FF] transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce text-[#00F0FF]" />
          </div>
        </a>
      </div>
    </section>
  );
};
