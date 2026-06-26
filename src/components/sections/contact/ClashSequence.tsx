"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAsset } from "@/lib/assets/registry";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Stage = "idle" | "gojo" | "black1" | "sukuna" | "black2" | "clash";

/**
 * Contact intro cinematic:
 * 1) Gojo casts Unlimited Void on the LEFT half  -> blackout
 * 2) Sukuna casts Malevolent Shrine on the RIGHT half -> blackout
 * 3) Full clash video plays.
 * Triggers when scrolled into view. Reduced-motion / replay supported.
 */
export function ClashSequence({ onClash }: { onClash?: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();

  const gojo = getAsset("contact.gojoDomain");
  const sukuna = getAsset("contact.sukunaDomain");
  const clash = getAsset("contact.clashVideo");

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = () => {
    if (started.current) return;
    started.current = true;
    if (reduced) { setStage("clash"); onClash?.(); return; }
    setStage("gojo");
    timers.current.push(window.setTimeout(() => setStage("black1"), 2300));
    timers.current.push(window.setTimeout(() => setStage("sukuna"), 3000));
    timers.current.push(window.setTimeout(() => setStage("black2"), 5300));
    timers.current.push(window.setTimeout(() => { setStage("clash"); onClash?.(); }, 6000));
  };

  const skip = () => { clearTimers(); started.current = true; setStage("clash"); onClash?.(); };
  const replay = () => { clearTimers(); started.current = false; setStage("idle"); requestAnimationFrame(run); };

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimers(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-black">
      {/* Gojo — left half */}
      <AnimatePresence>
        {stage === "gojo" && (
          <motion.div key="gojo" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <img src={gojo.src} alt="" decoding="async" className="h-full w-full object-cover object-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-6 text-xl font-bold tracking-widest text-[#8fd4ff] [text-shadow:0_0_22px_#48b1ff] sm:text-3xl">
              UNLIMITED&nbsp;VOID
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sukuna — right half */}
      <AnimatePresence>
        {stage === "sukuna" && (
          <motion.div key="sukuna" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <img src={sukuna.src} alt="" decoding="async" className="h-full w-full object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/80" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute bottom-12 right-6 text-right text-xl font-bold tracking-widest text-[#ff8585] [text-shadow:0_0_22px_#e23b3b] sm:text-3xl">
              MALEVOLENT&nbsp;SHRINE
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full clash video */}
      {stage === "clash" && (
        <motion.video initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          src={clash.src} autoPlay loop muted playsInline preload="none" poster="/assets/images/contact.clash.poster.jpg"
          className="absolute inset-0 h-full w-full object-cover" />
      )}

      {/* controls */}
      {stage !== "idle" && stage !== "clash" && (
        <button onClick={skip} className="absolute right-4 top-4 z-20 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs text-white/80 backdrop-blur hover:text-white">
          Skip ⏭
        </button>
      )}
      {stage === "clash" && !reduced && (
        <button onClick={replay} className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/60 backdrop-blur hover:text-white">
          ↺ Replay
        </button>
      )}
    </div>
  );
}
