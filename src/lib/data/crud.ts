import { createClient } from "@/lib/supabase/client";

/** Generic Supabase CRUD used by the Admin ResourceManager. */
export async function listRows(table: string, hasOrder?: boolean) {
  const sb = createClient();
  const q = sb.from(table).select("*");
  const { data, error } = await (hasOrder
    ? q.order("sort_order", { ascending: true })
    : q.order("created_at", { ascending: false }));
  if (error) throw error;
  return (data ?? []) as Record<string, any>[];
}

export async function insertRow(table: string, row: Record<string, any>) {
  const sb = createClient();
  const { error } = await sb.from(table).insert(row);
  if (error) throw error;
}

export async function updateRow(table: string, id: string, patch: Record<string, any>) {
  const sb = createClient();
  const { error } = await sb.from(table).update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteRow(table: string, id: string) {
  const sb = createClient();
  const { error } = await sb.from(table).delete().eq("id", id);
  if (error) throw error;
}

export async function uploadAsset(bucket: string, file: File): Promise<string> {
  const sb = createClient();
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
  const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function fetchOptions(table: string, valueKey: string, labelKey: string) {
  const sb = createClient();
  const { data } = await sb.from(table).select(`${valueKey},${labelKey}`);
  return (data ?? []).map((r: any) => ({ value: r[valueKey], label: r[labelKey] }));
}

export async function swapOrder(table: string, a: any, b: any) {
  await Promise.all([
    updateRow(table, a.id, { sort_order: b.sort_order }),
    updateRow(table, b.id, { sort_order: a.sort_order })
  ]);
}
