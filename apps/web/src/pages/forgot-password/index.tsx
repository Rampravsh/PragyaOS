import { useEffect } from 'react';
import ForgotPasswordComp from '@/compositions/auth/ForgotPasswordComp';

export function ForgotPasswordPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Forgot password | PragyaOS';
  }, []);

  return <ForgotPasswordComp />;
}

export default ForgotPasswordPage;
