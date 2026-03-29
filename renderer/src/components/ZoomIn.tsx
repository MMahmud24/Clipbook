import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

interface Props {
  durationInFrames: number
  targetObject: string
  labelText: string
  backgroundAsset: React.ReactNode
}

export const ZoomIn: React.FC<Props> = ({ durationInFrames, labelText, backgroundAsset }) => {
  const frame = useCurrentFrame()

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#1e293b' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {backgroundAsset}
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 20px', borderRadius: 20, fontSize: 22, fontFamily: 'sans-serif' }}>
        {labelText}
      </div>
    </div>
  )
}
