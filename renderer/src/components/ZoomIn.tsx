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

export const ZoomIn: React.FC<Props> = ({ durationInFrames, labelText, backgroundAsset, x = 50, y = 50 }) => {
  const frame = useCurrentFrame()

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#1e293b' }}>
      {/* Zoom centered on the target coordinate */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${x}% ${y}%`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {backgroundAsset}
      </div>
      {/* Label fades in at bottom */}
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
