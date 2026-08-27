import { useEffect, useState } from 'react'

// Returns the index of the [data-chapter] section nearest the viewport centre.
export function useChapter() {
  const [chapter, setChapter] = useState(0)
  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const nodes = Array.from(document.querySelectorAll('[data-chapter]'))
      if (!nodes.length) return
      const mid = window.innerHeight * 0.5
      let best = 0
      let bestDist = Infinity
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const center = rect.top + rect.height * 0.5
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = Number(node.dataset.chapter) || 0
        }
      })
      setChapter((current) => (current === best ? current : best))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return chapter
}
