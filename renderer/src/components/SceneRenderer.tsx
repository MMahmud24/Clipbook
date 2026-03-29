import React from 'react'
import { ScriptScene } from '../types/script'
import { getAsset } from '../assets/assetMap'
import { HighlightPulse } from './HighlightPulse'
import { ArrowPoint } from './ArrowPoint'
import { SlideInLabel } from './SlideInLabel'
import { ProgressBar } from './ProgressBar'
import { ZoomIn } from './ZoomIn'
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

  // Background SVG element passed to components that accept it
  const backgroundElement = (
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

  // Render the correct animation component for this scene
  const renderAnimation = () => {
    switch (scene.animation_type) {
      case 'highlight_pulse':
        return <HighlightPulse labelText={scene.label_text} />

      case 'arrow_point':
        return <ArrowPoint labelText={scene.label_text} />

      case 'slide_in_label':
        return <SlideInLabel labelText={scene.label_text} />

      case 'progress_bar':
        return (
          <ProgressBar
            currentStep={scene.scene_id}
            totalSteps={totalScenes}
          />
        )

      case 'zoom_in':
        return (
          <ZoomIn
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundElement}
          />
        )

      case 'button_press':
        return (
          <ButtonPress
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundElement}
          />
        )

      case 'connection_line':
        return (
          <ConnectionLine
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundElement}
          />
        )

      case 'checkmark':
        return (
          <Checkmark
            durationInFrames={durationInFrames}
            targetObject={scene.target_object}
            labelText={scene.label_text}
            backgroundAsset={backgroundElement}
          />
        )

      default:
        return null
    }
  }

  // For components that manage their own background internally (zoom_in, button_press,
  // connection_line, checkmark), render them directly.
  // For the rest, layer the SVG underneath.
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
            opacity: 0.4,
          }}
        />
      )}
      {renderAnimation()}
    </div>
  )
}
