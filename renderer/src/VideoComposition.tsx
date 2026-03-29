import { Composition } from 'remotion'
import React from 'react'
import HeadphonesSvg from './assets/headphones.svg'
import SmartphoneSvg from './assets/smartphone.svg'
import { HighlightPulse } from './components/HighlightPulse'
import { ArrowPoint } from './components/ArrowPoint'
import { SlideInLabel } from './components/SlideInLabel'
import { ProgressBar } from './components/ProgressBar'
import { ZoomIn } from './components/ZoomIn'
import { ButtonPress } from './components/ButtonPress'
import { ConnectionLine } from './components/ConnectionLine'
import { Checkmark } from './components/Checkmark'

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
      <Composition
        id="ZoomInPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <ZoomIn durationInFrames={90} targetObject="power_button" labelText="Zoom in" backgroundAsset={null} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ButtonPressPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <ButtonPress durationInFrames={90} targetObject="power_button" labelText="Press button" backgroundAsset={null} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ConnectionLinePreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <ConnectionLine durationInFrames={90} targetObject="port" labelText="Connect here" backgroundAsset={null} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="CheckmarkPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%' }}>
            <Checkmark durationInFrames={90} targetObject="led" labelText="Complete!" backgroundAsset={null} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SmartphoneSvgPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={SmartphoneSvg} style={{ width: 640, height: 640, objectFit: 'contain' }} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="HeadphonesSvgPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={HeadphonesSvg} style={{ width: 640, height: 640, objectFit: 'contain' }} />
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
