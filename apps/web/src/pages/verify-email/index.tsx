import { useEffect } from 'react';
import VerifyEmailComp from '@/compositions/auth/VerifyEmailComp';

export function VerifyEmailPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Verify your email | PragyaOS';
  }, []);

  return <VerifyEmailComp />;
}

export default VerifyEmailPage;
