/**
 * @deprecated — Tailwind v3 plugin API. Do NOT use in new code.
 *
 * This module used tailwindcss/plugin (Tailwind v3) to register custom
 * utility classes via addUtilities(). In Tailwind v4, custom utilities
 * are declared with @utility in CSS files.
 *
 * All utilities previously registered here have been migrated to:
 *   packages/theme/src/css/theme.css  (see @utility blocks at the bottom)
 *
 * This file is kept only to avoid breaking the deprecated preset.ts import.
 * It will be deleted alongside preset.ts after apps/web migration is confirmed.
 */

/** @deprecated Utilities have been migrated to src/css/theme.css @utility blocks */
export const themePlugin = {
  handler: () => {
    // No-op: all utilities migrated to src/css/theme.css
  },
};

export default themePlugin;
