export const customUtilities = {
  // Editorial custom utilities
  ".editorial-section-padding-y": {
    paddingTop: "var(--editorial-section-padding-y, 5rem)",
    paddingBottom: "var(--editorial-section-padding-y, 5rem)",
  },
  ".editorial-organic-shift": {
    transform: "translateY(var(--editorial-organic-shift, 2rem))",
  },
  ".editorial-pinned-panel-width": {
    width: "var(--editorial-pinned-panel-width, 25rem)",
  },
  // Base scrollbar-hidden utility
  ".scrollbar-hidden": {
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  // Interaction active/hover presets
  ".interaction-hover": {
    transition: "opacity var(--duration-fast, 150ms) var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1))",
    "&:hover": {
      opacity: "0.85",
    },
  },
  ".interaction-active": {
    "&:active": {
      transform: "scale(0.98)",
      opacity: "0.95",
      transition: "transform var(--duration-fast, 150ms) var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1))",
    },
  },
};

export default customUtilities;
