import React, { useState } from 'react';
import { Button, PaperCard } from '@/components/ui';
import { DoodleStar, DoodleUnderline } from '@/components/ui/Doodles';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Check, HelpCircle, MapPin } from 'lucide-react';

/**
 * MarketingHero - Large page title banner block
 */
interface MarketingHeroProps {
  tag?: string;
  title: string;
  italicTitle?: string;
  desc: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export function MarketingHero({
  tag,
  title,
  italicTitle,
  desc,
  primaryCta,
  primaryHref = '#',
  secondaryCta,
  secondaryHref = '#',
}: MarketingHeroProps) {
  return (
    <Section bg="cream" spacing="lg" className="border-b border-border relative overflow-hidden select-none">
      <div className="absolute left-6 top-8 opacity-25 pointer-events-none">
        <DoodleStar className="w-10 h-10 text-accent-gold" />
      </div>
      <Container width="content" className="text-center space-y-6">
        {tag && (
          <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
            {tag}
          </span>
        )}
        <h1 className="text-display-xl font-heading text-text-primary leading-tight font-extrabold max-w-3xl mx-auto">
          {title}{' '}
          {italicTitle && (
            <span className="relative inline-block text-accent-gold font-bold italic">
              {italicTitle}
              <DoodleUnderline className="absolute bottom-0 left-0 w-full text-accent-gold/75" />
            </span>
          )}
        </h1>
        <p className="text-body-lg text-text-secondary leading-relaxed max-w-xl mx-auto font-body">
          {desc}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {primaryCta && (
            <Button variant="primary" size="lg" onClick={() => (window.location.href = primaryHref)}>
              {primaryCta}
            </Button>
          )}
          {secondaryCta && (
            <Button variant="outline" size="lg" onClick={() => (window.location.href = secondaryHref)}>
              {secondaryCta}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}



/**
 * LogoCloud - Monochrome grid of institutional logos
 */
export function LogoCloud() {
  const logos = ['Stanford', 'MIT', 'Harvard', 'Oxford', 'Berkeley'];
  return (
    <div className="py-10 border-y border-divider bg-background select-none text-center">
      <span className="text-caption font-semibold tracking-wider text-text-muted uppercase font-body block mb-6">
        Empowering learners across elite spaces
      </span>
      <div className="flex flex-wrap justify-center items-center gap-12 px-6">
        {logos.map((logo, idx) => (
          <span key={idx} className="font-heading text-h3 text-text-muted/60 font-extrabold hover:text-text-primary transition-colors cursor-default">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * ComparisonTable - Pricing tier details checklist matrix
 */
export function ComparisonTable({ items }: { items: { name: string; free: boolean; pro: boolean; enterprise: boolean }[] }) {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-paper bg-surface shadow-card p-6 select-none text-left">
      <table className="w-full text-small font-body">
        <thead>
          <tr className="border-b border-divider">
            <th className="py-4 font-heading font-bold text-text-primary">Feature Spec</th>
            <th className="py-4 font-heading font-bold text-center text-text-primary">Free Space</th>
            <th className="py-4 font-heading font-bold text-center text-accent-gold">Pro Path</th>
            <th className="py-4 font-heading font-bold text-center text-text-primary">Enterprise</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-divider">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-background-secondary/40 transition-colors">
              <td className="py-4 font-semibold text-text-primary">{item.name}</td>
              <td className="py-4 text-center">{item.free ? <Check className="w-4.5 h-4.5 text-success mx-auto" /> : '-'}</td>
              <td className="py-4 text-center">{item.pro ? <Check className="w-4.5 h-4.5 text-accent-gold mx-auto" /> : '-'}</td>
              <td className="py-4 text-center">{item.enterprise ? <Check className="w-4.5 h-4.5 text-accent-purple mx-auto" /> : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * FAQAccordion - List of expandable help questions
 */
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-2xl mx-auto select-none text-left">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="border border-border rounded-paper bg-surface overflow-hidden transition-shadow shadow-button hover:border-accent-gold/45">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full py-4.5 px-6 flex justify-between items-center text-body font-heading font-extrabold text-text-primary focus:outline-none cursor-pointer"
            >
              <span>{item.q}</span>
              <HelpCircle className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-accent-gold' : ''}`} />
            </button>
            {isOpen && (
              <div className="pb-4.5 px-6 border-t border-divider pt-3.5 text-small text-text-secondary leading-relaxed font-body">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * StatsGrid - Metric number blocks
 */
export function StatsGrid({ items }: { items: { val: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none">
      {items.map((item, idx) => (
        <PaperCard key={idx} variant="grid" className="p-6 text-center space-y-2 border border-border">
          <span className="text-display-lg font-heading font-extrabold text-accent-gold leading-none">
            {item.val}
          </span>
          <p className="text-caption font-semibold tracking-wider text-text-muted uppercase font-body block">
            {item.label}
          </p>
        </PaperCard>
      ))}
    </div>
  );
}

/**
 * TeamGrid - Profile display layout
 */
export function TeamGrid({ members }: { members: { name: string; role: string; bio: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left select-none">
      {members.map((member, idx) => (
        <PaperCard key={idx} variant="notebook" className="p-6 space-y-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold/15 text-accent-gold font-bold flex items-center justify-center">
              {member.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-body font-heading font-extrabold text-text-primary leading-none">{member.name}</h4>
              <span className="text-caption text-text-muted font-body mt-0.5 block">{member.role}</span>
            </div>
          </div>
          <p className="text-small text-text-secondary leading-relaxed font-body">
            {member.bio}
          </p>
        </PaperCard>
      ))}
    </div>
  );
}

/**
 * CareersGrid - Role list block
 */
export function CareersGrid({ roles }: { roles: { title: string; dept: string; loc: string }[] }) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto select-none text-left">
      {roles.map((role, idx) => (
        <PaperCard
          key={idx}
          variant="plain"
          className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-card transition-shadow border border-border bg-surface cursor-pointer group hover:border-accent-gold/45"
        >
          <div className="space-y-1">
            <h4 className="text-body-lg font-heading font-extrabold text-text-primary group-hover:text-accent-gold transition-colors">
              {role.title}
            </h4>
            <span className="text-caption text-text-muted font-body tracking-wider uppercase font-semibold">
              {role.dept}
            </span>
          </div>
          <div className="flex items-center text-caption text-text-secondary font-body font-semibold">
            <MapPin className="w-4 h-4 text-accent-gold mr-1.5" />
            <span>{role.loc}</span>
          </div>
        </PaperCard>
      ))}
    </div>
  );
}

/**
 * BlogCard - Article post preview card
 */
export function BlogCard({ to, title, category, author, date, desc }: { to: string; title: string; category: string; author: string; date: string; desc: string }) {
  return (
    <PaperCard
      variant="plain"
      className="p-6 flex flex-col justify-between h-72 hover:shadow-card hover:-translate-y-1 transition-all border border-border bg-surface text-left cursor-pointer"
      onClick={() => (window.location.href = to)}
    >
      <div className="space-y-3">
        <span className="text-[10px] font-bold text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-2 py-0.5 rounded-sm uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-h3 font-heading font-extrabold text-text-primary leading-tight hover:text-accent-gold transition-colors">
          {title}
        </h3>
        <p className="text-small text-text-muted leading-relaxed line-clamp-3 font-body">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center text-caption text-text-muted font-body pt-4 border-t border-divider">
        <span>By {author}</span>
        <span>{date}</span>
      </div>
    </PaperCard>
  );
}

/**
 * ResourceCard - Download guides card
 */
export function ResourceCard({ title, type, size, desc }: { title: string; type: string; size: string; desc: string }) {
  return (
    <PaperCard variant="grid" className="p-6 flex flex-col justify-between h-64 border border-border text-left">
      <div className="space-y-3">
        <span className="text-[10px] font-bold text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2 py-0.5 rounded-sm uppercase tracking-wider">
          {type}
        </span>
        <h3 className="text-body-lg font-heading font-extrabold text-text-primary leading-tight">
          {title}
        </h3>
        <p className="text-small text-text-muted leading-relaxed font-body">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-divider mt-4">
        <span className="text-caption text-text-muted font-body">{size}</span>
        <Button variant="text" size="sm" className="text-accent-gold hover:text-text-primary">
          Download PDF &rarr;
        </Button>
      </div>
    </PaperCard>
  );
}

/**
 * DocumentationSidebar - Sidebar links
 */
export function DocumentationSidebar({ topics, activePath, onSelect }: { topics: { category: string; articles: { label: string; path: string }[] }[]; activePath: string; onSelect: (path: string) => void }) {
  return (
    <aside className="w-64 border-r border-divider py-8 pr-6 flex flex-col space-y-6 text-left select-none shrink-0 font-body">
      {topics.map((topic, idx) => (
        <div key={idx} className="space-y-2">
          <span className="text-caption font-bold text-text-primary uppercase tracking-widest px-3 block">
            {topic.category}
          </span>
          <ul className="space-y-1">
            {topic.articles.map((art, aIdx) => {
              const isActive = activePath === art.path;
              return (
                <li key={aIdx}>
                  <button
                    type="button"
                    onClick={() => onSelect(art.path)}
                    className={`w-full text-left px-3 py-2 text-small font-semibold rounded-paper transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-background-secondary text-accent-gold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary/40'
                    }`}
                  >
                    {art.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}

/**
 * ContactForm - Form layout
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 border border-border bg-surface rounded-paper shadow-card text-center space-y-4">
        <DoodleStar className="w-12 h-12 text-accent-gold mx-auto animate-pulse" />
        <h4 className="text-h3 font-heading font-extrabold text-text-primary">Message Received!</h4>
        <p className="text-small text-text-secondary font-body max-w-sm mx-auto">
          Thank you for writing down your details. Our coordination team will follow up within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 border border-border bg-surface rounded-paper shadow-card space-y-5 text-left font-body">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-caption font-semibold text-text-secondary">First name</label>
          <input required type="text" className="w-full bg-background border border-border px-3 py-2 rounded-paper text-small" />
        </div>
        <div className="space-y-1">
          <label className="text-caption font-semibold text-text-secondary">Last name</label>
          <input required type="text" className="w-full bg-background border border-border px-3 py-2 rounded-paper text-small" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-caption font-semibold text-text-secondary">Email address</label>
        <input required type="email" className="w-full bg-background border border-border px-3 py-2 rounded-paper text-small" />
      </div>
      <div className="space-y-1">
        <label className="text-caption font-semibold text-text-secondary">Your Message</label>
        <textarea required rows={4} className="w-full bg-background border border-border px-3 py-2 rounded-paper text-small" />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Send message &rarr;
      </Button>
    </form>
  );
}

// Re-export modular marketing sub-components
export * from './Hero';
export * from './TrustedBy';
export * from './FeatureGrid';
export * from './LearningJourney';
export * from './AIShowcase';
export * from './AudienceCard';
export * from './Stats';
export * from './Testimonials';
export * from './CTA';
export * from './FAQ';
export * from './LogoStrip';
export * from './BackgroundIllustration';
export * from './DecorativeDivider';
export * from './FeatureHighlight';
export * from './SectionHeading';
export * from './FeatureCard';
