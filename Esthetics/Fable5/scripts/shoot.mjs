/* CDP 截图驱动器 —— 用 Node22 原生 WebSocket 直连 Chrome DevTools。
   用法: node scripts/shoot.mjs [baseUrl]
   产出: .shots/cdp-*.png                                        */

import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:5175'
const OUT = resolve('.shots')
mkdirSync(OUT, { recursive: true })

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

// ———— 剧本 ————
const Q_FULL = `
const e = window.__studio.engine;
e.setScroll(2.5); e.simulate(4);
e['rT'].forEach((v,i,a)=>{ const t=i/63; a[i]=v + Math.sin(t*3.1)*10*(t>0.3?1:0) });
e['touches'].push(0.45,0.7); e.stats.touches=2;
e.startQuestion('think'); e.simulate(9);
e.startQuestion('unknown'); e.simulate(8);
e.startQuestion('made'); e.simulate(8);
e.setHold(true); e.startQuestion('together'); e.simulate(9); e.setHold(false); e.simulate(1);
`

const SCENARIOS = [
  { name: 'd-hero', w: 1440, h: 900, url: '/', eval: `window.__studio.engine.simulate(1.5)` },
  {
    name: 'd-center-wobble',
    w: 1440,
    h: 900,
    url: '/',
    eval: `
      const sec = document.querySelectorAll('main .chapter')[1];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.55);
      const e = window.__studio.engine; e.simulate(3);
      e['ecc']=46; e.simulate(0.06);`,
  },
  {
    name: 'd-shape-full',
    w: 1440,
    h: 900,
    url: '/',
    eval: `
      const sec = document.querySelectorAll('main .chapter')[2];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.8);
      ${Q_FULL}`,
  },
  {
    name: 'd-kiln-crack',
    w: 1440,
    h: 900,
    url: '/',
    eval: `
      ${Q_FULL}
      const sec = document.querySelectorAll('main .chapter')[3];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.6);
      e.setScroll(3.45); e.simulate(2); e.simulate(6.4);`,
  },
  {
    name: 'd-kiln-gold',
    w: 1440,
    h: 900,
    url: '/',
    eval: `
      ${Q_FULL}
      const sec = document.querySelectorAll('main .chapter')[3];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.6);
      e.setScroll(3.45); e.simulate(2); e.simulate(16.5);`,
  },
  {
    name: 'd-vessel-colophon',
    w: 1440,
    h: 900,
    url: '/',
    eval: `
      ${Q_FULL}
      e.setScroll(4.5); e.simulate(40);
      const sec = document.querySelectorAll('main .chapter')[4];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.55);
      e.simulate(1);
      e.cutOff(); e.simulate(3);`,
  },
  { name: 'm-hero', w: 390, h: 844, mobile: true, url: '/', eval: `window.__studio.engine.simulate(1.5)` },
  {
    name: 'calm-kiln',
    w: 1440,
    h: 900,
    url: '/',
    pre: `localStorage.setItem('cq_calm','1')`,
    eval: `
      ${Q_FULL}
      const sec = document.querySelectorAll('main .chapter')[3];
      window.scrollTo(0, sec.offsetTop + innerHeight*0.6);
      e.setScroll(3.45); e.simulate(1);`,
  },
  {
    name: 'calm-reset',
    w: 390,
    h: 400,
    url: '/',
    pre: `localStorage.removeItem('cq_calm')`,
    eval: `void 0`,
  },
  {
    name: 'm-shape',
    w: 390,
    h: 844,
    mobile: true,
    url: '/',
    eval: `
      const sec = document.querySelectorAll('main .chapter')[2];
      window.scrollTo(0, sec.offsetTop - innerHeight*0.1);
      ${Q_FULL}`,
  },
  {
    name: 'm-kiln-done',
    w: 390,
    h: 844,
    mobile: true,
    url: '/',
    eval: `
      ${Q_FULL}
      const sec = document.querySelectorAll('main .chapter')[3];
      window.scrollTo(0, sec.offsetTop - innerHeight*0.05);
      e.setScroll(3.45); e.simulate(2); e.simulate(40);`,
  },
]

// ———— CDP 基建 ————
function launchChrome() {
  return new Promise((res, rej) => {
    const p = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=0',
      '--no-first-run',
      'about:blank',
    ])
    let buf = ''
    p.stderr.on('data', (d) => {
      buf += d.toString()
      const m = buf.match(/DevTools listening on (ws:\/\/[^\s]+)/)
      if (m) res({ proc: p, ws: m[1] })
    })
    p.on('error', rej)
    setTimeout(() => rej(new Error('chrome launch timeout\n' + buf)), 15000)
  })
}

class CDP {
  constructor(ws) {
    this.sock = new WebSocket(ws)
    this.id = 0
    this.pending = new Map()
    this.events = []
    this.sock.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id != null && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) rej(new Error(msg.error.message))
        else res(msg.result)
      } else if (msg.method) {
        this.events.push(msg)
      }
    })
    this.ready = new Promise((r) => this.sock.addEventListener('open', r))
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id
    const payload = { id, method, params }
    if (sessionId) payload.sessionId = sessionId
    this.sock.send(JSON.stringify(payload))
    return new Promise((res, rej) => this.pending.set(id, { res, rej }))
  }
  async waitEvent(method, sessionId, timeout = 15000) {
    const t0 = Date.now()
    while (Date.now() - t0 < timeout) {
      const i = this.events.findIndex((e) => e.method === method && e.sessionId === sessionId)
      if (i >= 0) return this.events.splice(i, 1)[0]
      await new Promise((r) => setTimeout(r, 40))
    }
    throw new Error('timeout waiting ' + method)
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const { proc, ws } = await launchChrome()
  const cdp = new CDP(ws)
  await cdp.ready
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })
  const S = (m, p) => cdp.send(m, p, sessionId)
  await S('Page.enable')
  await S('Runtime.enable')

  for (const sc of SCENARIOS) {
    await S('Emulation.setDeviceMetricsOverride', {
      width: sc.w,
      height: sc.h,
      deviceScaleFactor: 1,
      mobile: !!sc.mobile,
    })
    if (sc.pre) {
      await S('Page.navigate', { url: BASE + sc.url })
      await cdp.waitEvent('Page.loadEventFired', sessionId)
      await S('Runtime.evaluate', { expression: sc.pre, returnByValue: true })
      await sleep(120)
    }
    await S('Page.navigate', { url: BASE + sc.url })
    await cdp.waitEvent('Page.loadEventFired', sessionId)
    await sleep(500)
    if (sc.eval) {
      const r = await S('Runtime.evaluate', {
        expression: `(function(){ try { ${sc.eval}; return 'ok' } catch (err) { return 'ERR: ' + err.message } })()`,
        returnByValue: true,
      })
      if (r.result?.value !== 'ok') console.error(`[${sc.name}] eval:`, r.result?.value)
    }
    await sleep(450)
    const shot = await S('Page.captureScreenshot', { format: 'png' })
    writeFileSync(`${OUT}/cdp-${sc.name}.png`, Buffer.from(shot.data, 'base64'))
    console.log('shot:', sc.name)
  }

  proc.kill()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
