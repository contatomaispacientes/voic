import Image from "next/image";
import Link from "next/link";
import type { Tweaks } from "@/types/tweaks";

const COLUMNS = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "/funcionalidades" },
      { label: "Integrações",     href: "/integracoes"     },
      { label: "Preços",          href: "/precos"          },
      { label: "Changelog",       href: "#"                },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos",      href: "/termos"      },
      { label: "Cookies",     href: "/cookies"     },
      { label: "LGPD",        href: "/lgpd"        },
    ],
  },
];

const linkStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.3)",
  textDecoration: "none",
  fontFamily: "var(--font-maitree), serif",
  transition: "color 0.2s",
};

export default function Footer({ tweaks: _tweaks }: { tweaks: Tweaks }) {
  return (
    <footer
      style={{
        padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px) clamp(24px,3vw,36px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Main grid: logo + 2 colunas ── */}
      <div
        className="grid-3"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "clamp(24px,4vw,60px)",
        }}
      >
        {/* Logo + descrição */}
        <div>
          <Image
            src="/assets/logo-voic.svg"
            alt="Voic.IA"
            width={80}
            height={22}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.6, marginBottom: "14px" }}
          />
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              lineHeight: 1.75,
              maxWidth: "240px",
              fontFamily: "var(--font-maitree), serif",
            }}
          >
            Plataforma de agentes de voz com inteligência artificial para
            automatizar comunicações.
          </p>
        </div>

        {/* Colunas de links */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.28)",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontFamily: "var(--font-maitree), serif",
              }}
            >
              {col.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          maxWidth: "960px",
          margin: "clamp(28px,4vw,40px) auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "var(--font-maitree), serif",
          }}
        >
          © 2026 Voic.IA — Todos os direitos reservados.{" "}
          Desenvolvido por{" "}
          <a
            href="https://sistemateasy.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")
            }
          >
            Sistemateasy
          </a>
          .
        </span>
      </div>
    </footer>
  );
}
