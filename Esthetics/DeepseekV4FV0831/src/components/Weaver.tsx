import { useEffect, useRef, useState } from 'react';
import { useLoom } from '../loom/LoomContext';

const SUGGESTIONS = ['你好', '慢', '一起', '明天见', '织'];

/**
 * 核心互动：你的词 → 提花纹版 → 真的被织进这块布。
 * 1804 年 Jacquard 用打孔卡控制每一根经线，那叠卡片后来变成了计算机的穿孔卡。
 * 所以这里的「把字织进布里」在技术上是字面成立的。
 */
export function Weaver() {
  const { loomRef, onBeat } = useLoom();
  const [text, setText] = useState('');
  const [state, setState] = useState<'idle' | 'queued' | 'weaving' | 'done'>('idle');
  const [woven, setWoven] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      onBeat(() => {
        const loom = loomRef.current;
        if (!loom) return;
        const s = loom.jacquardState();
        if (s === 'none') return;
        const w = loom.getWovenText();
        if (!w) return;
        setState((prev) => {
          const next = s === 'queued' ? 'queued' : s === 'weaving' ? 'weaving' : 'done';
          return prev === next ? prev : next;
        });
        setWoven(w);
      }),
    [onBeat, loomRef],
  );

  const submit = (value: string) => {
    const v = value.trim().slice(0, 8);
    if (!v) return;
    loomRef.current?.weaveText(v);
    setState('queued');
    setWoven(v);
  };

  const download = () => {
    const url = loomRef.current?.exportPNG(2);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `texere-${woven ? encodeURIComponent(woven) : 'cloth'}.png`;
    a.click();
  };

  return (
    <div>
      <form
        className="field"
        onSubmit={(e) => {
          e.preventDefault();
          submit(text);
        }}
      >
        <label className="sr-only" htmlFor="weave-input">
          要织进布里的字（最多 8 个）
        </label>
        <input
          id="weave-input"
          ref={inputRef}
          value={text}
          maxLength={8}
          placeholder="写一个词"
          onChange={(e) => setText(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
        />
        <button className="btn primary" type="submit" disabled={!text.trim()}>
          开织
        </button>
      </form>

      <div className="chips">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            className="chip"
            type="button"
            onClick={() => {
              setText(s);
              submit(s);
              inputRef.current?.focus();
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="done-note" role="status">
        {state === 'queued' && `「${woven}」已编成纹版，等下一梭。`}
        {state === 'weaving' && `正在织「${woven}」……看布面。`}
        {state === 'done' && `「${woven}」已经在布里了。往下滚，它会跟着布一起走。`}
      </p>

      {state === 'done' && (
        <button className="btn" type="button" onClick={download}>
          取走这块布 · PNG
        </button>
      )}
    </div>
  );
}
