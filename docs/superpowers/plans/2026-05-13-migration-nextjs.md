# Migração para Next.js + TypeScript + Tailwind v4

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrar o projeto Voic de um único `index.html` com Babel standalone para uma stack Next.js 16 + TypeScript + Tailwind CSS v4, rodando em localhost.

**Architecture:** Projeto Next.js com App Router e static export. Componentes JSX existentes são migrados para `.tsx` tipados, organizados em `src/components/sections/` e `src/components/ui/`. CSS inline dos componentes migra para Tailwind utilities + design tokens em `globals.css`.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, GSAP (opcional futuro), Lucide React

---

## Estrutura de arquivos alvo

```
Voic/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout + fontes
│   │   ├── page.tsx            ← Composição das seções
│   │   └── globals.css         ← Design tokens + Tailwind
│   └── components/
│       ├── sections/
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx        ← inclui DashboardPreview
│       │   ├── Logos.tsx
│       │   ├── Features.tsx
│       │   ├── HowItWorks.tsx
│       │   ├── Calls.tsx
│       │   ├── Integrations.tsx
│       │   ├── Pricing.tsx
│       │   ├── FAQ.tsx
│       │   ├── CTABand.tsx
│       │   └── Footer.tsx
│       └── ui/
│           ├── TweaksPanel.tsx
│           └── SectionHeader.tsx
├── public/
│   └── assets/
│       └── logo-voic.svg
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

### Task 1: Inicializar o projeto Next.js

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`

- [ ] Rodar o scaffold do Next.js no diretório atual
```bash
cd "c:\Users\Gabriel Lima\OneDrive\Área de Trabalho\Voic"
npx create-next-app@16 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```
- [ ] Mover `src/` para estrutura correta se necessário

---

### Task 2: Instalar dependências extras

**Files:**
- Modify: `package.json`

- [ ] Instalar pacotes adicionais:
```bash
npm install lucide-react gsap
npm install -D @types/node
```

---

### Task 3: Configurar globals.css com design tokens

**Files:**
- Create/Modify: `src/app/globals.css`

- [ ] Substituir o conteúdo pelo design system do Voic:
```css
@import "tailwindcss";

@theme inline {
  --color-bg: #06040e;
  --color-bg-2: rgba(255,255,255,0.02);
  --color-bg-3: rgba(255,255,255,0.035);
  --color-accent: #8b5cf6;
  --color-accent-dark: #6d28d9;
  --color-text: #ffffff;
  --color-muted: rgba(255,255,255,0.5);
  --color-subtle: rgba(255,255,255,0.35);
  --color-line: rgba(255,255,255,0.06);
  --font-display: var(--font-kadwa);
  --font-serif: var(--font-baskerville);
  --font-body: var(--font-maitree);
}

@keyframes wave {
  0% { height: 6px; }
  100% { height: 30px; }
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
::selection { background: rgba(139, 92, 246, 0.2); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
```

---

### Task 4: Criar layout.tsx com fontes

**Files:**
- Create: `src/app/layout.tsx`

- [ ] Criar o root layout com as três fontes do projeto:
```tsx
import type { Metadata } from "next";
import { Kadwa, Libre_Baskerville, Maitree } from "next/font/google";
import "./globals.css";

const kadwa = Kadwa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kadwa",
});
const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-baskerville",
});
const maitree = Maitree({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-maitree",
});

export const metadata: Metadata = {
  title: "Voic.IA — Agentes de Voz com Inteligência Artificial",
  description: "Plataforma de agentes de voz para chamadas de entrada e saída, agendamentos e ações automatizadas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${kadwa.variable} ${baskerville.variable} ${maitree.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

---

### Task 5: Criar SectionHeader (componente ui reutilizável)

**Files:**
- Create: `src/components/ui/SectionHeader.tsx`

- [ ] Criar o componente com as props tipadas:
```tsx
interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  visible: boolean;
  accentColor: string;
}

export default function SectionHeader({ label, title, subtitle, visible, accentColor }: SectionHeaderProps) {
  return (
    <div style={{
      textAlign: "center", marginBottom: "64px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <span style={{ fontSize: "12px", color: accentColor, textTransform: "uppercase", letterSpacing: "3px", fontFamily: "var(--font-maitree)" }}>
        {label}
      </span>
      <h2
        style={{ fontFamily: "var(--font-kadwa)", fontSize: "44px", fontWeight: 400, color: "#fff", lineHeight: 1.12, margin: "18px 0 0", letterSpacing: "-0.3px" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p style={{ fontFamily: "var(--font-baskerville)", fontSize: "16px", color: "rgba(255,255,255,0.35)", maxWidth: "460px", margin: "16px auto 0", lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

---

### Task 6: Criar hook useScrollReveal

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

- [ ] Extrair o hook compartilhado:
```ts
import { useRef, useState, useEffect } from "react";

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}
```

---

### Task 7: Definir tipos compartilhados

**Files:**
- Create: `src/types/tweaks.ts`

- [ ] Criar a interface de tweaks:
```ts
export interface Tweaks {
  accentColor: string;
  accentColorDark: string;
  heroStyle: "a" | "b" | "c";
  headlineSize: "pequeno" | "medio" | "grande";
}
```

---

### Task 8: Criar Navbar.tsx

**Files:**
- Create: `src/components/sections/Navbar.tsx`

- [ ] Migrar Navbar com tipagem:
```tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Tweaks } from "@/types/tweaks";

export default function Navbar({ tweaks }: { tweaks: Tweaks }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  // ... JSX do Navbar original migrado
}
```

---

### Task 9: Criar Hero.tsx (com DashboardPreview)

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] Migrar HeroSection + DashboardPreview com tipagem completa

---

### Task 10: Criar seções do grupo 1

**Files:**
- Create: `src/components/sections/Logos.tsx`
- Create: `src/components/sections/Features.tsx`
- Create: `src/components/sections/HowItWorks.tsx`

- [ ] Migrar cada seção usando o hook `useScrollReveal` e o componente `SectionHeader`

---

### Task 11: Criar seções do grupo 2

**Files:**
- Create: `src/components/sections/Calls.tsx`
- Create: `src/components/sections/Integrations.tsx`
- Create: `src/components/sections/Pricing.tsx`
- Create: `src/components/sections/FAQ.tsx`
- Create: `src/components/sections/CTABand.tsx`
- Create: `src/components/sections/Footer.tsx`

- [ ] Migrar cada seção usando o hook `useScrollReveal` e o componente `SectionHeader`

---

### Task 12: Criar page.tsx

**Files:**
- Create: `src/app/page.tsx`

- [ ] Compor todas as seções:
```tsx
"use client";
import { useState } from "react";
import type { Tweaks } from "@/types/tweaks";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
// ... demais imports

const DEFAULTS: Tweaks = {
  accentColor: "#8b5cf6",
  accentColorDark: "#6d28d9",
  heroStyle: "a",
  headlineSize: "medio",
};

export default function Home() {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);
  return (
    <>
      <Navbar tweaks={tweaks} />
      <Hero tweaks={tweaks} />
      {/* ... */}
    </>
  );
}
```

---

### Task 13: Mover assets para public/

**Files:**
- Move: `assets/logo-voic.svg` → `public/assets/logo-voic.svg`

- [ ] Mover a pasta assets para dentro de public/

---

### Task 14: Verificar e rodar

- [ ] Rodar `npm run dev` e verificar em `http://localhost:3000`
- [ ] Corrigir erros de TypeScript e lint que aparecerem
