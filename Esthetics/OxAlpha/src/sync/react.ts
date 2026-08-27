import { useSyncExternalStore } from 'react'
import { engine } from './engine'

/** 离散状态（锁定、机括、版本号）走 React；连续量 r 走 CSS 变量，不经过渲染。 */
export function useEngineVersion(): number {
  return useSyncExternalStore(
    (cb) => engine.subscribe(cb),
    () => engine.version,
  )
}
