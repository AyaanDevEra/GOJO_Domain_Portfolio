"use client";
import { useAudioStore } from "@/store/useAudioStore";

/** Mute toggle + master volume — surfaced inside the Domain Navigator. */
export function AudioControl() {
  const { muted, toggleMuted, masterVolume, setMasterVolume } = useAudioStore();
  return (
    <div className="flex items-center gap-2 px-1">
      <button
        onClick={toggleMuted}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute audio" : "Mute audio"}
        className="rounded-md px-2 py-1 text-xs text-white/70 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {muted ? "🔇 Audio Off" : "🔊 Audio On"}
      </button>
      <input
        type="range" min={0} max={1} step={0.05} value={masterVolume}
        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
        aria-label="Master volume"
        className="h-1 w-20 accent-[rgb(var(--accent))]"
      />
    </div>
  );
}
