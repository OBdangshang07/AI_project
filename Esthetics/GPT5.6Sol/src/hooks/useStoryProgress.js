import { useEffect, useState } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function useStoryProgress(storyRef) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    let last = -1

    const measure = () => {
      frame = 0
      const story = storyRef.current
      if (!story) return
      const rect = story.getBoundingClientRect()
      const travel = Math.max(1, story.offsetHeight - window.innerHeight)
      const next = clamp(-rect.top / travel)

      if (Math.abs(next - last) > 0.001 || next === 0 || next === 1) {
        last = next
        setProgress(next)
      }
    }

    const requestMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', requestMeasure, { passive: true })
    window.addEventListener('resize', requestMeasure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestMeasure)
      window.removeEventListener('resize', requestMeasure)
    }
  }, [storyRef])

  return progress
}
