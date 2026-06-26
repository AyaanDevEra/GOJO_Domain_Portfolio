"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { ClashSequence } from "@/components/sections/contact/ClashSequence";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/data/queries";
import { FALLBACK_SETTINGS } from "@/lib/data/fallback";

/** 8. Contact — Gojo vs Sukuna Domain Clash cinematic + social hub. */
export function ContactDomain() {
  const { data } = useQuery({ queryKey: ["settings"], queryFn: getSiteSettings });
  const socials = (data ?? FALLBACK_SETTINGS).socials;
  const [revealed, setRevealed] = useState(false);

  const links = [
    { label: "Discord", url: socials.discord },
    { label: "Instagram", url: socials.instagram },
    { label: "GitHub", url: socials.github },
    { label: "Email", url: socials.email ? `mailto:${socials.email}` : "" }
  ];

  return (
    <RealmSection sectionKey="contact" id="section-contact" className="relative overflow-hidden">
      <ClashSequence onClash={() => setRevealed(true)} />

      {/* legibility scrim — deepens once content is revealed */}
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${revealed ? "bg-void-950/70 opacity-100" : "opacity-0"}`} />

      {/* content overlay — fades in after the clash begins */}
      <motion.div
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 w-full max-w-3xl text-center ${revealed ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent/80">Domain Clash</p>
        <h2 className="realm-heading accent-glow mb-10">Contact</h2>
        <div className="grid grid-cols-2 gap-4">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08}>
              <a href={l.url || "#"} target="_blank" rel="noreferrer"
                className="glass-panel flex items-center justify-center px-5 py-6 text-center transition hover:border-accent/40 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <span className="text-lg font-medium text-glow">{l.label}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </motion.div>
    </RealmSection>
  );
}
