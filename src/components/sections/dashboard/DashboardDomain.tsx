"use client";
import { useQuery } from "@tanstack/react-query";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { HoverImagePopover } from "@/components/animation/HoverImagePopover";
import { Reveal } from "@/components/animation/Reveal";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import { getSiteSettings, getStatistics, getAchievements } from "@/lib/data/queries";
import { FALLBACK_SETTINGS, FALLBACK_STATS, FALLBACK_ACHIEVEMENTS } from "@/lib/data/fallback";
import { formatStat } from "@/lib/utils/format";

/** 2. Main Dashboard — Six Eyes hub. */
export function DashboardDomain() {
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: getSiteSettings });
  const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: getStatistics });
  const { data: ach } = useQuery({ queryKey: ["achievements"], queryFn: getAchievements });

  const s = settings ?? FALLBACK_SETTINGS;
  const statList = (stats && stats.length ? stats : FALLBACK_STATS).slice(0, 3);
  const featured = (ach && ach.length ? ach : FALLBACK_ACHIEVEMENTS).filter((a) => a.is_featured);

  return (
    <RealmSection sectionKey="dashboard" id="section-dashboard">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent/80">@{s.username}</p>
        <h2 className="realm-heading accent-glow mt-2">
          <HoverImagePopover>{s.display_name}</HoverImagePopover>
        </h2>
        <p className="mt-2 text-white/60">{s.real_name}</p>
      </Reveal>

      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {statList.map((st, i) => (
          <Reveal key={st.id} delay={i * 0.1} className="glass-panel p-5 text-center">
            <div className="text-3xl font-bold text-glow accent-glow">
              <AnimatedCounter value={st.value} format={(v) => formatStat(st, v)} />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{st.label}</div>
          </Reveal>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {featured.map((a) => (
            <span key={a.id} className="glass-panel px-4 py-2 text-sm text-white/80">⭐ {a.title}</span>
          ))}
        </div>
      )}
    </RealmSection>
  );
}
