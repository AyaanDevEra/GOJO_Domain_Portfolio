import type { Statistic } from "@/types";

/** Render a statistic using its display_format template, e.g. "{value}K+". */
export function formatStat(s: Pick<Statistic, "value" | "display_format" | "unit">, animatedValue?: number) {
  const v = animatedValue ?? s.value;
  const compact = v >= 1000 ? `${Math.round(v / 1000)}` : `${Math.round(v)}`;
  return s.display_format
    .replace("{value}", `${Math.round(v)}`)
    .replace("{k}", compact)
    .concat(s.unit ? ` ${s.unit}` : "");
}
