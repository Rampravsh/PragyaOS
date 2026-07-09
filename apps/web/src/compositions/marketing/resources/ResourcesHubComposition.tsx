import React from "react";
import { BookIcon, PencilIcon, LayersIcon, UsersIcon } from "@pragyaos/icons";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

interface HubCard {
  title: string;
  category: string;
  description: string;
  link: string;
  icon: React.JSX.Element;
  items: string[];
}

const CARDS: HubCard[] = [
  {
    title: "Learn & Magazine",
    category: "Learn",
    description:
      "Explore tech tutorials, guides, study success stories, and educational product insights.",
    link: "/resources/blog",
    icon: <BookIcon size={22} className="text-brand-gold" />,
    items: [
      "Editorial Blog",
      "Step-by-step Tutorials",
      "Practical Guides",
      "Learning Hub insights",
    ],
  },
  {
    title: "Developer Documentation",
    category: "Documentation",
    description:
      "Clean notebook-style integration specs, API endpoints, SDK setup, and architecture maps.",
    link: "/resources/documentation",
    icon: <PencilIcon size={22} className="text-brand-gold" />,
    items: ["Getting Started", "API reference keys", "SDK configurations", "Platform architecture"],
  },
  {
    title: "Help Center Support",
    category: "Support",
    description:
      "Searchable end-user guides covering payments, course enrollments, security settings, and FAQs.",
    link: "/resources/help-center",
    icon: <LayersIcon size={22} className="text-brand-gold" />,
    items: [
      "Payments guides",
      "Account settings FAQ",
      "Course certificates help",
      "System Status indicators",
    ],
  },
  {
    title: "Community Ecosystem",
    category: "Community",
    description:
      "Connect with study partners, check live events, share projects, and check leaderboards.",
    link: "/resources/community",
    icon: <UsersIcon size={22} className="text-brand-gold" />,
    items: [
      "General Discussions",
      "Showcase creations",
      "Live events feed",
      "Contributor Leaderboard",
    ],
  },
];

export function ResourcesHubComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest block mb-3">
            Knowledge Ecosystem
          </span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900 dark:text-white leading-[1.1] mb-6">
            Everything you need to master PragyaOS.
          </h1>
          <p className="font-sans text-stone-600 dark:text-stone-400 text-base md:text-lg leading-relaxed">
            Discover magazine stories, clean developer guides, client-side help indices, and join
            our active cohort study groups.
          </p>
        </div>

        {/* 4-Quadrant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className="group relative p-8 bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Category Pill Tag */}
                  <span className="px-3 py-1 bg-muted border border-stone-250 dark:border-stone-800 rounded-lg text-[10px] font-sans font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    {card.category}
                  </span>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-muted border border-stone-200 dark:border-stone-800/80 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>

                <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-white mb-3">
                  {card.title}
                </h2>
                <p className="font-sans text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Sub items */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {card.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-gold" />
                      <span className="font-sans text-stone-750 dark:text-stone-300 text-xs truncate">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <div>
                <AnimatedNavLink
                  to={card.link}
                  underlineVariant="short"
                  circleVariant="random"
                  className="w-full inline-flex items-center justify-center py-3 bg-[#1C1917] hover:bg-black text-white hover:text-white dark:bg-white dark:text-stone-950 dark:hover:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-sm border-2 border-stone-850 dark:border-stone-800"
                >
                  Explore &rarr;
                </AnimatedNavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourcesHubComposition;
