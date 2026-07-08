import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import { StarIcon, ChevronRightIcon } from '@pragyaos/icons';
import { mockRecommendedCourses } from '@/features/dashboard/api/dashboard.mock';
import type { RecommendedCourse } from '@/features/dashboard/types/dashboard.types';

// ─── RecommendedCourseCard ────────────────────────────────────────────────────

function RecommendedCourseCard({ course }: { course: RecommendedCourse }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 p-3 rounded-xl border border-border bg-card cursor-pointer hover:border-ring/50 transition-colors duration-fast shrink-0 w-[148px] focus-within:ring-2 focus-within:ring-ring"
      tabIndex={0}
      role="article"
      aria-label={course.title}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold font-mono',
          course.iconBg,
          course.iconTextColor
        )}
      >
        {course.iconText}
      </div>

      {/* Title + provider */}
      <div className="flex flex-col gap-0.5">
        <h3 className="font-sans font-semibold text-xs text-foreground leading-snug">
          {course.title}
        </h3>
        <p className="font-sans text-[11px] text-muted-foreground leading-snug">
          {course.provider}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <StarIcon
          size={11}
          className="text-amber-400"
          fill="currentColor"
          stroke="none"
        />
        <span className="font-sans text-[11px] font-semibold text-foreground">
          {course.rating}
        </span>
        <span className="font-sans text-[11px] text-muted-foreground">
          ({course.reviewCount >= 1000
            ? `${(course.reviewCount / 1000).toFixed(1)}K`
            : course.reviewCount})
        </span>
      </div>
    </motion.article>
  );
}

// ─── RecommendedCoursesWidget ─────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
};

export function RecommendedCoursesWidget(): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="recommended-heading">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="recommended-heading"
          className="font-sans font-semibold text-base text-foreground"
        >
          Recommended for You
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          View all
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="relative">
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-3 overflow-x-auto scrollbar-hidden pb-1"
        >
          {mockRecommendedCourses.map((course) => (
            <motion.div key={course.courseId} variants={cardVariants}>
              <RecommendedCourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

        {/* Right scroll chevron */}
        <button
          type="button"
          aria-label="Scroll for more recommendations"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-card border border-border shadow-md text-muted-foreground hover:text-foreground transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring z-10"
        >
          <ChevronRightIcon size={12} />
        </button>
      </div>
    </section>
  );
}

export default RecommendedCoursesWidget;
