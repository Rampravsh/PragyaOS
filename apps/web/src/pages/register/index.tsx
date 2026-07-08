import { useEffect } from 'react';
import RegisterComposition from '@/compositions/auth/RegisterComposition';

export function RegisterPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Create your account | PragyaOS';
  }, []);

  return <RegisterComposition />;
}

export default RegisterPage;
