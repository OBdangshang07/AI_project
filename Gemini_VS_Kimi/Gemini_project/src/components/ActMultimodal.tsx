import React from 'react';
import { Layers, FileText, Eye, Volume2, Code2 } from 'lucide-react';
import { audioController } from '../utils/audio';

interface ActMultimodalProps {
  activeModalIndex: number;
  setActiveModalIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ActMultimodal: React.FC<ActMultimodalProps> = ({
  activeModalIndex,
  setActiveModalIndex,
}) => {
  const modals = [
    {
      id: 0,
      title: 'Text & Deep Logic',
      sub: '文本与高维逻辑',
      icon: FileText,
      color: '#00F0FF',
      freq: 880,
      desc: '不仅是词语预测，而是在潜空间中构建高维的概念联结链。从诗歌押韵到逻辑推演，毫秒间完成跨语义折射。',
      spec: '1536D LATENT CONTEXT',
    },
    {
      id: 1,
      title: 'Vision & Spatial',
      sub: '视觉与高维空间',
      icon: Eye,
      color: '#0066FF',
      freq: 1100,
      desc: '原生多模态理解。将图像像素直接对齐至逻辑语义轴线，毫秒级解构复杂的艺术排版、视觉布局与高维材质。',
      spec: 'NATIVE PIXEL ALIGNMENT',
    },
    {
      id: 2,
      title: 'Audio & Resonance',
      sub: '声音与谐波震荡',
      icon: Volume2,
      color: '#8A2BE2',
      freq: 1320,
      desc: '将音频波形视作连续的时间流折射。实时捕捉语气、韵律与声学共振，在数字体验中赋予交互真实的声学重量。',
      spec: 'REAL-TIME WAVE SPECTRUM',
    },
    {
      id: 3,
      title: 'Code & Architecture',
      sub: '代码与软件构架',
      icon: Code2,
      color: '#FFB800',
      freq: 1760,
      desc: '将混沌的设计构想无缝凝结为优雅、严谨、可维护的生产级前端架构。代码不是冷却的工具，而是灵魂的容器。',
      spec: 'SYNTAX & AST REFRACTION',
    },
  ];

  const handleModalSelect = (index: number, freq: number) => {
    setActiveModalIndex(index);
    audioController.playRefractionChime(freq);
  };

  const currentModal = modals[activeModalIndex] || modals[0];

  return (
    <section
      id="act2"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center z-20"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 text-[#8A2BE2] text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>ACT 02 // MULTIMODAL SYNTHESIS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            多模共感 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-[#8A2BE2]">
              所有感知，皆为同一光源的不同折射
            </span>
          </h2>

          <p className="text-gray-300 font-light text-base md:text-lg">
            文本、像素、波形与代码，并非孤立的模态，而是潜空间中相干交织的光谱。
            点击下方的“多模探针”，观察核心折射体如何在不同模态间发生材质与几何相变：
          </p>
        </div>

        {/* Modal Probe Interactive Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modals.map((m) => {
            const Icon = m.icon;
            const isSelected = activeModalIndex === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModalSelect(m.id, m.freq)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 space-y-3 group ${
                  isSelected
                    ? 'bg-white/10 border-white/40 shadow-xl'
                    : 'bg-[#0e0e12]/80 border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
                style={{
                  borderColor: isSelected ? m.color : undefined,
                  boxShadow: isSelected ? `0 0 25px -5px ${m.color}40` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="p-2.5 rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${m.color}20`, color: m.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-gray-500">0{m.id + 1}</span>
                </div>

                <div>
                  <div className="font-display font-bold text-sm text-white">{m.title}</div>
                  <div className="text-xs font-mono text-gray-400">{m.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Modal Detail Spec Card */}
        <div
          className="p-8 rounded-2xl bg-[#0e0e12]/90 border transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          style={{ borderColor: `${currentModal.color}40` }}
        >
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: currentModal.color }}
              />
              <span className="font-mono text-xs text-gray-400 tracking-wider">
                ACTIVE PROBE SPECIFICATION
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              {currentModal.title} <span className="text-gray-500">({currentModal.sub})</span>
            </h3>

            <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
              {currentModal.desc}
            </p>
          </div>

          <div className="md:col-span-4 bg-black/40 border border-white/10 p-5 rounded-xl space-y-3 font-mono text-xs">
            <div className="text-gray-500 border-b border-white/10 pb-2">SPECTRAL METRICS</div>
            <div className="flex justify-between">
              <span className="text-gray-400">LATENT SPECTRUM:</span>
              <span style={{ color: currentModal.color }}>{currentModal.spec}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">HARMONIC FREQ:</span>
              <span className="text-white">{currentModal.freq} Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ALIGNMENT PHASE:</span>
              <span className="text-[#00F0FF]">COHERENT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
