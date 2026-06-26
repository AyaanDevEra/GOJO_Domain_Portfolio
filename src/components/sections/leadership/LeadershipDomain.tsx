"use client";
import { useQuery } from "@tanstack/react-query";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { getAchievements } from "@/lib/data/queries";
import { FALLBACK_ACHIEVEMENTS } from "@/lib/data/fallback";

/** 5. Leadership — premium showcase of showcased achievements. */
export function LeadershipDomain() {
  const { data } = useQuery({ queryKey: ["achievements"], queryFn: getAchievements });
  const showcase = (data && data.length ? data : FALLBACK_ACHIEVEMENTS).filter((a) => a.is_showcase);
  return (
    <RealmSection sectionKey="leadership" id="section-leadership">
      <SectionHeading eyebrow="Honored Title" title="Leadership" />
      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-[200px_1fr] md:items-center">
        <Reveal><AssetImage slot="leadership.badge" width={200} height={200} /></Reveal>
        <div className="space-y-4">
          {showcase.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08} className="glass-panel p-5">
              <h3 className="text-lg font-semibold text-glow accent-glow">{a.title}</h3>
              <p className="mt-1 text-sm text-white/60">{a.description}</p>
              <span className="mt-2 inline-block text-xs uppercase tracking-wider text-accent/70">{a.category}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </RealmSection>
  );
}
