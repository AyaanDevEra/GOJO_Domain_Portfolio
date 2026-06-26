import { createBrowserClient } from "@supabase/ssr";

/** Browser (anon) client — read-only via RLS for the visitor realm. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
