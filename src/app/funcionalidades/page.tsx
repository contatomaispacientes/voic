"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CursorGlow } from "@/components/ui/CursorGlow";
import PageHero from "@/components/ui/PageHero";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CTABand from "@/components/sections/CTABand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

const DEFAULTS: Tweaks = {
  accentColor: "#8b5cf6",
  accentColorDark: "#6d28d9",
  heroStyle: "a",
  headlineSize: "medio",
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ══════════════════════════════════════════════════════════════════════
   SECTION 1 — Animated stats
══════════════════════════════════════════════════════════════════════ */

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return { ref, count };
}

const STATS = [
  { value: 1200000, suffix: "+",   label: "chamadas processadas",    prefix: "" },
  { value: 94,      suffix: ".8%", label: "taxa de resolução média", prefix: "" },
  { value: 30,      suffix: "+",   label: "idiomas suportados",      prefix: "" },
  { value: 15,      suffix: " min",label: "para ativar seu agente",  prefix: "< " },
];

function StatCard({ stat, accent, index }: { stat: typeof STATS[number]; accent: string; index: number }) {
  const { ref, count } = useCounter(stat.value);
  const display = stat.value >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : count.toLocaleString("pt-BR");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{
        padding: "32px 28px", borderRadius: "20px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "42px", fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: "8px" }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "22px" }}>{stat.prefix}</span>
        <span ref={ref}>{display}</span>
        <span style={{ color: accent }}>{stat.suffix}</span>
      </div>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-maitree), serif", margin: 0 }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 2 — Feature deep-dives (alternating split)
══════════════════════════════════════════════════════════════════════ */

/* Visual: Voice quality */
const VOICE_BARS = Array.from({ length: 48 }, (_, i) => {
  const t = (i / 47) * Math.PI * 8;
  return { h: 4 + (Math.sin(t) * 0.5 + 0.5) * 44 };
});

function VoiceVisual({ accent }: { accent: string }) {
  return (
    <div style={{ padding: "32px", background: "rgba(0,0,0,0.3)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif", textTransform: "uppercase", letterSpacing: "2px" }}>Conversa em tempo real</span>
      </div>
      {/* Speaker label */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>👤</div>
        <div style={{ flex: 1, height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ width: "60%", height: "100%", background: "rgba(255,255,255,0.25)", borderRadius: "3px" }} />
        </div>
      </div>
      {/* Agent waveform */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${accent}20`, border: `1px solid ${accent}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🤖</div>
        <div style={{ flex: 1, display: "flex", gap: "1.5px", alignItems: "center", height: "32px" }}>
          {VOICE_BARS.map((bar, i) => (
            <div key={i} style={{
              width: "2.5px", borderRadius: "2px", height: `${bar.h}px`,
              background: accent,
              opacity: 0.3 + (bar.h / 48) * 0.65,
              animation: `wave ${0.5 + (i % 6) * 0.08}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.03}s`,
            }} />
          ))}
        </div>
      </div>
      {/* Transcript */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "12px 12px 12px 4px", background: "rgba(255,255,255,0.05)", fontSize: "12px", color: "rgba(255,255,255,0.55)", maxWidth: "80%", fontFamily: "var(--font-maitree), serif" }}>
          Preciso remarcar minha consulta de amanhã.
        </div>
        <div style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "12px 12px 4px 12px", background: `${accent}12`, border: `1px solid ${accent}20`, fontSize: "12px", color: "rgba(255,255,255,0.65)", maxWidth: "82%", fontFamily: "var(--font-maitree), serif" }}>
          Claro! Tenho disponibilidade na quinta às 14h ou sexta às 10h. Qual você prefere?
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d39980", animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "10px", color: "#34d399", fontFamily: "var(--font-maitree), serif", letterSpacing: "0.5px" }}>Sentimento detectado: Satisfeito</span>
        </div>
      </div>
    </div>
  );
}

/* Visual: CRM sync */
function CRMVisual({ accent }: { accent: string }) {
  const fields = [
    { label: "Cliente",   value: "João Silva",          updated: false },
    { label: "Status",    value: "Lead Qualificado",     updated: true  },
    { label: "Interesse", value: "Plano Pro",            updated: true  },
    { label: "Próximo",   value: "Demo agendada — Qui",  updated: true  },
  ];
  return (
    <div style={{ padding: "28px", background: "rgba(0,0,0,0.3)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-maitree), serif" }}>HubSpot CRM — Atualização automática</span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#34d399", fontFamily: "var(--font-maitree), serif" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", animation: "pulse-dot 2s ease-in-out infinite" }} />
          Ao vivo
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", borderRadius: "10px",
              background: f.updated ? `${accent}0d` : "rgba(255,255,255,0.04)",
              border: `1px solid ${f.updated ? `${accent}25` : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-maitree), serif" }}>{f.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: f.updated ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "var(--font-maitree), serif", fontWeight: f.updated ? 500 : 400 }}>{f.value}</span>
              {f.updated && <span style={{ fontSize: "9px", color: accent, background: `${accent}18`, padding: "1px 6px", borderRadius: "4px", fontFamily: "var(--font-maitree), serif", letterSpacing: "0.5px" }}>AUTO</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Visual: Escalation flow */
function EscalationVisual({ accent }: { accent: string }) {
  const steps = [
    { icon: "🤖", label: "Agente IA", sub: "Atendendo chamada", color: accent },
    { icon: "🧠", label: "Análise",   sub: "Complexidade detectada", color: "#60a5fa" },
    { icon: "👤", label: "Humano",    sub: "Transferência com contexto", color: "#34d399" },
  ];
  return (
    <div style={{ padding: "32px", background: "rgba(0,0,0,0.3)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif", textTransform: "uppercase", letterSpacing: "2px" }}>Fluxo de transferência inteligente</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 300 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: `${s.color}18`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{s.icon}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "12px", color: "#fff", fontFamily: "var(--font-maitree), serif", fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-maitree), serif", marginTop: "2px" }}>{s.sub}</div>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: "2px", background: `linear-gradient(to right, ${steps[i].color}60, ${steps[i+1].color}60)`, margin: "0 8px", marginBottom: "32px" }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                  style={{ height: "100%", background: "inherit", transformOrigin: "left" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "24px", padding: "12px 16px", borderRadius: "10px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
        <span style={{ fontSize: "12px", color: "#34d399", fontFamily: "var(--font-maitree), serif" }}>
          ✓ Contexto completo enviado ao atendente: histórico, sentimento e dados do cliente
        </span>
      </div>
    </div>
  );
}

/* Visual: Analytics */
function AnalyticsVisual({ accent }: { accent: string }) {
  const metrics = [
    { label: "Chamadas Hoje",      value: "1.247", delta: "+12.5%", positive: true  },
    { label: "Taxa de Resolução",  value: "94.8%", delta: "+3.2%",  positive: true  },
    { label: "Tempo Médio",        value: "2m 14s", delta: "-8.1%",  positive: true  },
    { label: "Escalonamentos",     value: "5.2%",   delta: "-2.4%",  positive: true  },
  ];
  return (
    <div style={{ padding: "28px", background: "rgba(0,0,0,0.3)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-maitree), serif" }}>Painel de performance</span>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-maitree), serif" }}>Últimas 24h</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {metrics.map((m, i) => (
          <motion.div key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-baskerville), serif" }}>{m.value}</span>
              <span style={{ fontSize: "10px", color: "#34d399", fontWeight: 500, fontFamily: "var(--font-maitree), serif" }}>{m.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Mini chart */}
      <svg viewBox="0 0 300 60" style={{ width: "100%", height: "60px" }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,45 C40,38 70,20 110,18 C150,16 180,35 210,12 C240,0 270,10 300,8 L300,60 L0,60 Z" fill="url(#ag)" />
        <path d="M0,45 C40,38 70,20 110,18 C150,16 180,35 210,12 C240,0 270,10 300,8" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.7" />
      </svg>
    </div>
  );
}

const FEATURES = [
  {
    label: "Qualidade de voz",
    title: "Voz que soa como humana, não como robô",
    desc: "Nossos agentes utilizam modelos de síntese neural de última geração. Pausas naturais, entonação contextual e pronúncia perfeita em PT-BR — seus clientes não percebem a diferença.",
    bullets: ["Latência abaixo de 200ms na resposta", "Entonação adaptada ao sentimento do cliente", "Sotaque e vocabulário customizáveis por região"],
    visual: (a: string) => <VoiceVisual accent={a} />,
    flip: false,
  },
  {
    label: "CRM inteligente",
    title: "Seu CRM atualizado em tempo real, automaticamente",
    desc: "Cada chamada enriquece seu CRM com dados extraídos pela IA: intenção de compra, objeções, próximos passos acordados. Nenhuma informação se perde entre a ligação e o registro.",
    bullets: ["Integração nativa com HubSpot, Salesforce e Pipedrive", "Criação automática de negócios e tarefas", "Tags e categorias configuráveis por script"],
    visual: (a: string) => <CRMVisual accent={a} />,
    flip: true,
  },
  {
    label: "Transferência inteligente",
    title: "Escalone para humanos no momento certo",
    desc: "Quando a complexidade da chamada ultrapassa o script do agente, a transferência acontece instantaneamente — com todo o contexto da conversa já disponível para o atendente.",
    bullets: ["Detecção automática de complexidade e frustração", "Contexto completo enviado ao atendente", "Sem precisar o cliente repetir informações"],
    visual: (a: string) => <EscalationVisual accent={a} />,
    flip: false,
  },
  {
    label: "Analytics avançado",
    title: "Dados que revelam o que está funcionando",
    desc: "Painel em tempo real com métricas de performance, análise de sentimento por chamada, taxas de resolução e exportação de transcrições para treinamento contínuo do agente.",
    bullets: ["Transcrições completas com marcação de sentimento", "Relatórios de performance por agente e período", "Alertas automáticos para quedas de qualidade"],
    visual: (a: string) => <AnalyticsVisual accent={a} />,
    flip: true,
  },
];

function FeatureSplit({ feature, index, accent }: { feature: typeof FEATURES[number]; index: number; accent: string }) {
  const [ref, visible] = useScrollReveal(0.1);
  const textSide = (
    <motion.div
      initial={{ opacity: 0, x: feature.flip ? 40 : -40, filter: "blur(6px)" }}
      animate={visible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span style={{ fontSize: "10px", color: accent, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "14px" }}>{feature.label}</span>
      <h3 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 400, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>{feature.title}</h3>
      <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "15px", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, marginBottom: "28px" }}>{feature.desc}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {feature.bullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${accent}18`, border: `1px solid ${accent}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-maitree), serif", lineHeight: 1.6 }}>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
  const visualSide = (
    <motion.div
      initial={{ opacity: 0, x: feature.flip ? -40 : 40, filter: "blur(6px)" }}
      animate={visible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
    >
      {feature.visual(accent)}
    </motion.div>
  );

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 24px" }}>
      <div className="split" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {feature.flip ? <>{visualSide}{textSide}</> : <>{textSide}{visualSide}</>}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 3 — Use cases by industry
══════════════════════════════════════════════════════════════════════ */

const INDUSTRIES = [
  {
    icon: "🏥", label: "Saúde",
    cases: ["Agendamento e confirmação de consultas", "Lembretes de exames e retornos", "Triagem inicial de sintomas"],
  },
  {
    icon: "💼", label: "Vendas",
    cases: ["Qualificação automática de leads", "Follow-up após demonstrações", "Reativação de contatos frios"],
  },
  {
    icon: "💰", label: "Cobrança",
    cases: ["Lembretes de faturas em aberto", "Negociação de parcelamentos", "Confirmação de pagamentos"],
  },
  {
    icon: "🎧", label: "Suporte",
    cases: ["Atendimento de dúvidas frequentes", "Abertura e acompanhamento de tickets", "Pesquisa de satisfação pós-atendimento"],
  },
  {
    icon: "📅", label: "Agendamentos",
    cases: ["Marcação e remarcação online", "Confirmação automática 24h antes", "Lista de espera inteligente"],
  },
  {
    icon: "📊", label: "Pesquisa",
    cases: ["NPS automatizado por voz", "Pesquisas de mercado em lote", "Coleta estruturada de dados"],
  },
];

function IndustrySection({ accent }: { accent: string }) {
  const [ref, visible] = useScrollReveal(0.05);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 24px", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <span style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "14px" }}>Casos de uso</span>
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
            Para qual segmento você atua?
          </h2>
          <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
            Agentes de voz adaptáveis a qualquer tipo de operação.
          </p>
        </div>
        <div className="grid-3" style={{ gap: "14px" }}>
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.label}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
              whileHover={{ y: -4, borderColor: `${accent}28`, boxShadow: `0 16px 40px rgba(0,0,0,0.2)`, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              style={{ padding: "28px", borderRadius: "18px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", cursor: "default" }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{ind.icon}</div>
              <h4 style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "16px", fontWeight: 400, color: "#fff", marginBottom: "14px" }}>{ind.label}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {ind.cases.map((c) => (
                  <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: accent, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>›</span>
                    <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-maitree), serif", lineHeight: 1.55 }}>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 4 — Before vs. After comparison
══════════════════════════════════════════════════════════════════════ */

const COMPARISON = [
  { topic: "Disponibilidade",      before: "Seg–Sex, 08h–18h",       after: "24/7, 365 dias" },
  { topic: "Tempo de espera",      before: "5–20 minutos",            after: "Atendimento imediato" },
  { topic: "Consistência",         before: "Varia por atendente",     after: "100% padronizado" },
  { topic: "Custo por chamada",    before: "R$ 8–25 (humano)",        after: "Centavos por minuto" },
  { topic: "Registro no CRM",      before: "Manual, sujeito a falhas", after: "Automático e completo" },
  { topic: "Escalabilidade",       before: "Limitada por headcount",  after: "Ilimitada, instantânea" },
];

function ComparisonSection({ accent }: { accent: string }) {
  const [ref, visible] = useScrollReveal(0.05);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <span style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "14px" }}>Comparativo</span>
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Atendimento tradicional vs. Voic.IA
          </h2>
        </div>

        <div style={{ borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", opacity: visible ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s", overflowX: "auto" }}>
          <div style={{ minWidth: "540px" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ padding: "14px 24px" }} />
            <div style={{ padding: "14px 20px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-maitree), serif" }}>Atendimento tradicional</span>
            </div>
            <div style={{ padding: "14px 20px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)", background: `${accent}08` }}>
              <span style={{ fontSize: "12px", color: accent, fontFamily: "var(--font-maitree), serif", fontWeight: 600 }}>Voic.IA</span>
            </div>
          </div>

          {COMPARISON.map((row, ri) => (
            <motion.div
              key={row.topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.07, duration: 0.5, ease: EASE }}
              style={{
                display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr",
                background: ri % 2 === 0 ? "rgba(255,255,255,0.012)" : "transparent",
                borderBottom: ri < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-maitree), serif" }}>{row.topic}</div>
              <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.04)", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {row.before}
              </div>
              <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.04)", background: `${accent}05`, fontSize: "12px", color: "#fff", fontFamily: "var(--font-maitree), serif", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span style={{ color: "#34d399", fontSize: "10px" }}>✓</span> {row.after}
              </div>
            </motion.div>
          ))}
          </div>{/* minWidth wrapper */}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */

export default function FuncionalidadesPage() {
  const [tweaks] = useState<Tweaks>(DEFAULTS);

  return (
    <>
      <CursorGlow color={tweaks.accentColor} />
      <Navbar tweaks={tweaks} />

      <PageHero
        tweaks={tweaks}
        badge="Funcionalidades"
        titleBefore="Tudo que seu"
        titleAccent="agente"
        titleAfter="precisa para performar"
        subtitle="Voz ultra-realista, CRM integrado, análise de sentimentos e escalonamento inteligente — em uma única plataforma."
      />

      {/* Stats */}
      <section style={{ padding: "72px 24px" }}>
        <div className="grid-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} accent={tweaks.accentColor} index={i} />)}
        </div>
      </section>

      {/* Feature deep-dives */}
      {FEATURES.map((f, i) => (
        <FeatureSplit key={f.label} feature={f} index={i} accent={tweaks.accentColor} />
      ))}

      <IndustrySection accent={tweaks.accentColor} />
      <ComparisonSection accent={tweaks.accentColor} />

      <CTABand tweaks={tweaks} />
      <Footer tweaks={tweaks} />
    </>
  );
}
