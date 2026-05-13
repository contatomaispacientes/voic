/* Navbar v2 — Premium clean */
function Navbar({ tweaks }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 48px' : '20px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backdropFilter: 'blur(24px) saturate(140%)',
      background: scrolled ? 'rgba(6, 4, 14, 0.85)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
        <img src="assets/logo-voic.svg" alt="Voic" style={{ height: '28px', filter: 'brightness(0) invert(1)' }} />
      </div>
      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {['Funcionalidades', 'Como funciona', 'Integrações', 'Preços'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
            style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 400,
              textDecoration: 'none', cursor: 'pointer',
              transition: 'color 0.25s ease',
              fontFamily: "'Maitree', serif",
              letterSpacing: '0.2px',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
          >{l}</a>
        ))}
        <button style={{
          padding: '9px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
          background: 'transparent',
          color: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.15)',
          cursor: 'pointer', transition: 'all 0.3s ease',
          fontFamily: "'Maitree', serif",
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        >Agendar demonstração</button>
      </div>
    </nav>
  );
}

Object.assign(window, { Navbar });
