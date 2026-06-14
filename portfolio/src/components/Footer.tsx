import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { profile } from '../data/portfolio'

const navLinks = ['Skills', 'Projects', 'Experience', 'Contact']

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-6 md:px-8">
      <div className="max-w-5xl mx-auto glass rounded-2xl px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-white/60">{profile.name}</p>
            <p className="text-xs text-white/30">{profile.availability} · {profile.location}</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Mail, href: `mailto:${profile.email}` },
              { icon: Phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
              { icon: Github, href: profile.github },
              { icon: Linkedin, href: profile.linkedin },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} · Updated {profile.lastUpdated}</p>
          <div className="flex gap-4 text-xs text-white/35">
            {navLinks.map((label) => (
              <Link key={label} to={`/${label.toLowerCase()}`} className="hover:text-white/60">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
