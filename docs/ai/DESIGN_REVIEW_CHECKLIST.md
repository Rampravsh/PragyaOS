# Design Review Checklist

Use this checklist during PR reviews and design audits to verify that the UI aligns with the PragyaOS visual identity and experience principles.

---

## 1. Core Token Verification

- [ ] **No Hardcoded Hex Values**: All background, text, border, and accent colors use token classes (e.g. `bg-background`, `text-primary`).
- [ ] **No Custom Pixel Dimensions**: Spacing utilizes the spacing scale (e.g., `p-4`, `gap-6`, `mb-2`).
- [ ] **Consistent Radii**: Cards, dialogs, inputs, and buttons use standard radius values (`rounded-md`, `rounded-lg`).

---

## 2. Environment Alignment

- [ ] **Marketing Experience**:
  - [ ] Uses large editorial headlines (outfit typography, serif accent elements).
  - [ ] Generous padding scales enabled (vertical separation > `py-16`).
  - [ ] Media elements feature spring-loaded hover states.
- [ ] **Workspace Experience**:
  - [ ] Dense layouts maximizing screen real estate.
  - [ ] Monospaced fonts for numerical indicators.
  - [ ] Navigable elements support keyboard focus states.

---

## 3. Motion Integrity

- [ ] **Tokenized Transitions**: All animations use easing speeds from `@pragyaos/theme`.
- [ ] **Feedback Loops**: Inputs and primary action items react with tactile spring scaling or focus outlines.
- [ ] **Skeletons vs Spinners**: Lazy-loaded areas show structural skeletons matching the layout grid, rather than generic loading spinners.

---

## 4. Accessibility Compliance

- [ ] **Contrast Verification**: Core copy reads at a minimum contrast ratio of 4.5:1.
- [ ] **Aria Attributes**: Complex components (drawers, tabs, toggles) are configured with appropriate ARIA states (`aria-expanded`, `aria-selected`).
- [ ] **Keyboard Intercepts**: Dialog modals lock focus and support closure on escape key presses.
