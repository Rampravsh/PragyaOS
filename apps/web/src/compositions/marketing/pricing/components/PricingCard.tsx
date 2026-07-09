import React, { useState } from "react";
import { Link } from "react-router";
import { CloseIcon, CheckIcon } from "@pragyaos/icons";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

export interface PlanDetails {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  isCustom?: boolean;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
  perfectFor: string;
  extendedHighlights: string[];
}

interface PricingCardProps {
  plan: PlanDetails;
  billingCycle: "monthly" | "yearly";
}

export function PricingCard({ plan, billingCycle }: PricingCardProps): React.JSX.Element {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const currentPrice = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;

  return (
    <>
      <div className="relative group w-full">
        {/* Paper stack background offsets for the featured Pro card */}
        {plan.isPopular && (
          <>
            <div className="absolute inset-0 bg-muted border-2 border-stone-850 dark:border-stone-800 rounded-2xl transform rotate-2 translate-x-2.5 translate-y-2.5 pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-muted border-2 border-stone-850 dark:border-stone-800 rounded-2xl transform -rotate-1 translate-x-1 translate-y-1 pointer-events-none z-[2]" />
          </>
        )}

        {/* Main Card Container */}
        <div
          onClick={() => setIsDetailOpen(true)}
          className={`relative z-[10] flex flex-col p-8 rounded-2xl bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 transition-all duration-300 cursor-pointer select-none ${
            plan.isPopular
              ? "shadow-[6px_6px_0px_0px_rgba(199,148,54,0.9)] hover:shadow-[10px_10px_0px_0px_rgba(199,148,54,1)] hover:-translate-y-2"
              : "shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.12)] hover:-translate-y-1.5"
          }`}
        >
          {/* Popular Sticky Note / Star Badge */}
          {plan.isPopular && (
            <div className="absolute -top-3.5 -right-2 bg-yellow-100 dark:bg-yellow-950/60 border-2 border-stone-850 dark:border-stone-750 px-3 py-1.5 rounded-lg shadow-sm transform rotate-6 group-hover:-rotate-3 transition-transform duration-200 z-[12]">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-yellow-800 dark:text-yellow-400">
                ⭐ Most Popular
              </span>
            </div>
          )}

          {/* Plan Name & Meta */}
          <div className="mb-6">
            <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 min-h-[32px]">
              {plan.description}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="mb-6 pb-6 border-b border-stone-150 dark:border-stone-800 flex items-baseline gap-1">
            {plan.isCustom ? (
              <span className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white">
                Custom
              </span>
            ) : (
              <>
                <span className="font-serif font-bold text-4xl md:text-5xl text-stone-900 dark:text-white">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="font-sans text-xs text-stone-500 dark:text-stone-400">/month</span>
              </>
            )}
          </div>

          {/* Included Features Bullet Points */}
          <ul className="flex-1 list-none m-0 p-0 flex flex-col gap-3.5 mb-8">
            {plan.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckIcon size={15} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="font-sans text-stone-700 dark:text-stone-300 text-xs leading-relaxed">
                  {feat}
                </span>
              </li>
            ))}
          </ul>

          {/* Click hint */}
          <span className="block text-[10px] font-sans text-center text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4 hover:underline">
            Click to view full specs &rarr;
          </span>

          {/* CTA Link wrapper */}
          <div onClick={(e) => e.stopPropagation()}>
            <AnimatedNavLink
              to={plan.ctaLink}
              underlineVariant="short"
              circleVariant="random"
              className={`w-full inline-flex items-center justify-center py-3 px-5 font-sans font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-sm border-2 border-stone-850 dark:border-stone-800 transition-all ${
                plan.isPopular
                  ? "bg-[#1C1917] text-white hover:text-white dark:bg-white dark:text-stone-950 dark:hover:text-stone-950"
                  : "bg-white text-stone-900 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-100 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/80"
              }`}
            >
              {plan.ctaText}
            </AnimatedNavLink>
          </div>
        </div>
      </div>

      {/* Expanded Specifications Modal Sheet */}
      {isDetailOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsDetailOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 dark:hover:text-white p-1"
            >
              <CloseIcon size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-brand-gold block mb-1">
                Plan Highlights
              </span>
              <h2 className="font-serif font-bold text-3xl text-stone-900 dark:text-white mb-2">
                {plan.name}
              </h2>
              <p className="font-sans text-xs text-stone-500 dark:text-stone-400">
                Perfect for:{" "}
                <span className="font-bold text-stone-800 dark:text-stone-250">
                  {plan.perfectFor}
                </span>
              </p>
            </div>

            {/* Extended highlights */}
            <div className="mb-6 bg-muted p-4 rounded-xl border border-stone-200/50 dark:border-stone-800">
              <h4 className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide mb-2.5">
                Extended Capabilities
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {plan.extendedHighlights.map((high, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-brand-gold font-bold text-xs mt-0.5">•</span>
                    <p className="font-sans text-stone-600 dark:text-stone-355 text-xs leading-relaxed">
                      {high}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Features check-list */}
            <div className="mb-8">
              <h4 className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide mb-3">
                All Included Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-brand-gold shrink-0" />
                    <span className="font-sans text-stone-700 dark:text-stone-300 text-xs truncate">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2.5 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-sans text-stone-750 dark:text-stone-300 hover:border-stone-400"
              >
                Close details
              </button>
              <Link
                to={plan.ctaLink}
                className="px-6 py-2.5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center"
              >
                {plan.ctaText}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingCard;
