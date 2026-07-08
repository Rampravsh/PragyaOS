import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthLock } from '@pragyaos/assets';
import { MailIcon } from '@pragyaos/icons';
import AuthLayout from '@/compositions/auth/AuthLayout';
import AuthInput from '@/compositions/auth/components/AuthInput';
import { ROUTES } from '@/routes/route.constants';

export function ForgotPasswordComp(): React.JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setError('');
    setLoading(true);

    // Mock API Latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);

    // Navigate to Verify Email passing context
    navigate(ROUTES.VERIFY_EMAIL, { state: { email, fromForgot: true } });
  };

  return (
    <AuthLayout
      illustration={AuthLock}
      title={
        <>
          Forgot your <br />
          <span className="text-[#c79436] font-serif italic">password?</span>
        </>
      }
      description="No worries! It happens. Let's get you back."
      bottomText="A reset link will be sent to your email."
    >
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">
          Forgot password
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-sans">
            {error}
          </div>
        )}

        <AuthInput
          id="forgot-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          icon={MailIcon}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full mt-2 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-sm font-sans font-semibold text-white dark:text-stone-900 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          {loading ? 'Sending link...' : 'Send reset link'}
        </button>

        {/* Footer link */}
        <p className="text-center text-xs text-stone-500 font-sans mt-3">
          Remember your password?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-stone-900 dark:text-white hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordComp;
