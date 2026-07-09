import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@pragyaos/utils';
import {
  PencilIcon,
  LayersIcon,
  TrophyIcon,
  SettingsIcon,
  ChevronDownIcon,
} from '@pragyaos/icons';
import { AuthTwig, AuthSparkle, Arrows, Lines } from '@pragyaos/assets';

const CurvedArrow = Arrows.CurvedArrow;
const OrganicDivider = Lines.OrganicDivider;

interface FeatureCardProps {
  icon: React.FC<{ size?: number | string; className?: string }>;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-[#c79436] group-hover:scale-105 transition-transform duration-200">
        <Icon size={20} />
      </div>
      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white leading-tight">
        {title}
      </h3>
      <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export function InstructorsComposition(): React.JSX.Element {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I sign up as an instructor?", a: "Simply click 'Launch Your Studio' to open the registration form, fill in your details, and your account will automatically be created with instructor privileges." },
    { q: "Can I self-host my media?", a: "Yes, PragyaOS supports both external CDN attachments and secure, direct cloud media storage configurations with automatic quality compression." },
    { q: "How are course updates published?", a: "Courses start in draft status. You can preview them in student view, run automated quality audits, and then submit them for review before going live." }
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1C1917] dark:bg-[#0f0f10] dark:text-[#EAE6DF] transition-colors duration-normal ease-in-out min-h-screen pb-16">
      
      {/* ── 1. Hero Banner ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-stone-200 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        {/* Twig Drawing as Botanical Background Accent */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 dark:opacity-20 hidden lg:block">
          <AuthTwig color="#c79436" strokeWidth={1} className="w-24 h-72" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <AuthSparkle color="#c79436" className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#c79436]">Teach. Design. Scale.</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.07] tracking-tight text-stone-900 dark:text-white"
          >
            Empower learners.<br />Build your teaching studio.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed"
          >
            PragyaOS provides educators with the most advanced, distraction-free environment to publish, audit, and grow modular course curriculums.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mt-2 relative"
          >
            {/* Hand-drawn Arrow pointer */}
            <div className="absolute -left-16 -top-12 opacity-80 rotate-12 hidden md:block">
              <CurvedArrow color="#c79436" strokeWidth={1.5} className="w-12 h-12" />
            </div>

            <Link
              to="/register"
              state={{ role: 'instructor' }}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-sans font-bold transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Launch Your Studio →
            </Link>
            <Link
              to="/login"
              state={{ role: 'instructor' }}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-stone-300 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 text-stone-800 dark:text-stone-200 text-sm font-sans font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c79436]"
            >
              Sign In to Studio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Core Features ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            The Instructor Studio Experience
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-normal">
            Take full command of your syllabus, assets, and course readiness directly from one unified editor dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={LayersIcon}
            title="Curriculum Canvas"
            description="Organize your sections, lectures, and resources. Reorder curriculum modules instantly with active drag-and-drop mechanics."
            index={0}
          />
          <FeatureCard
            icon={PencilIcon}
            title="Syllabus Auditor"
            description="Run automatic checks on course completeness, description checks, and video formats to verify publishing criteria before submission."
            index={1}
          />
          <FeatureCard
            icon={SettingsIcon}
            title="One-click Cloning"
            description="Quickly clone full course modules, lecture structures, or reference templates to create new lesson outlines in seconds."
            index={2}
          />
          <FeatureCard
            icon={TrophyIcon}
            title="Credential Designer"
            description="Design, issue, and automate certificate template credential delivery to students immediately upon course completion."
            index={3}
          />
        </div>
      </section>

      {/* Hand-drawn divider */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <OrganicDivider className="w-full text-stone-300 dark:text-stone-850 h-8 opacity-75" />
      </div>

      {/* ── 3. Platform Value Pitch ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              Why Educators Choose PragyaOS
            </h2>
            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              We believe teaching shouldn't involve complex system settings. PragyaOS provides a clean interface that lets you focus on creating curriculum outlines, while handling deployments, CDN configurations, and student credentials automatically.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                "Self-paced learning paths",
                "Zero vendor-lock data export",
                "Verified Razorpay pay-outs",
                "Student feedback loops"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <div className="text-xs sm:text-sm font-sans font-medium">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Accordion column */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className="border-b border-stone-100 dark:border-stone-800 pb-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left font-sans font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-300 py-1.5 focus-visible:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDownIcon size={14} className={cn('text-stone-400 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default InstructorsComposition;
