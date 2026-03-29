import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

interface HighlightPulseProps {
  labelText: string
  color?: string
}

export const HighlightPulse: React.FC<HighlightPulseProps> = ({
  labelText,
  color = '#6366f1',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // 30-frame loop for pulse
  const loopFrame = frame % 30

  const scale = interpolate(loopFrame, [0, 15, 30], [0.8, 1.2, 0.8])
  const opacity = interpolate(loopFrame, [0, 15, 30], [0.4, 1.0, 0.4])

  // Fade in over first 10 frames
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeIn,
      }}
    >
      {/* Pulsing ring */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `6px solid ${color}`,
            boxShadow: `0 0 30px ${color}`,
            transform: `scale(${scale})`,
            opacity,
            position: 'absolute',
          }}
        />
        {/* Inner dot */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: color,
            opacity: fadeIn,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '10px 24px',
          borderRadius: 999,
          fontSize: 28,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
