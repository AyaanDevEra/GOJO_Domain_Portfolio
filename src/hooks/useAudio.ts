"use client";
import { useCallback } from "react";
import { useAudioStore } from "@/store/useAudioStore";
import { AUDIO_PRESETS, type AudioPresetKey } from "@/config/audio";

/**
 * Thin façade over the (lazy) AudioProvider engine. Foundation stub:
 * resolves preset metadata and respects the global mute state.
 * Engine buffer-loading is implemented in components/audio/AudioProvider.
 */
export function useAudio() {
  const muted = useAudioStore((s) => s.muted);

  const play = useCallback((key: AudioPresetKey) => {
    if (muted) return;
    const preset = AUDIO_PRESETS[key];
    // Bridged to AudioProvider via a global custom event (decoupled).
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("domain-audio:play", { detail: { key, preset } }));
    }
  }, [muted]);

  const stop = useCallback((key: AudioPresetKey) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("domain-audio:stop", { detail: { key } }));
    }
  }, []);

  return { play, stop, muted };
}
