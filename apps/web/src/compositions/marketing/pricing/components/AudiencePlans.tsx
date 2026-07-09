import React from "react";
import { BookIcon, PencilIcon, LayersIcon } from "@pragyaos/icons";

interface PersonaCard {
  role: string;
  description: string;
  recommendedPlan: string;
  benefits: string[];
  icon: React.JSX.Element;
}

const PERSONAS: PersonaCard[] = [
  {
    role: "Student",
    description:
      "Get started with self-paced learning, interactive quizzes, and core AI tutor helpers.",
    recommendedPlan: "Starter (₹0/mo)",
    benefits: ["Core AI chat assistant", "2 active course slots", "Basic achievements track"],
    icon: <BookIcon size={24} className="text-brand-gold" />,
  },
  {
    role: "Instructor",
    description: "Build engaging courses, manage test grading, and host cohort learning paths.",
    recommendedPlan: "Pro (₹999/mo)",
    benefits: ["Unlimited course creations", "Cohort grading tools", "Earnings payouts portal"],
    icon: <PencilIcon size={24} className="text-brand-gold" />,
  },
  {
    role: "Organization",
    description:
      "Scale education across departments, universities, or corporate teams with admin control.",
    recommendedPlan: "Enterprise (Custom)",
    benefits: ["Active compliance audit logs", "SAML SSO single sign-on", "Dedicated support SLA"],
    icon: <LayersIcon size={24} className="text-brand-gold" />,
  },
];

export function AudiencePlans(): React.JSX.Element {
  return (
    <section className="py-16 bg-background border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white mb-4">
            Who is this plan for?
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 text-sm">
            Self-identify your role to find your perfect match.
          </p>
        </div>

        {/* Persona Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PERSONAS.map((p, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] flex flex-col justify-between"
            >
              {/* Card Top */}
              <div>
                <div className="w-12 h-12 rounded-xl bg-muted border border-stone-200 dark:border-stone-800 flex items-center justify-center mb-5">
                  {p.icon}
                </div>

                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white mb-3">
                  {p.role}
                </h3>
                <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                  {p.description}
                </p>

                {/* Benefits Bullet List */}
                <ul className="list-none m-0 p-0 flex flex-col gap-2.5 mb-6">
                  {p.benefits.map((ben, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-gold" />
                      <span className="font-sans text-stone-700 dark:text-stone-300 text-xs">
                        {ben}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation Callout Footer */}
              <div className="bg-muted p-3.5 rounded-xl border border-stone-200/50 dark:border-stone-800 text-center">
                <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-1">
                  Recommended Plan
                </span>
                <span className="text-xs font-sans font-bold text-stone-800 dark:text-stone-200">
                  {p.recommendedPlan}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AudiencePlans;
