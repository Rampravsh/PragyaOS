/**
 * @deprecated — Tailwind v3 API. Do NOT use in new code.
 *
 * This preset used the Tailwind v3 JavaScript configuration API
 * ({ theme: { extend: {} }, plugins: [] }) which is incompatible
 * with Tailwind v4's CSS-first architecture.
 *
 * Migration path:
 *   BEFORE (v3):  import pragyaPreset from "@pragyaos/theme/tailwind/preset";
 *                 // tailwind.config.ts → presets: [pragyaPreset]
 *
 *   AFTER  (v4):  @import "tailwindcss";
 *                 @import "@pragyaos/theme/theme.css";
 *                 // No tailwind.config.ts needed
 *
 * This file will be deleted after apps/web successfully uses theme.css.
 * Tracked in: docs/architecture/ARCHITECTURE_DECISIONS.md
 */

import { colors } from "../src/tokens/colors";
import { breakpoints } from "../src/tokens/breakpoints";
import { themePlugin } from "./plugin";

/** @deprecated Use @import "@pragyaos/theme/theme.css" with Tailwind v4 */
export const pragyaPreset = {
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        brand: {
          primary: colors.violet[500],
          secondary: colors.stone[500],
          accent: colors.violet[600],
        },
        paper: {
          light: "var(--paper-light)",
          cream: "var(--paper-cream)",
          dark: "var(--paper-dark)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Outfit", "Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Lora", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      screens: breakpoints,
    },
  },
  plugins: [themePlugin],
};

/** @deprecated Use @import "@pragyaos/theme/theme.css" with Tailwind v4 */
export default pragyaPreset;
