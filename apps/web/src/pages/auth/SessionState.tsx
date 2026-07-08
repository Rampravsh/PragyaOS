import { useNavigate } from 'react-router-dom';
import { AuthCard, AuthHeader } from '@/components/auth';
import { Button } from '@/components/ui';
import { LogOut, ShieldAlert, ShieldX } from 'lucide-react';

export function SessionExpiredPage() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <div className="space-y-6 text-center font-body pt-4 select-none">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <AuthHeader title="Session Expired" desc="For security compliance, your authentication coordinates have been signed out." />
        <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
          Sign In Again &rarr;
        </Button>
      </div>
    </AuthCard>
  );
}

export function LoggedOutPage() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <div className="space-y-6 text-center font-body pt-4 select-none">
        <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center mx-auto border border-stone-200">
          <LogOut className="w-6 h-6" />
        </div>
        <AuthHeader title="Logged Out Successfully" desc="Your local session has been cleared. Thank you for studying with us." />
        <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
          Log Back In
        </Button>
      </div>
    </AuthCard>
  );
}

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <div className="space-y-6 text-center font-body pt-4 select-none">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border border-red-200">
          <ShieldX className="w-6 h-6" />
        </div>
        <AuthHeader title="Access Denied" desc="Your account credentials do not have permission to view this study path." />
        <div className="space-y-3">
          <Button variant="primary" className="w-full" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
            Sign in as another User
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
