"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { getSkills } from "@/lib/data/queries";
import { FALLBACK_SKILLS } from "@/lib/data/fallback";

/** 4. Skills — animated progress bars + expansion panels. */
export function SkillsDomain() {
  const { data } = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const skills = data && data.length ? data : FALLBACK_SKILLS;
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <RealmSection sectionKey="skills" id="section-skills">
      <SectionHeading eyebrow="Cursed Techniques" title="Skills" />
      <div className="w-full max-w-2xl space-y-4">
        {skills.map((sk, i) => (
          <Reveal key={sk.id} delay={i * 0.06} className="glass-panel p-5">
            <button
              className="flex w-full items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenId(openId === sk.id ? null : sk.id)}
              aria-expanded={openId === sk.id}
            >
              <span className="font-medium">{sk.name}</span>
              <span className="text-sm text-accent/80">{sk.percentage}%</span>
            </button>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[rgb(var(--accent))]"
                initial={{ width: 0 }} whileInView={{ width: `${sk.percentage}%` }}
                viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <AnimatePresence>
              {openId === sk.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
                >
                  <p className="mt-3 text-sm text-white/60">
                    {sk.description ?? `${sk.category ?? "Skill"} — details coming soon.`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        ))}
      </div>
    </RealmSection>
  );
}
