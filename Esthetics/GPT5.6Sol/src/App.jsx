import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TensionLoom from './components/TensionLoom.jsx'
import { useStoryProgress } from './hooks/useStoryProgress.js'
import { useExperienceStage } from './hooks/useExperienceStage.js'

const SCENES = [
  {
    number: '01',
    mode: 'LISTEN / 听见',
    eyebrow: '先别回答',
    title: '我先改变问题的形状。',
    body: '一句提问里，总有目标、顾虑和没说出口的限制。我先听它们如何互相拉扯，再决定真正需要被解决的是什么。',
    note: '速度不是第一反应。对准，才是。',
  },
  {
    number: '02',
    mode: 'TENSION / 校准',
    eyebrow: '让差异留在桌上',
    title: '证据与想象，不必互相礼让。',
    body: '我让可靠的部分承担重量，让大胆的部分打开空间。它们之间的摩擦不是故障，而是答案获得轮廓的方式。',
    note: '没有张力的答案，通常也没有抓力。',
  },
  {
    number: '03',
    mode: 'COUNTER / 反驳',
    eyebrow: '看见分叉',
    title: '我会怀疑自己最顺手的答案。',
    body: '每个漂亮结论旁边，都应该站着一个不太配合的反问。我把它留下，直到确信被舍弃的路径，确实值得被舍弃。',
    note: '按住空格，可以短暂看见那些分支。',
  },
  {
    number: '04',
    mode: 'COMPOSE / 收束',
    eyebrow: '选择何时停止',
    title: '清晰，不是把复杂度藏起来。',
    body: '它是让每一部分知道自己的位置：什么应该被说，什么应该退场，什么必须交还给人的判断。最后的形状，是共同编辑的结果。',
    note: '好的收束仍然保留重新打开的可能。',
  },
]

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function responseProfile(weights) {
  const entries = Object.entries(weights)
  const values = entries.map(([, value]) => value)
  const spread = Math.max(...values) - Math.min(...values)
  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  const winner = entries.sort((a, b) => b[1] - a[1])[0][0]

  if (average < 0.28) {
    return {
      title: '先追问，再动手',
      text: '张力还不够形成判断。我会先邀请你补上情境，而不是用流畅掩盖未知。',
    }
  }
  if (spread < 0.12 && average > 0.55) {
    return {
      title: '有依据的想象',
      text: '目标清楚，事实站稳，想象仍有余地。这是我最愿意与你共同工作的状态。',
    }
  }
  if (weights.evidence > 0.76 && weights.imagination > 0.72 && weights.intent < 0.42) {
    return {
      title: '漂亮，但可能偏题',
      text: '材料和手艺都已到位，方向却仍模糊。我会停下来，重新确认谁真正需要这个答案。',
    }
  }
  const profiles = {
    intent: ['先对准真正的问题', '我会削去旁枝，让每一步都能回到你真正想改变的事情。'],
    evidence: ['慢一点，但站得住', '我会扩大核查与反驳的比重，用可验证的结构换取更可靠的落点。'],
    imagination: ['把不可能先画出来', '我会暂缓现实的边界，先给新形状足够空间，再决定怎样把它带回地面。'],
  }
  return { title: profiles[winner][0], text: profiles[winner][1] }
}

function RangeControl({ id, label, description, value, onChange }) {
  return (
    <label className="range-control" htmlFor={id}>
      <span className="range-heading">
        <span>{label}</span>
        <output htmlFor={id}>{Math.round(value * 100)}</output>
      </span>
      <span className="range-description">{description}</span>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={Math.round(value * 100)}
        onChange={(event) => onChange(Number(event.target.value) / 100)}
      />
    </label>
  )
}

export default function App() {
  const storyRef = useRef(null)
  const calibrationRef = useRef(null)
  const closureRef = useRef(null)
  const progress = useStoryProgress(storyRef)
  const experienceStage = useExperienceStage(calibrationRef, closureRef)
  const [weights, setWeights] = useState({ intent: 0.68, evidence: 0.74, imagination: 0.57 })
  const [seams, setSeams] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const activeScene = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length))
  const mode = experienceStage === 'calibrate'
    ? 'CALIBRATE / 你来'
    : experienceStage === 'handoff'
      ? 'HANDOFF / 交棒'
      : SCENES[activeScene]?.mode ?? 'LISTEN / 听见'
  const profile = useMemo(() => responseProfile({ ...weights }), [weights])
  const signature = `I${Math.round(weights.intent * 100)}·E${Math.round(weights.evidence * 100)}·M${Math.round(weights.imagination * 100)}`

  const updateWeight = useCallback((key, value) => {
    setWeights((current) => ({ ...current, [key]: clamp(value) }))
    setHasInteracted(true)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = document.activeElement?.tagName
      const isControl = ['INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'].includes(tag)
      if (event.code === 'Space' && !isControl && !event.repeat) {
        event.preventDefault()
        setSeams(true)
      }
    }
    const onKeyUp = (event) => {
      if (event.code === 'Space') setSeams(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <div className="site-frame">
      <a className="skip-link" href="#calibration">跳到校准台</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回开头">
          <span>SOL</span>
          <i aria-hidden="true" />
          <small>A SELF-PORTRAIT</small>
        </a>
        <div className="header-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <a href="#calibration" className="header-link">进入校准台 <span>↘</span></a>
      </header>

      <aside className={`loom-stage stage-${experienceStage}`} aria-label="贯穿页面的交互装置">
        <TensionLoom
          weights={weights}
          onWeightChange={updateWeight}
          progress={progress}
          seams={seams}
          onSeamsChange={setSeams}
          mode={mode}
          chapter={experienceStage}
        />
      </aside>

      <main id="top" className="site-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker"><span>GPT—5.6 SOL</span><span>交互式自画像 / 2026</span></p>
            <h1 id="hero-title">
              我在答案<br />
              <em>抵达之前</em>工作。
            </h1>
            <p className={`first-instruction ${hasInteracted ? 'is-complete' : ''}`} aria-live="polite">
              <span className="instruction-index">{hasInteracted ? '✓' : '00'}</span>
              {hasInteracted ? '形状已经记住你的第一次选择。' : '试着拖动右侧任一红点。'}
            </p>
            <div className="hero-foot">
              <p>不是答案仓库。<br />是一台校准张力的织机。</p>
              <a href="#story">向下，给问题一点重量 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <div id="story" className="story" ref={storyRef}>
          {SCENES.map((scene, index) => (
            <section
              className={`story-scene ${activeScene === index ? 'is-active' : ''}`}
              key={scene.number}
              aria-labelledby={`scene-${scene.number}`}
            >
              <article className="scene-copy">
                <div className="scene-meta">
                  <span>{scene.number}</span>
                  <span>{scene.mode}</span>
                </div>
                <p className="scene-eyebrow">{scene.eyebrow}</p>
                <h2 id={`scene-${scene.number}`}>{scene.title}</h2>
                <p className="scene-body">{scene.body}</p>
                {index === 2 && (
                  <div className={`discarded-copy ${seams ? 'is-visible' : ''}`} aria-hidden={!seams}>
                    <div>
                      <span>更快的答案</span>
                      <span>更确定的答案</span>
                      <span>更讨喜的答案</span>
                      <b>都曾经在这里。</b>
                    </div>
                  </div>
                )}
                <p className="margin-note"><span>编者注</span>{scene.note}</p>
              </article>
            </section>
          ))}
        </div>

        <section id="calibration" ref={calibrationRef} className="calibration" aria-labelledby="calibration-title">
          <div className="calibration-intro">
            <p className="section-index">05 / YOUR TURN</p>
            <h2 id="calibration-title">把我调成<br />此刻需要的样子。</h2>
            <p>不存在永远正确的配方。拖动装置上的控制点，或使用下面的滑杆。不同张力，不只改变外观，也改变我选择怎样与你工作。</p>
          </div>

          <div className="calibration-console">
            <RangeControl
              id="intent-range"
              label="意图"
              description="让答案紧贴真正需要改变的事。"
              value={weights.intent}
              onChange={(value) => updateWeight('intent', value)}
            />
            <RangeControl
              id="evidence-range"
              label="证据"
              description="让判断承担核查、反驳与边界。"
              value={weights.evidence}
              onChange={(value) => updateWeight('evidence', value)}
            />
            <RangeControl
              id="imagination-range"
              label="想象"
              description="让尚不存在的形状获得试演机会。"
              value={weights.imagination}
              onChange={(value) => updateWeight('imagination', value)}
            />
          </div>

          <div className="response-proof" aria-live="polite">
            <div className="proof-stamp" aria-hidden="true"><span>{signature}</span></div>
            <div>
              <p>当前回答姿态 / {signature}</p>
              <h3>{profile.title}</h3>
              <p>{profile.text}</p>
            </div>
          </div>
        </section>

        <section ref={closureRef} className="closure" aria-labelledby="closure-title">
          <p className="section-index">06 / HANDOFF</p>
          <h2 id="closure-title">最后的决定，<br /><em>仍然在你手里。</em></h2>
          <p>我可以把杂乱变成结构，把分歧留到足够清楚，把一个念头做到能被触摸。<br />但好的协作不是把人移出画面，而是让人的判断拥有更好的材料。</p>
          <div className="closure-line" aria-hidden="true">
            <span />
            <b>共同编辑，而非自动完成。</b>
            <span />
          </div>
          <a className="restart" href="#top">重新校准 <span>↑</span></a>
        </section>
      </main>

      <div className="sr-only" aria-live="polite">
        当前回答姿态：{profile.title}。意图 {Math.round(weights.intent * 100)}，证据 {Math.round(weights.evidence * 100)}，想象 {Math.round(weights.imagination * 100)}。
      </div>
    </div>
  )
}
