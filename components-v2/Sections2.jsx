/* Sections v2 — Calls, Integrations, Pricing, FAQ, Footer */

/* ---- Calls ---- */
function CallsSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const [tab, setTab] = React.useState('inbound');
  const data = {
    inbound: [
      'Atendimento automático 24/7 com vozes naturais',
      'Roteamento inteligente baseado em intenção',
      'Qualificação de leads em tempo real',
      'Transferência para humanos quando necessário',
    ],
    outbound: [
      'Campanhas de ligações com personalização',
      'Confirmação de agendamentos e lembretes',
      'Cobrança automatizada com tom adequado',
      'Pesquisas de satisfação pós-atendimento',
    ],
  };
  return (
    <section id="chamadas" ref={ref} style={{ padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s ease',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center',
      }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 400, color: tweaks.accentColor, textTransform: 'uppercase', letterSpacing: '3px', fontFamily: "'Maitree', serif" }}>Chamadas</span>
          <h2 style={{
            fontFamily: "'Kadwa', serif",
            fontSize: '40px', fontWeight: 400, color: '#fff',
            lineHeight: 1.12, margin: '18px 0 14px', letterSpacing: '-0.3px',
          }}>Entrada e saída.<br/>Sem limites.</h2>
          <p style={{
            fontFamily: "'Maitree', serif",
            fontSize: '15px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: '32px',
          }}>Seus agentes gerenciam chamadas recebidas e realizam ligações ativas com naturalidade.</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {[{ key: 'inbound', label: 'Entrada' }, { key: 'outbound', label: 'Saída' }].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                padding: '7px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 400,
                fontFamily: "'Maitree', serif",
                background: tab === t.key ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.35)',
                border: `1px solid ${tab === t.key ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data[tab].map((item, i) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '0', fontSize: '14px',
                fontFamily: "'Maitree', serif",
                color: 'rgba(255,255,255,0.5)',
                animation: 'fadeSlideIn 0.35s ease forwards',
                animationDelay: `${i * 0.06}s`, opacity: 0,
              }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: tweaks.accentColor, flexShrink: 0, opacity: 0.6 }}></div>
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Call visual */}
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px', padding: '32px', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: `${tweaks.accentColor}08`,
              border: `1px solid ${tweaks.accentColor}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tweaks.accentColor} strokeWidth="1.5" strokeOpacity="0.7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Maitree', serif" }}>
              {tab === 'inbound' ? 'Chamada recebida' : 'Chamada ativa'}
            </span>
            <span style={{ fontSize: '18px', fontWeight: 400, color: '#fff', fontFamily: "'Libre Baskerville', serif" }}>
              {tab === 'inbound' ? '+55 (11) 9****-4321' : 'Maria Silva'}
            </span>
            <span style={{ fontSize: '11px', color: tweaks.accentColor, fontFamily: "'Maitree', serif", opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Agente IA respondendo
            </span>
            {/* Waveform */}
            <div style={{ display: 'flex', gap: '2.5px', alignItems: 'center', height: '36px', marginTop: '8px' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} style={{
                  width: '2px', borderRadius: '1px',
                  background: tweaks.accentColor,
                  opacity: 0.15 + Math.random() * 0.35,
                  height: `${6 + Math.random() * 28}px`,
                  animation: `wave ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.04}s`,
                }}></div>
              ))}
            </div>
            {/* Conversation */}
            <div style={{ width: '100%', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                alignSelf: 'flex-start', padding: '10px 14px', borderRadius: '12px 12px 12px 4px',
                background: 'rgba(255,255,255,0.04)', fontSize: '12px', color: 'rgba(255,255,255,0.5)',
                maxWidth: '80%', fontFamily: "'Maitree', serif",
              }}>
                {tab === 'inbound' ? 'Gostaria de agendar uma consulta para amanhã.' : 'Olá Maria, gostaria de confirmar seu agendamento.'}
              </div>
              <div style={{
                alignSelf: 'flex-end', padding: '10px 14px', borderRadius: '12px 12px 4px 12px',
                background: `${tweaks.accentColor}0a`, fontSize: '12px', color: 'rgba(255,255,255,0.55)',
                maxWidth: '80%', fontFamily: "'Maitree', serif",
                border: `1px solid ${tweaks.accentColor}10`,
              }}>
                {tab === 'inbound' ? 'Tenho horários disponíveis às 10h e 14h. Qual prefere?' : 'Perfeito, agendamento confirmado para terça às 15h.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Integrations ---- */
function IntegrationsSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const items = [
    'WhatsApp', 'Google Calendar', 'Salesforce', 'HubSpot',
    'Slack', 'Zapier', 'Twilio', 'Stripe',
    'Pipedrive', 'RD Station', 'Webhook', 'API REST',
  ];
  return (
    <section id="integracoes" ref={ref} style={{ padding: '100px 48px', textAlign: 'center' }}>
      <SectionHeader
        label="Integrações"
        title="Conecte com as ferramentas<br/>que você já usa"
        subtitle="Integração nativa com as principais plataformas."
        vis={vis} tweaks={tweaks}
      />
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', maxWidth: '700px', margin: '0 auto',
      }}>
        {items.map((name, i) => (
          <IntBadge key={name} name={name} i={i} vis={vis} tweaks={tweaks} />
        ))}
      </div>
    </section>
  );
}

function IntBadge({ name, i, vis, tweaks }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '10px 22px', borderRadius: '100px',
        background: hov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        fontSize: '13px', fontWeight: 400, fontFamily: "'Maitree', serif",
        color: hov ? '#fff' : 'rgba(255,255,255,0.4)',
        transition: 'all 0.3s ease', cursor: 'default',
        opacity: vis ? 1 : 0, transitionDelay: `${0.03 * i}s`,
      }}
    >{name}</div>
  );
}

/* ---- Pricing ---- */
function PricingSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const plans = [
    {
      name: 'Starter', price: 'R$ 0', period: '/mês', desc: 'Para testar a plataforma', hl: false,
      features: ['50 min de chamadas/mês', '1 agente de voz', 'Vozes padrão', 'Dashboard básico', 'Suporte por email'],
    },
    {
      name: 'Pro', price: 'R$ 297', period: '/mês', desc: 'Para negócios em crescimento', hl: true,
      features: ['2.000 min de chamadas/mês', '5 agentes de voz', 'Vozes premium', 'Integrações avançadas', 'Análise em tempo real', 'Suporte prioritário'],
    },
    {
      name: 'Enterprise', price: 'Sob consulta', period: '', desc: 'Para grandes operações', hl: false,
      features: ['Minutos ilimitados', 'Agentes ilimitados', 'Vozes customizadas', 'API dedicada', 'SLA garantido', 'Gerente de conta'],
    },
  ];
  return (
    <section id="precos" ref={ref} style={{ padding: '100px 48px', textAlign: 'center' }}>
      <SectionHeader label="Preços" title="Planos que crescem<br/>com você" vis={vis} tweaks={tweaks} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
        {plans.map((p, i) => (
          <PriceCard key={i} plan={p} i={i} vis={vis} tweaks={tweaks} />
        ))}
      </div>
    </section>
  );
}

function PriceCard({ plan, i, vis, tweaks }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '36px 28px', borderRadius: '16px', textAlign: 'left',
        background: plan.hl ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${plan.hl ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
        transition: 'all 0.4s ease',
        transform: vis ? (hov ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(24px)',
        opacity: vis ? 1 : 0, transitionDelay: `${0.1 * i}s`,
        position: 'relative',
      }}
    >
      {plan.hl && <div style={{
        position: 'absolute', top: '20px', right: '20px',
        padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 400,
        fontFamily: "'Maitree', serif",
        background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        letterSpacing: '0.5px', textTransform: 'uppercase',
      }}>Popular</div>}
      <div style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontFamily: "'Maitree', serif" }}>{plan.name}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
        <span style={{ fontSize: '32px', fontWeight: 400, color: '#fff', fontFamily: "'Kadwa', serif" }}>{plan.price}</span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Maitree', serif" }}>{plan.period}</span>
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '28px', fontFamily: "'Maitree', serif" }}>{plan.desc}</p>
      <button style={{
        width: '100%', padding: '11px', borderRadius: '100px', fontSize: '13px', fontWeight: 400,
        fontFamily: "'Maitree', serif",
        background: plan.hl ? '#fff' : 'transparent',
        color: plan.hl ? '#080512' : 'rgba(255,255,255,0.6)',
        border: plan.hl ? 'none' : '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '28px',
      }}>{plan.hl ? 'Começar agora' : plan.price === 'Sob consulta' ? 'Falar com vendas' : 'Começar grátis'}</button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {plan.features.map((feat, fi) => (
          <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: plan.hl ? tweaks.accentColor : 'rgba(255,255,255,0.15)', flexShrink: 0 }}></div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: "'Maitree', serif" }}>{feat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- FAQ ---- */
function FAQSection({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  const faqs = [
    { q: 'Como funciona o agente de voz IA?', a: 'Nossos agentes utilizam modelos avançados de linguagem natural combinados com síntese de voz ultra-realista para atender e realizar chamadas de forma autônoma.' },
    { q: 'Quanto tempo leva para configurar?', a: 'Em menos de 15 minutos você pode ter seu primeiro agente funcionando. Basta definir o script, conectar seu número e ativar.' },
    { q: 'Posso usar meu próprio número?', a: 'Sim. Você pode usar seu número existente ou adquirir um novo diretamente na plataforma.' },
    { q: 'Os agentes falam português brasileiro?', a: 'Sim, com vozes naturais e expressivas otimizadas para PT-BR. Também suportamos outros idiomas.' },
    { q: 'Como é feita a cobrança?', a: 'Cobrança mensal baseada no plano escolhido. Minutos adicionais disponíveis sob demanda.' },
    { q: 'Posso cancelar a qualquer momento?', a: 'Sim, sem fidelidade. Cancele quando quiser pelo painel.' },
  ];
  return (
    <section id="faq" ref={ref} style={{ padding: '100px 48px', maxWidth: '720px', margin: '0 auto' }}>
      <SectionHeader label="FAQ" title="Perguntas frequentes" vis={vis} tweaks={tweaks} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} i={i} vis={vis} tweaks={tweaks} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq, i, vis, tweaks }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      transition: 'all 0.3s ease',
      opacity: vis ? 1 : 0, transitionDelay: `${0.05 * i}s`,
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: '20px 0', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '15px', fontWeight: 400, color: open ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: "'Libre Baskerville', serif", transition: 'color 0.3s' }}>{faq.q}</span>
        <span style={{
          color: 'rgba(255,255,255,0.2)', fontSize: '18px', fontWeight: 300,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'all 0.3s ease', flexShrink: 0, marginLeft: '16px',
        }}>+</span>
      </div>
      <div style={{
        maxHeight: open ? '160px' : '0', paddingBottom: open ? '20px' : '0',
        transition: 'all 0.35s ease', overflow: 'hidden',
      }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: 0, fontFamily: "'Maitree', serif" }}>{faq.a}</p>
      </div>
    </div>
  );
}

/* ---- CTA Band ---- */
function CTABand({ tweaks }) {
  const [ref, vis] = useScrollReveal();
  return (
    <section ref={ref} style={{
      padding: '100px 48px', textAlign: 'center',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all 0.8s ease',
    }}>
      <h2 style={{
        fontFamily: "'Kadwa', serif",
        fontSize: '40px', fontWeight: 400, color: '#fff',
        lineHeight: 1.15, marginBottom: '20px',
      }}>Pronto para automatizar<br/>suas chamadas?</h2>
      <p style={{
        fontFamily: "'Maitree', serif",
        fontSize: '15px', color: 'rgba(255,255,255,0.35)', marginBottom: '36px',
      }}>Comece grátis. Sem cartão de crédito.</p>
      <button style={{
        padding: '14px 36px', borderRadius: '100px', fontSize: '14px',
        fontFamily: "'Maitree', serif",
        background: '#fff', color: '#080512', border: 'none',
        cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 500,
      }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 32px rgba(255,255,255,0.08)'; }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
      >Agendar demonstração</button>
    </section>
  );
}

/* ---- Footer ---- */
function FooterSection({ tweaks }) {
  return (
    <footer style={{
      padding: '48px 48px 28px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px',
      }}>
        <div>
          <img src="assets/logo-voic.svg" alt="Voic" style={{ height: '22px', filter: 'brightness(0) invert(1)', opacity: 0.6, marginBottom: '12px' }} />
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.7, maxWidth: '260px', fontFamily: "'Maitree', serif" }}>
            Plataforma de agentes de voz com inteligência artificial para automatizar comunicações.
          </p>
        </div>
        {[
          { title: 'Produto', links: ['Funcionalidades', 'Integrações', 'Preços', 'Changelog'] },
          { title: 'Empresa', links: ['Sobre nós', 'Blog', 'Carreiras', 'Contato'] },
          { title: 'Legal', links: ['Privacidade', 'Termos', 'Cookies', 'LGPD'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: "'Maitree', serif" }}>{col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map(link => (
                <a key={link} href="#" style={{
                  fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                  fontFamily: "'Maitree', serif", transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                >{link}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: '1100px', margin: '40px auto 0',
        paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: "'Maitree', serif" }}>© 2026 Voic.IA — Todos os direitos reservados.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['LinkedIn', 'Instagram', 'YouTube'].map(s => (
            <a key={s} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontFamily: "'Maitree', serif", transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CallsSection, IntegrationsSection, PricingSection, FAQSection, CTABand, FooterSection });
