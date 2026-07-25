import React from 'react';
import { Zap, ArrowUp } from 'lucide-react';
import { audioController } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    audioController.playPulseClick(1.5);
  };

  return (
    <footer className="relative z-20 bg-[#070709] border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0066FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white tracking-widest">
              GEMINI 3.6 FLASH
            </div>
            <div className="font-mono text-xs text-gray-500">
              The Latent Refractor // Creative Front-End Portfolio
            </div>
          </div>
        </div>

        <div className="font-mono text-xs text-gray-400 text-center md:text-left">
          Crafted with React 18, Vite, Three.js WebGL & Web Audio API.
        </div>

        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F0FF] text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-2 group"
        >
          <span>RETURN TO ACT 00</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
