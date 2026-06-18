import { useResumeStore } from '../../store/resumeStore'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { SkillBar } from '../ui/SkillBar'

export function Skills() {
  const categories = useResumeStore((s) => s.resume.skillCategories)

  return (
    <SectionShell
      id="skills"
      eyebrow="What I bring"
      title="Skills & Expertise"
      subtitle="A blend of networking, cloud and security with an automation-first mindset."
    >
      <Reveal stagger className="grid gap-6 sm:grid-cols-2">
        {categories.map((cat) => (
          <RevealItem key={cat.id}>
            <GlassCard className="h-full p-7">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                <span className="h-6 w-1.5 rounded-full bg-brand-gradient" />
                {cat.name}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.id} name={skill.name} level={skill.level} />
                ))}
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
