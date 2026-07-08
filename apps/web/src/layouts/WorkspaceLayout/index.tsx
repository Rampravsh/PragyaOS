import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, Topbar, PageTransition } from '@/components/layout';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Milestone,
  PenTool,
  MessageSquare,
  Award,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function WorkspaceLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'My Courses', to: '/courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Learning Paths', to: '/paths', icon: <Milestone className="w-5 h-5" /> },
    { label: 'Assignments', to: '/assignments', icon: <PenTool className="w-5 h-5" /> },
    { label: 'Discussions', to: '/discussions', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Certificates', to: '/certificates', icon: <Award className="w-5 h-5" /> },
    { label: 'Analytics', to: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Settings', to: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Helper to determine Topbar Title based on route
  const getTitle = () => {
    const current = sidebarItems.find((item) => item.to === location.pathname);
    return current ? current.label : 'Workspace';
  };

  return (
    <div className="min-h-screen flex bg-background text-text-primary overflow-hidden">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <Sidebar items={sidebarItems} className="hidden md:flex" />

      {/* Main Right panel containing Topbar and Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(true)} title={getTitle()} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      {/* Responsive mobile sidebar Drawer overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-[#1c1917]/40 backdrop-blur-xs cursor-pointer"
            />
            {/* Sidebar drawer sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 z-50 flex shadow-paper-floating"
            >
              <Sidebar items={sidebarItems} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
