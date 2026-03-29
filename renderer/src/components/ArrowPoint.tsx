import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

interface ArrowPointProps {
  labelText: string
  color?: string
  x?: number
  y?: number
}

export const ArrowPoint: React.FC<ArrowPointProps> = ({
  labelText,
  color = '#6366f1',
  x = 50,
  y = 50,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const slideIn = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 20 },
  })

  // Arrow slides in from the left. Arrowhead tip is 120px into the group.
  // We position left edge at (x% - 120px) so arrowhead lands exactly at x%.
  // translateX starts at -300 (off screen left) and springs to 0.
  const translateX = interpolate(slideIn, [0, 1], [-300, 0])
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' })

  // Place label to the right of arrowhead; if near right edge, flip to left
  const labelRight = x > 70

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity }}>
      {/* Arrow group: left edge at (x% - 120px), arrowhead lands at x% */}
      <div
        style={{
          position: 'absolute',
          top: `${y}%`,
          left: `calc(${x}% - 120px)`,
          transform: `translateX(${translateX}px) translateY(-50%)`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg width="120" height="36" viewBox="0 0 120 36">
          <line x1="0" y1="18" x2="90" y2="18" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <polygon points="88,6 120,18 88,30" fill={color} />
        </svg>

        {!labelRight && (
          <div
            style={{
              background: color,
              color: 'white',
              padding: '8px 20px',
              borderRadius: 999,
              fontSize: 24,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              marginLeft: 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            {labelText}
          </div>
        )}
      </div>

      {/* If near right edge, show label above the arrowhead instead */}
      {labelRight && (
        <div
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -60px)',
            background: color,
            color: 'white',
            padding: '8px 20px',
            borderRadius: 999,
            fontSize: 24,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            opacity,
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          {labelText}
        </div>
      )}
    </div>
  )
}
