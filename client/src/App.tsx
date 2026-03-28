import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [health, setHealth] = useState<string>('Checking...')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/health`)
      .then(res => setHealth(JSON.stringify(res.data)))
      .catch(() => setHealth('Could not reach server'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Clipbook — Coming Soon</h1>
        <p className="mt-4 text-gray-500">{health}</p>
      </div>
    </div>
  )
}

export default App
