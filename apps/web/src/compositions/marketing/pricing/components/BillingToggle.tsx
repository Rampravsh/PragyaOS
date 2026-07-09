import React from "react";

interface BillingToggleProps {
  billingCycle: "monthly" | "yearly";
  onToggle: (cycle: "monthly" | "yearly") => void;
}

export function BillingToggle({ billingCycle, onToggle }: BillingToggleProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-10">
      <div className="relative inline-flex items-center gap-4 bg-white dark:bg-stone-950 p-2 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
        {/* Toggle Button: Monthly */}
        <button
          type="button"
          onClick={() => onToggle("monthly")}
          className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            billingCycle === "monthly"
              ? "bg-[#1C1917] text-white dark:bg-white dark:text-stone-950"
              : "text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          Monthly
        </button>

        {/* Toggle Button: Yearly */}
        <button
          type="button"
          onClick={() => onToggle("yearly")}
          className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            billingCycle === "yearly"
              ? "bg-[#1C1917] text-white dark:bg-white dark:text-stone-950"
              : "text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          Yearly
        </button>

        {/* Handwritten "Save 20%" Badge Callout */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
          {/* Hand Drawn Arrow */}
          <svg
            className="w-8 h-8 text-brand-gold hidden sm:block transform -rotate-12 translate-y-1"
            fill="none"
            viewBox="0 0 32 32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16 q10-12 20-4 M20 7 l4 5 l-5 3" />
          </svg>

          {/* Accent Badge */}
          <span className="px-3 py-1.5 bg-muted border-2 border-dashed border-brand-gold rounded-lg text-[10px] font-sans font-bold text-brand-gold uppercase tracking-wide rotate-3">
            Save 20%
          </span>
        </div>
      </div>
    </div>
  );
}

export default BillingToggle;
