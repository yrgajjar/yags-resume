import { GraduationCap } from 'lucide-react'
import { useResumeStore } from '../../store/resumeStore'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'

export function Education() {
  const education = useResumeStore((s) => s.resume.education)

  return (
    <SectionShell id="education" eyebrow="Foundations" title="Education">
      <Reveal stagger className="mx-auto grid max-w-4xl gap-6">
        {education.map((item) => (
          <RevealItem key={item.id}>
            <GlassCard className="flex gap-5 p-6 sm:p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-bold">{item.degree}</h3>
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    {item.start} – {item.end}
                  </span>
                </div>
                <p className="mt-0.5 font-semibold text-primary">{item.institution}</p>
                {item.description && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                )}
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
