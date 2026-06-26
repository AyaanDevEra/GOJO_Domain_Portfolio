"use client";
import { useEffect } from "react";
import { useExperienceStore } from "@/store/useExperienceStore";
import type { SectionKey } from "@/types";

/**
 * Observes which section is in view and updates currentDomain so the
 * Realm Engine can crossfade accent colors + audio automatically.
 */
export function useDomainObserver(sectionKey: SectionKey, ref: React.RefObject<HTMLElement>) {
  const setDomain = useExperienceStore((s) => s.setDomain);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setDomain(sectionKey); }),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sectionKey, ref, setDomain]);
}
