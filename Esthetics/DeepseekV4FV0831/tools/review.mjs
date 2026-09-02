/** 巡检脚本：多个滚动位置 + 多个视口 + 控制台错误 */
import { launch, openPage, kill, sleep } from './cdp.mjs';

const URL = process.argv[2] || 'http://localhost:4174/';
const TAG = process.argv[3] || 'desk';
const W = Number(process.argv[4] || 1440);
const H = Number(process.argv[5] || 900);
const REDUCE = process.argv.includes('--reduce');
// 章节中心：6 屏 => i/5
const STOPS = [0, 0.2, 0.4, 0.56, 0.6, 0.8, 0.9, 1.0];

const s = await launch({ width: Math.max(W, 520), height: Math.max(H, 400), reduceMotion: REDUCE });
const page = await openPage(s.port, URL);
await page.send('Emulation.setDeviceMetricsOverride', {
  width: W, height: H, deviceScaleFactor: 1, mobile: W < 700,
});
if (REDUCE) {
  await page.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
}
await page.evaluate('location.reload()').catch(() => {});
await sleep(2600);

const out = [];
for (const p of STOPS) {
  await page.evaluate(`(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: max * ${p}, behavior: 'instant' });
    return true;
  })()`);
  await sleep(p === 0 ? 3200 : 1700);
  const state = await page.evaluate(`(() => {
    const r = document.querySelector('.readout');
    return r ? r.innerText.replace(/\\s+/g,' ') : 'no readout';
  })()`);
  const name = `shots/${TAG}-${String(Math.round(p * 100)).padStart(2, '0')}.png`;
  await page.shot(name);
  out.push(`${name}  p=${p}  ${state}`);
}
console.log(out.join('\n'));
const errs = page.logs.filter((l) => /error|EXCEPTION|warn/i.test(l));
console.log('--- console ---');
console.log(errs.length ? errs.slice(0, 12).join('\n') : 'clean');
page.close();
await kill(s);
