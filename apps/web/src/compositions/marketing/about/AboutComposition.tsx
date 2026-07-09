import React from "react";
import { EditorialHeadline, EditorialParagraph, EditorialCard } from "@pragyaos/ui";
import { AuthTwig, UnderlineShort } from "@pragyaos/assets";

export function AboutComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-16">
        
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12 items-center">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
              Our Mission
            </span>
            <div className="relative inline-block pb-3">
              <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight max-w-xl">
                Rebuilding the infrastructure of modular learning.
              </EditorialHeadline>
              <UnderlineShort className="absolute bottom-0 left-0 w-36 text-brand-gold" strokeWidth={2.5} />
            </div>
            <EditorialParagraph lead className="max-w-2xl text-stone-600 dark:text-stone-300">
              PragyaOS is designed from the ground up to empower developers, educators, and organizations to author, distribute, and track knowledge through clean, distraction-free modular systems.
            </EditorialParagraph>
          </div>
          
          {/* Decorative Twig Illustration */}
          <div className="hidden lg:flex justify-center text-brand-gold/60 dark:text-brand-gold/40">
            <AuthTwig className="h-44 w-auto transform rotate-12 animate-pulse" strokeWidth={1} />
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <EditorialCard className="p-8 bg-stone-50 dark:bg-stone-900/40 border border-border/80 rounded-xl">
            <h3 className="font-serif font-bold text-lg text-foreground mb-3">The Problem</h3>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Modern learning portals are cluttered with fragmented widgets, distracting notification feeds, and rigid course hierarchies. We believe that focus is the ultimate curriculum driver.
            </p>
          </EditorialCard>
          <EditorialCard className="p-8 bg-stone-50 dark:bg-stone-900/40 border border-border/80 rounded-xl">
            <h3 className="font-serif font-bold text-lg text-foreground mb-3">Our Vision</h3>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              By decoupling content structures, styling nodes, and analytics engines, PragyaOS provides a lightweight LXP shell that feels as fluid as reading an editorial magazine.
            </p>
          </EditorialCard>
        </div>

        {/* Culture Quote */}
        <div className="border-t border-b border-border py-10 text-center my-4 relative">
          <blockquote className="font-serif italic text-lg sm:text-xl text-stone-700 dark:text-stone-300 max-w-xl mx-auto">
            &ldquo;Learning isn&apos;t about accumulation. It is about distilling complexity into atomic blocks of progress.&rdquo;
          </blockquote>
          <cite className="block text-[10px] font-sans font-bold tracking-widest uppercase text-brand-gold mt-3 not-italic">
            — The Antigravity SaaS Team
          </cite>
        </div>
      </div>
    </div>
  );
}

export default AboutComposition;
