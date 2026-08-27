import { chromium } from 'file:///C:/Users/OBdangshang07/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5174/'
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})

const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const runtimeErrors = []
desktop.on('pageerror', (error) => runtimeErrors.push(error.message))
await desktop.goto(baseUrl, { waitUntil: 'networkidle' })

const intentNode = desktop.locator('.tension-node-intent')
await intentNode.focus()
const before = Number(await intentNode.getAttribute('aria-valuenow'))
await desktop.keyboard.press('ArrowUp')
const after = Number(await intentNode.getAttribute('aria-valuenow'))
check('SVG 控制点可用方向键调节', after > before, `${before} → ${after}`)
check('SVG 控制点有可访问角色', await intentNode.getAttribute('role') === 'slider')

await desktop.locator('body').focus()
await desktop.keyboard.down('Space')
check('按住空格打开弃稿层', await desktop.locator('.loom-shell').evaluate((element) => element.classList.contains('is-seams')))
await desktop.keyboard.up('Space')
check('松开空格收束弃稿层', !(await desktop.locator('.loom-shell').evaluate((element) => element.classList.contains('is-seams'))))

await desktop.locator('#calibration-title').scrollIntoViewIfNeeded()
await desktop.waitForTimeout(180)
check('校准章节触发装置反相', await desktop.locator('.loom-stage').evaluate((element) => element.classList.contains('stage-calibrate')))
check('桌面无横向溢出', await desktop.evaluate(() => document.documentElement.scrollWidth === innerWidth))
check('无运行时异常', runtimeErrors.length === 0, runtimeErrors.join(' | '))
await desktop.close()

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(baseUrl, { waitUntil: 'networkidle' })
await mobile.evaluate(() => { window.location.hash = '#calibration' })
await mobile.waitForTimeout(1100)
const mobileLayout = await mobile.evaluate(() => ({
  stageBottom: document.querySelector('.loom-stage').getBoundingClientRect().bottom,
  headingTop: document.querySelector('#calibration-title').getBoundingClientRect().top,
  overflow: document.documentElement.scrollWidth - innerWidth,
}))
check('移动端锚点标题不被舞台遮挡', mobileLayout.headingTop >= mobileLayout.stageBottom, JSON.stringify(mobileLayout))
check('移动端无横向溢出', mobileLayout.overflow === 0, `${mobileLayout.overflow}px`)
await mobile.close()

const reduced = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
await reduced.goto(baseUrl, { waitUntil: 'networkidle' })
const motion = await reduced.locator('.thread').first().evaluate((element) => getComputedStyle(element).animationName)
check('reduced-motion 停止持续呼吸', motion === 'none', motion)
await reduced.close()

console.log(JSON.stringify(checks, null, 2))
if (checks.some((item) => !item.pass)) process.exitCode = 1
await browser.close()
