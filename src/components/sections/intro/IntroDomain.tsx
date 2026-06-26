"use client";
import { motion } from "framer-motion";
import { useExperienceStore } from "@/store/useExperienceStore";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { LazyScene } from "@/components/three/LazyScene";
import { DURATION, EASING } from "@/config/animations";

/** 1. Domain Expansion Intro — Infinite Void. (3D black hole/galaxy in Phase 3.) */
export function IntroDomain() {
  const enter = useExperienceStore((s) => s.enter);
  return (
    <RealmSection sectionKey="intro" id="section-intro" className="overflow-hidden">
      <LazyScene name="intro" label="Infinite Void" className="absolute inset-0 -z-10" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION.intro, ease: EASING.soft }}
        className="text-center"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent/80">Domain Expansion</p>
        <h1 className="realm-heading accent-glow text-5xl sm:text-7xl">INFINITE VOID</h1>
        <p className="mx-auto mt-5 max-w-md text-white/60">
          You are about to enter a complete digital world.
        </p>
        <button
          onClick={enter}
          className="mt-8 rounded-full border border-accent/50 bg-accent/10 px-8 py-3 text-sm uppercase tracking-widest text-glow transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Enter the Domain
        </button>
      </motion.div>
    </RealmSection>
  );
}
