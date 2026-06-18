import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useResumeStore } from '../../store/resumeStore'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  /** Animation duration in ms. */
  duration?: number
  className?: string
}

/** Counts up from 0 to `value` when scrolled into view. Respects the
 * "counters" + "animations" toggles (renders the final value instantly when off). */
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1600,
  className = '',
}: AnimatedCounterProps) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(animations ? 0 : value)

  useEffect(() => {
    if (!animations) {
      setDisplay(value)
      return
    }
    if (!inView) return

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, animations])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
