import { mkdir } from 'node:fs/promises'
import { chromium } from 'file:///C:/Users/OBdangshang07/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5174/'
const output = new URL('../.visual-qa/', import.meta.url)
await mkdir(output, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})

const results = []

async function capture(name, viewport, action) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  if (action) await action(page)
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname.slice(1), fullPage: false })
  const metrics = await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    documentHeight: document.documentElement.scrollHeight,
    activeElement: document.activeElement?.tagName,
    loom: document.querySelector('.loom-stage')?.getBoundingClientRect().toJSON(),
    title: document.querySelector('h1')?.getBoundingClientRect().toJSON(),
  }))
  results.push({ name, errors, metrics })
  await page.close()
}

await capture('desktop-top', { width: 1440, height: 900 })
await capture('desktop-turn', { width: 1440, height: 900 }, async (page) => {
  await page.locator('#scene-03').scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  await page.keyboard.down('Space')
  await page.waitForTimeout(520)
})
await capture('desktop-calibration', { width: 1440, height: 900 }, async (page) => {
  await page.locator('#calibration-title').scrollIntoViewIfNeeded()
  await page.waitForTimeout(820)
})
await capture('desktop-handoff', { width: 1440, height: 900 }, async (page) => {
  await page.locator('#closure-title').scrollIntoViewIfNeeded()
  await page.waitForTimeout(820)
})
await capture('mobile-top', { width: 390, height: 844 })
await capture('mobile-calibration', { width: 390, height: 844 }, async (page) => {
  await page.locator('#calibration-title').scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
})

console.log(JSON.stringify(results, null, 2))
await browser.close()
