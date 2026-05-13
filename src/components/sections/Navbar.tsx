"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Tweaks } from "@/types/tweaks";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Como funciona",   href: "/como-funciona"   },
  { label: "Integrações",     href: "/integracoes"     },
  { label: "Preços",          href: "/precos"          },
];

export default function Navbar({ tweaks }: { tweaks: Tweaks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const bgColor     = scrolled || menuOpen ? "rgba(6,4,14,0.92)" : "transparent";
  const borderColor = scrolled || menuOpen ? "rgba(255,255,255,0.07)" : "transparent";

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
      <nav style={{
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        background: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

          {/* Desktop: 3-column grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center", height: "64px",
          }}>

            {/* Logo */}
            <Link href="/" aria-label="Voic.IA"
              style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
              <Image
                src="/assets/logo-voic.svg" alt="Voic.IA"
                width={90} height={28}
                style={{ filter: "brightness(0) invert(1)", display: "block" }}
                priority
              />
            </Link>

            {/* Nav links — centered */}
            <nav className="desktop-nav" style={{ display: "none" }}>
              <ul style={{
                display: "flex", alignItems: "center",
                gap: "2px", listStyle: "none", margin: 0, padding: 0,
              }}>
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          display: "block",
                          padding: "6px 14px",
                          fontSize: "13.5px", fontWeight: active ? 500 : 400,
                          color: active ? "#fff" : "rgba(255,255,255,0.48)",
                          textDecoration: "none",
                          fontFamily: "var(--font-maitree), serif",
                          letterSpacing: "0.1px",
                          borderRadius: "8px",
                          background: active ? `${tweaks.accentColor}14` : "transparent",
                          transition: "color 0.2s ease, background 0.2s ease",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = "rgba(255,255,255,0.48)";
                            e.currentTarget.style.background = "transparent";
                          }
                        }}
                      >
                        {link.label}
                        {/* Active indicator dot */}
                        {active && (
                          <span style={{
                            position: "absolute", bottom: "2px", left: "50%",
                            transform: "translateX(-50%)",
                            width: "4px", height: "4px", borderRadius: "50%",
                            background: tweaks.accentColor,
                            boxShadow: `0 0 6px ${tweaks.accentColor}`,
                          }} />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTAs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>

              <div className="desktop-buttons" style={{ display: "none", alignItems: "center", gap: "8px" }}>
                <GhostButton>Entrar</GhostButton>
                <PrimaryButton accent={tweaks.accentColor}>Agendar demo</PrimaryButton>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                className="mobile-menu-btn"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px", padding: "8px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", transition: "background 0.2s ease",
                }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div style={{
            overflow: "hidden",
            maxHeight: menuOpen ? "380px" : "0",
            opacity: menuOpen ? 1 : 0,
            transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
          }}>
            <div style={{
              padding: "8px 0 24px", display: "flex", flexDirection: "column", gap: "2px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block", padding: "12px 4px",
                      fontSize: "15px",
                      color: active ? "#fff" : "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      fontFamily: "var(--font-maitree), serif",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      fontWeight: active ? 500 : 400,
                      borderLeft: active ? `3px solid ${tweaks.accentColor}` : "3px solid transparent",
                      paddingLeft: active ? "12px" : "4px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "16px" }}>
                <GhostButton style={{ width: "100%", justifyContent: "center" }}>Entrar</GhostButton>
                <PrimaryButton accent={tweaks.accentColor} style={{ width: "100%", justifyContent: "center" }}>
                  Agendar demo
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav     { display: flex !important; }
          .desktop-buttons { display: flex !important; }
          .mobile-menu-btn { display: none  !important; }
        }
      `}</style>
    </header>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────── */

function GhostButton({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", padding: "8px 20px",
      borderRadius: "100px", fontSize: "13px", fontWeight: 500,
      fontFamily: "var(--font-maitree), serif",
      background: "transparent", color: "rgba(255,255,255,0.65)",
      border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
      transition: "all 0.25s ease", whiteSpace: "nowrap", ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
    >{children}</button>
  );
}

function PrimaryButton({ children, accent, style }: { children: React.ReactNode; accent: string; style?: React.CSSProperties }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", padding: "8px 22px",
      borderRadius: "100px", fontSize: "13px", fontWeight: 600,
      fontFamily: "var(--font-maitree), serif",
      background: "#fff", color: "#080512", border: "none", cursor: "pointer",
      letterSpacing: "0.1px", transition: "all 0.25s ease", whiteSpace: "nowrap",
      boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset", ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 24px rgba(255,255,255,0.12)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.15) inset"; }}
    >{children}</button>
  );
}
