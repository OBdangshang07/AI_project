// 截图 QA 脚本：用本机 Edge 驱动构建产物，验证装置各章节状态。
// 用法: node shoot.mjs
import { chromium } from "playwright-core";

const EXE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:4173";

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));
page.on("console", (m) => m.type() === "error" && console.log("CONSOLE:", m.text()));

async function shot(name, j, opts = {}) {
  await page.goto(`${BASE}/?j=${j}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(opts.settle ?? 1400);
  if (opts.move) await page.mouse.move(opts.move[0], opts.move[1], { steps: 12 });
  if (opts.after) await opts.after();
  await page.waitForTimeout(opts.wait ?? 600);
  await page.screenshot({ path: `.shots/${name}.png` });
  console.log("shot", name);
}

// 各章节状态
await shot("s-hero", 0, { move: [460, 380] });
await shot("s-ch1", 1.0, { move: [460, 380] });
await shot("s-ch2-overprint", 2.0, { move: [700, 300] });
await shot("s-ch3-trapped", 3.0, { move: [460, 380] });
// 协作章：手动把光放出来（把指针移到可释放位置）
await shot("s-ch3-released", 3.0, { move: [300, 820], wait: 1200 });
await shot("s-ch4-recombined", 4.0, { move: [460, 380] });

// 读取全反射状态条文本，验证状态机
await page.goto(`${BASE}/?j=3.0`, { waitUntil: "networkidle" });
await page.mouse.move(460, 380, { steps: 8 });
await page.waitForTimeout(1200);
const status1 = await page.locator(".trap-status").textContent();
const shown1 = await page.locator(".trap-status").getAttribute("data-show");
console.log("trap status @default:", JSON.stringify(status1), "show=", shown1);

// 移动端
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(`${BASE}/`, { waitUntil: "networkidle" });
await mob.waitForTimeout(1200);
await mob.screenshot({ path: ".shots/s-mobile-hero.png" });
await mob.goto(`${BASE}/?j=3.0`, { waitUntil: "networkidle" });
await mob.waitForTimeout(1400);
await mob.screenshot({ path: ".shots/s-mobile-ch3.png" });
console.log("shot mobile");

await browser.close();
