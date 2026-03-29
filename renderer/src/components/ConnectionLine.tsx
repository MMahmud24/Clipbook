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

const PATH_LENGTH = 300

export const ConnectionLine: React.FC<Props> = ({ labelText, backgroundAsset, x = 50, y = 50 }) => {
  const frame = useCurrentFrame()

  // strokeDashoffset animates from full path length to 0 over 40 frames (drawing-in effect)
  const dashOffset = interpolate(frame, [0, 40], [PATH_LENGTH, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const labelOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Target point in canvas pixels (1280x720)
  const tx = (x / 100) * 1280
  const ty = (y / 100) * 720

  // Source point: offset 200px left and 80px up from target (so line draws TO target)
  const sx = tx - 200
  const sy = ty - 80

  // Control point for quadratic bezier — midpoint shifted up
  const cx = (sx + tx) / 2
  const cy = Math.min(sy, ty) - 60

  // Label placement: above target if target is in bottom half, below if in top half
  const labelBelow = y < 50
  const labelOffsetY = labelBelow ? 48 : -48

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1e293b' }}>
      {backgroundAsset}

      <svg
        width="1280"
        height="720"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <path
          d={`M ${sx} ${sy} Q ${cx} ${cy} ${tx} ${ty}`}
          fill="none"
          stroke="#4a90e2"
          strokeWidth={3}
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        {/* Source dot */}
        <circle cx={sx} cy={sy} r={6} fill="#4a90e2" opacity={interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })} />
        {/* Target dot */}
        <circle cx={tx} cy={ty} r={8} fill="#4a90e2" opacity={interpolate(frame, [35, 45], [0, 1], { extrapolateRight: 'clamp' })} />
      </svg>

      {/* Label near target */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, calc(-50% + ${labelOffsetY}px))`,
          background: 'rgba(74,144,226,0.9)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: 999,
          fontSize: 22,
          fontFamily: 'sans-serif',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity: labelOpacity,
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        {labelText}
      </div>
    </div>
  )
}
