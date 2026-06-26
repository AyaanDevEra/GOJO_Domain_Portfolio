"use client";
import { useEffect } from "react";
import { useEasterEggStore } from "@/store/useEasterEggStore";

/**
 * 10. Hidden Easter Eggs — global key/sequence listener.
 * Foundation: detects a secret code -> unlocks "secret_domain".
 * Overlay effects (Six Eyes, secret domain expansion) wire in Phase 5.
 */
const SECRET = ["g", "o", "j", "o"];

export function EasterEggListener() {
  const unlock = useEasterEggStore((s) => s.unlock);
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key.toLowerCase()].slice(-SECRET.length);
      if (SECRET.every((k, i) => buf[i] === k)) unlock("secret_domain");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);
  return null;
}
