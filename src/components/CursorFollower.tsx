import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface TrailDot {
  x: number
  y: number
  life: number
}

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const trailRef = useRef<TrailDot[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  // Epic color palette with more vibrant colors
  const colors = [
    '#ff0080', // Hot pink
    '#ff4000', // Red-orange  
    '#ff8000', // Orange
    '#ffff00', // Yellow
    '#80ff00', // Lime
    '#00ff80', // Spring green
    '#00ffff', // Cyan
    '#0080ff', // Sky blue
    '#0000ff', // Blue
    '#8000ff', // Purple
    '#ff00ff', // Magenta
    '#ff0040', // Deep pink
  ]

  useEffect(() => {
    let rafId: number

    const updateTrail = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime > 8) { // ~120fps cap for smoothness
        // Add new trail dot
        if (isVisible && mousePos.x > 0) {
          trailRef.current.unshift({
            x: mousePos.x,
            y: mousePos.y,
            life: 1
          })
        }

        // Update and remove old dots
        trailRef.current = trailRef.current
          .map(dot => ({ ...dot, life: dot.life - 0.02 }))
          .filter(dot => dot.life > 0)
          .slice(0, 60) // Keep max 60 dots for performance

        lastTimeRef.current = currentTime
      }

      rafId = requestAnimationFrame(updateTrail)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    rafId = requestAnimationFrame(updateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isVisible, mousePos.x, mousePos.y])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main epic cursor */}
      <motion.div
        className="absolute w-6 h-6"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full rounded-full bg-white shadow-lg shadow-white/50 border-2 border-white/30" />
      </motion.div>

      {/* Epic trailing dots */}
      {trailRef.current.map((dot, index) => {
        const colorIndex = Math.floor((index / trailRef.current.length) * colors.length)
        const size = Math.max(20 - index * 0.2, 4)
        const opacity = dot.life * 0.8
        
        return (
          <div
            key={`${dot.x}-${dot.y}-${index}`}
            className="absolute rounded-full"
            style={{
              left: dot.x - size / 2,
              top: dot.y - size / 2,
              width: size,
              height: size,
              backgroundColor: colors[colorIndex],
              opacity,
              filter: `blur(${Math.max(3 - index * 0.1, 0.5)}px)`,
              mixBlendMode: 'screen', // Epic color blending!
              transform: `scale(${dot.life})`,
            }}
          />
        )
      })}

      {/* Epic ambient glow */}
      <motion.div
        className="absolute w-32 h-32"
        style={{
          left: mousePos.x - 64,
          top: mousePos.y - 64,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
          }}
        />
      </motion.div>

      {/* Sparkle particles */}
      <motion.div
        className="absolute"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 30, 0],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Epic rainbow ring */}
      <motion.div
        className="absolute"
        style={{
          left: mousePos.x - 25,
          top: mousePos.y - 25,
          width: 50,
          height: 50,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div 
          className="w-full h-full rounded-full opacity-30"
          style={{
            background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
            filter: 'blur(2px)',
          }}
        />
      </motion.div>
    </div>
  )
}
