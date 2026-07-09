import { useEffect } from 'react';
import InstructorsComposition from '@/compositions/marketing/instructors/InstructorsComposition';

export function InstructorsPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'For Instructors | PragyaOS';
  }, []);

  return <InstructorsComposition />;
}

export default InstructorsPage;
