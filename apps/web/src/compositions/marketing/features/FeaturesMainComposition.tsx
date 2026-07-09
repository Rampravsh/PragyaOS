import React from "react";
import { motion } from "framer-motion";
import { AuthSparkle, AuthTwig, Lines } from "@pragyaos/assets";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";
import { DashboardIcon, BookIcon, PencilIcon, LayersIcon, UsersIcon } from "@pragyaos/icons";

const OrganicDivider = Lines.OrganicDivider;

export function FeaturesMainComposition(): React.JSX.Element {
  const pillars = [
    {
      title: "AI Learning",
      desc: "Learn faster with your personal AI mentor. Contextual answers, notes summaries, dynamic flashcards, and quiz generators.",
      href: "/features/ai-learning",
      color: "border-purple-500/20 text-purple-650 dark:text-purple-400 bg-purple-500/5",
      icon: DashboardIcon,
      accentColor: "#7C3AED",
    },
    {
      title: "Learning Experience",
      desc: "Study through structured paths, distraction-free player, progress bookmarks, and verifiable graduation certificates.",
      href: "/features/learning-experience",
      color: "border-blue-500/20 text-blue-650 dark:text-blue-400 bg-blue-500/5",
      icon: BookIcon,
      accentColor: "#2563EB",
    },
    {
      title: "Teaching Tools",
      desc: "Build drag-and-drop curriculums, grade student assignments, manage quizzes, and track payments.",
      href: "/features/teaching-tools",
      color: "border-emerald-500/20 text-emerald-650 dark:text-emerald-400 bg-emerald-500/5",
      icon: PencilIcon,
      accentColor: "#059669",
    },
    {
      title: "Organization",
      desc: "Deploy custom learning environments for employees. Cohorts directories, compliance auditing, and SSO checks.",
      href: "/features/organization",
      color: "border-amber-500/20 text-amber-650 dark:text-amber-400 bg-amber-500/5",
      icon: LayersIcon,
      accentColor: "#D97706",
    },
    {
      title: "Community",
      desc: "Connect with developers worldwide. Forums discussions, study teams, coding leaderboard rankings, and peer reviews.",
      href: "/features/community",
      color: "border-rose-500/20 text-rose-650 dark:text-rose-400 bg-rose-500/5",
      icon: UsersIcon,
      accentColor: "#BE185D",
    },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1C1917] dark:bg-[#0f0f10] dark:text-[#EAE6DF] transition-colors duration-normal ease-in-out min-h-screen pb-16">
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-stone-200 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute right-8 top-1/4 opacity-10 dark:opacity-20 hidden lg:block">
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
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#c79436]">
              PragyaOS Pillars
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.07] tracking-tight text-stone-900 dark:text-white"
          >
            Experience learning.
            <br />
            Explore <span className="text-[#c79436]">every feature dimension.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed"
          >
            We designed PragyaOS to feel clean, modular, and extremely fast. Choose a feature pillar
            below to see how we are building the future of learning.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Dynamic Feature Grid ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[250px]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-md border ${p.color}`}
                    >
                      Pillar {idx + 1}
                    </span>
                    <Icon
                      size={18}
                      className="text-stone-400 dark:text-stone-550"
                      style={{ color: p.accentColor }}
                    />
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white leading-tight">
                    {p.title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex justify-end">
                  <AnimatedNavLink
                    to={p.href}
                    underlineVariant="random"
                    circleVariant="random"
                    className="text-xs font-sans font-bold text-[#c79436]"
                  >
                    Explore Pillar →
                  </AnimatedNavLink>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Hand-drawn organic divider */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <OrganicDivider className="w-full text-stone-300 dark:text-stone-850 h-8 opacity-75" />
      </div>

      {/* ── 3. Call To Action ── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-stone-900 dark:bg-stone-900/60 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-stone-800 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <AuthSparkle color="#ffffff" className="w-96 h-96" />
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Ready to start?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
            Create your account today and unlock every feature dimension of the PragyaOS ecosystem.
          </p>

          <AnimatedNavLink
            to="/register"
            underlineVariant="random"
            circleVariant="random"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white hover:bg-stone-100 text-stone-950 text-sm font-sans font-bold transition-all duration-200 hover:shadow-md"
          >
            Create Your Account
          </AnimatedNavLink>
        </div>
      </section>
    </div>
  );
}

export default FeaturesMainComposition;
