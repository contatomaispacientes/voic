"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ── Plan data ───────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter",
    monthly: "R$ 0",
    annual: "R$ 0",
    period: "/mês",
    desc: "Para testar a plataforma",
    highlight: false,
    cta: "Começar grátis",
    features: ["50 min de chamadas/mês", "1 agente de voz", "Vozes padrão", "Dashboard básico", "Suporte por email"],
  },
  {
    name: "Pro",
    monthly: "R$ 297",
    annual: "R$ 238",
    period: "/mês",
    desc: "Para negócios em crescimento",
    highlight: true,
    cta: "Começar agora",
    features: ["2.000 min de chamadas/mês", "5 agentes de voz", "Vozes premium", "Integrações avançadas", "Análise em tempo real", "Suporte prioritário"],
  },
  {
    name: "Enterprise",
    monthly: "Sob consulta",
    annual: "Sob consulta",
    period: "",
    desc: "Para grandes operações",
    highlight: false,
    cta: "Falar com vendas",
    features: ["Minutos ilimitados", "Agentes ilimitados", "Vozes customizadas", "API dedicada", "SLA garantido", "Gerente de conta"],
  },
];

/* ── Comparison table ────────────────────────────────────────────────── */
const TABLE_ROWS = [
  { feature: "Minutos/mês",      starter: "50 min",    pro: "2.000 min",  enterprise: "Ilimitado" },
  { feature: "Agentes de voz",   starter: "1",          pro: "5",          enterprise: "Ilimitado" },
  { feature: "Qualidade de voz", starter: "Padrão",     pro: "Premium",    enterprise: "Customizada" },
  { feature: "Integrações",      starter: "Básicas",    pro: "Avançadas",  enterprise: "Completas" },
  { feature: "API REST",         starter: false,        pro: true,         enterprise: true },
  { feature: "Análise em tempo real", starter: false,   pro: true,         enterprise: true },
  { feature: "SLA garantido",    starter: false,        pro: false,        enterprise: true },
  { feature: "Gerente de conta", starter: false,        pro: false,        enterprise: true },
  { feature: "Suporte",          starter: "Email",      pro: "Prioritário",enterprise: "Dedicado" },
];

/* ── FAQ de cobrança ─────────────────────────────────────────────────── */
const BILLING_FAQS = [
  { q: "Posso cancelar a qualquer momento?", a: "Sim, sem fidelidade. Cancele quando quiser pelo painel e não será cobrado no próximo ciclo." },
  { q: "Como funciona a cobrança de minutos?", a: "Os minutos são contabilizados por chamada completa. Minutos não utilizados não acumulam para o próximo mês." },
  { q: "Existe período de teste gratuito?", a: "Sim, o plano Starter é gratuito para sempre com 50 minutos por mês. Não é necessário cartão de crédito." },
  { q: "Como funciona o desconto anual?", a: "Pagando anualmente, você economiza 20% em relação ao plano mensal. O valor é cobrado uma única vez no início do período." },
  { q: "Posso mudar de plano depois?", a: "Sim, você pode fazer upgrade ou downgrade a qualquer momento. Mudanças de plano são aplicadas imediatamente com cobrança proporcional." },
];

/* ── Price display with animation ────────────────────────────────────── */
function AnimatedPrice({ value, accent }: { value: string; accent: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "34px", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/* ── Plan card ───────────────────────────────────────────────────────── */
function PlanCard({ plan, annual, index, accent }: {
  plan: (typeof PLANS)[number];
  annual: boolean;
  index: number;
  accent: string;
}) {
  const price = annual ? plan.annual : plan.monthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6, boxShadow: plan.highlight ? `0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px ${accent}35` : "0 20px 48px rgba(0,0,0,0.28)", transition: { type: "spring", stiffness: 300, damping: 22 } }}
      style={{
        padding: "36px 28px", borderRadius: "20px", textAlign: "left",
        background: plan.highlight ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.018)",
        border: `1px solid ${plan.highlight ? `${accent}28` : "rgba(255,255,255,0.06)"}`,
        position: "relative", cursor: "default", willChange: "transform",
      }}
    >
      {plan.highlight && (
        <div style={{
          position: "absolute", top: "20px", right: "20px",
          padding: "3px 12px", borderRadius: "100px", fontSize: "10px",
          fontFamily: "var(--font-maitree), serif",
          background: `${accent}20`, color: accent, border: `1px solid ${accent}35`,
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>Popular</div>
      )}

      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "10px", fontFamily: "var(--font-maitree), serif" }}>{plan.name}</div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
        <AnimatedPrice value={price} accent={accent} />
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-maitree), serif" }}>{plan.period}</span>
      </div>

      {annual && plan.name === "Pro" && (
        <div style={{ marginBottom: "6px" }}>
          <span style={{ fontSize: "11px", color: "#34d399", fontFamily: "var(--font-maitree), serif", background: "rgba(52,211,153,0.1)", padding: "2px 8px", borderRadius: "100px" }}>
            Economize 20% pagando anualmente
          </span>
        </div>
      )}

      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px", fontFamily: "var(--font-maitree), serif" }}>{plan.desc}</p>

      <button style={{
        width: "100%", padding: "12px", borderRadius: "100px", fontSize: "13px", fontWeight: 500,
        fontFamily: "var(--font-maitree), serif",
        background: plan.highlight ? "#fff" : "transparent",
        color: plan.highlight ? "#080512" : "rgba(255,255,255,0.65)",
        border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer", marginBottom: "28px", transition: "all 0.25s ease",
        boxShadow: plan.highlight ? "0 1px 0 rgba(255,255,255,0.15) inset" : "none",
      }}
        onMouseEnter={(e) => { if (plan.highlight) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.12)"; } else { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.highlight ? "0 1px 0 rgba(255,255,255,0.15) inset" : "none"; if (!plan.highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; } }}
      >{plan.cta}</button>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {plan.features.map((feat, fi) => (
          <motion.div key={feat}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + fi * 0.04, duration: 0.4, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: plan.highlight ? `${accent}18` : "rgba(255,255,255,0.06)", border: `1px solid ${plan.highlight ? `${accent}35` : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke={plan.highlight ? accent : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-maitree), serif" }}>{feat}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Comparison table ────────────────────────────────────────────────── */
function ComparisonTable({ accent }: { accent: string }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Compare os planos
          </h2>
        </motion.div>

        <div style={{
          borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {/* Sticky header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ padding: "16px 24px" }} />
            {["Starter", "Pro", "Enterprise"].map((name, i) => (
              <div key={name} style={{
                padding: "16px 16px", textAlign: "center",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                background: i === 1 ? `${accent}08` : "transparent",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: i === 1 ? accent : "#fff", fontFamily: "var(--font-maitree), serif" }}>{name}</span>
              </div>
            ))}
          </div>

          {TABLE_ROWS.map((row, ri) => (
            <div key={row.feature} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
              background: ri % 2 === 0 ? "rgba(255,255,255,0.012)" : "transparent",
              borderBottom: ri < TABLE_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div style={{ padding: "14px 24px", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-maitree), serif" }}>
                {row.feature}
              </div>
              {[row.starter, row.pro, row.enterprise].map((val, ci) => (
                <div key={ci} style={{
                  padding: "14px 16px", textAlign: "center",
                  borderLeft: "1px solid rgba(255,255,255,0.04)",
                  background: ci === 1 ? `${accent}05` : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {typeof val === "boolean" ? (
                    val ? (
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M1 6L5.5 10.5L15 1.5" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "16px" }}>—</span>
                    )
                  ) : (
                    <span style={{ fontSize: "12px", color: ci === 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)", fontFamily: "var(--font-maitree), serif" }}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Billing FAQ ─────────────────────────────────────────────────────── */
function BillingFAQItem({ faq, accent }: { faq: { q: string; a: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <motion.div
        onClick={() => setOpen(!open)}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <span style={{ fontSize: "15px", color: open ? "#fff" : "rgba(255,255,255,0.6)", fontFamily: "var(--font-baskerville), serif", transition: "color 0.25s" }}>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{ color: open ? accent : "rgba(255,255,255,0.2)", fontSize: "20px", flexShrink: 0, marginLeft: "16px", display: "inline-block" }}>+</motion.span>
      </motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, margin: 0, paddingBottom: "20px", fontFamily: "var(--font-maitree), serif" }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function PrecosPage() {
  const [tweaks] = useState<Tweaks>(DEFAULTS);
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <CursorGlow color={tweaks.accentColor} />
      <Navbar tweaks={tweaks} />

      <PageHero
        tweaks={tweaks}
        badge="Preços"
        titleBefore="Planos que"
        titleAccent="crescem"
        titleAfter="com você"
        subtitle="Comece grátis. Sem cartão de crédito. Faça upgrade quando precisar de mais."
      />

      {/* Toggle mensal/anual */}
      <div style={{ display: "flex", justifyContent: "center", padding: "48px 24px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          padding: "4px", borderRadius: "100px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {[{ label: "Mensal", value: false }, { label: "Anual", value: true }].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAnnual(opt.value)}
              style={{
                padding: "8px 24px", borderRadius: "100px", fontSize: "13px", fontWeight: 500,
                fontFamily: "var(--font-maitree), serif", border: "none", cursor: "pointer",
                background: annual === opt.value ? "#fff" : "transparent",
                color: annual === opt.value ? "#080512" : "rgba(255,255,255,0.5)",
                transition: "all 0.25s ease",
              }}
            >
              {opt.label}
              {opt.value && (
                <span style={{ marginLeft: "6px", fontSize: "10px", color: annual ? "#22c55e" : "rgba(52,211,153,0.7)", fontWeight: 600 }}>
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} index={i} accent={tweaks.accentColor} />
          ))}
        </div>
      </section>

      <ComparisonTable accent={tweaks.accentColor} />

      {/* Billing FAQ */}
      <section style={{ padding: "60px 24px 100px", maxWidth: "720px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span style={{ fontSize: "11px", color: tweaks.accentColor, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "14px" }}>Dúvidas</span>
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Perguntas sobre cobrança
          </h2>
        </motion.div>
        <div>
          {BILLING_FAQS.map((faq) => (
            <BillingFAQItem key={faq.q} faq={faq} accent={tweaks.accentColor} />
          ))}
        </div>
      </section>

      <CTABand tweaks={tweaks} />
      <Footer tweaks={tweaks} />
    </>
  );
}
