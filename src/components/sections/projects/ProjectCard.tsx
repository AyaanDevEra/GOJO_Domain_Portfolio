"use client";
import { motion } from "framer-motion";
import type { Project } from "@/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live", in_progress: "In Progress", archived: "Archived", planned: "Planned"
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article layout className="glass-panel p-5 transition hover:border-accent/40">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent/80">
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/60">{project.description}</p>
      {project.technologies?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span key={t} className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/60">{t}</span>
          ))}
        </div>
      )}
      {project.external_links?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.external_links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
               className="text-sm text-glow underline-offset-4 hover:underline">{l.label} ↗</a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
