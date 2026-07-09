import React from "react";
import { EditorialHeadline, EditorialParagraph, EditorialCard, EditorialBadge, MarketingButton } from "@pragyaos/ui";
import { AuthGradCap, AuthSparkle } from "@pragyaos/assets";

interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
}

const OPENINGS: JobOpening[] = [
  { title: "Core LXP Engine Developer", department: "Engineering", location: "Bengaluru, IN / Remote", type: "Full-Time" },
  { title: "Curriculum UX Architect", department: "Design", location: "Remote", type: "Contract" },
  { title: "Technical Writer & Educator", department: "Content", location: "Remote", type: "Full-Time" },
];

export function CareersComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
        
        {/* Header with GradCap illustration */}
        <div className="flex flex-col gap-6 text-center items-center">
          <div className="text-brand-gold bg-brand-gold/10 p-4 rounded-full">
            <AuthGradCap className="w-12 h-12" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
            Join Our Journey
          </span>
          <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight max-w-xl">
            Build the future of learning systems.
          </EditorialHeadline>
          <EditorialParagraph lead className="max-w-2xl text-stone-600 dark:text-stone-300">
            We are a small, focused team of principal architects, designers, and systems engineers building a premium learning operating system.
          </EditorialParagraph>
        </div>

        {/* Listings */}
        <div className="flex flex-col gap-4 mt-6">
          <h2 className="font-serif font-semibold text-lg text-foreground mb-2 px-1">Open Positions</h2>
          {OPENINGS.map((job) => (
            <EditorialCard key={job.title} className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl transition-all duration-normal hover:border-brand-gold/40 hover:shadow-sm">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-wider">{job.department}</span>
                <h3 className="font-serif font-semibold text-base text-foreground leading-tight">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[11px] font-sans text-muted-foreground">{job.location}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <EditorialBadge variant="new" className="text-[9px] uppercase font-sans font-semibold tracking-wider">
                    {job.type}
                  </EditorialBadge>
                </div>
              </div>
              <MarketingButton variant="secondary" className="self-start sm:self-center font-sans font-semibold text-xs py-2 px-4 border border-border rounded-lg hover:bg-background text-foreground transition-all">
                Apply Now
              </MarketingButton>
            </EditorialCard>
          ))}
        </div>

        {/* Speculative Application Card */}
        <EditorialCard className="mt-8 p-6 bg-brand-gold/5 border border-brand-gold/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-brand-gold shrink-0">
              <AuthSparkle className="w-8 h-8 animate-spin-slow" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif font-bold text-sm text-foreground">Don&apos;t see your role?</h4>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-md">
                We are always looking for remarkable builders. Send us a speculative pitch outlining how you can accelerate our roadmap.
              </p>
            </div>
          </div>
          <MarketingButton variant="ghost" className="font-sans font-semibold text-xs py-2 px-4 rounded-lg hover:bg-brand-gold/10 text-brand-gold shrink-0">
            Write to Us
          </MarketingButton>
        </EditorialCard>
      </div>
    </div>
  );
}

export default CareersComposition;
