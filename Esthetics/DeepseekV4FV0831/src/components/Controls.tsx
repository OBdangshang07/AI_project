import { useLoom } from '../loom/LoomContext';

export function Controls() {
  const { soundOn, toggleSound, reduced } = useLoom();
  return (
    <>
      <div className="progress-rail" aria-hidden="true">
        <i />
      </div>
      <div className="controls">
        {reduced && (
          <span className="icon-btn" style={{ cursor: 'default' }} title="已按系统设置关闭连续动效，滚动即织造">
            静
          </span>
        )}
        <button
          className="icon-btn"
          onClick={toggleSound}
          aria-pressed={soundOn}
          title="织机的声音（实时合成，无音频文件）"
        >
          {soundOn ? '声 ON' : '声 OFF'}
        </button>
      </div>
    </>
  );
}
