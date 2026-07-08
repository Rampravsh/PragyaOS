import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import {
  SearchIcon,
  BellIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from '@pragyaos/icons';
import { useScrollY } from '@pragyaos/hooks';
import { useTheme } from '@/providers/ThemeProvider';

// ─── SearchBar ────────────────────────────────────────────────────────────────

function SearchBar() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-fast',
        'bg-background text-foreground',
        focused
          ? 'border-ring ring-2 ring-ring/20'
          : 'border-border hover:border-ring/50'
      )}
      style={{ minWidth: '260px', maxWidth: '340px' }}
    >
      <SearchIcon size={15} className="text-muted-foreground shrink-0" />
      <input
        ref={inputRef}
        id="workspace-search"
        type="search"
        placeholder="Search courses, lessons, resources..."
        aria-label="Search workspace"
        className="flex-1 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none border-none min-w-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <kbd
        aria-label="Keyboard shortcut: Command K"
        className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono text-muted-foreground bg-muted border border-border shrink-0"
      >
        ⌘K
      </kbd>
    </div>
  );
}

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'workspace-dark';

  const toggle = () => {
    setTheme(isDark ? 'workspace-light' : 'workspace-dark');
  };

  return (
    <button
      id="workspace-theme-toggle"
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </motion.div>
    </button>
  );
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

function NotificationBell() {
  return (
    <button
      id="workspace-notifications"
      type="button"
      aria-label="Open notifications (3 unread)"
      className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <BellIcon size={16} />
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-background"
      />
    </button>
  );
}

// ─── ProfileChip ──────────────────────────────────────────────────────────────

function ProfileChip() {
  return (
    <button
      id="workspace-profile"
      type="button"
      aria-label="Open profile menu"
      aria-haspopup="true"
      className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl border border-border bg-background hover:bg-muted transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Avatar */}
      <div
        aria-hidden="true"
        className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold font-sans shrink-0"
      >
        A
      </div>
      <div className="text-left leading-tight hidden sm:block">
        <p className="text-xs font-semibold text-foreground font-sans">Ananya</p>
        <p className="text-xs text-muted-foreground font-sans">Student</p>
      </div>
      <ChevronDownIcon size={14} className="text-muted-foreground" />
    </button>
  );
}

// ─── WorkspaceTopbar ──────────────────────────────────────────────────────────

export function WorkspaceTopbar(): React.JSX.Element {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 4;

  return (
    <header
      id="workspace-topbar"
      role="banner"
      className={cn(
        'sticky top-0 z-sticky flex items-center gap-4 px-6 h-[var(--size-header-workspace)] border-b transition-all duration-normal ease-in-out',
        'bg-background/90 backdrop-blur-md',
        isScrolled
          ? 'border-border shadow-sm'
          : 'border-transparent'
      )}
    >
      {/* Search — grows to fill available space */}
      <div className="flex-1 flex items-center">
        <SearchBar />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />
        <ProfileChip />
      </div>
    </header>
  );
}

export default WorkspaceTopbar;
