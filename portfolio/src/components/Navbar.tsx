import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/certificates', label: 'Certs' },
  { path: '/education', label: 'Education' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8">
      <div className={`rounded-2xl transition-all duration-300 ${scrolled ? 'glass-strong' : 'glass'}`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="font-display text-base font-semibold text-white/90">
            AC
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    active
                      ? 'glass text-white !py-1.5 !px-3'
                      : 'text-white/55 hover:text-white/85'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <a href={profile.resumeUrl} download className="btn-primary !py-1.5 !px-3 !text-xs ml-2">
              Resume
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white/60"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="glass-strong mt-2 rounded-2xl overflow-hidden lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-5 py-3 text-sm border-b border-white/[0.06] last:border-0 ${
                  location.pathname === link.path ? 'text-white bg-white/[0.06]' : 'text-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
