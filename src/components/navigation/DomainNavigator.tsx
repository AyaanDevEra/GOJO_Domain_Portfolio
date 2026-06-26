"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_SECTIONS } from "@/config/sections";
import { useExperienceStore } from "@/store/useExperienceStore";
import { AudioControl } from "@/components/audio/AudioControl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

/**
 * Floating Six-Eyes-inspired navigator (NOT a navbar).
 * Desktop: persistent orb that expands to a realm list.
 * Mobile: tap orb -> full-screen realm sheet.
 * Accessible: keyboard nav, ARIA, focus handling, reduced-motion downgrade.
 */
export function DomainNavigator() {
  const [open, setOpen] = useState(false);
  const currentDomain = useExperienceStore((s) => s.currentDomain);
  const setDomain = useExperienceStore((s) => s.setDomain);
  const reduced = useReducedMotion();

  const go = (key: string) => {
    const el = document.getElementById(`section-${key}`);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    setDomain(key as any);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Domain navigator"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25 }}
            className="glass-panel w-56 max-w-[80vw] p-2"
          >
            <ul role="menu" className="flex flex-col">
              {NAV_SECTIONS.map((s) => (
                <li key={s.key} role="none">
                  <button
                    role="menuitem"
                    onClick={() => go(s.key)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      currentDomain === s.key
                        ? "bg-accent/20 text-glow accent-glow"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-white/10 pt-2">
              <AudioControl />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <button
        aria-label={open ? "Close domain navigator" : "Open domain navigator"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-void-900 shadow-[0_0_25px_rgb(var(--glow)/0.4)] transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="absolute inset-0 rounded-full bg-accent/10 animate-pulse-glow" aria-hidden />
        {/* Six Eyes glyph (placeholder vector — real art slotted later) */}
        <span className="relative flex gap-1" aria-hidden>
          <span className="h-4 w-1.5 rounded-full bg-accent" />
          <span className="h-4 w-1.5 rounded-full bg-accent" />
        </span>
      </button>
    </div>
  );
}
