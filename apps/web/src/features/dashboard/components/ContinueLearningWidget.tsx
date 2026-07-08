import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import { PlayIcon, ChevronRightIcon } from '@pragyaos/icons';
import { EditorialBadge } from '@pragyaos/ui';
import { mockContinueLearning } from '@/features/dashboard/api/dashboard.mock';
import type { CourseProgress } from '@/features/dashboard/types/dashboard.types';

// ─── CourseCard ───────────────────────────────────────────────────────────────

function CourseCard({ course }: { course: CourseProgress }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col rounded-xl overflow-hidden border border-border bg-card shrink-0 w-[200px] cursor-pointer focus-within:ring-2 focus-within:ring-ring"
      tabIndex={0}
      role="article"
      aria-label={`Continue: ${course.title}`}
    >
      {/* Thumbnail */}
      <div className={cn('relative h-[120px] flex items-center justify-center', course.thumbnailColor)}>
        {/* Progress + status badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <EditorialBadge
            variant="info"
            className="!text-[10px] !px-2 !py-0.5 normal-case !tracking-normal !font-medium"
          >
            In Progress
          </EditorialBadge>
        </div>
        <span className="absolute top-2 right-2 text-xs font-bold text-foreground/70 font-sans">
          {course.progressPercent}%
        </span>

        {/* Play button */}
        <button
          type="button"
          aria-label={`Play ${course.title}`}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white hover:scale-105 transition-all duration-fast shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PlayIcon size={14} fill="currentColor" stroke="none" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="font-sans font-semibold text-xs text-foreground leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="font-sans text-[11px] text-muted-foreground leading-snug">
          {course.subtitle}
          <span className="mx-1 text-muted-foreground/50">·</span>
          {course.moduleName}
        </p>

        {/* Progress bar */}
        <div
          role="progressbar"
          aria-valuenow={course.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${course.progressPercent}% complete`}
          className="mt-1 h-1 w-full rounded-full bg-muted overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-slow"
            style={{ width: `${course.progressPercent}%` }}
          />
        </div>
      </div>
    </motion.article>
  );
}

// ─── ContinueLearningWidget ───────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function ContinueLearningWidget(): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="continue-learning-heading">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="continue-learning-heading"
          className="font-sans font-semibold text-base text-foreground"
        >
          Continue Learning
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          View all
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-3 overflow-x-auto scrollbar-hidden pb-2"
        >
          {mockContinueLearning.map((course) => (
            <motion.div key={course.courseId} variants={cardVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

        {/* Right scroll button */}
        <button
          type="button"
          aria-label="Scroll to more courses"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-card border border-border shadow-md text-muted-foreground hover:text-foreground hover:border-ring transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring z-10"
        >
          <ChevronRightIcon size={12} />
        </button>
      </div>
    </section>
  );
}

export default ContinueLearningWidget;
