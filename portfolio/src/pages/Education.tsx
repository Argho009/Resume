import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import GlassCard from '../components/GlassCard'
import { education } from '../data/portfolio'

export default function Education() {
  usePageTitle('Education')
  return (
    <div className="pb-16">
      <PageHero
        title="Education"
        subtitle="Computer Science Engineering at SSIPMT, Raipur."
      />

      <div className="page-container space-y-4">
        <GlassCard hover={false}>
          <h2 className="font-display text-xl font-semibold text-white/90 mb-1">
            {education.degree} — {education.major}
          </h2>
          <p className="text-sm text-white/50 mb-1">{education.university}</p>
          <p className="text-xs text-white/35 mb-4">
            {education.location} · {education.duration}
          </p>
          <p className="text-sm text-white/45 leading-relaxed">{education.description}</p>
        </GlassCard>

        <div className="grid sm:grid-cols-2 gap-4">
          {education.coursework.map((course, i) => (
            <GlassCard key={course.name} delay={i * 0.03}>
              <h4 className="font-medium text-sm text-white/85 mb-1">{course.name}</h4>
              <p className="text-xs text-white/40">{course.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <span className="tag mb-3 inline-block">Capstone</span>
          <h3 className="font-display text-lg font-semibold text-white/90 mb-2">{education.capstone.title}</h3>
          <p className="text-sm text-white/45 leading-relaxed mb-4">{education.capstone.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {education.capstone.technologies.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
