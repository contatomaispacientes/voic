"use client";

import { useState, Suspense, lazy } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export default function CTABand({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "0 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "40px",
          border: `1px solid ${tweaks.accentColor}28`,
          background: "rgba(10,6,20,0.95)",
          minHeight: "560px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.5s ease",
        }}
      >
        {/* ── Dithering shader background ── */}
        <Suspense fallback={
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at center, ${tweaks.accentColor}15, transparent 70%)`,
          }} />
        }>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            pointerEvents: "none",
            opacity: hovered ? 0.45 : 0.28,
            mixBlendMode: "screen",
            transition: "opacity 0.6s ease",
          }}>
            <Dithering
              colorBack="#00000000"
              colorFront={tweaks.accentColor}
              shape="warp"
              type="4x4"
              speed={hovered ? 0.55 : 0.18}
              style={{ width: "100%", height: "100%" }}
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        {/* ── Vignette overlay ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,4,14,0.7) 100%)",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "relative", zIndex: 10,
          padding: "80px 32px",
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 16px", borderRadius: "100px", marginBottom: "36px",
            background: `${tweaks.accentColor}12`,
            border: `1px solid ${tweaks.accentColor}30`,
          }}>
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: tweaks.accentColor, opacity: 0.6,
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              <span style={{
                position: "relative", width: "8px", height: "8px",
                borderRadius: "50%", background: tweaks.accentColor,
              }} />
            </span>
            <span style={{
              fontSize: "12px", letterSpacing: "0.5px",
              color: tweaks.accentColor,
              fontFamily: "var(--font-maitree), serif",
            }}>
              Disponível 24/7 · Sem fila de espera
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 400,
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "24px",
          }}>
            Pronto para automatizar
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>
              suas chamadas?
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-baskerville), serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.75,
            maxWidth: "440px",
            marginBottom: "44px",
          }}>
            Comece grátis. Sem cartão de crédito.
            Seu primeiro agente ativo em menos de 15 minutos.
          </p>

          {/* CTA button */}
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              height: "52px", padding: "0 36px",
              borderRadius: "100px", border: "none",
              background: "#fff", color: "#080512",
              fontSize: "14px", fontWeight: 600,
              fontFamily: "var(--font-maitree), serif",
              letterSpacing: "0.1px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(255,255,255,0.15), 0 1px 0 rgba(255,255,255,0.15) inset";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset";
            }}
          >
            Agendar demonstração
            <ArrowRight
              size={16}
              style={{ transition: "transform 0.3s ease" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
