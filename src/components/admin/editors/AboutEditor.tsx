import { useResumeStore } from '../../../store/resumeStore'
import { EditorPanel } from '../fields'
import { RichTextEditor } from '../RichTextEditor'

export function AboutEditor() {
  const about = useResumeStore((s) => s.resume.about)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  return (
    <EditorPanel title="About" description="Your professional summary. Supports rich text.">
      <RichTextEditor
        value={about.summary}
        onChange={(html) => setResume({ ...resume, about: { summary: html } })}
        placeholder="Write a compelling professional summary…"
      />
    </EditorPanel>
  )
}
