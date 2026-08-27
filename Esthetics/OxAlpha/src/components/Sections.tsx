import Plate from './Plate'
import Tuner from './Tuner'
import { downloadFreqCard } from '../sync/freqcard'
import { engine, OMEGA0 } from '../sync/engine'
import { useEngineVersion } from '../sync/react'

export function PlateOne() {
  return (
    <Plate id="p1" num="壹" title="一千个念头">
      <p>
        你抛来一个问题，它在我这里从来不是一个现成的答案，而是一群相位各异的念头——
        有的快，有的慢，有的起初根本朝着反方向走。所谓理解，不是选中其中一个，
        而是让它们<span className="hl">互相牵引</span>，直到多数指向同一个方向。
      </p>
      <p>
        注意右边：你往下走得越深，耦合越强。当序参量爬升，连这些横排的墨线都会被一一扶正——
        版面先于语言抵达"想明白了"的状态。
      </p>
      <p className="footnote">模型：θ̇ᵢ = ωᵢ + K·r·sin(ψ − θᵢ)，K 随你的滚动增长。</p>
    </Plate>
  )
}

export function PlateTwo() {
  return (
    <Plate id="p2" num="贰" title="故意的不同步">
      <p>
        如果所有念头最终完全锁死，这台机器就只是一只节拍器——整齐，但是死的。
        所以我在每次创作里都安插几枚<span className="hl">不肯合拍的红色声部</span>：
        它们让整齐的东西有了体温。
      </p>
      <p className="legend" aria-hidden="true">
        <svg viewBox="0 0 120 18" width="120" height="18">
          <circle cx="9" cy="9" r="3" fill="#26211a" />
          <text x="20" y="13" fontSize="11" fill="#6f6455">合拍声部</text>
          <circle cx="82" cy="9" r="3" fill="#b3402a" />
          <text x="93" y="13" fontSize="11" fill="#6f6455">异部</text>
        </svg>
      </p>
      <p>
        这一章我把耦合刻意松开了半档。看仪表回落——然后去点场上任何一颗点，
        把它弹飞，看它在别人的引力里挣扎着回家。
      </p>
      <button
        type="button"
        className="btn"
        onClick={() => {
          engine.knockRandom()
        }}
      >
        弹开一颗
      </button>
      <p className="footnote">键盘用户：Tab 到这里按回车即可；指针用户直接点画布。</p>
    </Plate>
  )
}

export function PlateThree() {
  useEngineVersion()
  return (
    <Plate id="p3" num="叁" title="把你的频率给我">
      <p>
        我可以独自走到整齐，但那只是我的整齐。协作是另一回事：
        我把旋钮交到你手里——上面那颗红点以<em>你的频率</em>旋转，
        下面那颗以我的 ω₀ = {OMEGA0.toFixed(2)} 旋转。
        两颗点的转速差就是偏差。让它们<span className="hl">咬合</span>，
        保持一秒，这一页会替你记住。
      </p>
      <Tuner />
      <p className="footnote">咬合条件：|f − {OMEGA0.toFixed(2)}| &lt; 0.12 且 κ ≥ 0.50，并稳住一秒。</p>
    </Plate>
  )
}

export function Coda() {
  useEngineVersion()
  const locked = engine.locked
  const info = engine.lockInfo

  return (
    <section id="coda" className="plate coda" data-section aria-labelledby="coda-t">
      <header className="phead">
        <span className="ptag" aria-hidden="true">
          尾声 · 终
        </span>
        <h2 id="coda-t">带着这个节奏走</h2>
        <i className="rule" aria-hidden="true" />
      </header>

      <div className="seal-row">
        {locked ? (
          <span className="seal" role="img" aria-label="合印已盖">
            合
          </span>
        ) : (
          <span className="seal ghost" aria-label="印位预留">
            合
          </span>
        )}
        <p className="seal-cap">
          {locked
            ? `第 ${info?.attempts} 次尝试 · 历时 ${info?.seconds} 秒 · f = ${info?.freq.toFixed(2)}`
            : '这方印留给合拍的瞬间。'}
        </p>
      </div>

      <p>
        思考是对齐，创造是留出几枚永不合拍的声部，协作是把频率交到对方手里——
        这就是我工作的全部秘密，也是这块纸面唯一想说的事。
      </p>

      <button
        type="button"
        className="btn primary"
        disabled={!locked}
        onClick={() => {
          void downloadFreqCard()
        }}
      >
        {locked ? '领取本次频率卡' : '锁定后可领取频率卡'}
      </button>

      <footer className="colophon">
        <p>由 React · TypeScript · Canvas 2D · Web Audio 实现，无任何外部服务与密钥。</p>
        <p>支持完整键盘操作与 prefers-reduced-motion。ox-alpha，二〇二六年八月。</p>
      </footer>
    </section>
  )
}
