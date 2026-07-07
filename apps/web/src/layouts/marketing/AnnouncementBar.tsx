import React from 'react';
import { useLocalStorage } from '@pragyaos/hooks';
import { CloseIcon } from '@pragyaos/icons';
import { Link } from 'react-router';

/**
 * AnnouncementBar: Black top strip matching the design.
 * "NEW" green badge | announcement text | "Learn more →" | × dismiss
 */
export function AnnouncementBar(): React.JSX.Element | null {
  const [dismissed, setDismissed] = useLocalStorage<boolean>(
    'pragyaos-announcement-v2-dismissed',
    false
  );

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-[#0C0C12] text-white py-2.5 px-4 flex items-center justify-center gap-3 text-xs font-sans relative z-[1001]"
    >
      {/* NEW badge */}
      <span className="bg-emerald-500 text-white text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-sm shrink-0">
        NEW
      </span>

      {/* Announcement text */}
      <span className="text-white/80 font-medium">
        Introducing PragyaOS Workspace — Plan, create and teach better, together.
      </span>

      {/* Learn more link */}
      <Link
        to="/courses"
        className="text-white font-semibold underline underline-offset-2 hover:text-white/80 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
        aria-label="Learn more about PragyaOS Workspace"
      >
        Learn more →
      </Link>

      {/* Dismiss button — pushed to the right */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded p-0.5"
        aria-label="Dismiss announcement"
      >
        <CloseIcon size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default AnnouncementBar;
