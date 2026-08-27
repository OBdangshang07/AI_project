export type NarrationKey =
  | 'enter'
  | 'fire'
  | 'crack'
  | 'still'
  | 'gold'
  | 'mended'
  | 'crazing'
  | null

export interface Stats {
  touches: number
  passes: number
  rewinds: number
  cracked: boolean
  mended: boolean
  questionsDone: string[]
}

export interface StudioEvents {
  chapter: (c: number) => void
  narration: (k: NarrationKey) => void
  kilndone: () => void
  qstate: (d: { id: string; state: 'active' | 'done' }) => void
  reveal: (d: { id: string; line: number; p: number }) => void
  awaithold: (b: boolean) => void
  duetpaused: (b: boolean) => void
  recentered: () => void
  rewound: (ok: boolean) => void
  stats: (s: Stats) => void
  section: (b: boolean) => void
  hint: (k: 'hold') => void
  goldopen: () => void
  cutdone: () => void
  splat: () => void
}

/** 裂纹/开片的归一坐标：h ∈ [0,1] 高度比，u ∈ [-1,1] 相对当前半径的横向比 */
export interface SurfPt {
  h: number
  u: number
}
