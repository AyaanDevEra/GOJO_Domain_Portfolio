"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Cinematic smooth scroll. Disabled under reduce-motion. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [reduced]);
  return <>{children}</>;
}
