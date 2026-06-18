import { Trash2 } from 'lucide-react'
import { useResumeStore } from '../../../store/resumeStore'
import type { Skill, SkillCategory } from '../../../types'
import { uid } from '../../../utils/uid'
import { AddButton, EditorPanel, EntryCard, TextInput } from '../fields'

export function SkillsEditor() {
  const categories = useResumeStore((s) => s.resume.skillCategories)
  const resume = useResumeStore((s) => s.resume)
  const setResume = useResumeStore((s) => s.setResume)

  const setCategories = (skillCategories: SkillCategory[]) =>
    setResume({ ...resume, skillCategories })

  const updateCategory = (id: string, patch: Partial<SkillCategory>) =>
    setCategories(categories.map((c) => (c.id === id ? { ...c, ...patch } : c)))

  const addCategory = () =>
    setCategories([...categories, { id: uid('cat'), name: 'New category', skills: [] }])

  const removeCategory = (id: string) => setCategories(categories.filter((c) => c.id !== id))

  const updateSkill = (catId: string, skillId: string, patch: Partial<Skill>) =>
    updateCategory(catId, {
      skills: categories
        .find((c) => c.id === catId)!
        .skills.map((s) => (s.id === skillId ? { ...s, ...patch } : s)),
    })

  const addSkill = (catId: string) => {
    const cat = categories.find((c) => c.id === catId)!
    updateCategory(catId, { skills: [...cat.skills, { id: uid('skill'), name: 'New skill', level: 70 }] })
  }

  const removeSkill = (catId: string, skillId: string) => {
    const cat = categories.find((c) => c.id === catId)!
    updateCategory(catId, { skills: cat.skills.filter((s) => s.id !== skillId) })
  }

  return (
    <EditorPanel title="Skills" description="Group skills into categories with proficiency levels.">
      <div className="grid gap-5">
        {categories.map((cat) => (
          <EntryCard key={cat.id} onDelete={() => removeCategory(cat.id)} title={cat.name || 'Category'}>
            <TextInput
              label="Category name"
              value={cat.name}
              onChange={(v) => updateCategory(cat.id, { name: v })}
            />
            <div className="mt-4 space-y-3">
              {cat.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-3 rounded-xl bg-slate-100/70 p-3 dark:bg-white/5"
                >
                  <input
                    value={skill.name}
                    onChange={(e) => updateSkill(cat.id, skill.id, { name: e.target.value })}
                    placeholder="Skill name"
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5"
                  />
                  <div className="flex w-40 shrink-0 items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={skill.level}
                      onChange={(e) => updateSkill(cat.id, skill.id, { level: Number(e.target.value) })}
                      className="w-full accent-[rgb(var(--color-primary))]"
                    />
                    <span className="w-9 text-right text-xs font-semibold text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(cat.id, skill.id)}
                    aria-label="Remove skill"
                    className="shrink-0 rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <AddButton label="Add skill" onClick={() => addSkill(cat.id)} />
            </div>
          </EntryCard>
        ))}
      </div>
      <div className="mt-5">
        <AddButton label="Add category" onClick={addCategory} />
      </div>
    </EditorPanel>
  )
}
