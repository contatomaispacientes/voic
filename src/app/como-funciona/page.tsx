"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CursorGlow } from "@/components/ui/CursorGlow";
import PageHero from "@/components/ui/PageHero";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CTABand from "@/components/sections/CTABand";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

const DEFAULTS: Tweaks = {
  accentColor: "#8b5cf6",
  accentColorDark: "#6d28d9",
  heroStyle: "a",
  headlineSize: "medio",
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Steps ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Configure seu agente",
    summary: "Defina nome, personalidade e idioma",
    detail:
      "Crie o agente em minutos: escolha o nome, o sotaque, o tom de voz e o script base. Use nossa interface visual — sem precisar escrever código. Configure falas de abertura, respostas para perguntas frequentes e regras de escalonamento.",
    visual: (accent: string) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { label: "Nome do agente", value: "Marcos" },
          { label: "Idioma", value: "Português (BR)" },
          { label: "Tom de voz", value: "Profissional" },
        ].map((f) => (
          <div key={f.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-maitree), serif" }}>{f.label}</span>
            <span style={{ fontSize: "12px", color: "#fff", fontFamily: "var(--font-maitree), serif", fontWeight: 500 }}>{f.value}</span>
          </div>
        ))}
        <div style={{ padding: "8px 14px", borderRadius: "8px", background: `${accent}15`, border: `1px solid ${accent}30`, textAlign: "center" }}>
          <span style={{ fontSize: "12px", color: accent, fontFamily: "var(--font-maitree), serif", fontWeight: 600 }}>✓ Agente configurado</span>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "Conecte suas ferramentas",
    summary: "Integre com CRM, calendário e mais",
    detail:
      "Conecte o agente ao seu stack tecnológico em poucos cliques. HubSpot, Salesforce, Google Calendar, WhatsApp, Zapier e dezenas de outras ferramentas se integram nativamente, sem código.",
    visual: (accent: string) => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {["HubSpot", "Google Calendar", "WhatsApp", "Zapier"].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
            style={{
              padding: "10px 12px", borderRadius: "10px", textAlign: "center",
              background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}20`,
              fontSize: "12px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-maitree), serif",
            }}
          >
            {name}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "Ative e monitore",
    summary: "Seu agente atende chamadas 24/7",
    detail:
      "Com um clique, seu agente começa a atender e realizar chamadas automaticamente. Monitore cada conversa em tempo real, receba transcrições e análises de sentimento direto no painel.",
    visual: (accent: string) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[{ label: "Chamadas hoje", v: "1.247" }, { label: "Resolvidas", v: "94.8%" }].map((s) => (
            <div key={s.label} style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center", flex: 1, margin: "0 4px" }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-baskerville), serif" }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 14px", borderRadius: "8px", background: `${accent}10`, border: `1px solid ${accent}25`, display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d39980", flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-maitree), serif" }}>Agente ativo — respondendo em tempo real</span>
        </div>
      </div>
    ),
  },
  {
    n: "04",
    title: "Otimize continuamente",
    summary: "Aprimore com dados reais de chamadas",
    detail:
      "Acesse transcrições completas, análises de sentimento e métricas de performance. Use os insights para refinar scripts, identificar gargalos e melhorar a experiência do cliente continuamente.",
    visual: (accent: string) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { label: "Satisfação média", pct: 92, color: "#34d399" },
          { label: "Taxa de resolução", pct: 88, color: accent },
          { label: "Tempo médio de chamada", pct: 65, color: "#60a5fa" },
        ].map((m) => (
          <div key={m.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-maitree), serif" }}>{m.label}</span>
              <span style={{ fontSize: "11px", color: m.color, fontFamily: "var(--font-maitree), serif", fontWeight: 600 }}>{m.pct}%</span>
            </div>
            <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                style={{ height: "100%", borderRadius: "2px", background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

/* ── Timeline step card ──────────────────────────────────────────────── */
function TimelineStep({
  step,
  index,
  accent,
}: {
  step: (typeof STEPS)[number];
  index: number;
  accent: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isRight = index % 2 !== 0;

  return (
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexDirection: isRight ? "row-reverse" : "row" }}>
      {/* Step number + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.15 }}
          style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: `${accent}15`, border: `2px solid ${accent}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 20px ${accent}20`,
            zIndex: 1, position: "relative",
          }}
        >
          <span style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "14px", color: accent, fontWeight: 700 }}>{step.n}</span>
        </motion.div>
        {index < STEPS.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            style={{
              width: "2px", flex: 1, minHeight: "80px",
              background: `linear-gradient(to bottom, ${accent}40, transparent)`,
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
        style={{ flex: 1, marginBottom: "32px" }}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            padding: "28px", borderRadius: "20px", cursor: "pointer",
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${expanded ? `${accent}30` : "rgba(255,255,255,0.07)"}`,
            transition: "border-color 0.3s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: expanded ? "20px" : "0" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "20px", fontWeight: 400, color: "#fff", marginBottom: "6px" }}>{step.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-maitree), serif" }}>{step.summary}</p>
            </div>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ color: expanded ? accent : "rgba(255,255,255,0.3)", fontSize: "22px", fontWeight: 300, flexShrink: 0, marginLeft: "16px", display: "inline-block" }}
            >+</motion.span>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-maitree), serif", lineHeight: 1.75 }}>
                    {step.detail}
                  </p>
                  <div style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {step.visual(accent)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Live demo section ───────────────────────────────────────────────── */
const DEMO_BARS = Array.from({ length: 36 }, (_, i) => {
  const t = (i / 35) * Math.PI * 6;
  return { h: 8 + (Math.sin(t) * 0.5 + 0.5) * 28, delay: i * 0.025 };
});

function DemoSection({ accent }: { accent: string }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{
          borderRadius: "28px", padding: "56px 64px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <span style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "16px" }}>
            Demonstração
          </span>
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Ouça como soa um agente Voic.IA
          </h2>
          <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Voz natural, fluente em PT-BR, sem pausas robóticas.
          </p>

          {/* Waveform visual */}
          <div style={{ display: "flex", gap: "3px", alignItems: "center", justifyContent: "center", height: "48px", marginBottom: "28px" }}>
            {DEMO_BARS.map((bar, i) => (
              <div key={i} style={{
                width: "3px", borderRadius: "2px", background: accent,
                height: `${bar.h}px`,
                opacity: 0.3 + (bar.h / 36) * 0.5,
                animation: `wave ${0.6 + (i % 5) * 0.1}s ease-in-out infinite alternate`,
                animationDelay: `${bar.delay}s`,
              }} />
            ))}
          </div>

          <button style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "13px 30px", borderRadius: "100px", fontSize: "14px", fontWeight: 600,
            fontFamily: "var(--font-maitree), serif",
            background: "#fff", color: "#080512", border: "none", cursor: "pointer",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            ▶ Ouvir demonstração
          </button>

          {/* Metrics */}
          <div style={{ display: "flex", gap: "48px", justifyContent: "center", marginTop: "40px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { v: "< 15 min", label: "para configurar" },
              { v: "30+", label: "idiomas suportados" },
              { v: "99.9%", label: "de uptime" },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "26px", fontWeight: 400, color: "#fff", marginBottom: "4px" }}>{m.v}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function ComoFuncionaPage() {
  const [tweaks] = useState<Tweaks>(DEFAULTS);

  return (
    <>
      <CursorGlow color={tweaks.accentColor} />
      <Navbar tweaks={tweaks} />

      <PageHero
        tweaks={tweaks}
        badge="Como funciona"
        titleBefore="Do zero ao"
        titleAccent="automático"
        titleAfter="em minutos"
        subtitle="Configure seu agente de voz, conecte suas ferramentas e comece a automatizar chamadas sem escrever uma linha de código."
      />

      {/* Timeline */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <span style={{ fontSize: "11px", color: tweaks.accentColor, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "16px" }}>Processo</span>
            <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Quatro passos para automação total
            </h2>
            <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", marginTop: "14px", maxWidth: "400px", margin: "14px auto 0", lineHeight: 1.7 }}>
              Clique em cada passo para ver os detalhes.
            </p>
          </motion.div>

          <div>
            {STEPS.map((step, i) => (
              <TimelineStep key={step.n} step={step} index={i} accent={tweaks.accentColor} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks tweaks={tweaks} />
      <DemoSection accent={tweaks.accentColor} />
      <FAQ tweaks={tweaks} />
      <CTABand tweaks={tweaks} />
      <Footer tweaks={tweaks} />
    </>
  );
}
