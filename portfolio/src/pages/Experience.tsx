import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import GlassCard from '../components/GlassCard'
import { experiences } from '../data/portfolio'

export default function Experience() {
  usePageTitle('Experience')

  return (
    <div className="pb-16">
      <PageHero
        title="Experience"
        subtitle="Projects, training, and academic milestones."
      />

      <div className="page-container space-y-4">
        {experiences.map((exp, i) => (
          <GlassCard key={exp.id} delay={i * 0.05}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-medium text-white/90">{exp.title}</h3>
                <p className="text-sm text-white/50">{exp.company}</p>
              </div>
              <span className="tag">{exp.duration}</span>
            </div>

            <p className="text-xs text-white/35 mb-4">{exp.location}</p>

            <p className="text-xs text-white/35 uppercase tracking-wider mb-2">Responsibilities</p>
            <ul className="space-y-1.5 mb-4">
              {exp.responsibilities.map((r) => (
                <li key={r} className="text-sm text-white/45 flex gap-2">
                  <span className="text-white/25">·</span> {r}
                </li>
              ))}
            </ul>

            <p className="text-xs text-white/35 uppercase tracking-wider mb-2">Impact</p>
            <ul className="space-y-1.5 mb-4">
              {exp.achievements.map((a) => (
                <li key={a} className="text-sm text-white/50 flex gap-2">
                  <span className="text-white/40">→</span> {a}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
