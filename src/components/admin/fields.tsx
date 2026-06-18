import type { ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5'

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  )
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    </label>
  )
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </span>
  )
}

/** A card wrapping a single repeatable entry (experience, education, etc). */
export function EntryCard({
  children,
  onDelete,
  title,
}: {
  children: ReactNode
  onDelete?: () => void
  title?: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
      {(title || onDelete) && (
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300">{title}</h4>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-primary/40 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
    >
      <Plus className="h-4 w-4" /> {label}
    </button>
  )
}

export function EditorPanel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
