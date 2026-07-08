import React from 'react';

export interface NavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ className = '', active = false, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`relative font-body text-navigation font-semibold text-text-primary hover:text-accent-gold transition-colors py-1.5 px-0.5 group cursor-pointer ${
          active ? 'text-accent-gold' : ''
        } ${className}`}
        {...props}
      >
        {children}
        {/* Animated active/hover underline */}
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-gold transform origin-left transition-transform duration-250 ease-out ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </a>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`font-body text-small text-text-muted hover:text-background-secondary transition-colors cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);

FooterLink.displayName = 'FooterLink';
