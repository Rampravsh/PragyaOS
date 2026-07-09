import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@pragyaos/utils";
import { BookIcon, PlayIcon, ChevronDownIcon, AwardIcon, TrophyIcon } from "@pragyaos/icons";
import { AuthSparkle, Lines } from "@pragyaos/assets";
import { Course, CourseModule } from "@/features/courses/types/course.types";

const OrganicDivider = Lines.OrganicDivider;

interface CourseDetailsProps {
  course: Course;
}

export function CourseDetailsComposition({ course }: CourseDetailsProps): React.JSX.Element {
  // Keep first module expanded by default
  const defaultExpanded =
    course.modules && course.modules.length > 0 ? { [course.modules[0].id]: true } : {};

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(defaultExpanded);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const difficultyColors = {
    BEGINNER: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    INTERMEDIATE: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    ADVANCED: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-normal ease-in-out pb-16">
      {/* ── Header Hero Section ── */}
      <header className="border-b border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/30 backdrop-blur-md py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-stone-500 dark:text-stone-400 hover:text-brand-gold transition-colors mb-6"
          >
            ← Back to Home
          </Link>

          <div className="max-w-3xl flex flex-col gap-4">
            <span
              className={cn(
                "self-start text-[10px] font-sans font-bold tracking-wide uppercase px-2 py-0.5 rounded-md border",
                difficultyColors[course.difficulty],
              )}
            >
              {course.difficulty}
            </span>

            <div className="flex items-center gap-2.5">
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight text-stone-900 dark:text-white tracking-tight">
                {course.title}
              </h1>
              <AuthSparkle
                color="currentColor"
                className="w-5 h-5 shrink-0 animate-pulse hidden sm:block text-brand-gold"
              />
            </div>

            <p className="font-sans text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans text-stone-500 dark:text-stone-400 mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={course.creator.avatarUrl}
                  alt={course.creator.name}
                  className="w-6 h-6 rounded-full border border-stone-200 dark:border-stone-700 object-cover"
                />
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  by {course.creator.name}
                </span>
              </div>
              <span>•</span>
              <span>{course.duration} Hours of content</span>
              <span>•</span>
              <span>{course.lessonsCount} lessons</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content split view ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          {/* Left Column: About & Curriculum */}
          <div className="flex flex-col gap-8 md:gap-10">
            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              aria-labelledby="about-heading"
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-2xl p-6 shadow-sm"
            >
              <h2
                id="about-heading"
                className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-3"
              >
                About this Course
              </h2>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </motion.section>

            {/* Curriculum Accordions list */}
            <section aria-labelledby="curriculum-heading" className="flex flex-col gap-4">
              <h2
                id="curriculum-heading"
                className="font-serif text-xl font-bold text-stone-900 dark:text-white px-1"
              >
                Course Curriculum
              </h2>

              {course.modules && course.modules.length > 0 ? (
                course.modules.map((mod: CourseModule, idx: number) => {
                  const isExpanded = !!expandedModules[mod.id];
                  return (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left font-sans font-bold text-sm sm:text-base text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-brand-gold">
                            M{mod.sequence}
                          </span>
                          <span>{mod.title}</span>
                        </div>
                        <ChevronDownIcon
                          size={16}
                          className={cn(
                            "text-stone-400 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "",
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800 bg-stone-50/10 dark:bg-stone-950/10"
                          >
                            {mod.units.map((unit) => (
                              <div
                                key={unit.id}
                                className="flex items-center justify-between gap-4 p-4 text-xs sm:text-sm font-sans"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {unit.type === "VIDEO" ? (
                                    <PlayIcon size={14} className="text-brand-gold shrink-0" />
                                  ) : (
                                    <BookIcon
                                      size={14}
                                      className="text-stone-400 dark:text-stone-500 shrink-0"
                                    />
                                  )}
                                  <span className="text-stone-700 dark:text-stone-300 font-medium truncate">
                                    {unit.title}
                                  </span>
                                </div>
                                <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0">
                                  {unit.duration} mins
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl p-8 text-center bg-stone-50/20 dark:bg-stone-950/10">
                  <p className="font-serif italic text-sm text-stone-400 dark:text-stone-500">
                    Curriculum syllabus is currently being drafted.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Pricing CTA & Creator spotlights */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-[var(--size-header-workspace)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  Access
                </span>
                <span className="text-3xl font-serif font-bold text-stone-900 dark:text-white">
                  Free Course
                </span>
              </div>

              <button
                type="button"
                className="w-full h-12 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-black dark:bg-brand-gold dark:hover:bg-[#b0802c] text-white dark:text-stone-900 text-sm font-sans font-bold transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                Start Learning Now
              </button>

              <div className="pt-2">
                <OrganicDivider className="w-full text-stone-200 dark:text-stone-800 h-6 opacity-75" />
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs font-sans text-stone-600 dark:text-stone-400">
                  <PlayIcon size={12} className="text-brand-gold" />
                  <span>Full syllabus structure</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-stone-600 dark:text-stone-400">
                  <AwardIcon size={12} className="text-brand-gold" />
                  <span>Completion certificate</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-stone-600 dark:text-stone-400">
                  <TrophyIcon size={12} className="text-brand-gold" />
                  <span>Interactive exercises</span>
                </div>
              </div>
            </motion.div>

            {/* Creator Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={course.creator.avatarUrl}
                  alt={course.creator.name}
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 object-cover"
                />
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-white leading-none">
                    {course.creator.name}
                  </h3>
                  <span className="text-[10px] font-sans text-stone-400 dark:text-stone-500 uppercase tracking-wide">
                    Instructor
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {course.creator.bio}
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseDetailsComposition;
