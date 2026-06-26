import { IntroDomain } from "@/components/sections/intro/IntroDomain";
import { DashboardDomain } from "@/components/sections/dashboard/DashboardDomain";
import { StatisticsDomain } from "@/components/sections/statistics/StatisticsDomain";
import { CommunitiesDomain } from "@/components/sections/communities/CommunitiesDomain";
import { SkillsDomain } from "@/components/sections/skills/SkillsDomain";
import { LeadershipDomain } from "@/components/sections/leadership/LeadershipDomain";
import { ProjectsDomain } from "@/components/sections/projects/ProjectsDomain";
import { MahoragaDomain } from "@/components/sections/mahoraga/MahoragaDomain";
import { ContactDomain } from "@/components/sections/contact/ContactDomain";
import { GalleryDomain } from "@/components/sections/gallery/GalleryDomain";

/**
 * The full narrative, rendered in canonical section order (config/sections.ts).
 * Each section is a "realm" that updates the current domain as it scrolls in.
 */
export default function ExperiencePage() {
  return (
    <main className="relative w-full">
      <IntroDomain />
      <DashboardDomain />
      <StatisticsDomain />
      <CommunitiesDomain />
      <SkillsDomain />
      <LeadershipDomain />
      <ProjectsDomain />
      <MahoragaDomain />
      <ContactDomain />
      <GalleryDomain />
    </main>
  );
}
