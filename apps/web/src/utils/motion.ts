import { Variants } from 'framer-motion';

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none', duration = 0.4): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration,
      },
    },
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', duration = 0.5): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration,
      },
    },
  };
};

export const scaleIn = (duration = 0.3): Variants => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration,
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Reusable Page Transition Variants
export const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Design Foundation Micro-animations

// Smooth lift effect for cards on hover
export const hoverLift = {
  hover: {
    y: -4,
    boxShadow: 'var(--shadow-paper-floating)',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

// Button press feedback
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.015 },
  tap: { scale: 0.985 },
};

// Physical paper sliding up with a slight rotation tilt (creates editorial handcrafted entry)
export const paperReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotate: -1.5,
  },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      mass: 1,
    },
  },
};

// Spiral binding style side-unroll for notebooks
export const notebookReveal: Variants = {
  hidden: {
    opacity: 0,
    transformOrigin: 'left center',
    rotateY: -20,
    scaleX: 0.95,
  },
  show: {
    opacity: 1,
    rotateY: 0,
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Section Entrance (fade slide up)
export const sectionEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
