import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root composition provider component wrapping context providers in structural order:
 * ThemeProvider -> QueryProvider -> ReduxProvider.
 */
export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
