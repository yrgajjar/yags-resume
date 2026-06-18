import { useResumeStore } from '../../../store/resumeStore'
import { EditorPanel, TextInput } from '../fields'

export function ContactEditor() {
  const contact = useResumeStore((s) => s.resume.contact)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const update = (patch: Partial<typeof contact>) =>
    setResume({ ...resume, contact: { ...contact, ...patch } })

  return (
    <EditorPanel title="Contact" description="How people can reach you.">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Email" type="email" value={contact.email} onChange={(v) => update({ email: v })} />
        <TextInput label="Phone" value={contact.phone} onChange={(v) => update({ phone: v })} />
        <TextInput
          label="Location (optional)"
          value={contact.location ?? ''}
          onChange={(v) => update({ location: v })}
        />
        <TextInput
          label="LinkedIn URL (optional)"
          value={contact.linkedin ?? ''}
          onChange={(v) => update({ linkedin: v })}
          placeholder="https://linkedin.com/in/…"
        />
        <TextInput
          label="GitHub URL (optional)"
          value={contact.github ?? ''}
          onChange={(v) => update({ github: v })}
          placeholder="https://github.com/…"
        />
        <TextInput
          label="Website URL (optional)"
          value={contact.website ?? ''}
          onChange={(v) => update({ website: v })}
          placeholder="https://…"
        />
      </div>
    </EditorPanel>
  )
}
