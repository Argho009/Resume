import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'




/* ── Expanding water ring (on-load animation) ── */
function WaterRing({ delay, size, opacity }: { delay: number; size: number; opacity: number }) {
  return (
    <motion.div
      className="intro-ring"
      style={{ width: size, height: size * 0.32 }}
      initial={{ scale: 0, opacity }}
      animate={{ scale: [0, 1], opacity: [opacity, 0] }}
      transition={{ duration: 2.2, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.5 }}
    />
  )
}

/* ── Ink-brush SVG divider ── */
function InkDivider() {
  return (
    <motion.svg
      width="180" height="12" viewBox="0 0 180 12"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, delay: 1.0, ease: 'easeOut' }}
      style={{ transformOrigin: 'center' }}
    >
      <path
        d="M 0 6 Q 20 2 45 6 Q 70 10 90 6 Q 110 2 135 6 Q 155 10 180 6"
        stroke="rgba(255,185,210,0.55)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="90" cy="6" r="2.5" fill="rgba(255,185,210,0.6)" />
      <circle cx="45" cy="6" r="1.5" fill="rgba(255,185,210,0.35)" />
      <circle cx="135" cy="6" r="1.5" fill="rgba(255,185,210,0.35)" />
    </motion.svg>
  )
}

/* ── Staggered letter reveal ── */
function AnimatedName({ text, className, baseDelay }: { text: string; className: string; baseDelay: number }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, delay: baseDelay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ══════════════════════════════════════════════════════════════ */

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false)
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)
  const hasEntered = useRef(false)

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    if (hasEntered.current) return
    hasEntered.current = true

    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    if ('touches' in e && e.touches.length > 0) {
      cx = e.touches[0].clientX; cy = e.touches[0].clientY
    } else if ('clientX' in e) {
      cx = e.clientX; cy = e.clientY
    }

    const id = rippleId.current++
    setClickRipples((r) => [...r, { id, x: cx, y: cy }])

    setTimeout(() => { setExiting(true); setTimeout(onEnter, 950) }, 350)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          className="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.06 }}
          transition={{ duration: 0.95, ease: 'easeInOut' }}
          onClick={handleInteraction}
          onTouchStart={handleInteraction}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleInteraction(e) }}
          role="button"
          tabIndex={0}
          aria-label="Click anywhere to enter"
        >
          {/* ── Radial vignette darkening ONLY the edges — centre stays clear ── */}
          <div className="intro-vignette" />

          {/* ── Click burst ripples ── */}
          {clickRipples.map((r) => (
            <motion.div
              key={r.id}
              className="intro-click-ripple"
              style={{ left: r.x, top: r.y }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 18, opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            />
          ))}

          {/* ══ Central atmospheric block — no heavy card, just floating text ══ */}
          <div className="intro-stage">

            {/* Ambient glow orb behind text */}
            <motion.div
              className="intro-glow-orb"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.55, 0.45, 0.55], scale: [0.6, 1, 1.05, 1] }}
              transition={{ duration: 3.5, ease: 'easeOut', times: [0, 0.4, 0.7, 1], repeat: Infinity, repeatType: 'mirror', repeatDelay: 1 }}
            />

            {/* Expanding water rings — appear from centre like a stone dropped in the lake */}
            <div className="intro-rings">
              <WaterRing delay={0.2} size={280} opacity={0.22} />
              <WaterRing delay={0.9} size={460} opacity={0.14} />
              <WaterRing delay={1.7} size={640} opacity={0.09} />
            </div>

            {/* Season label */}
            <motion.p
              className="intro-season"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              ✦ &nbsp; Portfolio &nbsp; ✦
            </motion.p>

            {/* Name — letter by letter */}
            <h1 className="intro-name">
              <AnimatedName text="Arghodeep" className="intro-name-first" baseDelay={0.55} />
              <br />
              <AnimatedName text="Chowdhury" className="intro-name-last" baseDelay={0.85} />
            </h1>

            {/* Ink-brush wavy divider */}
            <InkDivider />

            {/* Title */}
            <motion.p
              className="intro-role"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              trying to be AI/ML Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.85 }}
            >
              Python · React · Cloud · Intelligence
            </motion.p>

            {/* CTA — breathing petal + text */}
            <motion.div
              className="intro-cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.3 }}
            >
              <motion.span
                style={{ display: 'inline-block', fontSize: 14 }}
                animate={{ y: [0, -5, 0], rotate: [0, 10, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🌸
              </motion.span>
              <span className="intro-cta-text">click anywhere to enter</span>
              <motion.span
                style={{ display: 'inline-block', fontSize: 14 }}
                animate={{ y: [0, -5, 0], rotate: [0, -10, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                🌸
              </motion.span>
            </motion.div>
          </div>

          {/* ── Corner sakura branch silhouettes ── */}
          <motion.div
            className="intro-branch intro-branch-tl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <path d="M 10 130 Q 30 90 60 60 Q 80 40 110 20" stroke="rgba(255,170,195,0.22)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 60 60 Q 80 45 100 55" stroke="rgba(255,170,195,0.18)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 40 90 Q 60 80 75 90" stroke="rgba(255,170,195,0.15)" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="110" cy="20" r="5" fill="rgba(255,185,210,0.3)" />
              <circle cx="100" cy="55" r="4" fill="rgba(255,185,210,0.25)" />
              <circle cx="75"  cy="90" r="3" fill="rgba(255,185,210,0.2)" />
              <circle cx="95"  cy="18" r="3.5" fill="rgba(255,185,210,0.2)" />
            </svg>
          </motion.div>

          <motion.div
            className="intro-branch intro-branch-br"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M 10 130 Q 30 90 60 60 Q 80 40 110 20" stroke="rgba(255,170,195,0.20)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 60 60 Q 80 45 100 55" stroke="rgba(255,170,195,0.16)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="110" cy="20" r="5" fill="rgba(255,185,210,0.25)" />
              <circle cx="100" cy="55" r="4" fill="rgba(255,185,210,0.20)" />
            </svg>
          </motion.div>

          {/* Thin horizontal rule at very bottom */}
          <motion.div
            className="intro-horizon"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2.0, delay: 0.6, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
