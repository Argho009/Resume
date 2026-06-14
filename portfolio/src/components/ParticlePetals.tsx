import { useEffect, useRef } from 'react'

const WATER_LINE = 0.53   // fraction of screen height where water starts

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  maxOpacity: number
  swayOffset: number
  swayAmp: number
  swaySpeed: number
  depth: number
  type: 'petal' | 'bud' | 'speck'
  hue: number
  windPhase: number
  // floating state
  floating: boolean
  floatTimer: number        // counts up from 0
  floatDuration: number     // how long to float before fading
  floatX: number            // drift direction on water
  willLand: boolean         // pre-decided at creation
}

export default function ParticlePetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let petals: Petal[] = []
    let time = 0

    const waterY = () => canvas.height * WATER_LINE

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createPetal = (startY?: number): Petal => {
      const depth = Math.random()
      const type: Petal['type'] =
        Math.random() < 0.55 ? 'petal' : Math.random() < 0.6 ? 'bud' : 'speck'
      const baseSize =
        type === 'speck' ? 2 + Math.random() * 3
        : type === 'bud'  ? 3 + Math.random() * 5
        : 5 + Math.random() * 9
      const size = baseSize * (0.5 + depth * 0.75)
      const maxOpacity =
        type === 'speck'
          ? 0.25 + Math.random() * 0.45
          : (0.35 + Math.random() * 0.55) * (0.5 + depth * 0.5)

      return {
        x: Math.random() * (canvas.width + 200) - 100,
        y: startY ?? -30 - Math.random() * canvas.height * 0.5,
        size,
        speedY: (0.4 + Math.random() * 1.1) * (0.5 + depth * 0.7),
        speedX: -0.8 + Math.random() * 1.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (-0.04 + Math.random() * 0.08) * (depth * 0.5 + 0.5),
        opacity: 0,
        maxOpacity,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmp: 0.5 + Math.random() * 2.0,
        swaySpeed: 0.006 + Math.random() * 0.012,
        depth,
        type,
        hue: 340 + Math.random() * 30,
        windPhase: Math.random() * Math.PI * 2,
        floating: false,
        floatTimer: 0,
        floatDuration: 200 + Math.random() * 300,   // ~3–8 s at 60fps
        floatX: (-0.15 + Math.random() * 0.3),       // slow drift on water
        // ~30% of petals will land on water; specks always blow through
        willLand: type !== 'speck' && Math.random() < 0.30,
      }
    }

    const init = () => {
      resize()
      const count = Math.min(110, Math.max(55, Math.floor(window.innerWidth / 18)))
      petals = Array.from({ length: count }, () =>
        createPetal(Math.random() * canvas.height)
      )
    }

    /* ─── Drawing helpers ─────────────────────────────────── */

    const drawPetalShape = (p: Petal) => {
      const s = p.size
      const color = `hsla(${p.hue}, 95%, ${72 + p.depth * 14}%, ${p.opacity})`
      const glow  = `hsla(${p.hue}, 100%, 88%, ${p.opacity * 0.35})`

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.6)
      grad.addColorStop(0, glow)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, s * 1.6, s * 1.0, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.6)
      ctx.bezierCurveTo( s * 0.6, -s * 0.38,  s * 0.55, s * 0.3, 0, s * 0.55)
      ctx.bezierCurveTo(-s * 0.55,  s * 0.3, -s * 0.6, -s * 0.38, 0, -s * 0.6)
      ctx.fill()

      ctx.strokeStyle = `hsla(${p.hue}, 60%, 95%, ${p.opacity * 0.5})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.45)
      ctx.quadraticCurveTo(s * 0.1, 0, 0, s * 0.45)
      ctx.stroke()
    }

    const drawBudShape = (p: Petal) => {
      const s = p.size
      ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.opacity})`
      ctx.beginPath()
      ctx.ellipse(0, 0, s * 0.55, s * 0.85, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${p.opacity * 0.45})`
      ctx.beginPath()
      ctx.ellipse(-s * 0.12, -s * 0.2, s * 0.18, s * 0.3, -0.4, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawSpeck = (p: Petal) => {
      const s = p.size
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
      grad.addColorStop(0, `hsla(${p.hue}, 100%, 92%, ${p.opacity})`)
      grad.addColorStop(0.5, `hsla(${p.hue}, 80%, 80%, ${p.opacity * 0.6})`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, s, 0, Math.PI * 2)
      ctx.fill()
    }

    /* ─── Floating petal — flat on the water surface ──────── */
    const drawFloating = (p: Petal) => {
      const s = p.size
      // Draw petal lying flat — squished ellipse
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.scale(1, 0.28)   // flatten onto water plane
      ctx.rotate(p.rotation)

      const color = `hsla(${p.hue}, 90%, 75%, ${p.opacity})`
      const glow  = `hsla(${p.hue}, 100%, 88%, ${p.opacity * 0.25})`

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.8)
      grad.addColorStop(0, glow)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, s * 1.8, s * 1.4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.6)
      ctx.bezierCurveTo( s * 0.6, -s * 0.38,  s * 0.55, s * 0.3, 0, s * 0.55)
      ctx.bezierCurveTo(-s * 0.55,  s * 0.3, -s * 0.6, -s * 0.38, 0, -s * 0.6)
      ctx.fill()
      ctx.restore()

      // tiny reflection oval under it
      ctx.save()
      ctx.translate(p.x, p.y + s * 0.15)
      ctx.scale(1, 0.12)
      const reflGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.4)
      reflGrad.addColorStop(0, `hsla(${p.hue}, 60%, 90%, ${p.opacity * 0.3})`)
      reflGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = reflGrad
      ctx.beginPath()
      ctx.arc(0, 0, s * 1.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    /* ─── Wind helper ─────────────────────────────────────── */
    const getWindX = (t: number, p: Petal) =>
      Math.sin(t * 0.0003 + p.windPhase) * 0.6 +
      Math.sin(t * 0.0007 + p.windPhase * 1.3) * 0.3

    /* ─── Animation loop ──────────────────────────────────── */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      const wY = waterY()

      petals.forEach((p) => {
        /* ── Already floating on water ── */
        if (p.floating) {
          p.floatTimer++
          // slow drift + gentle wave bob
          p.x += p.floatX + Math.sin(time * 0.008 + p.swayOffset) * 0.15
          p.y = wY + Math.sin(time * 0.012 + p.swayOffset * 2) * 2.5
          p.rotation += 0.002

          // fade out in final quarter of float duration
          const fadeStart = p.floatDuration * 0.65
          if (p.floatTimer > fadeStart) {
            p.opacity -= 0.006
          }

          if (p.opacity <= 0 || p.x < -60 || p.x > canvas.width + 60) {
            Object.assign(p, createPetal())
            return
          }

          drawFloating(p)
          return
        }

        /* ── Falling petal ── */
        const wind = getWindX(time, p)
        p.y += p.speedY
        p.x += p.speedX + wind + Math.sin(p.y * p.swaySpeed + p.swayOffset) * p.swayAmp
        p.rotation += p.rotationSpeed

        // Fade in / out zones
        const fadeZone = canvas.height * 0.12
        if (p.y < fadeZone) {
          p.opacity = Math.min(p.maxOpacity, p.opacity + 0.015)
        } else {
          p.opacity = Math.min(p.maxOpacity, p.opacity + 0.01)
        }

        /* ── Reaches water surface ── */
        if (p.y >= wY && p.willLand) {
          p.floating = true
          p.floatTimer = 0
          p.y = wY

          // Notify WaterRipple of the splash
          window.dispatchEvent(
            new CustomEvent('petalSplash', {
              detail: { x: p.x, y: wY, size: p.size },
            })
          )
          drawFloating(p)
          return
        }

        // Recycle if fallen past water without landing, or off sides
        if (p.y > canvas.height + 60 || p.x < -150 || p.x > canvas.width + 150) {
          Object.assign(p, createPetal())
          return
        }

        // Draw falling petal
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        if (p.type === 'petal')     drawPetalShape(p)
        else if (p.type === 'bud')  drawBudShape(p)
        else                        drawSpeck(p)
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3]"
      aria-hidden="true"
    />
  )
}
