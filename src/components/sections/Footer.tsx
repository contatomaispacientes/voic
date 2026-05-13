import Image from "next/image";
import type { Tweaks } from "@/types/tweaks";

const COLUMNS = [
  { title: "Produto", links: ["Funcionalidades", "Integrações", "Preços", "Changelog"] },
  { title: "Empresa", links: ["Sobre nós", "Blog", "Carreiras", "Contato"] },
  { title: "Legal", links: ["Privacidade", "Termos", "Cookies", "LGPD"] },
];

const SOCIALS = ["LinkedIn", "Instagram", "YouTube"];

export default function Footer({ tweaks: _tweaks }: { tweaks: Tweaks }) {
  return (
    <footer
      style={{
        padding: "48px 48px 28px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        <div>
          <Image
            src="/assets/logo-voic.svg"
            alt="Voic"
            width={80}
            height={22}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.6, marginBottom: "12px" }}
          />
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              lineHeight: 1.7,
              maxWidth: "260px",
              fontFamily: "var(--font-maitree), serif",
            }}
          >
            Plataforma de agentes de voz com inteligência artificial para
            automatizar comunicações.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "var(--font-maitree), serif",
              }}
            >
              {col.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    fontFamily: "var(--font-maitree), serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.3)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-maitree), serif",
          }}
        >
          © 2026 Voic.IA — Todos os direitos reservados.
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {SOCIALS.map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                fontFamily: "var(--font-maitree), serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.2)")
              }
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
