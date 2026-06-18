import { motion } from 'framer-motion'
import { useResumeStore } from '../../store/resumeStore'

interface SkillBarProps {
  name: string
  level: number
}

export function SkillBar({ name, level }: SkillBarProps) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)
  const pct = Math.max(0, Math.min(100, level))

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {name}
        </span>
        <span className="text-xs font-semibold text-primary">{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
        {animations ? (
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${pct}%` }} />
        )}
      </div>
    </div>
  )
}
