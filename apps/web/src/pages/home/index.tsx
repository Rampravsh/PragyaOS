import { useEffect } from 'react';
import HomeComposition from '@/compositions/marketing/HomeComposition';

/**
 * Home Page entry controller.
 * Orchestrates: mounts HomeComposition and sets document title.
 */
export function HomePage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Home | PragyaOS';
  }, []);

  return <HomeComposition />;
}

export default HomePage;
