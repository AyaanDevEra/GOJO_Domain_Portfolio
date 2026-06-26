"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyScene } from "@/components/three/LazyScene";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { getProjects, getProjectCategories } from "@/lib/data/queries";
import { FALLBACK_PROJECTS, FALLBACK_PROJECT_CATEGORIES } from "@/lib/data/fallback";

/** 6. Hollow Purple — Projects with category filtering. */
export function ProjectsDomain() {
  const { data: projects } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
  const { data: categories } = useQuery({ queryKey: ["project-categories"], queryFn: getProjectCategories });
  const [active, setActive] = useState<string>("all");

  const list = projects && projects.length ? projects : FALLBACK_PROJECTS;
  const cats = categories && categories.length ? categories : FALLBACK_PROJECT_CATEGORIES;
  const filtered = useMemo(
    () => (active === "all" ? list : list.filter((p) => p.category_id === active)),
    [list, active]
  );

  return (
    <RealmSection sectionKey="projects" id="section-projects" className="overflow-hidden">
      <LazyScene name="hollow" label="Hollow Purple" className="absolute inset-0 -z-10 opacity-60" />
      <SectionHeading eyebrow="Imaginary Technique" title="Hollow Purple Projects" />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {[{ id: "all", name: "All" }, ...cats].map((c) => (
          <button
            key={c.id} onClick={() => setActive(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              active === c.id ? "bg-accent/20 text-glow accent-glow" : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-white/40">No projects yet — add them from the Admin Panel.</p>
      ) : (
        <motion.div layout className="card-grid w-full max-w-5xl">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </motion.div>
      )}
    </RealmSection>
  );
}
