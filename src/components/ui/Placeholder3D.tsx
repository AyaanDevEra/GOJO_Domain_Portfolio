"use client";
import { cn } from "@/lib/utils/cn";

/**
 * Lightweight placeholder for a 3D/WebGL scene slot. Real R3F canvases
 * (BlackHole, HollowPurpleOrb, MahoragaWheel) mount here in Phase 3.
 */
export function Placeholder3D({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-void-900 to-void-950", className)}>
      <div className="absolute inset-0 animate-pulse-glow bg-[radial-gradient(circle_at_center,rgb(var(--glow)/0.25),transparent_60%)]" />
      <span className="relative text-xs uppercase tracking-[0.25em] text-white/40">{label} · 3D scene (Phase 3)</span>
    </div>
  );
}
