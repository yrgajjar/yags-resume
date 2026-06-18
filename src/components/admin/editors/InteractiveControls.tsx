import { Sparkles, Hash, X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { useResumeStore } from '../../../store/resumeStore'
import { uid } from '../../../utils/uid'
import { EditorPanel, FieldLabel } from '../fields'
import { Switch } from '../Switch'

export function InteractiveControls() {
  const interactive = useResumeStore((s) => s.settings.interactive)
  const patchInteractive = useResumeStore((s) => s.patchInteractive)

  const highlights = useResumeStore((s) => s.resume.highlights)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const [draft, setDraft] = useState('')

  const addHighlight = () => {
    const label = draft.trim()
    if (!label) return
    setResume({ ...resume, highlights: [...highlights, { id: uid('h'), label }] })
    setDraft('')
  }

  const removeHighlight = (id: string) =>
    setResume({ ...resume, highlights: highlights.filter((h) => h.id !== id) })

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addHighlight()
    }
  }

  return (
    <EditorPanel
      title="Interactive Controls"
      description="Toggle animations, counters and manage the highlight badges shown in your hero."
    >
      <div className="grid gap-4">
        <ToggleRow
          icon={<Sparkles className="h-5 w-5" />}
          title="Scroll & hover animations"
          desc="Reveal-on-scroll, hover lifts and motion across the site."
          checked={interactive.animations}
          onChange={(v) => patchInteractive({ animations: v })}
        />
        <ToggleRow
          icon={<Hash className="h-5 w-5" />}
          title="Animated counters"
          desc="Count-up stats in the hero section."
          checked={interactive.counters}
          onChange={(v) => patchInteractive({ counters: v })}
        />
      </div>

      <div className="mt-8">
        <FieldLabel>Highlight badges</FieldLabel>
        <div className="mb-3 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <span
              key={h.id}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary"
            >
              {h.label}
              <button
                type="button"
                onClick={() => removeHighlight(h.id)}
                aria-label={`Remove ${h.label}`}
                className="rounded-full p-0.5 hover:bg-primary/20"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {highlights.length === 0 && (
            <span className="text-sm text-slate-400">No badges yet.</span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Add a badge and press Enter"
            className="flex-1 rounded-xl border border-slate-300 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5"
          />
          <button
            type="button"
            onClick={addHighlight}
            className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
          >
            Add
          </button>
        </div>
      </div>
    </EditorPanel>
  )
}

function ToggleRow({
  icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </span>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}
