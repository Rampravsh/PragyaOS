import React from "react";
import { EditorialHeadline, EditorialParagraph, EditorialCard, EditorialBadge } from "@pragyaos/ui";
import { AuthSparkle } from "@pragyaos/assets";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: string[];
}

const ENTRIES: ChangelogEntry[] = [
  {
    version: "v0.1.0",
    date: "July 9, 2026",
    title: "Initial Monorepo Release & Workspace Auth",
    description: "Successfully constructed the core architecture, layout systems, and authentication flow.",
    changes: [
      "Added role-based guards and token session handlers (student, instructor, admin, super admin)",
      "Implemented a dynamic topbar profile chip dropdown with quick session logouts",
      "Designed a responsive mega menu and mobile navigation drawer with conditional CTA updates",
      "Decoupled brand gold hex variables directly into theme presets and dynamic CSS color variables",
    ],
  },
];

export function ChangelogComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center items-center">
          <div className="text-brand-gold bg-brand-gold/10 p-4 rounded-full">
            <AuthSparkle className="w-10 h-10 animate-pulse" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
            Product Updates
          </span>
          <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight max-w-xl">
            Changelog & Releases
          </EditorialHeadline>
          <EditorialParagraph lead className="max-w-xl text-stone-600 dark:text-stone-300">
            Keep track of active releases, performance enhancements, and layout modules added to the PragyaOS ecosystem.
          </EditorialParagraph>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-8 mt-4 relative pl-6 border-l border-border/80">
          {ENTRIES.map((entry) => (
            <div key={entry.version} className="relative animate-fade-in">
              {/* Pulsing timeline dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-brand-gold flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </div>

              <EditorialCard className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-border/80 flex flex-col gap-3 rounded-xl hover:border-brand-gold/40 hover:shadow-sm transition-all duration-normal">
                <div className="flex items-center gap-3">
                  <EditorialBadge variant="info" className="bg-brand-gold/15 text-brand-gold hover:bg-brand-gold/20 font-sans font-bold tracking-wider text-[10px] uppercase">
                    {entry.version}
                  </EditorialBadge>
                  <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-foreground mt-1 leading-tight">
                  {entry.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                  {entry.description}
                </p>

                <ul className="list-disc pl-5 text-xs text-muted-foreground font-sans space-y-1.5 mt-2">
                  {entry.changes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </EditorialCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangelogComposition;
