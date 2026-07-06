import React from 'react';
import { FeatureGrid, FeatureGridProps } from '@pragyaos/ui';

/**
 * EditorialGrid compiles grid columns for marketing item compositions.
 * Reuses @pragyaos/ui FeatureGrid.
 */
export function EditorialGrid(props: FeatureGridProps): React.JSX.Element {
  return <FeatureGrid {...props} />;
}

export default EditorialGrid;
