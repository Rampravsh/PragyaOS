import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { LogoIcon } from '@pragyaos/icons';

// Footer column definitions matching the design exactly
const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Courses', href: '/courses' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Updates', href: '/updates' },
    ],
  },
  {
    title: 'For Instructors',
    links: [
      { label: 'Teach on PragyaOS', href: '/teach' },
      { label: 'Instructor Guide', href: '/teach/guide' },
      { label: 'Resources', href: '/teach/resources' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Docs', href: '/docs' },
      { label: 'Status', href: '/status' },
    ],
  },
];

// Social icon definitions
const SOCIAL_ICONS = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];


/**
 * MarketingFooter: Dark editorial footer matching the design exactly.
 *
 * TOP SECTION:
 *   - LEFT: PragyaOS logo + tagline + social icons (Twitter, YouTube, LinkedIn)
 *   - MIDDLE: 4 columns (Product | For Instructors | Company | Resources)
 *   - RIGHT: Email newsletter input + subscribe button
 *
 * BOTTOM BAR:
 *   - "© 2025 PragyaOS. All rights reserved." left
 *   - "Privacy | Terms | Security" links right
 */
export function MarketingFooter(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0C0C12] text-stone-400" aria-label="Footer">
      {/* Subtle top gradient line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.25), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[240px_repeat(4,1fr)_200px] gap-8 lg:gap-10 pb-10 border-b border-white/5">

          {/* Brand + tagline + social */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm"
              aria-label="PragyaOS homepage"
            >
              <LogoIcon size={18} className="text-white/80" />
              <span className="font-sans font-bold text-base tracking-tight">PragyaOS</span>
            </Link>

            <p className="text-xs text-stone-500 font-sans leading-relaxed max-w-[200px]">
              Empowering learners,<br />Enabling futures.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {SOCIAL_ICONS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  role="listitem"
                  className="w-7 h-7 rounded bg-white/5 border border-white/5 flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.93 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-stone-500">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[12px] font-sans text-stone-500 hover:text-stone-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm inline-block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter form */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-stone-500">
              Stay in the loop
            </span>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-stretch gap-2" aria-label="Newsletter signup">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white/5 border border-white/8 hover:border-white/15 focus:border-violet-400/40 rounded px-2.5 py-2 text-[11px] font-sans text-stone-300 placeholder-stone-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400/40 transition-colors"
                  aria-label="Email for newsletter"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-stone-300 rounded px-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Subscribe"
                >
                  {/* Arrow icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </form>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 font-sans"
              >
                ✓ You&apos;re subscribed!
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[11px] font-sans text-stone-600">
          <span>© {new Date().getFullYear()} PragyaOS. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Security'].map((link) => (
              <Link
                key={link}
                to={`/legal/${link.toLowerCase()}`}
                className="hover:text-stone-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
