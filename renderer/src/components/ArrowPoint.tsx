import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

interface ArrowPointProps {
  labelText: string
  color?: string
}

export const ArrowPoint: React.FC<ArrowPointProps> = ({
  labelText,
  color = '#6366f1',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Spring slide in from left
  const slideIn = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 20 },
  })

  const translateX = interpolate(slideIn, [0, 1], [-300, 0])
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          transform: `translateX(${translateX}px)`,
        }}
      >
        {/* Arrow SVG */}
        <svg width="120" height="40" viewBox="0 0 120 40">
          <line x1="0" y1="20" x2="90" y2="20" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <polygon points="90,8 120,20 90,32" fill={color} />
        </svg>

        {/* Label pill */}
        <div
          style={{
            background: color,
            color: 'white',
            padding: '10px 24px',
            borderRadius: 999,
            fontSize: 28,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            marginLeft: 16,
            whiteSpace: 'nowrap',
          }}
        >
          {labelText}
        </div>
      </div>
    </div>
  )
}
