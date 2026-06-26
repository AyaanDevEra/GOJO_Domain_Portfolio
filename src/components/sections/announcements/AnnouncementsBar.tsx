"use client";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { getAnnouncements } from "@/lib/data/queries";

/**
 * Visitor announcements bar — a dismissible top banner that surfaces active
 * announcements (Admin → Announcements). Renders nothing when there are none,
 * so it stays invisible until content exists. Database-driven, no fallback.
 */
export function AnnouncementsBar() {
  const { data } = useQuery({ queryKey: ["announcements"], queryFn: getAnnouncements });
  const list = useMemo(() => data ?? [], [data]);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  // Rotate through multiple active announcements.
  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, [list.length]);

  if (dismissed || list.length === 0) return null;
  const current = list[index % list.length];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex justify-center px-3 pt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          role="status"
          className="pointer-events-auto flex w-full max-w-3xl items-center gap-3 rounded-full border border-gold/30 bg-void-900/85 px-4 py-2 text-sm text-white/85 shadow-[0_0_30px_rgba(72,177,255,0.15)] backdrop-blur-md"
        >
          <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
            {current.title}
          </span>
          {current.body && <span className="min-w-0 flex-1 truncate text-white/70">{current.body}</span>}
          {list.length > 1 && (
            <span className="shrink-0 text-[10px] text-white/40">{(index % list.length) + 1}/{list.length}</span>
          )}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcements"
            className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/60 transition hover:border-gold/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]"
          >
            ✕
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
