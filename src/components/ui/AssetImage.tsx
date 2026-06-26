"use client";
import Image from "next/image";
import { getAsset } from "@/lib/assets/registry";
import { cn } from "@/lib/utils/cn";

/**
 * Renders a registry-backed image. Until the asset is provided it shows a
 * clean labelled placeholder. `animated` slots will use <video>/<img> for
 * WebM/GIF once real files are wired — handled here in one place.
 */
export function AssetImage({
  slot, width = 600, height = 600, className, rounded = true
}: { slot: string; width?: number; height?: number; className?: string; rounded?: boolean }) {
  const { src, ready, alt } = getAsset(slot);
  if (!ready) {
    return (
      <div
        className={cn(
          "grid place-items-center border border-dashed border-white/15 bg-white/[0.02] text-center text-[11px] text-white/40",
          rounded && "rounded-xl", className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
        aria-label={`${alt || slot} (pending)`}
      >
        <span>{alt || slot}<br /><span className="opacity-60">asset pending</span></span>
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} width={width} height={height}
      className={cn(rounded && "rounded-xl", "h-auto w-full object-cover", className)} />
  );
}
