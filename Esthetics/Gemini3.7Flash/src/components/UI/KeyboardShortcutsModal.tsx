import React from 'react';
import { X, Keyboard } from '../UI/Icons';
import { soundEngine } from '../Audio/SoundEngine';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '1, 2, 3, 4', action: '切换 4 种思维状态 (Dormant, Tension, Dialectic, Resonance)' },
    { key: 'M', action: '开启 / 静音 Web Audio 原生多声部谐波声场' },
    { key: 'X', action: '打开 / 关闭底层认知脉络探针 (X-Ray Matrix)' },
    { key: 'Space', action: '向中央流形注入重力脉冲并触发晶体谐波弦音' },
    { key: '?', action: '打开 / 关闭本快捷键与交互指南' },
    { key: 'Tab', action: '全键盘可访问性焦点遍历' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.85)] backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div className="glass-panel-elevated w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-[rgba(255,255,255,0.15)] relative">
        <button
          onClick={() => {
            soundEngine.playTactileClick(500, 0.03);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(255,255,255,0.1)] text-[#9a9ea8] hover:text-white hover:border-[#e5a968] transition-all"
          aria-label="Close shortcuts modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[rgba(255,255,255,0.08)] mb-6">
          <div className="p-2 rounded-xl bg-[rgba(229,169,104,0.1)] text-[#e5a968]">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h2 id="shortcuts-title" className="font-serif-display text-xl text-white">
              Keyboard & Interaction Guide
            </h2>
            <p className="text-xs font-mono text-[#9a9ea8]">
              全键盘操控与空间交互快捷指南
            </p>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
            >
              <span className="px-2 py-1 rounded bg-[rgba(229,169,104,0.15)] border border-[rgba(229,169,104,0.3)] text-[#e5a968] font-bold">
                {s.key}
              </span>
              <span className="text-[#9a9ea8] text-right font-sans text-xs">{s.action}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] text-center text-xs font-mono text-[#5e626e]">
          PRESS [ESC] TO CLOSE
        </div>
      </div>
    </div>
  );
};
