"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  reverse = false,
  className,
  pauseOnHover = false,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    let pos = 0;
    let last = performance.now();
    let raf = 0;
    let contentWidth = inner.offsetWidth;

    const ro = new ResizeObserver(() => {
      contentWidth = inner.offsetWidth;
    });
    ro.observe(inner);

    const direction = reverse ? -1 : 1;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (!pausedRef.current && contentWidth > 0 && duration > 0) {
        pos += (dt / duration) * contentWidth * direction;
        pos = ((pos % contentWidth) + contentWidth) % contentWidth;
        track.style.transform = `translate3d(${-pos}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [duration, reverse]);

  const onEnter = pauseOnHover ? () => { pausedRef.current = true; } : undefined;
  const onLeave = pauseOnHover ? () => { pausedRef.current = false; } : undefined;

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div
          ref={innerRef}
          className="flex shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
        <div
          className="flex shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
