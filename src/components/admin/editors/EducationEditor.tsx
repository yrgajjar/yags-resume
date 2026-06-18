import { useResumeStore } from '../../../store/resumeStore'
import type { EducationItem } from '../../../types'
import { uid } from '../../../utils/uid'
import { AddButton, EditorPanel, EntryCard, TextInput } from '../fields'

export function EducationEditor() {
  const education = useResumeStore((s) => s.resume.education)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const setEducation = (items: EducationItem[]) => setResume({ ...resume, education: items })

  const update = (id: string, patch: Partial<EducationItem>) =>
    setEducation(education.map((e) => (e.id === id ? { ...e, ...patch } : e)))

  const add = () =>
    setEducation([
      ...education,
      { id: uid('edu'), institution: 'Institution', degree: 'Degree', start: '2020', end: '2024', description: '' },
    ])

  const remove = (id: string) => setEducation(education.filter((e) => e.id !== id))

  return (
    <EditorPanel title="Education" description="Degrees, schools and study highlights.">
      <div className="grid gap-5">
        {education.map((item) => (
          <EntryCard key={item.id} onDelete={() => remove(item.id)} title={item.degree || 'Education'}>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextInput label="Degree" value={item.degree} onChange={(v) => update(item.id, { degree: v })} />
              <TextInput
                label="Institution"
                value={item.institution}
                onChange={(v) => update(item.id, { institution: v })}
              />
              <TextInput label="Start" value={item.start} onChange={(v) => update(item.id, { start: v })} />
              <TextInput label="End" value={item.end} onChange={(v) => update(item.id, { end: v })} />
              <div className="sm:col-span-2">
                <TextInput
                  label="Description (optional)"
                  value={item.description ?? ''}
                  onChange={(v) => update(item.id, { description: v })}
                />
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
      <div className="mt-5">
        <AddButton label="Add education" onClick={add} />
      </div>
    </EditorPanel>
  )
}
