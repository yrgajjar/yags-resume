import { Reorder, useDragControls } from 'framer-motion'
import { GripVertical, Eye, EyeOff } from 'lucide-react'
import { useResumeStore } from '../../../store/resumeStore'
import { SECTION_LABELS, type SectionConfig } from '../../../types'
import { Switch } from '../Switch'
import { EditorPanel } from '../fields'

export function SectionControl() {
  const sections = useResumeStore((s) => s.settings.sections)
  const setSections = useResumeStore((s) => s.setSections)

  const toggle = (id: SectionConfig['id'], enabled: boolean) =>
    setSections(sections.map((s) => (s.id === id ? { ...s, enabled } : s)))

  return (
    <EditorPanel
      title="Section Control"
      description="Drag to reorder sections, and toggle them on or off. The Hero always stays at the top."
    >
      <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-3">
        {sections.map((section) => (
          <SectionRow
            key={section.id}
            section={section}
            onToggle={(v) => toggle(section.id, v)}
          />
        ))}
      </Reorder.Group>
    </EditorPanel>
  )
}

function SectionRow({
  section,
  onToggle,
}: {
  section: SectionConfig
  onToggle: (v: boolean) => void
}) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab touch-none text-slate-400 transition-colors hover:text-primary active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-2">
        {section.enabled ? (
          <Eye className="h-4 w-4 text-primary" />
        ) : (
          <EyeOff className="h-4 w-4 text-slate-400" />
        )}
        <span
          className={`font-semibold ${
            section.enabled ? '' : 'text-slate-400 line-through'
          }`}
        >
          {SECTION_LABELS[section.id]}
        </span>
      </div>

      <Switch checked={section.enabled} onChange={onToggle} label={`Toggle ${section.id}`} />
    </Reorder.Item>
  )
}
