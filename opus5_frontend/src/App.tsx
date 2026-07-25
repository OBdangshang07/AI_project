import { useMemo, useState } from 'react'
import { useLoom } from './loom/useLoom'
import { ACTS, type ActId } from './scroll/score'
import { COPY, MASTHEAD } from './content/copy'
import {
  DEFAULT_TREADLING,
  SECRET_THREADING,
  THREADINGS,
  type Draft,
  type Threading,
} from './loom/draft'
import { ReadPicker } from './components/ReadPicker'
import { TreadlingEditor } from './components/TreadlingEditor'
import { Telemetry } from './components/Telemetry'
import { ActIndex } from './components/ActIndex'
import { Artifact } from './components/Artifact'
import { Colophon } from './components/Colophon'

const SR_STATE: Record<ActId, string> = {
  warp: '织机上绷着一排空经线，尚未织出任何布。经线代表你带来的约束。',
  thread: '每根经线被分配到八片综框之一，织机上方显示穿综图谱。',
  pick: '梭子开始往返，布从下往上生长。红色的是纬线（我），靛蓝与墨色的是经线（你）。',
  unweave: '机器停机。斜纹从某一行起断开，纬线正被一行行拆出来，比织的时候慢。',
  reverse: '布重新往上织。布可以翻到背面，背面是浮长的线、结头和线尾。',
  cutoff: '布被剪下织机，可以下载成 PNG。织机重新绷上空线，张力归零。',
}

export default function App() {
  const loom = useLoom()
  const [threading, setThreading] = useState<Threading>(THREADINGS[1])
  const [treadling, setTreadling] = useState<number[]>([...DEFAULT_TREADLING])
  const [edits, setEdits] = useState(0)

  const draft: Draft = useMemo(() => ({ threading, treadling }), [threading, treadling])

  // pushing the draft into the machine is the only place React touches it
  useMemo(() => {
    loom.engineRef.current?.setDraft(draft)
  }, [draft, loom.engineRef])

  const pickThreading = (t: Threading) => {
    setThreading(t)
    setEdits((n) => n + 1)
  }
  const editTreadling = (seq: number[]) => {
    setTreadling(seq)
    setEdits((n) => n + 1)
  }

  const currentAct = ACTS.find((a) => a.id === loom.act) ?? ACTS[0]

  return (
    <>
      <a className="skip" href="#colophon">
        跳到版记
      </a>

      <canvas
        className="stage"
        ref={loom.canvasRef}
        tabIndex={0}
        role="application"
        aria-roledescription="织机"
        aria-label="织机。左右方向键选择经线，空格键拨动，G 键整幅扫弦，F 键翻面。"
      />

      <p className="sr-only" aria-live="polite">
        第 {currentAct.num} 幕 · {currentAct.name}。{SR_STATE[loom.act]}
      </p>

      <header className="masthead">
        <span className="masthead__glyph">{MASTHEAD.glyph}</span>
        <span className="masthead__latin">{MASTHEAD.latin}</span>
      </header>

      <ActIndex act={loom.act} />
      <Telemetry engineRef={loom.engineRef} draft={draft} />

      <div className="controls">
        <button
          type="button"
          className="chip"
          aria-pressed={loom.soundOn}
          onClick={loom.toggleSound}
        >
          <span className="chip__led" aria-hidden="true" />
          {loom.soundOn ? '织机有声' : '开声音'}
        </button>
        <button
          type="button"
          className="chip"
          aria-pressed={loom.reduced}
          onClick={() => loom.overrideMotion(!loom.reduced)}
        >
          <span className="chip__led" aria-hidden="true" />
          {loom.reduced ? '离散状态' : '连续运转'}
        </button>
      </div>

      {loom.note && (
        <button
          type="button"
          className="discovery"
          onClick={loom.dismissNote}
          aria-live="polite"
          dangerouslySetInnerHTML={{ __html: loom.note }}
        />
      )}

      <main className="acts" id="main">
        {ACTS.map((a) => {
          const copy = COPY[a.id]
          return (
            <section
              key={a.id}
              className="act"
              id={`act-${a.id}`}
              data-act={a.id}
              style={{ ['--span' as string]: a.span }}
              aria-labelledby={`t-${a.id}`}
            >
              <div className="act__block">
                <div className="act__marker">
                  <span className="act__num">{a.num}</span>
                  <span className="act__name">{a.name}</span>
                  <span className="act__latin">{a.latin}</span>
                </div>

                <h2 className="act__title" id={`t-${a.id}`}>
                  {copy.title}
                </h2>

                <div className="act__body">
                  {copy.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {a.id === 'warp' && (
                  <>
                    <p className="thesis">
                      经线是<i>你</i>给的。纬线是<em>我</em>带来的。
                      <br />
                      布只在两者交叉的地方产生。
                    </p>
                    <div className="byline">
                      <span>{MASTHEAD.sub}</span>
                      <span>{MASTHEAD.by}</span>
                    </div>
                  </>
                )}

                {copy.aside && <p className="act__aside">{copy.aside}</p>}

                {a.id === 'thread' && (
                  <div className="act__tool">
                    <ReadPicker
                      value={threading.id}
                      secret={loom.secret || threading.id === SECRET_THREADING.id}
                      onPick={pickThreading}
                    />
                  </div>
                )}

                {a.id === 'pick' && (
                  <div className="act__tool">
                    <TreadlingEditor
                      value={treadling}
                      onChange={editTreadling}
                      engineRef={loom.engineRef}
                      live={loom.act === 'pick'}
                    />
                  </div>
                )}

                {(a.id === 'reverse' || a.id === 'cutoff') && (
                  <div className="act__tool">
                    <button
                      type="button"
                      className="hold"
                      aria-pressed={loom.flipped}
                      onClick={() => loom.setFlip(!loom.flipped)}
                    >
                      <span
                        className="hold__fill"
                        aria-hidden="true"
                        style={{ ['--p' as string]: loom.flipped ? 1 : 0 }}
                      />
                      <span className="hold__label">
                        {loom.flipped ? '翻回正面' : '翻到背面'}
                      </span>
                    </button>
                    {a.id === 'reverse' && (
                      <span className="hold__hint">
                        也可以直接按住布面不放。键盘：F。
                      </span>
                    )}
                  </div>
                )}

                {a.id === 'cutoff' && (
                  <div className="act__tool">
                    <Artifact
                      draft={draft}
                      engineRef={loom.engineRef}
                      flipped={loom.flipped}
                      edits={edits}
                      active={loom.act === 'cutoff'}
                    />
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </main>

      <Colophon />
    </>
  )
}
