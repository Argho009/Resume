import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { treeNodes } from '../data/portfolio'

const RADIUS = 170
const CX = 300
const CY = 300

export default function TreeHub() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="glass-strong p-6 md:p-8 w-full max-w-md mx-auto">
      <div className="relative aspect-square select-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
          {treeNodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180
            const ex = CX + Math.cos(rad) * RADIUS
            const ey = CY + Math.sin(rad) * RADIUS
            const isActive = hovered === node.id
            return (
              <line
                key={`line-${node.id}`}
                x1={CX}
                y1={CY}
                x2={ex}
                y2={ey}
                stroke={isActive ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 1.5 : 1}
              />
            )
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-strong flex items-center justify-center z-10">
          <span className="font-display text-lg font-bold text-white/90">AC</span>
        </div>

        {treeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const x = 50 + (Math.cos(rad) * RADIUS) / 6
          const y = 50 + (Math.sin(rad) * RADIUS) / 6
          const isActive = hovered === node.id

          return (
            <button
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(node.path)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`Navigate to ${node.label}`}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive ? 'glass-strong scale-105' : 'glass'
                }`}
              >
                <span className="text-base leading-none">{node.icon}</span>
                <span className="text-[8px] md:text-[9px] font-medium mt-1 text-white/60 uppercase tracking-wide">
                  {node.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
