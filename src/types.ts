// ---------------------------------------------------------------------------
// Shared data model for the digital resume + admin settings.
// The full resume lives in a single Firestore doc (`resume/main`) and all
// settings live in `settings/main` — this keeps the public page fast (2 reads).
// ---------------------------------------------------------------------------

export type SectionId =
  | 'about'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'contact'

export interface Counter {
  id: string
  label: string
  value: number
  suffix?: string
}

export interface HeroData {
  name: string
  role: string
  tagline: string
  /** Optional avatar image URL. */
  avatarUrl?: string
  /** Animated stat counters shown in the hero. */
  counters: Counter[]
}

export interface AboutData {
  /** Rich-text HTML produced by the admin editor. */
  summary: string
}

export interface Skill {
  id: string
  name: string
  /** Proficiency 0–100, drives the animated progress bar. */
  level: number
}

export interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  start: string
  end: string
  location?: string
  /** Rich-text HTML. */
  description: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  start: string
  end: string
  description?: string
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

export interface ContactData {
  email: string
  phone: string
  location?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface Highlight {
  id: string
  label: string
}

export interface ResumeData {
  hero: HeroData
  about: AboutData
  skillCategories: SkillCategory[]
  experience: ExperienceItem[]
  education: EducationItem[]
  certifications: CertificationItem[]
  contact: ContactData
  /** Custom badges/tags shown in the hero. */
  highlights: Highlight[]
}

export type FontKey = 'inter' | 'poppins' | 'sora' | 'manrope' | 'jakarta'

export type ThemeMode = 'light' | 'dark'

export interface ThemeSettings {
  /** Hex color, e.g. "#6366f1". */
  primary: string
  /** Hex color, e.g. "#06b6d4". */
  secondary: string
  mode: ThemeMode
  font: FontKey
}

export interface SectionConfig {
  id: SectionId
  enabled: boolean
}

export interface InteractiveSettings {
  animations: boolean
  counters: boolean
}

export interface Settings {
  theme: ThemeSettings
  /** Order + on/off state of the toggleable sections (Hero is always first). */
  sections: SectionConfig[]
  interactive: InteractiveSettings
}

export const SECTION_LABELS: Record<SectionId, string> = {
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  certifications: 'Certifications',
  contact: 'Contact',
}
