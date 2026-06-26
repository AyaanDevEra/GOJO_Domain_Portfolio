/**
 * Named animation presets referenced by domain_lore.animation_preset and
 * characters.animation_presets. Components map a key -> concrete behavior.
 * Registering presets here keeps the DB clean and the Admin dropdowns valid.
 */
export const ANIMATION_PRESETS = {
  void_collapse:   { label: "Void Collapse", scene: "BlackHole", intensity: 1.0 },
  six_eyes_pulse:  { label: "Six Eyes Pulse", scene: null, intensity: 0.6 },
  hollow_charge:   { label: "Hollow Purple Charge", scene: "HollowPurpleOrb", intensity: 1.0 },
  mahoraga_wheel:  { label: "Mahoraga Wheel", scene: "MahoragaWheel", intensity: 0.8 },
  clash_impact:    { label: "Domain Clash Impact", scene: null, intensity: 1.0 },
  idle_float:      { label: "Idle Float", scene: null, intensity: 0.3 },
  fade_in:         { label: "Fade In", scene: null, intensity: 0.2 }
} as const;

export type AnimationPresetKey = keyof typeof ANIMATION_PRESETS;
export const ANIMATION_PRESET_KEYS = Object.keys(ANIMATION_PRESETS) as AnimationPresetKey[];

/** Shared easing/timing for a consistent cinematic feel. */
export const EASING = { soft: [0.22, 1, 0.36, 1] as const, sharp: [0.7, 0, 0.3, 1] as const };
export const DURATION = { fast: 0.35, base: 0.6, slow: 1.1, intro: 2.4 };
