"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GodRays } from "@paper-design/shaders-react";
import { Button } from "@/components/ui/button";
import type { Tweaks } from "@/types/tweaks";

export default function Hero({ tweaks }: { tweaks: Tweaks }) {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax: mockup moves up slower than scroll
  const rawY = useTransform(scrollY, [0, 600], [0, -80]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Parallax: glows drift upward gently
  const glowY = useTransform(scrollY, [0, 600], [0, -40]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: mounted
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 28, filter: "blur(6px)" },
    transition: { duration: 0.95, delay, ease: EASE },
  });

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#06040e" }}>

      {/* ── GodRays background ────────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          y: glowY,
        }}
      >
        <GodRays
          colorBack="#00000000"
          colors={[
            "#8b5cf660",   // violet principal
            "#6d28d950",   // violet escuro
            "#a78bfa45",   // lavanda
            "#4c1d9540",   // indigo profundo
          ]}
          colorBloom={tweaks.accentColor}
          offsetX={0.5}
          offsetY={-0.8}
          intensity={0.55}
          spotty={0.4}
          midSize={12}
          midIntensity={0.05}
          density={0.32}
          bloom={0.35}
          speed={0.4}
          scale={1.8}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </motion.div>

      {/* ── Subtle vignette overlay ────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #06040e88 70%, #06040e 100%)",
        }}
      />

      {/* ── Hero text content ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "168px 24px 0",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <motion.div {...fade(0.0)} style={{ display: "inline-flex", marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "100px",
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.22)",
              fontSize: "12px",
              letterSpacing: "0.25px",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-maitree), serif",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: tweaks.accentColor,
                boxShadow: `0 0 8px ${tweaks.accentColor}`,
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Agentes de voz IA · disponíveis 24/7
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(40px, 6.5vw, 70px)",
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "24px",
          }}
        >
          Automatize suas{" "}
          <em style={{ color: tweaks.accentColor, fontStyle: "italic" }}>
            chamadas
          </em>{" "}
          com inteligência artificial
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.2)}
          style={{
            fontFamily: "var(--font-baskerville), serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.78,
            maxWidth: "500px",
            margin: "0 auto 40px",
          }}
        >
          Plataforma de agentes de voz para chamadas de entrada e saída,
          agendamentos e ações automatizadas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.3)}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button size="lg" variant="default">
            Agendar demonstração
          </Button>
          <Button size="lg" variant="ghost">
            Ver funcionalidades
          </Button>
        </motion.div>
      </div>

      {/* ── 3-D screenshot ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
        animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 48, filter: "blur(8px)" }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "68px",
          y: parallaxY,
          WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
        }}
      >
        {/* Perspective wrapper */}
        <div
          style={{
            perspective: "1200px",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 78%, transparent 100%)",
            marginRight: "-80px",
            paddingLeft: "80px",
          }}
        >
          {/* Continuous float animation */}
          <div style={{ animation: "float 6s ease-in-out infinite" }}>
          <div style={{ transform: "skewX(0.28deg)", position: "relative" }}>
            <div style={{ transform: "skewX(0.28deg)", position: "relative" }}>

              {/* Purple glow beneath image */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "8%",
                  right: "8%",
                  height: "100px",
                  background: `linear-gradient(to top, ${tweaks.accentColor}28, transparent)`,
                  filter: "blur(36px)",
                  zIndex: 0,
                }}
              />

              {/* Screenshot card */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "12px 12px 0 0",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderBottom: "none",
                  overflow: "hidden",
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.03),
                    0 -12px 60px ${tweaks.accentColor}14,
                    inset 0 1px 0 rgba(255,255,255,0.06)
                  `,
                }}
              >
                {/* Window chrome */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <span
                      key={c}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.18)",
                      fontFamily: "var(--font-maitree), serif",
                    }}
                  >
                    Voic.IA — Painel de Agentes
                  </span>
                </div>

                {/* Screenshot */}
                <Image
                  src="/assets/voic-hero.png"
                  alt="Painel Voic.IA"
                  width={2880}
                  height={1620}
                  priority
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
