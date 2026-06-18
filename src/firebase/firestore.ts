import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './config'
import type { ResumeData, Settings } from '../types'
import { defaultResume, defaultSettings } from '../data/defaultData'

// ---------------------------------------------------------------------------
// Firestore data layer.
//
// Document layout (matches the requested collections):
//   resume/main    -> the full ResumeData object
//   settings/main  -> the full Settings object (theme + layout + toggles)
//
// Every read falls back to bundled defaults so the UI never renders empty.
// ---------------------------------------------------------------------------

const RESUME_DOC = ['resume', 'main'] as const
const SETTINGS_DOC = ['settings', 'main'] as const

export interface LoadedData {
  resume: ResumeData
  settings: Settings
  /** Where the data came from — useful for the admin "seed" affordance. */
  source: 'firestore' | 'default'
}

/** Reads resume + settings from Firestore, falling back to seed data. */
export async function loadData(): Promise<LoadedData> {
  if (!db) {
    return { resume: defaultResume, settings: defaultSettings, source: 'default' }
  }

  try {
    const [resumeSnap, settingsSnap] = await Promise.all([
      getDoc(doc(db, ...RESUME_DOC)),
      getDoc(doc(db, ...SETTINGS_DOC)),
    ])

    const hasData = resumeSnap.exists() || settingsSnap.exists()

    const resume = resumeSnap.exists()
      ? mergeResume(resumeSnap.data() as Partial<ResumeData>)
      : defaultResume
    const settings = settingsSnap.exists()
      ? mergeSettings(settingsSnap.data() as Partial<Settings>)
      : defaultSettings

    return { resume, settings, source: hasData ? 'firestore' : 'default' }
  } catch (err) {
    console.error('[yags-resume] Failed to load from Firestore, using defaults.', err)
    return { resume: defaultResume, settings: defaultSettings, source: 'default' }
  }
}

export async function saveResume(resume: ResumeData): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.')
  await setDoc(doc(db, ...RESUME_DOC), resume)
}

export async function saveSettings(settings: Settings): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.')
  await setDoc(doc(db, ...SETTINGS_DOC), settings)
}

/** Writes both docs at once (used by the admin "Save" + initial seed). */
export async function saveAll(resume: ResumeData, settings: Settings): Promise<void> {
  await Promise.all([saveResume(resume), saveSettings(settings)])
}

// --- Defensive merges so older/partial docs never break the UI --------------

function mergeResume(data: Partial<ResumeData>): ResumeData {
  return {
    hero: { ...defaultResume.hero, ...data.hero },
    about: { ...defaultResume.about, ...data.about },
    skillCategories: data.skillCategories ?? defaultResume.skillCategories,
    experience: data.experience ?? defaultResume.experience,
    education: data.education ?? defaultResume.education,
    certifications: data.certifications ?? defaultResume.certifications,
    contact: { ...defaultResume.contact, ...data.contact },
    highlights: data.highlights ?? defaultResume.highlights,
  }
}

function mergeSettings(data: Partial<Settings>): Settings {
  return {
    theme: { ...defaultSettings.theme, ...data.theme },
    sections: data.sections?.length ? data.sections : defaultSettings.sections,
    interactive: { ...defaultSettings.interactive, ...data.interactive },
  }
}
