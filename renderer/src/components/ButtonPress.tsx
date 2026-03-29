import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

interface Props {
  durationInFrames: number
  targetObject: string
  labelText: string
  backgroundAsset: React.ReactNode
  x?: number
  y?: number
}

export const ButtonPress: React.FC<Props> = ({ durationInFrames, labelText, backgroundAsset, x = 50, y = 50 }) => {
  const frame = useCurrentFrame()
  const midpoint = Math.floor(durationInFrames / 2)

  const pressScale = interpolate(
    frame,
    [midpoint - 5, midpoint, midpoint + 5],
    [1.0, 0.88, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const rippleScale = interpolate(frame, [midpoint, midpoint + 24], [0.5, 2.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const rippleOpacity = interpolate(frame, [midpoint, midpoint + 24], [0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const labelOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1e293b' }}>
      {backgroundAsset}

      {/* Ripple — expands outward from target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) scale(${rippleScale})`,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '3px solid #6366f1',
          opacity: rippleOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Press indicator dot at target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) scale(${pressScale})`,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.9)',
          border: '3px solid white',
          boxShadow: '0 0 16px rgba(99,102,241,0.8)',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '8px 24px',
          borderRadius: 999,
          fontSize: 24,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity: labelOpacity,
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
