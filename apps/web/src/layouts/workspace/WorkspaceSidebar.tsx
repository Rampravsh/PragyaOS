import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { cn } from '@pragyaos/utils';
import {
  LogoIcon,
  DashboardIcon,
  BookIcon,
  LayersIcon,
  SettingsIcon,
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  BarChartIcon,
  MessageSquareIcon,
  AwardIcon,
  FlameIcon,
} from '@pragyaos/icons';
import { ROUTES } from '@/routes/route.constants';
import { useTheme } from '@/providers/ThemeProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ size?: number | string; className?: string }>;
  to: string;
  badge?: 'dot' | string;
}

// ─── Nav configuration ────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, to: ROUTES.PORTAL },
  { id: 'my-courses', label: 'My Courses', icon: BookIcon, to: '/courses' },
  { id: 'learning-paths', label: 'Learning Paths', icon: LayersIcon, to: '/paths' },
  { id: 'assignments', label: 'Assignments', icon: BellIcon, to: '/assignments', badge: 'dot' },
  { id: 'discussions', label: 'Discussions', icon: MessageSquareIcon, to: '/discussions' },
  { id: 'certificates', label: 'Certificates', icon: AwardIcon, to: '/certificates' },
  { id: 'analytics', label: 'Analytics', icon: BarChartIcon, to: '/analytics' },
  { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon, to: '/bookmarks' },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon, to: '/calendar' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, to: '/settings' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

// ─── Theme-aware style maps ───────────────────────────────────────────────────
//
// Light theme → sidebar DARK  (dark bg, light text) — matches reference image
// Dark theme  → sidebar LIGHT (light bg, dark text) — creates contrast vs dark workspace
//
// This is the PragyaOS Workspace language: sidebar and workspace are always in contrast.

interface SidebarStyles {
  aside: string;
  logoBorder: string;
  logoText: string;
  navItemActive: string;
  navItemInactive: string;
  navIconActive: string;
  navIconInactive: string;
  streakCard: string;
  streakLabel: string;
  streakNumber: string;
  streakMeta: string;
  streakTrack: string;
  focusRing: string;
}

function useSidebarStyles(isDark: boolean): SidebarStyles {
  if (isDark) {
    // Dark workspace → LIGHT sidebar
    return {
      aside: 'bg-zinc-50 border-r border-zinc-200',
      logoBorder: 'border-b border-zinc-200',
      logoText: 'text-zinc-900',
      navItemActive: 'bg-zinc-900 text-zinc-50',
      navItemInactive: 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100',
      navIconActive: 'text-zinc-50',
      navIconInactive: 'text-zinc-400 group-hover:text-zinc-700',
      streakCard: 'bg-zinc-100 border border-zinc-200',
      streakLabel: 'text-zinc-500',
      streakNumber: 'text-zinc-900',
      streakMeta: 'text-zinc-500',
      streakTrack: 'bg-zinc-200',
      focusRing: 'focus-visible:ring-zinc-400',
    };
  }

  // Light workspace → DARK sidebar (matches reference image)
  return {
    aside: 'bg-zinc-900 border-r border-zinc-800',
    logoBorder: 'border-b border-zinc-800',
    logoText: 'text-zinc-100',
    navItemActive: 'bg-zinc-100 text-zinc-900',
    navItemInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800',
    navIconActive: 'text-zinc-900',
    navIconInactive: 'text-zinc-400 group-hover:text-zinc-100',
    streakCard: 'bg-zinc-800 border border-zinc-700',
    streakLabel: 'text-zinc-400',
    streakNumber: 'text-zinc-100',
    streakMeta: 'text-zinc-400',
    streakTrack: 'bg-zinc-700',
    focusRing: 'focus-visible:ring-zinc-500',
  };
}

// ─── SidebarNavItem ───────────────────────────────────────────────────────────

function SidebarNavItem({
  item,
  styles,
}: {
  item: NavItem;
  styles: SidebarStyles;
}) {
  const Icon = item.icon;

  return (
    <motion.li variants={itemVariants}>
      <NavLink
        to={item.to}
        id={`sidebar-nav-${item.id}`}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-fast ease-out relative group',
            `focus-visible:outline-none focus-visible:ring-2 ${styles.focusRing}`,
            isActive ? styles.navItemActive : styles.navItemInactive
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={16}
              className={cn(
                isActive ? styles.navIconActive : styles.navIconInactive
              )}
            />
            <span className="flex-1 font-sans">{item.label}</span>
            {item.badge === 'dot' && (
              <span
                aria-label="New notifications"
                className="w-2 h-2 rounded-full bg-amber-500 shrink-0"
              />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
}

// ─── StreakCard ───────────────────────────────────────────────────────────────

function StreakCard({ styles }: { styles: SidebarStyles }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.35 }}
      className={cn('mx-3 mb-4 p-4 rounded-xl', styles.streakCard)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={cn('text-xs font-sans font-medium uppercase tracking-wider', styles.streakLabel)}>
          Keep it up!
        </span>
        <FlameIcon size={18} className="text-amber-400" />
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className={cn('text-3xl font-bold font-sans leading-none', styles.streakNumber)}>12</span>
        <span className={cn('text-xs font-sans pb-1', styles.streakMeta)}>Day Streak</span>
      </div>

      {/* Progress bar */}
      <div className={cn('w-full h-1.5 rounded-full overflow-hidden', styles.streakTrack)}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: '68%' }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

// ─── WorkspaceSidebar ─────────────────────────────────────────────────────────

export function WorkspaceSidebar(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'workspace-dark';
  const styles = useSidebarStyles(isDark);

  return (
    <motion.aside
      aria-label="Workspace navigation"
      className={cn(
        'flex flex-col w-[var(--size-sidebar-workspace)] h-full shrink-0 transition-colors duration-normal ease-in-out',
        styles.aside
      )}
      initial={{ x: -8, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-2.5 px-5 py-4', styles.logoBorder)}>
        <LogoIcon size={22} className={styles.logoText} fill="currentColor" />
        <span className={cn('text-base font-bold font-sans tracking-tight', styles.logoText)}>
          PragyaOS
        </span>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-hidden"
      >
        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-0.5"
        >
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.id} item={item} styles={styles} />
          ))}
        </motion.ul>
      </nav>

      {/* Bottom streak card */}
      <StreakCard styles={styles} />
    </motion.aside>
  );
}

export default WorkspaceSidebar;
