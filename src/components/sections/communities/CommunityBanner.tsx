"use client";
import { resolveDbAsset } from "@/lib/assets/registry";
import { cn } from "@/lib/utils/cn";

const isVideo = (p: string) => /\.(webm|mp4)$/i.test(p);

/**
 * Renders a community banner at the top of its card.
 * - Video banners (.webm/.mp4) autoplay, looped, muted (e.g. Soulflares).
 * - Image banners get a subtle Ken-Burns drift ("animate a bit") unless reduced-motion.
 * object-center keeps the focal subject framed (fixes positioning).
 */
export function CommunityBanner({ path, alt, animate = true }: { path: string | null; alt: string; animate?: boolean }) {
  const { src, ready } = resolveDbAsset(path);
  if (!ready) {
    return <div className="grid h-32 w-full place-items-center bg-white/[0.02] text-[11px] text-white/40">{alt} · banner pending</div>;
  }
  return (
    <div className="relative h-32 w-full overflow-hidden">
      {isVideo(src) ? (
        <video src={src} autoPlay loop muted playsInline preload="metadata"
          className="h-full w-full object-cover object-center" aria-label={alt} />
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async"
          className={cn("h-full w-full object-cover object-center", animate && "motion-safe:animate-kenburns")} />
      )}
      {/* legibility gradient toward card body */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/30 to-transparent" />
    </div>
  );
}
