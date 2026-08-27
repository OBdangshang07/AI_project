import { useEffect, useState } from 'react'

export function useExperienceStage(calibrationRef, closureRef) {
  const [stage, setStage] = useState('story')

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const calibration = calibrationRef.current
      const closure = closureRef.current
      if (!calibration || !closure) return

      const threshold = window.innerHeight * 0.54
      const calibrationRect = calibration.getBoundingClientRect()
      const closureRect = closure.getBoundingClientRect()
      let next = 'story'

      if (closureRect.top <= threshold) next = 'handoff'
      else if (calibrationRect.top <= threshold && calibrationRect.bottom > threshold) next = 'calibrate'

      setStage((current) => (current === next ? current : next))
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
  }, [calibrationRef, closureRef])

  return stage
}
