"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Community } from "@/types";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import { CommunityBanner } from "@/components/sections/communities/CommunityBanner";
import { CommunityShowcase } from "@/components/sections/communities/CommunityShowcase";
import { getCommunities } from "@/lib/data/queries";
import { FALLBACK_COMMUNITIES } from "@/lib/data/fallback";

const isVideo = (p: string | null) => !!p && /\.(webm|mp4)$/i.test(p);

/** 3. Communities — banner cards, animated counters, click -> Member Showcase. */
export function CommunitiesDomain() {
  const { data } = useQuery({ queryKey: ["communities"], queryFn: getCommunities });
  const communities = data && data.length ? data : FALLBACK_COMMUNITIES;
  const [selected, setSelected] = useState<Community | null>(null);

  return (
    <RealmSection sectionKey="communities" id="section-communities">
      <SectionHeading eyebrow="Realms I Lead" title="Communities" />
      <div className="card-grid w-full max-w-5xl">
        {communities.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1}>
            <div
              role="button" tabIndex={0}
              onClick={() => setSelected(c)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(c)}
              className="glass-panel group cursor-pointer overflow-hidden transition hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              <CommunityBanner path={c.banner_path} alt={c.name} animate={!isVideo(c.banner_path)} />
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-gold">{c.role}</div>
                <h3 className="mt-1 text-xl font-semibold">{c.name}</h3>
                <div className="mt-4 text-3xl font-bold text-glow accent-glow">
                  <AnimatedCounter value={c.member_count} format={(v) => v.toLocaleString() + "+"} />
                </div>
                <div className="text-xs text-white/50">members</div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="rounded-lg border border-[rgb(var(--accent))]/40 px-4 py-2 text-sm text-glow transition group-hover:bg-[rgb(var(--accent))]/15">
                    View Members
                  </span>
                  {c.discord_url && (
                    <a
                      href={c.discord_url} target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-gold/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    >
                      Discord ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <CommunityShowcase community={selected} onClose={() => setSelected(null)} />
    </RealmSection>
  );
}
