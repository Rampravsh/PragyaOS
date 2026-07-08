import React from 'react';
import { PaperCard, Button } from '@/components/ui';
import { DoodleStar } from '@/components/ui/Doodles';

/**
 * AuthCard - Standard notebook wrapper card for authenticators
 */
export function AuthCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="relative">
      {/* Decorative pushpin */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border border-red-750 shadow-button z-20 flex items-center justify-center pointer-events-none select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
      </div>
      <PaperCard variant="notebook" stack className={`p-8 pt-10 text-left ${className}`}>
        {children}
      </PaperCard>
    </div>
  );
}

/**
 * AuthHeader - Centered title descriptors
 */
export function AuthHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center space-y-2 mb-6 select-none">
      <h3 className="text-h3 font-heading font-extrabold text-text-primary">
        {title}
      </h3>
      <p className="text-caption text-text-muted leading-relaxed font-body">
        {desc}
      </p>
    </div>
  );
}

/**
 * AuthFooter - Link redirections
 */
export function AuthFooter({ text, actionText, onAction }: { text: string; actionText: string; onAction: () => void }) {
  return (
    <div className="text-center text-caption text-text-muted font-body pt-4 border-t border-divider select-none">
      <span>{text}</span>{' '}
      <button
        type="button"
        onClick={onAction}
        className="text-accent-gold hover:text-text-primary transition-colors cursor-pointer font-semibold underline underline-offset-2"
      >
        {actionText}
      </button>
    </div>
  );
}

/**
 * AuthDivider - Or separator
 */
export function AuthDivider() {
  return (
    <div className="flex items-center justify-center my-4 select-none">
      <span className="h-px bg-divider flex-1" />
      <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase px-3 font-body">OR</span>
      <span className="h-px bg-divider flex-1" />
    </div>
  );
}

/**
 * SocialLoginButtons - Mock provider options
 */
export function SocialLoginButtons({ onClick }: { onClick: (provider: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 select-none">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full flex items-center justify-center space-x-2 py-2"
        onClick={() => onClick('Google')}
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.85 5.85 0 018 12.667a5.85 5.85 0 015.99-5.851 5.67 5.67 0 013.99 1.62l3.14-3.14A9.87 9.87 0 0013.99 2 9.99 9.99 0 004 12c0 5.523 4.477 10 9.99 10 5.753 0 9.99-4.047 9.99-9.99 0-.6-.057-1.176-.171-1.725H12.24z"/>
        </svg>
        <span className="text-caption font-semibold">Google</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full flex items-center justify-center space-x-2 py-2"
        onClick={() => onClick('GitHub')}
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        <span className="text-caption font-semibold">GitHub</span>
      </Button>
    </div>
  );
}

/**
 * PasswordStrength - Displays password entropy blocks
 */
export function PasswordStrength({ value }: { value: string }) {
  const getStrength = () => {
    if (!value) return 0;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  };

  const score = getStrength();
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'bg-stone-200',
    'bg-red-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-success',
  ];

  return (
    <div className="space-y-1.5 select-none">
      <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-text-muted">
        <span>Password strength</span>
        {value && <span className="font-semibold text-text-primary">{strengthLabels[score - 1]}</span>}
      </div>
      <div className="grid grid-cols-4 gap-1 h-1.5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-colors duration-300 ${
              i < score ? colors[score] : 'bg-stone-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * OTPInput - Single mock input field with digit spaces
 */
export function OTPInput({ length = 6, value, onChange }: { length?: number; value: string; onChange: (val: string) => void }) {
  return (
    <div className="flex justify-between max-w-xs mx-auto gap-2 select-none">
      {[...Array(length)].map((_, i) => {
        const char = value[i] || '';
        return (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={char}
            readOnly
            className="w-10 h-12 bg-background border border-border rounded-paper text-center text-h3 font-heading font-bold focus:border-accent-gold/45 cursor-pointer shadow-button"
            onClick={() => {
              const code = prompt('Enter mockup OTP code coordinates (6 digits):');
              if (code && code.length === length) {
                onChange(code);
              }
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * ErrorMessage - Custom inline alert indicator
 */
export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-900 rounded-paper p-3 text-caption font-body flex items-start space-x-2.5">
      <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/**
 * SuccessMessage - Feedback completion panel
 */
export function SuccessMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-paper p-4 text-caption font-body space-y-4 text-center">
      <DoodleStar className="w-10 h-10 text-accent-gold mx-auto animate-pulse" />
      <p className="font-semibold leading-relaxed max-w-sm mx-auto">{message}</p>
    </div>
  );
}
