import type { Config } from "tailwindcss";

/**
 * Domain Portfolio design tokens.
 * Dark-mode-locked. Each realm exposes accent colors via CSS variables
 * (set at runtime by the Realm Engine), referenced here as `rgb(var(--..))`.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05060a",
          950: "#05060a",
          900: "#0a0c14",
          800: "#11141f"
        },
        sixeyes: { DEFAULT: "#48b1ff", glow: "#8fd4ff" },
        hollow: { DEFAULT: "#7b2ff7", glow: "#b58bff" },
        sukuna: { DEFAULT: "#e23b3b", glow: "#ff7a7a" },
        gold: { DEFAULT: "#d4af37", glow: "#f3d98b" },
        // Realm-driven accents (set per domain at runtime)
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
        glow: "rgb(var(--glow) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { opacity: "0.55", filter: "blur(8px)" },
          "50%": { opacity: "1", filter: "blur(14px)" }
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        kenburns: {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.08) translate(-1.5%, -1%)" }
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "spin-slow": "spinSlow 30s linear infinite",
        "kenburns": "kenburns 18s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
