import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { LogoIcon, ShieldCheckIcon } from '@pragyaos/icons';
import { AuthTwig, AuthSparkle } from '@pragyaos/assets';
import ThemeToggle from '@/layouts/marketing/ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
  illustration: React.FC<{ className?: string; color?: string }>;
  title: string | React.ReactNode;
  description: string;
  bottomText: string;
}

export function AuthLayout({
  children,
  illustration: Illustration,
  title,
  description,
  bottomText,
}: AuthLayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 dark:bg-[#0f0f10] dark:text-stone-100 flex flex-col justify-between transition-colors duration-normal ease-in-out">
      
      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[440px_1fr] xl:grid-cols-[480px_1fr]">
        
        {/* Left column: Hand-drawn organic sidebar */}
        <aside className="relative hidden lg:flex flex-col justify-between p-8 xl:p-12 overflow-hidden bg-[#FAF6EE] dark:bg-[#100E0D] border-r border-[#EAE6DF] dark:border-[#2D2926] select-none">
          {/* Leaf twig decoration */}
          <div className="absolute left-4 bottom-20 opacity-90 text-emerald-800/20 dark:text-emerald-500/10 pointer-events-none">
            <AuthTwig className="h-60 w-auto" color="currentColor" />
          </div>

          {/* Top: Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2.5 text-stone-900 dark:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">
              <LogoIcon size={24} className="text-[#c79436]" />
              <span className="font-sans text-xl font-bold tracking-tight">PragyaOS</span>
            </Link>
          </div>

          {/* Middle: Content + Illustrations */}
          <div className="relative z-10 my-auto py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-3xl xl:text-4xl font-medium leading-tight text-stone-900 dark:text-white max-w-[15ch]">
                {title}
              </h2>
              <p className="font-sans text-sm text-stone-500 dark:text-stone-400">
                {description}
              </p>
            </div>

            {/* Central sketch illustration */}
            <div className="relative flex justify-center py-4">
              {/* Star sparkles decorations */}
              <AuthSparkle className="absolute top-0 right-12 w-6 h-6 text-[#c79436] opacity-60 animate-pulse" />
              <AuthSparkle className="absolute bottom-2 left-10 w-4 h-4 text-[#c79436] opacity-40 animate-pulse" />
              
              <Illustration className="text-stone-800 dark:text-stone-200 drop-shadow-sm" />
            </div>
          </div>

          {/* Bottom: Shield Security text */}
          <div className="relative z-10 flex items-center gap-2 text-stone-400 dark:text-stone-600">
            <ShieldCheckIcon size={16} className="text-[#c79436] shrink-0" />
            <span className="font-sans text-[11px] font-medium leading-relaxed max-w-[32ch]">
              {bottomText}
            </span>
          </div>
        </aside>

        {/* Right column: Form Content */}
        <section className="relative flex flex-col items-center justify-center p-6 md:p-12 xl:p-16 min-h-screen">
          {/* Theme switcher */}
          <div className="absolute right-6 top-6 z-20">
            <ThemeToggle />
          </div>

          {/* Card wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-[400px] flex flex-col gap-6"
          >
            {/* Mobile Header (hidden on large displays) */}
            <div className="lg:hidden flex flex-col items-center text-center gap-2 mb-2">
              <Link to="/" className="inline-flex items-center gap-2">
                <LogoIcon size={32} className="text-[#c79436]" />
                <span className="font-sans text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">PragyaOS</span>
              </Link>
            </div>

            {/* Inner page content */}
            {children}
          </motion.div>
        </section>

      </div>
    </div>
  );
}

export default AuthLayout;
