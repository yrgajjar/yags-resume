import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useResumeStore } from '../../store/resumeStore'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'

interface ContactLink {
  icon: LucideIcon
  label: string
  value: string
  href: string
}

export function Contact() {
  const contact = useResumeStore((s) => s.resume.contact)
  const name = useResumeStore((s) => s.resume.hero.name)

  const links: ContactLink[] = []
  if (contact.email)
    links.push({ icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` })
  if (contact.phone)
    links.push({ icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` })
  if (contact.location)
    links.push({ icon: MapPin, label: 'Location', value: contact.location, href: '#' })
  if (contact.linkedin)
    links.push({ icon: Linkedin, label: 'LinkedIn', value: 'View profile', href: contact.linkedin })
  if (contact.github)
    links.push({ icon: Github, label: 'GitHub', value: 'View profile', href: contact.github })
  if (contact.website)
    links.push({ icon: Globe, label: 'Website', value: contact.website, href: contact.website })

  return (
    <SectionShell
      id="contact"
      eyebrow="Let's talk"
      title="Get In Touch"
      subtitle="Open to roles, consulting and interesting infrastructure problems."
    >
      <Reveal direction="up" className="mx-auto max-w-4xl">
        <GlassCard hover={false} className="overflow-hidden p-8 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Let&apos;s build something <span className="text-gradient">reliable</span>.
              </h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Reach out and I&apos;ll get back to you shortly.
              </p>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="no-print mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Mail className="h-4 w-4" /> Email {name.split(' ')[0]}
                </a>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <RevealItem key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/50 p-4 transition-colors hover:border-primary dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <link.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm font-semibold">{link.value}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </SectionShell>
  )
}
