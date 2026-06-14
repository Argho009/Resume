import { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  color: string   // rgba stroke colour
  rings: number   // how many concentric rings to draw
}

interface Sparkle {
  x: number
  y: number
  size: number
  opacity: number
  phase: number
  speed: number
}

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    let ripples: Ripple[] = []
    let sparkles: Sparkle[] = []
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawnRipple = () => {
      ripples.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.52 + Math.random() * canvas.height * 0.42,
        radius: 0,
        maxRadius: 40 + Math.random() * 80,
        opacity: 0.30 + Math.random() * 0.25,
        speed: 0.22 + Math.random() * 0.4,
        color: '180, 215, 255',
        rings: 2,
      })
    }

    // Called when a petal hits the water
    const spawnPetalRipple = (x: number, y: number, size: number) => {
      const scale = Math.max(0.6, Math.min(1.6, size / 7))
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: (28 + size * 4) * scale,
        opacity: 0.65,
        speed: 0.35 + Math.random() * 0.25,
        color: '255, 200, 220',   // pinkish
        rings: 3,
      })
    }

    // Listen for petal splash events from ParticlePetals
    const onPetalSplash = (e: Event) => {
      const { x, y, size } = (e as CustomEvent).detail as { x: number; y: number; size: number }
      spawnPetalRipple(x, y, size)
    }
    window.addEventListener('petalSplash', onPetalSplash)

    const initSparkles = () => {
      sparkles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.5 + Math.random() * canvas.height * 0.45,
        size: 0.5 + Math.random() * 2.5,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.035,
      }))
    }

    const init = () => {
      resize()
      initSparkles()
      // seed a few ripples right away
      for (let i = 0; i < 5; i++) spawnRipple()
    }

    /* ─── Draw one wave layer ─────────────────────────────── */
    const drawWaveLayer = (
      yBase: number,
      amplitude: number,
      wavelength: number,
      speed: number,
      alpha: number,
      color: string
    ) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x += 3) {
        const y =
          yBase +
          Math.sin((x / wavelength) * Math.PI * 2 + time * speed) * amplitude +
          Math.sin((x / (wavelength * 0.6)) * Math.PI * 2 + time * speed * 1.3 + 1.2) *
            amplitude * 0.5
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, yBase - amplitude, 0, canvas.height)
      grad.addColorStop(0, `${color.replace(')', `, ${alpha})`).replace('rgb', 'rgba')}`)
      grad.addColorStop(0.4, `${color.replace(')', `, ${alpha * 0.6})`).replace('rgb', 'rgba')}`)
      grad.addColorStop(1, `${color.replace(')', `, ${alpha * 0.1})`).replace('rgb', 'rgba')}`)

      ctx.fillStyle = grad
      ctx.fill()
    }

    /* ─── Draw ring ripple ────────────────────────────────── */
    const drawRipple = (r: Ripple) => {
      const progress = r.radius / r.maxRadius
      const fadeOpacity = r.opacity * (1 - progress) * (1 - progress)

      // Outer ring
      ctx.beginPath()
      ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.28, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${r.color}, ${fadeOpacity})`
      ctx.lineWidth = 1.4
      ctx.stroke()

      // Additional concentric rings
      for (let i = 1; i < r.rings; i++) {
        const rf = 1 - i * 0.28
        if (r.radius * rf > 4) {
          ctx.beginPath()
          ctx.ellipse(r.x, r.y, r.radius * rf, r.radius * rf * 0.28, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${r.color}, ${fadeOpacity * (0.55 - i * 0.12)})`
          ctx.lineWidth = 1.0 - i * 0.2
          ctx.stroke()
        }
      }
    }

    /* ─── Draw sparkle/glint ──────────────────────────────── */
    const drawSparkle = (s: Sparkle) => {
      s.opacity = (Math.sin(time * s.speed + s.phase) + 1) * 0.5
      const alpha = s.opacity * 0.55

      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3)
      grad.addColorStop(0, `rgba(220, 240, 255, ${alpha})`)
      grad.addColorStop(0.4, `rgba(180, 220, 255, ${alpha * 0.5})`)
      grad.addColorStop(1, 'transparent')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2)
      ctx.fill()
    }

    /* ─── Draw horizontal shimmer lines ──────────────────── */
    const drawShimmerLines = () => {
      const waterTop = canvas.height * 0.50
      const count = 8

      for (let i = 0; i < count; i++) {
        const progress = i / count
        const y =
          waterTop +
          progress * (canvas.height - waterTop) +
          Math.sin(time * 0.008 + i * 1.1) * 6

        const lineAlpha = (0.04 + Math.sin(time * 0.012 + i * 0.7) * 0.03) * (1 - progress * 0.6)
        const width = (0.3 + Math.sin(time * 0.01 + i * 0.9) * 0.1) * canvas.width

        const gx = (canvas.width - width) / 2 + Math.sin(time * 0.005 + i * 1.5) * 40

        const lineGrad = ctx.createLinearGradient(gx, y, gx + width, y)
        lineGrad.addColorStop(0, 'transparent')
        lineGrad.addColorStop(0.2, `rgba(180, 220, 255, ${lineAlpha})`)
        lineGrad.addColorStop(0.5, `rgba(220, 240, 255, ${lineAlpha * 1.5})`)
        lineGrad.addColorStop(0.8, `rgba(180, 220, 255, ${lineAlpha})`)
        lineGrad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(gx, y)
        ctx.lineTo(gx + width, y)
        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.5 - progress * 0.8
        ctx.stroke()
      }
    }

    /* ─── Main loop ───────────────────────────────────────── */
    let lastRipple = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      const waterTop = canvas.height * 0.53
      const wh = canvas.height - waterTop

      // Layered waves (back → front)
      drawWaveLayer(waterTop + wh * 0.06, 5, 420, 0.008, 0.07, 'rgb(60, 90, 140)')
      drawWaveLayer(waterTop + wh * 0.10, 7, 300, 0.011, 0.10, 'rgb(50, 80, 130)')
      drawWaveLayer(waterTop + wh * 0.18, 9, 240, 0.015, 0.12, 'rgb(40, 70, 120)')
      drawWaveLayer(waterTop + wh * 0.28, 8, 190, 0.02,  0.09, 'rgb(30, 60, 110)')

      // Shimmer reflection lines
      drawShimmerLines()

      // Sparkles / light glints
      sparkles.forEach(drawSparkle)

      // Ring ripples
      ripples = ripples.filter((r) => {
        r.radius += r.speed
        drawRipple(r)
        return r.radius < r.maxRadius
      })

      // Spawn new ripple randomly ~every 1.5–3 seconds
      if (time - lastRipple > 80 + Math.random() * 100) {
        spawnRipple()
        lastRipple = time
      }

      animId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
      window.removeEventListener('petalSplash', onPetalSplash)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}
