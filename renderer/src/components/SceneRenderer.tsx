import React from 'react'
import { ScriptScene } from '../types/script'
import { getAsset } from '../assets/assetMap'
import { getCoord } from '../assets/targetCoordinates'
import { HighlightPulse } from './HighlightPulse'
import { ArrowPoint } from './ArrowPoint'
import { SlideInLabel } from './SlideInLabel'
import { ProgressBar } from './ProgressBar'
import { ButtonPress } from './ButtonPress'
import { ConnectionLine } from './ConnectionLine'
import { Checkmark } from './Checkmark'

interface SceneRendererProps {
  scene: ScriptScene
  totalScenes: number
  durationInFrames: number
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  totalScenes,
  durationInFrames,
}) => {
  const assetSrc = getAsset(scene.background_asset)
  const { x, y } = getCoord(scene.background_asset, scene.target_object)

  const backgroundImg = (
    <img
      src={assetSrc}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  )

  const renderAnimation = () => {
    switch (scene.animation_type) {
      case 'highlight_pulse':
        return <HighlightPulse labelText={scene.label_text} x={x} y={y} />

      case 'arrow_point':
        return <ArrowPoint labelText={scene.label_text} x={x} y={y} />

      case 'slide_in_label':
        return <SlideInLabel labelText={scene.label_text} x={x} y={y} />

      case 'progress_bar':
        return (
          <ProgressBar
            currentStep={scene.scene_id}
            totalSteps={totalScenes}
          />
        )

      case 'button_press':
        return (
          <ButtonPress
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundImg}
            x={x}
            y={y}
          />
        )

      case 'connection_line':
        return (
          <ConnectionLine
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundImg}
            x={x}
            y={y}
          />
        )

      case 'checkmark':
        return (
          <Checkmark
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundImg}
            x={x}
            y={y}
          />
        )

      default:
        return null
    }
  }

  // highlight_pulse, arrow_point, slide_in_label, progress_bar manage
  // the background externally — render SVG at full opacity underneath.
  // button_press, connection_line, checkmark receive backgroundAsset as a prop.
  const needsExternalBackground =
    scene.animation_type === 'highlight_pulse' ||
    scene.animation_type === 'arrow_point' ||
    scene.animation_type === 'slide_in_label' ||
    scene.animation_type === 'progress_bar'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#1e293b',
        overflow: 'hidden',
      }}
    >
      {needsExternalBackground && (
        <img
          src={assetSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.5,
          }}
        />
      )}
      {renderAnimation()}
    </div>
  )
}
