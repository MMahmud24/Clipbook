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

  // Attach stream to video element after cameraActive renders the <video> tag
  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [cameraActive, stream])

  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      setCameraActive(true)
    } catch {
      setCameraError('Camera access denied. Please upload a photo instead.')
      if (fileInputRef.current) fileInputRef.current.focus()
    }
  }, [])

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setCameraActive(false)
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      setCapturedImage(blob)
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.9))
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
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Clipbook</h1>
      <p className="text-gray-500 text-sm text-center">
        Photograph a step from any instruction manual and get an animated video tutorial.
      </p>

      {/* Camera / Preview area */}
      <div className="w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video flex items-center justify-center relative">
        {cameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {previewUrl && !cameraActive && (
          <img src={previewUrl} alt="Captured" className="w-full h-full object-cover" />
        )}
        {!cameraActive && !previewUrl && (
          <span className="text-gray-400 text-sm">No image selected</span>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera error */}
      {cameraError && (
        <p className="text-red-500 text-sm text-center">{cameraError}</p>
      )}

      {/* Controls */}
      {!capturedImage && !cameraActive && (
        <div className="flex gap-3 w-full">
          <button
            onClick={startCamera}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Take Photo
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      )}

      {cameraActive && (
        <div className="flex gap-3 w-full">
          <button
            onClick={capturePhoto}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Capture
          </button>
          <button
            onClick={stopCamera}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      )}

      {capturedImage && (
        <>
          {/* Optional context */}
          <input
            type="text"
            placeholder="What product is this manual for? (optional)"
            value={manualContext}
            onChange={e => setManualContext(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-3 w-full">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Analyse Step
            </button>
            <button
              onClick={reset}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Clear / Retake
            </button>
          </div>
        </>
      )}
    </div>
  )
}
