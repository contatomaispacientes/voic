"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import type { Tweaks } from "@/types/tweaks";

const GodRays = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.GodRays }))
);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface PageHeroProps {
  tweaks: Tweaks;
  badge: string;
  /** Plain part of the title — rendered before the accent word */
  titleBefore: string;
  /** The word rendered in italic accent color */
  titleAccent: string;
  /** Plain part of the title — rendered after the accent word */
  titleAfter?: string;
  subtitle: string;
}

export default function PageHero({
  tweaks,
  badge,
  titleBefore,
  titleAccent,
  titleAfter = "",
  subtitle,
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(6px)" },
    animate: mounted
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 22, filter: "blur(6px)" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#06040e",
        minHeight: "52vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "140px 24px 80px",
      }}
    >
      {/* GodRays background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <Suspense fallback={null}>
          <GodRays
            colorBack="#00000000"
            colors={[
              `${tweaks.accentColor}55`,
              `${tweaks.accentColorDark}40`,
              "#a78bfa40",
              "#4c1d9535",
            ]}
            colorBloom={tweaks.accentColor}
            offsetX={0.5}
            offsetY={-0.9}
            intensity={0.45}
            spotty={0.35}
            midSize={10}
            midIntensity={0.03}
            density={0.28}
            bloom={0.3}
            speed={0.35}
            scale={1.6}
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          />
        </Suspense>
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 75% 60% at 50% 50%, transparent 20%, rgba(6,4,14,0.65) 80%, #06040e 100%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "780px", textAlign: "center" }}>

        {/* Badge */}
        <motion.div {...fade(0.0)} style={{ display: "inline-flex", marginBottom: "24px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px", borderRadius: "100px",
            background: `${tweaks.accentColor}12`,
            border: `1px solid ${tweaks.accentColor}28`,
            fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
            color: tweaks.accentColor,
            fontFamily: "var(--font-maitree), serif",
          }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: tweaks.accentColor,
              boxShadow: `0 0 6px ${tweaks.accentColor}`,
              animation: "pulse-dot 2s ease-in-out infinite",
              flexShrink: 0,
            }} />
            {badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 400, lineHeight: 1.07,
            letterSpacing: "-0.03em", color: "#fff",
            marginBottom: "20px",
          }}
        >
          {titleBefore}{" "}
          <em style={{ color: tweaks.accentColor, fontStyle: "italic" }}>{titleAccent}</em>
          {titleAfter && <> {titleAfter}</>}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fade(0.2)}
          style={{
            fontFamily: "var(--font-baskerville), serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.4)", lineHeight: 1.75,
            maxWidth: "520px", margin: "0 auto",
          }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
