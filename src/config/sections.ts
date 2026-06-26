import type { SectionKey } from "@/types";

/** Canonical section order + Navigator metadata. Realm Engine renders in this order. */
export interface SectionMeta {
  key: SectionKey;
  label: string;
  inNavigator: boolean; // intro & easter-eggs excluded from nav
  domainKey: string;    // links to domain_lore.key
}

export const SECTIONS: SectionMeta[] = [
  { key: "intro",        label: "Domain Expansion", inNavigator: false, domainKey: "infinite_void" },
  { key: "dashboard",    label: "Dashboard",        inNavigator: true,  domainKey: "six_eyes" },
  { key: "statistics",   label: "Statistics",       inNavigator: true,  domainKey: "six_eyes" },
  { key: "communities",  label: "Communities",      inNavigator: true,  domainKey: "six_eyes" },
  { key: "skills",       label: "Skills",           inNavigator: true,  domainKey: "six_eyes" },
  { key: "leadership",   label: "Leadership",       inNavigator: true,  domainKey: "six_eyes" },
  { key: "projects",     label: "Hollow Purple",    inNavigator: true,  domainKey: "hollow_purple" },
  { key: "mahoraga",     label: "Mahoraga",         inNavigator: true,  domainKey: "mahoraga" },
  { key: "contact",      label: "Contact",          inNavigator: true,  domainKey: "domain_clash" },
  { key: "gallery",      label: "Gallery",          inNavigator: true,  domainKey: "six_eyes" }
];

export const NAV_SECTIONS = SECTIONS.filter((s) => s.inNavigator);
