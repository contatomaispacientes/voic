import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import type { Tweaks } from "@/types/tweaks";

const PARTNERS = [
  { src: "/assets/Wandahortamelhorada.png", alt: "Wanda Horta" },
  { src: "/assets/Endostarmelhorada.png",   alt: "Endostar"    },
  { src: "/assets/CBTmelhorada.png",         alt: "CBT"         },
  { src: "/assets/Avanceaidark.png",         alt: "Avance AI"   },
];

const REPEATED = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function Logos({ tweaks: _tweaks }: { tweaks: Tweaks }) {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "72px 0 80px",
        margin: "80px 0",
      }}
    >
      {/* Título de destaque */}
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-maitree), serif",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          Parceiros
        </p>
        <h2
          style={{
            fontFamily: "var(--font-kadwa), serif",
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Empresas que já automatizam
          <br />
          <span style={{ color: "rgba(255,255,255,0.38)" }}>
            suas operações com a Voic.IA
          </span>
        </h2>
      </div>

      <div className="relative h-14 w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={40}
          gap={80}
        >
          {REPEATED.map((p, i) => (
            <Image
              key={`${p.alt}-${i}`}
              src={p.src}
              alt={p.alt}
              height={40}
              width={140}
              className="h-11 w-auto object-contain opacity-55"
            />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-32 md:w-48"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-32 md:w-48"
          direction="right"
          blurIntensity={0.8}
        />
      </div>
    </section>
  );
}
