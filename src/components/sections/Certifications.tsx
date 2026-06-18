import { Award, ExternalLink } from 'lucide-react'
import { useResumeStore } from '../../store/resumeStore'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'

export function Certifications() {
  const certifications = useResumeStore((s) => s.resume.certifications)

  return (
    <SectionShell id="certifications" eyebrow="Verified" title="Certifications">
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <RevealItem key={cert.id}>
            <GlassCard className="group h-full p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold leading-snug">{cert.name}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {cert.date}
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="no-print inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-primary"
                  >
                    Verify <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
