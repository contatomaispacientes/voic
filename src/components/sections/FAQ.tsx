"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { stagger, staggerItem } from "@/lib/animations";
import type { Tweaks } from "@/types/tweaks";

const FAQS = [
  {
    q: "Como funciona o agente de voz IA?",
    a: "Nossos agentes utilizam modelos avançados de linguagem natural combinados com síntese de voz ultra-realista para atender e realizar chamadas de forma autônoma.",
  },
  {
    q: "Quanto tempo leva para configurar?",
    a: "Em menos de 15 minutos você pode ter seu primeiro agente funcionando. Basta definir o script, conectar seu número e ativar.",
  },
  {
    q: "Posso usar meu próprio número?",
    a: "Sim. Você pode usar seu número existente ou adquirir um novo diretamente na plataforma.",
  },
  {
    q: "Os agentes falam português brasileiro?",
    a: "Sim, com vozes naturais e expressivas otimizadas para PT-BR. Também suportamos outros idiomas.",
  },
  {
    q: "Como é feita a cobrança?",
    a: "Cobrança mensal baseada no plano escolhido. Minutos adicionais disponíveis sob demanda.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, sem fidelidade. Cancele quando quiser pelo painel.",
  },
];

function FAQItem({
  faq,
  index: _index,
  visible: _visible,
}: {
  faq: { q: string; a: string };
  index: number;
  visible: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.div
        onClick={() => setOpen(!open)}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          padding: "22px 0", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <span style={{
          fontSize: "15px", fontWeight: 400,
          color: open ? "#fff" : "rgba(255,255,255,0.62)",
          fontFamily: "var(--font-baskerville), serif",
          transition: "color 0.25s ease",
        }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            color: open ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
            fontSize: "20px", fontWeight: 300, flexShrink: 0, marginLeft: "16px",
            display: "inline-block",
          }}
        >+</motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "13.5px", color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75, margin: 0, paddingBottom: "22px",
              fontFamily: "var(--font-maitree), serif",
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ tweaks }: { tweaks: Tweaks }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "100px 48px", maxWidth: "720px", margin: "0 auto" }}
    >
      <SectionHeader
        label="FAQ"
        title="Perguntas frequentes"
        visible={visible}
        accentColor={tweaks.accentColor}
      />
      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {FAQS.map((faq, i) => (
          <FAQItem key={faq.q} faq={faq} index={i} visible={visible} />
        ))}
      </motion.div>
    </section>
  );
}
