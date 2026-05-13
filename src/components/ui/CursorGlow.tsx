"use client";

import { useEffect, useRef } from "react";

/**
 * Soft radial glow that follows the cursor.
 * Automatically disabled on touch/mobile devices and when user
 * prefers reduced motion. Pauses the rAF loop when the tab is hidden.
 */
export function CursorGlow({ color = "#8b5cf6" }: { color?: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -600, y: -600 });
  const current = useRef({ x: -600, y: -600 });
  const rafRef  = useRef<number>(0);
  const paused  = useRef(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isTouch     = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // Pause rAF while tab is hidden — saves CPU/battery
    const onVisibility = () => {
      paused.current = document.hidden;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      if (!paused.current) {
        // Only update DOM if movement is significant (> 0.5px)
        const dx = pos.current.x - current.current.x;
        const dy = pos.current.y - current.current.y;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          current.current.x = lerp(current.current.x, pos.current.x, 0.08);
          current.current.y = lerp(current.current.y, pos.current.y, 0.08);
          if (glowRef.current) {
            glowRef.current.style.transform =
              `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 0,
        willChange: "transform",
      }}
    >
      <div
        ref={glowRef}
        style={{
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}18 0%, transparent 65%)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
