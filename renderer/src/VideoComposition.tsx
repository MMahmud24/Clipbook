import { Composition, Series, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import React from 'react'
import HeadphonesSvg from './assets/headphones.svg'
import SmartphoneSvg from './assets/smartphone.svg'
import GenericDeviceSvg from './assets/generic_device.svg'
import RouterSvg from './assets/router.svg'
import SmartSpeakerSvg from './assets/smart_speaker.svg'
import { HighlightPulse } from './components/HighlightPulse'
import { ArrowPoint } from './components/ArrowPoint'
import { SlideInLabel } from './components/SlideInLabel'
import { ProgressBar } from './components/ProgressBar'
import { ZoomIn } from './components/ZoomIn'
import { ButtonPress } from './components/ButtonPress'
import { ConnectionLine } from './components/ConnectionLine'
import { Checkmark } from './components/Checkmark'
import { SceneRenderer } from './components/SceneRenderer'
import { Script } from './types/script'

// ── Default script used for Remotion Studio preview ──────────────────────────
const DEFAULT_SCRIPT: Script = {
  title: 'Connect Headphones via Bluetooth',
  product_category: 'consumer_electronics',
  duration_seconds: 24,
  narration: 'Hold the power button for three seconds until the LED flashes blue, then open Bluetooth settings on your device.',
  scenes: [
    {
      scene_id: 1,
      duration_seconds: 8,
      description: 'Hold power button',
      animation_type: 'highlight_pulse',
      target_object: 'power_button',
      label_text: 'Hold for 3 seconds',
      background_asset: 'headphones_svg',
    },
    {
      scene_id: 2,
      duration_seconds: 8,
      description: 'LED flashes blue',
      animation_type: 'arrow_point',
      target_object: 'ear_cup_right',
      label_text: 'LED flashes blue',
      background_asset: 'headphones_svg',
    },
    {
      scene_id: 3,
      duration_seconds: 8,
      description: 'Pairing complete',
      animation_type: 'checkmark',
      target_object: 'ear_cup_left',
      label_text: 'Paired!',
      background_asset: 'headphones_svg',
    },
  ],
}

// ── Bottom bar — persistent across all scenes ─────────────────────────────────
interface BottomBarProps {
  title: string
  currentSceneId: number
  totalScenes: number
}

const BottomBar: React.FC<BottomBarProps> = ({ title, currentSceneId, totalScenes }) => {
  const frame = useCurrentFrame()
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 40,
          paddingRight: 40,
          opacity: fadeIn,
        }}
      >
        {/* Video title */}
        <span
          style={{
            color: 'white',
            fontSize: 22,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </span>

        {/* Step counter */}
        <span
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 20,
            fontFamily: 'sans-serif',
          }}
        >
          Step {currentSceneId} / {totalScenes}
        </span>
      </div>
    </AbsoluteFill>
  )
}

// ── Main video component ──────────────────────────────────────────────────────
const MainVideo: React.FC<{ script: Script }> = ({ script }) => {
  const frame = useCurrentFrame()

  // Determine which scene is currently active based on cumulative frames
  let cumulativeFrames = 0
  let activeSceneIndex = script.scenes.length - 1
  for (let i = 0; i < script.scenes.length; i++) {
    const sceneFrames = script.scenes[i].duration_seconds * 30
    if (frame < cumulativeFrames + sceneFrames) {
      activeSceneIndex = i
      break
    }
    cumulativeFrames += sceneFrames
  }
  const activeScene = script.scenes[activeSceneIndex]

  return (
    <AbsoluteFill style={{ background: '#1e293b' }}>
      {/* Sequenced scenes */}
      <Series>
        {script.scenes.map((scene) => (
          <Series.Sequence
            key={scene.scene_id}
            durationInFrames={scene.duration_seconds * 30}
          >
            <SceneRenderer
              scene={scene}
              totalScenes={script.scenes.length}
              durationInFrames={scene.duration_seconds * 30}
            />
          </Series.Sequence>
        ))}
      </Series>

      {/* Persistent bottom bar sits on top of all scenes */}
      <BottomBar
        title={script.title}
        currentSceneId={activeScene.scene_id}
        totalScenes={script.scenes.length}
      />
    </AbsoluteFill>
  )
}

// ── Root registration ─────────────────────────────────────────────────────────
export const VideoComposition: React.FC = () => {
  return (
    <>
      {/* ── Main production composition ── */}
      <Composition
        id="VideoManual"
        component={MainVideo}
        durationInFrames={DEFAULT_SCRIPT.duration_seconds * 30}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ script: DEFAULT_SCRIPT }}
        calculateMetadata={({ props }) => ({
          durationInFrames: props.script.duration_seconds * 30,
        })}
      />

      {/* ── Dev preview compositions ── */}
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
        id="GenericDevicePreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={GenericDeviceSvg} style={{ width: 640, height: 640, objectFit: 'contain' }} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="RouterSvgPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={RouterSvg} style={{ width: 640, height: 640, objectFit: 'contain' }} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SmartSpeakerSvgPreview"
        component={() => (
          <div style={{ background: '#1e293b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={SmartSpeakerSvg} style={{ width: 640, height: 640, objectFit: 'contain' }} />
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
