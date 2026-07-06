import { useEffect } from 'react';
import LoginComposition from '@/compositions/marketing/LoginComposition';

/**
 * Login Page entry controller.
 * Orchestrates: mounts LoginComposition and sets document title.
 */
export function LoginPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Login | PragyaOS';
  }, []);

  return <LoginComposition />;
}

export default LoginPage;
