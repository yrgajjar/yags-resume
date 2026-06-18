import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useResumeStore } from '../../store/resumeStore'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

interface RevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  /** When true, children animate in a staggered sequence. */
  stagger?: boolean
}

/**
 * Scroll-reveal wrapper. Respects the global "animations" toggle — when
 * disabled it renders a plain div with no motion, so the admin can turn off
 * all animation site-wide.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  stagger = false,
}: RevealProps) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)

  if (!animations) {
    return <div className={className}>{children}</div>
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={
        stagger
          ? { show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }
          : variants
      }
    >
      {children}
    </motion.div>
  )
}

/** A single item inside a staggered <Reveal stagger>. */
export function RevealItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)
  if (!animations) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset[direction] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
