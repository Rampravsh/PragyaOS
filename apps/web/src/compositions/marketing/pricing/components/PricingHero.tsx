import React from "react";
import { Link } from "react-router";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

export function PricingHero(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-background border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading and description */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-brand-gold/30 mb-6">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-gold">
              Simple & Transparent
            </span>
          </div>

          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900 dark:text-white leading-[1.1] mb-6">
            Grow from a single learner to an entire{" "}
            <span className="relative inline-block">
              organization.
              <svg
                className="absolute left-0 -bottom-2 w-full h-2.5 text-brand-gold/40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q20,1 40,8 T80,3 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="font-sans text-stone-600 dark:text-stone-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            Choose a plan that fits your pace. No hidden contracts, no setup fees. Start building
            your knowledge system today.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <AnimatedNavLink
              to="/register"
              underlineVariant="short"
              circleVariant="random"
              className="inline-flex items-center px-6 py-3.5 bg-[#1C1917] hover:bg-black text-white hover:text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 dark:hover:text-stone-950 font-sans font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.98]"
            >
              Start Free
            </AnimatedNavLink>

            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3.5 border border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500 font-sans font-medium text-stone-850 dark:text-stone-250 rounded-xl text-sm transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Right Column: Premium Editorial Hand-Drawn Illustration */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Decorative backdrop paper stack */}
          <div className="absolute inset-0 bg-muted border border-stone-200/60 dark:border-stone-800 rounded-2xl transform rotate-2 translate-x-2 translate-y-2 pointer-events-none" />
          <div className="absolute inset-0 bg-muted border border-stone-200/50 dark:border-stone-800/80 rounded-2xl transform -rotate-1 pointer-events-none" />

          <div className="relative w-full max-w-[400px] aspect-[4/3] bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-lg flex items-center justify-center">
            {/* High fidelity SVG study desk money doodles */}
            <svg
              viewBox="0 0 400 300"
              fill="none"
              stroke="currentColor"
              className="w-full h-full text-stone-850 dark:text-stone-350"
            >
              {/* Receipt Doodle */}
              <path
                d="M50 40 h70 v180 l-10-8 l-10 8 l-10-8 l-10 8 l-10-8 l-10 8 l-10-8 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-stone-300 dark:text-stone-800"
              />
              <path
                d="M65 70 h40 M65 90 h40 M65 110 h30 M65 130 h35"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="text-stone-400"
              />

              {/* Notebook page stack */}
              <rect
                x="140"
                y="80"
                width="180"
                height="150"
                rx="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Spiral rings */}
              <path
                d="M160 70 v20 M185 70 v20 M210 70 v20 M235 70 v20 M260 70 v20 M285 70 v20 M310 70 v20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Notebook Content Grid */}
              <line
                x1="140"
                y1="120"
                x2="320"
                y2="120"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-stone-200 dark:text-stone-800"
              />
              <line
                x1="140"
                y1="150"
                x2="320"
                y2="150"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-stone-200 dark:text-stone-800"
              />
              <line
                x1="140"
                y1="180"
                x2="320"
                y2="180"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-stone-200 dark:text-stone-800"
              />
              <line
                x1="140"
                y1="210"
                x2="320"
                y2="210"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-stone-200 dark:text-stone-800"
              />

              {/* Calculator Doodle */}
              <rect
                x="80"
                y="150"
                width="80"
                height="110"
                rx="6"
                fill="white"
                className="fill-white dark:fill-stone-900"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Calculator screen */}
              <rect
                x="90"
                y="162"
                width="60"
                height="22"
                rx="3"
                stroke="currentColor"
                strokeWidth="1"
                className="text-stone-400"
              />
              <text
                x="96"
                y="178"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                fill="currentColor"
                className="text-brand-gold dark:text-brand-gold/90"
              >
                ₹ 0.-
              </text>
              {/* Calculator keys */}
              <circle cx="97" cy="202" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="112" cy="202" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="127" cy="202" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="142" cy="202" r="4" stroke="currentColor" strokeWidth="1" />

              <circle cx="97" cy="218" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="112" cy="218" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="127" cy="218" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="142" cy="218" r="4" stroke="currentColor" strokeWidth="1" />

              <circle cx="97" cy="234" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="112" cy="234" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="127" cy="234" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="142" cy="234" r="4" stroke="currentColor" strokeWidth="1" />

              {/* Hand Drawn Money doodles */}
              <g transform="translate(240, 100) rotate(15)" className="text-brand-gold">
                {/* Dollar/Rupee Bill sketch */}
                <rect
                  x="0"
                  y="0"
                  width="80"
                  height="42"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="40" cy="21" r="10" stroke="currentColor" strokeWidth="1" />
                <path d="M37 21 h6 M40 17 v8" stroke="currentColor" strokeWidth="1" />
                {/* Wavy line borders */}
                <path d="M5 5 q10-3 20 0 M5 37 q10 3 20 0" stroke="currentColor" strokeWidth="0.75" />
              </g>

              {/* Star sparkles */}
              <path
                d="M150 50 l3 6 l6 3 l-6 3 l-3 6 l-3-6 l-6-3 l6-3 z"
                fill="currentColor"
                className="text-brand-gold animate-pulse"
              />
              <path
                d="M310 240 l2 4 l4 2 l-4 2 l-2 4 l-2-4 l-4-2 l4-2 z"
                fill="currentColor"
                className="text-brand-gold opacity-75"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingHero;
