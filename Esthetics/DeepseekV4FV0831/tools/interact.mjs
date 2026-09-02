/** 交互验收：输入词 → 提花织入；长按 → 翻面；导出 PNG；键盘可达性 */
import { launch, openPage, kill, sleep } from './cdp.mjs';

const URL = process.argv[2] || 'http://localhost:4174/';
const s = await launch({ width: 1440, height: 900 });
const page = await openPage(s.port, URL);
await sleep(2500);

const log = [];
// 滚到提花章节
await page.evaluate(`window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*0.78,behavior:'instant'}),1`);
await sleep(1200);

// 输入并提交
await page.evaluate(`(() => {
  const input = document.querySelector('#weave-input');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  setter.call(input, '你好');
  input.dispatchEvent(new Event('input',{bubbles:true}));
  input.form.requestSubmit();
  return input.value;
})()`).then((v) => log.push('input value = ' + v));

await sleep(900);
log.push('after submit: ' + (await page.evaluate(`document.querySelector('.done-note').textContent`)));
await sleep(5200);
log.push('later: ' + (await page.evaluate(`document.querySelector('.done-note').textContent`)));
log.push('readout: ' + (await page.evaluate(`document.querySelector('.readout').innerText.replace(/\\s+/g,' ')`)));
await page.shot('shots/x-jacquard.png');

// 导出 PNG 是否成立
const png = await page.evaluate(`(() => {
  const btns = [...document.querySelectorAll('button')].filter(b=>b.textContent.includes('取走这块布'));
  if (!btns.length) return 'no export button';
  return 'export button present: ' + btns.length;
})()`);
log.push(png);

// 长按翻面（用真实指针事件序列）
const band = await page.evaluate(`(() => { const b = document.querySelector('.stage-hit').getBoundingClientRect(); return {x: b.x + b.width/2, y: b.y + b.height*0.7}; })()`);
await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: band.x, y: band.y, button: 'left', clickCount: 1, pointerType: 'mouse' });
await sleep(760);
log.push('reversed while held: ' + (await page.evaluate(`document.querySelector('.readout').innerText.includes('背面')`)));
await page.shot('shots/x-reverse.png');
await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: band.x, y: band.y, button: 'left', clickCount: 1, pointerType: 'mouse' });
await sleep(400);
log.push('reversed after release: ' + (await page.evaluate(`document.querySelector('.readout').innerText.includes('背面')`)));

// 键盘翻面
await page.evaluate(`document.querySelector('.stage-hit').focus(),1`);
await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'r', code: 'KeyR', windowsVirtualKeyCode: 82, text: 'r' });
await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'r', code: 'KeyR', windowsVirtualKeyCode: 82 });
await sleep(500);
log.push('reversed via keyboard R: ' + (await page.evaluate(`document.querySelector('.readout').innerText.includes('背面')`)));
await page.shot('shots/x-reverse-kb.png');
await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'r', code: 'KeyR', windowsVirtualKeyCode: 82, text: 'r' });
await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'r', code: 'KeyR', windowsVirtualKeyCode: 82 });
await sleep(300);

// 键盘：Tab 到织机，空格投梭
await page.evaluate(`document.querySelector('.stage-hit').focus(),1`);
const before = await page.evaluate(`+document.querySelector('.readout b:nth-of-type(1)')?.textContent||0`);
await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
await sleep(600);
log.push('keyboard focusable: ' + (await page.evaluate(`document.activeElement.className`)));
void before;

// 性能：连续 3 秒的帧间隔
const perf = await page.evaluate(`new Promise(res => {
  const t = []; let last = performance.now(); let n = 0;
  const tick = () => { const now = performance.now(); t.push(now-last); last = now; if (++n < 180) requestAnimationFrame(tick); else {
    t.sort((a,b)=>a-b); res({ p50: +t[90].toFixed(2), p95: +t[171].toFixed(2), max: +t[179].toFixed(2) }); } };
  requestAnimationFrame(tick);
})`);
log.push('frame ms ' + JSON.stringify(perf));

console.log(log.join('\n'));
console.log('--- console ---');
console.log(page.logs.filter((l)=>/error|EXCEPTION/i.test(l)).join('\n') || 'clean');
page.close();
await kill(s);
