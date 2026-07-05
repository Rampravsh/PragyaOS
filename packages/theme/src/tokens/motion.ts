export const motion = {
  durations: {
    instant: "0ms",
    fast: "150ms",    // hover effects, checkbox checks
    normal: "250ms",  // collapsible shifts, modal appearances
    slow: "450ms",    // drawer entrances, layout panels shifts
    delight: "800ms", // award unlocks, certificate generations
  },
  easingCurves: {
    linear: "linear",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    pop: "cubic-bezier(0.34, 1.56, 0.64, 1)", // spring simulation curve
  },
  springPresets: {
    default: { stiffness: 180, damping: 12 },
    bouncy: { stiffness: 300, damping: 15 },
    gentle: { stiffness: 120, damping: 14 },
    snappy: { stiffness: 400, damping: 28 },
  },
  accessibility: {
    reducedMotion: {
      transitionDuration: "0.01ms",
      animationDuration: "0.01ms",
      animationIterationCount: "1",
      scrollBehavior: "auto",
    }
  }
};
