import type { Skill, Community, Statistic, Achievement, DomainLore, SiteSettings, GalleryItem, Project, ProjectCategory, CommunityMember } from "@/types";
import { REALM_FALLBACK_ACCENTS } from "@/config/theme";

/** Static fallbacks mirroring the DB seed — used when Supabase isn't configured yet. */
export const FALLBACK_SETTINGS: SiteSettings = {
  id: "fallback", display_name: "GOJO SATORU", username: "gojo_satoru.tho",
  real_name: "Gojo Khan", hover_image_path: null,
  socials: { discord: "", instagram: "", github: "", email: "" },
  audio_enabled: false, master_volume: 0.6
};

export const FALLBACK_SKILLS: Skill[] = [
  { id: "1", name: "Java", percentage: 80, category: "Programming", icon_path: null, description: null, sort_order: 1 },
  { id: "2", name: "C Language", percentage: 70, category: "Programming", icon_path: null, description: null, sort_order: 2 },
  { id: "3", name: "Python", percentage: 85, category: "Programming", icon_path: null, description: null, sort_order: 3 },
  { id: "4", name: "HTML", percentage: 90, category: "Web", icon_path: null, description: null, sort_order: 4 },
  { id: "5", name: "Discord Bot Development", percentage: 88, category: "Bots", icon_path: null, description: null, sort_order: 5 }
];

export const FALLBACK_COMMUNITIES: Community[] = [
  { id: "1", name: "Soulflares", role: "Owner", member_count: 1000, discord_url: null, banner_path: "/assets/animated/community.soulflares.banner.webm", sort_order: 1 },
  { id: "2", name: "Mohgs", role: "Assistant Manager", member_count: 3000, discord_url: null, banner_path: "/assets/images/community.mohgs.banner.webp", sort_order: 2 },
  { id: "3", name: "Anime Re Rangers X", role: "Tester", member_count: 400000, discord_url: null, banner_path: "/assets/images/community.arrx.banner.webp", sort_order: 3 }
];

export const FALLBACK_STATS: Statistic[] = [
  { id: "1", label: "Servers Managed", value: 3, unit: null, display_format: "{value}", icon: "server", source: "manual", derived_key: null, sort_order: 1, is_active: true },
  { id: "2", label: "Members Reached", value: 404000, unit: null, display_format: "{k}K+", icon: "users", source: "derived", derived_key: "total_members", sort_order: 2, is_active: true },
  { id: "3", label: "Programming Skills", value: 5, unit: null, display_format: "{value}", icon: "code", source: "manual", derived_key: null, sort_order: 3, is_active: true },
  { id: "4", label: "Guild Ranking", value: 25, unit: null, display_format: "Top {value}", icon: "trophy", source: "manual", derived_key: null, sort_order: 4, is_active: true },
  { id: "5", label: "Projects Created", value: 0, unit: null, display_format: "{value}", icon: "rocket", source: "manual", derived_key: null, sort_order: 5, is_active: true }
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  { id: "1", title: "Soulflares Owner", description: "Founder & owner of Soulflares.", category: "Community", priority: 1, image_path: null, date_earned: null, is_showcase: true, is_featured: true, related_section: "communities", sort_order: 1 },
  { id: "2", title: "Mohgs Assistant Manager", description: "Assistant manager at Mohgs.", category: "Community", priority: 2, image_path: null, date_earned: null, is_showcase: true, is_featured: false, related_section: "communities", sort_order: 2 },
  { id: "3", title: "ARRX Tester", description: "Tester for Anime Re Rangers X.", category: "Community", priority: 3, image_path: null, date_earned: null, is_showcase: true, is_featured: false, related_section: "communities", sort_order: 3 },
  { id: "4", title: "Top 25 Anime Vanguard Guild Leader", description: "Ranked Top 25 guild leadership.", category: "Gaming", priority: 0, image_path: null, date_earned: null, is_showcase: true, is_featured: true, related_section: "leadership", sort_order: 4 }
];

const acc = (k: string) => REALM_FALLBACK_ACCENTS[k];
export const FALLBACK_DOMAINS: DomainLore[] = [
  { id: "1", key: "infinite_void", name: "Infinite Void", description: "An endless expanse of information.", theme: "void", visual_identity: "black hole / galaxy", animation_preset: "void_collapse", audio_preset: "infinite_void_ambient", accent_colors: acc("infinite_void"), background_assets: ["intro.bg"], section_key: "intro", sort_order: 1, is_active: true },
  { id: "2", key: "six_eyes", name: "Six Eyes", description: "Perfect clarity and control.", theme: "sixeyes", visual_identity: "blue glow", animation_preset: "six_eyes_pulse", audio_preset: "six_eyes_ambient", accent_colors: acc("six_eyes"), background_assets: [], section_key: "dashboard", sort_order: 2, is_active: true },
  { id: "3", key: "hollow_purple", name: "Hollow Purple", description: "Imaginary technique of destruction.", theme: "hollow", visual_identity: "purple energy", animation_preset: "hollow_charge", audio_preset: "hollow_purple_theme", accent_colors: acc("hollow_purple"), background_assets: ["projects.bg"], section_key: "projects", sort_order: 3, is_active: true },
  { id: "4", key: "mahoraga", name: "Mahoraga Adaptation", description: "Adapts to all phenomena.", theme: "mahoraga", visual_identity: "rotating wheel", animation_preset: "mahoraga_wheel", audio_preset: "mahoraga_theme", accent_colors: acc("mahoraga"), background_assets: [], section_key: "mahoraga", sort_order: 4, is_active: true },
  { id: "5", key: "domain_clash", name: "Domain Clash", description: "Gojo vs Sukuna.", theme: "clash", visual_identity: "red vs blue", animation_preset: "clash_impact", audio_preset: "clash_theme", accent_colors: acc("domain_clash"), background_assets: ["contact.bg"], section_key: "contact", sort_order: 5, is_active: true }
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  { id: "g1", title: "Six Eyes", category: "artwork", image_path: "/assets/images/gallery.gojo-sixeyes.jpeg", is_animated: false, sort_order: 1 },
  { id: "g2", title: "Hollow Purple", category: "artwork", image_path: "/assets/images/gallery.hollow-purple.jpeg", is_animated: false, sort_order: 2 },
  { id: "g3", title: "Mahoraga Adaptation", category: "artwork", image_path: "/assets/images/gallery.mahoraga.jpeg", is_animated: false, sort_order: 3 },
  { id: "g4", title: "Domain Clash", category: "artwork", image_path: "/assets/images/gallery.domain-clash.jpeg", is_animated: false, sort_order: 4 },
  { id: "g5", title: "Infinite Void", category: "artwork", image_path: "/assets/images/gallery.infinite-void.jpeg", is_animated: false, sort_order: 5 }
];

/** Mirrors the seeded project_categories (supabase/seed.sql). */
export const FALLBACK_PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "c1", name: "Discord", slug: "discord", sort_order: 1 },
  { id: "c2", name: "Programming", slug: "programming", sort_order: 2 },
  { id: "c3", name: "Community Management", slug: "community", sort_order: 3 },
  { id: "c4", name: "Design", slug: "design", sort_order: 4 },
  { id: "c5", name: "Future Projects", slug: "future", sort_order: 5 }
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "p1", title: "Soulflares Discord Bot", description: "Custom moderation, leveling, and engagement bot powering the Soulflares community.",
    category_id: "c1", images: [], status: "live", technologies: ["Java", "Discord API"],
    external_links: [], is_featured: true, sort_order: 1
  },
  {
    id: "p2", title: "Community Management Suite", description: "Tooling and workflows for running multiple large Discord guilds.",
    category_id: "c3", images: [], status: "live", technologies: ["Python", "Automation"],
    external_links: [], is_featured: false, sort_order: 2
  },
  {
    id: "p3", title: "Portfolio Domain Engine", description: "This cinematic Jujutsu-themed portfolio experience built on Next.js and Three.js.",
    category_id: "c2", images: [], status: "in_progress", technologies: ["Next.js", "TypeScript", "Three.js"],
    external_links: [], is_featured: true, sort_order: 3
  },
  {
    id: "p4", title: "Hollow Purple Concept Art", description: "Visual design explorations for the Domain Expansion realms.",
    category_id: "c4", images: [], status: "planned", technologies: ["Design"],
    external_links: [], is_featured: false, sort_order: 4
  }
];

/**
 * Static member fallbacks keyed by community id. Used only when Supabase has no
 * members for a community; mirrors the FALLBACK_COMMUNITIES ids ("1","2","3").
 */
export const FALLBACK_MEMBERS: Record<string, CommunityMember[]> = {
  "1": [
    { id: "m1", community_id: "1", display_name: "Gojo Khan", username: "gojo_satoru.tho", discord_id: "", role: "Owner", bio: "Founder & owner of Soulflares.", image_path: null, sort_order: 1 },
    { id: "m2", community_id: "1", display_name: "Soulflares Staff", username: "soulflares.staff", discord_id: "", role: "Moderator", bio: "Core moderation team keeping the realm thriving.", image_path: null, sort_order: 2 },
    { id: "m3", community_id: "1", display_name: "Community Lead", username: "soulflares.lead", discord_id: "", role: "Manager", bio: "Coordinates events and member engagement.", image_path: null, sort_order: 3 }
  ],
  "2": [
    { id: "m4", community_id: "2", display_name: "Mohgs Lead", username: "mohgs.lead", discord_id: "", role: "Assistant Manager", bio: "Assistant manager at Mohgs.", image_path: null, sort_order: 1 }
  ],
  "3": [
    { id: "m5", community_id: "3", display_name: "ARRX Tester", username: "arrx.tester", discord_id: "", role: "Tester", bio: "Tester for Anime Re Rangers X.", image_path: null, sort_order: 1 }
  ]
};

/** Returns static members for a community id, or [] if none defined. */
export const getFallbackMembers = (communityId: string): CommunityMember[] =>
  FALLBACK_MEMBERS[communityId] ?? [];
