import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationItem, NavigationDropdown } from '../Navigation';
import { MobileMenu } from '../MobileMenu';
import { Button } from '@/components/ui/Button';

export interface HeaderProps {
  sticky?: boolean;
  transparent?: boolean;
}

export function Header({ sticky = true, transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Monitor scroll height to adjust blur/border effects
  useEffect(() => {
    if (!sticky) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  const navItems = [
    { label: 'Courses', to: '/courses' },
    { label: 'For Instructors', to: '/instructors' },
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '/pricing' },
  ];

  const resourceDropdownItems = [
    { label: 'Blog', to: '/blog' },
    { label: 'Community', to: '/community' },
    { label: 'Documentation', to: '/docs' },
  ];

  const positionClass = sticky ? 'sticky top-0 z-40' : 'relative';
  
  const backgroundClass = isScrolled
    ? 'bg-surface/85 backdrop-blur-md border-b border-border shadow-navigation'
    : transparent
    ? 'bg-transparent'
    : 'bg-surface border-b border-border';

  return (
    <>
      <header className={`w-full transition-all duration-200 ${positionClass} ${backgroundClass}`}>
        <div className="container-desktop flex justify-between items-center py-4">
          {/* Logo / Branding */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 select-none">
            <svg
              className="w-7 h-7 text-text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 22C4 18 10 14 22 14C18 10 14 4 14 2C10 6 8 8 2 22Z" />
            </svg>
            <span className="font-heading text-h3 font-bold text-text-primary">
              PragyaOS
            </span>
          </Link>

          {/* Desktop Central Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <NavigationItem key={idx} to={item.to}>
                {item.label}
              </NavigationItem>
            ))}
            <NavigationDropdown label="Resources" items={resourceDropdownItems} />
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            {/* Mockup Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search study space..."
                readOnly
                className="bg-background border border-border px-3 py-1.5 pl-8 rounded-paper text-small font-body shadow-button placeholder-text-muted/65 focus:outline-none w-48 cursor-pointer hover:border-accent-gold/45"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="text-text-primary hover:text-accent-gold cursor-pointer p-1.5 transition-colors"
              aria-label="open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        items={[
          { label: 'Courses', to: '/courses' },
          { label: 'For Instructors', to: '/instructors' },
          { label: 'Features', to: '/features' },
          { label: 'Pricing', to: '/pricing' },
          { label: 'Blog', to: '/blog' },
          { label: 'Community', to: '/community' },
          { label: 'Documentation', to: '/docs' },
          { label: 'Log In', to: '/login' },
          { label: 'Register', to: '/register' },
        ]}
      />
    </>
  );
}
