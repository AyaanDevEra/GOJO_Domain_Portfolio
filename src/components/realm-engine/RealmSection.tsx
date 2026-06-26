"use client";
import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { SectionKey } from "@/types";
import { useDomainObserver } from "@/hooks/useDomainObserver";
import { EASING, DURATION } from "@/config/animations";
import { cn } from "@/lib/utils/cn";

/**
 * Wraps every section: registers it with the domain observer (drives accent
 * crossfade) and provides a consistent scroll-reveal entrance.
 */
export function RealmSection({
  sectionKey, id, children, className
}: { sectionKey: SectionKey; id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useDomainObserver(sectionKey, ref);
  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("realm-section", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION.base, ease: EASING.soft }}
    >
      {children}
    </motion.section>
  );
}
