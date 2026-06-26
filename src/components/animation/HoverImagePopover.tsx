"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AssetImage } from "@/components/ui/AssetImage";

/**
 * ⭐ Display-Name hover effect. Hovering the name pops an animated image
 * (the "Gojo smiling after a thousand slashes" asset). Asset is GATED:
 * shows a placeholder until provided via registry slot "dashboard.hoverImage".
 * Touch devices: tap toggles. Keyboard: focus shows it.
 */
export function HoverImagePopover({ children, slot = "dashboard.hoverImage" }: { children: ReactNode; slot?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      tabIndex={0}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 w-48 -translate-x-1/2"
          >
            <span className="glass-panel block overflow-hidden p-1">
              <AssetImage slot={slot} width={300} height={300} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
