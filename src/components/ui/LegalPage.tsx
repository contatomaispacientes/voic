import Link from "next/link";
import Image from "next/image";

interface Section {
  title: string;
  content: string | string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: Section[];
}

export default function LegalPage({ title, subtitle, updatedAt, sections }: LegalPageProps) {
  return (
    <div style={{ background: "#06040e", minHeight: "100vh", color: "#fff" }}>

      {/* ── Header simples ── */}
      <header style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px clamp(20px,5vw,48px)",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <Image
              src="/assets/logo-voic.svg"
              alt="Voic.IA"
              width={80}
              height={24}
              style={{ filter: "brightness(0) invert(1)", display: "block" }}
            />
          </Link>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontFamily: "var(--font-maitree), serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* ── Content ── */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(48px,8vw,80px) clamp(20px,5vw,48px) clamp(64px,10vw,100px)" }}>

        {/* Page title */}
        <div style={{ marginBottom: "48px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h1 style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(28px,5vw,42px)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-maitree), serif",
            lineHeight: 1.6,
            marginBottom: "8px",
          }}>
            {subtitle}
          </p>
          <span style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-maitree), serif",
          }}>
            Última atualização: {updatedAt}
          </span>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {sections.map((section, i) => (
            <div key={i}>
              <h2 style={{
                fontFamily: "var(--font-baskerville), serif",
                fontSize: "clamp(16px,2.5vw,20px)",
                fontWeight: 400,
                color: "#fff",
                marginBottom: "14px",
                lineHeight: 1.3,
              }}>
                {i + 1}. {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul style={{ padding: "0", margin: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {section.content.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: "2px" }}>›</span>
                      <span style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "var(--font-maitree), serif",
                        lineHeight: 1.75,
                      }}>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-maitree), serif",
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "64px",
          paddingTop: "28px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-maitree), serif",
            lineHeight: 1.7,
          }}>
            Dúvidas? Entre em contato: <a href="mailto:contato@voicia.com.br" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>contato@voicia.com.br</a>
          </p>
        </div>
      </main>
    </div>
  );
}
