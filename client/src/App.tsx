import { useState, useEffect } from 'react'
import axios from 'axios'
import ImageCapture from './components/ImageCapture'
import StatusDisplay from './components/StatusDisplay'
import AuthPage from './components/AuthPage'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import { useJobPolling } from './hooks/useJobPolling'
import { useAuth } from './context/AuthContext'

type View = 'landing' | 'auth' | 'app'

function App() {
  const { session, user, loading, signOut } = useAuth()
  const [view, setView] = useState<View>('landing')
  const [jobId, setJobId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const job = useJobPolling(jobId)

  useEffect(() => {
    if (session) setView('app')
    else if (!session && view === 'app') setView('landing')
  }, [session])

  const handleSubmit = async (image: Blob, manualContext: string) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('image', image, 'capture.jpg')
      if (manualContext) formData.append('manual_context', manualContext)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, formData, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      setJobId(res.data.jobId)
    } catch {
      alert('Upload failed. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => { setJobId(null); setSubmitting(false) }

  const handleSignOut = async () => {
    await signOut()
    setJobId(null)
    setSubmitting(false)
    setView('landing')
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#060A15',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div className="hero-orb" style={{ opacity: 0.5 }} />
        <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
          <div className="dot-1" style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-2" style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563EB' }} />
          <div className="dot-3" style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563EB' }} />
        </div>
      </div>
    )
  }

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setView(session ? 'app' : 'auth')}
        onSignIn={() => setView(session ? 'app' : 'auth')}
      />
    )
  }

  if (view === 'auth') {
    return <AuthPage onBack={() => setView('landing')} />
  }

  /* ── Main app ── */
  const isComplete = job?.status === 'complete'

  return (
    <div style={{ minHeight: '100vh', background: '#EDE8E0' }}>
      <Navbar email={user?.email} onSignOut={handleSignOut} onHome={handleReset} />

      <main style={{
        paddingTop: 60,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: 24,
          padding: '44px 44px',
          width: '100%',
          maxWidth: isComplete ? 620 : 540,
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        }}>
          {!jobId && !submitting && <ImageCapture onSubmit={handleSubmit} />}
          {(jobId || submitting) && <StatusDisplay job={job} onReset={handleReset} />}
        </div>
      </main>
    </div>
  )
}

export default App
