/**
 * 用 Chrome DevTools Protocol 精确控制页面：滚动到任意位置、执行 JS、截图、收集控制台错误。
 * 零依赖（Node 22 自带 WebSocket）。
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ width = 1440, height = 900, dsf = 1, reduceMotion = false } = {}) {
  const port = 9200 + Math.floor(Math.random() * 300);
  const profile = resolve(tmpdir(), 'cdp_' + Math.random().toString(36).slice(2, 9));
  const args = [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-features=Translate',
    `--force-device-scale-factor=${dsf}`,
    `--window-size=${width},${height}`,
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    'about:blank',
  ];
  if (!reduceMotion) args.unshift('--force-prefers-no-reduced-motion');
  const proc = spawn(CHROME, args, { stdio: 'ignore' });

  let info = null;
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) { info = await r.json(); break; }
    } catch {}
    await sleep(120);
  }
  if (!info) throw new Error('chrome did not start');
  return { proc, port, profile, browserWs: info.webSocketDebuggerUrl };
}

export async function openPage(port, url) {
  const r = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  if (!r.ok) throw new Error('cannot open target: ' + r.status);
  const t = await r.json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
  });
  let id = 0;
  const pending = new Map();
  const logs = [];
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      logs.push(msg.params.type + ': ' + msg.params.args.map((a) => a.value ?? a.description ?? a.type).join(' '));
    } else if (msg.method === 'Runtime.exceptionThrown') {
      logs.push('EXCEPTION: ' + (msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text));
    }
  });
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const mid = ++id;
      pending.set(mid, { res, rej });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  await send('Runtime.enable');
  await send('Page.enable');
  return {
    send,
    logs,
    close: () => ws.close(),
    async evaluate(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval failed');
      return r.result.value;
    },
    async shot(path) {
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, Buffer.from(r.data, 'base64'));
      return path;
    },
  };
}

export async function kill(session) {
  try { session.proc.kill(); } catch {}
  try { rmSync(session.profile, { recursive: true, force: true }); } catch {}
}

export { sleep };
