"use client";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import { Placeholder3D } from "@/components/ui/Placeholder3D";

const SCENES = {
  intro:    dynamic(() => import("./IntroScene"), { ssr: false }),
  hollow:   dynamic(() => import("./HollowPurpleScene"), { ssr: false }),
  mahoraga: dynamic(() => import("./MahoragaScene"), { ssr: false })
} as const;

/** Mounts a heavy 3D scene only when scrolled into view; placeholder otherwise. */
export function LazyScene({ name, label, className }:
  { name: keyof typeof SCENES; label: string; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "300px", threshold: 0.01 });
  const Scene = SCENES[name];
  return (
    <div ref={ref} className={className}>
      {inView ? <Scene /> : <Placeholder3D label={label} className="h-full w-full" />}
    </div>
  );
}
