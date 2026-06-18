import { useResumeStore } from '../../../store/resumeStore'
import type { Counter } from '../../../types'
import { uid } from '../../../utils/uid'
import { AddButton, EditorPanel, EntryCard, NumberInput, TextInput } from '../fields'

export function HeroEditor() {
  const hero = useResumeStore((s) => s.resume.hero)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const update = (patch: Partial<typeof hero>) =>
    setResume({ ...resume, hero: { ...hero, ...patch } })

  const updateCounter = (id: string, patch: Partial<Counter>) =>
    update({ counters: hero.counters.map((c) => (c.id === id ? { ...c, ...patch } : c)) })

  const addCounter = () =>
    update({
      counters: [...hero.counters, { id: uid('cnt'), label: 'New stat', value: 0, suffix: '+' }],
    })

  const removeCounter = (id: string) =>
    update({ counters: hero.counters.filter((c) => c.id !== id) })

  return (
    <EditorPanel title="Hero" description="The headline at the top of your resume.">
      <div className="grid gap-4">
        <TextInput label="Full name" value={hero.name} onChange={(v) => update({ name: v })} />
        <TextInput label="Role / Title" value={hero.role} onChange={(v) => update({ role: v })} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Tagline
          </span>
          <textarea
            value={hero.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <TextInput
          label="Avatar image URL (optional)"
          value={hero.avatarUrl ?? ''}
          onChange={(v) => update({ avatarUrl: v })}
          placeholder="https://…/photo.jpg"
        />
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Animated counters
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {hero.counters.map((c) => (
            <EntryCard key={c.id} onDelete={() => removeCounter(c.id)} title={c.label || 'Counter'}>
              <div className="grid gap-3">
                <TextInput label="Label" value={c.label} onChange={(v) => updateCounter(c.id, { label: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <NumberInput
                    label="Value"
                    value={c.value}
                    min={0}
                    max={100000}
                    onChange={(v) => updateCounter(c.id, { value: v })}
                  />
                  <TextInput
                    label="Suffix"
                    value={c.suffix ?? ''}
                    onChange={(v) => updateCounter(c.id, { suffix: v })}
                    placeholder="+ , % …"
                  />
                </div>
              </div>
            </EntryCard>
          ))}
        </div>
        <div className="mt-4">
          <AddButton label="Add counter" onClick={addCounter} />
        </div>
      </div>
    </EditorPanel>
  )
}
