import { INK, PAPER_DEEP, weftAt, YARNS, type Yarn } from './palette';
import {
  herringbone,
  jacquardDraft,
  plain,
  satin,
  textToJacquard,
  twill,
  type Draft,
  type Jacquard,
} from './drafts';

/* ------------------------------------------------------------------ *
 *  织机引擎
 *
 *  一台织机的一个循环有四拍：开口(shed) → 投梭(throw) → 打纬(beat) → 卷取(take-up)。
 *  全站的节奏都对齐这四拍：文字的抖动、章节的落点、声音、触觉。
 *
 *  渲染策略：已织成的布画进离屏环形缓存，每一纬只画新的一行；
 *  屏幕上每帧只重画「织口」这一小段活动区域。
 *  —— 和真实织机一样，也因此在手机上依然满帧。
 * ------------------------------------------------------------------ */

export type Phase = 'warping' | 'plain' | 'shift' | 'twill' | 'jacquard' | 'roll';
export type CyclePhase = 'shed' | 'throw' | 'beat' | 'takeup';

export interface LoomSnapshot {
  phase: Phase;
  structure: string;
  picks: number;
  beats: number;
  tension: number;
  weftName: string;
  reversed: boolean;
  woven: string | null;
  running: boolean;
  parked: boolean;
  shiftStage: string | null;
}

export interface LoomCallbacks {
  onBeat?: (power: number, pick: number) => void;
  onShuttle?: (dir: number) => void;
  onSnapshot?: (s: LoomSnapshot) => void;
  onShiftStage?: (stage: string) => void;
}

interface PickRecord {
  bits: Uint8Array;
  weft: Yarn;
  wobble: number;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const ease = {
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inCubic: (t: number) => t * t * t,
  outBack: (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
  inOutQuint: (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};

/** 帧率无关的指数趋近 */
const approach = (cur: number, target: number, lambda: number, dt: number) =>
  cur + (target - cur) * (1 - Math.exp(-lambda * dt));

/**
 * 阶段边界与章节滚动位置对齐：全站 6 屏，第 i 屏居中时 progress = i/5。
 * 0 起手 · 0.2 经 · 0.4 纬 · 0.6 换综 · 0.8 提花 · 1.0 落布
 */
const PHASES: { at: number; phase: Phase }[] = [
  { at: 0.0, phase: 'warping' },
  { at: 0.1, phase: 'plain' },
  { at: 0.52, phase: 'shift' },  // 换综章节进入视野时开始
  { at: 0.64, phase: 'twill' },
  { at: 0.73, phase: 'jacquard' },
  { at: 0.92, phase: 'roll' },
];

export class Loom {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cloth!: HTMLCanvasElement;
  private cctx!: CanvasRenderingContext2D;
  private cb: LoomCallbacks;

  // ---- 布局 ----
  private dpr = 1;
  private W = 0;
  private H = 0;
  private compact = false;
  private bandX = 0;
  private bandW = 0;
  private shedY = 0;
  private beamY = 0;
  ends = 64;
  private endW = 9;
  private rowH = 7;
  private bufRows = 0;
  private bufH = 0;
  private writeY = 0;
  private endX: Float32Array = new Float32Array(0);
  private endJit: Float32Array = new Float32Array(0);
  private endWid: Float32Array = new Float32Array(0);

  // ---- 状态 ----
  private history: PickRecord[] = [];
  private maxHistory = 720;
  private pick = 0;
  private beats = 0;
  private cycle = 0; // 0..1
  private cyclePhase: CyclePhase = 'shed';
  private rate = 1;
  private rateTarget = 1;
  private tension = 1;
  private tensionTarget = 1;
  private shedOpen = 0;
  private shuttleT = 0;
  private shuttleDir = 1;
  private clothCreep = 0;
  private vibe: Float32Array = new Float32Array(0);
  private warpYarns: Yarn[] = [];
  private warpTargets: Yarn[] = [];
  private reedSwing = 0;
  private nowMs = 0;

  private phase: Phase = 'warping';
  private structureName = 'plain';
  private draft: Draft = plain;
  private draftPrev: Draft = plain;
  private draftMix = 1;
  private weft: Yarn = YARNS.raw;

  private progress = 0;
  private scrollVel = 0;
  private contentRight = 0;
  private hoverEnd = -1;
  private focusEnd = -1;
  private reversed = false;
  private jacq: Jacquard | null = null;
  private jacqStart = -1;
  private wovenText: string | null = null;
  private pendingText: string | null = null;

  // 转折段（换综）的脚本
  private titleDone = false;
  private seedPicks = 0;
  private parked = false;
  private shiftT = -1;
  private shiftStage: string | null = null;
  private rethreadFront = 0;

  private raf = 0;
  private last = 0;
  private running = false;
  private reduced = false;
  private dirty = true;
  private started = false;

  constructor(canvas: HTMLCanvasElement, cb: LoomCallbacks = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('2D context unavailable');
    this.ctx = ctx;
    this.cb = cb;
    this.cloth = document.createElement('canvas');
    const cc = this.cloth.getContext('2d', { alpha: true });
    if (!cc) throw new Error('2D context unavailable');
    this.cctx = cc;
    this.resize();
  }

  /* ================= 布局 ================= */

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const W = Math.max(320, rect.width || window.innerWidth);
    const H = Math.max(320, rect.height || window.innerHeight);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = W;
    this.H = H;
    this.canvas.width = Math.round(W * this.dpr);
    this.canvas.height = Math.round(H * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.compact = W < 900;
    const bandW = this.compact
      ? Math.min(W * 0.78, 460)
      : clamp(W * 0.34, 300, 560);
    this.bandW = bandW;
    this.bandX = this.compact ? (W - bandW) / 2 : W * 0.72 - bandW / 2;
    this.shedY = Math.round(H * (this.compact ? 0.3 : 0.34));
    this.beamY = Math.round(H * 0.03);

    const targetEnd = this.compact ? 8.2 : 8.8;
    let ends = Math.round(bandW / targetEnd);
    ends = clamp(ends - (ends % 2), 32, 96);
    const rebuild = ends !== this.ends || this.endX.length === 0;
    this.ends = ends;
    this.endW = bandW / ends;
    this.rowH = Math.max(3, Math.round(this.endW * 0.86));

    if (rebuild) {
      this.endJit = new Float32Array(ends);
      this.endWid = new Float32Array(ends);
      this.vibe = new Float32Array(ends);
      for (let i = 0; i < ends; i++) {
        this.endJit[i] = (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.5;
        this.endWid[i] = 0.82 + ((Math.sin(i * 78.233) * 12345.678) % 1) * 0.3;
      }
      this.warpYarns = new Array(ends);
      this.warpTargets = new Array(ends);
      for (let i = 0; i < ends; i++) {
        const y = i % 9 === 4 ? YARNS.rawWarm : YARNS.raw;
        this.warpYarns[i] = y;
        this.warpTargets[i] = y;
      }
      this.history.length = 0;
      this.pick = 0;
    }
    this.endX = new Float32Array(ends);
    for (let i = 0; i < ends; i++) this.endX[i] = this.bandX + i * this.endW + this.endJit[i];

    // 环形布缓存
    this.bufRows = Math.ceil((H - this.shedY) / this.rowH) + 4;
    this.bufH = this.bufRows * this.rowH;
    this.cloth.width = Math.round(bandW * this.dpr);
    this.cloth.height = Math.round(this.bufH * this.dpr);
    this.cctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.cctx.clearRect(0, 0, bandW, this.bufH);
    this.writeY = 0;
    if (this.history.length === 0) this.seedCloth();
    this.repaintCloth();
    this.dirty = true;
  }

  /** 你到之前，这台机器已经在织了——开屏就该有一段布，而不是空架子 */
  private seedCloth() {
    const n = this.bufRows + 2;
    for (let i = 0; i < n; i++) this.commitPick(0.92);
    this.seedPicks = this.pick;
  }

  getBand() {
    return { x: this.bandX, y: 0, w: this.bandW, h: this.H, shedY: this.shedY, compact: this.compact };
  }

  /* ================= 外部输入 ================= */

  /** 告诉织机正文栏的右缘在哪儿——图注只会画在真正空着的地方 */
  setContentRight(x: number) {
    this.contentRight = x;
    this.dirty = true;
  }

  setReducedMotion(on: boolean) {
    this.reduced = on;
    this.dirty = true;
  }

  setProgress(p: number, velocity = 0) {
    const np = clamp(p, 0, 1);
    if (Math.abs(np - this.progress) > 1e-4) this.dirty = true;
    this.progress = np;
    this.scrollVel = Math.min(Math.abs(velocity), 3);

    let phase: Phase = 'warping';
    for (const s of PHASES) if (np >= s.at) phase = s.phase;
    if (phase !== this.phase) this.enterPhase(phase);

    if (this.reduced) {
      // 减少动效：滚动本身就是动力——滚多少，织多少
      const want = this.seedPicks + 30 + Math.floor(np * 210);
      let guard = 0;
      while (this.pick < want && guard++ < 40) this.commitPick(0.6);
      if (this.pick > want + 4) {
        this.pick = Math.max(0, want);
      }
    }
  }

  setPointer(x: number | null, y: number | null) {
    if (x === null || y === null) {
      if (this.hoverEnd !== -1) this.dirty = true;
      this.hoverEnd = -1;
      return;
    }
    const rel = (x - this.bandX) / this.endW;
    const e = Math.round(rel - 0.5);
    const next = e >= 0 && e < this.ends ? e : -1;
    if (next !== this.hoverEnd) this.dirty = true;
    this.hoverEnd = next;
  }

  nudgeFocusEnd(delta: number) {
    const base = this.focusEnd < 0 ? Math.floor(this.ends / 2) : this.focusEnd;
    this.focusEnd = clamp(base + delta, 0, this.ends - 1);
    this.hoverEnd = this.focusEnd;
    this.dirty = true;
    return this.focusEnd;
  }
  clearFocusEnd() {
    this.focusEnd = -1;
    this.hoverEnd = -1;
    this.dirty = true;
  }

  /** 拖拽张力：0.35（松）… 1.25（绷） */
  setTension(t: number) {
    this.tensionTarget = clamp(t, 0.35, 1.25);
    this.dirty = true;
  }
  getTension() {
    return this.tension;
  }
  nudgeTension(d: number) {
    this.setTension(this.tensionTarget + d);
    return this.tensionTarget;
  }

  /** 手动投一梭 */
  throwPick() {
    if (this.reduced) {
      this.commitPick(1);
      this.dirty = true;
      return;
    }
    this.cycle = 0.34;
    this.cyclePhase = 'throw';
    this.shuttleT = 0;
    this.rate = Math.min(2.4, this.rate + 0.9);
    this.dirty = true;
  }

  /** 翻到布的背面 */
  setReversed(on: boolean) {
    if (this.reversed === on) return;
    this.reversed = on;
    this.repaintCloth();
    this.dirty = true;
    this.emit();
  }
  isReversed() {
    return this.reversed;
  }

  /** 把一段文字编成纹版，排进织造队列（任何阶段都可以） */
  weaveText(text: string, silent = false) {
    const t = text.trim().slice(0, 10);
    if (!silent) this.pendingText = t || null;
    if (!t) {
      this.jacq = null;
      this.jacqStart = -1;
      this.wovenText = null;
      this.applyStructure();
      this.emit();
      return;
    }
    const j = textToJacquard(t, this.ends, this.rowH / this.endW);
    if (!j) return;
    this.jacq = j;
    this.jacqStart = this.pick + (this.reduced ? 1 : 3);
    if (!silent) this.wovenText = t;
    this.applyStructure();
    this.emit();
  }

  /** 开机第一件事：把自己的名字织出来 */
  weaveTitle(text = '織') {
    const j = textToJacquard(text, this.ends, this.rowH / this.endW, 0.46);
    if (!j) return;
    this.jacq = j;
    this.jacqStart = this.pick + (this.reduced ? 1 : 2);
    this.titleDone = false;
    this.applyStructure();
    this.emit();
  }

  /** 纹版是否正在织 / 已织完 */
  jacquardState() {
    if (!this.jacq || this.jacqStart < 0) return 'none' as const;
    const end = this.jacqStart + this.jacq.rows.length;
    if (this.pick < this.jacqStart) return 'queued' as const;
    if (this.pick < end) return 'weaving' as const;
    return 'done' as const;
  }

  getWovenText() {
    return this.wovenText;
  }

  /* ================= 阶段程序 ================= */

  /** 每个阶段的「地组织」——提花图案会叠在它上面 */
  private groundFor(p: Phase): { name: string; draft: Draft } {
    switch (p) {
      case 'warping':
      case 'plain':
        return { name: 'plain', draft: plain };
      case 'shift':
      case 'twill':
        return { name: 'twill', draft: twill };
      case 'jacquard':
        return { name: 'herringbone', draft: herringbone(this.ends) };
      case 'roll':
        // 落布前换成五枚缎：纬面平滑、有光，收得干净
        return { name: 'satin', draft: satin };
      default:
        return { name: 'plain', draft: plain };
    }
  }

  /** 有纹版在织 → 用提花；否则用地组织 */
  private applyStructure() {
    const g = this.groundFor(this.phase);
    const active =
      this.jacq && this.jacqStart >= 0 && this.pick <= this.jacqStart + this.jacq.rows.length;
    if (active && this.jacq) {
      this.setStructure('jacquard', jacquardDraft(this.jacq, this.jacqStart, g.draft));
    } else {
      this.setStructure(g.name, g.draft);
    }
  }

  private enterPhase(p: Phase) {
    const prev = this.phase;
    this.phase = p;
    switch (p) {
      case 'warping':
        this.rateTarget = 0.55;
        this.tensionTarget = 1.0;
        break;
      case 'plain':
        this.rateTarget = 1;
        this.tensionTarget = 1.0;
        break;
      case 'shift':
        if (prev !== 'shift') {
          if (this.reduced) {
            // 减少动效：换综是一次「状态变化」，不是一段表演
            for (let i = 0; i < this.ends; i++) {
              this.warpTargets[i] = i % 7 === 3 ? YARNS.indigo : i % 5 === 0 ? YARNS.rawWarm : YARNS.raw;
              this.warpYarns[i] = this.warpTargets[i];
            }
            this.tensionTarget = 1.05;
          } else this.beginShift();
        }
        break;
      case 'twill':
        this.rateTarget = 1.15;
        this.tensionTarget = 1.05;
        break;
      case 'jacquard':
        this.rateTarget = 1.0;
        this.tensionTarget = 1.0;
        break;
      case 'roll':
        this.rateTarget = 1.9;
        this.tensionTarget = 0.9;
        break;
    }
    if (this.shiftT < 0) this.applyStructure();
    this.emit();
  }

  private setStructure(name: string, d: Draft) {
    if (this.structureName === name && this.draft === d) return;
    this.draftPrev = this.draft;
    this.draft = d;
    this.draftMix = 0;
    this.structureName = name;
  }

  /** 转折：松线 → 重穿综 → 回张力 —— 全站唯一一次机械重构 */
  private beginShift() {
    this.shiftT = 0;
    this.shiftStage = 'slack';
    this.rethreadFront = 0;
    this.cb.onShiftStage?.('slack');
    this.emit();
  }

  private updateShift(dt: number) {
    if (this.shiftT < 0) return;
    this.shiftT += dt;
    const t = this.shiftT;
    if (t < 0.9) {
      if (this.shiftStage !== 'slack') {
        this.shiftStage = 'slack';
        this.cb.onShiftStage?.('slack');
      }
      this.tensionTarget = 0.38;
      this.rateTarget = 0.05;
    } else if (t < 2.5) {
      if (this.shiftStage !== 'rethread') {
        this.shiftStage = 'rethread';
        this.cb.onShiftStage?.('rethread');
        this.applyStructure();
      }
      // 逐根重新穿综：一次扫过所有经线，把靛蓝染进来
      const f = (t - 0.9) / 1.6;
      const front = f * this.ends;
      while (this.rethreadFront < front && this.rethreadFront < this.ends) {
        const i = this.rethreadFront | 0;
        this.warpTargets[i] = i % 7 === 3 ? YARNS.indigo : i % 5 === 0 ? YARNS.rawWarm : YARNS.raw;
        this.vibe[i] = 1;
        this.rethreadFront++;
      }
      this.tensionTarget = 0.42;
      this.rateTarget = 0.05;
    } else if (t < 3.15) {
      if (this.shiftStage !== 'retension') {
        this.shiftStage = 'retension';
        this.cb.onShiftStage?.('retension');
        for (let i = 0; i < this.ends; i++) this.vibe[i] = 1.6;
        this.cb.onBeat?.(1.6, this.pick);
        this.beats++;
      }
      this.tensionTarget = 1.18;
      this.rateTarget = 0.4;
    } else {
      this.shiftT = -1;
      this.shiftStage = null;
      this.cb.onShiftStage?.('done');
      this.tensionTarget = 1.05;
      this.rateTarget = 1.15;
      this.emit();
    }
  }

  /* ================= 循环 ================= */

  start() {
    if (this.running) return;
    this.running = true;
    this.started = true;
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.nowMs = now;
      this.step(dt);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.stop();
  }

  private step(dt: number) {
    if (this.reduced) {
      // 静态模式：只在状态变化时重绘，不做连续运动
      this.tension = this.tensionTarget;
      this.shedOpen = 0.35;
      if (this.dirty) {
        this.render();
        this.dirty = false;
      }
      return;
    }

    this.updateShift(dt);

    // 开机第一件事是把自己的名字织出来：机器先冲一段高速，再落回常速
    const js = this.jacquardState();
    const opening = !this.titleDone && (js === 'queued' || js === 'weaving');
    if (!this.titleDone && js === 'done') this.titleDone = true;
    // 布的长度要跟得上叙事：滚得快，机器就追着织（视觉因果，而不是瞬间跳变）
    const wanted = this.seedPicks + 14 + this.progress * 210;
    const behind = Math.max(0, wanted - this.pick);
    const catchUp = 1 + Math.min(3.4, behind * 0.16);
    // 滚动越快，织机越快
    const target = (opening ? 3.0 : this.rateTarget * catchUp) * (1 + this.scrollVel * 0.45);
    this.rate = approach(this.rate, target, 3.2, dt);
    this.scrollVel = approach(this.scrollVel, 0, 2.4, dt);
    this.tension = approach(this.tension, this.tensionTarget, 7, dt);

    // 线的余振
    for (let i = 0; i < this.ends; i++) {
      if (this.vibe[i] > 0.0005) this.vibe[i] *= Math.exp(-4.2 * dt);
      else this.vibe[i] = 0;
    }
    this.draftMix = Math.min(1, this.draftMix + dt * 1.6);
    this.reedSwing = approach(this.reedSwing, 0, 9, dt);

    // 经纱颜色渐变到目标（换综时逐根变色）
    for (let i = 0; i < this.ends; i++) {
      if (this.warpYarns[i] !== this.warpTargets[i] && Math.random() < dt * 26) {
        this.warpYarns[i] = this.warpTargets[i];
      }
    }

    // ---- 落布：滚到底，机器真的停下来（收束，而不是继续空转）----
    const parking = this.progress > 0.965;
    if (!parking && this.parked) {
      this.parked = false;
      this.emit();
    }
    if (this.parked) {
      // 停机不是「不画了」：开口闭合、筘退回、经线松掉、余振散尽
      this.tensionTarget = 0.62;
      this.tension = approach(this.tension, this.tensionTarget, 3.2, dt);
      this.shedOpen = approach(this.shedOpen, 0, 4, dt);
      this.reedSwing = approach(this.reedSwing, 0, 6, dt);
      for (let i = 0; i < this.ends; i++) {
        this.vibe[i] = this.vibe[i] > 0.0005 ? this.vibe[i] * Math.exp(-3 * dt) : 0;
      }
      this.shuttleT = 0;
      this.clothCreep = 0;
      this.render();
      return;
    }

    // 四拍循环
    const cycleDur = 0.44 / Math.max(0.05, this.rate);
    this.cycle += dt / cycleDur;
    while (this.cycle >= 1) {
      this.cycle -= 1;
    }
    const c = this.cycle;
    let nextPhase: CyclePhase = 'shed';
    if (c < 0.26) nextPhase = 'shed';
    else if (c < 0.62) nextPhase = 'throw';
    else if (c < 0.78) nextPhase = 'beat';
    else nextPhase = 'takeup';

    if (nextPhase !== this.cyclePhase) {
      if (nextPhase === 'throw') {
        this.shuttleT = 0;
        this.cb.onShuttle?.(this.shuttleDir);
      }
      if (nextPhase === 'beat') {
        const power = clamp(0.55 + this.tension * 0.45 + this.rate * 0.12, 0.3, 1.6);
        this.commitPick(power);
        this.reedSwing = 1;
        for (let i = 0; i < this.ends; i++) this.vibe[i] = Math.max(this.vibe[i], 0.35 + Math.random() * 0.25);
        this.cb.onBeat?.(power, this.pick);
        this.beats++;
        this.shuttleDir *= -1;
      }
      if (nextPhase === 'takeup' && parking) {
        this.parked = true;
        this.cycle = 0;
        this.emit();
      }
      this.cyclePhase = nextPhase;
    }

    // 开口：shed 阶段张开，beat 前闭合
    const openT =
      c < 0.26 ? smooth(c / 0.26) : c < 0.62 ? 1 : c < 0.78 ? 1 - smooth((c - 0.62) / 0.16) : 0;
    this.shedOpen = openT * clamp(this.tension, 0.4, 1.2);
    if (this.cyclePhase === 'throw') this.shuttleT = clamp((c - 0.26) / 0.36, 0, 1);
    else if (this.cyclePhase === 'shed') this.shuttleT = 0;
    else this.shuttleT = 1;

    // 卷取：布在 takeup 拍匀速下移一行
    this.clothCreep = this.cyclePhase === 'takeup' ? smooth(clamp((c - 0.78) / 0.22, 0, 1)) : this.cyclePhase === 'shed' ? 1 : 0;

    this.render();
  }

  /* ================= 织造 ================= */

  private draftAt(p: number, e: number) {
    if (this.draftMix >= 1) return this.draft(p, e);
    // 组织切换时做一次「逐根过渡」，而不是整块瞬变
    const t = this.draftMix;
    const k = ((e * 7 + p * 3) % this.ends) / this.ends;
    return k < t ? this.draft(p, e) : this.draftPrev(p, e);
  }

  private commitPick(power: number) {
    const bits = new Uint8Array(this.ends);
    for (let e = 0; e < this.ends; e++) bits[e] = this.draftAt(this.pick, e) ? 1 : 0;
    const weft = this.weftFor(this.pick);
    const rec: PickRecord = { bits, weft, wobble: (Math.random() - 0.5) * 0.6 };
    this.history.push(rec);
    if (this.history.length > this.maxHistory) this.history.shift();
    this.pick++;
    this.weft = weft;

    // 纹版织完 → 回到地组织并通知
    if (this.jacq && this.jacqStart >= 0 && this.pick === this.jacqStart + this.jacq.rows.length) {
      this.applyStructure();
      this.emit();
    }

    // 写入环形缓存的新一行
    this.writeY = (this.writeY - this.rowH + this.bufH) % this.bufH;
    this.drawRow(this.cctx, rec, this.writeY, this.rowH, this.bandW, this.ends, this.endW, power);
    this.dirty = true;
  }

  private weftFor(p: number): Yarn {
    if (this.jacq && this.jacqStart >= 0) {
      const r = p - this.jacqStart;
      if (r >= 0 && r < this.jacq.rows.length) return YARNS.ink;
    }
    return weftAt(this.progress);
  }

  /** 画一纬：先铺纬线，再把提起的经线压在上面——交叠感来自这两层的先后 */
  private drawRow(
    g: CanvasRenderingContext2D,
    rec: PickRecord,
    y: number,
    rowH: number,
    bandW: number,
    ends: number,
    endW: number,
    power = 1,
  ) {
    const rev = this.reversed;
    g.save();
    g.translate(0, y);
    g.clearRect(0, 0, bandW, rowH);

    // 纬线底层
    const wf = rec.weft;
    g.fillStyle = rev ? wf.shade : wf.core;
    g.fillRect(0, 0, bandW, rowH);
    g.fillStyle = rev ? wf.core : wf.lit;
    g.globalAlpha = 0.5;
    g.fillRect(0, 0, bandW, Math.max(1, rowH * 0.28));
    g.fillStyle = wf.shade;
    g.globalAlpha = 0.42;
    g.fillRect(0, rowH - Math.max(1, rowH * 0.24), bandW, Math.max(1, rowH * 0.24));
    g.globalAlpha = 1;

    // 经线浮点
    for (let e = 0; e < ends; e++) {
      const lifted = rec.bits[e] === 1;
      if (rev ? lifted : !lifted) continue;
      const yarn = this.warpYarns[e] || YARNS.raw;
      const w = endW * this.endWid[e];
      const x = e * endW + (endW - w) / 2 + rec.wobble * 0.35;
      g.fillStyle = rev ? yarn.shade : yarn.core;
      g.fillRect(x, -0.35, w, rowH + 0.7);
      g.fillStyle = yarn.lit;
      g.globalAlpha = rev ? 0.18 : 0.55;
      g.fillRect(x, -0.35, Math.max(0.6, w * 0.3), rowH + 0.7);
      g.fillStyle = yarn.shade;
      g.globalAlpha = 0.4;
      g.fillRect(x + w - Math.max(0.6, w * 0.26), -0.35, Math.max(0.6, w * 0.26), rowH + 0.7);
      g.globalAlpha = 1;
    }

    // 打纬力度 → 这一纬的明暗（力大布紧色深）
    if (power !== 1) {
      g.globalAlpha = clamp(Math.abs(power - 1) * 0.18, 0, 0.16);
      g.fillStyle = power > 1 ? '#000' : '#fff';
      g.fillRect(0, 0, bandW, rowH);
      g.globalAlpha = 1;
    }
    g.restore();
  }

  /** 翻面 / 尺寸变化时重画整块缓存 */
  private repaintCloth() {
    if (!this.cctx) return;
    this.cctx.clearRect(0, 0, this.bandW, this.bufH);
    const n = Math.min(this.history.length, this.bufRows);
    let y = this.writeY;
    for (let k = 0; k < n; k++) {
      const rec = this.history[this.history.length - 1 - k];
      if (!rec || rec.bits.length !== this.ends) continue;
      this.drawRow(this.cctx, rec, y, this.rowH, this.bandW, this.ends, this.endW);
      y = (y + this.rowH) % this.bufH;
    }
  }

  /* ================= 渲染 ================= */

  private render() {
    const g = this.ctx;
    const { W, H, bandX, bandW, shedY } = this;
    g.clearRect(0, 0, W, H);

    const creepPx = this.clothCreep * this.rowH;

    // ---- 已织成的布（环形缓存两段拼接）----
    // 只画「真的已经织出来」的那一段：没织的地方就是纸，不是灰底
    const rollBeamY = this.phase === 'roll' ? H - 84 : H + 40;
    const wovenRows = Math.min(this.history.length, this.bufRows);
    const wovenH = wovenRows * this.rowH;
    const visH = Math.min(H - shedY + this.rowH, wovenH);
    const clothBottom = Math.min(shedY + visH + creepPx, rollBeamY);

    if (wovenRows > 1) {
      const dpr = this.dpr;
      const top = this.writeY;
      const firstH = Math.min(visH, this.bufH - top);
      g.save();
      g.beginPath();
      g.rect(bandX, shedY, bandW, Math.max(0, clothBottom - shedY));
      g.clip();
      g.drawImage(
        this.cloth,
        0,
        Math.round(top * dpr),
        Math.round(bandW * dpr),
        Math.round(firstH * dpr),
        bandX,
        shedY + creepPx,
        bandW,
        firstH,
      );
      if (firstH < visH) {
        g.drawImage(
          this.cloth,
          0,
          0,
          Math.round(bandW * dpr),
          Math.round((visH - firstH) * dpr),
          bandX,
          shedY + firstH + creepPx,
          bandW,
          visH - firstH,
        );
      }

      // 布面两侧的柔光：让它看起来是垂下来的一块布，而不是贴图
      const sh = g.createLinearGradient(bandX, 0, bandX + bandW, 0);
      sh.addColorStop(0, 'rgba(60,45,30,0.24)');
      sh.addColorStop(0.1, 'rgba(60,45,30,0)');
      sh.addColorStop(0.88, 'rgba(60,45,30,0)');
      sh.addColorStop(1, 'rgba(60,45,30,0.28)');
      g.fillStyle = sh;
      g.fillRect(bandX, shedY, bandW, Math.max(0, clothBottom - shedY));

      // 布落到屏幕外时才淡出，避免出现一条硬边
      if (clothBottom >= H - 2) {
        const fade = g.createLinearGradient(0, H - H * 0.18, 0, H);
        fade.addColorStop(0, 'rgba(239,230,216,0)');
        fade.addColorStop(1, 'rgba(239,230,216,0.9)');
        g.fillStyle = fade;
        g.fillRect(bandX, H - H * 0.18, bandW, H * 0.18);
      }
      g.restore();

      // 布的下缘（起织的那一头）：一条自然的毛边阴影
      if (clothBottom < H - 4) {
        g.fillStyle = 'rgba(60,45,30,0.16)';
        g.fillRect(bandX, clothBottom - 1, bandW, 2);
        const t = g.createLinearGradient(0, clothBottom, 0, clothBottom + 14);
        t.addColorStop(0, 'rgba(60,45,30,0.14)');
        t.addColorStop(1, 'rgba(60,45,30,0)');
        g.fillStyle = t;
        g.fillRect(bandX, clothBottom, bandW, 14);
      }
    }

    // ---- 落布：卷布辊 ----
    if (this.phase === 'roll') this.drawClothBeam(g, rollBeamY);

    // ---- 高亮一根经线：它贯穿整块布 ----
    if (this.hoverEnd >= 0) this.drawThreadTrace(g, this.hoverEnd, creepPx);

    // ---- 织口以上：绷着的经线 ----
    this.drawWarp(g);

    // ---- 筘（打纬用的梳子）----
    this.drawReed(g);

    // ---- 梭子 ----
    if (!this.reduced) this.drawShuttle(g);

    // ---- 首屏：织机各部位的图注（滚动后自然退场）----
    this.drawAnatomy(g);

    // ---- 布边 ----
    g.strokeStyle = 'rgba(34,30,27,0.16)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(bandX + 0.5, shedY);
    g.lineTo(bandX + 0.5, H);
    g.moveTo(bandX + bandW - 0.5, shedY);
    g.lineTo(bandX + bandW - 0.5, H);
    g.stroke();
  }

  private warpPath(e: number, t: number) {
    // t: 0 = 后梁, 1 = 织口
    const x = this.endX[e];
    const conv = (x - (this.bandX + this.bandW / 2)) * 0.06;
    const xTop = x + conv;
    const sag = (1 - clamp(this.tension, 0.3, 1.25)) * 42;
    const vib = this.vibe[e] * 5.5 * Math.sin(e * 2.3 + this.nowMs * 0.03);
    const px = lerp(xTop, x, ease.outCubic(t)) + vib * Math.sin(Math.PI * t);
    const py = lerp(this.beamY, this.shedY, t) + Math.sin(Math.PI * t) * sag;
    return { px, py };
  }

  private drawWarp(g: CanvasRenderingContext2D) {
    const { shedY } = this;
    const nextPick = this.pick;
    const open = this.shedOpen;
    g.lineCap = 'round';
    for (let e = 0; e < this.ends; e++) {
      const lifted = this.draftAt(nextPick, e);
      const yarn = this.warpYarns[e] || YARNS.raw;
      const w = Math.max(0.9, this.endW * this.endWid[e] * 0.72);
      const lift = (lifted ? -1 : 1) * open * (this.compact ? 16 : 22);

      const a = this.warpPath(e, 0);
      const b = this.warpPath(e, 0.55);
      const c = this.warpPath(e, 1);

      g.beginPath();
      g.moveTo(a.px, a.py);
      g.quadraticCurveTo(b.px, b.py + lift * 0.35, c.px, c.py + lift);
      g.lineTo(c.px, shedY);
      g.strokeStyle = yarn.core;
      g.lineWidth = w;
      g.stroke();

      g.beginPath();
      g.moveTo(a.px - w * 0.22, a.py);
      g.quadraticCurveTo(b.px - w * 0.22, b.py + lift * 0.35, c.px - w * 0.22, c.py + lift);
      g.strokeStyle = yarn.lit;
      g.globalAlpha = 0.5;
      g.lineWidth = Math.max(0.5, w * 0.34);
      g.stroke();
      g.globalAlpha = 1;
    }

    // 后梁
    g.fillStyle = 'rgba(43,39,36,0.9)';
    g.fillRect(this.bandX - 18, this.beamY - 7, this.bandW + 36, 7);
    g.fillStyle = 'rgba(255,250,240,0.22)';
    g.fillRect(this.bandX - 18, this.beamY - 7, this.bandW + 36, 2);
  }

  /** 筘：打纬用的梳子。它是这台机器里唯一会「撞」的部件 */
  private drawReed(g: CanvasRenderingContext2D) {
    const swing = ease.outCubic(this.reedSwing);
    const h = this.compact ? 22 : 30;
    const y = this.shedY - h - 12 - (1 - swing) * (this.compact ? 40 : 62);
    const x0 = this.bandX - 16;
    const w = this.bandW + 32;
    g.save();
    // 框
    g.fillStyle = '#3a2f26';
    g.fillRect(x0, y - 6, w, 6);
    g.fillRect(x0, y + h, w, 6);
    g.fillStyle = 'rgba(255,246,232,0.28)';
    g.fillRect(x0, y - 6, w, 1.5);
    g.fillRect(x0, y + h, w, 1.5);
    // 筘齿
    g.globalAlpha = 0.5 + swing * 0.4;
    g.strokeStyle = 'rgba(58,47,38,0.9)';
    g.lineWidth = 1;
    const step = Math.max(3.2, this.endW * 2);
    g.beginPath();
    for (let x = this.bandX; x <= this.bandX + this.bandW; x += step) {
      g.moveTo(x + 0.5, y);
      g.lineTo(x + 0.5, y + h);
    }
    g.stroke();
    g.restore();
  }

  /**
   * 首屏图注：像技术图纸一样标出织机各部位。
   * 只在最开始出现，滚动 9% 后完全退场——它是说明，不是装饰。
   */
  private drawAnatomy(g: CanvasRenderingContext2D) {
    const a = 1 - smooth(clamp(this.progress / 0.075, 0, 1));
    if (a <= 0.01) return;
    const left = this.bandX;
    const labelW = 92;
    const gap = left - this.contentRight;
    const roomy = gap > labelW + 34;
    const labelX = left - 12 - labelW;
    const items: { y: number; cn: string; en: string; key: boolean }[] = [
      { y: this.beamY + 2, cn: '后梁', en: 'BACK BEAM', key: false },
      { y: (this.beamY + this.shedY) / 2, cn: '经线 · 你', en: 'WARP', key: false },
      { y: this.shedY, cn: '织口', en: 'FELL', key: true },
      { y: this.shedY + Math.min(160, (this.H - this.shedY) * 0.34), cn: '布 · 我们', en: 'CLOTH', key: false },
    ];
    g.save();
    g.globalAlpha = a;
    g.textBaseline = 'middle';

    // 放不下就只留「织口」这一条关键标记——宁可少说，不要压字
    for (const it of items) {
      if (!roomy && !it.key) continue;
      g.strokeStyle = it.key ? 'rgba(168,69,58,0.5)' : 'rgba(34,30,27,0.26)';
      g.lineWidth = 1;
      g.setLineDash(it.key ? [] : [2, 3]);
      g.beginPath();
      g.moveTo(roomy ? labelX : left - 22, it.y + 0.5);
      g.lineTo(left - 6, it.y + 0.5);
      g.stroke();
      g.setLineDash([]);
      g.fillStyle = it.key ? '#a8453a' : 'rgba(34,30,27,0.42)';
      g.beginPath();
      g.arc(left - 4, it.y + 0.5, it.key ? 2.6 : 1.8, 0, Math.PI * 2);
      g.fill();
      if (!roomy) continue;
      g.textAlign = 'left';
      g.fillStyle = it.key ? '#a8453a' : 'rgba(34,30,27,0.6)';
      g.font = '600 11px "Songti SC","Noto Serif CJK SC",serif';
      g.fillText(it.cn, labelX, it.y - 7);
      g.fillStyle = 'rgba(34,30,27,0.34)';
      g.font = '500 8.5px "SFMono-Regular",ui-monospace,monospace';
      g.fillText(it.en.split('').join(' '), labelX, it.y + 6);
    }
    g.restore();
  }

  /** 卷布辊：布走到这里就下机了 */
  private drawClothBeam(g: CanvasRenderingContext2D, y: number) {
    const x0 = this.bandX - 22;
    const w = this.bandW + 44;
    const r = 30;
    g.save();
    const grad = g.createLinearGradient(0, y - r / 2, 0, y + r / 2);
    grad.addColorStop(0, '#6a5442');
    grad.addColorStop(0.32, '#4a3a2c');
    grad.addColorStop(1, '#2a2018');
    g.fillStyle = grad;
    g.beginPath();
    g.roundRect?.(x0, y - r / 2, w, r, r / 2);
    if (!g.roundRect) g.rect(x0, y - r / 2, w, r);
    g.fill();
    // 卷上去的布沿着辊面转过去
    g.fillStyle = 'rgba(255,246,232,0.16)';
    g.fillRect(x0, y - r / 2 + 3, w, 2);
    g.strokeStyle = 'rgba(20,16,12,0.5)';
    g.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const yy = y - r / 2 + 6 + i * 4.6;
      g.globalAlpha = 0.5 - i * 0.08;
      g.beginPath();
      g.moveTo(x0 + 6, yy);
      g.lineTo(x0 + w - 6, yy);
      g.stroke();
    }
    g.globalAlpha = 1;
    g.restore();
  }

  private drawShuttle(g: CanvasRenderingContext2D) {
    const t = this.shuttleT;
    if (t <= 0 || t >= 1) return;
    const eased = ease.inOutQuint(t);
    const dir = this.shuttleDir;
    const x = dir > 0 ? lerp(this.bandX - 26, this.bandX + this.bandW + 26, eased) : lerp(this.bandX + this.bandW + 26, this.bandX - 26, eased);
    const y = this.shedY - this.shedOpen * (this.compact ? 5 : 7) - 4;
    const len = this.compact ? 30 : 40;
    const hgt = this.compact ? 7 : 9;

    // 梭子拖出的纬线
    g.strokeStyle = this.weft.core;
    g.lineWidth = Math.max(1.1, this.endW * 0.5);
    g.beginPath();
    if (dir > 0) {
      g.moveTo(this.bandX, y + 2);
      g.lineTo(x - len * 0.5, y + 2);
    } else {
      g.moveTo(this.bandX + this.bandW, y + 2);
      g.lineTo(x + len * 0.5, y + 2);
    }
    g.stroke();

    g.save();
    g.translate(x, y);
    g.scale(dir, 1);
    g.beginPath();
    g.moveTo(-len / 2, 0);
    g.quadraticCurveTo(-len * 0.18, -hgt, len / 2, 0);
    g.quadraticCurveTo(-len * 0.18, hgt, -len / 2, 0);
    g.closePath();
    g.fillStyle = '#4a3a2c';
    g.fill();
    g.strokeStyle = 'rgba(255,246,232,0.5)';
    g.lineWidth = 1;
    g.stroke();
    g.beginPath();
    g.arc(len * 0.06, 0, hgt * 0.34, 0, Math.PI * 2);
    g.fillStyle = this.weft.core;
    g.fill();
    g.restore();
  }

  /** 悬停/聚焦的那根经线，在整块布上被点亮 —— 一根线贯穿所有 */
  private drawThreadTrace(g: CanvasRenderingContext2D, e: number, creepPx: number) {
    const x = this.endX[e];
    const w = Math.max(1.4, this.endW * this.endWid[e]);
    const rows = Math.min(this.history.length, this.bufRows);
    g.save();
    g.beginPath();
    g.rect(this.bandX, this.shedY, this.bandW, this.H - this.shedY);
    g.clip();
    g.fillStyle = 'rgba(255,252,244,0.9)';
    g.shadowColor = 'rgba(255,240,200,0.9)';
    g.shadowBlur = 6;
    for (let k = 0; k < rows; k++) {
      const rec = this.history[this.history.length - 1 - k];
      if (!rec || rec.bits.length !== this.ends) continue;
      if (rec.bits[e] !== 1) continue;
      const y = this.shedY + k * this.rowH + creepPx;
      if (y > this.H) break;
      g.fillRect(x, y, w, this.rowH);
    }
    g.restore();

    // 织口以上的那一段也点亮
    const a = this.warpPath(e, 0);
    const c = this.warpPath(e, 1);
    g.save();
    g.strokeStyle = 'rgba(255,248,230,0.85)';
    g.lineWidth = w * 0.9;
    g.shadowColor = 'rgba(255,230,170,0.8)';
    g.shadowBlur = 8;
    g.beginPath();
    g.moveTo(a.px, a.py);
    g.lineTo(c.px, c.py);
    g.stroke();
    g.restore();
  }

  /* ================= 导出 ================= */

  /** 把这块布导出成 PNG —— 每位访客带走的都不一样 */
  exportPNG(scale = 2): string | null {
    const rows = Math.min(this.history.length, 260);
    if (!rows) return null;
    const W = this.ends * 9;
    const RH = 8;
    const H = rows * RH;
    const c = document.createElement('canvas');
    c.width = Math.round(W * scale);
    c.height = Math.round((H + 96) * scale);
    const g = c.getContext('2d');
    if (!g) return null;
    g.scale(scale, scale);
    g.fillStyle = PAPER_DEEP;
    g.fillRect(0, 0, W, H + 96);
    const saveEndW = this.endW;
    this.endW = 9;
    for (let k = 0; k < rows; k++) {
      const rec = this.history[this.history.length - 1 - k];
      if (!rec || rec.bits.length !== this.ends) continue;
      this.drawRow(g, rec, 48 + k * RH, RH, W, this.ends, 9);
    }
    this.endW = saveEndW;
    g.fillStyle = INK;
    g.font = '600 13px "Songti SC",serif';
    g.textAlign = 'center';
    g.fillText('織 · TEXERE', W / 2, 28);
    g.font = '400 11px ui-monospace,monospace';
    g.fillStyle = 'rgba(34,30,27,0.62)';
    g.fillText(
      `${this.wovenText ? '「' + this.wovenText + '」· ' : ''}${rows} picks · ${this.ends} ends`,
      W / 2,
      H + 76,
    );
    return c.toDataURL('image/png');
  }

  /* ================= 快照 ================= */

  snapshot(): LoomSnapshot {
    return {
      phase: this.phase,
      structure: this.structureName,
      picks: this.pick,
      beats: this.beats,
      tension: this.tension,
      weftName: this.weft.name,
      reversed: this.reversed,
      woven: this.wovenText,
      running: this.running && this.started,
      parked: this.parked,
      shiftStage: this.shiftStage,
    };
  }

  private emit() {
    this.cb.onSnapshot?.(this.snapshot());
  }

  pendingWeaveText() {
    return this.pendingText;
  }
}
