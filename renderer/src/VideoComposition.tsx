import { Composition } from 'remotion'
import React from 'react'

export const VideoComposition: React.FC = () => {
  return (
    <Composition
      id="ClipbookVideo"
      component={() => <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: 48, fontFamily: 'sans-serif' }}>Clipbook</span>
      </div>}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />
  )
}
