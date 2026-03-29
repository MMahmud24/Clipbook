import { Composition } from 'remotion'
import React from 'react'
import { ZoomIn } from './components/ZoomIn'
import { ButtonPress } from './components/ButtonPress'
import { ConnectionLine } from './components/ConnectionLine'
import { Checkmark } from './components/Checkmark'


export const VideoComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="ZoomIn"
        component={ZoomIn as React.ComponentType<any>}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          durationInFrames: 90,
          targetObject: 'power_button',
          labelText: 'Test Label',
          backgroundAsset: null,
        }}
      />
      <Composition
        id="ButtonPress"
        component={ButtonPress as React.ComponentType<any>}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          durationInFrames: 90,
          targetObject: 'power_button',
          labelText: 'Test Label',
          backgroundAsset: null,
        }}
      />
      <Composition
        id="ConnectionLine"
        component={ConnectionLine as React.ComponentType<any>}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          durationInFrames: 90,
          targetObject: 'power_button',
          labelText: 'Test Label',
          backgroundAsset: null,
        }}
      />
      <Composition
        id="Checkmark"
        component={Checkmark as React.ComponentType<any>}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          durationInFrames: 90,
          targetObject: 'power_button',
          labelText: 'Test Label',
          backgroundAsset: null,
        }}

      />
    </>
  )
}
