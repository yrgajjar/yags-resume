import { useResumeStore } from '../../store/resumeStore'
import { sanitizeHtml } from '../../utils/sanitize'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'

export function About() {
  const about = useResumeStore((s) => s.resume.about)

  return (
    <SectionShell id="about" eyebrow="Who I am" title="About Me">
      <Reveal direction="up" className="mx-auto max-w-3xl">
        <GlassCard hover={false} className="p-8 sm:p-10">
          <div
            className="rich-text text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(about.summary) }}
          />
        </GlassCard>
      </Reveal>
    </SectionShell>
  )
}
