import React from 'react';
import { motion } from 'framer-motion';
import { buttonPress } from '@/utils/motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', leftIcon, rightIcon, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-small rounded-paper',
      md: 'px-5 py-2.5 text-button rounded-paper',
      lg: 'px-7 py-3 text-body rounded-paper',
    };

    const variantClasses = {
      primary: 'bg-text-primary text-background border border-text-primary hover:bg-text-secondary shadow-button',
      outline: 'bg-surface text-text-primary border border-border hover:bg-background-secondary shadow-button',
      text: 'text-text-primary hover:text-accent-gold',
      link: 'text-text-primary hover:text-accent-gold underline underline-offset-4 decoration-accent-gold/30 hover:decoration-accent-gold',
    };

    const isLinkOrText = variant === 'text' || variant === 'link';

    return (
      <motion.button
        ref={ref}
        variants={isLinkOrText ? undefined : buttonPress}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={`inline-flex items-center justify-center font-body font-semibold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-accent-gold disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...(props as any)}
      >
        {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = '', variant = 'outline', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'p-2 text-small rounded-paper',
      md: 'p-3 text-button rounded-paper',
      lg: 'p-4 text-body rounded-paper',
    };

    const variantClasses = {
      primary: 'bg-text-primary text-background border border-text-primary hover:bg-text-secondary shadow-button',
      outline: 'bg-surface text-text-primary border border-border hover:bg-background-secondary shadow-button',
      text: 'text-text-primary hover:text-accent-gold',
    };

    const isText = variant === 'text';

    return (
      <motion.button
        ref={ref}
        variants={isText ? undefined : buttonPress}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={`inline-flex items-center justify-center font-semibold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-accent-gold disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
