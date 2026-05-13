"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CursorGlow } from "@/components/ui/CursorGlow";
import PageHero from "@/components/ui/PageHero";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CTABand from "@/components/sections/CTABand";
import Integrations from "@/components/sections/Integrations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FaWhatsapp, FaSlack, FaStripe } from "react-icons/fa";
import { SiGooglecalendar, SiSalesforce, SiHubspot, SiTwilio, SiZapier } from "react-icons/si";
import { TbWebhook, TbApi } from "react-icons/tb";
import type { Tweaks } from "@/types/tweaks";

const DEFAULTS: Tweaks = {
  accentColor: "#8b5cf6",
  accentColorDark: "#6d28d9",
  heroStyle: "a",
  headlineSize: "medio",
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Integration categories ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: "CRM",
    desc: "Sincronize leads, contatos e oportunidades automaticamente após cada chamada.",
    items: [
      { name: "HubSpot",    icon: <SiHubspot    size={22} color="#FF7A59" /> },
      { name: "Salesforce", icon: <SiSalesforce size={22} color="#00A1E0" /> },
      { name: "Pipedrive",  icon: <span style={{ fontSize: "11px", fontWeight: 700, color: "#00B16A" }}>PD</span> },
      { name: "RD Station", icon: <span style={{ fontSize: "11px", fontWeight: 700, color: "#00BCD4" }}>RD</span> },
    ],
  },
  {
    label: "Comunicação",
    desc: "Envie mensagens em múltiplos canais durante e após as chamadas telefônicas.",
    items: [
      { name: "WhatsApp", icon: <FaWhatsapp size={22} color="#25D366" /> },
      { name: "Slack",    icon: <FaSlack    size={22} color="#E01E5A" /> },
      { name: "Twilio",   icon: <SiTwilio   size={22} color="#F22F46" /> },
      { name: "Zapier",   icon: <SiZapier   size={22} color="#FF4A00" /> },
    ],
  },
  {
    label: "Calendário",
    desc: "Agende compromissos em tempo real e envie convites automaticamente.",
    items: [
      { name: "Google Calendar", icon: <SiGooglecalendar size={20} color="#4285F4" /> },
      { name: "Zapier",          icon: <SiZapier        size={20} color="#FF4A00" /> },
      { name: "Stripe",          icon: <FaStripe        size={20} color="#635BFF" /> },
      { name: "Webhook",         icon: <TbWebhook       size={20} color="rgba(255,255,255,0.6)" /> },
    ],
  },
  {
    label: "Infraestrutura",
    desc: "Conecte qualquer sistema via API REST ou webhooks personalizados.",
    items: [
      { name: "Stripe",   icon: <FaStripe  size={22} color="#635BFF" /> },
      { name: "Twilio",   icon: <SiTwilio  size={22} color="#F22F46" /> },
      { name: "Webhook",  icon: <TbWebhook size={22} color="rgba(255,255,255,0.6)" /> },
      { name: "API REST", icon: <TbApi     size={22} color="rgba(255,255,255,0.6)" /> },
    ],
  },
];

/* ── Category card ───────────────────────────────────────────────────── */
function CategoryCard({
  cat,
  index,
  accent,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -4, borderColor: `${accent}30`, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      style={{
        padding: "28px", borderRadius: "20px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        cursor: "default",
      }}
    >
      <span style={{
        fontSize: "10px", color: accent, textTransform: "uppercase",
        letterSpacing: "2.5px", fontFamily: "var(--font-maitree), serif",
        display: "block", marginBottom: "12px",
      }}>{cat.label}</span>
      <p style={{
        fontSize: "13px", color: "rgba(255,255,255,0.38)",
        fontFamily: "var(--font-maitree), serif", lineHeight: 1.65,
        marginBottom: "24px", minHeight: "40px",
      }}>{cat.desc}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {cat.items.map((item) => (
          <div key={item.name} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.icon}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-maitree), serif" }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── API section ─────────────────────────────────────────────────────── */
const CODE_LINES = [
  { t: "comment", v: "// Criar chamada com agente de voz" },
  { t: "keyword", v: "const" },
  { t: "var",     v: " response" },
  { t: "op",      v: " = await" },
  { t: "fn",      v: " voic" },
  { t: "text",    v: ".calls.create({" },
  { t: "key",     v: "  agentId" },
  { t: "text",    v: ': "ag_marcos_br",' },
  { t: "key",     v: "  to" },
  { t: "text",    v: ': "+5511999998888",' },
  { t: "key",     v: "  language" },
  { t: "text",    v: ': "pt-BR",' },
  { t: "key",     v: "  webhook" },
  { t: "text",    v: ': "https://sua-api.com/webhook"' },
  { t: "text",    v: "});" },
];

const TOKEN_COLOR: Record<string, string> = {
  comment: "rgba(255,255,255,0.28)",
  keyword: "#c084fc",
  var:     "#fff",
  op:      "#60a5fa",
  fn:      "#34d399",
  key:     "#f9a8d4",
  text:    "rgba(255,255,255,0.65)",
};

function ApiSection({ accent }: { accent: string }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "80px 24px" }}
    >
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Left */}
        <div>
          <span style={{ fontSize: "11px", color: accent, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree), serif", display: "block", marginBottom: "16px" }}>
            API & Webhooks
          </span>
          <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: "18px" }}>
            Construa com nossa API REST
          </h2>
          <p style={{ fontFamily: "var(--font-maitree), serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, marginBottom: "32px" }}>
            Integre agentes de voz diretamente nos seus sistemas. Documentação completa, SDKs em múltiplas linguagens e webhooks em tempo real.
          </p>
          {["Documentação interativa com exemplos", "SDKs para Node.js, Python e Go", "Webhooks em tempo real para cada evento", "Rate limiting generoso e SLA de 99.9%"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${accent}18`, border: `1px solid ${accent}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-maitree), serif" }}>{item}</span>
            </div>
          ))}
          <button style={{
            marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 26px", borderRadius: "100px", fontSize: "13px", fontWeight: 500,
            fontFamily: "var(--font-maitree), serif",
            background: "#fff", color: "#080512", border: "none", cursor: "pointer",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Ver documentação →
          </button>
        </div>

        {/* Right: code block */}
        <div style={{
          background: "rgba(0,0,0,0.5)", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          boxShadow: `0 24px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: "8px", fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-maitree), serif" }}>voic-api.ts</span>
          </div>
          {/* Code */}
          <div style={{ padding: "20px 24px", fontFamily: "monospace", fontSize: "13px", lineHeight: 1.8 }}>
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ color: TOKEN_COLOR[line.t] ?? "#fff", whiteSpace: "pre" }}>
                {line.v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function IntegracoesPage() {
  const [tweaks] = useState<Tweaks>(DEFAULTS);

  return (
    <>
      <CursorGlow color={tweaks.accentColor} />
      <Navbar tweaks={tweaks} />

      <PageHero
        tweaks={tweaks}
        badge="Integrações"
        titleBefore="Conecte com as"
        titleAccent="ferramentas"
        titleAfter="que você já usa"
        subtitle="Integração nativa com mais de 40 plataformas. Conecte CRM, calendário, comunicação e infraestrutura sem esforço."
      />

      <Integrations tweaks={tweaks} />

      {/* Categories grid */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <h2 style={{ fontFamily: "var(--font-kadwa), serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
              Organizado por categoria
            </h2>
            <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", marginTop: "12px", lineHeight: 1.7 }}>
              Escolha as ferramentas certas para o seu fluxo de trabalho.
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.label} cat={cat} index={i} accent={tweaks.accentColor} />
            ))}
          </div>
        </div>
      </section>

      <ApiSection accent={tweaks.accentColor} />

      <CTABand tweaks={tweaks} />
      <Footer tweaks={tweaks} />
    </>
  );
}
