import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, ChevronDown, MapPin } from 'lucide-react'
import { useResumeStore } from '../../store/resumeStore'
import type { ExperienceItem } from '../../types'
import { sanitizeHtml } from '../../utils/sanitize'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'

function TimelineCard({ item, defaultOpen }: { item: ExperienceItem; defaultOpen: boolean }) {
  const animations = useResumeStore((s) => s.settings.interactive.animations)
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="relative pl-10 sm:pl-14">
      {/* Timeline node */}
      <span className="absolute left-[10px] top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-brand-gradient shadow-glow sm:left-[18px]" />

      <GlassCard className="p-6 sm:p-7" hover={false}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <div>
            <h3 className="text-lg font-bold sm:text-xl">{item.role}</h3>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                <Building2 className="h-4 w-4" /> {item.company}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {item.location}
                </span>
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {item.start} – {item.end}
            </span>
            <ChevronDown
              className={`no-print h-5 w-5 text-slate-400 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={animations ? { height: 0, opacity: 0 } : false}
              animate={{ height: 'auto', opacity: 1 }}
              exit={animations ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="rich-text mt-4 border-t border-slate-200/70 pt-4 text-slate-600 dark:border-white/10 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  )
}

export function Experience() {
  const experience = useResumeStore((s) => s.resume.experience)

  return (
    <SectionShell id="experience" eyebrow="Where I've worked" title="Experience">
      <Reveal stagger className="relative space-y-6">
        {/* Vertical timeline rail */}
        <span className="absolute bottom-2 left-[10px] top-2 w-0.5 bg-gradient-to-b from-primary/60 to-secondary/40 sm:left-[18px]" />
        {experience.map((item, i) => (
          <RevealItem key={item.id}>
            <TimelineCard item={item} defaultOpen={i === 0} />
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
