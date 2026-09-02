import { useEffect, useRef } from 'react';
import { useLoom } from '../loom/LoomContext';
import { STRUCTURE_LABEL } from '../loom/drafts';

/**
 * 机器读数。让这台装置是「可读的」，而不是一团好看的动画。
 * 数字用命令式更新，不触发 React 重渲染——每秒几次的心跳不该经过虚拟 DOM。
 */
export function Readout() {
  const { onBeat, snapshot, loomRef } = useLoom();
  const picks = useRef<HTMLElement>(null);
  const tens = useRef<HTMLElement>(null);
  const tick = useRef<HTMLElement>(null);

  useEffect(() => {
    let t = 0;
    return onBeat((_, pick) => {
      if (picks.current) picks.current.textContent = String(pick);
      const loom = loomRef.current;
      if (tens.current && loom) tens.current.textContent = loom.getTension().toFixed(2);
      const el = tick.current;
      if (el) {
        el.classList.add('on');
        window.clearTimeout(t);
        t = window.setTimeout(() => el.classList.remove('on'), 110);
      }
    });
  }, [onBeat, loomRef]);

  return (
    <div className="readout" role="status" aria-live="off">
      <span>
        组织 <b>{STRUCTURE_LABEL[snapshot.structure] ?? snapshot.structure}</b>
      </span>
      <span>
        纬 <b ref={picks}>{snapshot.picks}</b>
      </span>
      <span>
        张力 <b ref={tens}>{snapshot.tension.toFixed(2)}</b>
      </span>
      <span>
        色 <b>{snapshot.weftName}</b>
      </span>
      {snapshot.parked ? (
        <span style={{ color: 'var(--madder)' }}>停机</span>
      ) : (
        <span className="tick" ref={tick} aria-hidden="true">
          ●
        </span>
      )}
      {snapshot.reversed && <span style={{ color: 'var(--madder)' }}>背面</span>}
    </div>
  );
}
