# Component Specification Template

Use this template to specify individual UI components (whether shared or feature-specific) before generating them.

---

## 1. Metadata

*   **Component Name**: [e.g. MediaProgressBar]
*   **Component Scope**: [Shared UI Package (`packages/ui`) OR Feature Private Component (`features/classroom/components/`)]
*   **Description**: [e.g. Custom video player progress bar supporting scrub events, keyboard steps, and loaded buffer displays.]

---

## 2. API Signature & Types

```typescript
export interface MediaProgressBarProps {
  /** Current playback time in seconds */
  currentTime: number;
  /** Total media length in seconds */
  duration: number;
  /** Percentage of video buffered (0 to 100) */
  bufferedPercent?: number;
  /** Callback fired when user scrubs or drags progress indicator */
  onScrub: (targetTime: number) => void;
  /** Optional custom styles hook */
  className?: string;
}
```

---

## 3. Dependency Structure

*   **Allowed Imports**:
    *   `react`
    *   `@pragyaos/theme` (tokens only)
    *   `@pragyaos/hooks` (e.g. `useKeyPress`)
*   **Forbidden Imports**:
    *   Any feature store hooks (`useSelector`, features state)
    *   Any backend repository layers
    *   Any React Router dependencies (unless explicit routing buttons)

---

## 4. State & Interaction Specs

*   **Internal State**:
    *   `isDragging`: boolean. Matches user drag-scrub coordinates.
    *   `hoverProgress`: number. Displays hover target timestamp tooltip.
*   **Keyboard Accessibility**:
    *   `ArrowRight` / `ArrowLeft`: Shift video progress ±5 seconds.
    *   `Home` / `End`: Jump to 0% / 100% of duration.
    *   `Space`: Toggle playback pause (bubble event).
*   **Aria Roles**:
    *   `role="slider"`
    *   `aria-valuemin={0}`
    *   `aria-valuemax={duration}`
    *   `aria-valuenow={currentTime}`

---

## 5. Design & Motion

*   **Spacing & Layout**: Height is `4px` resting, scaling to `8px` on hover. Use padding tokens from `@pragyaos/theme`.
*   **Motion**: Transition heights using `themeTokens.animations.ease.fast` duration scale.
