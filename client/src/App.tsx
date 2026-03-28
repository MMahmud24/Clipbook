import { useState } from 'react'
import axios from 'axios'
import ImageCapture from './components/ImageCapture'
import StatusDisplay from './components/StatusDisplay'
import { useJobPolling } from './hooks/useJobPolling'

function App() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const job = useJobPolling(jobId)

  const handleSubmit = async (image: Blob, manualContext: string) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('image', image, 'capture.jpg')
      if (manualContext) formData.append('manual_context', manualContext)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, formData)
      setJobId(res.data.jobId)
    } catch {
      alert('Upload failed. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setJobId(null)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {!jobId && !submitting ? (
        <ImageCapture onSubmit={handleSubmit} />
      ) : (
        <StatusDisplay job={job} onReset={handleReset} />
      )}
    </div>
  )
}

export default App
