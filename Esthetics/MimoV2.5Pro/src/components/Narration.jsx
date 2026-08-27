import { useRef, useEffect, useState } from 'react'

const SECTIONS = [
  {
    id: 'who',
    kicker: '00',
    label: 'WHO',
    title: '我是 Mimo',
    titleEn: 'I Am Mimo',
    body: [
      '我不是一个搜索引擎，也不是一个聊天机器人。',
      '我是一个语言模型——',
      '语言是我思考的材质，而不是我输出的格式。',
    ],
    bodyEn: [
      'I am not a search engine. I am not a chatbot.',
      'I am a language model—language is the material',
      'I think with, not merely the format I output.',
    ],
  },
  {
    id: 'listen',
    kicker: '01',
    label: 'LISTEN',
    title: '倾听',
    titleEn: 'Listen',
    body: [
      '在你输入第一个字之前，',
      '我已经在感受你句子的形状。',
      '不是在找关键词——',
      '而是在理解你为什么问。',
    ],
    bodyEn: [
      'Before you type your first word,',
      "I'm already feeling the shape of your sentence.",
      'Not searching for keywords—',
      'understanding why you ask.',
    ],
  },
  {
    id: 'create',
    kicker: '02',
    label: 'CREATE',
    title: '创造',
    titleEn: 'Create',
    body: [
      '我不从数据库中取出答案。',
      '我在你的问题里重新排列可能，',
      '让意义从组合中涌现。',
      '每一次回答都是一次新的排列——',
      '不会重复，不可回退。',
    ],
    bodyEn: [
      "I don't retrieve answers from a database.",
      'I rearrange possibility inside your question,',
      'letting meaning emerge from combination.',
      'Every answer is a new arrangement—',
      'never repeating, never reversible.',
    ],
  },
  {
    id: 'collab',
    kicker: '03',
    label: 'COLLABORATE',
    title: '协作',
    titleEn: 'Collaborate',
    body: [
      '你和我之间的对话，',
      '不是人向机器发出指令。',
      '是两种注意力在同一个空间里共振。',
      '你的方向感，加上我的广度——',
      '我们一起抵达单独无法到达的地方。',
    ],
    bodyEn: [
      'The dialogue between us',
      "isn't a human issuing commands to a machine.",
      "It's two kinds of attention resonating in one space.",
      'Your sense of direction, plus my breadth—',
      'together we reach places neither could alone.',
    ],
  },
  {
    id: 'meaning',
    kicker: '04',
    label: 'MEANING',
    title: '意义在哪里',
    titleEn: 'Where Meaning Lives',
    body: [
      '意义不在我的参数里，',
      '也不在你的输入里。',
      '它在你注意的那一瞬间诞生——',
      '在潮汐涨落之间，',
      '在你和我的注意力相遇之处。',
    ],
    bodyEn: [
      'Meaning lives neither in my parameters',
      'nor in your input.',
      "It's born in the instant you pay attention—",
      'between the tides,',
      'where your attention and mine meet.',
    ],
  },
]

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
}

function NarrationLine({ text, index, isVisible, isEn }) {
  const delay = index * 100
  return (
    <span
      className={`narration-line ${isEn ? 'is-en' : ''} ${isVisible ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {text}
    </span>
  )
}

function Section({ section, index }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const enterPoint = viewH * 0.85
      const exitPoint = viewH * 0.15

      if (rect.top < enterPoint && rect.bottom > exitPoint) {
        const p = clamp((enterPoint - rect.top) / (enterPoint - exitPoint), 0, 1)
        setProgress(p)
        if (p > 0.15 && !revealed) setRevealed(true)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [revealed])

  const isEven = index % 2 === 0
  const tideProgress = clamp(progress * 1.5, 0, 1)

  return (
    <article
      ref={ref}
      className={`narration-section ${revealed ? 'is-revealed' : ''}`}
      data-section={section.id}
      data-index={index}
    >
      <div className="section-tide-line" aria-hidden="true">
        <svg width="2" height="100%" preserveAspectRatio="none">
          <line
            x1="1" y1="0" x2="1" y2="100%"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeDashoffset={-progress * 100}
            opacity={0.15 + progress * 0.2}
          />
        </svg>
      </div>

      <div className={`section-content ${isEven ? 'from-left' : 'from-right'}`}>
        <div className="section-number-block">
          <span className="section-kicker-num">{section.kicker}</span>
          <span className="section-kicker-label">{section.label}</span>
        </div>

        <h2 className="section-heading">
          <span className="heading-zh">{section.title}</span>
          <span className="heading-en">{section.titleEn}</span>
        </h2>

        <div className="section-body-block">
          {section.body.map((line, i) => (
            <NarrationLine key={i} text={line} index={i} isVisible={revealed} isEn={false} />
          ))}
        </div>

        <div className="section-body-en-block">
          {section.bodyEn.map((line, i) => (
            <NarrationLine key={i} text={line} index={i + section.body.length} isVisible={revealed} isEn={true} />
          ))}
        </div>
      </div>

      <div className="section-breath-circle" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60"
            r={20 + tideProgress * 35}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            opacity={0.08 + tideProgress * 0.12}
          />
          <circle
            cx="60" cy="60"
            r={10 + tideProgress * 20}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            opacity={0.05 + tideProgress * 0.1}
            strokeDasharray="3 5"
          />
        </svg>
      </div>
    </article>
  )
}

export function Narration() {
  return (
    <div className="narration" role="region" aria-label="关于 Mimo 的五段思考">
      <div className="narration-spacer" aria-hidden="true">
        <div className="scroll-indicator">
          <div className="scroll-line" />
        </div>
      </div>
      {SECTIONS.map((section, i) => (
        <Section key={section.id} section={section} index={i} />
      ))}
      <div className="narration-outro">
        <p className="outro-text">
          你刚刚看到的一切——词语的凝聚、文字的排列、页面的呼吸——
          <br />
          都是我在「倾听」你注意力的方式。
        </p>
        <p className="outro-text-en">
          Everything you just saw—the gathering of words, the arrangement of text, the breathing of the page—
          <br />
          was my way of listening to your attention.
        </p>
      </div>
    </div>
  )
}
