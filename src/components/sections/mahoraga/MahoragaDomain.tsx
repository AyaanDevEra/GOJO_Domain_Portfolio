"use client";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyScene } from "@/components/three/LazyScene";
import { Reveal } from "@/components/animation/Reveal";

/** 7(theme). Mahoraga — learning progression / adaptation timeline. */
const TIMELINE = [
  { phase: "Foundations", detail: "Core programming & logic." },
  { phase: "Adaptation", detail: "Discord bots & automation." },
  { phase: "Evolution", detail: "Full-stack & systems design." }
];

export function MahoragaDomain() {
  return (
    <RealmSection sectionKey="mahoraga" id="section-mahoraga">
      <SectionHeading eyebrow="Adaptation" title="Mahoraga Learning Wheel" />
      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-[280px_1fr] md:items-center">
        <Reveal><LazyScene name="mahoraga" label="Mahoraga Wheel" className="relative aspect-square w-full" /></Reveal>
        <ol className="relative space-y-6 border-l border-white/10 pl-6">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.phase} delay={i * 0.1}>
              <li className="relative">
                <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_12px_rgb(var(--glow)/0.8)]" />
                <h3 className="font-semibold">{t.phase}</h3>
                <p className="text-sm text-white/60">{t.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </RealmSection>
  );
}
