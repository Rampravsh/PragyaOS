import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FooterLink } from '../Navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      if (email.includes('error')) {
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    }, 800);
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Courses', to: '/courses' },
        { label: 'Features', to: '/features' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'Updates', to: '/updates' },
      ],
    },
    {
      title: 'For Instructors',
      links: [
        { label: 'Teach on PragyaOS', to: '/teach' },
        { label: 'Instructor Guide', to: '/guide' },
        { label: 'Resources', to: '/instructor-resources' },
        { label: 'Community', to: '/community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Careers', to: '/careers' },
        { label: 'Blog', to: '/blog' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', to: '/help' },
        { label: 'Docs', to: '/docs' },
        { label: 'Guides', to: '/guides' },
        { label: 'Status', to: '/status' },
      ],
    },
  ];

  return (
    <footer className="bg-paper-dark text-background-secondary py-16 border-t border-stone-850">
      <div className="container-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Branding block */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center space-x-2 shrink-0 select-none text-white">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 22C4 18 10 14 22 14C18 10 14 4 14 2C10 6 8 8 2 22Z" />
            </svg>
            <span className="font-heading text-h3 font-bold">PragyaOS</span>
          </Link>
          <p className="text-small text-text-muted max-w-sm leading-relaxed font-body">
            Empowering learners to find their own paths. A beautiful, handcrafted learning workspace designed for deep, meaningful studies.
          </p>
          {/* Social Icons Mockup */}
          <div className="flex space-x-4 text-text-muted">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links columns */}
        {footerLinks.map((column, idx) => (
          <div key={idx} className="space-y-3.5 col-span-1">
            <span className="text-caption font-semibold uppercase tracking-widest text-white font-body">
              {column.title}
            </span>
            <ul className="flex flex-col space-y-2">
              {column.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter mock form */}
        <div className="space-y-3.5 lg:col-span-2">
          <span className="text-caption font-semibold uppercase tracking-widest text-white font-body">
            Stay Updated
          </span>
          <p className="text-small text-text-muted leading-relaxed font-body">
            Get notes, feature highlights, and learning resources straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="space-y-2 select-none text-left">
            <div className="flex w-full items-center relative max-w-sm">
              <input
                required
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="bg-[#242427] border border-stone-800 focus:border-accent-gold/45 text-background-secondary text-small px-3.5 py-2.5 rounded-paper w-full focus:outline-none placeholder-text-muted/65"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-1 px-3 py-1.5 text-accent-gold hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Submit newsletter subscription"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
            {status === 'success' && (
              <p className="text-caption text-success font-semibold">Subscribed successfully! Welcome to PragyaOS.</p>
            )}
            {status === 'error' && (
              <p className="text-caption text-red-400 font-semibold">Could not coordinate subscription. Try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* Under footer details */}
      <div className="container-desktop border-t border-stone-850 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-caption text-text-muted font-body">
        <p>&copy; {currentYear} PragyaOS. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/security" className="hover:text-white transition-colors">Security Settings</Link>
        </div>
      </div>
    </footer>
  );
}
