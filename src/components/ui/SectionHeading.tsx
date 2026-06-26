import { cn } from "@/lib/utils/cn";

export function SectionHeading({ eyebrow, title, className }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent/80">{eyebrow}</p>}
      <h2 className="realm-heading accent-glow">{title}</h2>
    </div>
  );
}
