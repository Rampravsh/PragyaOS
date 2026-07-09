import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { AuthProvider } from '@/providers/AuthProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root composition provider component wrapping context providers in structural order:
 * ThemeProvider -> QueryProvider -> ReduxProvider -> AuthProvider.
 */
export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
