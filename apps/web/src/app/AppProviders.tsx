import { ReactNode } from 'react';
import { Providers } from '@/providers/Providers';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders serves as the initialization bridge for global context providers inside the app namespace.
 */
export function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
  return <Providers>{children}</Providers>;
}

export default AppProviders;
