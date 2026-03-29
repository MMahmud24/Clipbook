import { useEffect, useState } from 'react'
import axios from 'axios'

export type JobStatus = 'pending' | 'processing' | 'script_ready' | 'script_only_complete' | 'rendering' | 'complete' | 'failed'

export interface Job {
  id: string
  status: JobStatus
  ocr_text: string | null
  script_json: object | null
  output_video_url: string | null
  error_message: string | null
}

export function useJobPolling(jobId: string | null) {
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`)
        setJob(res.data)
        if (['complete', 'failed'].includes(res.data.status)) {
          clearInterval(interval)
        }
      } catch {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  return job
}
