import { useCurrentFrame, interpolate } from 'remotion'

interface Props {
  durationInFrames: number
  targetObject: string
  labelText: string
  backgroundAsset: React.ReactNode
}

const PATH_LENGTH = 300

export const ConnectionLine: React.FC<Props> = ({ labelText, backgroundAsset }) => {
  const frame = useCurrentFrame()

  // strokeDashoffset animates from full path length to 0 over 40 frames (drawing-in effect)
  const dashOffset = interpolate(frame, [0, 40], [PATH_LENGTH, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {backgroundAsset}

      <svg width="400" height="200" style={{ position: 'absolute' }}>
        <path
          d="M 50 100 Q 200 20 350 100"
          fill="none"
          stroke="#4a90e2"
          strokeWidth={3}
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        {/* Anchor dots */}
        <circle cx={50} cy={100} r={6} fill="#4a90e2" />
        <circle cx={350} cy={100} r={6} fill="#4a90e2" />
      </svg>

      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 20px', borderRadius: 20, fontSize: 22, fontFamily: 'sans-serif' }}>
        {labelText}
      </div>
    </div>
  )
}
