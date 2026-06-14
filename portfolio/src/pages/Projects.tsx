import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { ExternalLink, Github } from 'lucide-react'
import PageHero from '../components/PageHero'
import GlassCard from '../components/GlassCard'
import { projects, projectCategories } from '../data/portfolio'

export default function Projects() {
  usePageTitle('Projects')
  const [filter, setFilter] = useState('All Projects')

  const filtered =
    filter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <div className="pb-16">
      <PageHero
        title="Projects"
        subtitle="AI platforms, web apps, and data quality tools."
      />

      <div className="page-container">
        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                filter === cat
                  ? 'glass-strong text-white'
                  : 'glass text-white/50 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map((project, i) => (
            <GlassCard key={project.id} delay={i * 0.05}>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <span className="tag mb-2 inline-block">{project.category}</span>
                  <h3 className="font-display text-lg font-semibold text-white/90">{project.name}</h3>
                </div>
                <span className="tag">{project.status}</span>
              </div>

              <p className="text-xs text-white/35 mb-3">{project.timeline}</p>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <span className="text-xs text-white/30">{project.role}</span>
                <div className="flex gap-2">
                  {project.links.github !== '#' && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70">
                      <Github size={15} />
                    </a>
                  )}
                  {project.links.live !== '#' && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70">
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
