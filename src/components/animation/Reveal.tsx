"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASING, DURATION } from "@/config/animations";

/** Staggerable scroll reveal wrapper. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION.base, ease: EASING.soft, delay }}
    >
      {children}
    </motion.div>
  );
}
