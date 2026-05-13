"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Tweaks } from "@/types/tweaks";

import { FaWhatsapp, FaSlack, FaStripe } from "react-icons/fa";
import {
  SiGooglecalendar,
  SiSalesforce,
  SiHubspot,
  SiTwilio,
  SiZapier,
} from "react-icons/si";
import { TbWebhook, TbApi } from "react-icons/tb";

// ─── orbit config ──────────────────────────────────────────────────────────────
type OrbitConfig = {
  radiusPx: number;         // distance from center to icon center
  durationS: number;
  direction: "cw" | "ccw";
  items: { label: string; icon: React.ReactNode }[];
};

const ORBITS: OrbitConfig[] = [
  {
    radiusPx: 110,
    durationS: 20,
    direction: "cw",
    items: [
      { label: "WhatsApp",        icon: <FaWhatsapp        size={20} color="#25D366" /> },
      { label: "Slack",           icon: <FaSlack           size={20} color="#E01E5A" /> },
      { label: "Google Calendar", icon: <SiGooglecalendar  size={18} color="#4285F4" /> },
      { label: "Stripe",          icon: <FaStripe          size={20} color="#635BFF" /> },
    ],
  },
  {
    radiusPx: 185,
    durationS: 32,
    direction: "ccw",
    items: [
      { label: "HubSpot",    icon: <SiHubspot    size={20} color="#FF7A59" /> },
      { label: "Salesforce", icon: <SiSalesforce size={20} color="#00A1E0" /> },
      { label: "Twilio",     icon: <SiTwilio     size={20} color="#F22F46" /> },
      { label: "Zapier",     icon: <SiZapier     size={20} color="#FF4A00" /> },
    ],
  },
  {
    radiusPx: 258,
    durationS: 46,
    direction: "cw",
    items: [
      {
        label: "Pipedrive",
        icon: <span style={{ fontSize: "10px", fontWeight: 700, color: "#00B16A" }}>PD</span>,
      },
      {
        label: "RD Station",
        icon: <span style={{ fontSize: "10px", fontWeight: 700, color: "#00BCD4" }}>RD</span>,
      },
      { label: "Webhook",  icon: <TbWebhook size={20} color="rgba(255,255,255,0.55)" /> },
      { label: "API REST", icon: <TbApi     size={20} color="rgba(255,255,255,0.55)" /> },
    ],
  },
];

// ─── single orbit ring ─────────────────────────────────────────────────────────
function Ring({ orbit, accentColor }: { orbit: OrbitConfig; accentColor: string }) {
  const diameter = orbit.radiusPx * 2;
  const ringAnim = orbit.direction === "cw" ? "orbit-cw" : "orbit-ccw";
  // icons counter-rotate to stay upright
  const iconAnim = orbit.direction === "cw" ? "icon-cw" : "icon-ccw";

  return (
    // Ring itself — centered in the orbit stage via translate(-50%,-50%) in the keyframe
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: "50%",
        border: "1px dashed rgba(255,255,255,0.07)",
        animation: `${ringAnim} ${orbit.durationS}s linear infinite`,
      }}
    >
      {orbit.items.map((item, i) => {
        // Place icon on circumference using angle
        const angleDeg = (i / orbit.items.length) * 360;
        const angleRad = (angleDeg * Math.PI) / 180;
        // percentage position within the ring div (which has size = diameter × diameter)
        const cx = 50 + 50 * Math.cos(angleRad); // 0–100 %
        const cy = 50 + 50 * Math.sin(angleRad); // 0–100 %

        return (
          // Position anchor — moves with the ring rotation
          <div
            key={item.label}
            title={item.label}
            style={{
              position: "absolute",
              left: `${cx}%`,
              top: `${cy}%`,
              // counter-rotate so the bubble stays upright
              animation: `${iconAnim} ${orbit.durationS}s linear infinite`,
              // The keyframe starts with translate(-50%,-50%) to center the bubble on the anchor point
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: `0 0 14px ${accentColor}0a`,
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── section ───────────────────────────────────────────────────────────────────
export default function Integrations({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="integracoes"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "100px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* ── outer card ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          minHeight: "540px",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT: text ── */}
        <div
          style={{
            width: "44%",
            flexShrink: 0,
            padding: "72px 48px 72px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* label */}
          <span
            style={{
              fontSize: "11px",
              color: tweaks.accentColor,
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontFamily: "var(--font-maitree), serif",
              marginBottom: "18px",
              display: "block",
            }}
          >
            Integrações
          </span>

          {/* heading */}
          <h2
            style={{
              fontFamily: "var(--font-kadwa), serif",
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: "18px",
            }}
          >
            Conecte com as ferramentas
            <br />que você já usa
          </h2>

          {/* subtitle */}
          <p
            style={{
              fontFamily: "var(--font-baskerville), serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "340px",
            }}
          >
            Integração nativa com as principais plataformas de CRM,
            calendário e comunicação.
          </p>

          {/* link */}
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-maitree), serif",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              width: "fit-content",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.09)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            Ver todas integrações →
          </a>
        </div>

        {/* ── RIGHT: orbit ── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* left-edge fade blends into text column */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              zIndex: 5,
              background:
                "linear-gradient(to right, rgba(6,4,14,0.95) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* orbit stage — centered; shift left so right orbits bleed off card edge */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "38%",       // center of stage sits at 38% of this column
              transform: "translate(-50%, -50%)",
              width: "580px",
              height: "580px",
            }}
          >
            {/* rings */}
            {ORBITS.map((orbit) => (
              <Ring key={orbit.radiusPx} orbit={orbit} accentColor={tweaks.accentColor} />
            ))}

            {/* center: Voic logo */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${tweaks.accentColor}35`,
                boxShadow: `0 0 0 10px ${tweaks.accentColor}08, 0 0 40px ${tweaks.accentColor}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
              }}
            >
              <Image
                src="/assets/logo-voic.svg"
                alt="Voic.IA"
                width={42}
                height={18}
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
