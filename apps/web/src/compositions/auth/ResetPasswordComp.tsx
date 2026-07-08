import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthKey } from '@pragyaos/assets';
import AuthLayout from '@/compositions/auth/AuthLayout';
import PasswordField from '@/compositions/auth/components/PasswordField';
import PasswordMeter from '@/compositions/auth/components/PasswordMeter';
import { ROUTES } from '@/routes/route.constants';

export function ResetPasswordComp(): React.JSX.Element {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    // Mock API Latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSuccess('Your password has been reset successfully!');

    // Redirect to Login page after 1.5 seconds
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 1500);
  };

  return (
    <AuthLayout
      illustration={AuthKey}
      title={
        <>
          Set a new <br />
          <span className="text-[#c79436] font-serif italic">password</span>
        </>
      }
      description="Choose a strong password to secure your account."
      bottomText="Your security is our priority."
    >
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
          Enter your new password below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-sans">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-sans">
            {success}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="reset-password-input"
            label="New password"
            required
            autoComplete="new-password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordMeter value={password} />
        </div>

        <PasswordField
          id="reset-confirm-password"
          label="Confirm password"
          required
          autoComplete="new-password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading || !!success}
          className="h-12 w-full mt-2 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-sm font-sans font-semibold text-white dark:text-stone-900 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          {loading ? 'Resetting password...' : 'Reset password'}
        </button>

        {/* Footer link */}
        <p className="text-center text-xs text-stone-500 font-sans mt-3">
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-[#c79436] hover:underline"
          >
            &lt; Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordComp;
