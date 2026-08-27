/**
 * optics.ts — 二维几何光学核心。
 * 全站唯一原则：光的行为必须是真实计算的结果（斯涅尔定律 / 全反射），
 * 而不是手绘的"看起来像"。交互的因与视觉的果严格对应。
 */

export interface Vec {
  x: number;
  y: number;
}

export const v = (x: number, y: number): Vec => ({ x, y });
export const add = (a: Vec, b: Vec): Vec => v(a.x + b.x, a.y + b.y);
export const sub = (a: Vec, b: Vec): Vec => v(a.x - b.x, a.y - b.y);
export const scale = (a: Vec, s: number): Vec => v(a.x * s, a.y * s);
export const dot = (a: Vec, b: Vec): number => a.x * b.x + a.y * b.y;
export const len = (a: Vec): number => Math.hypot(a.x, a.y);
export const norm = (a: Vec): Vec => {
  const l = len(a) || 1;
  return v(a.x / l, a.y / l);
};

export interface Segment {
  a: Vec;
  b: Vec;
}

/** 等边三角形棱镜：center + 外接圆半径 + 旋转角（0 时一顶点朝上）。 */
export interface PrismShape {
  center: Vec;
  radius: number;
  rotation: number;
}

export function prismVertices(p: PrismShape): [Vec, Vec, Vec] {
  const pts: Vec[] = [];
  for (let i = 0; i < 3; i++) {
    const ang = p.rotation - Math.PI / 2 + (i * 2 * Math.PI) / 3;
    pts.push(
      v(p.center.x + Math.cos(ang) * p.radius, p.center.y + Math.sin(ang) * p.radius),
    );
  }
  return [pts[0], pts[1], pts[2]];
}

export function prismEdges(p: PrismShape): [Segment, Segment, Segment] {
  const [a, b, c] = prismVertices(p);
  return [
    { a, b },
    { a: b, b: c },
    { a: c, b: a },
  ];
}

/** 射线与线段的交点。返回沿射线的参数 t（>eps 才有效），否则 null。 */
export function raySegment(
  o: Vec,
  d: Vec,
  s: Segment,
  eps = 1e-4,
): { t: number; point: Vec } | null {
  const e = sub(s.b, s.a);
  const denom = d.x * e.y - d.y * e.x;
  if (Math.abs(denom) < 1e-9) return null;
  const w = sub(s.a, o);
  const t = (w.x * e.y - w.y * e.x) / denom;
  const u = (w.x * d.y - w.y * d.x) / denom;
  if (t > eps && u >= -1e-6 && u <= 1 + 1e-6) {
    return { t, point: add(o, scale(d, t)) };
  }
  return null;
}

/** 射线与棱镜的最近交点，附带入射边的外法线。 */
export function rayPrism(
  o: Vec,
  d: Vec,
  prism: PrismShape,
): { point: Vec; normal: Vec; edge: Segment } | null {
  let best: { t: number; point: Vec; edge: Segment } | null = null;
  for (const edge of prismEdges(prism)) {
    const hit = raySegment(o, d, edge);
    if (hit && (!best || hit.t < best.t)) best = { ...hit, edge };
  }
  if (!best) return null;
  // 边法线（指向棱镜外）
  const e = norm(sub(best.edge.b, best.edge.a));
  let normal = v(e.y, -e.x);
  const toCenter = sub(prism.center, best.point);
  if (dot(normal, toCenter) > 0) normal = scale(normal, -1);
  return { point: best.point, normal, edge: best.edge };
}

/**
 * 斯涅尔折射。i 为归一化入射方向，n 为界面法线（要求 dot(i, n) < 0）。
 * 返回折射方向；发生全反射时返回 null。
 */
export function refract(i: Vec, n: Vec, n1: number, n2: number): Vec | null {
  let normal = n;
  if (dot(i, normal) > 0) normal = scale(normal, -1);
  const cosI = -dot(i, normal);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosI * cosI);
  if (k < 0) return null; // 全反射
  return norm(add(scale(i, eta), scale(normal, eta * cosI - Math.sqrt(k))));
}

export function reflect(i: Vec, n: Vec): Vec {
  let normal = n;
  if (dot(i, normal) > 0) normal = scale(normal, -1);
  return norm(sub(i, scale(normal, 2 * dot(i, normal))));
}

/** 一条光线穿过棱镜的完整追踪结果。 */
export interface TraceResult {
  /** 入射段：从光源到棱镜表面（未命中时为远点）。 */
  incident: Segment | null;
  /** 棱镜内部的光路（可能含多次全反射弹射）。 */
  internal: Segment[];
  /** 出射光：起点 + 方向；彻底困住（超过弹射上限）时为 null。 */
  exit: { origin: Vec; dir: Vec } | null;
  /** 发生全反射的次数。> 0 即"光没能直接出来"——被弹回、改道。 */
  tirCount: number;
  trapped: boolean;
}

const MAX_BOUNCES = 5;

export function traceBeam(
  origin: Vec,
  dir: Vec,
  prism: PrismShape,
  refractiveIndex: number,
): TraceResult {
  const entry = rayPrism(origin, dir, prism);
  if (!entry) {
    return {
      incident: { a: origin, b: add(origin, scale(dir, 4000)) },
      internal: [],
      exit: null,
      tirCount: 0,
      trapped: false,
    };
  }
  const incident: Segment = { a: origin, b: entry.point };
  const internal: Segment[] = [];
  let tirCount = 0;
  // 进入玻璃（空气 → n）
  let d = refract(dir, entry.normal, 1, refractiveIndex);
  let p = entry.point;
  if (!d) {
    // 从空气进入密介质不可能全反射；兜底当作未命中
    return { incident, internal, exit: null, tirCount: 0, trapped: false };
  }
  for (let bounce = 0; bounce < MAX_BOUNCES; bounce++) {
    const hit = rayPrism(p, d, prism);
    if (!hit) break;
    internal.push({ a: p, b: hit.point });
    const out = refract(d, hit.normal, refractiveIndex, 1);
    if (out) {
      return {
        incident,
        internal,
        exit: { origin: hit.point, dir: out },
        tirCount,
        trapped: tirCount > 0,
      };
    }
    // 全反射：光被弹回内部
    tirCount++;
    d = reflect(d, hit.normal);
    p = hit.point;
  }
  return { incident, internal, exit: null, tirCount, trapped: true };
}
