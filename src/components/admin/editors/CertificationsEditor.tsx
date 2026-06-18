import { useResumeStore } from '../../../store/resumeStore'
import type { CertificationItem } from '../../../types'
import { uid } from '../../../utils/uid'
import { AddButton, EditorPanel, EntryCard, TextInput } from '../fields'

export function CertificationsEditor() {
  const certifications = useResumeStore((s) => s.resume.certifications)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const setCerts = (items: CertificationItem[]) => setResume({ ...resume, certifications: items })

  const update = (id: string, patch: Partial<CertificationItem>) =>
    setCerts(certifications.map((c) => (c.id === id ? { ...c, ...patch } : c)))

  const add = () =>
    setCerts([
      ...certifications,
      { id: uid('cert'), name: 'Certification', issuer: 'Issuer', date: '2024', credentialUrl: '' },
    ])

  const remove = (id: string) => setCerts(certifications.filter((c) => c.id !== id))

  return (
    <EditorPanel title="Certifications" description="Professional certifications and credentials.">
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((item) => (
          <EntryCard key={item.id} onDelete={() => remove(item.id)} title={item.name || 'Certification'}>
            <div className="grid gap-3">
              <TextInput label="Name" value={item.name} onChange={(v) => update(item.id, { name: v })} />
              <TextInput label="Issuer" value={item.issuer} onChange={(v) => update(item.id, { issuer: v })} />
              <TextInput label="Date" value={item.date} onChange={(v) => update(item.id, { date: v })} />
              <TextInput
                label="Credential URL (optional)"
                value={item.credentialUrl ?? ''}
                onChange={(v) => update(item.id, { credentialUrl: v })}
                placeholder="https://…"
              />
            </div>
          </EntryCard>
        ))}
      </div>
      <div className="mt-5">
        <AddButton label="Add certification" onClick={add} />
      </div>
    </EditorPanel>
  )
}
