import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { cn } from "@pragyaos/utils";
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
  ChevronRightIcon,
  PencilIcon,
  ShieldCheckIcon,
} from "@pragyaos/icons";
import { ROUTES } from "@/routes/route.constants";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/layouts/workspace/SidebarContext";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ size?: number | string; className?: string }>;
  to: string;
  badge?: "dot" | string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

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
    return {
      aside: "bg-zinc-50 border-r border-zinc-200",
      logoBorder: "border-b border-zinc-200",
      logoText: "text-zinc-900",
      navItemActive: "bg-zinc-900 text-zinc-50",
      navItemInactive: "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
      navIconActive: "text-zinc-50",
      navIconInactive: "text-zinc-400 group-hover:text-zinc-700",
      streakCard: "bg-zinc-100 border border-zinc-200",
      streakLabel: "text-zinc-500",
      streakNumber: "text-zinc-900",
      streakMeta: "text-zinc-500",
      streakTrack: "bg-zinc-200",
      focusRing: "focus-visible:ring-zinc-400",
    };
  }
  return {
    aside: "bg-zinc-900 border-r border-zinc-800",
    logoBorder: "border-b border-zinc-800",
    logoText: "text-zinc-100",
    navItemActive: "bg-zinc-100 text-zinc-900",
    navItemInactive: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800",
    navIconActive: "text-zinc-900",
    navIconInactive: "text-zinc-400 group-hover:text-zinc-100",
    streakCard: "bg-zinc-800 border border-zinc-700",
    streakLabel: "text-zinc-400",
    streakNumber: "text-zinc-100",
    streakMeta: "text-zinc-400",
    streakTrack: "bg-zinc-700",
    focusRing: "focus-visible:ring-zinc-500",
  };
}

function SidebarNavItem({
  item,
  styles,
  isCollapsed,
}: {
  item: NavItem;
  styles: SidebarStyles;
  isCollapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <motion.li variants={itemVariants}>
      <NavLink
        to={item.to}
        id={`sidebar-nav-${item.id}`}
        title={isCollapsed ? item.label : undefined}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-fast ease-out relative group",
            isCollapsed ? "justify-center px-0" : "",
            `focus-visible:outline-none focus-visible:ring-2 ${styles.focusRing}`,
            isActive ? styles.navItemActive : styles.navItemInactive,
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={16}
              className={cn(isActive ? styles.navIconActive : styles.navIconInactive, "shrink-0")}
            />
            {!isCollapsed && (
              <span className="flex-1 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
            )}
            {item.badge === "dot" && !isCollapsed && (
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

function StreakCard({ styles }: { styles: SidebarStyles }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className={cn("mx-3 mb-4 p-4 rounded-xl", styles.streakCard)}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "text-xs font-sans font-medium uppercase tracking-wider",
            styles.streakLabel,
          )}
        >
          Keep it up!
        </span>
        <FlameIcon size={18} className="text-amber-400" />
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className={cn("text-3xl font-bold font-sans leading-none", styles.streakNumber)}>
          12
        </span>
        <span className={cn("text-xs font-sans pb-1", styles.streakMeta)}>Day Streak</span>
      </div>
      <div className={cn("w-full h-1.5 rounded-full overflow-hidden", styles.streakTrack)}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: "68%" }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export function WorkspaceSidebar(): React.JSX.Element {
  const { theme } = useTheme();
  const { isOpen, setIsOpen, isCollapsed, toggleCollapse } = useSidebar();
  const { user } = useAuth();
  const isDark = theme === "workspace-dark";
  const styles = useSidebarStyles(isDark);

  // Dynamic Navigation Items Builder
  const baseItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, to: ROUTES.PORTAL },
    { id: "my-courses", label: "My Courses", icon: BookIcon, to: "/courses" },
    { id: "learning-paths", label: "Learning Paths", icon: LayersIcon, to: "/paths" },
    { id: "assignments", label: "Assignments", icon: BellIcon, to: "/assignments", badge: "dot" },
    { id: "discussions", label: "Discussions", icon: MessageSquareIcon, to: "/discussions" },
    { id: "certificates", label: "Certificates", icon: AwardIcon, to: "/certificates" },
    { id: "analytics", label: "Analytics", icon: BarChartIcon, to: "/analytics" },
  ];

  const extraItems: NavItem[] = [];
  if (user) {
    if (["instructor", "admin", "super_admin"].includes(user.role)) {
      extraItems.push({ id: "studio", label: "Instructor Studio", icon: PencilIcon, to: ROUTES.STUDIO });
    }
    if (["admin", "super_admin"].includes(user.role)) {
      extraItems.push({ id: "admin", label: "Admin Console", icon: ShieldCheckIcon, to: ROUTES.ADMIN });
    }
  }

  const footerItems: NavItem[] = [
    { id: "bookmarks", label: "Bookmarks", icon: BookmarkIcon, to: "/bookmarks" },
    { id: "calendar", label: "Calendar", icon: CalendarIcon, to: "/calendar" },
    { id: "settings", label: "Settings", icon: SettingsIcon, to: "/settings" },
  ];

  const visibleItems = [...baseItems, ...extraItems, ...footerItems];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        aria-label="Workspace navigation"
        className={cn(
          "flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out border-r z-50",
          "fixed inset-y-0 left-0 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-[var(--size-sidebar-workspace)]",
          styles.aside,
        )}
      >
        {/* Logo Header */}
        <div className={cn("flex items-center gap-2.5 px-5 py-4 min-h-[57px]", styles.logoBorder)}>
          <LogoIcon size={22} className={cn(styles.logoText, "shrink-0")} fill="currentColor" />
          {!isCollapsed && (
            <span
              className={cn(
                "text-base font-bold font-sans tracking-tight whitespace-nowrap overflow-hidden text-ellipsis",
                styles.logoText,
              )}
            >
              PragyaOS
            </span>
          )}
        </div>

        {/* Navigation Link List */}
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
            {visibleItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} styles={styles} isCollapsed={isCollapsed} />
            ))}
          </motion.ul>
        </nav>

        {/* Streak status card (hidden when collapsed) */}
        {!isCollapsed && <StreakCard styles={styles} />}

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "hidden lg:flex items-center justify-center p-2.5 mx-3 mb-4 rounded-xl border text-xs font-sans font-medium transition-all duration-fast focus-visible:outline-none focus-visible:ring-2",
            isDark
              ? "border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 focus-visible:ring-zinc-500"
              : "border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-400",
            isCollapsed ? "mx-auto" : "self-end",
          )}
        >
          <ChevronRightIcon
            size={14}
            className={cn("transition-transform duration-normal", !isCollapsed && "rotate-180")}
          />
        </button>
      </aside>
    </>
  );
}

export default WorkspaceSidebar;
