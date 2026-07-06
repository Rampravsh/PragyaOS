import { useEffect } from 'react';
import PortalComposition from '@/compositions/workspace/PortalComposition';

/**
 * Portal Page entry controller.
 * Orchestrates: mounts PortalComposition and sets document title.
 */
export function PortalPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Dashboard Portal | PragyaOS';
  }, []);

  return <PortalComposition />;
}

export default PortalPage;
