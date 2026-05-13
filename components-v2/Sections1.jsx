/* Sections v2 — Logos, Features, How It Works */

function useScrollReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* Section header helper */
function SectionHeader({ label, title, subtitle, vis, tweaks }) {
  return (
    <div style={{
      textAlign: 'center', marginBottom: '64px',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <span style={{
        fontSize: '12px', fontWeight: 400, color: tweaks.accentColor,
        textTransform: 'uppercase', letterSpacing: '3px',
        fontFamily: "'Maitree', serif",
      }}>{label}</span>
      <h2 style={{
        fontFamily: "'Kadwa', serif",
        fontSize: '44px', fontWeight: 400, color: '#fff',
        lineHeight: 1.12, margin: '18px 0 0', letterSpacing: '-0.3px',
        textWrap: 'balance',
      }} dangerouslySetInnerHTML={{ __html: title }}></h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: '16px', color: 'rgba(255,255,255,0.35)', maxWidth: '460px',
          margin: '16px auto 0', lineHeight: 1.7, fontWeight: 400,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

/* ---- Logos ---- */
function LogosSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const logos = ['TechNova', 'CloudSync', 'DataPulse', 'NetForce', 'SkyBridge', 'VortexAI'];
  return (
    <section ref={ref} style={{
      padding: '48px 48px 80px', textAlign: 'center',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease',
    }}>
      <p style={{
        fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '28px',
        letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 400,
        fontFamily: "'Maitree', serif",
      }}>Empresas que confiam na Voic.IA</p>
      <div style={{
        display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center',
      }}>
        {logos.map(name => (
          <span key={name} style={{
            fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.18)',
            fontFamily: "'Libre Baskerville', serif",
            letterSpacing: '1px', transition: 'color 0.3s ease', cursor: 'default',
          }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.18)'}
          >{name}</span>
        ))}
      </div>
    </section>
  );
}

/* ---- Features ---- */
function FeaturesSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const features = [
    { title: 'Conversas naturais', desc: 'Vozes ultra-realistas que mantêm conversas fluidas e entendem contexto.' },
    { title: 'Agendamento inteligente', desc: 'Agende compromissos automaticamente, integrado ao seu calendário.' },
    { title: 'Memória de sessão', desc: 'Agentes lembram interações anteriores e retomam de onde pararam.' },
    { title: 'Análise em tempo real', desc: 'Monitore chamadas, visualize métricas e otimize continuamente.' },
    { title: 'Transferência humana', desc: 'Quando necessário, transferência para atendente com todo o contexto.' },
    { title: 'Automação de workflows', desc: 'Qualificação de leads, cobrança, pesquisas de satisfação e mais.' },
  ];
  return (
    <section id="funcionalidades" ref={ref} style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionHeader
        label="Funcionalidades"
        title="Tudo que seus agentes<br/>precisam para trabalhar"
        subtitle="Recursos avançados para agentes de voz que realmente resolvem."
        vis={vis} tweaks={tweaks}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', overflow: 'hidden' }}>
        {features.map((f, i) => (
          <FeatureCard key={i} f={f} i={i} vis={vis} tweaks={tweaks} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ f, i, vis, tweaks }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '36px 32px',
        background: hov ? 'rgba(255,255,255,0.035)' : 'rgba(6, 4, 14, 1)',
        transition: 'all 0.4s ease',
        opacity: vis ? 1 : 0,
        transitionDelay: `${0.08 * i}s`,
        cursor: 'default',
      }}
    >
      <div style={{
        width: '32px', height: '2px',
        background: hov ? tweaks.accentColor : 'rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease', marginBottom: '24px',
      }}></div>
      <h3 style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: '17px', fontWeight: 400, color: '#fff', marginBottom: '10px',
      }}>{f.title}</h3>
      <p style={{
        fontFamily: "'Maitree', serif",
        fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: 0,
      }}>{f.desc}</p>
    </div>
  );
}

/* ---- How It Works ---- */
function HowItWorksSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const steps = [
    { title: 'Configure', desc: 'Defina personalidade, tom de voz e scripts do agente.' },
    { title: 'Conecte', desc: 'Integre com CRM, calendário e suas ferramentas.' },
    { title: 'Ative', desc: 'Seu agente atende e realiza chamadas 24/7.' },
    { title: 'Otimize', desc: 'Acompanhe métricas e aprimore continuamente.' },
  ];
  return (
    <section id="como-funciona" ref={ref} style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionHeader
        label="Como funciona"
        title="Do zero ao automático<br/>em quatro passos"
        vis={vis} tweaks={tweaks}
      />
      <div style={{ display: 'flex', gap: '0', alignItems: 'stretch', position: 'relative' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute', top: '28px', left: '60px', right: '60px', height: '1px',
          background: 'rgba(255,255,255,0.06)',
        }}></div>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center', position: 'relative',
            opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease', transitionDelay: `${0.12 * i}s`,
            padding: '0 16px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(6, 4, 14, 1)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', position: 'relative', zIndex: 1,
            }}>
              <span style={{
                fontFamily: "'Kadwa', serif",
                fontSize: '20px', color: tweaks.accentColor,
              }}>{i + 1}</span>
            </div>
            <h3 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: '17px', fontWeight: 400, color: '#fff', marginBottom: '8px',
            }}>{s.title}</h3>
            <p style={{
              fontFamily: "'Maitree', serif",
              fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0,
            }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { LogosSection, FeaturesSection, HowItWorksSection, SectionHeader, useScrollReveal });
