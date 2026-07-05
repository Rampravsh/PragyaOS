export const interaction = {
  hover: {
    opacity: "0.85",
    transition: "transition duration-200 ease-in-out",
  },
  active: {
    scale: "0.98",
    opacity: "0.95",
    transition: "transition duration-100 ease-in-out",
  },
  focus: {
    outline: "2px solid var(--ring)",
    offset: "2px",
  },
  disabled: {
    opacity: "0.5",
    cursor: "not-allowed",
    pointerEvents: "none",
  }
};
