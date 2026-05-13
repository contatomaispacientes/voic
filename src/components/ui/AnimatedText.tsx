"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  el?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Reveals text word-by-word with a blur + slide-up effect on scroll.
 */
export function AnimatedText({
  text,
  el: El = "span",
  delay = 0,
  stagger = 0.045,
  style,
  className,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      // @ts-expect-error polymorphic motion element
      as={El}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      style={{ display: "inline", ...style }}
      className={className}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
