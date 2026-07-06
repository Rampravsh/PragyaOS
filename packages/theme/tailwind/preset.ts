import { colors } from "../src/tokens/colors";
import { breakpoints } from "../src/tokens/breakpoints";
import { themePlugin } from "./plugin";

export const pragyaPreset = {
  theme: {
    extend: {
      colors: {
        // Map raw primitive colors from theme
        ...colors,

        // Semantic colors mapped to CSS variables
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

        // Custom brand mappings
        brand: {
          primary: colors.violet[500],
          secondary: colors.stone[500],
          accent: colors.violet[600],
        },

        // Special paper tones
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
      spacing: {
        "0": "var(--spacing-0, 0px)",
        "0.5": "var(--spacing-0-5, 0.125rem)",
        "1": "var(--spacing-1, 0.25rem)",
        "1.5": "var(--spacing-1-5, 0.375rem)",
        "2": "var(--spacing-2, 0.5rem)",
        "2.5": "var(--spacing-2-5, 0.625rem)",
        "3": "var(--spacing-3, 0.75rem)",
        "4": "var(--spacing-4, 1rem)",
        "5": "var(--spacing-5, 1.25rem)",
        "6": "var(--spacing-6, 1.5rem)",
        "8": "var(--spacing-8, 2rem)",
        "10": "var(--spacing-10, 2.5rem)",
        "12": "var(--spacing-12, 3rem)",
        "16": "var(--spacing-16, 4rem)",
        "20": "var(--spacing-20, 5rem)",
        "24": "var(--spacing-24, 6rem)",
        "32": "var(--spacing-32, 8rem)",
      },
      borderRadius: {
        none: "var(--radius-none, 0px)",
        xs: "var(--radius-xs, 0.125rem)",
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.375rem)",
        lg: "var(--radius-lg, 0.5rem)",
        xl: "var(--radius-xl, 0.75rem)",
        "2xl": "var(--radius-2xl, 1rem)",
        "3xl": "var(--radius-3xl, 1.5rem)",
        full: "var(--radius-full, 9999px)",
      },
      transitionDuration: {
        instant: "var(--duration-instant, 0ms)",
        fast: "var(--duration-fast, 150ms)",
        normal: "var(--duration-normal, 250ms)",
        slow: "var(--duration-slow, 450ms)",
        delight: "var(--duration-delight, 800ms)",
      },
      transitionTimingFunction: {
        linear: "var(--ease-linear, linear)",
        "in-out": "var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1))",
        out: "var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        in: "var(--ease-in, cubic-bezier(0.4, 0, 1, 1))",
        pop: "var(--ease-pop, cubic-bezier(0.34, 1.56, 0.64, 1))",
      },
      zIndex: {
        hide: "var(--z-hide, -1)",
        base: "var(--z-base, 0)",
        dropdown: "var(--z-dropdown, 1000)",
        sticky: "var(--z-sticky, 1020)",
        fixed: "var(--z-fixed, 1030)",
        modal: "var(--z-modal, 1050)",
        popover: "var(--z-popover, 1060)",
        tooltip: "var(--z-tooltip, 1070)",
        toast: "var(--z-toast, 1080)",
      },
      // Breakpoints
      screens: breakpoints,
    },
  },
  plugins: [themePlugin],
};

export default pragyaPreset;
