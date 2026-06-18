import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { useResumeStore } from '../../store/resumeStore'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { Badge } from '../ui/Badge'
import { exportPdf } from '../../utils/pdf'

export function Hero() {
  const hero = useResumeStore((s) => s.resume.hero)
  const highlights = useResumeStore((s) => s.resume.highlights)
  const animations = useResumeStore((s) => s.settings.interactive.animations)
  const showCounters = useResumeStore((s) => s.settings.interactive.counters)

  const initials = hero.name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const container = animations
    ? {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }
    : undefined
  const item = animations
    ? {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }
    : undefined

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* Animated aurora background */}
      <div className="no-print absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`aurora left-[-10%] top-[-10%] h-[28rem] w-[28rem] opacity-50 ${
            animations ? 'animate-float' : ''
          }`}
        />
        <div
          className={`aurora bottom-[-15%] right-[-5%] h-[32rem] w-[32rem] opacity-40 ${
            animations ? 'animate-float' : ''
          }`}
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,transparent,rgb(248_250_252))] dark:bg-[radial-gradient(60%_60%_at_50%_0%,transparent,#070b18)]" />
      </div>

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
        variants={container}
        initial={animations ? 'hidden' : false}
        animate={animations ? 'show' : false}
      >
        <div>
          <motion.div variants={item} className="mb-5 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <Badge key={h.id}>{h.label}</Badge>
            ))}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {hero.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-xl font-semibold text-gradient sm:text-2xl"
          >
            {hero.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg"
          >
            {hero.tagline}
          </motion.p>

          <motion.div variants={item} className="no-print mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mail className="h-4 w-4" /> Get in touch
            </a>
            <button
              type="button"
              onClick={exportPdf}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-slate-200"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </motion.div>

          {showCounters && hero.counters.length > 0 && (
            <motion.div
              variants={item}
              className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
            >
              {hero.counters.map((c) => (
                <div key={c.id}>
                  <div className="text-3xl font-extrabold text-gradient sm:text-4xl">
                    <AnimatedCounter value={c.value} suffix={c.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {c.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Avatar / initials medallion */}
        <motion.div variants={item} className="mx-auto hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-brand-gradient opacity-30 blur-2xl" />
            <div className="glass-strong relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full xl:h-72 xl:w-72">
              {hero.avatarUrl ? (
                <img
                  src={hero.avatarUrl}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-7xl font-extrabold text-gradient">{initials}</span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="no-print absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 transition-colors hover:text-primary"
        aria-label="Scroll to about"
      >
        <ArrowDown className={`h-6 w-6 ${animations ? 'animate-bounce' : ''}`} />
      </a>
    </section>
  )
}
