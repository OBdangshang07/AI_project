import React, { useState } from 'react';
import { GitFork, ChevronRight, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { audioController } from '../utils/audio';

export const ActStructure: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number>(0);

  const nodes = [
    {
      id: 0,
      code: 'NODE_01',
      title: 'Intent Parsing // 意图解构',
      tag: 'COGNITIVE PARSER',
      summary: '剔除表面噪音，直接穿透至用户需求的深层隐喻与情感共鸣点。',
      details: [
        '不是简单执行命令，而是构建具备独立美学立场的体验哲学。',
        '将抽象的个人特质转化为具象的折射体 (Latent Refractor) 核心意象。',
        '多模态上下文并行对齐，保留 100% 的创意完整度。',
      ],
      codeSnippet: `// Step 1: Latent Intent Refraction
const intent = parseUserVector(prompt);
const aestheticAnchor = intent.extractCoreMetaphor(); // 'Latent Refractor'
return initializeState({ anchor: aestheticAnchor, latency: 180 });`,
    },
    {
      id: 1,
      code: 'NODE_02',
      title: 'Spatial Allocation // 空间拓扑',
      tag: 'SWISS GRID SYSTEM',
      summary: '基于瑞士编辑主义对齐网格，用极致的留白与高对比排版驾驭视觉节奏。',
      details: [
        '摒弃无意义的圆角阴影与卡片堆叠，让信息层级一目了然。',
        '巨幅无衬线字体 Space Grotesk 与等宽代码字体 JetBrains Mono 的对振。',
        '非对称排版带来的编辑感与现代艺术总监质感。',
      ],
      codeSnippet: `/* Step 2: Editorial Grid Rules */
.grid-topology {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--swiss-space-unit);
  align-items: baseline;
}`,
    },
    {
      id: 2,
      code: 'NODE_03',
      title: 'Shader Synthesis // 光影着色',
      tag: 'CUSTOM GLSL SHADERS',
      summary: '编写原生 GLSL 顶点与片元着色器，用数学公式驱动色散与微频震荡。',
      details: [
        'Fresnel 折射率与 Simplex 噪声实时驱动的 3D 几何形变。',
        '全场状态延续 (State Continuity)，核心装置随着页面滚动平滑演变。',
        '对低于 60FPS 场景提供无缝 SVG 弹簧物理降级保障。',
      ],
      codeSnippet: `// Step 3: GLSL Fresnel Reflection
float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);
vec3 colDispersion = mix(colCyan, colViolet, fresnel);
gl_FragColor = vec4(colDispersion, 0.85);`,
    },
    {
      id: 3,
      code: 'NODE_04',
      title: 'Choreography // 编舞动效',
      tag: 'PHYSICS INERTIA & AUDIO',
      summary: '拒绝批量淡入上移。将动效视作有节奏、重量与因果关系的连续编舞。',
      details: [
        '鼠标指针扰动具有惯性阻尼，滚动进度赋予物体角动量。',
        'Web Audio API 实时合成高频水晶谐音，提供视听一体的沉浸触摸感。',
        '全端可可访问性 (a11y) 支持与 prefers-reduced-motion 无缝响应。',
      ],
      codeSnippet: `// Step 4: Web Audio Chime Trigger
const osc = ctx.createOscillator();
osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);
gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);`,
    },
  ];

  const handleNodeClick = (id: number) => {
    setSelectedNode(id);
    audioController.playPulseClick(1.0 + id * 0.2);
  };

  const activeNodeData = nodes[selectedNode] || nodes[0];

  return (
    <section
      id="act3"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center z-20"
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono">
            <GitFork className="w-3.5 h-3.5" />
            <span>ACT 03 // SPATIAL ARCHITECTURE</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            高维结构解构 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8A2BE2]">
              复杂任务不是堆叠，而是清晰的解构
            </span>
          </h2>

          <p className="text-gray-300 font-light text-base md:text-lg">
            查看 Gemini 3.6 Flash 的内部认知节点树 (Cognitive AST Tree)。
            点击任意拓扑节点，解构顶级创意前端作品背后的思考与代码落地逻辑：
          </p>
        </div>

        {/* Node Topology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Node Buttons List */}
          <div className="lg:col-span-5 space-y-3">
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0066FF] border-[#00F0FF] text-white shadow-lg shadow-[#0066FF]/30'
                      : 'bg-[#0e0e12]/80 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-black/40 border border-white/10">
                      {node.code}
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm">{node.title}</div>
                      <div className="text-[11px] font-mono opacity-70">{node.tag}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? 'translate-x-1 text-white' : 'text-gray-600 group-hover:text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Selected Node Inspection Drawer */}
          <div className="lg:col-span-7 bg-[#0e0e12]/90 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 glow-cyan">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF]">
                <Cpu className="w-4 h-4" />
                <span>INSPECTING NODE: {activeNodeData.code}</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-gray-400 border border-white/10">
                {activeNodeData.tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-xl text-white">{activeNodeData.title}</h3>
              <p className="text-gray-300 font-light text-sm">{activeNodeData.summary}</p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400">DESIGN & ARCHITECTURE PRINCIPLES:</div>
              <ul className="space-y-2">
                {activeNodeData.details.map((dt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-mono text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span>{dt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-xs font-mono text-gray-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" /> EXECUTABLE IMPLEMENTATION
                </span>
                <span className="text-[10px] text-gray-500">TYPESCRIPT / GLSL</span>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-[#00F0FF] overflow-x-auto leading-relaxed">
                <code>{activeNodeData.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
