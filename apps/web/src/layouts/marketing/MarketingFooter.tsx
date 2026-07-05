/**
 * MarketingFooter
 * apps/web/src/layouts/marketing/MarketingFooter.tsx
 *
 * Footer wrapper component for public marketing pages.
 * Supports:
 * - Brand wordmark
 * - Configurable links columns
 * - Copyright & legal links
 * - Theme-conforming spacing and dividers
 */

import React from "react";
import { Link } from "react-router-dom";
import type { FooterColumn } from "./types";
import MarketingContainer from "./MarketingContainer";

interface MarketingFooterProps {
  columns?: FooterColumn[];
}

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Course Catalog", href: "/catalog" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ & Help", href: "/faq" },
      { label: "Community", href: "/community", external: true },
      { label: "Status", href: "https://status.pragyaos.com", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export const MarketingFooter: React.FC<MarketingFooterProps> = ({
  columns = defaultFooterColumns,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--background)] border-t border-[var(--border)] pt-[var(--spacing-16)] pb-[var(--spacing-8)] text-[var(--muted-foreground)]">
      <MarketingContainer variant="wide">
        {/* Top footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[var(--spacing-8)] mb-[var(--spacing-12)]">
          {/* Brand/Logo Column */}
          <div className="col-span-2 flex flex-col gap-[var(--spacing-4)] pr-0 lg:pr-[var(--spacing-12)]">
            <Link
              to="/"
              className="text-[var(--foreground)] no-underline font-serif text-[var(--text-xl)] font-semibold tracking-tighter"
            >
              Pragya<span className="font-sans font-light">OS</span>
            </Link>
            <p className="text-[var(--text-sm)] leading-relaxed max-w-[280px]">
              The Operating System for Modern Learning. Experience premium
              storytelling, advanced analytics, and curated learning pathways.
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-[var(--spacing-3)]">
              <h4 className="text-[var(--foreground)] font-serif text-[var(--text-sm)] font-medium tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-[var(--spacing-2)] list-none p-0 m-0 text-[var(--text-sm)]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--foreground)] transition-colors duration-[var(--duration-fast)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="hover:text-[var(--foreground)] transition-colors duration-[var(--duration-fast)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer bar */}
        <div className="pt-[var(--spacing-6)] border-t border-[var(--border)]/60 flex flex-col sm:flex-row justify-between items-center gap-[var(--spacing-4)] text-[var(--text-xs)]">
          <p>© {currentYear} PragyaOS Inc. All rights reserved.</p>
          
          <div className="flex gap-[var(--spacing-4)]">
            <a href="https://twitter.com/pragyaos" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              Twitter
            </a>
            <a href="https://github.com/pragyaos" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/company/pragyaos" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </MarketingContainer>
    </footer>
  );
};

export default MarketingFooter;
