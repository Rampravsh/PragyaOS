import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/query/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider wraps the application with QueryClientProvider using the singleton queryClient.
 */
export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
