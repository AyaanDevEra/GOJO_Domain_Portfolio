"use client";
import { useEffect, useMemo, useState } from "react";
import { RESOURCES, type Field, type FieldOption } from "@/config/adminResources";
import { listRows, insertRow, updateRow, deleteRow, uploadAsset, fetchOptions, swapOrder } from "@/lib/data/crud";

/** Config-driven admin CRUD UI. One component powers every resource. */
export function ResourceManager({ resource }: { resource: keyof typeof RESOURCES }) {
  const cfg = RESOURCES[resource];
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [dynOpts, setDynOpts] = useState<Record<string, FieldOption[]>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const field = "w-full rounded bg-neutral-900 px-3 py-2 text-sm border border-neutral-800 focus:border-blue-500 outline-none";

  const refresh = async () => {
    try { setRows(await listRows(cfg.table, cfg.hasOrder)); }
    catch (e: any) { setMsg(e.message ?? "Load error (connect Supabase)"); }
  };

  useEffect(() => {
    refresh();
    // load dynamic select options
    cfg.fields.filter((f) => f.optionsFrom).forEach(async (f) => {
      try {
        const o = await fetchOptions(f.optionsFrom!.table, f.optionsFrom!.value, f.optionsFrom!.label);
        setDynOpts((p) => ({ ...p, [f.name]: o }));
      } catch { /* ignore */ }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const reset = () => { setForm({}); setEditingId(null); setFiles({}); };

  const toFormValue = (f: Field, v: any) => {
    if (v == null) return "";
    if (f.type === "tags") return Array.isArray(v) ? v.join(", ") : v;
    if (f.type === "json") return typeof v === "string" ? v : JSON.stringify(v, null, 2);
    return v;
  };

  const startEdit = (row: Record<string, any>) => {
    setEditingId(row.id);
    const next: Record<string, any> = {};
    cfg.fields.forEach((f) => { next[f.name] = toFormValue(f, row[f.name]); });
    setForm(next);
  };

  const buildPayload = async () => {
    const payload: Record<string, any> = {};
    for (const f of cfg.fields) {
      if (f.type === "image") {
        const file = files[f.name];
        if (file) payload[f.name] = await uploadAsset(cfg.bucket ?? "uploads", file);
        else if (editingId == null && form[f.name]) payload[f.name] = form[f.name];
        continue;
      }
      let v = form[f.name];
      if (v === undefined || v === "") { if (f.type === "boolean") v = false; else continue; }
      if (f.type === "number") v = Number(v);
      else if (f.type === "boolean") v = !!v;
      else if (f.type === "tags") v = String(v).split(",").map((s) => s.trim()).filter(Boolean);
      else if (f.type === "json") { try { v = JSON.parse(v); } catch { throw new Error(`Invalid JSON in "${f.label}"`); } }
      payload[f.name] = v;
    }
    return payload;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try {
      const payload = await buildPayload();
      if (editingId) await updateRow(cfg.table, editingId, payload);
      else { if (cfg.hasOrder) payload.sort_order = rows.length; await insertRow(cfg.table, payload); }
      reset(); await refresh(); setMsg("Saved.");
    } catch (e: any) { setMsg(e.message ?? "Error"); }
    finally { setBusy(false); }
  };

  const remove = async (id: string) => { try { await deleteRow(cfg.table, id); await refresh(); } catch (e: any) { setMsg(e.message); } };
  const move = async (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= rows.length) return;
    try { await swapOrder(cfg.table, rows[i], rows[j]); await refresh(); } catch (e: any) { setMsg(e.message); }
  };

  const renderField = (f: Field) => {
    const val = form[f.name] ?? (f.type === "boolean" ? false : "");
    const set = (v: any) => setForm((p) => ({ ...p, [f.name]: v }));
    if (f.type === "textarea") return <textarea className={field} rows={3} placeholder={f.placeholder} value={val} onChange={(e) => set(e.target.value)} />;
    if (f.type === "json") return <textarea className={field + " font-mono text-xs"} rows={4} placeholder={f.placeholder} value={val} onChange={(e) => set(e.target.value)} />;
    if (f.type === "boolean") return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!val} onChange={(e) => set(e.target.checked)} /> {f.label}</label>;
    if (f.type === "number") return <input type="number" className={field} placeholder={f.placeholder} value={val} onChange={(e) => set(e.target.value)} />;
    if (f.type === "date") return <input type="date" className={field} value={val} onChange={(e) => set(e.target.value)} />;
    if (f.type === "image") return <input type="file" accept="image/*,video/*,audio/*" className="text-xs text-neutral-400" onChange={(e) => setFiles((p) => ({ ...p, [f.name]: e.target.files?.[0] ?? null }))} />;
    if (f.type === "select") {
      const opts = f.options ?? dynOpts[f.name] ?? [];
      return <select className={field} value={val} onChange={(e) => set(e.target.value)}><option value="">(select)</option>{opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
    }
    return <input className={field} placeholder={f.placeholder} value={val} onChange={(e) => set(e.target.value)} />;
  };

  const cell = (row: any, name: string) => {
    const v = row[name];
    if (typeof v === "boolean") return v ? "✓" : "–";
    if (typeof v === "number") return v.toLocaleString();
    return String(v ?? "");
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">{cfg.label}</h1>
      <p className="mb-6 text-sm text-neutral-400">Add, edit, remove{cfg.hasOrder ? ", reorder" : ""}{cfg.bucket ? ", upload images" : ""}. Database-driven.</p>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <form onSubmit={submit} className="space-y-3 rounded-xl border border-neutral-800 p-4">
          <h2 className="text-sm font-semibold">{editingId ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}</h2>
          {cfg.fields.map((f) => (
            <div key={f.name} className="space-y-1">
              {f.type !== "boolean" && <label className="block text-xs text-neutral-400">{f.label}{f.required && " *"}</label>}
              {renderField(f)}
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button disabled={busy} className="rounded bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50">
              {busy ? "Saving…" : editingId ? "Update" : "Add"}
            </button>
            {editingId && <button type="button" onClick={reset} className="rounded border border-neutral-700 px-3 py-2 text-sm">Cancel</button>}
          </div>
          {msg && <p className="text-xs text-neutral-400">{msg}</p>}
        </form>

        <div className="rounded-xl border border-neutral-800">
          {rows.length === 0 ? (
            <p className="p-8 text-center text-sm text-neutral-500">No records (or Supabase not connected).</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-800 text-left text-xs uppercase text-neutral-500">
                <tr>{cfg.listColumns.map((c) => <th key={c.name} className="p-3">{c.label}</th>)}<th className="p-3 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className="border-b border-neutral-900">
                    {cfg.listColumns.map((c) => <td key={c.name} className="p-3">{cell(row, c.name)}</td>)}
                    <td className="p-3">
                      <div className="flex justify-end gap-1 text-xs">
                        {cfg.hasOrder && <><button onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-neutral-800">↑</button><button onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-neutral-800">↓</button></>}
                        <button onClick={() => startEdit(row)} className="rounded px-2 py-1 hover:bg-neutral-800">Edit</button>
                        <button onClick={() => remove(row.id)} className="rounded px-2 py-1 text-red-400 hover:bg-neutral-800">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
