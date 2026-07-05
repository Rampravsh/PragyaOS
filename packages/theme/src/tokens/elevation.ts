import { shadow } from "./shadow";

export const elevation = {
  flat: {
    shadow: shadow.none,
    transform: "translateY(0)",
  },
  raised: {
    shadow: shadow.sm,
    transform: "translateY(-1px)",
  },
  overlay: {
    shadow: shadow.md,
    transform: "translateY(-2px)",
  },
  sticky: {
    shadow: shadow.sm,
    transform: "translateY(0)",
  },
  floating: {
    shadow: shadow.lg,
    transform: "translateY(-4px)",
  },
  cinematic: {
    shadow: shadow.xl,
    transform: "translateY(-8px)", // Ellipsus style floats
  }
};
