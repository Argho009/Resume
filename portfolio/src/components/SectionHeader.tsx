import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ label, title, subtitle, align = 'center' }: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {label && (
        <p className={`section-label ${centered ? 'justify-center' : ''}`}>{label}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      {subtitle && (
        <p className={`text-white/45 text-base md:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`divider-glow mt-8 ${centered ? '' : '!mx-0'}`} />
    </motion.div>
  )
}
