import { useResumeStore } from '../../../store/resumeStore'
import type { ExperienceItem } from '../../../types'
import { uid } from '../../../utils/uid'
import { AddButton, EditorPanel, EntryCard, FieldLabel, TextInput } from '../fields'
import { RichTextEditor } from '../RichTextEditor'

export function ExperienceEditor() {
  const experience = useResumeStore((s) => s.resume.experience)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const setExperience = (items: ExperienceItem[]) => setResume({ ...resume, experience: items })

  const update = (id: string, patch: Partial<ExperienceItem>) =>
    setExperience(experience.map((e) => (e.id === id ? { ...e, ...patch } : e)))

  const add = () =>
    setExperience([
      {
        id: uid('exp'),
        company: 'Company',
        role: 'Role',
        start: '2024',
        end: 'Present',
        location: '',
        description: '<ul><li>Key achievement</li></ul>',
      },
      ...experience,
    ])

  const remove = (id: string) => setExperience(experience.filter((e) => e.id !== id))

  return (
    <EditorPanel title="Experience" description="Your work history, newest first.">
      <div className="grid gap-5">
        {experience.map((item) => (
          <EntryCard
            key={item.id}
            onDelete={() => remove(item.id)}
            title={`${item.role} · ${item.company}`}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <TextInput label="Role" value={item.role} onChange={(v) => update(item.id, { role: v })} />
              <TextInput label="Company" value={item.company} onChange={(v) => update(item.id, { company: v })} />
              <TextInput label="Start" value={item.start} onChange={(v) => update(item.id, { start: v })} />
              <TextInput label="End" value={item.end} onChange={(v) => update(item.id, { end: v })} />
              <div className="sm:col-span-2">
                <TextInput
                  label="Location (optional)"
                  value={item.location ?? ''}
                  onChange={(v) => update(item.id, { location: v })}
                />
              </div>
            </div>
            <div className="mt-3">
              <FieldLabel>Description</FieldLabel>
              <RichTextEditor
                value={item.description}
                onChange={(html) => update(item.id, { description: html })}
                placeholder="Describe your impact…"
              />
            </div>
          </EntryCard>
        ))}
      </div>
      <div className="mt-5">
        <AddButton label="Add experience" onClick={add} />
      </div>
    </EditorPanel>
  )
}
