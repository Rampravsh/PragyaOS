import React from "react";
import { BookIcon } from "@pragyaos/icons";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

export function FeaturedStory(): React.JSX.Element {
  return (
    <div className="bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center text-left">
      {/* Visual Cover / Left column */}
      <div className="lg:col-span-5 relative group">
        <div className="absolute inset-0 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-xl transform rotate-2 pointer-events-none" />
        <div className="absolute inset-0 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/85 rounded-xl transform -rotate-1 pointer-events-none" />

        <div className="relative aspect-[4/3] w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 flex flex-col justify-between shadow-sm overflow-hidden">
          {/* Cover Header */}
          <div className="flex items-center justify-between border-b border-stone-150 dark:border-stone-800 pb-3">
            <span className="text-[9px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              PragyaOS Magazine
            </span>
            <BookIcon size={16} className="text-[#c79436]" />
          </div>

          {/* Cover Mid Sketch */}
          <div className="my-4 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 100 60"
              fill="none"
              stroke="currentColor"
              className="w-24 h-16 text-[#c79436]"
            >
              {/* Organic plant leaf sketch matching Logo style */}
              <path
                d="M50 50 C45 35 30 30 35 15 C40 5 60 5 65 15 C70 30 55 35 50 50 Z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M50 50 C48 42 42 38 38 38" strokeWidth="1" strokeLinecap="round" />
              <path d="M50 50 C52 42 58 38 62 38" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-sans font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide mt-2">
              Vol. 01 / Issue 02
            </span>
          </div>

          {/* Cover Footer */}
          <div className="text-[9px] font-sans font-bold text-stone-400 dark:text-stone-500 text-center">
            LEARNING SYSTEMS FOR MODERN BUILDERS
          </div>
        </div>
      </div>

      {/* Narrative details / Right column */}
      <div className="lg:col-span-7 flex flex-col items-start justify-center">
        {/* Category + Metadata Row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 bg-yellow-100 dark:bg-yellow-950/60 border border-yellow-250 dark:border-yellow-900 rounded-lg text-[9px] font-sans font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider">
            Featured Story
          </span>
          <span className="text-[10px] font-sans text-stone-400 dark:text-stone-500 font-medium">
            12 Min Read • Recently Updated
          </span>
        </div>

        <h3 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-stone-900 dark:text-white mb-4 leading-tight">
          How Generative AI is reshaping the cognitive layout of online learning.
        </h3>

        <p className="font-sans text-stone-600 dark:text-stone-400 text-xs md:text-sm mb-6 leading-relaxed">
          An in-depth editorial mapping cognitive loads, real-time agent systems, and why
          conventional LMS dashboards fail to adapt to student workflows. Learn how PragyaOS builds
          modular memory tracks.
        </p>

        {/* Author Spotlights */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-stone-200 border border-stone-350 flex items-center justify-center text-[10px] font-serif font-bold text-stone-700">
            RP
          </div>
          <div>
            <span className="block text-xs font-sans font-bold text-stone-850 dark:text-stone-250">
              Rampravesh Kumar
            </span>
            <span className="block text-[10px] font-sans text-stone-400">
              Lead Architect & Editor
            </span>
          </div>
        </div>

        <AnimatedNavLink
          to="/resources/blog/ai-cognitive-layout"
          underlineVariant="short"
          circleVariant="random"
          className="inline-flex items-center py-2.5 px-5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm border-2 border-stone-850 dark:border-stone-800"
        >
          Read Story &rarr;
        </AnimatedNavLink>
      </div>
    </div>
  );
}

export default FeaturedStory;
