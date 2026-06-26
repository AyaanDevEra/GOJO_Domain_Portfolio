"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggStore } from "@/store/useEasterEggStore";

/** Secret Domain Expansion payoff — triggers when the hidden code is entered. */
export function EasterEggOverlay() {
  const unlocked = useEasterEggStore((s) => s.unlocked);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (unlocked.includes("secret_domain")) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 4500);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-black"
          role="dialog" aria-label="Secret Domain Expansion"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-72 w-72 rounded-full"
            style={{
              boxShadow: "0 0 130px 50px rgba(72,177,255,0.55)",
              background: "radial-gradient(circle, #8fd4ff 0%, #48b1ff 32%, #0a0c14 72%)"
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.45em" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-28 text-center text-lg font-bold text-[#8fd4ff] sm:text-2xl"
          >
            DOMAIN&nbsp;EXPANSION
          </motion.p>
          <p className="absolute bottom-12 text-xs text-white/40">click to dismiss</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
