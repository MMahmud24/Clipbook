import { useRef, useEffect } from 'react'
import type { Job } from '../hooks/useJobPolling'

interface StatusDisplayProps {
  job: Job | null
  onReset: () => void
}

export default function StatusDisplay({ job, onReset }: StatusDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-speak narration when video is ready
  useEffect(() => {
    if (job?.status === 'complete' && job.script_json) {
      const script = job.script_json as { narration?: string }
      if (script.narration && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(script.narration)
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [job?.status])

  if (!job) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        <span className="ml-3 text-gray-500">Submitting...</span>
      </div>
    )
  }

  if (job.status === 'complete' && job.output_video_url) {
    const script = job.script_json as { title?: string; narration?: string } | null

    return (
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-4">
        {/* Video player */}
        <video
          ref={videoRef}
          src={job.output_video_url}
          controls
          autoPlay
          preload="auto"
          className="w-full rounded-2xl shadow-lg bg-black"
          style={{ maxHeight: 480 }}
        />

        {/* Title */}
        {script?.title && (
          <p className="text-gray-800 font-semibold text-lg text-center">{script.title}</p>
        )}

        {/* Narration toggle */}
        {script?.narration && (
          <button
            onClick={() => {
              if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel()
              } else {
                const utterance = new SpeechSynthesisUtterance(script.narration)
                window.speechSynthesis.speak(utterance)
              }
            }}
            className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-xl font-medium hover:bg-indigo-100 transition"
          >
            Toggle Narration
          </button>
        )}

        {/* Download */}
        <a
          href={job.output_video_url}
          download
          className="w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          Download Video
        </a>

        {/* Try another */}
        <button
          onClick={onReset}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Try Another Step
        </button>
      </div>
    )
  }

  if (job.status === 'failed') {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex flex-col gap-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-700 font-medium">Something went wrong</p>
          <p className="text-red-500 text-sm mt-1">{job.error_message ?? 'Unknown error'}</p>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  const messages: Record<string, string> = {
    pending: 'Uploading your photo...',
    processing: 'Reading your manual step...',
    script_ready: 'Writing your tutorial script...',
    rendering: 'Rendering your video...',
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      <span className="ml-3 text-gray-500">{messages[job.status] ?? 'Processing...'}</span>
    </div>
  )
}
