import { useRef } from 'react'

interface LandingPageProps {
  onGetStarted: () => void
  onSignIn: () => void
}

// ─── Inline floating icon in the headline ───
function InlineVideoIcon() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      width: 72,
      height: 72,
      background: 'linear-gradient(145deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)',
      borderRadius: 18,
      margin: '0 10px',
      boxShadow: '0 12px 40px rgba(37,99,235,0.55), 0 4px 12px rgba(0,0,0,0.3)',
      transform: 'rotate(-6deg) translateY(4px)',
      flexShrink: 0,
      position: 'relative',
      top: '0px',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 10a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V10z" stroke="white" strokeWidth="1.8"/>
        <path d="M22 13l6-3v12l-6-3V13z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="13" cy="16" r="2.5" fill="white" opacity="0.9"/>
      </svg>
    </span>
  )
}

// ─── Mini floating app preview ───
function FloatingPreview() {
  return (
    <div style={{
      background: '#0E1521',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16,
      width: 280,
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
    }}>
      {/* Window chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        background: '#131C2D',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>clipbook.app</div>
        <div style={{ width: 42 }} />
      </div>
      {/* Content */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>PROCESSING YOUR MANUAL</div>
        {/* Progress steps */}
        {[
          { label: 'Photo uploaded', done: true },
          { label: 'Reading step...', done: true },
          { label: 'Generating script', active: true },
          { label: 'Rendering video', done: false },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              background: s.done ? '#2563EB' : s.active ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.06)',
              border: s.active ? '1.5px solid #2563EB' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {s.done && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {s.active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6' }} />}
            </div>
            <div style={{ fontSize: 12, color: s.done ? 'rgba(255,255,255,0.7)' : s.active ? '#fff' : 'rgba(255,255,255,0.25)', fontWeight: s.active ? 600 : 400 }}>
              {s.label}
            </div>
          </div>
        ))}
        {/* Fake video thumbnail */}
        <div style={{
          marginTop: 4,
          height: 90,
          background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(37,99,235,0.25)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M3 2l9 4.5L3 11V2z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="18" rx="3" stroke="#2563EB" strokeWidth="1.8"/>
        <circle cx="14" cy="15" r="5" stroke="#2563EB" strokeWidth="1.8"/>
        <circle cx="14" cy="15" r="2" fill="#2563EB"/>
        <rect x="10" y="3.5" width="8" height="4" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Photograph the step',
    desc: 'Point your camera at any instruction manual page and capture the step you want to explain.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 7h20M4 12h14M4 17h10" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="22" cy="19" r="5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M20 19l1.5 1.5L24 17" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI reads & scripts',
    desc: 'Vision AI extracts text and diagrams. Gemini writes precise animations for every component.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="17" rx="3" stroke="#2563EB" strokeWidth="1.8"/>
        <path d="M11 12.5l6-3v6l-6-3z" fill="#2563EB"/>
        <path d="M8 26h12M14 21v5" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Receive your tutorial',
    desc: 'A polished MP4 with smooth animations is rendered and ready to download or share.',
  },
]

const features = [
  { tag: 'AI', label: 'Vision Analysis', desc: 'Google Vision reads any manual format' },
  { tag: 'GEN', label: 'Script Writing', desc: 'Gemini builds animation blueprints' },
  { tag: 'ANI', label: '7 Animation Types', desc: 'Zoom, highlight, arrow, press & more' },
  { tag: 'MP4', label: 'Instant Export', desc: '1280×720 MP4 ready in under 60s' },
]

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const headlineSize = 'clamp(52px, 7.5vw, 92px)'

  return (
    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        height: 66,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '-0.025em' }}>ClipBook</span>
        </div>

        {/* Center nav links */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 36,
        }}>
          {['How it works', 'Our Tools'].map(l => (
            <button key={l} style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', padding: 0,
              transition: 'color 0.15s',
              fontFamily: 'inherit',
            }}
              onMouseOver={e => (e.currentTarget.style.color = '#fff')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <button onClick={onGetStarted} className="nav-cta">
          Sign up for free
        </button>
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{
        minHeight: '100vh',
        background: '#060A15',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        {/* Orb */}
        <div className="hero-orb" />

        {/* Sparkles */}
        <span className="sparkle" style={{ top: '22%', left: '7%', fontSize: 28, opacity: 0.3 }}>+</span>
        <span className="sparkle" style={{ top: '55%', left: '12%', fontSize: 18, opacity: 0.2 }}>+</span>
        <span className="sparkle" style={{ top: '30%', right: '10%', fontSize: 22, opacity: 0.25 }}>+</span>
        <span className="sparkle" style={{ top: '62%', right: '6%', fontSize: 16, opacity: 0.18 }}>+</span>

        {/* Content */}
        <div style={{
          width: '100%',
          maxWidth: 1220,
          margin: '0 auto',
          padding: '148px 64px 100px',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Headline */}
          <h1 style={{
            fontSize: headlineSize,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: '#fff',
            margin: 0,
            maxWidth: 820,
          }}>
            Turn any manual<br/>
            into{' '}
            <InlineVideoIcon />
            {' '}animated<br/>
            video tutorials.
          </h1>

          {/* CTA row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 48 }}>
            <button onClick={onGetStarted} className="cta-pill">
              Sign up. It's free!
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="#060A15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button onClick={onSignIn} style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'color 0.15s',
            }}
              onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Already have an account? Sign in →
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginTop: 32, color: 'rgba(255,255,255,0.45)', fontSize: 13.5, fontWeight: 500,
          }}>
            <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M3 4l3.5-3L10 4M1 9.5h11" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Video in under 60 seconds</span>
          </div>

          {/* Floating preview — right side */}
          <div style={{
            position: 'absolute',
            bottom: 60,
            right: 64,
          }}>
            <FloatingPreview />
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS (cream) ══════════════════════ */}
      <section style={{ background: '#EDE8E0', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          {/* Section label */}
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 16 }}>
            How it works
          </p>
          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#0A0D14',
            marginBottom: 64,
          }}>
            3 steps —{' '}
            <span style={{ color: '#2563EB' }}>one tutorial.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                background: '#0E1420',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.35)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
              >
                {/* Step number — watermark */}
                <div style={{
                  position: 'absolute', top: 20, right: 24,
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.1)',
                }}>
                  {s.num}
                </div>

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 28,
                }}>
                  {s.icon}
                </div>

                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURES (dark) ══════════════════════ */}
      <section style={{ background: '#060A15', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: 56,
            flexWrap: 'wrap', gap: 20,
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: 14 }}>
                Our tools
              </p>
              <h2 style={{
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 800, letterSpacing: '-0.04em', color: '#fff',
                lineHeight: 1.05,
              }}>
                Everything in{' '}
                <span style={{ color: '#2563EB' }}>one place.</span>
              </h2>
            </div>
            <button onClick={onGetStarted} className="nav-cta">
              Get started free
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="tool-card">
                {/* Tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  borderRadius: 8,
                  padding: '3px 10px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  color: '#60A5FA',
                  marginBottom: 20,
                }}>
                  {f.tag}
                </div>

                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.015em' }}>
                  {f.label}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
