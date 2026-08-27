import { SyncEngine, OMEGA0 } from '../src/sync/engine'

function run(mod: number, progress: number, gain: number, seconds: number, armed = false) {
  const e = new SyncEngine()
  e.resize(800, 600, 1)
  e.setMod(mod)
  e.setProgress(progress)
  e.setGain(gain)
  e.setArmed(armed)
  for (let i = 0; i < seconds * 60; i++) e.step(1 / 60, true)
  return e.r
}

const idleTop = run(1.05, 0.0, 0.18, 30)
const p1End = run(1.6, 0.32, 0.18, 20)
const p2Mid = run(0.5, 0.5, 0.18, 20)
const p3 = run(1.0, 0.68, 0.18, 10, true)

console.log('idle-top r =', idleTop.toFixed(3), '(want < 0.55)')
console.log('p1-end   r =', p1End.toFixed(3), '(want > 0.85)')
console.log('p2-mid   r =', p2Mid.toFixed(3), '(want 0.3..0.72)')
console.log('p3       r =', p3.toFixed(3), '(want 0.45..0.85 before user tunes)')

// 锁定路径
{
  const e = new SyncEngine()
  e.resize(800, 600, 1)
  e.setProgress(0.68)
  e.setMod(1.0)
  e.setArmed(true)
  for (let i = 0; i < 300; i++) e.step(1 / 60)
  e.setUserFreq(OMEGA0 - 0.02)
  e.setGain(0.8)
  let steps = 0
  while (!e.locked && steps < 1200) {
    e.step(1 / 60)
    steps++
  }
  console.log('lock:', e.locked ? `yes in ${(steps / 60).toFixed(2)}s` : 'NO', 'r=', e.r.toFixed(3))
  if (!e.locked) process.exit(1)
}

// 减动效预热
{
  const s = new SyncEngine()
  s.setProgress(0.2)
  s.settleStatic()
  console.log('reduced settled r =', s.r.toFixed(3), '(want > 0.85)')
}

const ok =
  idleTop < 0.55 &&
  p1End > 0.85 &&
  p2Mid > 0.3 &&
  p2Mid < 0.72 &&
  p3 > 0.45 &&
  p3 < 0.85
console.log(ok ? 'TUNE OK' : 'TUNE OUT OF RANGE')
if (!ok) process.exit(1)
