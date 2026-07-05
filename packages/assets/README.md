# `@pragyaos/assets` — Editorial Decorative Asset Library

Hand-crafted SVG illustration components for the PragyaOS Marketing Experience. All assets follow the editorial visual philosophy: sketch-like, minimal, sophisticated, and human.

---

## Design Philosophy

> These assets do not attract attention. They subtly guide the user's eye.

Assets are drawn with 1–2px stroke weights in off-white (`#F5F0EB`) against transparent backgrounds. Every path introduces deliberate imperfections — no mathematically perfect curves, no gradients, no shadows.

This produces a result that feels like a premium publishing platform rather than a traditional software dashboard.

---

## Asset Directory

```
packages/assets/
├── src/
│   └── index.ts                    ← All React component exports
├── editorial/
│   ├── statement/                  ← Wiggle, Circle, Underline, Loop, Arrow (×10 each)
│   ├── introduction/               ← Wiggle, Arrow, Loop, Circle (×10 each)
│   ├── annotations/                ← Highlights, underlines, side markers
│   ├── arrows/                     ← 10 directional arrow styles
│   ├── lines/                      ← 9 line styles (wave, zigzag, organic…)
│   ├── stars/                      ← 6 star/sparkle variants
│   ├── bursts/                     ← 5 radial burst styles
│   ├── circles/                    ← 6 imperfect circle styles
│   └── doodles/                    ← 10 freeform doodle elements
├── hero/
│   ├── backgrounds/                ← Hero page accents, dividers, corner doodles
│   └── empty-states/               ← 10 minimal illustrations for zero-state UIs
└── README.md
```

---

## Usage

### Install the package (already in workspace)

```bash
pnpm add @pragyaos/assets
```

### Import and use React components

```tsx
import {
  StatementWiggle01,
  HighlightCircle,
  EmptyNoCourses,
  OrganicDivider,
  HeroAccentLeft,
} from '@pragyaos/assets';

// Basic usage — inherits currentColor via CSS
<StatementWiggle01 />

// Explicit color + stroke width override
<HighlightCircle
  color="var(--foreground)"
  strokeWidth={1.2}
  opacity={0.6}
  className="absolute -bottom-2 left-0 pointer-events-none"
/>

// Empty state illustration
<EmptyNoCourses
  color="var(--muted-foreground)"
  strokeWidth={1.5}
  opacity={0.7}
  ariaLabel="No courses enrolled"
  ariaHidden={false}
/>
```

### Use raw SVG files

All assets are also available as raw `.svg` files for use in CSS backgrounds, `<img>` tags, or image optimization pipelines:

```tsx
// Vite raw SVG import
import wiggleSvg from '@pragyaos/assets/editorial/statement/statement-wiggle-01.svg?raw';

// CSS background
background-image: url('@pragyaos/assets/hero/backgrounds/page-divider.svg');
```

---

## Component API

All asset components share a unified `AssetProps` interface:

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `"currentColor"` | Stroke / fill color. Use CSS variables for theme integration. |
| `strokeWidth` | `number` | `1.5` | Line thickness in pixels. Range: 0.5–3. |
| `opacity` | `number` | `1` | Opacity 0–1. Use to create layered depth effects. |
| `className` | `string` | `""` | Tailwind or custom CSS class string. |
| `ariaLabel` | `string` | — | Provide when the asset conveys semantic meaning. |
| `ariaHidden` | `boolean` | `true` | Set `false` only when asset is semantically meaningful. |

---

## Asset Catalogue

### Statement Collection (`editorial/statement/`)
Emphasis marks overlaid on large editorial headlines.

| Asset | Description |
|---|---|
| `StatementWiggle01–10` | Organic wavy underlines for headline emphasis |
| `StatementCircle01–10` | Imperfect enclosing circles to highlight keywords |
| `StatementUnderline01–10` | Hand-drawn underline strokes |
| `StatementLoop01–10` | Looping emphasis shapes |
| `StatementArrow01–10` | Directional annotation arrows |

### Introduction Collection (`editorial/introduction/`)
Larger-scale decorative marks for section openers.

| Asset | Description |
|---|---|
| `IntroductionWiggle01–10` | Wide wavy dividers for section entrances |
| `IntroductionArrow01–10` | Curved pointer arrows |
| `IntroductionLoop01–10` | Oval loop emphasis shapes |
| `IntroductionCircle01–10` | Large enclosing circles |

### Annotations (`editorial/annotations/`)
Marks for highlighting and calling out content.

`HighlightCircle` · `HighlightOval` · `HighlightDoubleCircle` · `HighlightScribble` · `RoughRectangle` · `UnderlineShort` · `UnderlineLong` · `DoubleUnderline` · `TripleUnderline` · `SideMarker`

### Arrows (`editorial/arrows/`)
Ten distinct editorial arrow styles.

`ThinArrow` · `CurvedArrow` · `LoopArrow` · `LongArrow` · `PaperArrow` · `EditorialArrow` · `UpwardArrow` · `DownwardArrow` · `DiagonalArrow` · `PointerArrow`

### Lines (`editorial/lines/`)
Decorative line variants for dividers and separators.

`StraightLine` · `BrokenLine` · `WaveLine` · `ZigzagLine` · `HandWaveLine` · `CurlLine` · `RibbonLine` · `Divider` · `OrganicDivider`

### Stars (`editorial/stars/`)
`Sparkle` · `TinyStar` · `EditorialStar` · `BurstStar` · `Asterisk` · `MinimalStar`

### Bursts (`editorial/bursts/`)
`BurstSmall` · `BurstMedium` · `BurstLarge` · `RadialLines` · `FocusLines`

### Circles (`editorial/circles/`)
`ImperfectCircle` · `RoughCircle` · `DoubleCircle` · `TripleCircle` · `OpenCircle` · `BrushCircle`

### Doodles (`editorial/doodles/`)
`Spiral` · `Swirl` · `PaperPlane` · `PenStroke` · `InkSplashSmall` · `InkSplashLarge` · `RibbonLoop` · `InfinityLoop` · `CrossingLines` · `TinyDots`

### Hero Backgrounds (`hero/backgrounds/`)
`CornerDoodles` · `EdgeDoodles` · `HeroAccentLeft` · `HeroAccentRight` · `FloatingScribble` · `PageDivider`

### Empty States (`hero/empty-states/`)
Minimal editorial illustrations for zero-state UI screens.

`EmptyNoCourses` · `EmptyNoSearchResults` · `EmptyNoNotifications` · `EmptyNoMessages` · `EmptyNoCertificates` · `EmptyNoNotes` · `EmptyNoBookmarks` · `EmptyNoDownloads` · `EmptyNoHistory` · `EmptyOffline`

---

## Convenience Grouped Exports

```tsx
import { StatementWiggles, StatementUnderlines, EmptyStates, Arrows, Lines, Annotations } from '@pragyaos/assets';

// Pick a random wiggle
const RandomWiggle = StatementWiggles[Math.floor(Math.random() * 10)];

// Empty state map
const EmptyIllustration = EmptyStates.NoCourses;
```

---

## Style Rules

| Rule | Value |
|---|---|
| Stroke width | 1px–2px |
| Colours | `#F5F0EB` (off-white) or `currentColor` |
| Background | Transparent |
| Gradients | Never |
| Shadows | Never |
| Glow | Never |
| Clip art | Never |
| Mathematical perfection | Never — introduce imperfection |

---

## PNG Exports

Raw SVG files are the source of truth. For PNG exports at 2× and 4× resolution, run:

```bash
# Install sharp-based CLI (one-time)
pnpm add -D @resvg/resvg-js

# Run export script
pnpm run export:png
```

This generates `*.@2x.png` and `*.@4x.png` alongside each SVG file.

---

## Token Integration

Assets are designed to work natively with the `@pragyaos/theme` token system:

```tsx
import { themeTokens } from '@pragyaos/theme';
import { HighlightCircle } from '@pragyaos/assets';

// Uses semantic color token
<HighlightCircle color="var(--primary)" />

// Uses muted foreground for subtle background marks
<OrganicDivider color="var(--muted-foreground)" opacity={0.3} />
```
