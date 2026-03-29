import React from 'react'
import { useCurrentFrame, interpolate, Easing } from 'remotion'

interface SlideInLabelProps {
  labelText: string
  color?: string
}

export const SlideInLabel: React.FC<SlideInLabelProps> = ({
  labelText,
  color = '#6366f1',
}) => {
  const frame = useCurrentFrame()

  // Slide up 20px over first 12 frames then hold
  const translateY = interpolate(frame, [0, 12], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: `${color}cc`,
          color: 'white',
          padding: '14px 32px',
          borderRadius: 999,
          fontSize: 32,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          transform: `translateY(${translateY}px)`,
          opacity,
          backdropFilter: 'blur(8px)',
          boxShadow: `0 4px 24px ${color}66`,
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
