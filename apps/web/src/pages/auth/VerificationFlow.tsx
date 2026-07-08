import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthCard, AuthHeader, AuthFooter, ErrorMessage, SuccessMessage, OTPInput } from '@/components/auth';
import { Button } from '@/components/ui';
import { Loader2, Mail, ShieldAlert } from 'lucide-react';
import { authService } from '@/services/auth';

/**
 * VerifyEmailPage - Pending, Success, Failed, and Expired email verification views
 */
export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status') || 'pending';
  const [status, setStatus] = useState<'pending' | 'success' | 'failed' | 'expired'>(statusParam as any);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');

  const handleResend = async () => {
    setResending(true);
    setResendSuccess('');
    try {
      await authService.forgotPassword('hello@pragyaos.org');
      setResendSuccess('A fresh verification coordinates link has been dispatched to your inbox.');
    } catch (err: any) {
      console.error(err);
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthCard>
      {status === 'pending' && (
        <div className="space-y-6 text-center font-body select-none pt-4">
          <div className="w-12 h-12 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center mx-auto border border-accent-gold/25 animate-pulse">
            <Mail className="w-6 h-6" />
          </div>
          <AuthHeader title="Verify your email" desc="We have sent a verification coordinate link to your email inbox." />
          {resendSuccess && <SuccessMessage message={resendSuccess} />}
          <div className="space-y-3">
            <Button variant="primary" className="w-full flex justify-center items-center py-2" onClick={handleResend} disabled={resending}>
              {resending ? 'Resending Link...' : 'Resend Verification Email'}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
              Back to Sign In
            </Button>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6 text-center font-body pt-4">
          <SuccessMessage message="Verification successful! Your email coordinates are now verified." />
          <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
            Proceed to Space
          </Button>
        </div>
      )}

      {status === 'failed' && (
        <div className="space-y-6 text-center font-body pt-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border border-red-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <AuthHeader title="Verification Failed" desc="The activation token is invalid or has already been consumed." />
          <Button variant="primary" className="w-full" onClick={() => setStatus('pending')}>
            Try Again
          </Button>
        </div>
      )}

      {status === 'expired' && (
        <div className="space-y-6 text-center font-body pt-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <AuthHeader title="Link Expired" desc="This verification coordinate link has expired. Token limits are 24 hours." />
          <Button variant="primary" className="w-full" onClick={handleResend}>
            Resend Fresh Token
          </Button>
        </div>
      )}
    </AuthCard>
  );
}

/**
 * MagicLinkPage - Mock waiting states
 */
export function MagicLinkPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'waiting';

  useEffect(() => {
    if (status === 'waiting') {
      const timer = setTimeout(() => {
        navigate('/identity/complete-profile');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <AuthCard>
      {status === 'waiting' && (
        <div className="space-y-6 text-center pt-6 pb-4 select-none font-body">
          <Loader2 className="w-10 h-10 text-accent-gold animate-spin mx-auto" />
          <AuthHeader title="Signing you in..." desc="Authenticating magic login coordinates. Please hold." />
        </div>
      )}
      {status === 'failed' && (
        <div className="space-y-6 text-center pt-4 font-body">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border border-red-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <AuthHeader title="Magic Link Failed" desc="The credentials token is invalid or has expired." />
          <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
            Back to Sign In
          </Button>
        </div>
      )}
    </AuthCard>
  );
}

/**
 * TwoFactorPage - Verification entry
 */
export function TwoFactorPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (code.length !== 6) {
      setErrorMsg('Code must be 6 digits.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        navigate('/dashboard');
      } else {
        setErrorMsg('Invalid 2FA code coordinates.');
      }
    }, 800);
  };

  return (
    <AuthCard>
      <AuthHeader title="Two-Factor Security" desc="Enter the 6-digit code coordinates sent to your device." />

      <form onSubmit={handleSubmit} className="space-y-6 font-body">
        <ErrorMessage message={errorMsg} />

        <OTPInput length={6} value={code} onChange={(val) => setCode(val)} />

        <div className="text-center text-caption select-none">
          <span className="text-text-muted font-body">Verification helper: enter </span>
          <span className="font-bold text-accent-gold">123456</span>
        </div>

        <Button type="submit" variant="primary" className="w-full py-2.5 mt-2 flex justify-center items-center animate-pulse" disabled={loading}>
          {loading ? 'Verifying 2FA...' : 'Submit Verification Code'}
        </Button>

        <AuthFooter text="Lost device?" actionText="Use Backup Code" onAction={() => alert('Recovery coords check.')} />
      </form>
    </AuthCard>
  );
}
