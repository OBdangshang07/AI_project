/**
 * 组织（weave structure）。
 *
 * 在织机上，一块布的全部信息就是一张 0/1 矩阵：第 p 纬时，第 e 根经线是否被提起。
 * 提起 → 经线浮在表面；不提 → 纬线浮在表面。
 * 同样的线，换一张矩阵，就是完全不同的布。这就是「规则」。
 */

/** true = 经线提起（经浮点，表面看到经线颜色） */
export type Draft = (pick: number, end: number) => boolean;

/** 平纹：最基本、最结实的交织，一上一下 */
export const plain: Draft = (p, e) => ((p + e) & 1) === 0;

/** 2/2 斜纹：连续浮长形成对角线 */
export const twill: Draft = (p, e) => {
  const k = (e + p) % 4;
  return k === 0 || k === 1;
};

/** 破斜纹（人字）：对角线在中轴处折返 */
export const herringbone = (ends: number): Draft => {
  const half = Math.max(4, Math.floor(ends / 2));
  return (p, e) => {
    const m = e < half ? e : half * 2 - e - 1;
    const k = (m + p) % 4;
    return k === 0 || k === 1;
  };
};

/** 五枚缎：稀疏的经浮点散布在纬面上，表面平滑有光泽 */
export const satin: Draft = (p, e) => (e * 2 + p) % 5 === 0;

/** 方平（篮纹）：两根一组并列，布面更松软 */
export const basket: Draft = (p, e) => (((p >> 1) + (e >> 1)) & 1) === 0;

export const STRUCTURES = { plain, twill, satin, basket } as const;
export type StructureName = keyof typeof STRUCTURES | 'herringbone' | 'jacquard';

export const STRUCTURE_LABEL: Record<string, string> = {
  plain: '平纹',
  twill: '斜纹',
  satin: '五枚缎',
  basket: '方平',
  herringbone: '人字',
  jacquard: '提花',
};

/**
 * 文字 → 提花矩阵。
 *
 * 这不是比喻：提花织机的纹版本来就是把图案打成孔的二进制卡片，
 * Jacquard 1804 年的打孔卡正是后来计算机穿孔卡的祖先。
 * 所以「把你的字织进布里」在技术上是字面成立的。
 */
export interface Jacquard {
  rows: Uint8Array[]; // 每行长度 = ends
  ends: number;
  text: string;
}

export function textToJacquard(
  text: string,
  ends: number,
  cellAspect: number, // 一纬的高 / 一经的宽
  heightScale = 0.62,
): Jacquard | null {
  const clean = text.trim();
  if (!clean) return null;
  if (typeof document === 'undefined') return null;

  // 纹版按经线数取样；行数按字形比例换算，保证织出来不被拉长
  const cols = ends;
  const rows = Math.max(8, Math.round((cols / Math.max(0.2, cellAspect)) * heightScale));
  const c = document.createElement('canvas');
  c.width = cols;
  c.height = rows;
  const g = c.getContext('2d', { willReadFrequently: true });
  if (!g) return null;

  g.fillStyle = '#000';
  g.fillRect(0, 0, cols, rows);
  g.fillStyle = '#fff';
  g.textAlign = 'center';
  g.textBaseline = 'middle';

  // 逐步缩小字号直到塞得下（含 CJK / 拉丁 / emoji 混排）
  const family = '"Songti SC","Noto Serif CJK SC","Source Han Serif SC","SimSun",serif';
  let size = rows * 0.92;
  for (let i = 0; i < 14; i++) {
    g.font = `700 ${size}px ${family}`;
    const w = g.measureText(clean).width;
    if (w <= cols * 0.9) break;
    size *= Math.max(0.62, (cols * 0.88) / Math.max(1, w));
  }
  g.font = `700 ${size}px ${family}`;
  g.fillText(clean, cols / 2, rows / 2 + size * 0.02, cols * 0.94);

  const data = g.getImageData(0, 0, cols, rows).data;
  const out: Uint8Array[] = [];
  // 布是自下而上长出来的：先织的一纬最后会落在最下面。
  // 所以纹版必须倒序排，字才是正的。
  for (let y = rows - 1; y >= 0; y--) {
    const row = new Uint8Array(cols);
    for (let x = 0; x < cols; x++) {
      row[x] = data[(y * cols + x) * 4] > 118 ? 1 : 0;
    }
    out.push(row);
  }
  return { rows: out, ends, text: clean };
}

/**
 * 提花纹版在实际织造时需要「地组织」托底，否则浮长过长会挂丝。
 * 图案处用经浮，地部用平纹——这也是真实提花布的做法。
 */
export function jacquardDraft(j: Jacquard, startPick: number, ground: Draft = plain): Draft {
  const h = j.rows.length;
  return (p, e) => {
    const r = p - startPick;
    if (r < 0 || r >= h) return ground(p, e);
    const on = j.rows[r][((e % j.ends) + j.ends) % j.ends] === 1;
    // 图案处经线全提（连续经浮＝亮），地部走地组织
    return on ? true : false;
  };
}
