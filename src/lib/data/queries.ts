import { createClient } from "@/lib/supabase/client";
import type {
  DomainLore, Character, AudioAsset, Achievement, Project, ProjectCategory,
  Statistic, Skill, Community, GalleryItem, Announcement, SiteSettings, CommunityMember
} from "@/types";

/**
 * Read-only data access for the Visitor realm. All functions are RLS-safe
 * (anon SELECT). They degrade gracefully to [] / null if the DB is unconfigured
 * so the foundation runs before Supabase is provisioned.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

const ordered = (q: any) => q.order("sort_order", { ascending: true });

export const getDomains = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("domain_lore").select("*").eq("is_active", true));
  return (data ?? []) as DomainLore[];
}, []);

export const getCharacters = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("characters").select("*").eq("is_active", true));
  return (data ?? []) as Character[];
}, []);

export const getAudioAssets = () => safe(async () => {
  const sb = createClient();
  const { data } = await sb.from("audio_assets").select("*").eq("is_active", true);
  return (data ?? []) as AudioAsset[];
}, []);

export const getAchievements = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("achievements").select("*"));
  return (data ?? []) as Achievement[];
}, []);

export const getProjects = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("projects").select("*"));
  return (data ?? []) as Project[];
}, []);

export const getProjectCategories = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("project_categories").select("*"));
  return (data ?? []) as ProjectCategory[];
}, []);

export const getStatistics = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("statistics").select("*").eq("is_active", true));
  return (data ?? []) as Statistic[];
}, []);

export const getSkills = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("skills").select("*"));
  return (data ?? []) as Skill[];
}, []);

export const getCommunities = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("communities").select("*"));
  return (data ?? []) as Community[];
}, []);

export const getGallery = () => safe(async () => {
  const sb = createClient();
  const { data } = await ordered(sb.from("gallery_items").select("*"));
  return (data ?? []) as GalleryItem[];
}, []);

export const getAnnouncements = () => safe(async () => {
  const sb = createClient();
  const { data } = await sb.from("announcements").select("*").eq("is_active", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Announcement[];
}, []);

export const getSiteSettings = () => safe(async () => {
  const sb = createClient();
  const { data } = await sb.from("site_settings").select("*").limit(1).single();
  return (data ?? null) as SiteSettings | null;
}, null);


export const getCommunityMembers = (communityId: string) => safe(async () => {
  const sb = createClient();
  const { data } = await sb.from("community_members").select("*")
    .eq("community_id", communityId).order("sort_order", { ascending: true });
  return (data ?? []) as CommunityMember[];
}, []);
