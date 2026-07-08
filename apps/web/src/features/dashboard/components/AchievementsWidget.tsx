import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import { ChevronRightIcon, TrophyIcon } from '@pragyaos/icons';
import { mockAchievements } from '@/features/dashboard/api/dashboard.mock';
import type { Achievement } from '@/features/dashboard/types/dashboard.types';

// ─── AchievementItem ──────────────────────────────────────────────────────────

function AchievementItem({ item, index }: { item: Achievement; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.28 }}
      className="flex items-start gap-3 py-2.5 border-b border-border last:border-0"
    >
      {/* Trophy icon */}
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted shrink-0">
        <TrophyIcon size={16} className={cn(item.iconColor)} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-sans text-xs font-semibold text-foreground">
          {item.title}
        </span>
        <span className="font-sans text-[11px] text-muted-foreground leading-snug">
          {item.description}
        </span>
        <span className="font-sans text-[11px] text-muted-foreground/60 mt-0.5">
          {item.timeAgo}
        </span>
      </div>
    </motion.li>
  );
}

// ─── AchievementsWidget ───────────────────────────────────────────────────────

export function AchievementsWidget(): React.JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      aria-labelledby="achievements-heading"
      className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          id="achievements-heading"
          className="font-sans font-semibold text-sm text-foreground"
        >
          Recent Achievements
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          View all
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {/* List */}
      <ul role="list" aria-label="Recent achievements" className="flex flex-col">
        {mockAchievements.map((item, i) => (
          <AchievementItem key={item.achievementId} item={item} index={i} />
        ))}
      </ul>
    </motion.section>
  );
}

export default AchievementsWidget;
