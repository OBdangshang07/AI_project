import { useEffect, useState } from 'react';
import { useLoom } from '../loom/LoomContext';
import { useInView } from '../hooks/useInView';
import { Fell } from './Fell';
import { Weaver } from './Weaver';

function Eyebrow({ n, cn, en }: { n: string; cn: string; en: string }) {
  return (
    <p className="eyebrow">
      <b>{cn}</b>
      <span>
        {n} · {en}
      </span>
    </p>
  );
}

/* ------------------------------ 00 · 起手 ------------------------------ */
function Hero() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <section id="start">
      <div className="col">
        <Eyebrow n="00" cn="織" en="TEXERE" />
        <h1>
          <span>文本</span>
          <span>
            是一种<em>织物</em>
          </span>
        </h1>
        <Fell />
        <p className="lead">
          text 与 textile 同源，都来自拉丁语 <span className="latin">texere</span> ——「编织」。
        </p>
        <p>
          所以我没有写一页介绍自己的网站。我把「我怎么想」做成了一台织机，它此刻就在旁边运转：
          <strong>你的意图是经线</strong>，<strong>我的每一次尝试是纬线</strong>。
          它开机后织的第一块布，是它自己的名字。
        </p>
        <div className="cue" style={{ opacity: scrolled ? 0 : 1, transition: 'opacity .5s' }}>
          <span>↓ 往下滚，布会长出来</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 01 · 经 ------------------------------ */
function Warp() {
  return (
    <section id="warp">
      <div className="col">
        <Eyebrow n="01" cn="经" en="WARP · YOU" />
        <h2>经线是你带来的</h2>
        <Fell />
        <div className="v-wrap">
          <div className="vertical">
            经线先上机，被绷紧，决定这块布有多宽、能受多大的力。
            <br />
            它<strong>不产生花纹</strong>，但没有它，纬线无处可落。
            <br />
            你给我的场景、语气、约束、忌讳，就是经线。
            <br />
            我不改它——<strong>我沿着它走</strong>。
          </div>
          <div className="side">
            <p className="dim">
              一根经线从头到尾贯穿整块布。它在表面时隐时现，但从来没有断过。
            </p>
            <div className="cue">
              <span>把指针放到布上</span>
              <kbd>← →</kbd>
              <span>挑一根线看看</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 02 · 纬 ------------------------------ */
function Weft() {
  return (
    <section id="weft">
      <div className="col">
        <Eyebrow n="02" cn="纬" en="WEFT · ME" />
        <h2>纬线是我的每一次尝试</h2>
        <Fell />
        <p>
          一梭只走一趟，一次只加一行。走完就被筘打紧、压进布里，
          <strong>不能撤销</strong>——所以我在投梭之前，先想清楚它该落在哪儿。
        </p>
        <p className="dim">
          你看到的每一寸布，都是几百次往返攒出来的。快慢也不由我定：
          你滚得快，机器就转得快。
        </p>
        <div className="cue">
          <span>点一下布面 = 手动投一梭</span>
          <kbd>Space</kbd>
          <span>·</span>
          <kbd>↑ ↓</kbd>
          <span>调张力</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 03 · 换综（转折） ------------------------------ */
const STAGES = [
  { key: 'slack', label: '松线' },
  { key: 'rethread', label: '重新穿综' },
  { key: 'retension', label: '回张力' },
];

function Shift() {
  const { shiftStage } = useLoom();
  return (
    <section id="shift">
      <div className="col">
        <Eyebrow n="03" cn="换综" en="RETHREAD" />
        <h2>换一张提综图，同样的线会织出完全不同的布</h2>
        <Fell />
        <p>
          这是我最像「在思考」的时刻：<strong>不是换材料，是换规则</strong>。
          松线、逐根重新穿综、再绷紧——中间那几秒，布是停的。
        </p>
        <p className="dim">停顿不是故障。停顿是结构正在改变。</p>
        <div className="stage-word" aria-hidden="true">
          {STAGES.map((s) => (
            <span key={s.key} className={shiftStage === s.key ? 'on' : ''}>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 04 · 提花 ------------------------------ */
function Jacquard() {
  return (
    <section id="jacquard">
      <div className="col">
        <Eyebrow n="04" cn="提花" en="YOUR WORD" />
        <h2>给我一个词，我把它织进去</h2>
        <Fell />
        <p>
          1804 年，Jacquard 用一叠打孔卡控制提花机上每一根经线的起落；
          那叠卡片后来变成了计算机的穿孔卡。
          所以「把你的字织进布里」<strong>不是比喻</strong>——它就是二进制。
        </p>
        <Weaver />
      </div>
    </section>
  );
}

/* ------------------------------ 05 · 落布 ------------------------------ */
function Cutoff() {
  const { loomRef, snapshot } = useLoom();
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setRevealed(true), 2600);
    return () => window.clearTimeout(t);
  }, [inView]);

  const download = () => {
    const url = loomRef.current?.exportPNG(2);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texere-cloth.png';
    a.click();
  };

  return (
    <section id="cutoff">
      <div className="col" ref={ref}>
        <Eyebrow n="05" cn="落布" en="CUT OFF" />
        <h2>布下机了</h2>
        <Fell />
        <p>
          经线是你的，纬线是我的，<strong>布是我们之间发生的事</strong>。
          它不属于任何一方，也没法拆开归还。
        </p>
        <p className="dim">
          {snapshot.parked ? '机器已经停了。' : '机器还在走。'}到现在为止它织了{' '}
          <b>{snapshot.picks}</b> 纬
          {snapshot.woven ? `，其中有一段是「${snapshot.woven}」。` : '。'}
        </p>
        <div className="field">
          <button className="btn primary" type="button" onClick={download}>
            取走这块布 · PNG
          </button>
          <a className="btn" href="#start">
            回到起手
          </a>
        </div>
        <div className="cue" style={{ opacity: revealed ? 1 : 0, transition: 'opacity .8s' }}>
          <span>还有一件事：</span>
          <strong>按住布面</strong>
          <span>（或按</span>
          <kbd>R</kbd>
          <span>）看看它的背面。</span>
        </div>
        <p className="sig">DEEPSEEK V4 FLASH VISION · 数字艺术总监模式 · 全部图形与声音均为实时生成</p>
      </div>
    </section>
  );
}

export function Sections() {
  return (
    <main id="main">
      <Hero />
      <Warp />
      <Weft />
      <Shift />
      <Jacquard />
      <Cutoff />
    </main>
  );
}
