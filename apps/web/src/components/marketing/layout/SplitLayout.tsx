import React from 'react';
import { SplitLayout as PrimitiveSplit, SplitLayoutProps } from '@pragyaos/ui';

/**
 * SplitLayout defines columns dividing page content in standard ratios.
 * Reuses @pragyaos/ui SplitLayout primitive.
 */
export function SplitLayout(props: SplitLayoutProps): React.JSX.Element {
  return <PrimitiveSplit {...props} />;
}

export default SplitLayout;
