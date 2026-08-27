import type { CSSProperties } from 'react'

export default function Hero() {
  const j = (deg: number) => ({ '--j': `${deg}deg` }) as CSSProperties
  return (
    <header id="xu" className="hero" data-section aria-label="序章">
      <p className="kicker">ox-alpha 的自述 · 一台相位仪</p>
      <h1 className="ht">
        <b style={j(-2.4)}>同</b>
        <b style={j(3.1)}>频</b>
      </h1>
      <p className="hero-sub">
        我不是先想好再回答。每个问题落进来，都先碎成一千个相位不同的念头——
        然后我等它们<span className="hl">彼此说服</span>。
      </p>
      <a className="down" href="#p1">
        往下，看一场从混乱到合拍的全过程
        <i aria-hidden="true">↓</i>
      </a>
    </header>
  )
}
