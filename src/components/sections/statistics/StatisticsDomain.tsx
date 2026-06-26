"use client";
import { useQuery } from "@tanstack/react-query";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import { getStatistics } from "@/lib/data/queries";
import { FALLBACK_STATS } from "@/lib/data/fallback";
import { formatStat } from "@/lib/utils/format";

/** 7. Domain Statistics — animated, scroll-triggered, DB-driven. */
export function StatisticsDomain() {
  const { data } = useQuery({ queryKey: ["stats"], queryFn: getStatistics });
  const stats = data && data.length ? data : FALLBACK_STATS;
  return (
    <RealmSection sectionKey="statistics" id="section-statistics">
      <SectionHeading eyebrow="Overview" title="Domain Statistics" />
      <div className="card-grid w-full max-w-5xl">
        {stats.map((st, i) => (
          <Reveal key={st.id} delay={i * 0.08} className="glass-panel p-6 text-center">
            <div className="text-4xl font-bold text-glow accent-glow">
              <AnimatedCounter value={st.value} format={(v) => formatStat(st, v)} />
            </div>
            <div className="mt-2 text-sm uppercase tracking-wider text-white/50">{st.label}</div>
          </Reveal>
        ))}
      </div>
    </RealmSection>
  );
}
