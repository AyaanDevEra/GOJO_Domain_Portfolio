import { createClient } from "@/lib/supabase/client";
import type { CommunityMember, SiteSettings } from "@/types";

/** Admin-side mutations (RLS requires authenticated admin). Storage bucket: "members". */
const MEMBERS_BUCKET = "members";

export async function uploadMemberImage(file: File): Promise<string> {
  const sb = createClient();
  const path = `members/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
  const { error } = await sb.storage.from(MEMBERS_BUCKET).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = sb.storage.from(MEMBERS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function listMembers(communityId: string): Promise<CommunityMember[]> {
  const sb = createClient();
  const { data, error } = await sb.from("community_members").select("*")
    .eq("community_id", communityId).order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CommunityMember[];
}

export async function addMember(m: Partial<CommunityMember>) {
  const sb = createClient();
  const { error } = await sb.from("community_members").insert(m);
  if (error) throw error;
}

export async function updateMember(id: string, patch: Partial<CommunityMember>) {
  const sb = createClient();
  const { error } = await sb.from("community_members").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteMember(id: string) {
  const sb = createClient();
  const { error } = await sb.from("community_members").delete().eq("id", id);
  if (error) throw error;
}

/** Reorder by swapping sort_order with the adjacent member. */
export async function swapOrder(a: CommunityMember, b: CommunityMember) {
  await Promise.all([
    updateMember(a.id, { sort_order: b.sort_order }),
    updateMember(b.id, { sort_order: a.sort_order })
  ]);
}


/** Site Settings is a singleton row. Read the existing row (or null). */
export async function getSettingsRow(): Promise<SiteSettings | null> {
  const sb = createClient();
  const { data, error } = await sb.from("site_settings").select("*").limit(1).maybeSingle();
  if (error) throw error;
  return (data ?? null) as SiteSettings | null;
}

/** Upsert the singleton Site Settings row: update if it exists, else insert. */
export async function upsertSettings(patch: Partial<SiteSettings>): Promise<void> {
  const sb = createClient();
  const existing = await getSettingsRow();
  if (existing?.id) {
    const { id, ...rest } = patch as Record<string, any>;
    const { error } = await sb.from("site_settings").update(rest).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { id, ...rest } = patch as Record<string, any>;
    const { error } = await sb.from("site_settings").insert(rest);
    if (error) throw error;
  }
}
