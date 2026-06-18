import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const accents = {
  success: 'text-emerald-500',
  error: 'text-rose-500',
  info: 'text-primary',
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.variant]
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => dismiss(t.id)}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="glass-strong pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 shadow-glass-lg dark:text-slate-100"
            >
              <Icon className={`h-5 w-5 ${accents[t.variant]}`} />
              {t.message}
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
