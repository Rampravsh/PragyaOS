import React from 'react';
import { useLocalStorage } from '@pragyaos/hooks';
import { CloseIcon } from '@pragyaos/icons';
import { cn } from '@pragyaos/utils';

/**
 * AnnouncementBar: Reusable editorial announcement strip.
 * Features dismissible state synced with localStorage using the shared hook.
 * Uses CloseIcon from @pragyaos/icons.
 */
export function AnnouncementBar(): React.JSX.Element | null {
  const [dismissed, setDismissed] = useLocalStorage<boolean>(
    'pragyaos-announcement-dismissed',
    false
  );

  if (dismissed) return null;

  return (
    <div
      role="status"
      className={cn(
        'w-full bg-primary text-primary-foreground py-2 px-4 flex items-center justify-between text-xs font-sans tracking-wide transition-all duration-normal border-b border-primary/20 relative z-[1001]'
      )}
    >
      <div className="flex-1 flex justify-center items-center gap-2">
        <span className="font-semibold uppercase tracking-wider bg-primary-foreground text-primary px-1.5 py-0.5 rounded-[2px] text-[10px]">
          New
        </span>
        <span className="font-medium text-primary-foreground/90">
          Introducing PragyaOS Workspace: The future of interactive learning platforms.
        </span>
        <a
          href="/courses"
          className="underline hover:opacity-hover transition-opacity font-semibold ml-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground"
        >
          Learn more &rarr;
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground p-1 transition-colors rounded-sm"
        aria-label="Dismiss announcement"
      >
        <CloseIcon size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default AnnouncementBar;
