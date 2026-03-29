import type { Job } from '../hooks/useJobPolling'

interface StatusDisplayProps {
  job: Job | null
  onReset: () => void
}

export default function StatusDisplay({ job, onReset }: StatusDisplayProps) {
  if (!job) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        <span className="ml-3 text-gray-500">Submitting...</span>
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

  if (job.status === 'script_ready' || job.status === 'script_only_complete') {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex flex-col gap-4">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-green-700 font-medium">Step analysed successfully</p>
          <p className="text-green-500 text-sm mt-1">OCR and object detection complete.</p>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition"
        >
          Analyse Another Step
        </button>
      </div>
    )
  }

  const messages: Record<string, string> = {
    pending: 'Uploading your photo...',
    processing: 'Reading your manual step...',
    rendering: 'Rendering your video...',
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      <span className="ml-3 text-gray-500">{messages[job.status] ?? 'Processing...'}</span>
    </div>
  )
}
