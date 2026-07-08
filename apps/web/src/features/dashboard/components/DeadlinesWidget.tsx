import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import { ChevronRightIcon, BookIcon } from '@pragyaos/icons';
import { mockDeadlines } from '@/features/dashboard/api/dashboard.mock';
import type { Deadline } from '@/features/dashboard/types/dashboard.types';

// ─── Priority label colours ───────────────────────────────────────────────────

const priorityStyles = {
  urgent: 'text-rose-500',
  soon: 'text-amber-500',
  normal: 'text-amber-500',
} as const;

// ─── DeadlineItem ─────────────────────────────────────────────────────────────

function DeadlineItem({ item, index }: { item: Deadline; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.28 }}
      className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted shrink-0">
        <BookIcon size={14} className="text-muted-foreground" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-sans text-xs font-semibold text-foreground truncate">
          {item.title}
        </span>
        <span className="font-sans text-[11px] text-muted-foreground">
          {new Date(item.dueDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })} • 11:59 PM
        </span>
      </div>

      {/* Due label */}
      <span className={cn('font-sans text-[11px] font-semibold shrink-0', priorityStyles[item.priority])}>
        {item.dueDateLabel}
      </span>
    </motion.li>
  );
}

// ─── DeadlinesWidget ─────────────────────────────────────────────────────────

export function DeadlinesWidget(): React.JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      aria-labelledby="deadlines-heading"
      className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          id="deadlines-heading"
          className="font-sans font-semibold text-sm text-foreground"
        >
          Upcoming Deadlines
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
      <ul role="list" aria-label="Upcoming assignment deadlines" className="flex flex-col">
        {mockDeadlines.map((item, i) => (
          <DeadlineItem key={item.assignmentId} item={item} index={i} />
        ))}
      </ul>
    </motion.section>
  );
}

export default DeadlinesWidget;
