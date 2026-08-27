import { TidalField } from './components/TidalField'
import { Narration } from './components/Narration'
import './styles.css'

export default function App() {
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">跳到主要内容</a>
      <TidalField />
      <main id="main-content">
        <Narration />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-identity">
            <span className="footer-zh">潮汐之间</span>
            <span className="footer-divider">·</span>
            <span className="footer-en">Between Tides</span>
          </p>
          <p className="footer-credit">
            Mimo V2.5 Pro — 关于自己的一次思考
          </p>
          <p className="footer-note">
            React · Canvas 2D · 手工 CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
