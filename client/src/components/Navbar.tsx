interface NavbarProps {
  email: string | undefined
  onSignOut: () => void
  onHome: () => void
}

export default function Navbar({ email, onSignOut, onHome }: NavbarProps) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 60,
      background: 'rgba(237, 232, 224, 0.88)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      {/* Logo */}
      <button onClick={onHome} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8, padding: 0,
        fontFamily: 'inherit',
      }}>
        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.025em', color: '#0A0D14' }}>Clipbook</span>
      </button>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {email && (
          <span style={{
            fontSize: 12, color: 'rgba(0,0,0,0.4)', fontWeight: 500,
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 999, padding: '5px 12px',
            maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {email}
          </span>
        )}
        <button onClick={onSignOut} style={{
          background: 'transparent',
          border: '1.5px solid rgba(0,0,0,0.14)',
          color: 'rgba(0,0,0,0.5)',
          borderRadius: 999, padding: '6px 16px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          transition: 'border-color 0.15s, color 0.15s',
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'; e.currentTarget.style.color = '#111' }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)'; e.currentTarget.style.color = 'rgba(0,0,0,0.5)' }}
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
