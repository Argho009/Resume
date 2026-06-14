import { Mail, Phone, Github, Linkedin, MapPin, Clock, Download } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function ContactCard() {
  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: Github, label: 'GitHub', href: profile.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
  ]

  return (
    <div className="glass-panel">
      <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Get in touch</p>
      <h2 className="font-display text-2xl font-semibold text-white mb-2">Let's connect</h2>
      <p className="text-sm text-white/45 mb-6">{profile.mission}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {links.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="glass flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.06] transition-colors"
          >
            <Icon size={16} className="text-white/50 shrink-0" />
            <span className="text-sm text-white/70 truncate">{label}</span>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-white/35 mb-6">
        <span className="flex items-center gap-1.5 tag !text-white/45">
          <MapPin size={12} /> {profile.location}
        </span>
        <span className="flex items-center gap-1.5 tag !text-white/45">
          <Clock size={12} /> {profile.timezone}
        </span>
        <span className="tag !text-white/45">{profile.remotePreference}</span>
      </div>

      <div className="mb-6">
        <p className="text-xs text-white/35 uppercase tracking-wider mb-3">Looking for</p>
        <div className="flex flex-wrap gap-2">
          {profile.lookingFor.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>

      <a href={profile.resumeUrl} download className="btn-primary inline-flex items-center gap-2">
        <Download size={14} /> Download Resume
      </a>
    </div>
  )
}
