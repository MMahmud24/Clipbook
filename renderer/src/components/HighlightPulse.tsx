import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

interface HighlightPulseProps {
  labelText: string
  color?: string
  x?: number
  y?: number
}

export const HighlightPulse: React.FC<HighlightPulseProps> = ({
  labelText,
  color = '#6366f1',
  x = 50,
  y = 50,
}) => {
  const frame = useCurrentFrame()

  const loopFrame = frame % 30
  const scale = interpolate(loopFrame, [0, 15, 30], [0.8, 1.2, 0.8])
  const ringOpacity = interpolate(loopFrame, [0, 15, 30], [0.4, 1.0, 0.4])
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  // Place label above target if target is in lower 25% of canvas, otherwise below
  const labelBelow = y < 75
  const labelOffsetY = labelBelow ? 72 : -72

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: fadeIn }}>
      {/* Outer pulsing ring */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: 96,
          height: 96,
          borderRadius: '50%',
          border: `5px solid ${color}`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}55`,
          opacity: ringOpacity,
          pointerEvents: 'none',
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      {/* Label */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, calc(-50% + ${labelOffsetY}px))`,
          background: 'rgba(0,0,0,0.82)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: 999,
          fontSize: 26,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          border: `1px solid ${color}66`,
          boxShadow: `0 2px 12px rgba(0,0,0,0.5)`,
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
