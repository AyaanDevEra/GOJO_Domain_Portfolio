"use client";
import { useEffect } from "react";
import { useExperienceStore } from "@/store/useExperienceStore";
import { SECTIONS } from "@/config/sections";
import { REALM_FALLBACK_ACCENTS } from "@/config/theme";

/**
 * Watches currentDomain and writes the active realm's accent colors into CSS
 * vars on :root. This is HOW theme transitions happen automatically between
 * sections (no user theme switching). Smooth via CSS transitions in globals.
 */
export function RealmAccentBridge() {
  const currentDomain = useExperienceStore((s) => s.currentDomain);

  useEffect(() => {
    const section = SECTIONS.find((s) => s.key === currentDomain);
    const accents = section ? REALM_FALLBACK_ACCENTS[section.domainKey] : null;
    if (!accents) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", accents.primary);
    root.style.setProperty("--accent-2", accents.secondary);
    root.style.setProperty("--glow", accents.glow);
  }, [currentDomain]);

  return null;
}
