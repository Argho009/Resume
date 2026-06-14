import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import GlassCard from '../components/GlassCard'
import { skillBranches, softSkills, languages } from '../data/portfolio'

export default function Skills() {
  usePageTitle('Skills')
  return (
    <div className="pb-16">
      <PageHero
        title="Skills"
        subtitle="Languages, cloud infrastructure, and AI/ML."
      />

      <div className="page-container space-y-10">
        {skillBranches.map((branch) => (
          <section key={branch.id}>
            <h2 className="font-display text-xl font-semibold text-white/90 mb-1">{branch.title}</h2>
            <p className="text-white/40 text-sm mb-5">{branch.subtitle}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {branch.skills.map((skill, si) => (
                <GlassCard key={skill.name} delay={si * 0.03}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white/90">{skill.name}</h3>
                    <span className="tag">{skill.level}</span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed mb-3">{skill.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((tool) => (
                      <span key={tool} className="tag">{tool}</span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        ))}

        <div className="grid md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="font-medium text-white/90 mb-3">Soft Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {softSkills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </GlassCard>
          <GlassCard delay={0.05}>
            <h3 className="font-medium text-white/90 mb-3">Languages</h3>
            <div className="space-y-1">
              {languages.map((l) => (
                <p key={l} className="text-sm text-white/45">{l}</p>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
