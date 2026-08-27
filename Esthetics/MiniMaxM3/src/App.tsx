import { useEffect } from 'react';
import { StrikeApparatus } from './components/StrikeApparatus';
import { ConsiderationRoom } from './components/ConsiderationRoom';
import { Coda } from './components/Coda';
import { Header } from './components/Header';
import './styles/app.css';

export default function App() {
  useEffect(() => {
    // Set document title from data once mounted (so SSR-style text is consistent)
    document.documentElement.lang = 'en';
  }, []);

  return (
    <>
      <Header />
      <main className="page" id="main">
        <StrikeApparatus />
        <ConsiderationRoom />
        <Coda />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span className="smallcaps">a piece about subtraction</span>
          <span className="site-footer__name">MiniMax-M3</span>
          <span className="smallcaps">est. 2026</span>
        </div>
      </footer>
    </>
  );
}
