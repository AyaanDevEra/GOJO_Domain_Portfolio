"use client";
import { useQuery } from "@tanstack/react-query";
import { RealmSection } from "@/components/realm-engine/RealmSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { resolveDbAsset } from "@/lib/assets/registry";
import { getGallery } from "@/lib/data/queries";
import { FALLBACK_GALLERY } from "@/lib/data/fallback";

/** 9. Gallery — screenshots, designs, achievements, banners, artwork. */
export function GalleryDomain() {
  const { data } = useQuery({ queryKey: ["gallery"], queryFn: getGallery });
  const items = data && data.length ? data : FALLBACK_GALLERY;
  return (
    <RealmSection sectionKey="gallery" id="section-gallery">
      <SectionHeading eyebrow="Archive" title="Gallery" />
      {items.length === 0 ? (
        <p className="text-sm text-white/40">No gallery items yet — upload from the Admin Panel.</p>
      ) : (
        <div className="card-grid w-full max-w-5xl">
          {items.map((it, i) => {
            const a = resolveDbAsset(it.image_path);
            return (
              <Reveal key={it.id} delay={i * 0.05} className="glass-panel overflow-hidden">
                {a.ready ? (
                  it.is_animated
                    ? <video src={a.src} autoPlay loop muted playsInline preload="metadata" className="h-48 w-full object-cover" />
                    : <img src={a.src} alt={it.title} loading="lazy" decoding="async" className="h-48 w-full object-cover" />
                ) : (
                  <div className="grid h-48 w-full place-items-center text-xs text-white/40">{it.title} · pending</div>
                )}
                <div className="p-3 text-sm text-white/70">{it.title}</div>
              </Reveal>
            );
          })}
        </div>
      )}
    </RealmSection>
  );
}
