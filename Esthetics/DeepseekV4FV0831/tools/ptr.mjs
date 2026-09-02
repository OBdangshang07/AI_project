import { launch, openPage, kill, sleep } from './cdp.mjs';
const s = await launch({ width: 1440, height: 900 });
const page = await openPage(s.port, process.argv[2] || 'http://localhost:4174/');
await sleep(2400);
const out = await page.evaluate(`(async () => {
  const el = document.querySelector('.stage-hit');
  const b = el.getBoundingClientRect();
  const opts = { bubbles: true, cancelable: true, pointerId: 1, isPrimary: true, pointerType: 'touch',
                 clientX: b.x + b.width/2, clientY: b.y + b.height*0.7, button: 0, buttons: 1 };
  el.dispatchEvent(new PointerEvent('pointerdown', opts));
  await new Promise(r => setTimeout(r, 700));
  const held = document.querySelector('.readout').innerText.includes('背面');
  el.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0 }));
  await new Promise(r => setTimeout(r, 300));
  const after = document.querySelector('.readout').innerText.includes('背面');
  // 拖拽调张力
  el.dispatchEvent(new PointerEvent('pointerdown', opts));
  el.dispatchEvent(new PointerEvent('pointermove', { ...opts, clientY: opts.clientY - 120 }));
  await new Promise(r => setTimeout(r, 400));
  const t = document.querySelector('.readout').innerText;
  el.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0 }));
  return { held, after, tension: t.replace(/\\s+/g,' ') };
})()`);
console.log(JSON.stringify(out));
page.close();
await kill(s);
