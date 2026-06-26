import { ANIMATION_PRESET_KEYS } from "@/config/animations";
import { AUDIO_PRESET_KEYS } from "@/config/audio";
import { SECTIONS } from "@/config/sections";

export type FieldType =
  | "text" | "textarea" | "number" | "boolean" | "select" | "image" | "tags" | "json" | "date";

export interface FieldOption { value: string; label: string; }
export interface Field {
  name: string;            // DB column
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];                       // static select options
  optionsFrom?: { table: string; value: string; label: string }; // dynamic select
}
export interface ResourceConfig {
  table: string;
  label: string;
  singular: string;
  bucket?: string;
  hasOrder?: boolean;
  listColumns: { name: string; label: string }[];
  fields: Field[];
}

const sectionOpts: FieldOption[] = SECTIONS.map((s) => ({ value: s.key, label: s.label }));
const presetAnim: FieldOption[] = ANIMATION_PRESET_KEYS.map((k) => ({ value: k, label: k }));
const presetAudio: FieldOption[] = [{ value: "", label: "(none)" }, ...AUDIO_PRESET_KEYS.map((k) => ({ value: k, label: k }))];
const statusOpts: FieldOption[] = ["live", "in_progress", "archived", "planned"].map((v) => ({ value: v, label: v }));

export const RESOURCES: Record<string, ResourceConfig> = {
  skills: {
    table: "skills", label: "Skills", singular: "Skill", bucket: "icons", hasOrder: true,
    listColumns: [{ name: "name", label: "Name" }, { name: "percentage", label: "%" }, { name: "category", label: "Category" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "percentage", label: "Percentage (0-100)", type: "number" },
      { name: "category", label: "Category", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon_path", label: "Icon", type: "image" }
    ]
  },
  communities: {
    table: "communities", label: "Communities", singular: "Community", bucket: "banners", hasOrder: true,
    listColumns: [{ name: "name", label: "Name" }, { name: "role", label: "Role" }, { name: "member_count", label: "Members" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "member_count", label: "Member Count", type: "number" },
      { name: "discord_url", label: "Discord URL", type: "text" },
      { name: "banner_path", label: "Banner", type: "image" }
    ]
  },
  achievements: {
    table: "achievements", label: "Achievements", singular: "Achievement", bucket: "achievements", hasOrder: true,
    listColumns: [{ name: "title", label: "Title" }, { name: "category", label: "Category" }, { name: "priority", label: "Priority" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category", label: "Category", type: "text" },
      { name: "priority", label: "Priority", type: "number" },
      { name: "date_earned", label: "Date Earned", type: "date" },
      { name: "is_showcase", label: "Showcase", type: "boolean" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "related_section", label: "Related Section", type: "select", options: sectionOpts },
      { name: "image_path", label: "Image", type: "image" }
    ]
  },
  projects: {
    table: "projects", label: "Projects", singular: "Project", bucket: "projects", hasOrder: true,
    listColumns: [{ name: "title", label: "Title" }, { name: "status", label: "Status" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category_id", label: "Category", type: "select", optionsFrom: { table: "project_categories", value: "id", label: "name" } },
      { name: "status", label: "Status", type: "select", options: statusOpts },
      { name: "technologies", label: "Technologies (comma-separated)", type: "tags" },
      { name: "external_links", label: "External Links (JSON array)", type: "json" },
      { name: "is_featured", label: "Featured", type: "boolean" }
    ]
  },
  statistics: {
    table: "statistics", label: "Statistics", singular: "Statistic", hasOrder: true,
    listColumns: [{ name: "label", label: "Label" }, { name: "value", label: "Value" }],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "number" },
      { name: "unit", label: "Unit", type: "text" },
      { name: "display_format", label: "Display Format", type: "text", placeholder: "{value}+ or {k}K+" },
      { name: "icon", label: "Icon", type: "text" },
      { name: "source", label: "Source", type: "select", options: [{ value: "manual", label: "manual" }, { value: "derived", label: "derived" }] },
      { name: "derived_key", label: "Derived Key", type: "text" },
      { name: "is_active", label: "Active", type: "boolean" }
    ]
  },
  gallery: {
    table: "gallery_items", label: "Gallery", singular: "Gallery Item", bucket: "gallery", hasOrder: true,
    listColumns: [{ name: "title", label: "Title" }, { name: "category", label: "Category" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "image_path", label: "Image / Video", type: "image" },
      { name: "is_animated", label: "Animated (video)", type: "boolean" }
    ]
  },
  characters: {
    table: "characters", label: "Characters", singular: "Character", bucket: "characters", hasOrder: true,
    listColumns: [{ name: "name", label: "Name" }, { name: "role", label: "Role" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "associated_section", label: "Associated Section", type: "select", options: sectionOpts },
      { name: "primary_image_path", label: "Primary Image", type: "image" },
      { name: "animation_presets", label: "Animation Presets (comma-separated)", type: "tags" },
      { name: "audio_refs", label: "Audio Refs (comma-separated)", type: "tags" }
    ]
  },
  domains: {
    table: "domain_lore", label: "Domain Lore", singular: "Domain", hasOrder: true,
    listColumns: [{ name: "name", label: "Name" }, { name: "section_key", label: "Section" }],
    fields: [
      { name: "key", label: "Key (unique)", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Lore", type: "textarea" },
      { name: "theme", label: "Theme", type: "text" },
      { name: "visual_identity", label: "Visual Identity", type: "text" },
      { name: "animation_preset", label: "Animation Preset", type: "select", options: presetAnim },
      { name: "audio_preset", label: "Audio Preset", type: "select", options: presetAudio },
      { name: "section_key", label: "Section", type: "select", options: sectionOpts },
      { name: "accent_colors", label: "Accent Colors (JSON)", type: "json", placeholder: '{"primary":"72 177 255","secondary":"10 18 40","glow":"143 212 255"}' },
      { name: "background_assets", label: "Background Assets (JSON array)", type: "json" }
    ]
  },
  audio: {
    table: "audio_assets", label: "Audio", singular: "Audio Asset", bucket: "audio",
    listColumns: [{ name: "name", label: "Name" }, { name: "category", label: "Category" }, { name: "loop", label: "Loop" }],
    fields: [
      { name: "key", label: "Key (unique)", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: [
        { value: "ambience", label: "ambience" }, { value: "domain_theme", label: "domain_theme" },
        { value: "ui", label: "ui" }, { value: "hover", label: "hover" },
        { value: "domain_expansion", label: "domain_expansion" }, { value: "hollow_purple", label: "hollow_purple" },
        { value: "notification", label: "notification" } ] },
      { name: "file_path", label: "Audio File", type: "image" },
      { name: "default_volume", label: "Default Volume (0-1)", type: "number" },
      { name: "loop", label: "Loop", type: "boolean" },
      { name: "is_active", label: "Active", type: "boolean" }
    ]
  },
  announcements: {
    table: "announcements", label: "Announcements", singular: "Announcement",
    listColumns: [{ name: "title", label: "Title" }, { name: "is_active", label: "Active" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Body", type: "textarea" },
      { name: "is_active", label: "Active", type: "boolean" }
    ]
  }
};
