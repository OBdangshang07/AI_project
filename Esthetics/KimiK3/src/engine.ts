/**
 * engine.ts — 棱镜装置：渲染 + 编舞状态机。
 *
 * 设计原则：
 * - 所有光路由 optics.ts 真实计算（斯涅尔定律 / 全反射），本文件只负责"怎么画"。
 * - 章节不是切页，而是同一台装置的连续状态：App 传入 journey(0..4)，
 *   引擎把棱镜旋转、色散增益、第二束光、收束等参数缓动到目标值。
 * - 谱带用 multiply 叠印：两束光交叠处出现的新颜色是印刷意义上的"创造"。
 */

import {
  Vec,
  v,
  add,
  scale,
  norm,
  sub,
  len,
  PrismShape,
  traceBeam,
  prismVertices,
} from "./optics";

export interface EngineTargets {
  rotation: number;   // 棱镜基准旋转
  spread: number;     // 色散增益 0..1
  converge: number;   // 谱带收束回白光 0..1
  secondBeam: number; // 第二束光（创造章）0..1
  weave: number;      // 谱带横向交织幅度
  trap: number;       // 旋向全反射角度 0..1
  release: number;    // 在全反射角基础上继续旋转以释放光 0..1
}

export const BAND_HUES = ["#C13B22", "#D98E2B", "#7C8F3F", "#3F7396", "#6B568C"];
const INK = "28, 24, 18";
const BAND_N0 = 1.43; // 基准折射率

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
/** 无输入时的基准指针：光束从文字下方的留白进入。 */
const DEFAULT_POINTER = { x: 0.3, y: 0.62 };

export class PrismEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private raf = 0;
  private last = 0;
  private time = 0;

  private targets: EngineTargets = {
    rotation: 0.25, spread: 0.55, converge: 0, secondBeam: 0, weave: 0, trap: 0, release: 0,
  };
  private cur: EngineTargets = { ...this.targets };

  /** 归一化指针位置（0..1），驱动入射角。 */
  private pointer = { ...DEFAULT_POINTER };
  /** 键盘微调偏置（像素）。 */
  private bias = { x: 0, y: 0 };
  /** 按住棱镜"加压"：提高色散。 */
  private press = 0;
  private pressTarget = 0;

  private trapRot = 1.15;
  private releaseDelta = 0.5;
  private trapped = false;
  private flash = 0;

  reduced = false;
  onTrapChange?: (trapped: boolean) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    this.ctx = ctx;
    this.resize();
    this.scanTrappingRotation();
  }

  // ----------------------------------------------------------- public API

  setTargets(t: Partial<EngineTargets>) {
    Object.assign(this.targets, t);
  }

  setPointer(nx: number, ny: number) {
    this.pointer.x = clamp(nx, 0, 1);
    this.pointer.y = clamp(ny, 0, 1);
  }

  nudge(dx: number, dy: number) {
    this.bias.x = clamp(this.bias.x + dx, -140, 140);
    this.bias.y = clamp(this.bias.y + dy, -140, 140);
  }

  setPress(on: boolean) {
    this.pressTarget = on ? 1 : 0;
  }

  /** 指针是否落在棱镜附近（用于"按住加压"的判定）。 */
  isNearPrism(px: number, py: number): boolean {
    const p = this.prism();
    return len(sub(v(px, py), p.center)) < p.radius * 1.35;
  }

  start() {
    const loop = (t: number) => {
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - this.last) / 1000 || 0.016);
      this.last = t;
      if (!document.hidden) this.frame(dt);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 几何变了，全反射角区间也随之改变：必须重新数值扫描
    this.scanTrappingRotation();
  }

  // ------------------------------------------------------------- geometry

  private prism(): PrismShape {
    const desktop = this.w > 720;
    // 桌面：棱镜居中偏右，左侧整列留给文字版；移动：居中偏上，底部留给出射光谱
    const center = desktop
      ? v(this.w * 0.6, this.h * 0.52)
      : v(this.w * 0.5, this.h * 0.48);
    const radius = clamp(Math.min(this.w, this.h) * 0.17, 64, 168);
    return { center, radius, rotation: this.cur.rotation };
  }

  /** 主光束：从左缘射入，入射角完全由指针（+键盘微调+呼吸）决定。 */
  private mainBeam(): { origin: Vec; dir: Vec } {
    const p = this.prism();
    const breathe = this.reduced ? 0 : Math.sin(this.time * 0.55) * this.h * 0.008;
    const origin = v(-0.06 * this.w, clamp(this.pointer.y * this.h + this.bias.y, this.h * 0.05, this.h * 0.95));
    const aim = v(
      p.center.x + (this.pointer.x - 0.5) * p.radius * 1.1 + this.bias.x,
      p.center.y + breathe,
    );
    return { origin, dir: norm(sub(aim, origin)) };
  }

  /** 第二束光（创造章）：从右缘射入，与主光束镜像相关——它也"从属于你"。 */
  private secondBeam(): { origin: Vec; dir: Vec } {
    const p = this.prism();
    const breathe = this.reduced ? 0 : Math.cos(this.time * 0.47) * this.h * 0.008;
    const origin = v(1.06 * this.w, clamp((1 - this.pointer.y) * this.h - this.bias.y, this.h * 0.05, this.h * 0.95));
    const aim = v(
      p.center.x - (this.pointer.x - 0.5) * p.radius * 1.1,
      p.center.y + breathe,
    );
    return { origin, dir: norm(sub(aim, origin)) };
  }

  /**
   * 数值扫描当前几何下的「全反射角度区间」：
   * 困住角取区间右缘 - 0.15——此处画面上 2/3 区域的入射角都会困住光，
   * 而把光「放低」（指针移向画面底部）即可亲手释放——一个可发现、可学会的手势；
   * 释放角再越过右缘一点，滚动经过协作章也必然把光放出来（移动端兜底）。
   * 全反射因此不是脚本动画，而是角度真的不对——这对概念至关重要。
   * 几何（窗口尺寸）变化时必须重扫。
   */
  private scanTrappingRotation() {
    const desktop = this.w > 720;
    const center = desktop ? v(this.w * 0.6, this.h * 0.52) : v(this.w * 0.5, this.h * 0.48);
    const radius = clamp(Math.min(this.w, this.h) * 0.17, 64, 168);
    const origin = v(-0.06 * this.w, DEFAULT_POINTER.y * this.h);
    const aim = v(center.x + (DEFAULT_POINTER.x - 0.5) * radius * 1.1, center.y);
    const dir = norm(sub(aim, origin));
    const shape: PrismShape = { center, radius, rotation: 0 };
    const n = BAND_N0 + 0.02;

    let first: number | null = null;
    let last: number | null = null;
    for (let r = 0.8; r < 2.6; r += 0.004) {
      shape.rotation = r;
      if (traceBeam(origin, dir, shape, n).trapped) {
        if (first === null) first = r;
        last = r;
      }
    }
    if (first === null || last === null) {
      this.trapRot = 1.74;
      this.releaseDelta = 0.25;
      return;
    }
    this.trapRot = last - 0.15;
    this.releaseDelta = 0.25;
  }

  // ------------------------------------------------------------ rendering

  private frame(dt: number) {
    if (!this.reduced) this.time += dt;
    const k = this.reduced ? 1 : Math.min(1, dt * 4.2);
    for (const key of Object.keys(this.targets) as (keyof EngineTargets)[]) {
      this.cur[key] = lerp(this.cur[key], this.targets[key], k);
    }
    this.press = lerp(this.press, this.pressTarget, this.reduced ? 1 : Math.min(1, dt * 6));
    this.flash = Math.max(0, this.flash - dt * 1.6);
    this.draw();
  }

  private draw() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    // 棱镜最终旋转 = 基准角 →（trap 混合）→ 全反射角 + 释放角
    const t = this.cur;
    const finalRot =
      t.rotation * (1 - t.trap) + (this.trapRot + t.release * this.releaseDelta) * t.trap;
    const prism: PrismShape = { ...this.prism(), rotation: finalRot };

    const dispersion = (0.006 + 0.022 * t.spread) * (1 + this.press * 1.35);

    // ---- 主光束：入射段
    const main = this.mainBeam();
    const exits: { origin: Vec; dir: Vec }[] = [];
    let anyTrapped = false;
    let midTrapped = false;

    const results = BAND_HUES.map((_, i) => {
      const n = BAND_N0 + 0.012 + i * dispersion;
      return traceBeam(main.origin, main.dir, prism, n);
    });
    results.forEach((r, i) => {
      // 被全反射弹回的光不算"出射"：它留在了棱镜里，不再画出去
      if (r.exit && !r.trapped) exits.push(r.exit);
      if (r.trapped) {
        anyTrapped = true;
        if (i === Math.floor(BAND_HUES.length / 2)) midTrapped = true;
      }
    });

    // ---- 第二束光（创造章）
    const second = t.secondBeam > 0.02 ? this.secondBeam() : null;
    const secondResults = second
      ? BAND_HUES.map((_, i) =>
          traceBeam(second.origin, second.dir, prism, BAND_N0 + 0.012 + i * dispersion),
        )
      : [];

    // 全反射状态回调（供 aria-live 状态条）
    if (midTrapped !== this.trapped) {
      this.trapped = midTrapped;
      if (!midTrapped) this.flash = 1; // 光被释放的一瞬
      this.onTrapChange?.(midTrapped);
    }

    // ---- 画入射光束（纸上的"白光"：暖灰光晕 + 墨色芯线）
    this.drawIncident(main.origin, results[0].incident?.b ?? main.origin);
    if (second) {
      ctx.save();
      ctx.globalAlpha = t.secondBeam;
      this.drawIncident(second.origin, secondResults[0]?.incident?.b ?? second.origin);
      ctx.restore();
    }

    // ---- 画出射谱带（multiply 叠印）
    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    const c = t.converge;
    const mean = exits.length
      ? scale(exits.reduce((acc, e) => add(acc, e.origin), v(0, 0)), 1 / exits.length)
      : null;
    results.forEach((r, i) => {
      if (r.exit && !r.trapped) this.drawBand(r.exit, BAND_HUES[i], i, +1, c, mean, 1);
    });
    if (second) {
      secondResults.forEach((r, i) => {
        if (r.exit && !r.trapped) this.drawBand(r.exit, BAND_HUES[i], i, -1, 0, null, t.secondBeam);
      });
    }
    // 收束：谱带融合处重新长出一道白光
    if (c > 0.03 && mean) this.drawWhiteBeam(mean, c);
    ctx.restore();

    // ---- 棱镜内部的光路：正常通过只画淡淡一道；全反射的弹射路径清晰可见
    ctx.save();
    results.forEach((r) => {
      r.internal.forEach((seg, bi) => {
        const alpha = r.trapped ? Math.max(0.1, 0.66 - bi * 0.1) : bi === 0 ? 0.16 : 0;
        if (alpha <= 0) return;
        ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
        ctx.lineWidth = r.trapped ? 1.4 : 1.1;
        ctx.beginPath();
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
        ctx.stroke();
      });
    });
    // 第二束光的内部路径：它若没能穿过，也把棱镜从内部照亮
    let secondTrappedInside = false;
    secondResults.forEach((r) => {
      if (r.trapped) secondTrappedInside = true;
      r.internal.forEach((seg, bi) => {
        const base = r.trapped ? Math.max(0.08, 0.4 - bi * 0.07) : bi === 0 ? 0.12 : 0;
        const alpha = base * t.secondBeam;
        if (alpha <= 0.01) return;
        ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
        ctx.stroke();
      });
    });
    ctx.restore();

    // ---- 棱镜本体
    this.drawPrism(prism, anyTrapped, secondTrappedInside ? t.secondBeam : 0);

    // ---- 光被释放的一瞬：一圈墨色的呼吸
    if (this.flash > 0.01) {
      ctx.save();
      ctx.strokeStyle = `rgba(${INK}, ${this.flash * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(prism.center.x, prism.center.y, prism.radius * (1.1 + (1 - this.flash) * 0.9), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ---- 光源：左缘（与右缘）的入射点
    this.drawSource(main.origin, 1);
    if (second) this.drawSource(second.origin, t.secondBeam);
  }

  private drawIncident(origin: Vec, end: Vec) {
    const { ctx } = this;
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(190, 168, 128, 0.32)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(${INK}, 0.62)`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
  }

  /** 一条谱带：出射后延伸为多段折线（承载 weave 交织与 converge 收束）。 */
  private drawBand(
    exit: { origin: Vec; dir: Vec },
    hue: string,
    index: number,
    side: 1 | -1,
    converge: number,
    mean: Vec | null,
    alphaGain: number,
  ) {
    const { ctx, w } = this;
    const t = this.cur;
    const horizontal = v(side, 0);
    const dir = norm(
      v(
        lerp(exit.dir.x, horizontal.x, converge),
        lerp(exit.dir.y, horizontal.y, converge),
      ),
    );
    const origin = mean
      ? v(lerp(exit.origin.x, mean.x, converge), lerp(exit.origin.y, mean.y, converge))
      : exit.origin;
    const perp = v(-dir.y, dir.x);
    const L = w * 2.2;
    const STEPS = 26;
    const weaveAmp = t.weave * this.h * 0.05;

    ctx.save();
    ctx.strokeStyle = hue;
    ctx.globalAlpha = (0.5 - converge * 0.32) * alphaGain;
    ctx.lineWidth = 3 + t.spread * 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let s = 0; s <= STEPS; s++) {
      const tt = s / STEPS;
      const base = add(origin, scale(dir, tt * L));
      const off = this.reduced
        ? 0
        : weaveAmp * Math.sin(tt * 6.1 + index * 1.7 + this.time * 0.7) * tt;
      const p = add(base, scale(perp, off));
      if (s === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  /** 收束后的那道白光：从融合点水平射出画面。 */
  private drawWhiteBeam(origin: Vec, c: number) {
    const { ctx, w } = this;
    ctx.save();
    ctx.globalAlpha = c * 0.95;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(196, 174, 132, 0.62)";
    ctx.lineWidth = 12 * c + 5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(w + 40, origin.y);
    ctx.stroke();
    ctx.strokeStyle = `rgba(${INK}, ${0.6 * c})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(w + 40, origin.y);
    ctx.stroke();
    ctx.restore();
  }

  private drawPrism(prism: PrismShape, trapped: boolean, warm: number) {
    const { ctx } = this;
    const [a, b, c] = prismVertices(prism);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.fillStyle = trapped
      ? `rgba(${INK}, ${0.055 + this.press * 0.03})`
      : `rgba(${INK}, ${0.028 + this.press * 0.04})`;
    ctx.fill();
    if (warm > 0.01) {
      // 第二束光困在内部时：棱镜被从里面温温地照亮
      ctx.fillStyle = `rgba(214, 142, 43, ${0.09 * warm})`;
      ctx.fill();
    }
    ctx.strokeStyle = `rgba(${INK}, 0.92)`;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  }

  private drawSource(origin: Vec, alpha: number) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(190, 168, 128, 0.5)";
    ctx.beginPath();
    ctx.arc(Math.max(2, origin.x), origin.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(${INK}, 0.8)`;
    ctx.beginPath();
    ctx.arc(Math.max(2, origin.x), origin.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
