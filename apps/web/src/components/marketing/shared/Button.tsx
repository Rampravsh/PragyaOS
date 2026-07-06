import React from 'react';
import {
  MarketingPrimaryButton,
  MarketingSecondaryButton,
  MarketingGhostButton,
  MarketingTextButton,
  MarketingButtonProps,
} from '@pragyaos/ui';

// Type alias matching original prop signatures
export type ButtonProps = Omit<MarketingButtonProps, 'variant'>;

/**
 * PrimaryButton: Main actionable item.
 * Wraps @pragyaos/ui MarketingPrimaryButton.
 */
export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MarketingPrimaryButton {...props} ref={ref} />
);
PrimaryButton.displayName = 'PrimaryButton';

/**
 * SecondaryButton: Outline border item.
 * Wraps @pragyaos/ui MarketingSecondaryButton.
 */
export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MarketingSecondaryButton {...props} ref={ref} />
);
SecondaryButton.displayName = 'SecondaryButton';

/**
 * GhostButton: Borderless, shifts on hover.
 * Wraps @pragyaos/ui MarketingGhostButton.
 */
export const GhostButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MarketingGhostButton {...props} ref={ref} />
);
GhostButton.displayName = 'GhostButton';

/**
 * TextButton: Underlined text button, hover scales off the underline.
 * Wraps @pragyaos/ui MarketingTextButton.
 */
export const TextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MarketingTextButton {...props} ref={ref} />
);
TextButton.displayName = 'TextButton';
