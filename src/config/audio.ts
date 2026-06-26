/** Named audio presets / keys. File paths resolve via the Asset Registry + audio_assets table. */
export const AUDIO_PRESETS = {
  infinite_void_ambient: { category: "domain_theme", loop: true,  volume: 0.4 },
  six_eyes_ambient:      { category: "domain_theme", loop: true,  volume: 0.35 },
  hollow_purple_theme:   { category: "domain_theme", loop: true,  volume: 0.45 },
  mahoraga_theme:        { category: "domain_theme", loop: true,  volume: 0.4 },
  clash_theme:           { category: "domain_theme", loop: true,  volume: 0.45 },
  ui_click:              { category: "ui",     loop: false, volume: 0.5 },
  ui_hover:              { category: "hover",  loop: false, volume: 0.3 },
  domain_expansion_sfx:  { category: "domain_expansion", loop: false, volume: 0.8 },
  hollow_purple_sfx:     { category: "hollow_purple", loop: false, volume: 0.8 },
  notification:          { category: "notification", loop: false, volume: 0.6 }
} as const;

export type AudioPresetKey = keyof typeof AUDIO_PRESETS;
export const AUDIO_PRESET_KEYS = Object.keys(AUDIO_PRESETS) as AudioPresetKey[];
