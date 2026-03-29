import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'

interface SlideInLabelProps {
  labelText: string
  color?: string
  x?: number
  y?: number
}

export const SlideInLabel: React.FC<SlideInLabelProps> = ({
  labelText,
  color = '#6366f1',
  x = 50,
  y = 50,
}) => {
  const frame = useCurrentFrame()

  const translateY = interpolate(frame, [0, 12], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Offset label so it doesn't cover the target — place above unless near top
  const labelAbove = y > 30
  const offsetY = labelAbove ? -56 : 56

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      {/* Small dot marker at the target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}`,
          opacity,
        }}
      />
      {/* Sliding label */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, calc(-50% + ${offsetY + translateY}px))`,
          background: `${color}dd`,
          color: 'white',
          padding: '10px 28px',
          borderRadius: 999,
          fontSize: 28,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity,
          backdropFilter: 'blur(8px)',
          boxShadow: `0 4px 20px ${color}55`,
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
