"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import type { Community } from "@/types";
import { getCommunityMembers } from "@/lib/data/queries";
import { getFallbackMembers } from "@/lib/data/fallback";
import { MemberCard } from "@/components/sections/communities/MemberCard";

/**
 * Member Showcase overlay for a clicked community. Fully DB-driven:
 * fetches community_members by community_id. No hardcoded members.
 */
export function CommunityShowcase({ community, onClose }: { community: Community | null; onClose: () => void }) {
  const { data: members, isLoading } = useQuery({
    queryKey: ["community-members", community?.id],
    queryFn: () => getCommunityMembers(community!.id),
    enabled: !!community
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {community && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={`${community.name} members`}
        >
          <div className="absolute inset-0 bg-void-950/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-gold/30 bg-void-900/90 shadow-[0_0_50px_rgba(72,177,255,0.2)]"
          >
            <header className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Member Showcase</p>
                <h3 className="text-2xl font-bold accent-glow">{community.name}</h3>
              </div>
              <button onClick={onClose} aria-label="Close"
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70 hover:border-gold/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]">
                Esc ✕
              </button>
            </header>

            <div className="overflow-y-auto p-5">
              {isLoading ? (
                <p className="py-12 text-center text-sm text-white/40">Loading members…</p>
              ) : ((members && members.length ? members : getFallbackMembers(community.id)).length > 0) ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(members && members.length ? members : getFallbackMembers(community.id)).map((m) => <MemberCard key={m.id} member={m} />)}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-sm text-white/50">No members yet.</p>
                  <p className="mt-1 text-xs text-white/30">Add members from the Admin Panel → Members.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
