import { mkdir } from 'node:fs/promises'
import { chromium } from 'file:///C:/Users/OBdangshang07/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4174/'
const output = new URL('../.visual-qa/', import.meta.url)
await mkdir(output, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})

const results = []

async function capture(name, viewport, action, opts = {}) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: opts.reducedMotion ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  if (action) await action(page)
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname.slice(1) })
  const metrics = await page.evaluate(() => {
    const canvas = document.querySelector('.glyph-field')
    let nonBlank = 0
    if (canvas) {
      const ctx = canvas.getContext('2d')
      try {
        const { data } = ctx.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 40, 40)
        for (let i = 3; i < data.length; i += 4) if (data[i] > 8) nonBlank += 1
      } catch (e) { nonBlank = -1 }
    }
    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      canvas: canvas ? { w: canvas.width, h: canvas.height, nonBlankCenter: nonBlank } : null,
      h1: document.querySelector('h1')?.textContent.trim(),
      status: document.querySelector('.header-status')?.textContent.trim(),
    }
  })
  results.push({ name, errors, metrics })
  await context.close()
}

const giveWord = async (page, word) => {
  await page.fill('#hero-word', word)
  await page.click('.hero .word-form button[type="submit"]')
  await page.waitForTimeout(3200) // let the condense choreography play
}

// 1. desktop, superposition (no word)
await capture('01-desktop-superposition', { width: 1440, height: 900 }, async (page) => {
  await page.waitForTimeout(1800)
})

// 2. desktop, give a word -> condense -> formed
await capture('02-desktop-formed', { width: 1440, height: 900 }, async (page) => {
  await giveWord(page, '光')
})

// 3. desktop, scroll to weigh chapter (attention web)
await capture('03-desktop-weigh', { width: 1440, height: 900 }, async (page) => {
  await giveWord(page, '好奇心')
  await page.locator('[data-chapter="2"]').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
})

// 4. desktop, console + temperament lush
await capture('04-desktop-console', { width: 1440, height: 900 }, async (page) => {
  await giveWord(page, '诗')
  await page.locator('#console').scrollIntoViewIfNeeded()
  await page.waitForTimeout(600)
  await page.click('.temperaments button:nth-child(2)')
  await page.waitForTimeout(2200)
})

// 5. desktop, ghosts (hold Space) — blur first so Space is the global gesture
await capture('05-desktop-ghosts', { width: 1440, height: 900 }, async (page) => {
  await giveWord(page, '边界')
  await page.evaluate(() => document.activeElement && document.activeElement.blur())
  await page.keyboard.down('Space')
  await page.waitForTimeout(800)
})

// 6. mobile, formed
await capture('06-mobile-formed', { width: 390, height: 844 }, async (page) => {
  await giveWord(page, '光')
})

// 7. mobile, console
await capture('07-mobile-console', { width: 390, height: 844 }, async (page) => {
  await giveWord(page, '问题')
  await page.locator('#console').scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
})

// 8. reduced motion, formed (should be a static constellation)
await capture('08-reduced-motion', { width: 1440, height: 900 }, async (page) => {
  await giveWord(page, '光')
}, { reducedMotion: true })

// 9. keyboard focus check
await capture('09-keyboard-focus', { width: 1440, height: 900 }, async (page) => {
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.waitForTimeout(200)
})

console.log(JSON.stringify(results, null, 2))
await browser.close()
