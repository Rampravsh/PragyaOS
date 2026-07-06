import React from 'react';
import { AssetProps } from '@pragyaos/assets';
import { cn } from '@pragyaos/utils';

interface DecorativeAssetProps extends AssetProps {
  // Accepts a React component representing the hand-drawn asset
  asset: React.ComponentType<AssetProps>;
}

/**
 * DecorativeAsset wraps and styles hand-drawn SVG illustrations from @pragyaos/assets.
 * Prevents inline copy-pasting of raw SVGs, maintaining token control.
 */
export function DecorativeAsset({
  asset: AssetComponent,
  className,
  color = 'currentColor',
  strokeWidth = 1.5,
  opacity = 1,
  ariaLabel,
  ariaHidden = true,
}: DecorativeAssetProps): React.JSX.Element {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <AssetComponent
        color={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
        ariaLabel={ariaLabel}
        ariaHidden={ariaHidden}
      />
    </div>
  );
}

export default DecorativeAsset;
