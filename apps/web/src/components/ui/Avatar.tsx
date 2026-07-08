import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-caption border',
      md: 'w-10 h-10 text-small border',
      lg: 'w-14 h-14 text-body border-2',
    };

    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center rounded-full overflow-hidden border-background bg-background-secondary text-text-secondary font-semibold font-body select-none shadow-button shrink-0 ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover" />
        ) : (
          <span>{fallback || '?'}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex -space-x-3 items-center ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
