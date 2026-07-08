import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthCard, AuthHeader, AuthFooter, AuthDivider, SocialLoginButtons, PasswordStrength, ErrorMessage } from '@/components/auth';
import { Input, Button, Checkbox } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Invalid email domain format.');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters.');

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: any) => {
    setErrorMsg('');
    
    // Zod parsing coordinate checks
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setErrorMsg(emailResult.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      await login(data.email, data.password);
      // Mock validation logic redirect checks
      const cached = localStorage.getItem('pragyaos_current_user');
      if (cached) {
        const user = JSON.parse(cached);
        if (user.profileCompleted) {
          navigate('/dashboard');
        } else {
          navigate('/identity/complete-profile');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification credentials refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Sign in to Space" desc="Enter your study coordinates to resume classes." />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
        <ErrorMessage message={errorMsg} />

        <div className="space-y-1">
          <Input
            label="Email Address"
            placeholder="name@pragyaos.org"
            {...register('email', { required: 'Email address is required.' })}
            error={errors.email?.message}
            className="pl-8"
          />
        </div>

        <div className="space-y-1 relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password', { required: 'Password credentials are required.' })}
            error={errors.password?.message}
            className="pl-8"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-text-muted hover:text-text-primary cursor-pointer p-1"
          >
            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
        </div>

        <div className="flex justify-between items-center text-caption select-none">
          <Checkbox label="Remember this coordinates" {...register('rememberMe')} />
          <button
            type="button"
            onClick={() => navigate('/auth/forgot-password')}
            className="text-accent-gold hover:text-text-primary transition-colors cursor-pointer underline underline-offset-2"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full flex justify-center items-center py-2.5 mt-2" disabled={loading}>
          {loading ? 'Logging in Study...' : 'Sign In &rarr;'}
        </Button>

        <AuthDivider />
        <SocialLoginButtons onClick={() => navigate('/auth/magic-link')} />

        <AuthFooter text="New to PragyaOS?" actionText="Create Account" onAction={() => navigate('/register')} />
      </form>
    </AuthCard>
  );
}

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', agree: false },
  });

  const onSubmit = async (data: any) => {
    setErrorMsg('');

    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setErrorMsg(emailResult.error.errors[0].message);
      return;
    }

    const passwordResult = passwordSchema.safeParse(data.password);
    if (!passwordResult.success) {
      setErrorMsg(passwordResult.error.errors[0].message);
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!data.agree) {
      setErrorMsg('You must agree to the learning guidelines.');
      return;
    }

    setLoading(true);
    try {
      await registerUser(data.email, data.name);
      navigate('/identity/complete-profile');
    } catch (err: any) {
      setErrorMsg(err.message || 'Account creation refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Join study space" desc="Create your account coordinates and start paths." />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
        <ErrorMessage message={errorMsg} />

        <div className="space-y-1">
          <Input
            label="Full Name"
            placeholder="Ananya Verma"
            {...formRegister('name', { required: 'Full name is required.' })}
            error={errors.name?.message}
          />
        </div>

        <div className="space-y-1">
          <Input
            label="Email Address"
            placeholder="ananya@pragyaos.org"
            {...formRegister('email', { required: 'Email address is required.' })}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-1 relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...formRegister('password', {
              required: 'Password is required.',
              onChange: (e) => setPasswordValue(e.target.value),
            })}
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-text-muted hover:text-text-primary cursor-pointer p-1"
          >
            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
        </div>

        {passwordValue && <PasswordStrength value={passwordValue} />}

        <div className="space-y-1">
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...formRegister('confirmPassword', { required: 'Please confirm password.' })}
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="text-caption select-none pt-1">
          <Checkbox
            label="I agree to follow the learning guidelines"
            {...formRegister('agree')}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full flex justify-center items-center py-2.5 mt-2" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register Path &rarr;'}
        </Button>

        <AuthDivider />
        <SocialLoginButtons onClick={() => navigate('/auth/magic-link')} />

        <AuthFooter text="Already coordinate registered?" actionText="Sign In" onAction={() => navigate('/login')} />
      </form>
    </AuthCard>
  );
}
