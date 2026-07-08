import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { AuthCard, AuthHeader, AuthFooter, ErrorMessage, SuccessMessage } from '@/components/auth';
import { Input, Button } from '@/components/ui';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: any) => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await authService.forgotPassword(data.email);
      setSuccessMsg(`We have sent a password recovery link to ${data.email}. Check your inbox.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Forgot password coordinates error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Recover Credentials" desc="Enter your email to request recovery coordinates." />

      {successMsg ? (
        <div className="space-y-6 pt-4">
          <SuccessMessage message={successMsg} />
          <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
          <ErrorMessage message={errorMsg} />

          <div className="space-y-1">
            <Input
              label="Email Address"
              placeholder="name@pragyaos.org"
              {...register('email', { required: 'Email address is required.' })}
              error={errors.email?.message}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5 mt-2 flex justify-center items-center" disabled={loading}>
            {loading ? 'Sending Recovery Link...' : 'Send Recovery Coordinates'}
          </Button>

          <AuthFooter text="Remembered your password?" actionText="Sign In" onAction={() => navigate('/login')} />
        </form>
      )}
    </AuthCard>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: any) => {
    setErrorMsg('');
    setSuccessMsg('');

    if (data.password !== data.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword();
      setSuccessMsg('Your password has been successfully reset. Log in with your new coordinates.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Reset password error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Reset Password" desc="Choose a new secure password coordinate." />

      {successMsg ? (
        <div className="space-y-6 pt-4">
          <SuccessMessage message={successMsg} />
          <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
            Sign In Now
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
          <ErrorMessage message={errorMsg} />

          <div className="space-y-1">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'New password is required.' })}
              error={errors.password?.message}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', { required: 'Please confirm new password.' })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-2.5 mt-2 flex justify-center items-center" disabled={loading}>
            {loading ? 'Updating Password...' : 'Reset Password &rarr;'}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
