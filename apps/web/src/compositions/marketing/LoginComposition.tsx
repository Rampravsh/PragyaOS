import { FormEvent, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthOpenBook } from '@pragyaos/assets';
import { MailIcon } from '@pragyaos/icons';
import AuthLayout from '@/compositions/auth/AuthLayout';
import AuthInput from '@/compositions/auth/components/AuthInput';
import PasswordField from '@/compositions/auth/components/PasswordField';
import SocialButtons from '@/compositions/auth/components/SocialButtons';
import { ROUTES } from '@/routes/route.constants';

export function LoginComposition(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const role = (location.state as { role?: string })?.role || 'student';
  const isInstructor = role === 'instructor';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setLoading(true);

    // Mock API Latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    
    // Redirect based on email prefix or state role
    if (email.toLowerCase().includes('instructor') || isInstructor) {
      navigate(ROUTES.STUDIO);
    } else {
      navigate(ROUTES.PORTAL);
    }
  };

  return (
    <AuthLayout
      illustration={AuthOpenBook}
      title={
        <>
          Welcome back to <br />
          your <span className="text-brand-gold font-serif italic">learning space.</span>
        </>
      }
      description="Learn. Practice. Build. Achieve."
      bottomText="Your data is protected with enterprise-grade security."
    >
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">
          Log in to PragyaOS
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
          Continue your learning journey
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
          id="login-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          icon={MailIcon}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <PasswordField
            id="login-password"
            label="Password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex items-center justify-between text-xs font-sans font-medium mt-1">
            <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-[#10B981] focus:ring-[#10B981]"
              />
              <span>Remember me</span>
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-brand-gold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full mt-2 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-sm font-sans font-semibold text-white dark:text-stone-900 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {/* Social Logins */}
        <SocialButtons />

        {/* Footer Link */}
        <p className="text-center text-xs text-stone-500 font-sans mt-3">
          Don't have an account?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="font-semibold text-stone-900 dark:text-white hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginComposition;
