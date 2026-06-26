import Link from "next/link";

const ENTITIES: [string, string][] = [
  ["Domain Lore", "/admin/domains"], ["Characters", "/admin/characters"],
  ["Skills", "/admin/skills"], ["Communities", "/admin/communities"],
  ["Members", "/admin/community-members"], ["Achievements", "/admin/achievements"],
  ["Projects", "/admin/projects"], ["Statistics", "/admin/statistics"],
  ["Gallery", "/admin/gallery"], ["Announcements", "/admin/announcements"],
  ["Settings", "/admin/settings"]
];

export default function AdminOverview() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
      <p className="mb-6 text-sm text-neutral-400">All curated content for the Domain Expansion experience. Full CRUD enabled.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ENTITIES.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-lg border border-neutral-800 p-4 transition hover:border-blue-600 hover:bg-neutral-900">
            <div className="text-sm font-medium">{label}</div>
            <div className="mt-1 text-xs text-green-500">CRUD ready</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
