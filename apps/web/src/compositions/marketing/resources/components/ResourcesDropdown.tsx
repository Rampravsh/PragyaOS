import React from "react";
import { BookIcon } from "@pragyaos/icons";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

interface ResourcesDropdownProps {
  onClose: () => void;
}

export function ResourcesDropdown({ onClose }: ResourcesDropdownProps): React.JSX.Element {
  return (
    <div className="absolute top-full left-1/2 -translate-x-[65%] mt-2 w-[780px] bg-white dark:bg-stone-900 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-xl grid grid-cols-[1fr_240px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
      {/* Left Columns: Menu List */}
      <div className="p-6 grid grid-cols-3 gap-6 bg-white dark:bg-stone-900">
        {/* Column 1: Learn */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
            Learn
          </span>
          <div className="flex flex-col gap-1.5">
            <AnimatedNavLink
              to="/resources/blog"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Blog
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/blog?tab=tutorials"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-605 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Tutorials
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/blog?tab=guides"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-605 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Guides
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/blog?tab=hub"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-605 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Learning Hub
            </AnimatedNavLink>
          </div>
        </div>

        {/* Column 2: Documentation */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
            Documentation
          </span>
          <div className="flex flex-col gap-1.5">
            <AnimatedNavLink
              to="/resources/documentation"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Getting Started
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/documentation?topic=api"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              API Reference
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/documentation?topic=sdk"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              SDK Integration
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/documentation?topic=changelog"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Changelog
            </AnimatedNavLink>
          </div>
        </div>

        {/* Column 3: Community & Support */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
            Ecosystem
          </span>
          <div className="flex flex-col gap-1.5">
            <AnimatedNavLink
              to="/resources/community"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Discussions
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/community?tab=events"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Events
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/community?tab=standings"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors"
            >
              Leaderboard
            </AnimatedNavLink>
            <AnimatedNavLink
              to="/resources/help-center"
              onClick={onClose}
              underlineVariant="short"
              circleVariant="random"
              className="text-xs font-sans text-stone-655 dark:text-stone-400 hover:text-brand-gold py-1 px-1 rounded-lg transition-colors font-bold border-t border-stone-150 dark:border-stone-800 pt-2.5 mt-1"
            >
              Help Center
            </AnimatedNavLink>
          </div>
        </div>
      </div>

      {/* Right Column: Preview Panel */}
      <div className="bg-muted/60 p-6 border-l border-stone-150 dark:border-stone-800 flex flex-col justify-between">
        <div>
          {/* Notebook illustration overlay */}
          <div className="aspect-[16/10] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-3 flex flex-col justify-between shadow-sm mb-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-850 pb-1.5">
              <span className="text-[7px] font-sans font-bold text-stone-400 uppercase tracking-widest">
                Knowledge Hub
              </span>
              <BookIcon size={12} className="text-brand-gold" />
            </div>

            <div className="flex flex-col items-center my-2">
              <span className="text-[10px] font-serif font-bold text-stone-800 dark:text-stone-200 text-center">
                Everything you need to master PragyaOS.
              </span>
            </div>

            <span className="text-[6px] font-sans font-bold text-stone-400 text-center block">
              2 MIN READ • RECENTLY UPDATED
            </span>
          </div>
        </div>

        <div>
          <AnimatedNavLink
            to="/resources"
            onClick={onClose}
            underlineVariant="short"
            circleVariant="random"
            className="w-full inline-flex items-center justify-center py-2 bg-[#1C1917] hover:bg-black text-white hover:text-white dark:bg-white dark:text-stone-950 dark:hover:text-stone-950 font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg border border-stone-850"
          >
            Explore Hub &rarr;
          </AnimatedNavLink>
        </div>
      </div>
    </div>
  );
}

export default ResourcesDropdown;
