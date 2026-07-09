import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@pragyaos/icons";
import { getMockCatalog } from "@/features/courses/api/mockCourses";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes/route.constants";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { user } = useAuth();

  // Get courses list for mobile links
  const catalog = getMockCatalog();
  const allCourses = catalog
    .flatMap((cat) => cat.subTopics.flatMap((sub) => sub.courses))
    .filter((c) => !c.isComingSoon);

  const featuresSubmenu = [
    { label: "AI Learning", href: "/features/ai-learning" },
    { label: "Learning Experience", href: "/features/learning-experience" },
    { label: "Teaching Tools", href: "/features/teaching-tools" },
    { label: "Organization", href: "/features/organization" },
    { label: "Community", href: "/features/community" },
    { label: "View All Features", href: "/features" },
  ];

  const resourcesSubmenu = [
    { label: "Documentation", href: "/resources/documentation" },
    { label: "Help Center", href: "/resources/help-center" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Community", href: "/resources/community" },
  ];

  // 1. Escape key listener to close drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 2. Prevent body scroll while mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 3. Simple Focus Trap: loop focus from last element back to Close button
  const handleFocusTrap = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const modal = containerRef.current;
    if (!modal) return;

    const focusables = modal.querySelectorAll(
      'a, button, [tabindex="0"]',
    ) as NodeListOf<HTMLElement>;
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: loop back to end
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      // Tab: loop to start
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1050] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onKeyDown={handleFocusTrap}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            ref={containerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-72 max-w-full bg-background border-l border-stone-200 dark:border-stone-800 flex flex-col p-6 shadow-xl"
          >
            {/* Header / Close Row */}
            <div className="flex items-center justify-between mb-8 shrink-0">
              <span className="text-sm font-sans font-bold tracking-wide text-stone-850 dark:text-stone-200">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-stone-800 dark:text-stone-200 hover:opacity-70 p-1 border border-transparent rounded-sm focus-visible:outline-none"
                aria-label="Close menu"
                autoFocus
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Navigation Anchor Links */}
            <nav className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6">
              {/* Courses Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
                  Courses
                </span>
                <div className="flex flex-col gap-2">
                  {allCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/courses/${course.slug}`}
                      onClick={onClose}
                      className="block p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 shadow-sm text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 hover:text-brand-gold transition-all"
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
                  Features
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {featuresSubmenu.map((feat) => (
                    <Link
                      key={feat.label}
                      to={feat.href}
                      onClick={onClose}
                      className="block p-2.5 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 shadow-sm text-[11px] font-sans font-semibold text-stone-800 dark:text-stone-200 hover:text-brand-gold transition-all truncate"
                    >
                      {feat.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* General Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
                  General
                </span>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/instructors"
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 shadow-sm text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 hover:text-brand-gold transition-all"
                  >
                    For Instructors
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 shadow-sm text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 hover:text-brand-gold transition-all"
                  >
                    Pricing
                  </Link>
                </div>
              </div>

              {/* Resources Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
                  Resources
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {resourcesSubmenu.map((res) => (
                    <Link
                      key={res.label}
                      to={res.href}
                      onClick={onClose}
                      className="block p-2.5 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 shadow-sm text-[11px] font-sans font-semibold text-stone-800 dark:text-stone-200 hover:text-brand-gold transition-all truncate"
                    >
                      {res.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Auth Actions Block */}
            <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-850 flex flex-col gap-3 shrink-0">
              {user ? (
                <>
                  {/* User Profile Card */}
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold font-sans">
                      {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()}
                    </div>
                    <div className="text-left leading-tight">
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-sans">{`${user.firstName} ${user.lastName}`}</p>
                      <p className="text-[9px] font-semibold text-brand-gold uppercase tracking-wider font-sans">{user.role}</p>
                    </div>
                  </div>

                  <Link
                    to={user.role === 'student' ? ROUTES.PORTAL : (['instructor'].includes(user.role) ? ROUTES.STUDIO : ROUTES.ADMIN)}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 text-xs font-sans font-bold rounded-xl transition-all duration-200"
                  >
                    <span>Enter Workspace</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-2.5 border border-stone-200 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-750 text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 rounded-xl transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to={ROUTES.REGISTER}
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-2.5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 text-xs font-sans font-bold rounded-xl transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;
