"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

// ── Agent UI Mockup ───────────────────────────────────────────────────────────
function AgentMockup({ accent }: { accent: string }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Background orbit arcs */}
      {[180, 240, 300].map((size, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${size}px`, height: `${size}px`,
          borderRadius: "50%",
          border: `1px solid ${accent}${18 - i * 4}`,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }} />
      ))}

      {/* Main purple card */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "280px",
        borderRadius: "20px",
        background: `linear-gradient(135deg, ${accent}cc 0%, #4c1d95dd 100%)`,
        padding: "20px",
        boxShadow: `0 24px 60px ${accent}35, 0 0 0 1px ${accent}40`,
      }}>
        {/* Language dropdown */}
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: "10px",
          padding: "8px 12px", marginBottom: "10px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: "13px", color: "#fff", fontFamily: "var(--font-maitree), serif",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span>Português (BR)</span>
          <span style={{ opacity: 0.6 }}>▾</span>
        </div>

        {/* Voice dropdown */}
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: "10px",
          padding: "8px 12px", marginBottom: "16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: "13px", color: "#fff", fontFamily: "var(--font-maitree), serif",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span>Voz: Marcos</span>
          <span style={{ opacity: 0.6 }}>▾</span>
        </div>

        {/* Avatar + pipeline row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "8px",
        }}>
          {/* Avatar */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "36px", flexShrink: 0,
            boxShadow: "0 0 0 4px rgba(255,255,255,0.15)",
          }}>
            🧑
          </div>

          {/* Pipeline card */}
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.12)", borderRadius: "12px",
            padding: "10px 12px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            {/* Lines placeholder */}
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.4)", marginBottom: "6px", width: "70%" }} />
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.25)", width: "50%", marginBottom: "10px" }} />
            {/* Icon row */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {["📹", "📞", "📅"].map((icon, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: i === 1 ? accent : "rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px",
                  }}>
                    {icon}
                  </div>
                  {i < 2 && (
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>─ ─</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings card — floating top-right */}
      <div style={{
        position: "absolute", top: "10%", right: "2%", zIndex: 20,
        width: "150px",
        background: "rgba(20,14,40,0.92)",
        borderRadius: "14px",
        padding: "14px",
        border: `1px solid ${accent}30`,
        boxShadow: `0 12px 32px rgba(0,0,0,0.4)`,
        backdropFilter: "blur(12px)",
      }}>
        {[
          { label: "Estabilidade", pct: 72 },
          { label: "Velocidade",   pct: 45 },
          { label: "Diarização",   pct: 88 },
        ].map((s) => (
          <div key={s.label} style={{ marginBottom: "10px" }}>
            <div style={{
              fontSize: "10px", color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-maitree), serif", marginBottom: "5px",
            }}>
              {s.label}
            </div>
            <div style={{
              height: "4px", borderRadius: "2px",
              background: "rgba(255,255,255,0.1)", position: "relative",
            }}>
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${s.pct}%`, borderRadius: "2px",
                background: `linear-gradient(to right, ${accent}, #60a5fa)`,
              }} />
              <div style={{
                position: "absolute", top: "50%", left: `${s.pct}%`,
                transform: "translate(-50%, -50%)",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#fff", boxShadow: "0 0 4px rgba(0,0,0,0.3)",
              }} />
            </div>
          </div>
        ))}

        {/* Create agent button */}
        <button style={{
          width: "100%", padding: "8px",
          borderRadius: "8px", fontSize: "11px",
          fontFamily: "var(--font-maitree), serif",
          background: accent, color: "#fff",
          border: "none", cursor: "pointer", marginTop: "2px",
          fontWeight: 600, letterSpacing: "0.3px",
        }}>
          Criar Agente
        </button>
      </div>
    </div>
  );
}

// ── Checklist item ─────────────────────────────────────────────────────────────
function CheckItem({ text, accent }: { text: string; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
      <div style={{
        width: "22px", height: "22px", borderRadius: "50%",
        background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: "2px",
      }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{
        fontSize: "14px", color: "rgba(255,255,255,0.75)",
        fontFamily: "var(--font-maitree), serif", lineHeight: 1.6,
      }}>
        {text}
      </span>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function HowItWorks({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="como-funciona"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center", marginBottom: "72px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <span style={{
            fontSize: "11px", color: tweaks.accentColor,
            textTransform: "uppercase", letterSpacing: "3px",
            fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "16px",
          }}>
            Como funciona
          </span>
          <h2 style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400,
            color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            Agentes de voz semelhantes<br />aos humanos
          </h2>
        </div>

        {/* ── Split card ── */}
        <div
          className="split-4456"
          style={{
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
            minHeight: "480px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Left: text */}
          <div style={{
            padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px) clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <h3 style={{
              fontFamily: "var(--font-kadwa), serif",
              fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 400,
              color: "#fff", lineHeight: 1.2, marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}>
              Crie seu agente em minutos com total controle
            </h3>
            <p style={{
              fontFamily: "var(--font-maitree), serif",
              fontSize: "14px", color: "rgba(255,255,255,0.38)", lineHeight: 1.75,
              marginBottom: "32px",
            }}>
              Configure facilmente seu agente de IA fornecendo um nome, selecionando
              idioma, sotaque e ajustando parâmetros avançados de voz:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
              {[
                "Treine instantaneamente com seus dados e scripts",
                "Implemente rapidamente usando plataforma sem código",
                "Automatize interações e colete dados em tempo real",
              ].map((text) => (
                <CheckItem key={text} text={text} accent={tweaks.accentColor} />
              ))}
            </div>

            <button style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "14px 32px", borderRadius: "100px",
              background: "#fff", color: "#080512",
              border: "none", cursor: "pointer",
              fontSize: "14px", fontWeight: 600,
              fontFamily: "var(--font-maitree), serif",
              width: "fit-content",
              transition: "all 0.25s ease",
              boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset";
              }}
            >
              Começar agora
            </button>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              {["✓ Teste gratuito de 14 dias", "✓ Sem cartão de crédito"].map((t) => (
                <span key={t} style={{
                  fontSize: "12px", color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-maitree), serif",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div style={{
            flex: 1, position: "relative",
            background: `linear-gradient(145deg, ${tweaks.accentColor}18 0%, rgba(76,29,149,0.15) 100%)`,
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            minHeight: "440px",
          }}>
            <AgentMockup accent={tweaks.accentColor} />
          </div>
        </div>
      </div>
    </section>
  );
}
