import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// ── Size tokens ───────────────────────────────────────────────────────────────
const SIZE: Record<string, React.CSSProperties> = {
  sm:      { height: "36px", padding: "0 18px", fontSize: "13px" },
  default: { height: "40px", padding: "0 22px", fontSize: "13.5px" },
  lg:      { height: "44px", padding: "0 28px", fontSize: "14px" },
  xl:      { height: "52px", padding: "0 36px", fontSize: "15px" },
  icon:    { height: "40px", width: "40px",   padding: "0"      },
};

// ── Variant base styles ───────────────────────────────────────────────────────
const VARIANT_BASE: Record<string, React.CSSProperties> = {
  default: {
    background: "#fff",
    color: "#080512",
    border: "none",
    boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset",
  },
  accent: {
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset",
  },
  outline: {
    background: "transparent",
    color: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  ghost: {
    background: "transparent",
    color: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  link: {
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    border: "none",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
};

const VARIANT_HOVER: Record<string, React.CSSProperties> = {
  default: {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 24px rgba(255,255,255,0.12), 0 1px 0 rgba(255,255,255,0.15) inset",
  },
  accent: {
    transform: "translateY(-1px)",
    background: "#7c3aed",
    boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
  },
  outline: {
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    borderColor: "rgba(255,255,255,0.22)",
  },
  ghost: {
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    borderColor: "rgba(255,255,255,0.18)",
  },
  link: { color: "#fff" },
};

// ── Component ─────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof VARIANT_BASE;
  size?: keyof typeof SIZE;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      asChild = false,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const Comp = (asChild ? Slot : "button") as React.ElementType;

    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      whiteSpace: "nowrap",
      borderRadius: "100px",
      cursor: "pointer",
      fontFamily: "var(--font-maitree), serif",
      fontWeight: 500,
      letterSpacing: "0.1px",
      transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
      userSelect: "none",
      outline: "none",
      ...SIZE[size] ?? SIZE.default,
      ...VARIANT_BASE[variant] ?? VARIANT_BASE.default,
      ...style,
    };

    const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      const hover = VARIANT_HOVER[variant];
      if (hover) Object.assign(e.currentTarget.style, hover);
      onMouseEnter?.(e);
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Reset to base styles
      const base = VARIANT_BASE[variant];
      Object.assign(e.currentTarget.style, {
        transform: "translateY(0)",
        boxShadow: base.boxShadow ?? "none",
        background: base.background,
        color: base.color,
        borderColor: (base as { borderColor?: string }).borderColor ?? (base.border ? (base.border as string).split(" ").pop() : ""),
      });
      onMouseLeave?.(e);
    };

    return (
      <Comp
        ref={ref}
        style={baseStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
export const buttonVariants = () => ""; // compat shim — not used internally
