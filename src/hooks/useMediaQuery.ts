"use client";

import { useState, useEffect } from "react";

/** Returns true when the given CSS media query matches. Safe for SSR (defaults to false). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);

  return matches;
}

export const BREAKPOINTS = {
  mobile:  "(max-width: 768px)",
  tablet:  "(max-width: 1024px)",
  desktop: "(min-width: 1025px)",
  touch:   "(hover: none) and (pointer: coarse)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
