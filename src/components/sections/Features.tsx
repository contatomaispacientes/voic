"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stagger, staggerItem } from "@/lib/animations";
import type { Tweaks } from "@/types/tweaks";

// ── 3D tilt hook ──────────────────────────────────────────────────────────────
function useTilt(maxDeg = 8) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * maxDeg, y: px * maxDeg });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return { ref, tilt, onMove, onLeave };
}

// ── Card visual sub-components ────────────────────────────────────────────────

function AutomationVisual({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
      <motion.div
        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }} viewport={{ once: true }}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "7px 14px", borderRadius: "10px",
          background: `${accent}22`, border: `1px solid ${accent}35`,
          fontSize: "12px", fontFamily: "var(--font-maitree), serif", color: "#fff",
        }}
      >
        <span style={{ opacity: 0.7 }}>≡</span> Nova lista de CSV
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 300 }} viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "8px" }}
      >
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%", background: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", color: "#fff", fontWeight: 700, flexShrink: 0,
          boxShadow: `0 0 14px ${accent}50`,
        }}>+</div>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #ec4899)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", flexShrink: 0,
        }}>👤</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }} viewport={{ once: true }}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "7px 14px", borderRadius: "10px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px", fontFamily: "var(--font-maitree), serif", color: "rgba(255,255,255,0.8)",
        }}
      >
        📞 Ligação para leads
      </motion.div>
    </div>
  );
}

function WaveVisual({ accent }: { accent: string }) {
  return (
    <div style={{ width: "100%", height: "72px", position: "relative" }}>
      <svg viewBox="0 0 260 72" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d="M0,36 C40,10 80,62 130,36 C180,10 220,52 260,36"
          fill="none" stroke={accent} strokeWidth="2.5" strokeOpacity="0.7" />
        <path d="M0,48 C50,20 100,68 150,44 C200,20 230,60 260,44"
          fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.4" />
        {[200,210,220,230,240].map((x, i) => (
          <rect key={x} x={x} y={16 + i * 2} width="6" height={40 - i * 4} rx="3"
            fill={accent} fillOpacity={0.4 + i * 0.08} />
        ))}
      </svg>
    </div>
  );
}

function SentimentVisual({ accent }: { accent: string }) {
  const items = [
    { e: "😠", x: "60%", y: "8%",  bg: "#7c3aed", delay: 0.05 },
    { e: "😊", x: "18%", y: "38%", bg: accent,    delay: 0.2  },
    { e: "😐", x: "62%", y: "56%", bg: "#2563eb", delay: 0.35 },
  ];
  return (
    <div style={{ position: "relative", height: "82px", width: "100%" }}>
      {items.map((em) => (
        <motion.div key={em.e}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: em.delay, type: "spring", stiffness: 260 }}
          viewport={{ once: true }}
          style={{
            position: "absolute", left: em.x, top: em.y,
            padding: "8px 14px", borderRadius: "12px", background: em.bg,
            fontSize: "18px", boxShadow: `0 4px 16px ${em.bg}40`,
          }}
        >{em.e}</motion.div>
      ))}
    </div>
  );
}

function DiarizationVisual({ accent }: { accent: string }) {
  const bars = Array.from({ length: 28 }, (_, i) => {
    const t = (i / 27) * Math.PI * 4;
    return { h: 6 + (Math.sin(t + 1) * 0.5 + 0.5) * 12 };
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {[false, true].map((isAccent) => (
        <div key={String(isAccent)} style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 12px", borderRadius: "8px",
          background: isAccent ? `${accent}12` : "rgba(255,255,255,0.04)",
          border: `1px solid ${isAccent ? `${accent}25` : "rgba(255,255,255,0.08)"}`,
        }}>
          <span style={{ fontSize: "14px", flexShrink: 0 }}>{isAccent ? "▶" : "⏸"}</span>
          <div style={{ flex: 1, height: "18px", display: "flex", gap: "2px", alignItems: "center" }}>
            {bars.map((b, i) => (
              <div key={i} style={{
                width: "3px", borderRadius: "2px", height: `${b.h}px`,
                background: isAccent ? accent : "rgba(255,255,255,0.25)",
                opacity: isAccent ? 0.5 + (b.h / 18) * 0.5 : 0.3 + (b.h / 18) * 0.3,
              }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GlobalVisual({ accent }: { accent: string }) {
  const langs = ["Hallo", "Olá", "Bonjour", "नमस्ते", "Guten tag", "Hej"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {langs.map((lang, i) => {
        const highlighted = i === 1 || i === 5;
        return (
          <motion.span key={lang}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            viewport={{ once: true }}
            style={{
              padding: "6px 14px", borderRadius: "100px", fontSize: "13px",
              fontFamily: "var(--font-maitree), serif",
              background: highlighted ? accent : "rgba(255,255,255,0.07)",
              border: `1px solid ${highlighted ? "transparent" : "rgba(255,255,255,0.1)"}`,
              color: "#fff", fontWeight: highlighted ? 600 : 400,
              boxShadow: highlighted ? `0 0 18px ${accent}45` : "none",
            }}
          >{lang}</motion.span>
        );
      })}
    </div>
  );
}

function CalendarVisual({ accent }: { accent: string }) {
  return (
    <div style={{ position: "relative", height: "80px" }}>
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ delay: 0.2 }} viewport={{ once: true }}
        style={{
          position: "absolute", top: "22px", left: "20px",
          padding: "8px 14px", borderRadius: "10px", background: "#1e1b4b",
          border: "1px solid rgba(139,92,246,0.3)", minWidth: "165px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🗓</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-maitree), serif" }}>
            26 April 2024
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-maitree), serif", marginTop: "3px" }}>
          11 AM Meeting with Armando
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: 0.05 }} viewport={{ once: true }}
        style={{
          position: "absolute", top: "0px", left: "0px",
          padding: "8px 14px", borderRadius: "10px", background: accent,
          minWidth: "165px", boxShadow: `0 8px 24px ${accent}50`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🗓</span>
          <span style={{ fontSize: "11px", color: "#fff", fontFamily: "var(--font-maitree), serif" }}>
            7th June 2024
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-maitree), serif", marginTop: "3px" }}>
          1:30PM Meeting with Roj
        </div>
      </motion.div>
    </div>
  );
}

// ── Card data ─────────────────────────────────────────────────────────────────
const CARDS = [
  { id: "auto",       title: "Chamadas no piloto automático",  desc: "Envie SMS, e-mails e convites de calendário automaticamente durante e após as ligações.", visual: (a: string) => <AutomationVisual accent={a} /> },
  { id: "voice",      title: "Personalização de voz",           desc: "Ajuste a taxa de fala, velocidade, sotaque e nível de paciência do agente em tempo real.", visual: (a: string) => <WaveVisual accent={a} /> },
  { id: "sentiment",  title: "Análise de sentimentos",          desc: "Melhore a experiência do cliente com análise avançada de sentimentos e gerenciamento de voz.", visual: (a: string) => <SentimentVisual accent={a} /> },
  { id: "diarize",    title: "Diarização de chamadas",          desc: "Detecte interrupções, identifique locutores e determine o fim da conversa com precisão.", visual: (a: string) => <DiarizationVisual accent={a} /> },
  { id: "global",     title: "Conversas globais",               desc: "Interaja com seus clientes em mais de 30 idiomas com vozes naturais e expressivas.", visual: (a: string) => <GlobalVisual accent={a} /> },
  { id: "calendar",   title: "Agendamentos em tempo real",      desc: "Determine disponibilidade em tempo real e agende compromissos instantaneamente na ligação.", visual: (a: string) => <CalendarVisual accent={a} /> },
];

// ── Tilt card ─────────────────────────────────────────────────────────────────
function FeatureCard({ card, accent }: { card: (typeof CARDS)[number]; accent: string }) {
  const { ref, tilt, onMove, onLeave } = useTilt(7);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        padding: "28px", borderRadius: "20px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column", gap: "20px",
        cursor: "default",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      whileHover={{
        background: "rgba(255,255,255,0.042)",
        borderColor: `${accent}28`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px ${accent}15`,
      }}
    >
      <div style={{ minHeight: "88px", display: "flex", alignItems: "center" }}>
        {card.visual(accent)}
      </div>
      <div>
        <h3 style={{
          fontFamily: "var(--font-baskerville), serif",
          fontSize: "16px", fontWeight: 400, color: "#fff", marginBottom: "8px",
        }}>{card.title}</h3>
        <p style={{
          fontFamily: "var(--font-maitree), serif",
          fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, margin: 0,
        }}>{card.desc}</p>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Features({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="funcionalidades" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span style={{
            fontSize: "11px", color: tweaks.accentColor, textTransform: "uppercase",
            letterSpacing: "3px", fontFamily: "var(--font-maitree), serif",
            display: "block", marginBottom: "16px",
          }}>Funcionalidades</span>
          <h2 style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400,
            color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px",
          }}>
            Tudo que seu agente precisa<br />para performar como humano
          </h2>
          <p style={{
            fontFamily: "var(--font-baskerville), serif",
            fontSize: "16px", color: "rgba(255,255,255,0.35)",
            maxWidth: "440px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Recursos avançados para agentes de voz que realmente resolvem.
          </p>
        </motion.div>

        {/* Staggered bento grid */}
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid-3"
          style={{ perspective: "1200px" }}
        >
          {CARDS.map((card) => (
            <FeatureCard key={card.id} card={card} accent={tweaks.accentColor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
