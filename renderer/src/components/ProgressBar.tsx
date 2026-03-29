import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  color = '#6366f1',
}) => {
  const frame = useCurrentFrame()

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 40,
        opacity: fadeIn,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isActive = i + 1 === currentStep
          const isDone = i + 1 < currentStep

          return (
            <div
              key={i}
              style={{
                width: isActive ? 48 : 16,
                height: 16,
                borderRadius: 999,
                background: isActive || isDone ? color : 'rgba(255,255,255,0.3)',
                transition: 'width 0.3s ease',
                boxShadow: isActive ? `0 0 12px ${color}` : 'none',
              }}
            />
          )
        })}

        <div
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 24,
            fontFamily: 'sans-serif',
            marginLeft: 8,
          }}
        >
          {currentStep} / {totalSteps}
        </div>
      </div>
    </div>
  )
}
