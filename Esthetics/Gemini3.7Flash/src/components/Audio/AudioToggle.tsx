import React, { useState, useEffect } from 'react';
import { soundEngine } from './SoundEngine';
import { VolumeX } from '../UI/Icons';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
  }, []);

  const handleToggle = () => {
    if (!hasInteracted) {
      soundEngine.init();
      setHasInteracted(true);
    }
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playHarmonicPluck(0.7, 3);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="btn-sculptural py-2 px-3.5 text-xs flex items-center gap-2 border-[rgba(255,255,255,0.12)] hover:border-[#e5a968]"
      title={isMuted ? '开启 Web Audio 原生谐波声场 (M)' : '静音原生声场 (M)'}
      aria-label={isMuted ? 'Unmute procedural audio' : 'Mute procedural audio'}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-[#ff453a]" />
      ) : (
        <div className="flex items-end gap-[2px] h-3 w-3.5">
          <span className="w-[2px] bg-[#e5a968] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-full"></span>
          <span className="w-[2px] bg-[#e5a968] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2/3"></span>
          <span className="w-[2px] bg-[#e5a968] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4/5"></span>
          <span className="w-[2px] bg-[#e5a968] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1/2"></span>
        </div>
      )}
      <span className="font-mono text-[11px] hidden sm:inline">
        {isMuted ? 'AUDIO OFF' : 'SONIC RES'}
      </span>
    </button>
  );
};
