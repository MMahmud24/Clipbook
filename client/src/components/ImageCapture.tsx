import { useRef, useState, useCallback, useEffect } from 'react'

interface ImageCaptureProps {
  onSubmit: (image: Blob, manualContext: string) => void
}

export default function ImageCapture({ onSubmit }: ImageCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [manualContext, setManualContext] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [cameraActive, stream])

  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      setStream(mediaStream)
      setCameraActive(true)
    } catch {
      setCameraError('Camera access denied. Upload a photo instead.')
      fileInputRef.current?.focus()
    }
  }, [])

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setCameraActive(false)
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const v = videoRef.current
    const c = canvasRef.current
    c.width = v.videoWidth
    c.height = v.videoHeight
    c.getContext('2d')?.drawImage(v, 0, 0)
    c.toBlob(blob => {
      if (!blob) return
      setCapturedImage(blob)
      setPreviewUrl(c.toDataURL('image/jpeg', 0.9))
      stopCamera()
    }, 'image/jpeg', 0.9)
  }, [stopCamera])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCapturedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }, [])

  const reset = useCallback(() => {
    stopCamera()
    setCapturedImage(null)
    setPreviewUrl(null)
    setCameraError(null)
    setManualContext('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [stopCamera])

  const handleSubmit = useCallback(() => {
    if (!capturedImage) return
    onSubmit(capturedImage, manualContext)
  }, [capturedImage, manualContext, onSubmit])

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          New tutorial
        </p>
        <h1 style={{
          fontSize: 'clamp(24px, 3.5vw, 32px)',
          fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0D14',
          lineHeight: 1.1,
        }}>
          Upload your<br/>manual step.
        </h1>
      </div>

      {/* Image preview area */}
      <div style={{
        width: '100%', aspectRatio: '16/9',
        borderRadius: 18,
        overflow: 'hidden',
        border: previewUrl || cameraActive
          ? '1.5px solid rgba(37,99,235,0.3)'
          : '2px dashed rgba(0,0,0,0.14)',
        background: previewUrl || cameraActive ? '#000' : '#F7F3EE',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: !capturedImage && !cameraActive ? 'pointer' : 'default',
        marginBottom: 16,
        transition: 'border-color 0.15s',
        position: 'relative',
      }}
        onClick={() => { if (!capturedImage && !cameraActive) fileInputRef.current?.click() }}
        onMouseOver={e => { if (!capturedImage && !cameraActive) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.45)' }}
        onMouseOut={e => { if (!capturedImage && !cameraActive) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.14)' }}
      >
        {cameraActive && (
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {previewUrl && !cameraActive && (
          <img src={previewUrl} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {!cameraActive && !previewUrl && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'rgba(37,99,235,0.08)',
              border: '1.5px solid rgba(37,99,235,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 4v10M7 8l4-4 4 4" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17h16" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={{ fontSize: 13.5, color: '#2563EB', fontWeight: 700, marginBottom: 4 }}>Click to upload</p>
            <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', fontWeight: 400 }}>JPEG or PNG · max 10 MB</p>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {cameraError && (
        <div style={{
          background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 10, padding: '10px 14px',
          color: '#DC2626', fontSize: 13, marginBottom: 14,
        }}>
          {cameraError}
        </div>
      )}

      {/* Buttons */}
      {!capturedImage && !cameraActive && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={startCamera} className="btn-blue" style={{ flex: 1 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="3" width="13" height="9.5" rx="2" stroke="white" strokeWidth="1.4"/>
              <circle cx="7.5" cy="7.75" r="2.5" stroke="white" strokeWidth="1.4"/>
            </svg>
            Take Photo
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ flex: 1 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2v8M4 5l3.5-3L11 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12h13" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Upload
          </button>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" style={{ display: 'none' }} onChange={handleFileUpload} />
        </div>
      )}

      {cameraActive && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={capturePhoto} className="btn-blue" style={{ flex: 1 }}>Capture</button>
          <button onClick={stopCamera} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
        </div>
      )}

      {capturedImage && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 7,
            }}>
              What product is this? <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sony WH-1000XM5 headphones"
              value={manualContext}
              onChange={e => setManualContext(e.target.value)}
              className="app-input"
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={handleSubmit} className="btn-blue" style={{ flex: 2, padding: '13px 0' }}>
              Analyse Step
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={reset} className="btn-outline" style={{ flex: 1 }}>Retake</button>
          </div>
        </div>
      )}
    </div>
  )
}
