import type { JSX } from 'react'
import { useResumeStore } from '../store/resumeStore'
import type { SectionId } from '../types'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'

const SECTION_COMPONENTS: Record<SectionId, () => JSX.Element> = {
  about: About,
  skills: Skills,
  experience: Experience,
  education: Education,
  certifications: Certifications,
  contact: Contact,
}

/**
 * Renders the full resume: the fixed Hero followed by the admin-configured
 * sections in their saved order, skipping any that are toggled off. Shared by
 * the public page and the admin live preview so they're always identical.
 */
export function ResumeView() {
  const sections = useResumeStore((s) => s.settings.sections)

  return (
    <div id="resume-root">
      <Hero />
      {sections
        .filter((s) => s.enabled)
        .map((s) => {
          const Component = SECTION_COMPONENTS[s.id]
          return <Component key={s.id} />
        })}
    </div>
  )
}
