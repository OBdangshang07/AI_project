import {
  classifyStroke,
  cubic,
  dist,
  ellipsePoint,
  replyPath,
  springStep,
  type Pt,
  type ReplyKind,
} from "./geometry";

export type Owner = "user" | "pine" | "guide";

export type InkStroke = {
  id: string;
  points: Pt[];
  color: string;
  width: number;
  born: number;
  dry: number;
  owner: Owner;
};

export type CircleMark = {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  progress: number;
  color: string;
};

export type Thread = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  taut: number;
  packet: number;
  born: number;
};

export type HandMode = "follow" | "write" | "idle" | "enter";

const PINE = "#3f5c51";
const CINNABAR = "#c45c4a";
const GRAPHITE = "#1a1714";

let nid = 1;
function uid(prefix: string) {
  nid += 1;
  return `${prefix}-${nid}`;
}

export class InkField {
  strokes: InkStroke[] = [];
  circles: CircleMark[] = [];
  threads: Thread[] = [];
  hand = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, mode: "enter" as HandMode };
  trail: { x: number; y: number }[] = [];
  pointer: { x: number; y: number } | null = null;
  width = 1;
  height = 1;
  reduced = false;
  visible = true;
  private writePath: Pt[] | null = null;
  private writeStroke: InkStroke | null = null;
  private writeIndex = 0;
  private liveStroke: InkStroke | null = null;
  private target = { x: 0, y: 0 };
  private time = 0;
  private entered = false;
  lastReplyKind: ReplyKind | null = null;
  onReply: ((kind: ReplyKind) => void) | null = null;

  resize(w: number, h: number) {
    this.width = w;
    this.height = h;
    if (!this.entered) {
      this.hand.x = w + 40;
      this.hand.y = h * 0.28;
      this.target.x = w * 0.62;
      this.target.y = h * 0.34;
    }
  }

  setPointer(x: number, y: number | null) {
    if (y === null) {
      this.pointer = null;
      return;
    }
    this.pointer = { x, y };
  }

  beginUserStroke(x: number, y: number, t: number) {
    if (this.liveStroke) this.endUserStroke();
    const stroke: InkStroke = {
      id: uid("u"),
      points: [{ x, y, t, p: 0.7 }],
      color: CINNABAR,
      width: 1.55,
      born: t,
      dry: 0,
      owner: "user",
    };
    this.strokes.push(stroke);
    this.liveStroke = stroke;
  }

  addUserPoint(x: number, y: number, t: number) {
    const s = this.liveStroke;
    if (!s) return;
    const last = s.points[s.points.length - 1];
    if (last && dist(last.x, last.y, x, y) < 1.2) return;
    const speed = last ? dist(last.x, last.y, x, y) : 4;
    s.points.push({ x, y, t, p: Math.max(0.25, 1.1 - speed / 22) });
  }

  endUserStroke() {
    const s = this.liveStroke;
    this.liveStroke = null;
    if (!s || s.points.length < 2) {
      if (s) this.strokes = this.strokes.filter((k) => k.id !== s.id);
      return null;
    }
    const kind = classifyStroke(s.points);
    this.lastReplyKind = kind;
    const path = replyPath(kind, s.points);
    this.queueWrite(path);
    this.onReply?.(kind);
    return kind;
  }

  queueWrite(path: Pt[]) {
    if (path.length === 0) return;
    this.writePath = path;
    this.writeIndex = 0;
    this.hand.mode = "write";
    const stroke: InkStroke = {
      id: uid("p"),
      points: [path[0]],
      color: PINE,
      width: 2.35,
      born: this.time,
      dry: 0,
      owner: "pine",
    };
    this.strokes.push(stroke);
    this.writeStroke = stroke;
    this.target.x = path[0].x;
    this.target.y = path[0].y;
  }

  addCircle(id: string, cx: number, cy: number, rx: number, ry: number) {
    const existing = this.circles.find((c) => c.id === id);
    if (existing) {
      existing.cx = cx;
      existing.cy = cy;
      existing.rx = rx;
      existing.ry = ry;
      return;
    }
    this.circles.push({
      id,
      cx,
      cy,
      rx,
      ry,
      progress: this.reduced ? 1 : 0,
      color: PINE,
    });
    if (!this.reduced) {
      const path: Pt[] = [];
      for (let i = 0; i <= 28; i++) {
        const p = ellipsePoint(cx, cy, rx, ry, i / 28);
        path.push({ x: p.x, y: p.y, t: i, p: 0.6 });
      }
      this.queueWrite(path);
    }
  }

  upsertThread(
    id: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    created: number,
  ) {
    const existing = this.threads.find((th) => th.id === id);
    const age = Math.max(0, this.time - created);
    const taut = this.reduced ? 1 : Math.min(1, age / 900);
    const packet = this.reduced ? 1 : Math.min(1, age / 700);
    if (existing) {
      existing.x1 = x1;
      existing.y1 = y1;
      existing.x2 = x2;
      existing.y2 = y2;
      existing.taut = taut;
      existing.packet = packet;
      return;
    }
    this.threads.push({
      id,
      x1,
      y1,
      x2,
      y2,
      taut,
      packet,
      born: created,
    });
  }

  removeOrphans(ids: Set<string>) {
    this.threads = this.threads.filter((t) => ids.has(t.id));
    this.circles = this.circles.filter((c) => ids.has(c.id));
  }

  enterTo(x: number, y: number) {
    this.target.x = x;
    this.target.y = y;
    this.hand.mode = "enter";
  }

  markEntered() {
    this.entered = true;
    if (this.hand.mode === "enter") this.hand.mode = "follow";
  }

  tick(dt: number, now: number) {
    this.time = now;
    if (!this.visible) return;

    for (const s of this.strokes) {
      s.dry = Math.min(1, s.dry + dt / 2.6);
    }
    for (const c of this.circles) {
      c.progress = Math.min(1, c.progress + dt / 0.7);
    }

    if (this.writePath && this.writeStroke) {
      const speed = this.reduced ? 400 : 210;
      let budget = speed * dt;
      while (budget > 0 && this.writeIndex < this.writePath.length - 1) {
        const a = this.writePath[this.writeIndex];
        const b = this.writePath[this.writeIndex + 1];
        const d = dist(a.x, a.y, b.x, b.y);
        if (d <= budget) {
          this.writeStroke.points.push(b);
          this.hand.x = b.x;
          this.hand.y = b.y;
          this.writeIndex += 1;
          budget -= d;
        } else {
          const t = budget / d;
          const x = a.x + (b.x - a.x) * t;
          const y = a.y + (b.y - a.y) * t;
          this.writeStroke.points.push({ x, y, t: now, p: 0.65 });
          this.hand.x = x;
          this.hand.y = y;
          this.writePath[this.writeIndex] = { ...a, x, y };
          budget = 0;
        }
      }
      this.target.x = this.hand.x;
      this.target.y = this.hand.y;
      if (this.writeIndex >= this.writePath.length - 1) {
        this.writePath = null;
        this.writeStroke = null;
        this.hand.mode = this.entered ? "follow" : "enter";
      }
    } else {
      if (this.pointer && this.entered && this.hand.mode !== "write") {
        const towardMargin = this.pointer.x + Math.min(80, this.width * 0.06);
        this.target.x = Math.min(this.width - 24, towardMargin);
        this.target.y = this.pointer.y + 10;
        this.hand.mode = "follow";
      } else if (!this.pointer && this.entered) {
        this.hand.mode = "idle";
      }

      const stiff = this.hand.mode === "enter" ? 46 : 140;
      const damp = this.hand.mode === "enter" ? 12 : 18;
      const sx = springStep(
        this.hand.x,
        this.target.x,
        this.hand.vx,
        dt,
        stiff,
        damp,
      );
      const sy = springStep(
        this.hand.y,
        this.target.y,
        this.hand.vy,
        dt,
        stiff,
        damp,
      );
      this.hand.vx = sx.velocity;
      this.hand.vy = sy.velocity;
      this.hand.x = sx.current;
      this.hand.y = sy.current;

      if (
        this.hand.mode === "enter" &&
        dist(this.hand.x, this.hand.y, this.target.x, this.target.y) < 6
      ) {
        this.markEntered();
      }
    }

    const ang = Math.atan2(this.hand.vy, this.hand.vx);
    const da = ang - this.hand.angle;
    const wrapped = Math.atan2(Math.sin(da), Math.cos(da));
    this.hand.angle += wrapped * Math.min(1, dt * 10);

    this.trail.push({ x: this.hand.x, y: this.hand.y });
    if (this.trail.length > 18) this.trail.shift();

    if (this.strokes.length > 48) {
      this.strokes = this.strokes.slice(-36);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { width, height } = this;
    ctx.clearRect(0, 0, width, height);
    if (!this.visible) return;

    ctx.save();
    for (const th of this.threads) {
      if (
        (th.y1 < -60 && th.y2 < -60) ||
        (th.y1 > height + 60 && th.y2 > height + 60)
      ) {
        continue;
      }
      const wave = this.reduced
        ? 0
        : Math.sin(this.time / 1700 + th.born / 800) * 2.2;
      ctx.beginPath();
      ctx.moveTo(th.x1, th.y1);
      const mid1 = cubic(th.x1, th.y1, th.x2, th.y2, th.taut, 0.38, wave);
      const mid2 = cubic(th.x1, th.y1, th.x2, th.y2, th.taut, 0.72, wave);
      ctx.bezierCurveTo(mid1.x, mid1.y, mid2.x, mid2.y, th.x2, th.y2);
      ctx.strokeStyle = PINE;
      ctx.globalAlpha = 0.42 + th.taut * 0.38;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      if (th.packet < 1) {
        const p = cubic(
          th.x1,
          th.y1,
          th.x2,
          th.y2,
          th.taut,
          th.packet,
          wave,
        );
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = PINE;
        ctx.fill();
      }
    }
    ctx.restore();

    for (const c of this.circles) {
      if (c.cy + c.ry < -20 || c.cy - c.ry > height + 20) continue;
      ctx.save();
      ctx.strokeStyle = c.color;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.05;
      ctx.setLineDash([2.5, 2.2]);
      ctx.beginPath();
      ctx.ellipse(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        -0.08,
        -Math.PI * 0.15,
        -Math.PI * 0.15 + Math.PI * 2 * c.progress,
      );
      ctx.stroke();
      ctx.restore();
    }

    for (const s of this.strokes) {
      drawStroke(ctx, s);
    }

    drawHand(ctx, this);
  }
}

function drawStroke(ctx: CanvasRenderingContext2D, s: InkStroke) {
  const pts = s.points;
  if (pts.length < 2) {
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.7;
      ctx.arc(pts[0].x, pts[0].y, s.width * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    return;
  }
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = s.color;
  const wet = 1 - s.dry;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const speed = dist(a.x, a.y, b.x, b.y);
    const w =
      s.width *
      (0.7 + (a.p + b.p) * 0.45) *
      (1.15 - Math.min(speed / 20, 0.7));
    ctx.lineWidth = Math.max(0.6, w * (1 + wet * 0.18));
    ctx.globalAlpha = 0.55 + s.dry * 0.28 + wet * 0.1;
    ctx.beginPath();
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(a.x, a.y, mx, my);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawHand(ctx: CanvasRenderingContext2D, field: InkField) {
  const { hand, trail, reduced } = field;
  if (trail.length > 2 && !reduced) {
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, trail[i].y);
    }
    ctx.strokeStyle = PINE;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 1.1;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  ctx.save();
  ctx.translate(hand.x, hand.y);
  ctx.rotate(hand.angle + Math.PI / 2);
  ctx.fillStyle = PINE;
  ctx.globalAlpha = 0.92;
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(3.6, 6);
  ctx.lineTo(0, 3.8);
  ctx.lineTo(-3.6, 6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = GRAPHITE;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.restore();
}

export const INK = { PINE, CINNABAR, GRAPHITE };
