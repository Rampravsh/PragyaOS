import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@pragyaos/utils";
import { AuthSparkle, AuthTwig, AuthLock, AuthKey, AuthOpenBook } from "@pragyaos/assets";
import { AnimatedNavButton } from "@/components/marketing/shared/AnimatedNavLink";
import { DashboardIcon, BookIcon, PencilIcon, LayersIcon, UsersIcon } from "@pragyaos/icons";

const FEATURE_PREVIEWS = {
  ai: {
    title: "Meet your personal AI Mentor",
    description: "Learn faster with an AI tutor that adapts to your pace.",
    icon: AuthSparkle,
    features: ["AI Tutor", "AI Notes", "Flashcards", "Quiz Generator"],
    href: "/features/ai-learning",
    label: "Explore AI →",
    color: "#7C3AED",
    iconComponent: DashboardIcon,
  },
  experience: {
    title: "Interactive Learning",
    description: "Study through structured paths, practice sessions, quizzes, notes, certificates.",
    icon: AuthOpenBook,
    features: ["Course Player", "Progress Tracker", "Bookmarks Catalog", "Certificates Registry"],
    href: "/features/learning-experience",
    label: "Explore Experience →",
    color: "#2563EB",
    iconComponent: BookIcon,
  },
  tools: {
    title: "Create beautiful courses",
    description: "Manage students, assignments, analytics, certificates.",
    icon: AuthTwig,
    features: ["Course Builder", "Student Manager", "Assignments Hub", "Analytics Desk"],
    href: "/features/teaching-tools",
    label: "Explore Tools →",
    color: "#059669",
    iconComponent: PencilIcon,
  },
  organization: {
    title: "Enterprise LMS Workspace",
    description: "Employee training, departments, reports, compliance.",
    icon: AuthLock,
    features: [
      "Departments Manager",
      "Compliance Records",
      "Reports Dispatcher",
      "API Integrations",
    ],
    href: "/features/organization",
    label: "Explore Enterprise →",
    color: "#D97706",
    iconComponent: LayersIcon,
  },
  community: {
    title: "Discussions & Networking",
    description: "Groups, leaderboards, events, peer learning.",
    icon: AuthKey,
    features: ["Discussions Feed", "Groups Workspace", "Leaderboards Rank", "Peer Reviews Board"],
    href: "/features/community",
    label: "Explore Community →",
    color: "#BE185D",
    iconComponent: UsersIcon,
  },
} as const;

interface FeaturesDropdownProps {
  onClose: () => void;
}

export function FeaturesDropdown({ onClose }: FeaturesDropdownProps): React.JSX.Element {
  const [activePreview, setActivePreview] = useState<keyof typeof FEATURE_PREVIEWS>("ai");

  return (
    <div className="absolute top-full left-1/2 -translate-x-[45%] mt-2 w-[760px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl grid grid-cols-[260px_1fr] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Left Column: Categories List */}
      <div className="bg-stone-50/60 dark:bg-stone-950/20 p-4 flex flex-col justify-between border-r border-stone-100 dark:border-stone-800/80">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider px-2 mb-2">
            Features
          </span>
          {(Object.keys(FEATURE_PREVIEWS) as Array<keyof typeof FEATURE_PREVIEWS>).map((key) => {
            const isActive = activePreview === key;
            const labels = {
              ai: "AI Learning",
              experience: "Learning Experience",
              tools: "Teaching Tools",
              organization: "Organization",
              community: "Community",
            } as const;
            const Icon = FEATURE_PREVIEWS[key].iconComponent;

            return (
              <AnimatedNavButton
                key={key}
                isActive={isActive}
                onMouseEnter={() => setActivePreview(key)}
                onClick={() => onClose()}
                underlineVariant="random"
                circleVariant="random"
                className="text-left w-full px-3 py-2.5 text-xs font-sans"
                activeClassName="text-[#1C1917] dark:text-white font-semibold"
                inactiveClassName="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={14}
                    className={cn(
                      isActive ? "text-brand-gold" : "text-stone-450 dark:text-stone-500",
                    )}
                  />
                  <span>{labels[key]}</span>
                </div>
              </AnimatedNavButton>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60">
          <Link
            to="/features"
            onClick={onClose}
            className="block text-center text-xs font-sans font-semibold text-brand-gold hover:underline py-1.5"
          >
            View All Features →
          </Link>
        </div>
      </div>

      {/* Right Column: Dynamic Preview Box */}
      <div className="bg-white dark:bg-stone-900 p-6 flex flex-col justify-between overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePreview}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col h-full justify-between"
          >
            <div className="flex flex-col gap-4">
              {/* Illustration / Drawing */}
              <div className="w-full h-28 bg-background dark:bg-stone-950/40 rounded-xl flex items-center justify-center text-stone-400 border border-stone-100 dark:border-stone-800/60 p-4">
                {React.createElement(FEATURE_PREVIEWS[activePreview].icon, {
                  className: "h-20 w-auto object-contain",
                  color: FEATURE_PREVIEWS[activePreview].color,
                  strokeWidth: 1.5,
                })}
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white leading-tight">
                  {FEATURE_PREVIEWS[activePreview].title}
                </h3>
                <p className="font-sans text-xs text-stone-550 dark:text-stone-400 leading-normal">
                  {FEATURE_PREVIEWS[activePreview].description}
                </p>
              </div>

              {/* Mini Feature List */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                {FEATURE_PREVIEWS[activePreview].features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-1.5 text-[11px] font-sans text-stone-600 dark:text-stone-400"
                  >
                    <span className="text-emerald-500 font-bold">✔</span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800/60 flex justify-end">
              <Link
                to={FEATURE_PREVIEWS[activePreview].href}
                onClick={onClose}
                className="inline-flex items-center text-xs font-sans font-bold text-brand-gold hover:underline"
              >
                {FEATURE_PREVIEWS[activePreview].label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FeaturesDropdown;
