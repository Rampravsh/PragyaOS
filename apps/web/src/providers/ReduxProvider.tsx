import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/core/store/store';

interface ReduxProviderProps {
  children: ReactNode;
}

/**
 * ReduxProvider wraps the application with react-redux Provider mapping the core store.
 */
export function ReduxProvider({ children }: ReduxProviderProps): React.JSX.Element {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default ReduxProvider;
