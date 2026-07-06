import React from 'react';
import { CenteredLayout as PrimitiveCentered, CenteredLayoutProps } from '@pragyaos/ui';

/**
 * CenteredLayout wraps components centered horizontally.
 * Reuses @pragyaos/ui CenteredLayout primitive.
 */
export function CenteredLayout(props: CenteredLayoutProps): React.JSX.Element {
  return <PrimitiveCentered {...props} />;
}

export default CenteredLayout;
