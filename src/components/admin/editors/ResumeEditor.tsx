import { useState } from 'react'
import { HeroEditor } from './HeroEditor'
import { AboutEditor } from './AboutEditor'
import { SkillsEditor } from './SkillsEditor'
import { ExperienceEditor } from './ExperienceEditor'
import { EducationEditor } from './EducationEditor'
import { CertificationsEditor } from './CertificationsEditor'
import { ContactEditor } from './ContactEditor'

const TABS = [
  { id: 'hero', label: 'Hero', Component: HeroEditor },
  { id: 'about', label: 'About', Component: AboutEditor },
  { id: 'skills', label: 'Skills', Component: SkillsEditor },
  { id: 'experience', label: 'Experience', Component: ExperienceEditor },
  { id: 'education', label: 'Education', Component: EducationEditor },
  { id: 'certifications', label: 'Certifications', Component: CertificationsEditor },
  { id: 'contact', label: 'Contact', Component: ContactEditor },
] as const

export function ResumeEditor() {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('hero')
  const Active = TABS.find((t) => t.id === active)!.Component

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === t.id
                ? 'bg-brand-gradient text-white shadow-glow'
                : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Active />
    </div>
  )
}
