import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  LayersIcon,
  StarIcon,
  TrophyIcon,
  MonitorIcon,
} from '@pragyaos/icons';
import {
  Sparkle,
  TinyStar,
  EditorialStar,
  HighlightCircle,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';
import { Link } from 'react-router';

const PLATFORM_FEATURES = [
  {
    id: 'course-builder',
    Icon: LayersIcon,
    title: 'Powerful Course Builder',
    description: 'Easy tools for creators',
  },
  {
    id: 'analytics',
    Icon: StarIcon,
    title: 'Smart Analytics',
    description: 'Insights that help you grow',
  },
  {
    id: 'certificates',
    Icon: TrophyIcon,
    title: 'Certificates & Badges',
    description: 'Recognise real progress',
  },
  {
    id: 'scalable',
    Icon: MonitorIcon,
    title: 'Lecture & Scalable',
    description: 'Built for teams and enterprises',
  },
];

/** Pixel-faithful dashboard mockup matching design screenshot */
const DashboardMockup = memo(function DashboardMockup() {
  const COURSES = [
    { name: 'Data Structures', progress: 40, color: '#818CF8' },
    { name: 'UI/UX Design', progress: 75, color: '#38BDF8' },
    { name: 'Machine Learning', progress: 20, color: '#FB923C' },
  ];

  return (
    <div
      className="w-full bg-[#16162A] rounded-xl overflow-hidden shadow-2xl border border-white/8 dark:border-[#1C1917]/10 select-none"
      role="img"
      aria-label="PragyaOS dashboard preview"
    >
      {/* Browser title bar */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#0D0D1E] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        <div className="ml-3 flex-1 flex items-center gap-2">
          <div className="bg-white/5 rounded px-2 py-0.5 flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-white/30">PragyaOS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-[7px] text-white/40">🔔</span>
          </div>
          {/* User avatar */}
          <div className="w-5 h-5 rounded-full bg-amber-400/60 flex items-center justify-center text-[8px] font-bold text-white">A</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ height: 320 }}>
        {/* Sidebar */}
        <div className="w-36 bg-[#0D0D1E] border-r border-white/5 flex flex-col py-3 px-2.5 shrink-0">
          {/* Brand */}
          <div className="flex items-center gap-1.5 mb-4 px-1">
            <div className="w-4 h-4 rounded bg-violet-500/70 flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">P</span>
            </div>
            <span className="text-[9px] font-semibold text-white/50">PragyaOS</span>
          </div>
          {/* Nav items */}
          {[
            { label: 'Dashboard', active: true },
            { label: 'My Courses', active: false },
            { label: 'Learning Paths', active: false },
            { label: 'Assignments', active: false },
            { label: 'Discussions', active: false },
            { label: 'Certificates', active: false },
            { label: 'Analytics', active: false },
            { label: 'Settings', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 px-2 py-[5px] rounded-md text-[9px] mb-px cursor-default transition-all ${
                item.active
                  ? 'bg-violet-500/25 text-violet-200 font-semibold'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-3.5 overflow-hidden flex flex-col gap-3">
          {/* Header greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/35 font-sans">Continue Learning</p>
              <p className="text-[11px] font-semibold text-white/80">Welcome back, Ananya 👋</p>
            </div>
          </div>

          {/* Course cards */}
          <div className="grid grid-cols-3 gap-2">
            {COURSES.map((c) => (
              <div key={c.name} className="bg-white/5 rounded-lg p-2 border border-white/5">
                <div
                  className="w-full h-10 rounded-md mb-1.5 opacity-40"
                  style={{ backgroundColor: c.color }}
                />
                <p className="text-[8px] font-semibold text-white/60 truncate mb-1">{c.name}</p>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-0.5 bg-white/10 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.progress}%`, backgroundColor: c.color }}
                    />
                  </div>
                  <span className="text-[7px] text-white/30">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom analytics row */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Progress chart */}
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <p className="text-[8px] text-white/35 mb-0.5">My Progress</p>
              <p className="text-[11px] font-bold text-emerald-400 mb-1.5">+15%</p>
              <div className="flex items-end gap-0.5 h-10">
                {[30, 48, 36, 62, 52, 75, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-violet-400/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Upcoming */}
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <p className="text-[8px] text-white/35 mb-1.5">Upcoming</p>
              {[
                'Quiz: Friday 1:00 PM',
                'Assignment due',
                'Assigned by: Lisa Prewitt',
                'Live session',
              ].map((t) => (
                <div key={t} className="flex items-center gap-1 mb-0.5">
                  <span className="w-1 h-1 rounded-full bg-violet-400/60 shrink-0" />
                  <span className="text-[7px] text-white/40 truncate">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/** Phone mockup with mini tree traversal content */
const PhoneMockup = memo(function PhoneMockup() {
  return (
    <div
      className="relative w-28 shrink-0 hidden lg:block"
      role="img"
      aria-label="Mobile app preview"
    >
      <div className="w-full bg-[#16162A] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-1 bg-[#0D0D1E]">
          <div className="w-10 h-1 bg-white/10 rounded-full" />
        </div>
        {/* Content */}
        <div className="px-2 pb-3 pt-2">
          <p className="text-[6px] text-white/35 mb-1.5">11:21</p>
          <div className="bg-white/5 rounded-lg p-1.5 mb-1.5">
            <p className="text-[6px] text-white/50 font-semibold mb-1">Data Structures</p>
            <div className="text-[5px] text-white/30 space-y-0.5">
              <div className="text-white/50">1. Introduction</div>
              <div className="text-white/50">2. Binary Trees</div>
              <div className="text-violet-300 font-semibold">3. Tree Traversal</div>
              <div>4. Balanced Trees</div>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-1.5">
            <p className="text-[6px] text-white/50 font-semibold mb-1">Overview</p>
            {[70, 45, 90, 55].map((w, i) => (
              <div key={i} className="h-0.5 bg-white/10 rounded-full mb-0.5">
                <div className="h-full bg-violet-400/40 rounded-full" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * FeatureSection: "A platform built for meaningful learning." — dark showcase.
 * Paper-torn SVG divider above, dark #0F0F1A bg, dashboard + phone mockup, violet glow.
 */
export function FeatureSection(): React.JSX.Element {
  return (
    <>
      {/* Paper-torn divider: cream → dark */}
      <div className="relative w-full overflow-hidden bg-[#FAF7F2] dark:bg-[#0f0f10] transition-colors duration-300" style={{ height: 64 }} aria-hidden="true">
        <svg
          className="absolute bottom-0 left-0 w-full text-[#0F0F1A] dark:text-[#FAF7F2] transition-colors duration-300"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,20 C80,44 160,8 240,30 C320,52 400,10 480,32 C560,54 640,12 720,36 C800,60 880,18 960,36 C1040,54 1120,14 1200,34 C1280,54 1360,24 1440,40 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <section
        id="feature-section"
        className="relative bg-[#0F0F1A] dark:bg-[#FAF7F2] text-white dark:text-[#1C1917] transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="feature-heading"
      >
        {/* Radial glow behind mockup */}
        <div
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Floating stars */}
        <div className="absolute top-12 right-1/4 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={7} yOffset={4}>
            <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-violet-400/20 dark:text-violet-600/20" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute bottom-16 left-16 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={9} yOffset={3}>
            <DecorativeAsset asset={EditorialStar} className="w-5 h-5 text-amber-400/15 dark:text-[#A97E3E]/20" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute top-20 left-1/3 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={6} yOffset={2}>
            <DecorativeAsset asset={TinyStar} className="w-3 h-3 text-white/10 dark:text-stone-400/20" strokeWidth={1} />
          </FloatingDecoration>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: headline + bullets + CTA */}
            <FadeIn direction="up" duration="slow">
              <div className="flex flex-col items-start gap-6">
                {/* Eyebrow */}
                <span className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-violet-400/70 dark:text-violet-600">
                  Everything in one place
                </span>

                {/* Heading */}
                <h2
                  id="feature-heading"
                  className="font-serif font-light text-white dark:text-[#1C1917] leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-[44px]"
                >
                  A platform built
                  <br />
                  for meaningful
                  <br />
                  <span className="relative">
                    learning.
                    <span className="absolute -bottom-1 left-0 pointer-events-none" aria-hidden="true">
                      <DecorativeAsset
                        asset={HighlightCircle}
                        className="w-28 h-auto text-violet-400/20 dark:text-violet-600/30"
                        strokeWidth={1.5}
                      />
                    </span>
                  </span>
                </h2>

                {/* Description */}
                <p className="text-sm text-white/50 dark:text-stone-600 font-sans leading-relaxed max-w-sm">
                  Create, organise and share learning experiences that make an impact.
                </p>

                {/* Feature bullet list 2×2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {PLATFORM_FEATURES.map((f, i) => (
                    <FadeIn key={f.id} direction="up" duration="slow" delay={0.08 + i * 0.06}>
                      <motion.div
                        className="flex items-start gap-3 group"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="w-7 h-7 rounded bg-white/5 dark:bg-stone-100 border border-white/10 dark:border-stone-200 flex items-center justify-center text-violet-300/60 dark:text-violet-600 group-hover:bg-violet-500/10 group-hover:border-violet-400/30 group-hover:text-violet-300 dark:group-hover:text-violet-750 transition-all duration-200 shrink-0">
                          <f.Icon size={13} />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-white/75 dark:text-stone-800 leading-tight">{f.title}</p>
                          <p className="text-[10px] text-white/35 dark:text-stone-500 leading-relaxed">{f.description}</p>
                        </div>
                      </motion.div>
                    </FadeIn>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to="/login"
                  className="inline-flex items-center px-5 py-2.5 bg-violet-500 dark:bg-violet-600 hover:bg-violet-400 dark:hover:bg-violet-700 text-white text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 mt-2"
                >
                  Explore the Platform
                </Link>
              </div>
            </FadeIn>

            {/* RIGHT: Dashboard + Phone mockups */}
            <FadeIn direction="up" duration="slow" delay={0.18}>
              <div className="relative flex items-end justify-center lg:justify-end gap-4">
                {/* Dashboard */}
                <div className="relative z-10 flex-1 max-w-[520px]">
                  <DashboardMockup />
                </div>
                {/* Phone overlapping on right edge */}
                <div className="relative z-20 -ml-6 mb-4">
                  <PhoneMockup />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeatureSection;
