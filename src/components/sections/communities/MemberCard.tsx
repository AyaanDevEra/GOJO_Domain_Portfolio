"use client";
import { motion } from "framer-motion";
import type { CommunityMember } from "@/types";
import { resolveDbAsset } from "@/lib/assets/registry";

/**
 * Member card with hover-expand:
 * - collapsed: avatar + display name
 * - hover/focus: member image fills as background, dark blur overlay,
 *   reveals username / discord id / role / bio.
 * Glassmorphism + gold & blue accents. Keyboard accessible.
 */
export function MemberCard({ member }: { member: CommunityMember }) {
  const { src, ready } = resolveDbAsset(member.image_path);
  return (
    <motion.div
      layout tabIndex={0}
      className="group relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md outline-none transition-all duration-500 hover:border-gold/50 focus-visible:border-gold/50 hover:shadow-[0_0_30px_rgba(72,177,255,0.25)]"
    >
      {/* image background (revealed on hover) */}
      {ready && (
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      )}
      {/* dark blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-0 transition-all duration-500 group-hover:bg-black/65 group-hover:backdrop-blur-sm group-focus-visible:bg-black/65" />

      {/* collapsed content */}
      <div className="relative flex h-full flex-col justify-end p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-gold/40 bg-void-800 text-sm font-bold text-gold">
            {ready ? <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : member.display_name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{member.display_name}</p>
            {member.role && <p className="truncate text-xs text-[rgb(var(--accent))]">{member.role}</p>}
          </div>
        </div>

        {/* expanded details */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <dl className="space-y-1 text-xs text-white/80">
              {member.username && <div><dt className="inline text-gold">@</dt> <dd className="inline">{member.username}</dd></div>}
              {member.discord_id && <div><dt className="inline text-[rgb(var(--accent))]">Discord:</dt> <dd className="inline">{member.discord_id}</dd></div>}
              {member.bio && <p className="mt-1 line-clamp-3 text-white/70">{member.bio}</p>}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
