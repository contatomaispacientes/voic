import type { Metadata } from "next";
import { Kadwa, Libre_Baskerville, Maitree } from "next/font/google";
import "./globals.css";

const kadwa = Kadwa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kadwa",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "swap",
});

const maitree = Maitree({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-maitree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voic.IA — Agentes de Voz com Inteligência Artificial",
  description:
    "Plataforma de agentes de voz para chamadas de entrada e saída, agendamentos e ações automatizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${kadwa.variable} ${baskerville.variable} ${maitree.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
