import React, { useState } from "react";
import { cn } from "@pragyaos/utils";
import { useClickOutside } from "@pragyaos/hooks";
import { AnimatedNavLink, AnimatedNavButton } from "@/components/marketing/shared/AnimatedNavLink";
import { getMockCatalog } from "@/features/courses/api/mockCourses";
import { Category, SubTopic } from "@/features/courses/types/course.types";
import { FeaturesDropdown } from "@/compositions/marketing/features/FeaturesDropdown";
import { ResourcesDropdown } from "@/compositions/marketing/resources/components/ResourcesDropdown";
import { MARKETING_NAV_ITEMS } from "./nav.constants";

export function MarketingNavigation(): React.JSX.Element {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const catalog = getMockCatalog();
  const [activeCategory, setActiveCategory] = useState<Category>(catalog[0]);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic | null>(
    catalog[0]?.subTopics[0] || null,
  );

  const coursesRef = useClickOutside<HTMLLIElement>(() => setCoursesOpen(false));
  const featuresRef = useClickOutside<HTMLLIElement>(() => setFeaturesOpen(false));
  const resourcesRef = useClickOutside<HTMLLIElement>(() => setResourcesOpen(false));

  const handleCategoryHover = (cat: Category) => {
    setActiveCategory(cat);
    if (cat.subTopics.length > 0) {
      setActiveSubTopic(cat.subTopics[0]);
    } else {
      setActiveSubTopic(null);
    }
  };

  const difficultyColors = {
    BEGINNER: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    INTERMEDIATE: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    ADVANCED: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  };

  return (
    <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
      <ul className="flex items-center list-none m-0 p-0">
        {MARKETING_NAV_ITEMS.map((item) => {
          if (item.hasDropdown) {
            const isCourses = item.label === "Courses";
            const isFeatures = item.label === "Features";
            const isOpen = isCourses ? coursesOpen : isFeatures ? featuresOpen : resourcesOpen;
            const setOpen = isCourses
              ? setCoursesOpen
              : isFeatures
                ? setFeaturesOpen
                : setResourcesOpen;
            const ref = isCourses ? coursesRef : isFeatures ? featuresRef : resourcesRef;

            return (
              <li key={item.label} ref={ref} className="relative">
                <AnimatedNavButton
                  isActive={isOpen}
                  onClick={() => setOpen(!isOpen)}
                  underlineColor={item.color}
                  circleColor={item.circleColor}
                  underlineVariant={item.underlineVariant}
                  circleVariant={item.circleVariant}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  className="flex items-center gap-1"
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={cn("transition-transform duration-150", isOpen ? "rotate-180" : "")}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </AnimatedNavButton>

                {/* Dropdown Menu Panels */}
                {isOpen &&
                  (isCourses ? (
                    /* ── 3-Column Premium Mega Menu for Courses ── */
                    <div className="absolute top-full left-1/2 -translate-x-[45%] mt-2 w-[760px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl grid grid-cols-[210px_210px_1fr] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Column 1: Main Categories */}
                      <div className="bg-stone-50/60 dark:bg-stone-950/20 p-4 flex flex-col gap-1 border-r border-stone-100 dark:border-stone-800/80">
                        <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider px-2 mb-2">
                          Categories
                        </span>
                        {catalog.map((cat) => (
                          <AnimatedNavButton
                            key={cat.id}
                            isActive={activeCategory.id === cat.id}
                            onMouseEnter={() => handleCategoryHover(cat)}
                            underlineVariant="random"
                            circleVariant="random"
                            className="text-left w-full px-3 py-2.5 text-xs font-sans"
                            activeClassName="text-[#1C1917] dark:text-white font-semibold"
                            inactiveClassName="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                          >
                            {cat.name}
                          </AnimatedNavButton>
                        ))}
                      </div>

                      {/* Column 2: Sub-Topics */}
                      <div className="bg-white dark:bg-stone-900 p-4 flex flex-col gap-1 border-r border-stone-100 dark:border-stone-800/80">
                        <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider px-2 mb-2">
                          Topics
                        </span>
                        {activeCategory.subTopics.map((sub) => (
                          <AnimatedNavButton
                            key={sub.id}
                            isActive={activeSubTopic?.id === sub.id}
                            onMouseEnter={() => setActiveSubTopic(sub)}
                            underlineVariant="random"
                            circleVariant="random"
                            className="text-left w-full px-3 py-2.5 text-xs font-sans"
                            activeClassName="text-[#1C1917] dark:text-white font-semibold"
                            inactiveClassName="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                          >
                            {sub.name}
                          </AnimatedNavButton>
                        ))}
                      </div>

                      {/* Column 3: Courses List */}
                      <div className="bg-stone-50/20 dark:bg-stone-950/10 p-4 flex flex-col gap-2.5 overflow-y-auto max-h-[380px]">
                        <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider px-1 mb-1">
                          Available Courses
                        </span>
                        {activeSubTopic && activeSubTopic.courses.length > 0 ? (
                          activeSubTopic.courses.map((course) =>
                            course.isComingSoon ? (
                              <div
                                key={course.id}
                                className="flex flex-col gap-1 p-2.5 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/10 select-none opacity-60"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-sans font-bold text-stone-500 dark:text-stone-400 leading-tight">
                                    {course.title}
                                  </span>
                                  <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-300 dark:border-stone-700">
                                    Coming Soon
                                  </span>
                                </div>
                                <span className="text-[10px] font-sans text-stone-400 dark:text-stone-500">
                                  by {course.creator.name}
                                </span>
                              </div>
                            ) : (
                              <AnimatedNavLink
                                key={course.id}
                                to={`/courses/${course.slug}`}
                                onClick={() => setCoursesOpen(false)}
                                underlineVariant="random"
                                circleVariant="random"
                                className="group flex flex-col gap-1 px-3 py-2.5 rounded-xl transition-all duration-200"
                                activeClassName="text-[#1C1917] dark:text-white font-semibold"
                                inactiveClassName="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <span className="text-xs font-sans font-bold leading-tight">
                                    {course.title}
                                  </span>
                                  <span
                                    className={cn(
                                      "text-[8px] font-sans font-bold tracking-wide uppercase px-1.5 py-0.5 rounded border shrink-0",
                                      difficultyColors[course.difficulty],
                                    )}
                                  >
                                    {course.difficulty}
                                  </span>
                                </div>
                                <p className="text-[10px] font-sans text-stone-500 dark:text-stone-400 line-clamp-1 leading-normal">
                                  {course.subtitle}
                                </p>
                                <div className="flex items-center gap-1.5 text-[9px] font-sans text-stone-400 dark:text-stone-500">
                                  <span>by {course.creator.name}</span>
                                  <span>•</span>
                                  <span>{course.duration} hrs</span>
                                </div>
                              </AnimatedNavLink>
                            ),
                          )
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                            <span className="text-sm font-serif italic text-stone-400 dark:text-stone-500">
                              No courses in this section
                            </span>
                            <span className="text-[10px] font-sans text-stone-400 dark:text-stone-600">
                              Check other topics or coming soon listings
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : isFeatures ? (
                    <FeaturesDropdown onClose={() => setFeaturesOpen(false)} />
                  ) : (
                    <ResourcesDropdown onClose={() => setResourcesOpen(false)} />
                  ))}
              </li>
            );
          }

          return (
            <li key={item.label}>
              <AnimatedNavLink
                to={item.href}
                underlineColor={item.color}
                circleColor={item.circleColor}
                underlineVariant={item.underlineVariant}
                circleVariant={item.circleVariant}
              >
                {item.label}
              </AnimatedNavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MarketingNavigation;
