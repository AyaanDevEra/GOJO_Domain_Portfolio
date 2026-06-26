"use client";
import Image from "next/image";
import type { Character } from "@/types";
import { resolveDbAsset } from "@/lib/assets/registry";
import { cn } from "@/lib/utils/cn";

/**
 * Renders a character from a DB record (decoupled from sections).
 * Images are gated -> shows a labelled placeholder until provided.
 */
export function CharacterRenderer({ character, className }: { character: Character; className?: string }) {
  const { src, ready } = resolveDbAsset(character.primary_image_path);
  return (
    <figure className={cn("relative", className)}>
      {ready ? (
        <Image src={src} alt={character.name} width={420} height={620} className="h-auto w-full object-contain" />
      ) : (
        <div className="grid aspect-[2/3] w-full place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-center text-xs text-white/40">
          <span>{character.name}<br /><span className="opacity-60">image pending</span></span>
        </div>
      )}
      <figcaption className="mt-2 text-center text-sm text-white/60">{character.role}</figcaption>
    </figure>
  );
}
