import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Palette,
  LayoutList,
  Sparkles,
  Eye,
  Save,
  LogOut,
  ExternalLink,
  Loader2,
  RotateCcw,
  Menu,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useResumeStore } from '../store/resumeStore'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../firebase/auth'
import { toast } from '../store/toastStore'
import { ResumeEditor } from '../components/admin/editors/ResumeEditor'
import { ThemeCustomizer } from '../components/admin/editors/ThemeCustomizer'
import { SectionControl } from '../components/admin/editors/SectionControl'
import { InteractiveControls } from '../components/admin/editors/InteractiveControls'
import { LivePreview } from '../components/admin/editors/LivePreview'

type TabId = 'content' | 'theme' | 'layout' | 'interactive' | 'preview'

const NAV: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'content', label: 'Resume Content', icon: FileText },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'layout', label: 'Sections', icon: LayoutList },
  { id: 'interactive', label: 'Interactive', icon: Sparkles },
  { id: 'preview', label: 'Live Preview', icon: Eye },
]

export function AdminDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState<TabId>('content')
  const [navOpen, setNavOpen] = useState(false)

  const status = useResumeStore((s) => s.status)
  const dirty = useResumeStore((s) => s.dirty)
  const source = useResumeStore((s) => s.source)
  const save = useResumeStore((s) => s.save)
  const reload = useResumeStore((s) => s.reload)

  const saving = status === 'saving'

  const onSave = async () => {
    try {
      await save()
      toast.success('Changes published')
    } catch {
      toast.error('Could not save. Check your Firebase setup.')
    }
  }

  const onReset = async () => {
    await reload()
    toast.info('Reverted to last saved version')
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#05080f]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#05080f]/80">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/60 dark:hover:bg-white/10 lg:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <FileText className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold">Resume Admin</p>
              <p className="hidden text-xs text-slate-400 sm:block">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-block ${
                dirty
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300'
              }`}
            >
              {dirty ? 'Unsaved changes' : source === 'firestore' ? 'Saved' : 'Seed data'}
            </span>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-300"
            >
              View <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            {dirty && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-rose-400 hover:text-rose-500 dark:border-white/10 dark:text-slate-300"
              >
                <RotateCcw className="h-4 w-4" /> Revert
              </button>
            )}

            <button
              type="button"
              onClick={onSave}
              disabled={saving || !dirty}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-200/60 dark:hover:bg-white/10"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar */}
        <aside
          className={`${
            navOpen ? 'block' : 'hidden'
          } fixed inset-x-4 top-[68px] z-30 rounded-2xl border border-slate-200 bg-white p-2 shadow-glass dark:border-white/10 dark:bg-[#0a0f1d] lg:static lg:block lg:w-60 lg:shrink-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <nav className="grid gap-1 lg:sticky lg:top-24">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  setTab(n.id)
                  setNavOpen(false)
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === n.id
                    ? 'bg-brand-gradient text-white shadow-glow'
                    : 'text-slate-600 hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main panel */}
        <main className="min-w-0 flex-1">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-glass dark:border-white/10 dark:bg-[#0a0f1d] sm:p-7">
            {tab === 'content' && <ResumeEditor />}
            {tab === 'theme' && <ThemeCustomizer />}
            {tab === 'layout' && <SectionControl />}
            {tab === 'interactive' && <InteractiveControls />}
            {tab === 'preview' && <LivePreview />}
          </div>
        </main>
      </div>
    </div>
  )
}
