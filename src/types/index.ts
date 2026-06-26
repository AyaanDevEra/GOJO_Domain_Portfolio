/**
 * Central typed data models — mirror the Supabase schema.
 * These are the single source of truth shared across Visitor, Admin, and DB layers.
 */

export type AnimationPresetKey = string; // validated against config/animations.ts
export type AudioPresetKey = string;     // validated against config/audio.ts
export type SectionKey =
  | "intro" | "dashboard" | "statistics" | "communities" | "skills"
  | "leadership" | "projects" | "mahoraga" | "contact" | "gallery";

export interface AccentColors {
  primary: string;   // "72 177 255"  (space-separated RGB for CSS vars)
  secondary: string;
  glow: string;
}

export interface DomainLore {
  id: string;
  key: string;                 // unique, e.g. "infinite_void"
  name: string;
  description: string;         // lore text
  theme: string;
  visual_identity: string;
  animation_preset: AnimationPresetKey;
  audio_preset: AudioPresetKey | null;
  accent_colors: AccentColors;
  background_assets: string[]; // registry slot keys / storage paths
  section_key: SectionKey;
  sort_order: number;
  is_active: boolean;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  primary_image_path: string | null;   // gated
  secondary_images: string[];
  associated_section: SectionKey | string;
  animation_presets: AnimationPresetKey[];
  audio_refs: AudioPresetKey[];
  sort_order: number;
  is_active: boolean;
}

export type AudioCategory =
  | "ambience" | "domain_theme" | "ui" | "hover"
  | "domain_expansion" | "hollow_purple" | "notification";

export interface AudioAsset {
  id: string;
  key: string;                 // unique
  name: string;
  category: AudioCategory;
  file_path: string | null;    // gated
  default_volume: number;      // 0..1
  loop: boolean;
  is_active: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  image_path: string | null;   // gated
  date_earned: string | null;  // ISO date
  is_showcase: boolean;
  is_featured: boolean;
  related_section: SectionKey | string | null;
  sort_order: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export type ProjectStatus = "live" | "in_progress" | "archived" | "planned";

export interface ExternalLink { label: string; url: string; }

export interface Project {
  id: string;
  title: string;
  description: string;
  category_id: string | null;
  images: string[];            // gated
  status: ProjectStatus;
  technologies: string[];
  external_links: ExternalLink[];
  is_featured: boolean;
  sort_order: number;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  unit: string | null;
  display_format: string;      // e.g. "{value}+", "{value}K+"
  icon: string | null;
  source: "manual" | "derived";
  derived_key: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;          // 0..100
  category: string | null;
  icon_path: string | null;    // gated
  description: string | null;
  sort_order: number;
}

export interface Community {
  id: string;
  name: string;
  role: string;
  member_count: number;
  discord_url: string | null;
  banner_path: string | null;  // gated
  sort_order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_path: string | null;   // gated
  is_animated: boolean;
  sort_order: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  is_active: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  display_name: string;        // "GOJO SATORU"
  username: string;            // "gojo_satoru.tho"
  real_name: string;           // "Gojo Khan"
  hover_image_path: string | null; // gated ⭐ animated Gojo
  socials: { discord?: string; instagram?: string; github?: string; email?: string };
  audio_enabled: boolean;      // default false
  master_volume: number;       // 0..1
}


export interface CommunityMember {
  id: string;
  community_id: string;
  display_name: string;
  username: string;
  discord_id: string;
  role: string;
  bio: string;
  image_path: string | null;   // gated -> resolveDbAsset
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}
