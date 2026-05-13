interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  visible: boolean;
  accentColor: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  visible,
  accentColor,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "64px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 400,
          color: accentColor,
          textTransform: "uppercase",
          letterSpacing: "3px",
          fontFamily: "var(--font-maitree), serif",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-kadwa), serif",
          fontSize: "44px",
          fontWeight: 400,
          color: "#fff",
          lineHeight: 1.12,
          margin: "18px 0 0",
          letterSpacing: "-0.3px",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-baskerville), serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.35)",
            maxWidth: "460px",
            margin: "16px auto 0",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
