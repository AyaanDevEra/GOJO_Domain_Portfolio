import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Guards /admin/* routes. Unauthenticated users are redirected to /login.
 * Defense-in-depth: RLS still enforces admin-only writes at the DB layer.
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return res;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (toSet) => toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
