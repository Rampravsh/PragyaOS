import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthCard, AuthHeader, SuccessMessage } from '@/components/auth';
import { Input, Button, Avatar } from '@/components/ui';
import { GraduationCap, Presentation, Building2, Shield, Check } from 'lucide-react';

export default function IdentityCompletionPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'organization' | 'support' | null>(null);
  const [avatarColor, setAvatarColor] = useState('bg-accent-gold');
  const [loading, setLoading] = useState(false);

  const handleNextStep = async () => {
    if (step === 1) {
      if (!name) return;
      setStep(2);
    } else if (step === 2) {
      if (!selectedRole) return;
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      try {
        await updateProfile({
          name,
          role: selectedRole || 'student',
          avatar: avatarColor,
          profileCompleted: true,
        });
        setStep(4);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const roles = [
    { id: 'student' as const, label: 'Student', desc: 'Study course lessons, submit notebook assignments.', icon: <GraduationCap className="w-5 h-5 text-accent-gold" /> },
    { id: 'instructor' as const, label: 'Instructor', desc: 'Publish interactive lessons, evaluate peers notebooks.', icon: <Presentation className="w-5 h-5 text-accent-blue" /> },
    { id: 'organization' as const, label: 'Organization', desc: 'Setup SSO domains, administer coordinate teams.', icon: <Building2 className="w-5 h-5 text-accent-purple" /> },
    { id: 'support' as const, label: 'Support Coordinator', desc: 'Coordinate help cases, support study rooms setup.', icon: <Shield className="w-5 h-5 text-success" /> },
  ];

  const colors = [
    { label: 'Gold', value: 'bg-accent-gold text-white' },
    { label: 'Blue', value: 'bg-accent-blue text-white' },
    { label: 'Purple', value: 'bg-accent-purple text-white' },
    { label: 'Emerald', value: 'bg-emerald-600 text-white' },
  ];

  return (
    <AuthCard>
      {/* Onboarding step headers */}
      <div className="flex justify-between items-center border-b border-divider pb-4 mb-6 select-none font-body text-caption font-semibold">
        <span className="text-text-muted">Setup onboarding</span>
        <span className="text-accent-gold">Step {step} of 4</span>
      </div>

      {step === 1 && (
        <div className="space-y-4 font-body text-left">
          <AuthHeader title="Complete Profile" desc="Tell us a little bit about your coordinate profile." />
          <div className="space-y-1">
            <Input
              label="Preferred Study Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-caption font-semibold text-text-secondary">Bio (Short description)</label>
            <textarea
              className="w-full bg-background border border-border px-3 py-2 rounded-paper text-small font-body shadow-button placeholder-text-muted/65 focus:outline-none focus:border-accent-gold/45"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A brief mention of what you are currently master studying..."
            />
          </div>
          <Button variant="primary" className="w-full mt-4" onClick={handleNextStep} disabled={!name}>
            Next: Choose Role &rarr;
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 font-body text-left select-none">
          <AuthHeader title="Choose Account Type" desc="Select your primary study coordinate role." />
          <div className="grid grid-cols-1 gap-3.5">
            {roles.map((r, idx) => {
              const isSelected = selectedRole === r.id;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRole(r.id)}
                  className={`border rounded-paper p-4 flex items-start space-x-3.5 cursor-pointer transition-all hover:border-accent-gold/45 ${
                    isSelected ? 'border-accent-gold bg-[#fefdfa] shadow-card' : 'border-border bg-surface'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                    {r.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-small font-heading font-extrabold text-text-primary leading-none">{r.label}</h4>
                    <p className="text-[10.5px] text-text-muted leading-relaxed font-body">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="primary" className="w-full mt-4" onClick={handleNextStep} disabled={!selectedRole}>
            Next: Configure Avatar &rarr;
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 font-body text-left select-none">
          <AuthHeader title="Configure Profile Avatar" desc="Choose a signature color indicator for comments and files." />
          
          <div className="flex flex-col items-center space-y-4 py-4">
            <Avatar fallback={name.charAt(0) || 'U'} className={`w-16 h-16 text-h3 font-heading font-extrabold shadow-card border-2 border-surface ${avatarColor}`} />
            <span className="text-caption font-bold text-text-primary uppercase tracking-widest">{name}</span>
          </div>

          <div className="space-y-2">
            <label className="text-caption font-semibold text-text-secondary block">Select signature color</label>
            <div className="grid grid-cols-4 gap-3.5">
              {colors.map((c, idx) => {
                const isSelected = avatarColor.includes(c.value.split(' ')[0]);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarColor(c.value)}
                    className={`h-9 rounded-paper border flex items-center justify-center cursor-pointer transition-colors ${c.value} ${
                      isSelected ? 'ring-2 ring-offset-2 ring-accent-gold border-transparent' : 'border-border'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <Button variant="primary" className="w-full mt-4 flex justify-center items-center" onClick={handleNextStep} disabled={loading}>
            {loading ? 'Saving Profile...' : 'Complete Profile Onboarding &rarr;'}
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 text-center font-body pt-4">
          <SuccessMessage message="Profile setup complete! Welcome to PragyaOS learning space." />
          <Button variant="primary" className="w-full mt-4 animate-pulse" onClick={() => navigate('/dashboard')}>
            Proceed to Dashboard
          </Button>
        </div>
      )}
    </AuthCard>
  );
}
