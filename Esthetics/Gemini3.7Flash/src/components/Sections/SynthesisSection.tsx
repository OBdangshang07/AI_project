import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Send, Sparkles } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface PulseWave {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const harmonicPitches = [
  { name: 'C (Root)', freq: 261.63, note: '基频 · 沉稳本源' },
  { name: 'G (Fifth)', freq: 392.0, note: '五度 · 空间开阔' },
  { name: 'D (Ninth)', freq: 587.33, note: '九度 · 敏锐张力' },
  { name: 'E (Major 3rd)', freq: 659.25, note: '大三度 · 温暖共鸣' },
  { name: 'B (Major 7th)', freq: 987.77, note: '大七度 · 诗意空灵' },
];

export const SynthesisSection: React.FC = () => {
  const [selectedPitch, setSelectedPitch] = useState(0);
  const [message, setMessage] = useState('');
  const [sentCount, setSentCount] = useState(2);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<PulseWave[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize interactive wave pond simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Seed initial pulses
    wavesRef.current = [
      { id: 1, x: 120, y: 100, radius: 10, maxRadius: 180, alpha: 0.8, color: '#e5a968' },
      { id: 2, x: 260, y: 140, radius: 40, maxRadius: 220, alpha: 0.6, color: '#5ac8fa' },
    ];

    let pulseInterval = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw acoustic grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Render expanding wave ripples
      for (let i = wavesRef.current.length - 1; i >= 0; i--) {
        const w = wavesRef.current[i];
        w.radius += 1.2;
        w.alpha *= 0.985;

        if (w.radius > w.maxRadius || w.alpha < 0.02) {
          wavesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = w.color;
        ctx.globalAlpha = w.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary harmonic echo
        if (w.radius > 20) {
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.radius * 0.6, 0, Math.PI * 2);
          ctx.globalAlpha = w.alpha * 0.4;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Ambient background pulse generator
      pulseInterval++;
      if (pulseInterval > 160) {
        pulseInterval = 0;
        const colors = ['#e5a968', '#5ac8fa', '#ff453a'];
        wavesRef.current.push({
          id: Date.now(),
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 4,
          maxRadius: 160,
          alpha: 0.7,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#e5a968', '#5ac8fa', '#ff453a', '#30d158'];
    wavesRef.current.push({
      id: Date.now(),
      x,
      y,
      radius: 5,
      maxRadius: 240,
      alpha: 1.0,
      color: colors[selectedPitch % colors.length],
    });

    soundEngine.playHarmonicPluck(1.0, selectedPitch);
  };

  const handleSendPulse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const canvas = canvasRef.current;
    if (canvas) {
      wavesRef.current.push({
        id: Date.now(),
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        maxRadius: 300,
        alpha: 1.0,
        color: '#e5a968',
      });
    }

    soundEngine.playHarmonicPluck(1.2, selectedPitch);
    setSentCount((c) => c + 1);
    setMessage('');
  };

  return (
    <section id="coda" className="relative z-10 py-24 px-6 md:px-8 max-w-[1400px] mx-auto">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-[#30d158]" />
        <span className="font-mono-meta text-xs text-[#30d158]">
          CODA // 终章 · 开放共振场
        </span>
      </div>

      {/* Editorial Headline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
        <h2 className="lg:col-span-7 font-serif-display text-4xl sm:text-6xl text-white tracking-tight leading-none">
          Open Frequency & <br />
          <span className="italic text-[#e5a968]">Dialogue</span>
        </h2>
        <p className="lg:col-span-5 text-[#9a9ea8] text-base leading-relaxed">
          任何伟大的数字体验，最终都在与他人的心智共振中获得圆满。在此注入你的思想波频，与这片拓扑场一同回响。
        </p>
      </div>

      {/* Interactive Resonance Field */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Harmonic Wave Generator */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#e5a968]" />
                <h3 className="font-mono-meta text-xs text-white">
                  SPATIAL HARMONIC WAVE MATRIX
                </h3>
              </div>
              <span className="font-mono text-xs text-[#9a9ea8]">
                ACTIVE PULSES: {sentCount}
              </span>
            </div>

            {/* Ripple Canvas */}
            <div
              className="relative w-full h-64 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#07080b]/80 mb-6 cursor-crosshair group"
              onMouseEnter={() => setIsHoveringCanvas(true)}
              onMouseLeave={() => setIsHoveringCanvas(false)}
            >
              <canvas
                ref={canvasRef}
                width={600}
                height={260}
                className="w-full h-full"
                onClick={handleCanvasClick}
              />
              {isHoveringCanvas && (
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#e5a968] bg-[#07080b]/90 px-2 py-1 rounded border border-[#e5a968]/30 pointer-events-none">
                  CLICK TO TRIGGER HARMONIC RIPPLE
                </div>
              )}
            </div>

            {/* Pitch Selection Buttons */}
            <div className="space-y-2 mb-6">
              <span className="font-mono-meta text-xs text-[#9a9ea8]">
                CHOOSE HARMONIC PITCH // 选择共鸣音高
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {harmonicPitches.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setSelectedPitch(idx);
                      soundEngine.playTactileClick(600 + idx * 100, 0.02);
                    }}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      selectedPitch === idx
                        ? 'border-[#e5a968] bg-[rgba(229,169,104,0.15)] text-[#e5a968] font-bold shadow-[0_0_12px_rgba(229,169,104,0.3)]'
                        : 'border-[rgba(255,255,255,0.06)] bg-[rgba(14,16,26,0.6)] text-[#9a9ea8] hover:text-white hover:border-[rgba(255,255,255,0.18)]'
                    }`}
                  >
                    <div className="font-mono text-xs">{p.name.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-75">{p.name.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pulse Message Transmitter Form */}
          <form onSubmit={handleSendPulse} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="在此输入一句话，激发一段共鸣频率..."
              className="flex-1 px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(14,16,26,0.8)] text-white text-sm placeholder-[#656978] focus:border-[#e5a968] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#e5a968] text-[#07080b] font-mono text-xs uppercase font-semibold flex items-center gap-2 hover:bg-[#ffbe76] transition-all shadow-[0_0_20px_rgba(229,169,104,0.4)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>投射脉冲</span>
            </button>
          </form>
        </div>

        {/* Philosophy of Collaboration Card */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#e5a968]" />
              <h3 className="font-mono-meta text-xs text-[#9a9ea8]">
                CO-CREATION INQUIRY
              </h3>
            </div>

            <h4 className="font-serif-display text-2xl sm:text-3xl text-white mb-4">
              How We Collaborate
            </h4>

            <p className="font-sans text-sm text-[#9a9ea8] leading-relaxed mb-6">
              我视每一次合作不仅是一次功能交付，而是一场由双方直觉与严谨碰撞而成的拓扑探索。从无到有，从模糊意向到具备美术馆质感的数字产品。
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[rgba(14,16,26,0.6)] border border-[rgba(255,255,255,0.06)]">
                <div className="font-mono text-xs text-[#e5a968] mb-1">01. 概念解构与审美立意</div>
                <div className="text-xs text-[#9a9ea8] leading-relaxed">
                  拒绝平庸的套版思维，确立独一无二的视觉隐喻与艺术主张。
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(14,16,26,0.6)] border border-[rgba(255,255,255,0.06)]">
                <div className="font-mono text-xs text-[#5ac8fa] mb-1">02. 动力学编舞与原型雕琢</div>
                <div className="text-xs text-[#9a9ea8] leading-relaxed">
                  赋予每一个微交互以物理质感、触觉声场与呼吸节奏。
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(14,16,26,0.6)] border border-[rgba(255,255,255,0.06)]">
                <div className="font-mono text-xs text-[#30d158] mb-1">03. 建筑级工程交付</div>
                <div className="text-xs text-[#9a9ea8] leading-relaxed">
                  类型严谨、60FPS 流畅、全端自适应且具备完备降级策略。
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-xs font-mono text-[#656978]">
            <span>TOPOLOGY OF THOUGHT</span>
            <span>OPUS 2026 // ALL FREQUENCIES OPEN</span>
          </div>
        </div>
      </div>
    </section>
  );
};
