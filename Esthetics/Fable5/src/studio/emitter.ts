/* 极小的类型化事件器 */
type Handler = (...args: never[]) => void

export class Emitter<T extends { [K in keyof T]: Handler }> {
  private m = new Map<keyof T, Set<T[keyof T]>>()

  on<K extends keyof T>(k: K, fn: T[K]): () => void {
    let s = this.m.get(k)
    if (!s) {
      s = new Set()
      this.m.set(k, s)
    }
    s.add(fn)
    return () => s!.delete(fn)
  }

  emit<K extends keyof T>(k: K, ...args: Parameters<T[K]>): void {
    const s = this.m.get(k)
    if (s) for (const fn of s) (fn as (...a: Parameters<T[K]>) => void)(...args)
  }

  clear(): void {
    this.m.clear()
  }
}
