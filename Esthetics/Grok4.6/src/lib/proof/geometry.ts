export type Pt = { x: number; y: number; t: number; p: number };

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(bx - ax, by - ay);
}

export function boundingBox(points: { x: number; y: number }[]) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  return { x: minX, y: minY, w, h, cx: minX + w / 2, cy: minY + h / 2 };
}

export function circularity(points: { x: number; y: number }[]) {
  if (points.length < 8) return 0;
  const box = boundingBox(points);
  const r = Math.max(box.w, box.h) / 2;
  if (r < 8) return 0;
  let sum = 0;
  for (const p of points) {
    sum += Math.abs(dist(p.x, p.y, box.cx, box.cy) - r);
  }
  const mean = sum / points.length;
  const start = points[0];
  const end = points[points.length - 1];
  const closed = dist(start.x, start.y, end.x, end.y) < r * 0.55;
  const round = 1 - clamp(mean / r, 0, 1);
  return round * (closed ? 1 : 0.7);
}

function resample(coords: [number, number][], spacing = 3.2): Pt[] {
  const out: Pt[] = [];
  if (coords.length === 0) return out;
  out.push({ x: coords[0][0], y: coords[0][1], t: 0, p: 0.7 });
  let acc = 0;
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const d = dist(x0, y0, x1, y1);
    if (d === 0) continue;
    const steps = Math.max(1, Math.ceil(d / spacing));
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      acc += d / steps;
      out.push({
        x: lerp(x0, x1, t),
        y: lerp(y0, y1, t),
        t: acc,
        p: 0.55 + 0.3 * Math.sin(t * Math.PI),
      });
    }
  }
  return out;
}

export function queryMark(x: number, y: number): Pt[] {
  const s = 11;
  return resample([
    [x - s * 0.35, y - s * 0.85],
    [x + s * 0.15, y - s * 1.05],
    [x + s * 0.45, y - s * 0.55],
    [x + s * 0.05, y - s * 0.05],
    [x, y + s * 0.25],
    [x, y + s * 0.42],
    [x, y + s * 0.72],
    [x + 0.2, y + s * 0.86],
  ]);
}

export function caretMark(x: number, y: number): Pt[] {
  return resample([
    [x - 9, y + 6],
    [x, y - 2],
    [x + 9, y + 6],
  ]);
}

export function deleteMark(x: number, y: number): Pt[] {
  return resample([
    [x, y - 14],
    [x, y + 14],
    [x + 5, y + 10],
    [x - 0.5, y + 8],
  ]);
}

export function stetMark(x: number, y: number): Pt[] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = 11 + (i % 2 === 0 ? 0.6 : -0.8);
    pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.92]);
  }
  return resample(pts);
}

export function checkMark(x: number, y: number): Pt[] {
  return resample([
    [x - 7, y + 1],
    [x - 1.5, y + 8],
    [x + 12, y - 9],
  ]);
}

export function tickHook(x: number, y: number): Pt[] {
  return resample([
    [x + 6, y - 4],
    [x + 16, y - 4],
    [x + 16, y + 10],
    [x + 12, y + 14],
  ]);
}

export type ReplyKind = "query" | "caret" | "delete" | "stet" | "check" | "hook";

export function classifyStroke(points: { x: number; y: number }[]): ReplyKind {
  if (points.length < 3) return "query";
  const box = boundingBox(points);
  const start = points[0];
  const end = points[points.length - 1];
  const len = dist(start.x, start.y, end.x, end.y);
  const aspect = box.w / box.h;
  const circ = circularity(points);
  if (circ > 0.58 && Math.max(box.w, box.h) > 22) return "stet";
  if (len < 18 && box.w < 22 && box.h < 22) return "query";
  if (aspect > 2.4) return "caret";
  if (aspect < 0.42) return "delete";
  if (points.length > 40 && box.w * box.h > 2400) return "check";
  return "hook";
}

export function replyPath(
  kind: ReplyKind,
  points: { x: number; y: number }[],
): Pt[] {
  const box = boundingBox(points);
  const end = points[points.length - 1] ?? { x: box.cx, y: box.cy };
  switch (kind) {
    case "query":
      return queryMark(end.x + 16, end.y + 2);
    case "caret":
      return caretMark(box.cx, box.y + box.h + 12);
    case "delete":
      return deleteMark(box.x + box.w + 12, box.cy);
    case "stet":
      return stetMark(box.cx + box.w * 0.15, box.cy);
    case "check":
      return checkMark(box.x + box.w + 14, box.y + 4);
    default:
      return tickHook(end.x, end.y);
  }
}

export function cubic(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  taut: number,
  t: number,
  wave = 0,
) {
  const dx = x2 - x1;
  const sag = (1 - taut) * Math.min(48, Math.abs(dx) * 0.28) + wave;
  const c1x = x1 + dx * 0.38;
  const c1y = y1 + sag;
  const c2x = x1 + dx * 0.72;
  const c2y = y2 + sag * 0.55;
  const u = 1 - t;
  const x =
    u * u * u * x1 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x2;
  const y =
    u * u * u * y1 + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y2;
  return { x, y };
}

export function ellipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  t: number,
) {
  const a = t * Math.PI * 2 - Math.PI * 0.15;
  return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
}

export function springStep(
  current: number,
  target: number,
  velocity: number,
  dt: number,
  stiffness = 170,
  damping = 20,
) {
  const accel = stiffness * (target - current) - damping * velocity;
  const v = velocity + accel * dt;
  const n = current + v * dt;
  return { current: n, velocity: v };
}
