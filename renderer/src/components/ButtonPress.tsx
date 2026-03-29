import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

interface Props {
  durationInFrames: number
  targetObject: string
  labelText: string
  backgroundAsset: React.ReactNode
}

export const ButtonPress: React.FC<Props> = ({ durationInFrames, labelText, backgroundAsset }) => {
  const frame = useCurrentFrame()
  const midpoint = Math.floor(durationInFrames / 2)

  // Button scales down then back up around the midpoint
  const scale = interpolate(
    frame,
    [midpoint - 5, midpoint, midpoint + 5],
    [1.0, 0.92, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Ripple expands and fades after midpoint
  const rippleScale = interpolate(frame, [midpoint, midpoint + 20], [0, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const rippleOpacity = interpolate(frame, [midpoint, midpoint + 20], [0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {backgroundAsset}

      {/* Button */}
      <div style={{ position: 'absolute', transform: `scale(${scale})` }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#4a90e2', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ripple */}
          <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '3px solid #4a90e2', transform: `scale(${rippleScale})`, opacity: rippleOpacity }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 20px', borderRadius: 20, fontSize: 22, fontFamily: 'sans-serif' }}>
        {labelText}
      </div>
    </div>
  )
}
