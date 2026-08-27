/* 引擎 ↔ 界面 的唯一桥。模块级单例，事件单向流入 reactive 状态。 */

import { reactive } from 'vue'
import { StudioEngine } from './studio/engine'
import type { NarrationKey, Stats } from './studio/types'

export const engine = new StudioEngine()

function storedBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key)
    if (v === '1') return true
    if (v === '0') return false
  } catch { /* 私密模式等 */ }
  return fallback
}

const mediaCalm =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const ui = reactive({
  chapter: 0,
  calm: storedBool('cq_calm', mediaCalm),
  sound: storedBool('cq_sound', true),
  splatted: false,
  narration: null as NarrationKey,
  kilnRunning: false,
  kilnDone: false,
  qState: {} as Record<string, 'idle' | 'active' | 'done'>,
  reveals: {} as Record<string, number[]>,
  awaitingHold: false,
  duetPaused: false,
  recenteredAt: 0,
  rewindEmpty: false,
  showHoldHint: false,
  goldNoteOpen: false,
  sectionOpen: false,
  cut: false,
  stats: { touches: 0, passes: 0, rewinds: 0, cracked: false, mended: false, questionsDone: [] } as Stats,
})

let bound = false
/** 由 StageCanvas 在挂载时调用一次 */
export function bindEngine(): void {
  if (bound) return
  bound = true
  const b = engine.bus
  b.on('chapter', (c) => (ui.chapter = c))
  b.on('splat', () => (ui.splatted = true))
  b.on('narration', (k) => {
    ui.narration = k
    ui.kilnRunning = k !== null
  })
  b.on('kilndone', () => {
    ui.kilnDone = true
    ui.kilnRunning = false
  })
  b.on('qstate', ({ id, state }) => {
    ui.qState[id] = state
  })
  b.on('reveal', ({ id, line, p }) => {
    const arr = ui.reveals[id] ?? (ui.reveals[id] = [0, 0, 0])
    if (p > (arr[line] ?? 0)) arr[line] = p
  })
  b.on('awaithold', (v) => {
    ui.awaitingHold = v
    if (!v) ui.duetPaused = false
  })
  b.on('duetpaused', (v) => (ui.duetPaused = v))
  b.on('recentered', () => (ui.recenteredAt = Date.now()))
  b.on('rewound', (ok) => (ui.rewindEmpty = !ok))
  b.on('stats', (s) => (ui.stats = s))
  b.on('hint', (k) => {
    if (k === 'hold') ui.showHoldHint = true
  })
  b.on('goldopen', () => (ui.goldNoteOpen = true))
  b.on('section', (v) => (ui.sectionOpen = v))
  b.on('cutdone', () => (ui.cut = true))

  engine.setCalm(ui.calm)
  engine.setSound(ui.sound)
}

export function toggleSound(): void {
  ui.sound = !ui.sound
  engine.setSound(ui.sound)
  try {
    localStorage.setItem('cq_sound', ui.sound ? '1' : '0')
  } catch { /* ignore */ }
}

export function toggleCalm(): void {
  ui.calm = !ui.calm
  engine.setCalm(ui.calm)
  document.documentElement.classList.toggle('calm', ui.calm)
  try {
    localStorage.setItem('cq_calm', ui.calm ? '1' : '0')
  } catch { /* ignore */ }
}
