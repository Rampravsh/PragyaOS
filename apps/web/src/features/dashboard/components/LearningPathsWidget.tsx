import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import { ChevronRightIcon, UsersIcon, LayersIcon } from '@pragyaos/icons';
import { EditorialBadge } from '@pragyaos/ui';
import { mockLearningPaths } from '@/features/dashboard/api/dashboard.mock';
import type { LearningPath } from '@/features/dashboard/types/dashboard.types';

// ─── PathCard ─────────────────────────────────────────────────────────────────

function PathCard({ path }: { path: LearningPath }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-ring/50 transition-colors duration-fast focus-within:ring-2 focus-within:ring-ring flex-1 min-w-0"
      tabIndex={0}
      role="article"
      aria-label={path.title}
    >
      {/* Icon + title row */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg shrink-0',
            path.iconBg
          )}
        >
          <LayersIcon size={18} className="text-foreground/60" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="font-sans font-semibold text-sm text-foreground leading-snug">
            {path.title}
          </h3>
          <p className="font-sans text-xs text-muted-foreground leading-snug line-clamp-2">
            {path.description}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div
          role="progressbar"
          aria-valuenow={path.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${path.progressPercent}% complete`}
          className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full bg-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${path.progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <span className="font-sans text-xs text-muted-foreground font-medium">
          {path.progressPercent}% Complete
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <EditorialBadge
            variant="default"
            className="!text-[10px] !px-2 !py-0.5 normal-case !tracking-normal !font-medium"
          >
            {path.difficulty}
          </EditorialBadge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <LayersIcon size={11} />
            {path.totalCourses} Courses
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <UsersIcon size={11} />
          <span>+{path.memberCount.toLocaleString()}</span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── LearningPathsWidget ──────────────────────────────────────────────────────

export function LearningPathsWidget(): React.JSX.Element {
  return (
    <section aria-labelledby="learning-paths-heading">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="learning-paths-heading"
          className="font-sans font-semibold text-base text-foreground"
        >
          Learning Paths
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          View all
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {/* Path cards grid */}
      <div className="flex gap-4">
        {mockLearningPaths.map((path) => (
          <PathCard key={path.pathId} path={path} />
        ))}
      </div>
    </section>
  );
}

export default LearningPathsWidget;
