"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

// ── Waveform bars (deterministic) ─────────────────────────────────────────────
const WAVEFORM_BARS = Array.from({ length: 28 }, (_, i) => {
  const t = (i / 27) * Math.PI * 4;
  return {
    opacity: 0.15 + (Math.sin(t) * 0.5 + 0.5) * 0.35,
    height: 6 + (Math.sin(t + 1) * 0.5 + 0.5) * 24,
    duration: 0.5 + (Math.sin(i) * 0.5 + 0.5) * 0.5,
    delay: i * 0.04,
  };
});

// ── Conversation tabs ─────────────────────────────────────────────────────────
const DATA = {
  inbound: {
    label: "Entrada",
    number: "+55 (11) 9****-4321",
    status: "Chamada recebida",
    items: [
      "Atendimento automático 24/7 com vozes naturais",
      "Roteamento inteligente baseado em intenção",
      "Qualificação de leads em tempo real",
      "Transferência para humanos quando necessário",
    ],
    msgUser: "Gostaria de agendar uma consulta para amanhã.",
    msgAgent: "Tenho horários disponíveis às 10h e 14h. Qual prefere?",
  },
  outbound: {
    label: "Saída",
    number: "Maria Silva",
    status: "Chamada ativa",
    items: [
      "Campanhas de ligações com personalização",
      "Confirmação de agendamentos e lembretes",
      "Cobrança automatizada com tom adequado",
      "Pesquisas de satisfação pós-atendimento",
    ],
    msgUser: "Olá Maria, gostaria de confirmar seu agendamento.",
    msgAgent: "Perfeito, agendamento confirmado para terça às 15h.",
  },
};

// ── Action cards (screenshot 2) ───────────────────────────────────────────────
const ACTIONS = [
  {
    icon: "💬",
    title: "SMS durante a chamada",
    desc: "Envie mensagens SMS aos clientes imediatamente durante as chamadas telefônicas.",
  },
  {
    icon: "🔀",
    title: "Transferência inteligente",
    desc: "Redirecione ou transfira chamadas para um agente humano ao vivo quando necessário.",
  },
  {
    icon: "⚡",
    title: "Automação via Webhook",
    desc: "Colete dados de clientes e automatize ações usando Zapier e Webhooks.",
  },
  {
    icon: "✉️",
    title: "E-mails automáticos",
    desc: "Envie e-mails durante ou após uma chamada sem esforço.",
  },
  {
    icon: "📱",
    title: "WhatsApp na ligação",
    desc: "Envie mensagens do WhatsApp aos clientes durante chamadas telefônicas.",
  },
  {
    icon: "📅",
    title: "Agendamentos instantâneos",
    desc: "Agende compromissos e envie convites para o calendário durante a ligação.",
  },
];

// ── Action card component ─────────────────────────────────────────────────────
function ActionCard({
  action,
  index,
  visible,
  accent,
}: {
  action: (typeof ACTIONS)[number];
  index: number;
  visible: boolean;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: hovered ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? `${accent}25` : "rgba(255,255,255,0.07)"}`,
        display: "flex", alignItems: "flex-start", gap: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s, background 0.25s ease, border-color 0.25s ease`,
        cursor: "default",
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: "40px", height: "40px", borderRadius: "10px",
        background: `${accent}15`, border: `1px solid ${accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", flexShrink: 0,
      }}>
        {action.icon}
      </div>
      <div>
        <h4 style={{
          fontFamily: "var(--font-baskerville), serif",
          fontSize: "14px", fontWeight: 400, color: "#fff",
          marginBottom: "6px",
        }}>
          {action.title}
        </h4>
        <p style={{
          fontFamily: "var(--font-maitree), serif",
          fontSize: "12.5px", color: "rgba(255,255,255,0.38)", lineHeight: 1.6, margin: 0,
        }}>
          {action.desc}
        </p>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Calls({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();
  const [tab, setTab] = useState<"inbound" | "outbound">("inbound");
  const current = DATA[tab];

  return (
    <section
      id="chamadas"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>

        {/* ── Part 1: Inbound / Outbound demo ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        }}>
          {/* Left text */}
          <div>
            <span style={{
              fontSize: "11px", color: tweaks.accentColor, textTransform: "uppercase",
              letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "16px",
            }}>
              Chamadas
            </span>
            <h2 style={{
              fontFamily: "var(--font-kadwa), serif",
              fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#fff",
              lineHeight: 1.12, marginBottom: "14px", letterSpacing: "-0.02em",
            }}>
              Entrada e saída.<br />Sem limites.
            </h2>
            <p style={{
              fontFamily: "var(--font-maitree), serif",
              fontSize: "15px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "28px",
            }}>
              Seus agentes gerenciam chamadas recebidas e realizam ligações ativas
              com naturalidade e inteligência.
            </p>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
              {(["inbound", "outbound"] as const).map((key) => (
                <button key={key} onClick={() => setTab(key)} style={{
                  padding: "7px 20px", borderRadius: "100px", fontSize: "12px",
                  fontFamily: "var(--font-maitree), serif",
                  background: tab === key ? "rgba(255,255,255,0.07)" : "transparent",
                  color: tab === key ? "#fff" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${tab === key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                  cursor: "pointer", transition: "all 0.25s ease",
                }}>
                  {DATA[key].label}
                </button>
              ))}
            </div>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {current.items.map((item, i) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  fontSize: "14px", fontFamily: "var(--font-maitree), serif",
                  color: "rgba(255,255,255,0.5)",
                  animation: "fadeSlideIn 0.35s ease forwards",
                  animationDelay: `${i * 0.06}s`, opacity: 0,
                }}>
                  <div style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: tweaks.accentColor, flexShrink: 0, opacity: 0.7,
                  }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: call card */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px", padding: "32px",
          }}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center",
            }}>
              {/* Phone icon */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: `${tweaks.accentColor}10`, border: `1px solid ${tweaks.accentColor}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke={tweaks.accentColor} strokeWidth="1.5" strokeOpacity="0.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-maitree), serif" }}>
                {current.status}
              </span>
              <span style={{ fontSize: "17px", color: "#fff", fontFamily: "var(--font-baskerville), serif" }}>
                {current.number}
              </span>
              <span style={{
                fontSize: "10px", color: tweaks.accentColor,
                fontFamily: "var(--font-maitree), serif", opacity: 0.75,
                letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Agente IA respondendo
              </span>

              {/* Waveform */}
              <div style={{ display: "flex", gap: "2.5px", alignItems: "center", height: "32px", marginTop: "4px" }}>
                {WAVEFORM_BARS.map((bar, i) => (
                  <div key={i} style={{
                    width: "2px", borderRadius: "1px", background: tweaks.accentColor,
                    opacity: bar.opacity, height: `${bar.height}px`,
                    animation: `wave ${bar.duration}s ease-in-out infinite alternate`,
                    animationDelay: `${bar.delay}s`,
                  }} />
                ))}
              </div>

              {/* Conversation */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                <div style={{
                  alignSelf: "flex-start", padding: "10px 14px",
                  borderRadius: "12px 12px 12px 4px",
                  background: "rgba(255,255,255,0.04)", fontSize: "12px",
                  color: "rgba(255,255,255,0.5)", maxWidth: "80%",
                  fontFamily: "var(--font-maitree), serif",
                }}>
                  {current.msgUser}
                </div>
                <div style={{
                  alignSelf: "flex-end", padding: "10px 14px",
                  borderRadius: "12px 12px 4px 12px",
                  background: `${tweaks.accentColor}0d`, fontSize: "12px",
                  color: "rgba(255,255,255,0.6)", maxWidth: "80%",
                  fontFamily: "var(--font-maitree), serif",
                  border: `1px solid ${tweaks.accentColor}15`,
                }}>
                  {current.msgAgent}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Part 2: Action cards grid ── */}
        <div>
          <div style={{
            textAlign: "center", marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <h2 style={{
              fontFamily: "var(--font-kadwa), serif",
              fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 400,
              color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: "12px",
            }}>
              Automatize tarefas e ações
            </h2>
            <p style={{
              fontFamily: "var(--font-baskerville), serif",
              fontSize: "15px", color: "rgba(255,255,255,0.35)",
              maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
            }}>
              Configure os agentes de IA para automatizar uma variedade de tarefas durante e após as chamadas.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {ACTIONS.map((action, i) => (
              <ActionCard
                key={action.title}
                action={action}
                index={i}
                visible={visible}
                accent={tweaks.accentColor}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
