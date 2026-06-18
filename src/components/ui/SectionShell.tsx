import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionShellProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

/** Consistent padded section with an animated, centered heading block. */
export function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`print-section relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 ${className}`}
    >
      <Reveal direction="up" className="mb-10 text-center sm:mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  )
}
