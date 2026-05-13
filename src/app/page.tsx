"use client";

import { useState } from "react";
import type { Tweaks } from "@/types/tweaks";
import { CursorGlow } from "@/components/ui/CursorGlow";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Logos from "@/components/sections/Logos";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Calls from "@/components/sections/Calls";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTABand from "@/components/sections/CTABand";
import Footer from "@/components/sections/Footer";

const DEFAULTS: Tweaks = {
  accentColor: "#8b5cf6",
  accentColorDark: "#6d28d9",
  heroStyle: "a",
  headlineSize: "medio",
};

export default function Home() {
  const [tweaks] = useState<Tweaks>(DEFAULTS);

  return (
    <>
      <CursorGlow color={tweaks.accentColor} />
      <Navbar tweaks={tweaks} />
      <Hero tweaks={tweaks} />
      <Logos tweaks={tweaks} />
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <Features tweaks={tweaks} />
        <HowItWorks tweaks={tweaks} />
        <Calls tweaks={tweaks} />
        <Integrations tweaks={tweaks} />
        <Pricing tweaks={tweaks} />
        <FAQ tweaks={tweaks} />
        <CTABand tweaks={tweaks} />
      </div>
      <Footer tweaks={tweaks} />
    </>
  );
}
