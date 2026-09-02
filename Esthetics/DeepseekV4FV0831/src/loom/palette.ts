/**
 * 天然染料色谱。没有霓虹，没有渐变滤镜——只有布、线和染缸里真实存在的颜色。
 */
export interface Yarn {
  /** 线芯颜色 */
  core: string;
  /** 受光面（线是圆的，顶边亮） */
  lit: string;
  /** 背光面（底边暗，形成交叠的立体感） */
  shade: string;
  name: string;
}

const yarn = (core: string, lit: string, shade: string, name: string): Yarn => ({ core, lit, shade, name });

export const YARNS = {
  /** 未染的生成色苎麻 */
  raw: yarn('#cfc0a4', '#e6dbc4', '#a8977a', '生成'),
  rawWarm: yarn('#d6c7a9', '#ece1cb', '#ad9c7e', '生成·暖'),
  /** 茜草红 */
  madder: yarn('#a8453a', '#c8635a', '#78271f', '茜'),
  /** 蓼蓝／靛 */
  indigo: yarn('#2f4f76', '#4a6f9a', '#1a3050', '靛'),
  indigoDeep: yarn('#233d5e', '#3b5a80', '#12233a', '靛·深'),
  /** 栀子／藤黄 */
  gardenia: yarn('#c8912e', '#e0b155', '#8f6318', '栀'),
  /** 苏木紫 */
  sappan: yarn('#7c4a63', '#9a6580', '#54303f', '苏木'),
  /** 墨 */
  ink: yarn('#2b2724', '#4a443f', '#141210', '墨'),
} as const;

export type YarnKey = keyof typeof YARNS;

/** 纸地（页面底色）——与 CSS 变量保持一致 */
export const PAPER = '#efe6d8';
export const PAPER_DEEP = '#e4d8c5';
export const INK = '#221e1b';

/** 每个阶段的纬线配色：颜色变化本身就是叙事 */
export const WEFT_PROGRAM: { at: number; yarn: YarnKey }[] = [
  { at: 0.0, yarn: 'raw' },
  { at: 0.16, yarn: 'rawWarm' },
  { at: 0.3, yarn: 'madder' },
  { at: 0.46, yarn: 'indigo' },
  { at: 0.62, yarn: 'indigoDeep' },
  { at: 0.78, yarn: 'gardenia' },
  { at: 0.9, yarn: 'sappan' },
];

export function weftAt(progress: number): Yarn {
  let key: YarnKey = 'raw';
  for (const step of WEFT_PROGRAM) if (progress >= step.at) key = step.yarn;
  return YARNS[key];
}
