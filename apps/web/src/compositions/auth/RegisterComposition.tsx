import { FormEvent, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthGradCap } from '@pragyaos/assets';
import { MailIcon, UserIcon } from '@pragyaos/icons';
import AuthLayout from '@/compositions/auth/AuthLayout';
import AuthInput from '@/compositions/auth/components/AuthInput';
import PasswordField from '@/compositions/auth/components/PasswordField';
import PasswordMeter from '@/compositions/auth/components/PasswordMeter';
import SocialButtons from '@/compositions/auth/components/SocialButtons';
import { ROUTES } from '@/routes/route.constants';

export function RegisterComposition(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state as { role?: string })?.role || 'student';
  const isInstructor = role === 'instructor';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms & Privacy Policy.');
      return;
    }

    setError('');
    setLoading(true);

    // Mock API Latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);

    // Navigate to verification screen with email and role state
    navigate(ROUTES.VERIFY_EMAIL, { state: { email, role } });
  };

  return (
    <AuthLayout
      illustration={AuthGradCap}
      title={
        isInstructor ? (
          <>
            Launch <span className="text-brand-gold font-serif italic">your</span> <br />
            instructor studio
          </>
        ) : (
          <>
            Create <span className="text-brand-gold font-serif italic">your</span> <br />
            account
          </>
        )
      }
      description={
        isInstructor
          ? "Design, publish, and scale your learning courses with full control."
          : "Start your journey of continuous learning."
      }
      bottomText={
        isInstructor
          ? "Join premium educators who trust PragyaOS."
          : "Join thousands of learners who trust PragyaOS."
      }
    >
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">
          {isInstructor ? "Join as an Instructor" : "Create your account"}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
          {isInstructor ? "Build courses and reach learners worldwide" : "Let's get you started"}
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
          id="register-name"
          label="Full name"
          type="text"
          required
          autoComplete="name"
          icon={UserIcon}
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AuthInput
          id="register-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          icon={MailIcon}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="register-password"
            label="Password"
            required
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordMeter value={password} />
        </div>

        <PasswordField
          id="register-confirm-password"
          label="Confirm password"
          required
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer text-xs font-sans font-medium text-stone-600 dark:text-stone-400 select-none mt-1">
          <input
            type="checkbox"
            required
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 text-[#10B981] focus:ring-[#10B981] mt-0.5"
          />
          <span className="leading-tight">
            I agree to the{' '}
            <a href="#" className="font-semibold text-brand-gold hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-brand-gold hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full mt-2 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-sm font-sans font-semibold text-white dark:text-stone-900 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          {loading ? (isInstructor ? 'Joining...' : 'Creating account...') : (isInstructor ? 'Join as Instructor' : 'Create account')}
        </button>

        {/* Social buttons */}
        <SocialButtons />

        {/* Footer link */}
        <p className="text-center text-xs text-stone-500 font-sans mt-3">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            state={{ role }}
            className="font-semibold text-stone-900 dark:text-white hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterComposition;
