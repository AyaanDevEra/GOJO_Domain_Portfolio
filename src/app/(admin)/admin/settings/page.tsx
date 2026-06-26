"use client";
import { useEffect, useState } from "react";
import { getSettingsRow, upsertSettings } from "@/lib/data/admin";
import { FALLBACK_SETTINGS } from "@/lib/data/fallback";
import type { SiteSettings } from "@/types";

/**
 * Site Settings — singleton editor (one row). Drives the visitor display name,
 * username, real name, social links, and audio defaults. Database-driven.
 */
export default function SettingsPage() {
  const field = "w-full rounded bg-neutral-900 px-3 py-2 text-sm border border-neutral-800 focus:border-blue-500 outline-none";
  const [form, setForm] = useState<SiteSettings>(FALLBACK_SETTINGS);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const row = await getSettingsRow();
        if (row) setForm({ ...FALLBACK_SETTINGS, ...row, socials: { ...FALLBACK_SETTINGS.socials, ...(row.socials ?? {}) } });
      } catch (e: any) {
        setMsg(e.message ?? "Load error (connect Supabase)");
      }
    })();
  }, []);

  const set = (k: keyof SiteSettings, v: any) => setForm((p) => ({ ...p, [k]: v }));
  const setSocial = (k: string, v: string) => setForm((p) => ({ ...p, socials: { ...p.socials, [k]: v } }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try {
      await upsertSettings({
        display_name: form.display_name,
        username: form.username,
        real_name: form.real_name,
        hover_image_path: form.hover_image_path || null,
        socials: form.socials,
        audio_enabled: !!form.audio_enabled,
        master_volume: Number(form.master_volume)
      });
      setMsg("Saved.");
    } catch (e: any) {
      setMsg(e.message ?? "Error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Site Settings</h1>
      <p className="mb-6 text-sm text-neutral-400">Singleton configuration for the visitor experience. Database-driven.</p>

      <form onSubmit={submit} className="grid max-w-2xl gap-6">
        <section className="space-y-3 rounded-xl border border-neutral-800 p-4">
          <h2 className="text-sm font-semibold">Identity</h2>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Display Name *</label>
            <input className={field} value={form.display_name} onChange={(e) => set("display_name", e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Username *</label>
            <input className={field} value={form.username} onChange={(e) => set("username", e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Real Name</label>
            <input className={field} value={form.real_name} onChange={(e) => set("real_name", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Hover Image Path (gated asset URL / storage path)</label>
            <input className={field} value={form.hover_image_path ?? ""} onChange={(e) => set("hover_image_path", e.target.value)} placeholder="/assets/... or storage URL" />
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-neutral-800 p-4">
          <h2 className="text-sm font-semibold">Social Links</h2>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Discord URL</label>
            <input className={field} value={form.socials.discord ?? ""} onChange={(e) => setSocial("discord", e.target.value)} placeholder="https://discord.gg/…" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Instagram URL</label>
            <input className={field} value={form.socials.instagram ?? ""} onChange={(e) => setSocial("instagram", e.target.value)} placeholder="https://instagram.com/…" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">GitHub URL</label>
            <input className={field} value={form.socials.github ?? ""} onChange={(e) => setSocial("github", e.target.value)} placeholder="https://github.com/…" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Email</label>
            <input className={field} value={form.socials.email ?? ""} onChange={(e) => setSocial("email", e.target.value)} placeholder="you@example.com" />
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-neutral-800 p-4">
          <h2 className="text-sm font-semibold">Audio</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.audio_enabled} onChange={(e) => set("audio_enabled", e.target.checked)} /> Audio enabled by default
          </label>
          <div className="space-y-1">
            <label className="block text-xs text-neutral-400">Master Volume (0–1)</label>
            <input type="number" min={0} max={1} step={0.05} className={field} value={form.master_volume} onChange={(e) => set("master_volume", e.target.value)} />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button disabled={busy} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50">
            {busy ? "Saving…" : "Save Settings"}
          </button>
          {msg && <p className="text-xs text-neutral-400">{msg}</p>}
        </div>
      </form>
    </div>
  );
}
