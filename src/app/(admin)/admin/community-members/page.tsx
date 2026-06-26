"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Community, CommunityMember } from "@/types";
import { listMembers, addMember, updateMember, deleteMember, swapOrder, uploadMemberImage } from "@/lib/data/admin";

const EMPTY = { display_name: "", username: "", discord_id: "", role: "", bio: "" };

export default function CommunityMembersManager() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [communityId, setCommunityId] = useState<string>("");
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // load communities for the selector
  useEffect(() => {
    (async () => {
      const sb = createClient();
      const { data } = await sb.from("communities").select("*").order("sort_order", { ascending: true });
      setCommunities((data ?? []) as Community[]);
      if (data && data[0]) setCommunityId(data[0].id);
    })();
  }, []);

  const refresh = async (id = communityId) => { if (id) setMembers(await listMembers(id)); };
  useEffect(() => { if (communityId) refresh(communityId); /* eslint-disable-next-line */ }, [communityId]);

  const resetForm = () => { setForm(EMPTY); setEditingId(null); setFile(null); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityId) return;
    setBusy(true); setMsg(null);
    try {
      let image_path: string | undefined;
      if (file) image_path = await uploadMemberImage(file);
      if (editingId) {
        await updateMember(editingId, { ...form, ...(image_path ? { image_path } : {}) });
      } else {
        await addMember({ ...form, community_id: communityId, image_path: image_path ?? null,
          sort_order: members.length });
      }
      resetForm(); await refresh();
      setMsg("Saved.");
    } catch (err: any) { setMsg(err.message ?? "Error"); }
    finally { setBusy(false); }
  };

  const edit = (m: CommunityMember) => {
    setEditingId(m.id);
    setForm({ display_name: m.display_name, username: m.username, discord_id: m.discord_id, role: m.role, bio: m.bio });
  };

  const remove = async (id: string) => { await deleteMember(id); await refresh(); };
  const move = async (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= members.length) return;
    await swapOrder(members[i], members[j]); await refresh();
  };

  const field = "w-full rounded bg-neutral-900 px-3 py-2 text-sm";

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Community Members</h1>
      <p className="mb-6 text-sm text-neutral-400">Fully data-driven member showcase. Add, edit, remove, upload images, and reorder.</p>

      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm text-neutral-400">Community</label>
        <select value={communityId} onChange={(e) => setCommunityId(e.target.value)} className={field + " max-w-xs"}>
          {communities.length === 0 && <option value="">(connect Supabase to load)</option>}
          {communities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        {/* form */}
        <form onSubmit={submit} className="space-y-3 rounded-xl border border-neutral-800 p-4">
          <h2 className="text-sm font-semibold">{editingId ? "Edit member" : "Add member"}</h2>
          <input className={field} placeholder="Display Name" required
            value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
          <input className={field} placeholder="Username"
            value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input className={field} placeholder="Discord ID"
            value={form.discord_id} onChange={(e) => setForm({ ...form, discord_id: e.target.value })} />
          <input className={field} placeholder="Role"
            value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <textarea className={field} placeholder="Bio" rows={3}
            value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-xs text-neutral-400" />
          <div className="flex gap-2">
            <button disabled={busy} className="rounded bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50">
              {busy ? "Saving…" : editingId ? "Update" : "Add"}
            </button>
            {editingId && <button type="button" onClick={resetForm} className="rounded border border-neutral-700 px-3 py-2 text-sm">Cancel</button>}
          </div>
          {msg && <p className="text-xs text-neutral-400">{msg}</p>}
        </form>

        {/* list */}
        <div className="rounded-xl border border-neutral-800">
          {members.length === 0 ? (
            <p className="p-8 text-center text-sm text-neutral-500">No members yet (or Supabase not connected).</p>
          ) : (
            <ul className="divide-y divide-neutral-800">
              {members.map((m, i) => (
                <li key={m.id} className="flex items-center gap-3 p-3">
                  <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-neutral-800 text-xs">
                    {m.image_path ? <img src={m.image_path} alt="" className="h-full w-full object-cover" /> : m.display_name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.display_name} <span className="text-neutral-500">· {m.role}</span></p>
                    <p className="truncate text-xs text-neutral-500">@{m.username} · {m.discord_id}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <button onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-neutral-800">↑</button>
                    <button onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-neutral-800">↓</button>
                    <button onClick={() => edit(m)} className="rounded px-2 py-1 hover:bg-neutral-800">Edit</button>
                    <button onClick={() => remove(m.id)} className="rounded px-2 py-1 text-red-400 hover:bg-neutral-800">Del</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
