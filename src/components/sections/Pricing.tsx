"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Tweaks } from "@/types/tweaks";

const PLANS = [
  {
    name: "Starter",
    price: "R$ 0",
    period: "/mês",
    desc: "Para testar a plataforma",
    highlight: false,
    cta: "Começar grátis",
    features: [
      "50 min de chamadas/mês",
      "1 agente de voz",
      "Vozes padrão",
      "Dashboard básico",
      "Suporte por email",
    ],
  },
  {
    name: "Pro",
    price: "R$ 297",
    period: "/mês",
    desc: "Para negócios em crescimento",
    highlight: true,
    cta: "Começar agora",
    features: [
      "2.000 min de chamadas/mês",
      "5 agentes de voz",
      "Vozes premium",
      "Integrações avançadas",
      "Análise em tempo real",
      "Suporte prioritário",
    ],
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    desc: "Para grandes operações",
    highlight: false,
    cta: "Falar com vendas",
    features: [
      "Minutos ilimitados",
      "Agentes ilimitados",
      "Vozes customizadas",
      "API dedicada",
      "SLA garantido",
      "Gerente de conta",
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function PlanCard({
  plan,
  index,
  accentColor,
}: {
  plan: (typeof PLANS)[number];
  index: number;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      whileHover={{
        y: -6,
        boxShadow: plan.highlight
          ? `0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px ${accentColor}35`
          : "0 20px 48px rgba(0,0,0,0.28)",
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      style={{
        padding: "36px 28px",
        borderRadius: "20px",
        textAlign: "left",
        background: plan.highlight
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.018)",
        border: `1px solid ${
          plan.highlight ? `${accentColor}28` : "rgba(255,255,255,0.06)"
        }`,
        position: "relative",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {/* Popular badge */}
      {plan.highlight && (
        <div style={{
          position: "absolute", top: "20px", right: "20px",
          padding: "3px 12px", borderRadius: "100px",
          fontSize: "10px", fontFamily: "var(--font-maitree), serif",
          background: `${accentColor}20`, color: accentColor,
          border: `1px solid ${accentColor}35`,
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>
          Popular
        </div>
      )}

      {/* Plan name */}
      <div style={{
        fontSize: "13px", color: "rgba(255,255,255,0.4)",
        marginBottom: "10px", fontFamily: "var(--font-maitree), serif",
        letterSpacing: "0.2px",
      }}>
        {plan.name}
      </div>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
        <span style={{
          fontSize: "34px", fontWeight: 400, color: "#fff",
          fontFamily: "var(--font-kadwa), serif", letterSpacing: "-0.02em",
        }}>
          {plan.price}
        </span>
        <span style={{
          fontSize: "13px", color: "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-maitree), serif",
        }}>
          {plan.period}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px", color: "rgba(255,255,255,0.3)",
        marginBottom: "28px", fontFamily: "var(--font-maitree), serif", lineHeight: 1.5,
      }}>
        {plan.desc}
      </p>

      {/* CTA button */}
      <button
        style={{
          width: "100%", padding: "12px",
          borderRadius: "100px", fontSize: "13px", fontWeight: 500,
          fontFamily: "var(--font-maitree), serif",
          background: plan.highlight ? "#fff" : "transparent",
          color: plan.highlight ? "#080512" : "rgba(255,255,255,0.65)",
          border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer", marginBottom: "28px",
          transition: "all 0.25s ease",
          boxShadow: plan.highlight ? "0 1px 0 rgba(255,255,255,0.15) inset" : "none",
          letterSpacing: "0.1px",
        }}
        onMouseEnter={(e) => {
          if (plan.highlight) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.12)";
          } else {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "#fff";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = plan.highlight
            ? "0 1px 0 rgba(255,255,255,0.15) inset"
            : "none";
          if (!plan.highlight) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.65)";
          }
        }}
      >
        {plan.cta}
      </button>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {plan.features.map((feat, fi) => (
          <motion.div
            key={feat}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + fi * 0.04, duration: 0.4, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div style={{
              width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
              background: plan.highlight ? `${accentColor}18` : "rgba(255,255,255,0.06)",
              border: `1px solid ${plan.highlight ? `${accentColor}35` : "rgba(255,255,255,0.1)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke={plan.highlight ? accentColor : "rgba(255,255,255,0.3)"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{
              fontSize: "13px", color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-maitree), serif",
            }}>
              {feat}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Pricing({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="precos"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "100px 24px", textAlign: "center" }}
    >
      <SectionHeader
        label="Preços"
        title="Planos que crescem<br/>com você"
        visible={visible}
        accentColor={tweaks.accentColor}
      />

      <div className="grid-3" style={{ maxWidth: "960px", margin: "0 auto" }}>
        {PLANS.map((plan, i) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            index={i}
            accentColor={tweaks.accentColor}
          />
        ))}
      </div>
    </section>
  );
}
