import React, { useState, useEffect, useRef } from 'react';
import type { InteractiveArtifact } from '../../types';
import { soundEngine } from '../Audio/SoundEngine';
import { Code, ArrowUpRight } from '../UI/Icons';

const ARTIFACTS: InteractiveArtifact[] = [
  {
    id: 'fluid-typography',
    title: 'Kinetic Dynamic Typography Engine',
    category: 'CREATIVE CODE // DYNAMIC TYPOGRAPHY',
    year: '2026',
    statement:
      '将排版文字视作具有流体张力的物理材料，字间距、字重与字形偏斜根据用户视线动量与页面重力场发生弹性形变。',
    dialecticDuality: {
      thesis: '传统网页排版的静态与机械僵化',
      antithesis: '过度动效带来的阅读障碍与眩晕感',
      synthesis: '基于贝塞尔流形衰减的微观动力学排版，在静止时完全回归瑞士网格的高可读性，在交互瞬间绽放生命力。',
    },
    metrics: [
      { label: 'Render Method', value: 'Variable Font Axis Lerp' },
      { label: 'Latency', value: '< 4.2ms' },
      { label: 'Readability Score', value: '99.4%' },
    ],
    interactiveType: 'typography',
  },
  {
    id: 'tensegrity-spatial',
    title: 'Non-Euclidean Spatial Interface System',
    category: 'SPATIAL ARCHITECTURE // WEBGL',
    year: '2026',
    statement:
      '探索非欧几里得几何在空间界面中的应用，以张拉整体结构（Tensegrity）构建无需页面重载的多层级连续拓扑导航。',
    dialecticDuality: {
      thesis: '二维平面卡片的信息层级割裂',
      antithesis: '复杂3D空间带来的迷失感与高认知负荷',
      synthesis: '空间折叠流形：将三维视差作为二维排版的深度增强场，保持绝对清晰的视觉焦点。',
    },
    metrics: [
      { label: 'Geometry Vertices', value: '4,096 Procedural' },
      { label: 'Physics Damping', value: '0.86 Elastic' },
      { label: 'FPS Target', value: '60 FPS Solid' },
    ],
    interactiveType: 'tensegrity',
  },
  {
    id: 'procedural-harmonics',
    title: 'Polyphonic Procedural Acoustic Synthesis',
    category: 'SONIC ARCHITECTURE // WEB AUDIO',
    year: '2026',
    statement:
      '完全基于 Web Audio API 算法生成的空间声学生态，将用户的滚动速度、指针张力与色彩温标转化为实时的莱迪亚调式多声部共鸣。',
    dialecticDuality: {
      thesis: '静态音效文件的死板重复与大体积网络开销',
      antithesis: '完全静音带来的情感抽离与触感缺失',
      synthesis: '零音频文件下载，纯原生双二阶滤波与物理振荡器，随交互行为自然呼吸。',
    },
    metrics: [
      { label: 'Network Payload', value: '0.00 KB (Pure Math)' },
      { label: 'Scale Mode', value: 'Lydian Resonant 9th' },
      { label: 'Polyphony', value: '8 Voices' },
    ],
    interactiveType: 'waves',
  },
];

// Interactive Mini-Canvas for individual artifact cards
const ArtifactInteractiveCanvas: React.FC<{ type: InteractiveArtifact['interactiveType'] }> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (type === 'typography') {
        // Render kinetic wave lines and dynamic letters
        ctx.strokeStyle = 'rgba(229, 169, 104, 0.4)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          for (let x = 0; x < w; x += 10) {
            const my = mouseRef.current.active ? (mouseRef.current.y - h / 2) * 0.3 : 0;
            const y = h / 2 + Math.sin(x * 0.02 + t + i * 0.5) * (15 + i * 4) + my;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (type === 'tensegrity') {
        // Render dynamic tensegrity lattice
        ctx.strokeStyle = 'rgba(90, 200, 250, 0.5)';
        ctx.fillStyle = 'rgba(90, 200, 250, 0.15)';
        const cx = w / 2 + (mouseRef.current.active ? (mouseRef.current.x - w / 2) * 0.2 : 0);
        const cy = h / 2 + (mouseRef.current.active ? (mouseRef.current.y - h / 2) * 0.2 : 0);
        const nodes: { x: number; y: number }[] = [];
        const count = 6;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + t * 0.4;
          const r = 45 + Math.sin(t * 2 + i) * 10;
          nodes.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
        }
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
        ctx.stroke();
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (type === 'waves') {
        // Render harmonic acoustic ripples
        ctx.strokeStyle = 'rgba(48, 209, 88, 0.45)';
        const cx = w / 2;
        const cy = h / 2;
        for (let r = 10; r < 75; r += 12) {
          const waveR = r + (Math.sin(t * 3 - r * 0.1) * 6);
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(2, waveR), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={160}
      className="w-full h-40 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)] cursor-crosshair"
      title="交互式微观仿真试验场 · 移动鼠标探索"
    />
  );
};

export const ArtifactsSection: React.FC = () => {
  const [activeArtifactId, setActiveArtifactId] = useState<string>(ARTIFACTS[0].id);

  return (
    <section id="artifacts" className="relative min-h-screen py-24 px-4 md:px-8 z-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[rgba(90,200,250,0.1)] border border-[rgba(90,200,250,0.25)] text-[#5ac8fa] font-mono text-xs mb-3">
              <Code className="w-3.5 h-3.5" />
              <span>MOVEMENT III // 实践结晶与协同织体</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-white">
              Synthesized Artifacts
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#9a9ea8] font-light leading-relaxed">
            审美是最高形式的逻辑，代码是最具弹性的粘土。以下是我在不同维度将概念铸造为现实的代表性方法论实践。
          </p>
        </div>

        {/* 3 Interactive Artifact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
          {ARTIFACTS.map((artifact) => {
            const isSelected = activeArtifactId === artifact.id;
            return (
              <div
                key={artifact.id}
                onClick={() => {
                  setActiveArtifactId(artifact.id);
                  soundEngine.playHarmonicPluck(0.7, 3);
                }}
                className={`glass-panel p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-[#e5a968] bg-[rgba(229,169,104,0.04)] shadow-[0_0_40px_rgba(229,169,104,0.12)]'
                    : 'hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div>
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#9a9ea8] mb-4">
                    <span className="text-[#e5a968] font-semibold">{artifact.category}</span>
                    <span>{artifact.year}</span>
                  </div>

                  <h3 className="font-serif-display text-xl sm:text-2xl text-white mb-3 group-hover:text-[#e5a968] transition-colors flex items-center justify-between">
                    <span>{artifact.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#e5a968]" />
                  </h3>

                  <p className="text-xs text-[#9a9ea8] leading-relaxed mb-6 font-light">
                    {artifact.statement}
                  </p>

                  {/* Interactive Micro-Simulation Canvas */}
                  <div className="mb-6">
                    <div className="text-[10px] font-mono text-[#5e626e] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>LIVE PROTOTYPE CANVAS</span>
                      <span className="text-[#e5a968]">HOVER TO PERTURB</span>
                    </div>
                    <ArtifactInteractiveCanvas type={artifact.interactiveType} />
                  </div>

                  {/* Dialectic Duality breakdown */}
                  <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.04)] space-y-2 text-xs">
                    <div className="text-[#e5a968] font-mono text-[11px] font-medium">
                      METHODOLOGY SYNTHESIS
                    </div>
                    <p className="text-[#9a9ea8] font-light leading-relaxed">
                      {artifact.dialecticDuality.synthesis}
                    </p>
                  </div>
                </div>

                {/* Metrics Table */}
                <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
                  {artifact.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded bg-[rgba(255,255,255,0.02)]">
                      <div className="text-[9px] font-mono text-[#5e626e] uppercase">{m.label}</div>
                      <div className="text-xs font-mono text-white font-medium mt-1 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
