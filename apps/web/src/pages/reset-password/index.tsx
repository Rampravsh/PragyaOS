import { useEffect } from 'react';
import ResetPasswordComp from '@/compositions/auth/ResetPasswordComp';

export function ResetPasswordPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Reset your password | PragyaOS';
  }, []);

  return <ResetPasswordComp />;
}

export default ResetPasswordPage;
