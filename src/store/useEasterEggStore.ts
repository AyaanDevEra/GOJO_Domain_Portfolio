import { create } from "zustand";

/** Tracks unlocked hidden interactions (secret domain, six eyes, etc.). */
interface EasterEggState {
  unlocked: string[];
  unlock: (id: string) => void;
  isUnlocked: (id: string) => boolean;
}

export const useEasterEggStore = create<EasterEggState>((set, get) => ({
  unlocked: [],
  unlock: (id) => set((s) => (s.unlocked.includes(id) ? s : { unlocked: [...s.unlocked, id] })),
  isUnlocked: (id) => get().unlocked.includes(id)
}));
