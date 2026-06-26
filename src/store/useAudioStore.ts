import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AudioCategory } from "@/types";

/** Audio prefs persisted to localStorage. Disabled (muted) by default. */
interface AudioState {
  muted: boolean;
  masterVolume: number;                         // 0..1
  categoryVolumes: Record<AudioCategory, number>;
  setMuted: (v: boolean) => void;
  toggleMuted: () => void;
  setMasterVolume: (v: number) => void;
  setCategoryVolume: (c: AudioCategory, v: number) => void;
}

const defaultCategoryVolumes: Record<AudioCategory, number> = {
  ambience: 0.4, domain_theme: 0.4, ui: 0.5, hover: 0.3,
  domain_expansion: 0.8, hollow_purple: 0.8, notification: 0.6
};

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      muted: true,                 // day-one but disabled
      masterVolume: 0.6,
      categoryVolumes: defaultCategoryVolumes,
      setMuted: (v) => set({ muted: v }),
      toggleMuted: () => set((s) => ({ muted: !s.muted })),
      setMasterVolume: (v) => set({ masterVolume: Math.min(1, Math.max(0, v)) }),
      setCategoryVolume: (c, v) =>
        set((s) => ({ categoryVolumes: { ...s.categoryVolumes, [c]: Math.min(1, Math.max(0, v)) } }))
    }),
    { name: "domain-audio-prefs" }
  )
);
