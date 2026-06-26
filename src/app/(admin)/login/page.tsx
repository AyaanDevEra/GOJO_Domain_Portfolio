"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/** Admin login (Supabase Auth — email/password). */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/admin");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-neutral-950 text-neutral-100">
      <form onSubmit={submit} className="w-80 space-y-4 rounded-xl border border-neutral-800 p-6">
        <h1 className="text-lg font-semibold">Admin Access</h1>
        <input className="w-full rounded bg-neutral-900 px-3 py-2 text-sm" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <input className="w-full rounded bg-neutral-900 px-3 py-2 text-sm" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
