/**
 * @pragyaos/assets
 *
 * Editorial Decorative Asset Library
 * ─────────────────────────────────────────────────────────────────────────────
 * Hand-crafted SVG illustration components for the PragyaOS Marketing Experience.
 * Assets follow the editorial philosophy of Ellipsus-inspired premium composition:
 * sketch-like, minimal, sophisticated, and human.
 *
 * Usage:
 *   import { StatementWiggle01, HighlightCircle, EmptyNoCourses } from '@pragyaos/assets';
 */

import React from "react";

// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

export interface AssetProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export interface AssetFC {
  (props: AssetProps): React.JSX.Element;
  displayName?: string;
}

// ─── FACTORY ──────────────────────────────────────────────────────────────────

function makeAsset(
  displayName: string,
  width: number,
  height: number,
  renderFn: (color: string, sw: number, op: number) => React.ReactNode
): AssetFC {
  const Comp = ({
    className = "",
    color = "currentColor",
    strokeWidth = 1.5,
    opacity = 1,
    ariaLabel,
    ariaHidden = true,
  }: AssetProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : "presentation"}
    >
      {renderFn(color, strokeWidth, opacity)}
    </svg>
  );
  Comp.displayName = displayName;
  return Comp as unknown as AssetFC;
}

// ─── SVG ELEMENT HELPERS ──────────────────────────────────────────────────────

function Stroke({
  d, color, sw, op, cap = "round", join = "round"
}: { d: string; color: string; sw: number; op: number; cap?: string; join?: string }) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={sw}
      strokeLinecap={cap as React.SVGProps<SVGPathElement>["strokeLinecap"]}
      strokeLinejoin={join as React.SVGProps<SVGPathElement>["strokeLinejoin"]}
      opacity={op}
    />
  );
}

function Ln({ x1, y1, x2, y2, color, sw, op = 1 }: { x1: number; y1: number; x2: number; y2: number; color: string; sw: number; op?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={op} />;
}

function Ci({ cx, cy, r, color, sw }: { cx: number; cy: number; r: number; color: string; sw: number }) {
  return <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={sw} fill="none" />;
}

// ─── STATEMENT WIGGLES (01–10) ─────────────────────────────────────────────────

export const StatementWiggle01 = makeAsset("StatementWiggle01", 128, 24, (c, sw, op) => <Stroke d="M4,12 C14,7 24,17 34,12 C44,7 54,17 64,12 C74,7 84,17 94,12 C104,7 114,17 124,12" color={c} sw={sw} op={op} />);
export const StatementWiggle02 = makeAsset("StatementWiggle02", 128, 24, (c, sw, op) => <Stroke d="M4,12 C12,6 22,18 32,12 C42,6 52,18 62,12 C72,6 82,18 92,12 C102,6 112,18 122,12" color={c} sw={sw} op={op} />);
export const StatementWiggle03 = makeAsset("StatementWiggle03", 144, 26, (c, sw, op) => <Stroke d="M4,13 C16,5 26,20 38,13 C50,5 60,20 72,13 C84,5 94,20 106,13 C118,5 128,20 140,13" color={c} sw={sw} op={op} />);
export const StatementWiggle04 = makeAsset("StatementWiggle04", 120, 24, (c, sw, op) => <Stroke d="M4,12 C18,8 28,16 42,12 C56,8 66,16 80,12 C94,8 104,16 118,12" color={c} sw={sw} op={op} />);
export const StatementWiggle05 = makeAsset("StatementWiggle05", 124, 26, (c, sw, op) => <Stroke d="M4,14 C10,8 20,18 30,14 C40,8 50,18 60,14 C70,8 80,18 90,14 C100,8 110,18 120,14" color={c} sw={sw} op={op} />);
export const StatementWiggle06 = makeAsset("StatementWiggle06", 152, 24, (c, sw, op) => <Stroke d="M4,12 C20,7 36,17 52,12 C68,7 84,17 100,12 C116,7 132,17 148,12" color={c} sw={sw} op={op} />);
export const StatementWiggle07 = makeAsset("StatementWiggle07", 98, 26, (c, sw, op) => <Stroke d="M4,13 C14,7 24,19 34,13 C44,7 54,19 64,13 C74,7 84,19 94,13" color={c} sw={sw} op={op} />);
export const StatementWiggle08 = makeAsset("StatementWiggle08", 136, 24, (c, sw, op) => <Stroke d="M4,12 C15,6 25,18 36,12 C47,6 57,18 68,12 C79,6 89,18 100,12 C111,6 121,18 132,12" color={c} sw={sw} op={op} />);
export const StatementWiggle09 = makeAsset("StatementWiggle09", 96, 26, (c, sw, op) => <Stroke d="M4,14 C12,8 22,20 32,14 C42,8 52,20 62,14 C72,8 82,20 92,14" color={c} sw={sw} op={op} />);
export const StatementWiggle10 = makeAsset("StatementWiggle10", 144, 24, (c, sw, op) => <Stroke d="M4,12 C16,6 26,18 38,12 C50,6 60,18 72,12 C84,6 94,18 106,12 C118,6 128,18 140,12" color={c} sw={sw} op={op} />);

// ─── STATEMENT CIRCLES (01–10) ─────────────────────────────────────────────────

export const StatementCircle01 = makeAsset("StatementCircle01", 120, 100, (c, sw, op) => <Stroke d="M60,20 C90,14 108,32 102,52 C96,72 72,82 50,74 C28,66 18,44 28,24 C38,4 52,12 60,20" color={c} sw={sw} op={op} />);
export const StatementCircle02 = makeAsset("StatementCircle02", 120, 100, (c, sw, op) => <Stroke d="M55,18 C82,10 106,28 100,56 C94,84 68,90 42,78 C16,66 10,40 22,22 C34,4 44,14 55,18" color={c} sw={sw} op={op} />);
export const StatementCircle03 = makeAsset("StatementCircle03", 120, 100, (c, sw, op) => <Stroke d="M64,22 C92,16 110,36 104,60 C98,84 70,92 46,80 C22,68 14,44 26,26 C38,8 56,16 64,22" color={c} sw={sw} op={op} />);
export const StatementCircle04 = makeAsset("StatementCircle04", 120, 100, (c, sw, op) => <Stroke d="M60,20 C86,12 108,30 102,58 C96,86 68,94 40,80 C12,66 8,38 22,22 C36,6 50,16 60,20" color={c} sw={sw} op={op} />);
export const StatementCircle05 = makeAsset("StatementCircle05", 120, 100, (c, sw, op) => <Stroke d="M56,18 C82,8 108,26 104,54 C100,82 72,92 44,80 C16,68 10,42 22,24 C34,6 48,14 56,18" color={c} sw={sw} op={op} />);
export const StatementCircle06 = makeAsset("StatementCircle06", 120, 100, (c, sw, op) => <Stroke d="M62,22 C90,16 112,36 106,60 C100,84 72,92 46,80 C20,68 12,42 24,26 C36,10 54,16 62,22" color={c} sw={sw} op={op} />);
export const StatementCircle07 = makeAsset("StatementCircle07", 120, 100, (c, sw, op) => <Stroke d="M58,20 C84,12 108,30 102,58 C96,86 66,94 40,80 C14,66 10,38 24,22 C38,6 50,16 58,20" color={c} sw={sw} op={op} />);
export const StatementCircle08 = makeAsset("StatementCircle08", 120, 100, (c, sw, op) => <Stroke d="M60,16 C90,8 114,28 108,58 C102,88 72,96 44,82 C16,68 8,40 20,22 C32,4 48,12 60,16" color={c} sw={sw} op={op} />);
export const StatementCircle09 = makeAsset("StatementCircle09", 120, 100, (c, sw, op) => <Stroke d="M64,18 C94,10 114,30 108,60 C102,90 72,98 44,84 C16,70 8,42 22,24 C36,6 50,14 64,18" color={c} sw={sw} op={op} />);
export const StatementCircle10 = makeAsset("StatementCircle10", 120, 100, (c, sw, op) => <Stroke d="M58,22 C86,14 108,34 102,60 C96,86 68,92 42,80 C16,68 10,42 24,26 C38,10 52,18 58,22" color={c} sw={sw} op={op} />);

// ─── STATEMENT UNDERLINES (01–10) ──────────────────────────────────────────────

export const StatementUnderline01 = makeAsset("StatementUnderline01", 128, 8, (c, sw, op) => <Stroke d="M4,4 C40,2 80,6 120,4" color={c} sw={sw} op={op} />);
export const StatementUnderline02 = makeAsset("StatementUnderline02", 128, 8, (c, sw, op) => <Stroke d="M4,4 L124,4" color={c} sw={sw} op={op} />);
export const StatementUnderline03 = makeAsset("StatementUnderline03", 154, 10, (c, sw, op) => <Stroke d="M4,5 C30,3 60,7 90,5 C110,3 130,6 150,4" color={c} sw={sw} op={op} />);
export const StatementUnderline04 = makeAsset("StatementUnderline04", 154, 8, (c, sw, op) => <Stroke d="M4,4 C50,2 100,6 150,4" color={c} sw={sw} op={op} />);
export const StatementUnderline05 = makeAsset("StatementUnderline05", 128, 10, (c, sw, op) => <Stroke d="M4,5 C44,3 84,7 124,5" color={c} sw={sw} op={op} />);
export const StatementUnderline06 = makeAsset("StatementUnderline06", 124, 8, (c, sw, op) => <Stroke d="M4,3 C40,5 80,1 120,3" color={c} sw={sw} op={op} />);
export const StatementUnderline07 = makeAsset("StatementUnderline07", 154, 8, (c, sw, op) => <Stroke d="M4,4 C50,2 100,6 150,4" color={c} sw={sw} op={op} />);
export const StatementUnderline08 = makeAsset("StatementUnderline08", 164, 10, (c, sw, op) => <Stroke d="M4,5 C30,3 60,7 90,4 C120,1 140,6 160,4" color={c} sw={sw} op={op} />);
export const StatementUnderline09 = makeAsset("StatementUnderline09", 128, 8, (c, sw, op) => <Stroke d="M4,4 C44,6 84,2 124,4" color={c} sw={sw} op={op} />);
export const StatementUnderline10 = makeAsset("StatementUnderline10", 169, 8, (c, sw, op) => <Stroke d="M4,4 C35,2 70,6 105,4 C125,2 145,6 165,4" color={c} sw={sw} op={op} />);

// ─── STATEMENT LOOPS (01–10) ───────────────────────────────────────────────────

export const StatementLoop01 = makeAsset("StatementLoop01", 100, 90, (c, sw, op) => <Stroke d="M20,30 C20,10 40,5 60,15 C80,25 90,50 75,65 C60,80 30,75 20,60 C10,45 15,30 20,30" color={c} sw={sw} op={op} />);
export const StatementLoop02 = makeAsset("StatementLoop02", 100, 90, (c, sw, op) => <Stroke d="M24,32 C22,12 42,6 62,16 C82,26 92,52 76,66 C60,80 28,76 18,60 C8,44 16,32 24,32" color={c} sw={sw} op={op} />);
export const StatementLoop03 = makeAsset("StatementLoop03", 100, 90, (c, sw, op) => <Stroke d="M22,28 C20,8 42,4 64,14 C86,24 94,52 78,66 C62,80 32,76 20,60 C8,44 16,28 22,28" color={c} sw={sw} op={op} />);
export const StatementLoop04 = makeAsset("StatementLoop04", 100, 90, (c, sw, op) => <Stroke d="M20,30 C18,10 40,4 62,16 C84,28 90,56 74,68 C58,80 26,74 18,58 C10,42 14,30 20,30" color={c} sw={sw} op={op} />);
export const StatementLoop05 = makeAsset("StatementLoop05", 100, 90, (c, sw, op) => <Stroke d="M24,30 C22,10 44,4 66,16 C88,28 96,56 78,70 C60,84 28,76 18,60 C8,44 16,30 24,30" color={c} sw={sw} op={op} />);
export const StatementLoop06 = makeAsset("StatementLoop06", 100, 90, (c, sw, op) => <Stroke d="M20,32 C18,12 40,6 62,18 C84,30 90,58 74,70 C58,82 26,76 18,60 C10,44 14,32 20,32" color={c} sw={sw} op={op} />);
export const StatementLoop07 = makeAsset("StatementLoop07", 100, 90, (c, sw, op) => <Stroke d="M22,30 C20,8 44,4 66,16 C88,28 94,58 76,70 C58,82 28,76 18,60 C8,44 14,30 22,30" color={c} sw={sw} op={op} />);
export const StatementLoop08 = makeAsset("StatementLoop08", 100, 90, (c, sw, op) => <Stroke d="M20,28 C18,8 42,4 64,16 C86,28 92,56 76,70 C60,84 28,76 18,58 C8,40 14,28 20,28" color={c} sw={sw} op={op} />);
export const StatementLoop09 = makeAsset("StatementLoop09", 100, 90, (c, sw, op) => <Stroke d="M24,32 C22,10 46,6 68,18 C90,30 96,58 78,72 C60,86 30,78 20,60 C10,42 16,32 24,32" color={c} sw={sw} op={op} />);
export const StatementLoop10 = makeAsset("StatementLoop10", 100, 90, (c, sw, op) => <Stroke d="M20,30 C18,10 42,4 64,16 C86,28 92,58 74,70 C56,82 26,74 18,58 C10,42 14,30 20,30" color={c} sw={sw} op={op} />);

// ─── STATEMENT ARROWS (01–10) ──────────────────────────────────────────────────

export const StatementArrow01 = makeAsset("StatementArrow01", 94, 40, (c, sw, op) => <><Stroke d="M4,20 C30,18 60,22 90,20" color={c} sw={sw} op={op} /><Stroke d="M80,12 L90,20 L80,28" color={c} sw={sw} op={op} /></>);
export const StatementArrow02 = makeAsset("StatementArrow02", 124, 40, (c, sw, op) => <><Stroke d="M4,20 C20,10 40,30 60,20 C80,10 100,30 120,20" color={c} sw={sw} op={op} /><Stroke d="M110,12 L120,20 L110,28" color={c} sw={sw} op={op} /></>);
export const StatementArrow03 = makeAsset("StatementArrow03", 100, 36, (c, sw, op) => <><Stroke d="M4,18 Q50,10 96,22" color={c} sw={sw} op={op} /><Stroke d="M86,14 L96,22 L84,28" color={c} sw={sw} op={op} /></>);
export const StatementArrow04 = makeAsset("StatementArrow04", 94, 40, (c, sw, op) => <><Stroke d="M4,20 C25,14 55,26 90,20" color={c} sw={sw} op={op} /><Stroke d="M80,13 L90,20 L80,27" color={c} sw={sw} op={op} /></>);
export const StatementArrow05 = makeAsset("StatementArrow05", 94, 42, (c, sw, op) => <><Stroke d="M4,22 C30,16 60,28 90,22" color={c} sw={sw} op={op} /><Stroke d="M80,14 L90,22 L78,28" color={c} sw={sw} op={op} /></>);
export const StatementArrow06 = makeAsset("StatementArrow06", 134, 40, (c, sw, op) => <><Stroke d="M4,20 C20,12 44,28 68,20 C88,14 108,26 130,20" color={c} sw={sw} op={op} /><Stroke d="M120,12 L130,20 L120,28" color={c} sw={sw} op={op} /></>);
export const StatementArrow07 = makeAsset("StatementArrow07", 108, 40, (c, sw, op) => <><Stroke d="M4,20 C35,16 70,24 104,20" color={c} sw={sw} op={op} /><Stroke d="M94,13 L104,20 L94,27" color={c} sw={sw} op={op} /></>);
export const StatementArrow08 = makeAsset("StatementArrow08", 144, 36, (c, sw, op) => <><Stroke d="M4,18 C28,14 52,22 76,18 C96,14 116,22 140,18" color={c} sw={sw} op={op} /><Stroke d="M130,11 L140,18 L130,25" color={c} sw={sw} op={op} /></>);
export const StatementArrow09 = makeAsset("StatementArrow09", 104, 40, (c, sw, op) => <><Stroke d="M4,20 C32,14 64,26 100,20" color={c} sw={sw} op={op} /><Stroke d="M90,13 L100,20 L90,27" color={c} sw={sw} op={op} /></>);
export const StatementArrow10 = makeAsset("StatementArrow10", 136, 40, (c, sw, op) => <><Stroke d="M4,20 C24,16 48,24 72,20 C92,16 112,24 132,20" color={c} sw={sw} op={op} /><Stroke d="M122,13 L132,20 L122,27" color={c} sw={sw} op={op} /></>);

// ─── INTRODUCTION WIGGLES (01–10) ──────────────────────────────────────────────

export const IntroductionWiggle01 = makeAsset("IntroductionWiggle01", 248, 40, (c, sw, op) => <Stroke d="M4,20 C24,10 44,30 64,20 C84,10 104,30 124,20 C144,10 164,30 184,20 C204,10 224,30 244,20" color={c} sw={sw} op={op} />);
export const IntroductionWiggle02 = makeAsset("IntroductionWiggle02", 184, 40, (c, sw, op) => <Stroke d="M4,20 C20,8 40,32 60,20 C80,8 100,32 120,20 C140,8 160,32 180,20" color={c} sw={sw} op={op} />);
export const IntroductionWiggle03 = makeAsset("IntroductionWiggle03", 200, 44, (c, sw, op) => <Stroke d="M4,22 C26,12 46,32 68,22 C90,12 110,32 132,22 C154,12 174,32 196,22" color={c} sw={sw} op={op} />);
export const IntroductionWiggle04 = makeAsset("IntroductionWiggle04", 202, 40, (c, sw, op) => <Stroke d="M4,20 C22,10 44,30 66,20 C88,10 110,30 132,20 C154,10 176,30 198,20" color={c} sw={sw} op={op} />);
export const IntroductionWiggle05 = makeAsset("IntroductionWiggle05", 188, 36, (c, sw, op) => <Stroke d="M4,18 C24,8 44,28 64,18 C84,8 104,28 124,18 C144,8 164,28 184,18" color={c} sw={sw} op={op} />);
export const IntroductionWiggle06 = makeAsset("IntroductionWiggle06", 224, 44, (c, sw, op) => <Stroke d="M4,22 C28,12 52,32 76,22 C100,12 124,32 148,22 C172,12 196,32 220,22" color={c} sw={sw} op={op} />);
export const IntroductionWiggle07 = makeAsset("IntroductionWiggle07", 236, 40, (c, sw, op) => <Stroke d="M4,20 C30,10 54,30 80,20 C106,10 130,30 156,20 C182,10 206,30 232,20" color={c} sw={sw} op={op} />);
export const IntroductionWiggle08 = makeAsset("IntroductionWiggle08", 202, 36, (c, sw, op) => <Stroke d="M4,18 C22,8 44,28 66,18 C88,8 110,28 132,18 C154,8 176,28 198,18" color={c} sw={sw} op={op} />);
export const IntroductionWiggle09 = makeAsset("IntroductionWiggle09", 224, 40, (c, sw, op) => <Stroke d="M4,20 C28,12 52,28 76,20 C100,12 124,28 148,20 C172,12 196,28 220,20" color={c} sw={sw} op={op} />);
export const IntroductionWiggle10 = makeAsset("IntroductionWiggle10", 218, 40, (c, sw, op) => <Stroke d="M4,20 C22,10 46,30 70,20 C94,10 118,30 142,20 C166,10 190,30 214,20" color={c} sw={sw} op={op} />);

// ─── INTRODUCTION ARROWS (01–10) ───────────────────────────────────────────────

export const IntroductionArrow01 = makeAsset("IntroductionArrow01", 116, 90, (c, sw, op) => <><Stroke d="M4,50 C20,30 40,20 60,30 C80,40 90,60 80,72" color={c} sw={sw} op={op} /><Stroke d="M72,62 L80,72 L88,62" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow02 = makeAsset("IntroductionArrow02", 116, 90, (c, sw, op) => <><Stroke d="M10,60 C30,30 60,10 90,30 C110,44 110,66 100,78" color={c} sw={sw} op={op} /><Stroke d="M92,68 L100,78 L106,66" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow03 = makeAsset("IntroductionArrow03", 100, 90, (c, sw, op) => <><Stroke d="M4,50 C30,20 60,10 80,30 C100,50 90,70 80,80" color={c} sw={sw} op={op} /><Stroke d="M72,72 L80,80 L86,70" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow04 = makeAsset("IntroductionArrow04", 110, 90, (c, sw, op) => <><Stroke d="M10,60 C40,30 70,10 90,30 C110,50 100,70 90,82" color={c} sw={sw} op={op} /><Stroke d="M82,72 L90,82 L96,70" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow05 = makeAsset("IntroductionArrow05", 90, 90, (c, sw, op) => <><Stroke d="M4,50 C20,30 50,10 70,30 C90,50 80,70 70,80" color={c} sw={sw} op={op} /><Stroke d="M62,72 L70,80 L76,70" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow06 = makeAsset("IntroductionArrow06", 100, 90, (c, sw, op) => <><Stroke d="M10,60 C30,30 60,10 80,30 C100,50 90,70 80,82" color={c} sw={sw} op={op} /><Stroke d="M72,74 L80,82 L88,74" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow07 = makeAsset("IntroductionArrow07", 110, 90, (c, sw, op) => <><Stroke d="M4,50 C25,25 55,10 80,28 C105,46 100,68 90,80" color={c} sw={sw} op={op} /><Stroke d="M82,72 L90,80 L96,70" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow08 = makeAsset("IntroductionArrow08", 120, 90, (c, sw, op) => <><Stroke d="M10,60 C35,30 65,10 90,28 C115,46 110,70 100,82" color={c} sw={sw} op={op} /><Stroke d="M92,74 L100,82 L108,74" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow09 = makeAsset("IntroductionArrow09", 104, 90, (c, sw, op) => <><Stroke d="M4,50 C24,26 54,10 78,30 C102,50 94,72 84,80" color={c} sw={sw} op={op} /><Stroke d="M76,72 L84,80 L90,70" color={c} sw={sw} op={op} /></>);
export const IntroductionArrow10 = makeAsset("IntroductionArrow10", 120, 90, (c, sw, op) => <><Stroke d="M10,60 C36,30 68,10 92,28 C116,46 112,68 102,80" color={c} sw={sw} op={op} /><Stroke d="M94,72 L102,80 L108,70" color={c} sw={sw} op={op} /></>);

// ─── INTRODUCTION LOOPS (01–10) ────────────────────────────────────────────────

export const IntroductionLoop01 = makeAsset("IntroductionLoop01", 100, 100, (c, sw, op) => <Stroke d="M30,60 C10,40 20,10 50,10 C80,10 90,40 80,60 C70,80 40,80 30,60 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop02 = makeAsset("IntroductionLoop02", 100, 100, (c, sw, op) => <Stroke d="M32,62 C12,42 22,10 52,10 C82,10 92,42 82,62 C72,82 42,82 32,62 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop03 = makeAsset("IntroductionLoop03", 100, 100, (c, sw, op) => <Stroke d="M28,60 C8,38 18,8 50,8 C82,8 94,40 82,62 C70,84 40,82 28,60 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop04 = makeAsset("IntroductionLoop04", 100, 100, (c, sw, op) => <Stroke d="M30,62 C10,40 20,10 52,10 C84,10 94,42 84,64 C74,86 44,84 30,62 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop05 = makeAsset("IntroductionLoop05", 100, 100, (c, sw, op) => <Stroke d="M34,60 C14,38 24,8 56,8 C88,8 98,40 88,62 C78,84 46,82 34,60 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop06 = makeAsset("IntroductionLoop06", 100, 100, (c, sw, op) => <Stroke d="M30,60 C10,40 18,8 52,10 C86,12 96,44 84,66 C72,88 42,82 30,60 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop07 = makeAsset("IntroductionLoop07", 100, 100, (c, sw, op) => <Stroke d="M28,62 C8,40 18,8 50,10 C82,12 92,46 80,68 C68,90 40,82 28,62 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop08 = makeAsset("IntroductionLoop08", 100, 100, (c, sw, op) => <Stroke d="M32,60 C12,38 22,8 54,8 C86,8 96,40 86,62 C76,84 44,82 32,60 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop09 = makeAsset("IntroductionLoop09", 100, 100, (c, sw, op) => <Stroke d="M30,62 C8,40 20,8 52,10 C84,12 94,44 82,68 C70,92 42,84 30,62 Z" color={c} sw={sw} op={op} />);
export const IntroductionLoop10 = makeAsset("IntroductionLoop10", 100, 100, (c, sw, op) => <Stroke d="M34,60 C14,38 24,8 56,8 C88,8 98,42 86,66 C74,90 46,84 34,60 Z" color={c} sw={sw} op={op} />);

// ─── INTRODUCTION CIRCLES (01–10) ──────────────────────────────────────────────

export const IntroductionCircle01 = makeAsset("IntroductionCircle01", 160, 140, (c, sw, op) => <Stroke d="M80,20 C120,12 148,40 144,70 C140,100 112,120 80,112 C48,104 24,76 28,46 C32,16 52,8 80,20" color={c} sw={sw} op={op} />);
export const IntroductionCircle02 = makeAsset("IntroductionCircle02", 160, 140, (c, sw, op) => <Stroke d="M80,18 C122,10 150,40 146,72 C142,104 112,124 80,116 C48,108 22,78 26,46 C30,14 50,8 80,18" color={c} sw={sw} op={op} />);
export const IntroductionCircle03 = makeAsset("IntroductionCircle03", 160, 140, (c, sw, op) => <Stroke d="M80,20 C124,12 152,42 148,74 C144,106 114,126 80,118 C46,110 20,78 24,46 C28,14 50,10 80,20" color={c} sw={sw} op={op} />);
export const IntroductionCircle04 = makeAsset("IntroductionCircle04", 160, 140, (c, sw, op) => <Stroke d="M80,18 C124,10 154,40 148,74 C142,108 110,128 78,118 C46,108 20,78 24,46 C28,14 50,8 80,18" color={c} sw={sw} op={op} />);
export const IntroductionCircle05 = makeAsset("IntroductionCircle05", 160, 140, (c, sw, op) => <Stroke d="M80,20 C126,12 154,42 148,76 C142,110 110,130 78,120 C46,110 18,80 22,46 C26,12 48,10 80,20" color={c} sw={sw} op={op} />);
export const IntroductionCircle06 = makeAsset("IntroductionCircle06", 160, 140, (c, sw, op) => <Stroke d="M80,16 C124,8 154,38 148,72 C142,106 110,128 78,118 C46,108 18,76 22,44 C26,12 46,8 80,16" color={c} sw={sw} op={op} />);
export const IntroductionCircle07 = makeAsset("IntroductionCircle07", 160, 140, (c, sw, op) => <Stroke d="M80,18 C126,10 156,40 150,74 C144,108 112,130 78,120 C44,110 18,78 22,44 C26,10 46,10 80,18" color={c} sw={sw} op={op} />);
export const IntroductionCircle08 = makeAsset("IntroductionCircle08", 160, 140, (c, sw, op) => <Stroke d="M80,20 C128,12 156,44 148,78 C140,112 108,132 76,122 C44,112 18,80 22,46 C26,12 46,10 80,20" color={c} sw={sw} op={op} />);
export const IntroductionCircle09 = makeAsset("IntroductionCircle09", 160, 140, (c, sw, op) => <Stroke d="M80,18 C128,10 158,42 152,76 C146,110 114,132 80,122 C46,112 20,78 24,46 C28,14 50,8 80,18" color={c} sw={sw} op={op} />);
export const IntroductionCircle10 = makeAsset("IntroductionCircle10", 160, 140, (c, sw, op) => <Stroke d="M80,20 C130,12 158,44 150,80 C142,116 108,136 76,124 C44,112 18,78 22,44 C26,10 46,10 80,20" color={c} sw={sw} op={op} />);

// ─── ANNOTATIONS ───────────────────────────────────────────────────────────────

export const HighlightCircle = makeAsset("HighlightCircle", 120, 50, (c, sw, op) => <Stroke d="M60,6 C90,0 114,12 110,28 C106,44 84,52 58,48 C32,44 12,30 16,16 C20,2 40,-2 60,6" color={c} sw={sw} op={op} />);
export const HighlightOval = makeAsset("HighlightOval", 120, 40, (c, sw, op) => <Stroke d="M60,6 C90,2 116,12 112,24 C108,36 82,44 54,40 C26,36 6,24 10,14 C14,4 38,2 60,6" color={c} sw={sw} op={op} />);
export const HighlightDoubleCircle = makeAsset("HighlightDoubleCircle", 120, 50, (c, sw, op) => (
  <>
    <Stroke d="M60,6 C90,0 114,12 110,28 C106,44 84,52 58,48 C32,44 12,30 16,16 C20,2 40,-2 60,6" color={c} sw={sw} op={op} />
    <Stroke d="M60,10 C88,4 110,14 106,28 C102,42 80,50 56,46 C32,42 14,30 18,18 C22,6 42,2 60,10" color={c} sw={sw * 0.7} op={op * 0.5} />
  </>
));
export const HighlightScribble = makeAsset("HighlightScribble", 200, 30, (c, sw, op) => <Stroke d="M4,20 C20,8 40,30 60,18 C80,6 100,28 120,16 C140,4 160,26 180,14 C190,8 198,18 196,24" color={c} sw={sw} op={op} />);
export const RoughRectangle = makeAsset("RoughRectangle", 120, 60, (c, sw, op) => <Stroke d="M8,8 C30,6 70,8 112,10 C114,30 112,50 110,56 C80,58 40,56 8,58 C6,40 6,20 8,8" color={c} sw={sw} op={op} />);
export const UnderlineShort = makeAsset("UnderlineShort", 80, 8, (c, sw, op) => <Stroke d="M4,4 C20,2 50,6 76,4" color={c} sw={sw} op={op} />);
export const UnderlineLong = makeAsset("UnderlineLong", 200, 8, (c, sw, op) => <Stroke d="M4,4 C50,2 100,6 150,4 C170,2 190,6 196,4" color={c} sw={sw} op={op} />);
export const DoubleUnderline = makeAsset("DoubleUnderline", 200, 12, (c, sw, op) => (
  <>
    <Stroke d="M4,4 C50,2 100,6 150,4 C170,2 190,6 196,4" color={c} sw={sw} op={op} />
    <Stroke d="M4,9 C50,7 100,11 150,9 C170,7 190,11 196,9" color={c} sw={sw * 0.7} op={op * 0.6} />
  </>
));
export const TripleUnderline = makeAsset("TripleUnderline", 200, 16, (c, sw, op) => (
  <>
    <Stroke d="M4,4 C50,2 100,6 150,4 C170,2 190,6 196,4" color={c} sw={sw} op={op} />
    <Stroke d="M4,8 C50,6 100,10 150,8 C170,6 190,10 196,8" color={c} sw={sw * 0.7} op={op * 0.7} />
    <Stroke d="M4,12 C50,10 100,14 150,12 C170,10 190,14 196,12" color={c} sw={sw * 0.6} op={op * 0.4} />
  </>
));
export const SideMarker = makeAsset("SideMarker", 8, 60, (c, sw, op) => <Stroke d="M4,4 C2,20 6,40 4,56" color={c} sw={sw} op={op} />);

// ─── ARROWS ────────────────────────────────────────────────────────────────────

export const ThinArrow = makeAsset("ThinArrow", 100, 30, (c, sw, op) => <><Stroke d="M4,15 L90,15" color={c} sw={sw} op={op} /><Stroke d="M80,7 L90,15 L80,23" color={c} sw={sw} op={op} /></>);
export const CurvedArrow = makeAsset("CurvedArrow", 100, 60, (c, sw, op) => <><Stroke d="M10,50 C20,20 50,10 80,20" color={c} sw={sw} op={op} /><Stroke d="M72,12 L80,20 L70,26" color={c} sw={sw} op={op} /></>);
export const LoopArrow = makeAsset("LoopArrow", 80, 80, (c, sw, op) => <><Stroke d="M10,40 C10,10 50,5 70,20 C80,30 80,55 60,70 C50,75 30,72 20,60" color={c} sw={sw} op={op} /><Stroke d="M18,68 L20,60 L28,64" color={c} sw={sw} op={op} /></>);
export const LongArrow = makeAsset("LongArrow", 200, 20, (c, sw, op) => <><Stroke d="M4,10 L188,10" color={c} sw={sw} op={op} /><Stroke d="M178,3 L188,10 L178,17" color={c} sw={sw} op={op} /></>);
export const PaperArrow = makeAsset("PaperArrow", 60, 60, (c, sw, op) => <><Stroke d="M10,50 L30,10 L50,50" color={c} sw={sw} op={op} /><Stroke d="M30,10 L30,50" color={c} sw={sw} op={op} /></>);
export const EditorialArrow = makeAsset("EditorialArrow", 100, 40, (c, sw, op) => <><Stroke d="M10,20 C30,10 60,30 90,20" color={c} sw={sw} op={op} /><Stroke d="M80,13 L90,20 L80,27" color={c} sw={sw} op={op} /></>);
export const UpwardArrow = makeAsset("UpwardArrow", 30, 80, (c, sw, op) => <><Stroke d="M15,70 L15,10" color={c} sw={sw} op={op} /><Stroke d="M7,20 L15,10 L23,20" color={c} sw={sw} op={op} /></>);
export const DownwardArrow = makeAsset("DownwardArrow", 30, 80, (c, sw, op) => <><Stroke d="M15,10 L15,70" color={c} sw={sw} op={op} /><Stroke d="M7,60 L15,70 L23,60" color={c} sw={sw} op={op} /></>);
export const DiagonalArrow = makeAsset("DiagonalArrow", 80, 80, (c, sw, op) => <><Stroke d="M10,70 L70,10" color={c} sw={sw} op={op} /><Stroke d="M58,18 L70,10 L62,22" color={c} sw={sw} op={op} /></>);
export const PointerArrow = makeAsset("PointerArrow", 60, 40, (c, sw, op) => <><Stroke d="M4,20 C20,12 40,28 56,20" color={c} sw={sw} op={op} /><Stroke d="M48,13 L56,20 L48,27" color={c} sw={sw} op={op} /></>);

// ─── LINES ─────────────────────────────────────────────────────────────────────

export const StraightLine = makeAsset("StraightLine", 200, 8, (c, sw, op) => <Stroke d="M4,4 L196,4" color={c} sw={sw} op={op} />);
export const BrokenLine = makeAsset("BrokenLine", 200, 20, (c, sw, op) => <Stroke d="M4,4 L40,4 M50,4 L90,4 M100,4 L140,4 M150,4 L196,4" color={c} sw={sw} op={op} />);
export const WaveLine = makeAsset("WaveLine", 200, 24, (c, sw, op) => <Stroke d="M4,12 C30,4 50,20 80,12 C110,4 130,20 160,12 C180,4 196,16 196,12" color={c} sw={sw} op={op} />);
export const ZigzagLine = makeAsset("ZigzagLine", 200, 24, (c, sw, op) => <Stroke d="M4,4 L30,20 L56,4 L82,20 L108,4 L134,20 L160,4 L186,20" color={c} sw={sw} op={op} />);
export const HandWaveLine = makeAsset("HandWaveLine", 200, 24, (c, sw, op) => <Stroke d="M4,12 C24,6 44,18 64,12 C84,6 104,18 124,12 C144,6 164,18 184,12 C192,8 196,14 196,12" color={c} sw={sw} op={op} />);
export const CurlLine = makeAsset("CurlLine", 80, 40, (c, sw, op) => <Stroke d="M10,30 C10,10 30,5 50,15 C60,20 65,30 60,38" color={c} sw={sw} op={op} />);
export const RibbonLine = makeAsset("RibbonLine", 200, 30, (c, sw, op) => <Stroke d="M4,15 C30,5 60,25 90,15 C120,5 150,25 180,15 C188,12 196,16 196,15" color={c} sw={sw} op={op} />);
export const Divider = makeAsset("Divider", 400, 4, (c, sw, op) => <Stroke d="M0,2 L400,2" color={c} sw={sw} op={op} />);
export const OrganicDivider = makeAsset("OrganicDivider", 400, 20, (c, sw, op) => <Stroke d="M0,10 C50,6 100,14 150,10 C200,6 250,14 300,10 C350,6 380,13 400,10" color={c} sw={sw} op={op} />);

// ─── STARS ─────────────────────────────────────────────────────────────────────

export const Sparkle = makeAsset("Sparkle", 40, 40, (c, sw, op) => <Stroke d="M20,4 L22,18 L36,20 L22,22 L20,36 L18,22 L4,20 L18,18 Z" color={c} sw={sw} op={op} />);
export const TinyStar = makeAsset("TinyStar", 16, 16, (c, sw, op) => <Stroke d="M8,2 L9,7 L14,8 L9,9 L8,14 L7,9 L2,8 L7,7 Z" color={c} sw={sw} op={op} />);
export const EditorialStar = makeAsset("EditorialStar", 60, 60, (c, sw, op) => <Stroke d="M30,4 L33,24 L52,18 L38,32 L52,46 L32,38 L30,56 L28,38 L8,46 L22,32 L8,18 L27,24 Z" color={c} sw={sw} op={op} />);
export const BurstStar = makeAsset("BurstStar", 50, 50, (c, sw, op) => <Stroke d="M25,4 L27,21 M25,4 L35,18 M25,4 L44,14 M25,4 L46,25 M25,4 L41,36 M25,4 L30,46 M25,4 L20,46 M25,4 L9,36 M25,4 L4,25 M25,4 L6,14 M25,4 L15,18" color={c} sw={sw} op={op} />);
export const Asterisk = makeAsset("Asterisk", 30, 30, (c, sw, op) => <Stroke d="M15,3 L15,27 M3,15 L27,15 M6,6 L24,24 M24,6 L6,24" color={c} sw={sw} op={op} />);
export const MinimalStar = makeAsset("MinimalStar", 40, 40, (c, sw, op) => <Stroke d="M20,6 L22,18 L34,20 L22,22 L20,34 L18,22 L6,20 L18,18 Z" color={c} sw={sw} op={op} />);

// ─── BURSTS ────────────────────────────────────────────────────────────────────

function makeBurst(n: number, cx: number, cy: number, r1: number, r2: number) {
  return (c: string, sw: number, op: number) => (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (Math.PI * 2 / n) * i;
        const wobble = (i % 3 - 1) * 0.8;
        return <Ln key={i} x1={cx + r1 * Math.cos(a) + wobble} y1={cy + r1 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a) + wobble} color={c} sw={sw} op={op} />;
      })}
    </>
  );
}

export const BurstSmall = makeAsset("BurstSmall", 40, 40, makeBurst(8, 20, 20, 6, 18));
export const BurstMedium = makeAsset("BurstMedium", 80, 80, makeBurst(12, 40, 40, 10, 36));
export const BurstLarge = makeAsset("BurstLarge", 120, 120, makeBurst(16, 60, 60, 14, 54));
export const RadialLines = makeAsset("RadialLines", 100, 100, (c, sw, op) => (
  <>
    {Array.from({ length: 20 }, (_, i) => {
      const a = (Math.PI * 2 / 20) * i;
      return <Ln key={i} x1={50} y1={50} x2={50 + 44 * Math.cos(a)} y2={50 + 44 * Math.sin(a)} color={c} sw={sw} op={op} />;
    })}
  </>
));
export const FocusLines = makeAsset("FocusLines", 80, 80, (c, sw, op) => (
  <>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI * 2 / 8) * i;
      return <Ln key={i} x1={40 + 20 * Math.cos(a)} y1={40 + 20 * Math.sin(a)} x2={40 + 36 * Math.cos(a)} y2={40 + 36 * Math.sin(a)} color={c} sw={sw} op={op} />;
    })}
  </>
));

// ─── CIRCLES ───────────────────────────────────────────────────────────────────

export const ImperfectCircle = makeAsset("ImperfectCircle", 80, 80, (c, sw, op) => <Stroke d="M40,8 C60,4 76,20 74,42 C72,64 56,76 36,72 C16,68 4,50 8,30 C12,10 26,4 40,8" color={c} sw={sw} op={op} />);
export const RoughCircle = makeAsset("RoughCircle", 80, 80, (c, sw, op) => <Stroke d="M40,6 C62,2 78,18 76,42 C74,66 56,78 34,74 C12,70 2,52 6,30 C10,8 24,2 40,6" color={c} sw={sw} op={op} />);
export const DoubleCircle = makeAsset("DoubleCircle", 90, 90, (c, sw, op) => (
  <>
    <Stroke d="M45,6 C68,2 84,20 82,44 C80,68 62,82 38,78 C14,74 2,54 6,32 C10,10 26,2 45,6" color={c} sw={sw} op={op} />
    <Stroke d="M45,12 C66,8 80,24 78,44 C76,64 60,76 38,72 C16,68 6,50 10,32 C14,14 30,8 45,12" color={c} sw={sw * 0.7} op={op * 0.5} />
  </>
));
export const TripleCircle = makeAsset("TripleCircle", 100, 100, (c, sw, op) => (
  <>
    <Stroke d="M50,6 C74,2 92,22 90,48 C88,74 68,90 44,86 C20,82 6,60 10,36 C14,12 32,2 50,6" color={c} sw={sw} op={op} />
    <Stroke d="M50,12 C72,8 88,26 86,48 C84,70 66,84 42,80 C18,76 8,56 12,36 C16,16 34,8 50,12" color={c} sw={sw * 0.7} op={op * 0.6} />
    <Stroke d="M50,18 C70,14 84,28 82,48 C80,68 62,80 40,76 C18,72 10,52 14,36 C18,20 36,14 50,18" color={c} sw={sw * 0.6} op={op * 0.35} />
  </>
));
export const OpenCircle = makeAsset("OpenCircle", 80, 80, (c, sw, op) => <Stroke d="M40,8 C60,4 76,20 74,42 C72,62 56,74 36,72" color={c} sw={sw} op={op} />);
export const BrushCircle = makeAsset("BrushCircle", 80, 80, (c, sw, op) => <Stroke d="M40,10 C62,4 78,22 76,44 C74,66 56,78 34,74 C12,70 4,50 8,30 C12,10 28,6 40,10" color={c} sw={sw * 1.3} op={op} />);

// ─── DOODLES ───────────────────────────────────────────────────────────────────

export const Spiral = makeAsset("Spiral", 60, 60, (c, sw, op) => <Stroke d="M30,30 C32,28 36,28 38,30 C40,32 40,36 38,38 C36,40 32,40 28,38 C24,36 22,30 24,26 C26,22 32,20 38,22 C44,24 48,30 46,38 C44,46 36,50 28,48 C20,46 14,38 16,30 C18,22 26,16 36,18" color={c} sw={sw} op={op} />);
export const Swirl = makeAsset("Swirl", 60, 60, (c, sw, op) => <Stroke d="M30,10 C45,10 55,22 52,36 C49,50 36,58 24,52 C12,46 8,32 14,22 C20,12 32,10 42,16" color={c} sw={sw} op={op} />);
export const PaperPlane = makeAsset("PaperPlane", 60, 50, (c, sw, op) => <><Stroke d="M4,40 L52,10 L44,48 L30,34 L20,44 Z" color={c} sw={sw} op={op} /><Stroke d="M30,34 L52,10" color={c} sw={sw} op={op} /></>);
export const PenStroke = makeAsset("PenStroke", 120, 20, (c, sw, op) => <Stroke d="M4,10 C20,6 40,14 60,10 C80,6 100,14 116,10" color={c} sw={sw * 1.3} op={op} />);
export const InkSplashSmall = makeAsset("InkSplashSmall", 40, 40, (c, sw, op) => <Stroke d="M20,20 C18,12 24,8 28,14 M20,20 C14,16 10,20 14,26 M20,20 C18,28 22,32 26,28 M20,20 C26,22 28,18 24,14" color={c} sw={sw} op={op} />);
export const InkSplashLarge = makeAsset("InkSplashLarge", 80, 80, (c, sw, op) => <Stroke d="M40,40 C36,24 44,16 52,28 M40,40 C24,32 18,40 26,52 M40,40 C36,56 42,64 50,56 M40,40 C50,44 56,36 48,26 M40,40 C44,24 36,18 28,26 M40,40 C56,44 60,52 50,58" color={c} sw={sw} op={op} />);
export const RibbonLoop = makeAsset("RibbonLoop", 100, 50, (c, sw, op) => <Stroke d="M10,25 C20,10 35,10 45,25 C55,40 70,40 80,25 C90,10 95,15 95,25" color={c} sw={sw} op={op} />);
export const InfinityLoop = makeAsset("InfinityLoop", 100, 40, (c, sw, op) => <Stroke d="M20,20 C20,10 35,10 50,20 C65,30 80,30 80,20 C80,10 65,10 50,20 C35,30 20,30 20,20" color={c} sw={sw} op={op} />);
export const CrossingLines = makeAsset("CrossingLines", 60, 60, (c, sw, op) => <><Stroke d="M4,4 L56,56" color={c} sw={sw} op={op} /><Stroke d="M56,4 L4,56" color={c} sw={sw} op={op} /></>);
export const TinyDots = makeAsset("TinyDots", 68, 68, (c, sw, op) => (
  <>
    {Array.from({ length: 8 }, (_, x) => Array.from({ length: 8 }, (__, y) => (
      <circle key={`${x}-${y}`} cx={x * 8 + 4} cy={y * 8 + 4} r={1.2} fill={c} opacity={op * 0.8} />
    )))}
  </>
));

// ─── PATTERNS ──────────────────────────────────────────────────────────────────

export const HandDotGrid = makeAsset("HandDotGrid", 200, 200, (c, _sw, op) => (
  <>
    {Array.from({ length: 16 }, (_, x) => Array.from({ length: 16 }, (__, y) => (
      <circle key={`${x}-${y}`} cx={x * 12 + 6} cy={y * 12 + 6} r={1} fill={c} opacity={op * 0.6} />
    )))}
  </>
));
export const EditorialGrid = makeAsset("EditorialGrid", 200, 200, (c, _sw, op) => (
  <>
    {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={(i + 1) * 20} y1={0} x2={(i + 1) * 20} y2={200} stroke={c} strokeWidth={0.5} opacity={op * 0.4} />)}
    {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1={0} y1={(i + 1) * 20} x2={200} y2={(i + 1) * 20} stroke={c} strokeWidth={0.5} opacity={op * 0.4} />)}
  </>
));
export const TinyCrossPattern = makeAsset("TinyCrossPattern", 200, 200, (c, _sw, op) => (
  <>
    {Array.from({ length: 14 }, (_, x) => Array.from({ length: 14 }, (__, y) => (
      <React.Fragment key={`${x}-${y}`}>
        <line x1={x * 14 + 7} y1={y * 14 + 4} x2={x * 14 + 7} y2={y * 14 + 10} stroke={c} strokeWidth={0.8} opacity={op * 0.5} />
        <line x1={x * 14 + 4} y1={y * 14 + 7} x2={x * 14 + 10} y2={y * 14 + 7} stroke={c} strokeWidth={0.8} opacity={op * 0.5} />
      </React.Fragment>
    )))}
  </>
));
export const OrganicLines = makeAsset("OrganicLines", 200, 200, (c, _sw, op) => (
  <>
    {Array.from({ length: 9 }, (_, y) => (
      <Stroke key={y} d={`M0,${y * 22 + 10} C50,${y * 22 + 4} 100,${y * 22 + 16} 150,${y * 22 + 10} C175,${y * 22 + 6} 200,${y * 22 + 14} 200,${y * 22 + 10}`} color={c} sw={0.7} op={op * 0.4} />
    ))}
  </>
));

// ─── HERO BACKGROUNDS ──────────────────────────────────────────────────────────

export const CornerDoodles = makeAsset("CornerDoodles", 200, 200, (c, sw, op) => (
  <>
    <Stroke d="M4,4 C20,4 40,8 60,4" color={c} sw={sw} op={op} />
    <Stroke d="M4,4 C4,20 8,40 4,60" color={c} sw={sw} op={op} />
    <Stroke d="M196,4 C180,4 160,8 140,4" color={c} sw={sw} op={op} />
    <Stroke d="M196,4 C196,20 192,40 196,60" color={c} sw={sw} op={op} />
    <Stroke d="M4,196 C20,196 40,192 60,196" color={c} sw={sw} op={op} />
    <Stroke d="M4,196 C4,180 8,160 4,140" color={c} sw={sw} op={op} />
    <Stroke d="M196,196 C180,196 160,192 140,196" color={c} sw={sw} op={op} />
    <Stroke d="M196,196 C196,180 192,160 196,140" color={c} sw={sw} op={op} />
  </>
));
export const EdgeDoodles = makeAsset("EdgeDoodles", 400, 400, (c, sw, op) => (
  <>
    <Stroke d="M0,200 C20,180 40,220 60,200 C80,180 100,220 120,200" color={c} sw={sw} op={op} />
    <Stroke d="M200,0 C180,20 220,40 200,60 C180,80 220,100 200,120" color={c} sw={sw} op={op} />
    <Stroke d="M400,200 C380,180 360,220 340,200 C320,180 300,220 280,200" color={c} sw={sw} op={op} />
    <Stroke d="M200,400 C180,380 220,360 200,340 C180,320 220,300 200,280" color={c} sw={sw} op={op} />
  </>
));
export const HeroAccentLeft = makeAsset("HeroAccentLeft", 200, 400, (c, sw, op) => (
  <>
    <Stroke d="M100,20 C60,40 20,80 40,140 C60,200 100,220 80,280 C60,340 20,360 40,390" color={c} sw={1.5} op={op} />
    <Stroke d="M80,20 C40,60 10,100 30,160 C50,220 80,240 60,300" color={c} sw={1.0} op={op * 0.5} />
  </>
));
export const HeroAccentRight = makeAsset("HeroAccentRight", 200, 400, (c, sw, op) => (
  <>
    <Stroke d="M100,20 C140,40 180,80 160,140 C140,200 100,220 120,280 C140,340 180,360 160,390" color={c} sw={1.5} op={op} />
    <Stroke d="M120,20 C160,60 190,100 170,160 C150,220 120,240 140,300" color={c} sw={1.0} op={op * 0.5} />
  </>
));
export const FloatingScribble = makeAsset("FloatingScribble", 120, 80, (c, sw, op) => <Stroke d="M10,40 C20,20 35,60 50,40 C65,20 80,60 95,40 C105,28 112,44 110,40" color={c} sw={sw} op={op} />);
export const PageDivider = makeAsset("PageDivider", 1440, 80, (c, _sw, op) => <Stroke d="M0,40 C180,28 360,52 540,40 C720,28 900,52 1080,40 C1260,28 1380,46 1440,40" color={c} sw={1.0} op={op} />);

// ─── EMPTY STATE ILLUSTRATIONS ─────────────────────────────────────────────────

export const EmptyNoCourses = makeAsset("EmptyNoCourses", 200, 160, (c, sw, op) => (
  <>
    <Stroke d="M100,20 L100,140" color={c} sw={sw} op={op} />
    <Stroke d="M100,20 C80,18 30,16 14,24 C10,26 10,30 14,130 C30,140 80,138 100,140" color={c} sw={sw} op={op} />
    <Stroke d="M100,20 C120,18 170,16 186,24 C190,26 190,30 186,130 C170,140 120,138 100,140" color={c} sw={sw} op={op} />
    <Stroke d="M24,50 L88,50" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M24,65 L88,65" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M24,80 L88,80" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M112,50 L176,50" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M112,65 L176,65" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M112,80 L176,80" color={c} sw={0.8} op={op * 0.5} />
  </>
));
export const EmptyNoSearchResults = makeAsset("EmptyNoSearchResults", 120, 120, (c, sw, op) => (
  <>
    <Stroke d="M50,10 C74,4 92,22 88,48 C84,74 64,88 40,82 C16,76 4,56 10,32 C16,8 36,2 50,10" color={c} sw={sw} op={op} />
    <Stroke d="M78,76 L108,108" color={c} sw={sw * 1.3} op={op} />
    <Stroke d="M30,40 C36,34 46,34 52,40" color={c} sw={1.0} op={op * 0.6} />
  </>
));
export const EmptyNoNotifications = makeAsset("EmptyNoNotifications", 100, 120, (c, sw, op) => (
  <>
    <Stroke d="M50,10 C35,10 28,22 28,38 C28,58 18,68 14,72 L86,72 C82,68 72,58 72,38 C72,22 65,10 50,10" color={c} sw={sw} op={op} />
    <Stroke d="M40,76 C40,84 44,90 50,90 C56,90 60,84 60,76" color={c} sw={sw} op={op} />
    <Stroke d="M46,10 C46,6 54,6 54,10" color={c} sw={1.2} op={op} />
  </>
));
export const EmptyNoMessages = makeAsset("EmptyNoMessages", 140, 120, (c, sw, op) => (
  <>
    <Stroke d="M10,10 C10,6 14,4 20,4 L120,4 C126,4 130,6 130,10 L130,70 C130,74 126,76 120,76 L50,76 L30,96 L30,76 L20,76 C14,76 10,74 10,70 Z" color={c} sw={sw} op={op} />
    <Stroke d="M30,28 L110,28" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M30,44 L90,44" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M30,60 L80,60" color={c} sw={0.8} op={op * 0.5} />
  </>
));
export const EmptyNoCertificates = makeAsset("EmptyNoCertificates", 180, 120, (c, sw, op) => (
  <>
    <Stroke d="M20,20 C20,12 26,8 36,8 L144,8 C154,8 160,12 160,20 L160,100 C160,108 154,112 144,112 L36,112 C26,112 20,108 20,100 Z" color={c} sw={sw} op={op} />
    <Stroke d="M40,36 L140,36" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M40,52 L140,52" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M60,70 C75,64 105,64 120,70 C115,78 80,82 60,70" color={c} sw={1.0} op={op * 0.6} />
    <Stroke d="M90,88 C98,82 108,84 110,92 C112,100 106,108 96,108 C86,108 80,100 84,92 C86,86 90,84 90,88" color={c} sw={1.0} op={op} />
  </>
));
export const EmptyNoNotes = makeAsset("EmptyNoNotes", 140, 160, (c, sw, op) => (
  <>
    <Stroke d="M20,20 L120,20 L120,150 L20,150 Z" color={c} sw={sw} op={op} />
    <Stroke d="M50,10 L50,30" color={c} sw={sw * 1.3} op={op} />
    <Stroke d="M70,10 L70,30" color={c} sw={sw * 1.3} op={op} />
    <Stroke d="M90,10 L90,30" color={c} sw={sw * 1.3} op={op} />
    <Stroke d="M35,55 L105,55" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M35,72 L105,72" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M35,89 L105,89" color={c} sw={0.8} op={op * 0.5} />
    <Stroke d="M35,106 L80,106" color={c} sw={0.8} op={op * 0.5} />
  </>
));
export const EmptyNoBookmarks = makeAsset("EmptyNoBookmarks", 100, 140, (c, sw, op) => <Stroke d="M20,10 L80,10 L80,130 L50,110 L20,130 Z" color={c} sw={sw} op={op} />);
export const EmptyNoDownloads = makeAsset("EmptyNoDownloads", 140, 120, (c, sw, op) => (
  <>
    <Stroke d="M50,60 C50,34 60,20 70,20 C72,20 74,20 76,22 C80,10 94,6 104,16 C114,10 128,16 128,28 C136,30 142,40 138,50 C134,60 124,64 112,62 L80,62 L50,62" color={c} sw={sw} op={op} />
    <Stroke d="M70,80 L70,110" color={c} sw={sw} op={op} />
    <Stroke d="M60,100 L70,110 L80,100" color={c} sw={sw} op={op} />
  </>
));
export const EmptyNoHistory = makeAsset("EmptyNoHistory", 120, 120, (c, sw, op) => (
  <>
    <Stroke d="M60,10 C88,4 108,24 106,52 C104,80 84,98 56,94 C28,90 10,68 14,40 C18,12 38,2 60,10" color={c} sw={sw} op={op} />
    <Stroke d="M60,30 L60,62 L82,76" color={c} sw={sw} op={op} />
  </>
));
export const EmptyOffline = makeAsset("EmptyOffline", 160, 120, (c, sw, op) => (
  <>
    <Stroke d="M40,70 C40,44 50,30 62,30 C64,30 66,30 68,32 C72,20 88,16 98,26 C110,18 126,26 124,40 C132,42 138,54 134,64 C130,74 118,78 106,76 L54,76 L40,70" color={c} sw={sw} op={op} />
    <Stroke d="M60,50 L100,70" color={c} sw={sw} op={op * 0.7} />
    <Stroke d="M100,50 L60,70" color={c} sw={sw} op={op * 0.7} />
  </>
));

// ─── CONVENIENCE GROUPED EXPORTS ───────────────────────────────────────────────

export const StatementWiggles = [
  StatementWiggle01, StatementWiggle02, StatementWiggle03, StatementWiggle04, StatementWiggle05,
  StatementWiggle06, StatementWiggle07, StatementWiggle08, StatementWiggle09, StatementWiggle10,
] as const;

export const StatementUnderlines = [
  StatementUnderline01, StatementUnderline02, StatementUnderline03, StatementUnderline04, StatementUnderline05,
  StatementUnderline06, StatementUnderline07, StatementUnderline08, StatementUnderline09, StatementUnderline10,
] as const;

export const EmptyStates = {
  NoCourses: EmptyNoCourses,
  NoSearchResults: EmptyNoSearchResults,
  NoNotifications: EmptyNoNotifications,
  NoMessages: EmptyNoMessages,
  NoCertificates: EmptyNoCertificates,
  NoNotes: EmptyNoNotes,
  NoBookmarks: EmptyNoBookmarks,
  NoDownloads: EmptyNoDownloads,
  NoHistory: EmptyNoHistory,
  Offline: EmptyOffline,
} as const;

export const Arrows = {
  ThinArrow, CurvedArrow, LoopArrow, LongArrow, PaperArrow,
  EditorialArrow, UpwardArrow, DownwardArrow, DiagonalArrow, PointerArrow,
} as const;

export const Lines = {
  StraightLine, BrokenLine, WaveLine, ZigzagLine, HandWaveLine,
  CurlLine, RibbonLine, Divider, OrganicDivider,
} as const;

export const Annotations = {
  HighlightCircle, HighlightOval, HighlightDoubleCircle, HighlightScribble,
  RoughRectangle, UnderlineShort, UnderlineLong, DoubleUnderline, TripleUnderline, SideMarker,
} as const;

// ─── AUTHENTICATION FLOW ILLUSTRATIONS ──────────────────────────────────────────

export const AuthTwig = makeAsset("AuthTwig", 60, 180, (c, sw, op) => (
  <>
    <Stroke d="M30,170 C30,130 25,80 40,10" color={c} sw={sw} op={op} />
    <Stroke d="M38,130 C48,125 52,115 50,105 C46,115 36,122 37,130 Z" color={c} sw={sw} op={op} />
    <Stroke d="M34,110 C20,105 16,95 22,85 C26,95 32,102 33,110 Z" color={c} sw={sw} op={op} />
    <Stroke d="M39,80 C50,75 52,65 48,55 C44,65 36,72 37,80 Z" color={c} sw={sw} op={op} />
    <Stroke d="M35,60 C22,55 18,45 24,35 C28,45 32,52 33,60 Z" color={c} sw={sw} op={op} />
    <Stroke d="M38,30 C45,25 48,15 44,8 C40,15 35,22 36,30 Z" color={c} sw={sw} op={op} />
  </>
));

export const AuthOpenBook = makeAsset("AuthOpenBook", 160, 120, (c, sw, op) => (
  <>
    <Stroke d="M80,100 C50,95 20,105 10,100 L10,30 C20,35 50,25 80,30" color={c} sw={sw} op={op} />
    <Stroke d="M80,100 C110,95 140,105 150,100 L150,30 C140,35 110,25 80,30" color={c} sw={sw} op={op} />
    <Stroke d="M80,30 L80,102" color={c} sw={sw + 0.5} op={op} />
    <Stroke d="M10,103 C20,108 50,98 80,103 C110,98 140,108 150,103" color={c} sw={sw} op={op * 0.5} />
    <Stroke d="M22,42 L70,39 M22,54 L70,51 M22,66 L70,63 M22,78 L70,75" color={c} sw={sw * 0.6} op={op * 0.4} />
    <Stroke d="M90,39 L138,42 M90,51 L138,54 M90,63 L138,66 M90,75 L138,78" color={c} sw={sw * 0.6} op={op * 0.4} />
  </>
));

export const AuthGradCap = makeAsset("AuthGradCap", 160, 130, (c, sw, op) => (
  <>
    <Stroke d="M30,110 L130,110 L130,120 L30,120 Z" color={c} sw={sw} op={op} />
    <Stroke d="M130,113 L145,113 M130,117 L140,117" color={c} sw={sw} op={op * 0.6} />
    <Stroke d="M35,95 L125,95 L125,107 L35,107 Z" color={c} sw={sw} op={op} />
    <Stroke d="M60,65 C60,50 100,50 100,65 Z" color={c} sw={sw} op={op} />
    <Stroke d="M80,35 L135,50 L80,65 L25,50 Z" color={c} sw={sw} op={op} />
    <Stroke d="M80,50 C65,52 50,65 52,78" color={c} sw={sw} op={op} />
    <circle cx={52} cy={78} r={3} fill={c} opacity={op} />
  </>
));

export const AuthLock = makeAsset("AuthLock", 140, 130, (c, sw, op) => (
  <>
    <Stroke d="M45,65 V45 C45,28 95,28 95,45 V65" color={c} sw={sw} op={op} />
    <Stroke d="M35,65 H105 C110,65 112,67 112,72 V110 C112,115 110,117 105,117 H35 C30,117 28,115 28,110 V72 C28,67 30,65 35,65 Z" color={c} sw={sw} op={op} />
    <circle cx={70} cy={85} r={4} fill={c} opacity={op} />
    <Stroke d="M70,89 L73,101 H67 Z" color={c} sw={sw} op={op} />
    <Stroke d="M20,40 C15,35 10,45 5,40" color={c} sw={sw * 0.8} op={op * 0.5} />
    <Stroke d="M120,45 C125,40 130,50 135,45" color={c} sw={sw * 0.8} op={op * 0.5} />
  </>
));

export const AuthEnvelope = makeAsset("AuthEnvelope", 150, 130, (c, sw, op) => (
  <>
    <Stroke d="M20,50 V110 H130 V50" color={c} sw={sw} op={op} />
    <Stroke d="M20,50 L75,20 L130,50" color={c} sw={sw} op={op} />
    <Stroke d="M20,110 L65,75 M130,110 L85,75" color={c} sw={sw} op={op * 0.7} />
    <Stroke d="M35,45 V25 C35,22 37,20 40,20 H110 C113,20 115,22 115,25 V45" color={c} sw={sw} op={op} />
    <circle cx={75} cy={35} r={8} fill="#10B981" opacity={op} />
    <Stroke d="M71,35 L74,38 L80,32" color="white" sw={1.5} op={op} />
  </>
));

export const AuthKey = makeAsset("AuthKey", 150, 120, (c, sw, op) => (
  <>
    <circle cx={40} cy={60} r={20} stroke={c} strokeWidth={sw} fill="none" opacity={op} />
    <circle cx={40} cy={60} r={8} stroke={c} strokeWidth={sw * 0.7} fill="none" opacity={op * 0.6} />
    <Stroke d="M60,60 L130,60" color={c} sw={sw} op={op} />
    <Stroke d="M110,60 V75 H120 V60" color={c} sw={sw} op={op} />
    <Stroke d="M123,60 V70 H130 V60" color={c} sw={sw} op={op} />
  </>
));

export const AuthSparkle = makeAsset("AuthSparkle", 30, 30, (c, sw, op) => (
  <Stroke d="M15,2 C15,10 10,15 2,15 C10,15 15,20 15,28 C15,20 20,15 28,15 C20,15 15,10 15,2" color={c} sw={sw} op={op} />
));
