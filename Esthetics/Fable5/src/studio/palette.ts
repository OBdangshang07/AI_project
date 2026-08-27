// 《成器》色谱 —— 纸、墨、陶、釉、金。
// 纪律：金只出现在修补处；印泥红只出现在印章与焦点环。
export const P = {
  paper: '#f4efe6',
  paperCard: '#f9f5eb',
  paperDeep: '#eae2d2',
  ink: '#26211a',
  inkSoft: '#6f6454',
  inkFaint: '#a2957f',
  hairline: '#d9d0bc',

  clay: '#b07a52', // 生泥
  clayWet: '#96603f', // 湿泥（阴影）
  clayLight: '#c89a72', // 受光
  clayFired: '#a4643f', // 素烧后
  slip: '#d9c9b4', // 化妆土 / 露胎
  celadon: '#a8bda6', // 釉青（要盖得住陶色，出窑必须一眼可辨）
  celadonDeep: '#5f7a68',
  gold: '#c9a227', // 金缮 —— 只用于修补
  goldLight: '#e2c25a',
  seal: '#b5483a', // 印泥红 —— 只用于印章与焦点

  wheel: '#3c342a', // 轮头
  wheelHi: '#5a4e3e',
  shadow: 'rgba(38,33,26,0.16)',
} as const

/** 泥色随烧成度插值（0 生泥 → 1 出窑） */
export function clayAt(t: number): { body: string; dark: string; light: string } {
  if (t < 0.5) return { body: P.clay, dark: P.clayWet, light: P.clayLight }
  return { body: P.clayFired, dark: '#8a4f33', light: '#c08157' }
}
