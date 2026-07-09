import React, { useState } from "react";
import { Link } from "react-router";
import { PricingHero } from "./components/PricingHero";
import { BillingToggle } from "./components/BillingToggle";
import { PricingCard, PlanDetails } from "./components/PricingCard";
import { ComparisonTable } from "./components/ComparisonTable";
import { AudiencePlans } from "./components/AudiencePlans";
import { PricingCalculator } from "./components/PricingCalculator";
import { EnterpriseCTA } from "./components/EnterpriseCTA";
import { PricingFAQ } from "./components/PricingFAQ";

const PLANS_DATA: PlanDetails[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Perfect for students getting started with core tools.",
    features: [
      "AI Tutor Assistant (Core)",
      "2 Active Course Slots",
      "Interactive Notebooks",
      "Public Study Forums",
      "Basic Achievements & Badges",
    ],
    ctaText: "Start Free",
    ctaLink: "/register",
    perfectFor: "Individual students and self-directed learners",
    extendedHighlights: [
      "Basic access to our generative AI study partner for definitions and key terms.",
      "Access to standard learning features, bookmarks, and organic dividers.",
      "Perfect to experiment with course platforms before committing to a plan.",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 999,
    priceYearly: 799,
    isPopular: true,
    description: "Tailored for independent learners and online instructors.",
    features: [
      "Unlimited AI Tutor Support",
      "Unlimited Active Courses",
      "Homework Helper Feedback",
      "Dynamic Quiz Generator",
      "Verifiable Course Certificates",
    ],
    ctaText: "Upgrade to Pro",
    ctaLink: "/register",
    perfectFor: "Educators, content creators, and professional builders",
    extendedHighlights: [
      "Full priority access to advanced LLM-powered tutor bots for active dialogue.",
      "Generate custom quizzes, mock test evaluations, and flashcards instantly.",
      "Unlock professional credentials upon successfully completing course milestones.",
    ],
  },
  {
    id: "team",
    name: "Team",
    priceMonthly: 2499,
    priceYearly: 1999,
    description: "Excellent for study circles, cohorts, and learning hubs.",
    features: [
      "Collaborative Team Boards",
      "Basic Cohort Analytics",
      "Shared Folder Annotations",
      "Centralized Group Billing",
      "SLA Support Response (12h)",
    ],
    ctaText: "Start Team Trial",
    ctaLink: "/register",
    perfectFor: "Study groups, student cohorts, and smaller bootcamps",
    extendedHighlights: [
      "Organize collaborative group studies with workspace sharing and real-time edits.",
      "Gain dashboard visibility into cohort progress, completion, and grade rates.",
      "Consolidate team invoices into a single monthly billing statement.",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 0,
    priceYearly: 0,
    isCustom: true,
    description: "Custom capabilities for institutions and companies.",
    features: [
      "Compliance Audits & SSO",
      "Advanced Business Analytics",
      "Dedicated Customer Success",
      "Bespoke SLAs & Integrations",
      "Unlimited Team Organization",
    ],
    ctaText: "Contact Sales",
    ctaLink: "/contact",
    perfectFor: "Large-scale universities, government, and enterprises",
    extendedHighlights: [
      "Verify access systems via enterprise SAML/SSO secure authentication rules.",
      "Generate bespoke learning pipelines, department structures, and analytics endpoints.",
      "Guaranteed priority support with dedicated account manager and uptime SLAs.",
    ],
  },
];

export function PricingComposition(): React.JSX.Element {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Hero Block */}
      <PricingHero />

      {/* 2. Billing Toggle Block */}
      <BillingToggle billingCycle={billingCycle} onToggle={setBillingCycle} />

      {/* 3. Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLANS_DATA.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
          ))}
        </div>
      </div>

      {/* 4. Cost Calculator */}
      <PricingCalculator billingCycle={billingCycle} />

      {/* 5. Feature Comparison Table */}
      <ComparisonTable />

      {/* 6. Who is this for Section */}
      <AudiencePlans />

      {/* 7. Enterprise CTA Banner */}
      <EnterpriseCTA />

      {/* 8. Frequently Asked Questions */}
      <PricingFAQ />

      {/* 9. Final Action Footer Block */}
      <section className="py-20 text-center bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white mb-6">
            Ready to start learning?
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Begin with a free trial or discover custom strategies with our education consultants.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Start Free
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500 font-sans font-medium text-stone-850 dark:text-stone-250 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingComposition;
