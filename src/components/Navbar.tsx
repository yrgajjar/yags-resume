import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, Moon, Share2, Sun, X, Lock } from 'lucide-react'
import { useResumeStore } from '../store/resumeStore'
import { SECTION_LABELS } from '../types'
import { exportPdf } from '../utils/pdf'
import { copyShareLink } from '../utils/share'

export function Navbar() {
  const name = useResumeStore((s) => s.resume.hero.name)
  const sections = useResumeStore((s) => s.settings.sections)
  const mode = useResumeStore((s) => s.settings.theme.mode)
  const patchTheme = useResumeStore((s) => s.patchTheme)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = sections.filter((s) => s.enabled)

  const toggleMode = () => patchTheme({ mode: mode === 'dark' ? 'light' : 'dark' })

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? 'glass-strong mx-3 shadow-glass' : 'mx-3 bg-transparent'
        }`}
      >
        <a href="#hero" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-sm text-white">
            {name.charAt(0)}
          </span>
          <span className="hidden sm:block">{name.split(' ')[0]}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-soft hover:text-primary dark:text-slate-300"
            >
              {SECTION_LABELS[s.id]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton label="Toggle theme" onClick={toggleMode}>
            {mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </IconButton>
          <IconButton label="Copy share link" onClick={() => void copyShareLink()}>
            <Share2 className="h-5 w-5" />
          </IconButton>
          <IconButton label="Download PDF" onClick={exportPdf}>
            <Download className="h-5 w-5" />
          </IconButton>
          <Link
            to="/admin"
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-slate-200 sm:inline-flex"
          >
            <Lock className="h-3.5 w-3.5" /> Admin
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-primary-soft dark:text-slate-300 lg:hidden"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mx-3 mt-2 rounded-2xl p-3 lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary-soft hover:text-primary dark:text-slate-200"
                >
                  {SECTION_LABELS[s.id]}
                </a>
              ))}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary"
              >
                <Lock className="h-4 w-4" /> Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-primary-soft hover:text-primary dark:text-slate-300"
    >
      {children}
    </button>
  )
}
