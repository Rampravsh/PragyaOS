import { Link } from 'react-router';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Classroom', href: '/product/classroom' },
      { label: 'Curriculums', href: '/product/curriculums' },
      { label: 'Integrations', href: '/product/integrations' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Security', href: '/platform/security' },
      { label: 'Infrastructure', href: '/platform/infra' },
      { label: 'Databases', href: '/platform/databases' },
      { label: 'Releases', href: '/platform/releases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Support Center', href: '/support' },
      { label: 'Status API', href: '/status' },
      { label: 'Systems Status', href: '/status/systems' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact Sales', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Security Policy', href: '/legal/security' },
      { label: 'Compliance Gate', href: '/legal/compliance' },
    ],
  },
];

/**
 * MarketingFooter: Production-ready editorial footer.
 * Features grid column mapping, newsletter forms, and social placeholders.
 */
export function MarketingFooter(): React.JSX.Element {
  return (
    <footer
      className="bg-background border-t border-border/80 py-12 md:py-16 lg:py-20 relative z-10 w-full"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Top Section: Navigation Links & Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 pb-12 border-b border-border/60 items-start">
          {/* Column Links mapping */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-foreground">
                {section.title}
              </span>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter subscription form column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
            <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-foreground">
              Subscribe to Updates
            </span>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Receive the latest releases, documentation guides, and platform updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border/80 hover:border-foreground/40 focus:border-primary px-3 py-1.5 text-xs font-sans rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 text-foreground"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground text-[10px] font-sans font-bold tracking-wider uppercase px-4 py-2 rounded-sm hover:opacity-hover transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Branding, Socials, & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-sans text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="font-bold tracking-wider uppercase text-foreground">
              PragyaOS
            </span>
            <span>&copy; {new Date().getFullYear()} PragyaOS. All rights reserved.</span>
          </div>

          {/* Social placeholders row */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="PragyaOS Twitter profile"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="PragyaOS GitHub repository"
            >
              GitHub
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="PragyaOS Discord server"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
