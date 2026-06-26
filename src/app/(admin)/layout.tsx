import Link from "next/link";
import "../globals.css";

/**
 * Admin realm shell — CLEAN, FAST, utilitarian. NO 3D/animation/audio libs.
 * Completely isolated from the visitor experience.
 */
const NAV = [
  ["Overview", "/admin"], ["Domains", "/admin/domains"], ["Characters", "/admin/characters"],
  ["Audio", "/admin/audio"], ["Achievements", "/admin/achievements"], ["Statistics", "/admin/statistics"],
  ["Projects", "/admin/projects"], ["Skills", "/admin/skills"], ["Communities", "/admin/communities"], ["Members", "/admin/community-members"],
  ["Gallery", "/admin/gallery"], ["Announcements", "/admin/announcements"], ["Settings", "/admin/settings"]
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <aside className="w-56 shrink-0 border-r border-neutral-800 p-4">
        <div className="mb-6 text-sm font-semibold uppercase tracking-wider text-neutral-400">Domain Admin</div>
        <nav className="flex flex-col gap-1">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="rounded px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
