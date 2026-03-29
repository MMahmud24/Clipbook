import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

interface AuthPageProps {
  onBack: () => void
}

export default function AuthPage({ onBack }: AuthPageProps) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error)
    } else {
      const { error } = await signUp(email, password)
      if (error) setError(error)
      else setMessage('Check your email to confirm your account, then log in.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060A15',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Orb */}
      <div className="hero-orb" style={{ opacity: 0.7 }} />

      {/* Sparkles */}
      <span className="sparkle" style={{ top: '15%', left: '8%' }}>+</span>
      <span className="sparkle" style={{ top: '70%', right: '9%', fontSize: 16 }}>+</span>

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 66, position: 'relative', zIndex: 10,
      }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 500,
          transition: 'color 0.15s',
        }}
          onMouseOver={e => (e.currentTarget.style.color = '#fff')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={28} />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.025em' }}>ClipBook</span>
        </div>

        <div style={{ width: 80 }} />
      </div>

      {/* Card */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px 80px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          width: '100%', maxWidth: 400,
          background: 'rgba(14, 20, 32, 0.7)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 24,
          padding: '40px 36px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        }}>
          <h2 style={{
            fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em',
            color: '#fff', marginBottom: 6,
          }}>
            {mode === 'login' ? 'Welcome back.' : 'Create account.'}
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', marginBottom: 32 }}>
            {mode === 'login'
              ? 'Sign in to continue to ClipBook.'
              : 'Start turning manuals into video tutorials.'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 7, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input
                type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                required className="auth-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 7, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Password
              </label>
              <input
                type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                required className="auth-input"
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 10, padding: '10px 14px', color: '#FCA5A5', fontSize: 13,
              }}>
                {error}
              </div>
            )}
            {message && (
              <div style={{
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 10, padding: '10px 14px', color: '#86EFAC', fontSize: 13,
              }}>
                {message}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-blue" style={{
              marginTop: 8, padding: '13px 0', fontSize: 15, borderRadius: 12, width: '100%',
            }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)',
          }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setMessage(null) }}
              style={{
                background: 'none', border: 'none', color: '#60A5FA',
                cursor: 'pointer', fontWeight: 700, fontSize: 13,
                fontFamily: 'inherit',
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
