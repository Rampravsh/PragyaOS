import React, { useState } from 'react';
import AuthInput, { AuthInputProps } from './AuthInput';
import { EyeIcon, EyeOffIcon, LockIcon } from '@pragyaos/icons';

interface PasswordFieldProps extends Omit<AuthInputProps, 'type' | 'icon'> {
  // Can override properties if needed
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ id, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <AuthInput
          id={id}
          ref={ref}
          label={label}
          icon={LockIcon}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        
        {/* Toggle show/hide password visibility */}
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 bottom-3 flex items-center justify-center w-6 h-6 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] z-10"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
export default PasswordField;
