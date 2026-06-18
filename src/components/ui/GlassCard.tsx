import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useResumeStore } from '../../store/resumeStore'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Adds a subtle lift + glow on hover. */
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)

  const base = `glass rounded-3xl ${className}`

  if (!hover || !animations) {
    return <div className={base}>{children}</div>
  }

  return (
    <motion.div
      className={base}
      whileHover={{ y: -6, boxShadow: '0 24px 60px -18px rgb(var(--color-primary) / 0.5)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
