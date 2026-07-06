/**
 * media/DecorativeAsset.tsx
 *
 * Dynamic asset renderer loading vector illustrations from @pragyaos/assets.
 * Allows consumers to import and render any doodle or ornament by string key names.
 */

import React from "react";
import * as Assets from "@pragyaos/assets";
import { cn } from "@pragyaos/utils";

export type AssetName = keyof typeof Assets;

interface DecorativeAssetProps {
  /** Key name matching an export from @pragyaos/assets */
  name: AssetName;
  className?: string;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export const DecorativeAsset: React.FC<DecorativeAssetProps> = ({
  name,
  className,
  color = "currentColor",
  strokeWidth,
  opacity,
  ariaLabel,
  ariaHidden = true,
}) => {
  // Extract asset dynamically
  const SVGComp = Assets[name];

  if (!SVGComp) {
    console.warn(`DecorativeAsset: Asset "${name}" was not found in @pragyaos/assets library.`);
    return null;
  }

  // Check if it is a component function or just a constant mapping
  if (typeof SVGComp !== "function") {
    return null;
  }

  const Comp = SVGComp as React.FC<any>;

  return (
    <div className={cn("inline-flex items-center justify-center select-none leading-[0]", className)}>
      <Comp
        color={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
        ariaLabel={ariaLabel}
        ariaHidden={ariaHidden}
      />
    </div>
  );
};

export default DecorativeAsset;
