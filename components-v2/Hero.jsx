/* Hero v2 — Premium editorial */
function HeroSection({ tweaks }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setVisible(true), 150); }, []);

  const trans = (d) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${d}s`,
  });

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '160px 48px 100px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: `radial-gradient(circle, ${tweaks.accentColor}08 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}></div>

      {/* Badge */}
      <div style={{
        ...trans(0.1),
        padding: '6px 16px', borderRadius: '100px', fontSize: '12px',
        fontFamily: "'Maitree', serif",
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.5)', marginBottom: '36px',
        display: 'flex', alignItems: 'center', gap: '8px',
        letterSpacing: '0.3px',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: tweaks.accentColor, opacity: 0.8,
        }}></span>
        Agentes de voz IA — disponíveis 24/7
      </div>

      {/* Headline */}
      <h1 style={{
        ...trans(0.2),
        fontFamily: "'Kadwa', serif",
        fontSize: '68px',
        fontWeight: 400, textAlign: 'center', lineHeight: 1.08,
        maxWidth: '760px', letterSpacing: '-0.5px', color: '#fff',
        textWrap: 'balance',
      }}>
        Automatize suas{' '}
        <span style={{
          color: tweaks.accentColor,
          fontStyle: 'italic',
        }}>chamadas</span>{' '}
        com inteligência artificial
      </h1>

      {/* Sub */}
      <p style={{
        ...trans(0.35),
        fontFamily: "'Libre Baskerville', serif",
        fontSize: '18px', color: 'rgba(255,255,255,0.4)', textAlign: 'center',
        maxWidth: '520px', lineHeight: 1.7, margin: '32px 0 44px',
        textWrap: 'pretty', fontWeight: 400,
      }}>
        Plataforma de agentes de voz para chamadas de entrada e saída, agendamentos e ações automatizadas.
      </p>

      {/* CTAs */}
      <div style={{
        ...trans(0.45),
        display: 'flex', gap: '14px', alignItems: 'center',
      }}>
        <button style={{
          padding: '13px 32px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
          background: '#fff', color: '#080512',
          border: 'none', cursor: 'pointer',
          fontFamily: "'Maitree', serif",
          transition: 'all 0.3s ease',
          letterSpacing: '0.2px',
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 32px rgba(255,255,255,0.08)'; }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
        >Agendar demonstração</button>
        <button style={{
          padding: '13px 32px', borderRadius: '100px', fontSize: '14px', fontWeight: 400,
          background: 'transparent', color: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
          fontFamily: "'Maitree', serif",
          transition: 'all 0.3s ease',
        }}
          onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = '#fff'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
        >Ver funcionalidades</button>
      </div>

      {/* Dashboard Preview */}
      <div style={{
        ...trans(0.65),
        marginTop: '72px', width: '100%', maxWidth: '960px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
      }}>
        <DashboardPreview tweaks={tweaks} />
      </div>
    </section>
  );
}

function DashboardPreview({ tweaks }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }}></span>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }}></span>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }}></span>
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginLeft: '10px', fontFamily: "'Maitree', serif" }}>Voic.IA — Painel de Agentes</span>
        </div>
      </div>
      <div style={{ display: 'flex', minHeight: '300px' }}>
        <div style={{
          width: '180px', borderRight: '1px solid rgba(255,255,255,0.04)',
          padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '2px',
        }}>
          {[
            { label: 'Dashboard', active: true },
            { label: 'Chamadas' },
            { label: 'Agentes' },
            { label: 'Agendamentos' },
            { label: 'Integrações' },
            { label: 'Configurações' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '7px 12px', borderRadius: '6px', fontSize: '12px',
              fontFamily: "'Maitree', serif",
              color: item.active ? '#fff' : 'rgba(255,255,255,0.3)',
              background: item.active ? 'rgba(255,255,255,0.05)' : 'transparent',
            }}>{item.label}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '18px 22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Chamadas hoje', value: '1.247', change: '+12.5%' },
              { label: 'Taxa de resolução', value: '94.8%', change: '+3.2%' },
              { label: 'Agendamentos', value: '186', change: '+28.4%' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '14px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Maitree', serif" }}>{stat.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff', fontFamily: "'Libre Baskerville', serif" }}>{stat.value}</span>
                  <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 500, fontFamily: "'Maitree', serif" }}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            padding: '16px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            height: '130px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '10px', fontFamily: "'Maitree', serif" }}>Volume de chamadas — últimos 7 dias</div>
            <svg viewBox="0 0 500 80" style={{ width: '100%', height: '70px' }}>
              <defs>
                <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={tweaks.accentColor} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={tweaks.accentColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 C60,55 80,40 140,35 C200,30 220,50 280,25 C340,0 380,20 420,15 C460,10 480,18 500,12 L500,80 L0,80 Z" fill="url(#cg2)" />
              <path d="M0,60 C60,55 80,40 140,35 C200,30 220,50 280,25 C340,0 380,20 420,15 C460,10 480,18 500,12" fill="none" stroke={tweaks.accentColor} strokeWidth="1.5" strokeOpacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroSection });
