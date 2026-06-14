import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-28 pb-10 md:pt-36 md:pb-12">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel"
        >
          <h1 className="section-title mb-3">{title}</h1>
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  )
}
