import { create } from "zustand";
import type { SectionKey } from "@/types";

/** Global experience/navigation state. NO user theme selection (curated experience). */
interface ExperienceState {
  hasEntered: boolean;          // domain expansion intro completed
  currentDomain: SectionKey;    // drives accent colors + audio theme automatically
  scrollLocked: boolean;        // locked during intro
  navigatorOpen: boolean;
  enter: () => void;
  setDomain: (s: SectionKey) => void;
  setScrollLocked: (v: boolean) => void;
  toggleNavigator: (v?: boolean) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasEntered: false,
  currentDomain: "intro",
  scrollLocked: true,
  navigatorOpen: false,
  enter: () => set({ hasEntered: true, scrollLocked: false, currentDomain: "dashboard" }),
  setDomain: (s) => set({ currentDomain: s }),
  setScrollLocked: (v) => set({ scrollLocked: v }),
  toggleNavigator: (v) => set((st) => ({ navigatorOpen: v ?? !st.navigatorOpen }))
}));
