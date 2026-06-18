import { Link } from 'react-router-dom'
import { useResumeStore } from '../store/resumeStore'

export function Footer() {
  const name = useResumeStore((s) => s.resume.hero.name)
  const year = new Date().getFullYear()

  return (
    <footer className="no-print border-t border-slate-200/70 px-5 py-10 text-center dark:border-white/10">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {year} {name}. Built with React, Tailwind &amp; Firebase.
      </p>
      <Link
        to="/admin"
        className="mt-2 inline-block text-xs font-medium text-slate-400 underline-offset-2 hover:text-primary hover:underline"
      >
        Admin
      </Link>
    </footer>
  )
}
