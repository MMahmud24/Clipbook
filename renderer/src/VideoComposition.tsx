import { Composition } from 'remotion'
import React from 'react'
import { HighlightPulse } from './components/HighlightPulse'
import { ArrowPoint } from './components/ArrowPoint'
import { SlideInLabel } from './components/SlideInLabel'
import { ProgressBar } from './components/ProgressBar'

export const VideoComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="HighlightPulsePreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <HighlightPulse labelText="Hold for 3 seconds" />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ArrowPointPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <ArrowPoint labelText="Press this button" />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SlideInLabelPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <SlideInLabel labelText="Turn device on" />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ProgressBarPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <ProgressBar currentStep={2} totalSteps={5} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  )
}
