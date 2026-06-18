import { create } from 'zustand'
import type {
  InteractiveSettings,
  ResumeData,
  SectionConfig,
  Settings,
  ThemeSettings,
} from '../types'
import { defaultResume, defaultSettings } from '../data/defaultData'
import { loadData, saveAll } from '../firebase/firestore'
import { isFirebaseConfigured } from '../firebase/config'

type Status = 'idle' | 'loading' | 'ready' | 'saving'

interface ResumeState {
  resume: ResumeData
  settings: Settings
  status: Status
  source: 'firestore' | 'default'
  /** Unsaved admin edits exist. */
  dirty: boolean
  error: string | null

  load: () => Promise<void>
  reload: () => Promise<void>
  save: () => Promise<void>

  setResume: (resume: ResumeData) => void
  patchResume: (patch: Partial<ResumeData>) => void
  patchTheme: (patch: Partial<ThemeSettings>) => void
  patchInteractive: (patch: Partial<InteractiveSettings>) => void
  setSections: (sections: SectionConfig[]) => void
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  resume: defaultResume,
  settings: defaultSettings,
  status: 'idle',
  source: 'default',
  dirty: false,
  error: null,

  load: async () => {
    if (get().status === 'loading') return
    set({ status: 'loading', error: null })
    const { resume, settings, source } = await loadData()
    set({ resume, settings, source, status: 'ready', dirty: false })
  },

  reload: async () => {
    set({ status: 'loading', error: null })
    const { resume, settings, source } = await loadData()
    set({ resume, settings, source, status: 'ready', dirty: false })
  },

  save: async () => {
    if (!isFirebaseConfigured) {
      set({ error: 'Firebase is not configured — add your keys to .env to save.' })
      return
    }
    set({ status: 'saving', error: null })
    try {
      await saveAll(get().resume, get().settings)
      set({ status: 'ready', dirty: false, source: 'firestore' })
    } catch (err) {
      set({
        status: 'ready',
        error: err instanceof Error ? err.message : 'Failed to save.',
      })
      throw err
    }
  },

  setResume: (resume) => set({ resume, dirty: true }),

  patchResume: (patch) =>
    set((s) => ({ resume: { ...s.resume, ...patch }, dirty: true })),

  patchTheme: (patch) =>
    set((s) => ({
      settings: { ...s.settings, theme: { ...s.settings.theme, ...patch } },
      dirty: true,
    })),

  patchInteractive: (patch) =>
    set((s) => ({
      settings: {
        ...s.settings,
        interactive: { ...s.settings.interactive, ...patch },
      },
      dirty: true,
    })),

  setSections: (sections) =>
    set((s) => ({ settings: { ...s.settings, sections }, dirty: true })),
}))
