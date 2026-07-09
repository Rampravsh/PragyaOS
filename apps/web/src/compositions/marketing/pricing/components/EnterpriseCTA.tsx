import React from "react";
import { Link } from "react-router";

export function EnterpriseCTA(): React.JSX.Element {
  return (
    <section className="py-16 bg-background border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-950 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-8 text-left">
            <span className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest block mb-3">
              Institutional Scale
            </span>
            <h3 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-stone-900 dark:text-white mb-4">
              Need custom pricing?
            </h3>
            <p className="font-sans text-stone-600 dark:text-stone-400 text-sm max-w-2xl mb-6 leading-relaxed">
              We offer bespoke agreements, volume licensing discounts, custom integrations, and
              dedicated SLAs for institutions, corporations, and schools.
            </p>

            {/* Target Sectors grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Schools", "Universities", "Companies", "Government"].map((sector, idx) => (
                <div
                  key={idx}
                  className="bg-muted border border-stone-200/60 dark:border-stone-800 rounded-lg p-2.5 text-center"
                >
                  <span className="font-sans text-xs font-semibold text-stone-750 dark:text-stone-300">
                    {sector}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: CTA */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end w-full">
            <Link
              to="/contact"
              className="w-full lg:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-sm border-2 border-stone-850 dark:border-stone-800 transition-all hover:scale-[1.01]"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EnterpriseCTA;
