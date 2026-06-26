/** Global, non-realm tokens. Realm accents are applied at runtime via CSS vars. */
export const VOID_BG = "#05060a";

/** Hard-coded fallback accents per realm key (mirrors DB seed; used if DB is empty). */
export const REALM_FALLBACK_ACCENTS: Record<string, { primary: string; secondary: string; glow: string }> = {
  infinite_void: { primary: "72 177 255", secondary: "20 30 60", glow: "143 212 255" },
  six_eyes:      { primary: "72 177 255", secondary: "10 18 40", glow: "143 212 255" },
  hollow_purple: { primary: "123 47 247", secondary: "40 12 80", glow: "181 139 255" },
  mahoraga:      { primary: "180 180 200", secondary: "30 30 40", glow: "220 220 235" },
  domain_clash:  { primary: "226 59 59", secondary: "72 30 30", glow: "255 122 122" }
};
