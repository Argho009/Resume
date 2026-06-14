import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import TreeHub from '../components/TreeHub'
import ContactCard from '../components/ContactCard'
import { profile, highlights } from '../data/portfolio'

export default function Home() {
  usePageTitle('Home')

  return (
    <>
      <section className="min-h-screen flex items-center py-28">
        <div className="page-container w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel"
            >
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">{profile.availability}</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                {profile.name}
              </h1>
              <p className="text-lg text-white/70 mb-1">{profile.title}</p>
              <p className="text-sm text-white/40 mb-6">{profile.tagline}</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {highlights.map((h) => (
                  <div key={h.label} className="glass rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-display font-semibold text-white/90">{h.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-wide mt-0.5">{h.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                  Projects <ArrowRight size={14} />
                </Link>
                <a href={profile.resumeUrl} download className="btn-ghost inline-flex items-center gap-2">
                  <Download size={14} /> Resume
                </a>
                <Link to="/contact" className="btn-ghost inline-flex items-center gap-2">
                  Contact
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TreeHub />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="page-container">
          <ContactCard />
        </div>
      </section>
    </>
  )
}
