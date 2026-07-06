import { useEffect } from 'react';
import StudioComposition from '@/compositions/workspace/StudioComposition';

/**
 * Studio Page entry controller.
 * Orchestrates: mounts StudioComposition and sets document title.
 */
export function StudioPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Instructor Studio | PragyaOS';
  }, []);

  return <StudioComposition />;
}

export default StudioPage;
