import { ExternalLink } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import GlassCard from '../components/GlassCard'
import { certificates } from '../data/portfolio'

export default function Certificates() {
  usePageTitle('Certificates')
  return (
    <div className="pb-16">
      <PageHero
        title="Certificates"
        subtitle="ML training and academic achievements."
      />

      <div className="page-container grid gap-4">
        {certificates.map((cert, i) => (
          <GlassCard key={cert.id} delay={i * 0.05}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-white/90">{cert.name}</h3>
              {'score' in cert && cert.score && <span className="tag">{cert.score}</span>}
            </div>
            <p className="text-sm text-white/45 mb-1">{cert.organization}</p>
            <p className="text-xs text-white/30 mb-4">{cert.date}</p>
            <p className="text-sm text-white/45 leading-relaxed mb-4">{cert.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-xs text-white/25 font-mono">{cert.credentialId}</span>
              {cert.link !== '#' && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/50 hover:text-white/80 flex items-center gap-1"
                >
                  Verify <ExternalLink size={11} />
                </a>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
