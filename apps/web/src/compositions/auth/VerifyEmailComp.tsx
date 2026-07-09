import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthEnvelope } from '@pragyaos/assets';
import { AlertCircleIcon } from '@pragyaos/icons';
import AuthLayout from '@/compositions/auth/AuthLayout';
import { ROUTES } from '@/routes/route.constants';

export function VerifyEmailComp(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || 'your.email@example.com';
  const fromForgot = (location.state as { fromForgot?: boolean })?.fromForgot || false;

  const [loading, setLoading] = useState(false);
  const [sentMessage, setSentMessage] = useState('');

  const handleResend = async () => {
    setLoading(true);
    setSentMessage('');
    
    // Mock API Latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    setSentMessage('A new verification email has been sent!');
  };

  const handleProceed = () => {
    if (fromForgot) {
      navigate(ROUTES.RESET_PASSWORD);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <AuthLayout
      illustration={AuthEnvelope}
      title={
        <>
          Verify your <br />
          <span className="text-brand-gold font-serif italic">email</span>
        </>
      }
      description="Almost there! Please verify your email to continue."
      bottomText="Almost there! Please verify your email to continue."
    >
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
          We've sent a verification link to <br />
          <span className="font-semibold text-brand-gold break-all">{email}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sentMessage && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-sans">
            {sentMessage}
          </div>
        )}

        {/* Helpful Info Box */}
        <div className="p-4 rounded-xl border border-stone-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-stone-700 dark:text-stone-300">
            <AlertCircleIcon size={14} className="text-brand-gold" />
            <span>Didn't receive the email?</span>
          </div>
          <ul className="list-disc pl-4 text-xs font-sans text-stone-500 dark:text-stone-400 space-y-1">
            <li>Check your spam or promotions folder</li>
            <li>Make sure the email address is correct</li>
            <li>Click resend to get a new link</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="h-12 w-full mt-2 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-sm font-sans font-semibold text-white dark:text-stone-900 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          {loading ? 'Resending...' : 'Resend email'}
        </button>

        {/* Action simulator for interactive user walkthrough testing */}
        <button
          type="button"
          onClick={handleProceed}
          className="h-10 w-full flex items-center justify-center rounded-lg border border-dashed border-stone-300 dark:border-white/15 hover:bg-stone-50 dark:hover:bg-white/5 text-xs font-sans text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-all"
        >
          {fromForgot ? 'Simulate Link Click → Go to Reset Password' : 'Simulate Link Click → Go to Login'}
        </button>

        {/* Footer links */}
        <div className="flex justify-between items-center text-xs font-sans font-semibold mt-3 px-1">
          <Link to={ROUTES.LOGIN} className="text-brand-gold hover:underline">
            Change email address
          </Link>
          <Link to={ROUTES.LOGIN} className="text-stone-400 dark:text-stone-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default VerifyEmailComp;
