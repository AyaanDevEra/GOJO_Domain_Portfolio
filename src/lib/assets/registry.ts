/**
 * ⭐ ASSET REGISTRY — single gating chokepoint for ALL images & audio.
 *
 * Per the image-handling rule: no real visuals are wired yet. Every slot
 * returns a placeholder. When the user provides assets, we map them here ONLY
 * — components never change. `is_animated` style assets resolve the same way.
 */

export type AssetKind = "image" | "animated" | "audio";

export interface AssetSlot {
  key: string;
  kind: AssetKind;
  /** null = not provided yet (renders placeholder). */
  src: string | null;
  /** when true the component should render it as a looping/animated asset */
  animated?: boolean;
  alt?: string;
}

/** Transparent placeholder used until real assets arrive. */
export const PLACEHOLDER = "/assets/images/placeholder.svg";

/**
 * The registry. `src: null` everywhere on purpose (gated).
 * To wire an asset later: set its `src` to a Storage URL or /public path.
 */
export const ASSET_REGISTRY: Record<string, AssetSlot> = {
  // Intro — Infinite Void
  "intro.bg":            { key: "intro.bg", kind: "image", src: null, alt: "Infinite Void backdrop" },
  "intro.character":     { key: "intro.character", kind: "animated", src: null, animated: true, alt: "Gojo casting domain" },
  "intro.logo":          { key: "intro.logo", kind: "image", src: null, alt: "Site sigil" },

  // Dashboard — Six Eyes
  "dashboard.avatar":    { key: "dashboard.avatar", kind: "image", src: null, alt: "Avatar" },
  "dashboard.hoverImage":{ key: "dashboard.hoverImage", kind: "animated", src: "/assets/animated/dashboard.hoverImage.webm", animated: true, alt: "Gojo smiling after a thousand slashes" }, // ⭐
  "dashboard.sixEyesGlow":{ key: "dashboard.sixEyesGlow", kind: "animated", src: null, animated: true, alt: "Six Eyes glow" },

  // Communities (banners assigned dynamically by community id -> see helper)
  "community.discordIcon":{ key: "community.discordIcon", kind: "image", src: null, alt: "Discord" },
  // Community banners — PROVIDED (staged in /public/assets). Also resolvable via communities.banner_path.
  "community.soulflares.banner": { key: "community.soulflares.banner", kind: "animated", src: "/assets/animated/community.soulflares.banner.webm", animated: true, alt: "Soulflares banner" },
  "community.mohgs.banner":      { key: "community.mohgs.banner", kind: "image", src: "/assets/images/community.mohgs.banner.webp", alt: "Mohgs banner" },
  "community.arrx.banner":       { key: "community.arrx.banner", kind: "image", src: "/assets/images/community.arrx.banner.webp", alt: "ARRX banner" },

  // Skills
  "skill.panelBg":       { key: "skill.panelBg", kind: "image", src: null, alt: "Skill panel" },

  // Leadership
  "leadership.badge":    { key: "leadership.badge", kind: "animated", src: null, animated: true, alt: "Achievement badge" },
  "leadership.bg":       { key: "leadership.bg", kind: "image", src: null, alt: "Leadership backdrop" },

  // Projects — Hollow Purple
  "projects.orb":        { key: "projects.orb", kind: "animated", src: null, animated: true, alt: "Hollow Purple orb" },
  "projects.bg":         { key: "projects.bg", kind: "animated", src: null, animated: true, alt: "Destruction backdrop" },

  // Mahoraga
  "mahoraga.wheel":      { key: "mahoraga.wheel", kind: "animated", src: null, animated: true, alt: "Adaptation wheel" },

  // Contact — Domain Clash cinematic (PROVIDED)
  "contact.gojoDomain":  { key: "contact.gojoDomain", kind: "image", src: "/assets/images/contact.gojoDomain.jpeg", alt: "Gojo — Unlimited Void" },
  "contact.sukunaDomain":{ key: "contact.sukunaDomain", kind: "image", src: "/assets/images/contact.sukunaDomain.jpeg", alt: "Sukuna — Malevolent Shrine" },
  "contact.clashVideo":  { key: "contact.clashVideo", kind: "animated", src: "/assets/animated/contact.clash.mp4", animated: true, alt: "Gojo vs Sukuna clash" },
  "contact.bg":          { key: "contact.bg", kind: "animated", src: null, animated: true, alt: "Domain clash backdrop" },

  // Easter eggs
  "easter.secretDomain": { key: "easter.secretDomain", kind: "animated", src: null, animated: true, alt: "Secret domain" },
  "easter.sixEyes":      { key: "easter.sixEyes", kind: "animated", src: null, animated: true, alt: "Hidden Six Eyes" }
};

/** Resolve a static/animated slot. Returns placeholder + `ready:false` if gated. */
export function getAsset(key: string): { src: string; ready: boolean; animated: boolean; alt: string } {
  const slot = ASSET_REGISTRY[key];
  if (!slot || !slot.src) {
    return { src: PLACEHOLDER, ready: false, animated: !!slot?.animated, alt: slot?.alt ?? "" };
  }
  return { src: slot.src, ready: true, animated: !!slot.animated, alt: slot.alt ?? "" };
}

/**
 * Dynamic namespaces resolved at runtime from DB paths:
 *   character.{id}.primary/secondary[]   <- characters.*
 *   community.{id}.banner                <- communities.banner_path
 *   communityMember.{id}.image           <- community_members.image_path  (NEW)
 *   gallery.{id}                          <- gallery_items.image_path
 *   audio.{key}                           <- audio_assets.file_path
 */
export function resolveDbAsset(path: string | null): { src: string; ready: boolean } {
  if (!path) return { src: PLACEHOLDER, ready: false };
  return { src: path, ready: true };
}
