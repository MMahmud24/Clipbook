import { useRef, useEffect } from 'react'
import type { Job } from '../hooks/useJobPolling'

interface StatusDisplayProps {
  job: Job | null
  onReset: () => void
}

const processingSteps = [
  { key: 'pending',      label: 'Upload',  sub: 'Securing photo to cloud' },
  { key: 'processing',   label: 'Analyse', sub: 'Vision AI reading manual' },
  { key: 'script_ready', label: 'Script',  sub: 'Gemini writing animations' },
  { key: 'rendering',    label: 'Render',  sub: 'Building your video' },
]

export default function StatusDisplay({ job, onReset }: StatusDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (job?.status === 'complete' && job.script_json) {
      const script = job.script_json as { narration?: string }
      if (script.narration && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(script.narration)
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }
    return () => { window.speechSynthesis?.cancel() }
  }, [job?.status])

  /* ── Submitting ── */
  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 14 }}>
          <div className="dot-1" style={{ width: 9, height: 9, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-2" style={{ width: 9, height: 9, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-3" style={{ width: 9, height: 9, borderRadius: '50%', background: '#2563EB' }} />
        </div>
        <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.38)', fontWeight: 500 }}>Uploading your photo...</p>
      </div>
    )
  }

  /* ── Complete ── */
  if (job.status === 'complete' && job.output_video_url) {
    const script = job.script_json as { title?: string; narration?: string } | null

    return (
      <div style={{ width: '100%', maxWidth: 560 }}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 700, color: '#16A34A',
            letterSpacing: '0.04em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#16A34A" strokeWidth="1.4"/>
              <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tutorial ready
          </div>
          {script?.title && (
            <h2 style={{
              fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em',
              color: '#0A0D14', lineHeight: 1.2,
            }}>
              {script.title}
            </h2>
          )}
        </div>

        {/* Video */}
        <div style={{
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.09)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          marginBottom: 16,
          background: '#000',
        }}>
          <video
            ref={videoRef}
            src={job.output_video_url}
            controls autoPlay preload="auto"
            style={{ width: '100%', display: 'block', maxHeight: 380 }}
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {script?.narration && (
            <button
              onClick={() => {
                if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()
                else window.speechSynthesis.speak(new SpeechSynthesisUtterance(script.narration))
              }}
              className="btn-outline"
              style={{ width: '100%', padding: '11px 0' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1.5v12M4.5 4v7M1.5 6v3M10.5 3v9M13.5 5v5" stroke="#374151" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Toggle Narration
            </button>
          )}

          <a
            href={job.output_video_url} download
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 0', textDecoration: 'none',
              background: 'transparent', border: '1.5px solid rgba(0,0,0,0.12)',
              borderRadius: 12, color: '#374151', fontWeight: 600, fontSize: 14,
              fontFamily: 'inherit', transition: 'background 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2v8M4 6.5l3.5 3.5 3.5-3.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 12.5h12" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Download MP4
          </a>

          <button onClick={onReset} className="btn-blue" style={{ width: '100%', padding: '13px 0' }}>
            Try Another Step
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  /* ── Failed ── */
  if (job.status === 'failed') {
    return (
      <div style={{ maxWidth: 400 }}>
        <div style={{
          background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)',
          borderRadius: 18, padding: '28px 24px', marginBottom: 14, textAlign: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#DC2626" strokeWidth="1.6"/>
              <path d="M10 6v5M10 13.5v.5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ color: '#DC2626', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Something went wrong</p>
          <p style={{ color: '#EF4444', fontSize: 13, opacity: 0.8 }}>{job.error_message ?? 'Unknown error'}</p>
        </div>
        <button onClick={onReset} className="btn-blue" style={{ width: '100%', padding: '13px 0' }}>
          Try Again
        </button>
      </div>
    )
  }

  /* ── Processing ── */
  const currentIdx = processingSteps.findIndex(s => s.key === job.status)
  const currentStep = processingSteps[currentIdx] ?? processingSteps[0]

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          Processing
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0D14' }}>
          {currentStep.label}ing your tutorial...
        </h2>
      </div>

      {/* Step tracker */}
      <div style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 18,
        padding: '24px 24px',
        marginBottom: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}>
        {processingSteps.map((step, i) => {
          const done = i < currentIdx
          const active = i === currentIdx
          const pending = i > currentIdx
          return (
            <div key={step.key} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              paddingBottom: i < processingSteps.length - 1 ? 20 : 0,
            }}>
              {/* Icon column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div className={active ? 'step-active-dot' : ''} style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: done ? '#2563EB' : active ? '#fff' : '#F5F2EE',
                  border: done ? '2px solid #2563EB' : active ? '2px solid #2563EB' : '2px solid rgba(0,0,0,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  {done && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6l2.5 2.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {active && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#2563EB' }} />}
                  {pending && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />}
                </div>
                {i < processingSteps.length - 1 && (
                  <div style={{
                    width: 2, minHeight: 18, flexGrow: 1,
                    background: done ? '#2563EB' : 'rgba(0,0,0,0.08)',
                    margin: '4px 0',
                    borderRadius: 1,
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
              {/* Text */}
              <div style={{ paddingTop: 5 }}>
                <div style={{
                  fontSize: 14, fontWeight: done ? 600 : active ? 700 : 400,
                  color: done ? '#2563EB' : active ? '#0A0D14' : 'rgba(0,0,0,0.3)',
                  marginBottom: active ? 2 : 0,
                }}>
                  {step.label}
                </div>
                {active && (
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>{step.sub}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Loading indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#F7F3EE',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 12, padding: '13px 18px',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div className="dot-1" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-2" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-3" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', fontWeight: 500, margin: 0 }}>{currentStep.sub}</p>
      </div>
    </div>
  )
}
