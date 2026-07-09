import React from "react";
import { BookIcon, SettingsIcon, UserIcon, LayersIcon } from "@pragyaos/icons";

interface HelpCatItem {
  title: string;
  count: string;
  description: string;
  icon: React.JSX.Element;
}

const CATEGORIES: HelpCatItem[] = [
  {
    title: "Account Settings",
    count: "12 articles",
    description:
      "Manage credentials, password resets, verification emails, and role registrations.",
    icon: <UserIcon size={20} className="text-brand-gold" />,
  },
  {
    title: "Billing & Invoices",
    count: "8 articles",
    description:
      "Upgrade subscriptions, cancel plans, download payment receipts, and pro-rata guidelines.",
    icon: <LayersIcon size={20} className="text-brand-gold" />,
  },
  {
    title: "Course Operations",
    count: "15 articles",
    description:
      "Enrolling in courses, cert validations, active annotation highlights, and note logs.",
    icon: <BookIcon size={20} className="text-brand-gold" />,
  },
  {
    title: "AI Integration",
    count: "10 articles",
    description: "Configuring LLM study bots, custom quiz inputs, and homework feedback systems.",
    icon: <SettingsIcon size={20} className="text-brand-gold" />,
  },
];

export function HelpCategories(): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
      {CATEGORIES.map((cat, idx) => (
        <div
          key={idx}
          className="group relative p-6 bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-muted border border-stone-200 dark:border-stone-800/80 flex items-center justify-center mb-4">
              {cat.icon}
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white mb-2">
              {cat.title}
            </h3>
            <p className="font-sans text-stone-550 dark:text-stone-400 text-xs leading-relaxed mb-4">
              {cat.description}
            </p>
          </div>

          <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
            {cat.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export default HelpCategories;
