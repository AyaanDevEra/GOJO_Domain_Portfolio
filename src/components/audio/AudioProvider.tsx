"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useAudioStore } from "@/store/useAudioStore";

/**
 * Single shared Web Audio context. Buffers lazy-load on first play.
 * Disabled by default (muted). Listens for global play/stop events from useAudio().
 * Foundation: engine scaffold ready; file paths resolve from registry/DB later.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const muted = useAudioStore((s) => s.muted);
  const masterVolume = useAudioStore((s) => s.masterVolume);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const buffers = useRef<Map<string, AudioBuffer>>(new Map());

  // Create context lazily on first user gesture (autoplay-safe).
  useEffect(() => {
    const init = () => {
      if (ctxRef.current) return;
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      if (!Ctx) return;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = muted ? 0 : masterVolume;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      masterGainRef.current = gain;
    };
    window.addEventListener("pointerdown", init, { once: true });
    return () => window.removeEventListener("pointerdown", init);
  }, [muted, masterVolume]);

  // Reflect mute / volume changes.
  useEffect(() => {
    if (masterGainRef.current) masterGainRef.current.gain.value = muted ? 0 : masterVolume;
    if (ctxRef.current) { muted ? ctxRef.current.suspend() : ctxRef.current.resume(); }
  }, [muted, masterVolume]);

  // Decoupled play/stop bridge (from useAudio()). File loading wired post-asset upload.
  useEffect(() => {
    const onPlay = async (_e: Event) => { /* lazy fetch+decode+play once files exist */ };
    const onStop = (_e: Event) => { /* stop a playing source */ };
    window.addEventListener("domain-audio:play", onPlay);
    window.addEventListener("domain-audio:stop", onStop);
    return () => {
      window.removeEventListener("domain-audio:play", onPlay);
      window.removeEventListener("domain-audio:stop", onStop);
    };
  }, []);

  return <>{children}</>;
}
