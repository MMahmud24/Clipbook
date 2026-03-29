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

const CHECKMARK_LENGTH = 150

export const Checkmark: React.FC<Props> = ({ labelText, backgroundAsset, x = 50, y = 50 }) => {
  const frame = useCurrentFrame()

  // Checkmark draws in over first 20 frames
  const dashOffset = interpolate(frame, [0, 20], [CHECKMARK_LENGTH, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Green fill fades in after checkmark draws
  const fillOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Label fades in last
  const labelOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Place label below target if in top half, above if in bottom half
  const labelBelow = y < 60
  const labelOffsetY = labelBelow ? 88 : -88

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1e293b' }}>
      {backgroundAsset}

      {/* Checkmark circle centered at target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Circle background fill */}
          <circle cx={60} cy={60} r={54} fill="#22c55e" opacity={fillOpacity} />
          {/* Circle outline */}
          <circle cx={60} cy={60} r={54} fill="none" stroke="#22c55e" strokeWidth={6} />
          {/* Checkmark path */}
          <path
            d="M 30 60 L 50 80 L 90 35"
            fill="none"
            stroke="white"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={CHECKMARK_LENGTH}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>

      {/* Label near target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, calc(-50% + ${labelOffsetY}px))`,
          opacity: labelOpacity,
          color: 'white',
          fontSize: 28,
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          background: 'rgba(34,197,94,0.85)',
          padding: '8px 24px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        {labelText || 'Complete!'}
      </div>
    </div>
  )
}
