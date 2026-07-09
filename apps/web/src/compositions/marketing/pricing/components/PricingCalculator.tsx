import React, { useState } from "react";
import { Link } from "react-router";

interface PricingCalculatorProps {
  billingCycle: "monthly" | "yearly";
}

export function PricingCalculator({ billingCycle }: PricingCalculatorProps): React.JSX.Element {
  const [seats, setSeats] = useState(25);

  // Cost calculations
  const costPerSeat = billingCycle === "yearly" ? 120 : 150;
  const estimatedCost = seats * costPerSeat;

  // Recommended plan label based on seat count
  const getRecommendation = (seatCount: number) => {
    if (seatCount <= 5) return "Starter / Pro Tier";
    if (seatCount <= 50) return "Team Tier (Recommended)";
    return "Enterprise Custom Plan";
  };

  return (
    <section className="py-16 bg-[#FAF7F2]/40 dark:bg-stone-900/10 border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Card wrapper */}
        <div className="bg-white dark:bg-stone-950 p-6 md:p-8 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)]">
          <div className="text-center mb-8">
            <span className="text-[10px] font-sans font-bold text-[#c79436] uppercase tracking-widest block mb-2">
              Cost Estimator
            </span>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-900 dark:text-white">
              Calculate your team cost
            </h3>
          </div>

          {/* Seat slider controls */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between">
              <label
                htmlFor="seats-range"
                className="font-sans text-xs font-bold text-stone-750 dark:text-stone-300 uppercase tracking-wide"
              >
                How many learners?
              </label>
              <div className="px-4 py-1.5 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg text-sm font-sans font-extrabold text-stone-900 dark:text-white">
                {seats} seats
              </div>
            </div>

            <input
              id="seats-range"
              type="range"
              min="1"
              max="250"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full accent-[#c79436] h-2 bg-stone-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-sans text-stone-400">
              <span>1 learner</span>
              <span>100 seats</span>
              <span>250 seats</span>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF7F2] dark:bg-stone-900/60 p-5 rounded-xl border border-stone-200/50 dark:border-stone-800 text-center md:text-left">
            <div>
              <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-1">
                Estimated Cost
              </span>
              <p className="font-serif font-bold text-3xl text-stone-900 dark:text-white">
                ₹{estimatedCost.toLocaleString("en-IN")}
                <span className="text-xs font-sans font-normal text-stone-500 dark:text-stone-450 ml-1">
                  /month
                </span>
              </p>
              <span className="text-[9px] font-sans text-stone-400 block mt-1">
                Billed {billingCycle === "yearly" ? "annually" : "monthly"}
              </span>
            </div>

            <div className="flex flex-col justify-center items-center md:items-end">
              <span className="text-[10px] font-sans font-bold text-stone-450 dark:text-stone-500 uppercase tracking-widest block mb-1">
                Recommendation
              </span>
              <span className="text-xs font-sans font-extrabold text-[#c79436] block mb-2">
                {getRecommendation(seats)}
              </span>
              {seats > 50 && (
                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-1.5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg"
                >
                  Contact Sales
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingCalculator;
