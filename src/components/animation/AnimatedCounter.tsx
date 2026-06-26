"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Count-up on scroll into view. Respects reduced motion (snaps to value). */
export function AnimatedCounter({
  value, format, duration = 1600
}: { value: number; format?: (v: number) => string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { setDisplay(value); return; }
    let raf = 0, start = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration, reduced]);

  return <span ref={ref}>{format ? format(display) : display.toLocaleString()}</span>;
}
