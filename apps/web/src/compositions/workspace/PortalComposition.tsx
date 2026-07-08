import { motion } from 'framer-motion';
import {
  HeroGreeting,
  ContinueLearningWidget,
  LearningPathsWidget,
  RecommendedCoursesWidget,
  ProgressWidget,
  DeadlinesWidget,
  AchievementsWidget,
} from '@/features/dashboard';

// ─── Animation ────────────────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
} as const;

// ─── PortalComposition ────────────────────────────────────────────────────────

/**
 * Portal workspace page composition.
 * Two-column layout: left main content (flex-1) + right panel (fixed-width widgets).
 * All feature widgets are lazy-friendly via dynamic imports at the routing level.
 */
export function PortalComposition(): React.JSX.Element {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-5 p-6 min-h-full"
    >
      {/* ── Left: Main content column ─────────────────────────────────────── */}
      <div className="flex flex-col gap-6 flex-1 min-w-0">

        {/* Hero greeting */}
        <motion.div variants={sectionVariants}>
          <HeroGreeting />
        </motion.div>

        {/* Continue Learning */}
        <motion.div variants={sectionVariants} className="bg-card rounded-xl border border-border p-5">
          <ContinueLearningWidget />
        </motion.div>

        {/* Learning Paths */}
        <motion.div variants={sectionVariants} className="bg-card rounded-xl border border-border p-5">
          <LearningPathsWidget />
        </motion.div>

        {/* Recommended for You */}
        <motion.div variants={sectionVariants} className="bg-card rounded-xl border border-border p-5">
          <RecommendedCoursesWidget />
        </motion.div>
      </div>

      {/* ── Right: Sidebar widgets ─────────────────────────────────────────── */}
      <aside
        aria-label="Dashboard widgets"
        className="flex flex-col gap-4 w-72 shrink-0"
      >
        <ProgressWidget />
        <DeadlinesWidget />
        <AchievementsWidget />
      </aside>
    </motion.div>
  );
}

export default PortalComposition;
