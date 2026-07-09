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
    { name: 'Data Structures', progress: 40, color: '#A97E3E' },
    { name: 'UI/UX Design', progress: 75, color: '#38BDF8' },
    { name: 'Machine Learning', progress: 20, color: '#10B981' },
  ];

  return (
    <div
      className="w-full bg-background dark:bg-[#16162A] rounded-xl overflow-hidden shadow-2xl border border-stone-200/60 dark:border-white/8 select-none transition-colors duration-300"
      role="img"
      aria-label="PragyaOS dashboard preview"
    >
      {/* Browser title bar */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-100 dark:bg-[#0D0D1E] border-b border-stone-200/50 dark:border-white/5 transition-colors duration-300">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        <div className="ml-3 flex-1 flex items-center gap-2">
          <div className="bg-stone-200/60 dark:bg-white/5 rounded px-2 py-0.5 flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-stone-600 dark:text-white/30">PragyaOS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="w-4 h-4 rounded-full bg-stone-200/60 dark:bg-white/5 flex items-center justify-center">
            <span className="text-[7px] text-stone-600 dark:text-white/40">🔔</span>
          </div>
          {/* User avatar */}
          <div className="w-5 h-5 rounded-full bg-amber-400/60 flex items-center justify-center text-[8px] font-bold text-white">A</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ height: 320 }}>
        {/* Sidebar */}
        <div className="w-36 bg-[#0D0D1E] dark:bg-background border-r border-white/5 dark:border-stone-200/50 flex flex-col py-3 px-2.5 shrink-0 transition-colors duration-300">
          {/* Brand */}
          <div className="flex items-center gap-1.5 mb-4 px-1">
            <div className="w-4 h-4 rounded bg-[#A97E3E] flex items-center justify-center text-[6px] font-bold text-white">
              P
            </div>
            <span className="text-[9px] font-semibold text-white/50 dark:text-[#1C1917]/60">PragyaOS</span>
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
              className={`flex items-center gap-1.5 px-2 py-[5px] rounded-md text-[9px] mb-px cursor-default transition-all ${item.active
                  ? 'bg-white/10 text-white font-semibold dark:bg-[#A97E3E]/10 dark:text-[#A97E3E]'
                  : 'text-white/40 hover:text-white/60 dark:text-stone-500 dark:hover:text-[#1C1917]'
                }`}
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-3.5 overflow-hidden flex flex-col gap-3 bg-background dark:bg-[#16162A] transition-colors duration-300">
          {/* Header greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-stone-500 dark:text-white/35 font-sans">Continue Learning</p>
              <p className="text-[11px] font-semibold text-[#1C1917] dark:text-white/80">Welcome back, Ananya 👋</p>
            </div>
          </div>

          {/* Course cards */}
          <div className="grid grid-cols-3 gap-2">
            {COURSES.map((c) => (
              <div key={c.name} className="bg-white dark:bg-white/5 rounded-lg p-2 border border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
                <div
                  className="w-full h-10 rounded-md mb-1.5 opacity-80 dark:opacity-40"
                  style={{ backgroundColor: c.color }}
                />
                <p className="text-[8px] font-semibold text-stone-700 dark:text-white/60 truncate mb-1">{c.name}</p>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-0.5 bg-stone-200 dark:bg-white/10 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.progress}%`, backgroundColor: c.color }}
                    />
                  </div>
                  <span className="text-[7px] text-stone-500 dark:text-white/30">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom analytics row */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Progress chart */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-2 border border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <p className="text-[8px] text-stone-500 dark:text-white/35 mb-0.5">My Progress</p>
              <p className="text-[11px] font-bold text-[#A97E3E] mb-1.5">+15%</p>
              <div className="flex items-end gap-0.5 h-10">
                {[30, 48, 36, 62, 52, 75, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-[#A97E3E]/20 dark:bg-[#A97E3E]/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Upcoming */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-2 border border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <p className="text-[8px] text-stone-500 dark:text-white/35 mb-1.5">Upcoming</p>
              {[
                'Quiz: Friday 1:00 PM',
                'Assignment due',
                'Assigned by: Lisa Prewitt',
                'Live session',
              ].map((t) => (
                <div key={t} className="flex items-center gap-1 mb-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#A97E3E]/60 shrink-0" />
                  <span className="text-[7px] text-stone-600 dark:text-white/40 truncate">{t}</span>
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
      className="relative w-36 shrink-0 hidden md:block select-none"
      role="img"
      aria-label="Mobile app preview"
    >
      <div className="w-full bg-stone-900 dark:bg-stone-950 p-[5px] rounded-[24px] border border-stone-700/50 dark:border-stone-850 shadow-2xl transition-colors duration-300">
        <div className="w-full bg-background dark:bg-[#16162A] rounded-[19px] overflow-hidden flex flex-col transition-colors duration-300">
          {/* Notch & status bar */}
          <div className="flex items-center justify-between px-2.5 pt-1.5 pb-1 bg-stone-100 dark:bg-[#0D0D1E] text-[5px] text-stone-500 dark:text-white/40">
            <span>9:41</span>
            <div className="w-8 h-1.5 bg-stone-900 rounded-full flex items-center justify-center -mt-0.5 scale-[0.8]" />
            <div className="flex items-center gap-0.5">
              <span>📶</span>
            </div>
          </div>
          {/* App bar */}
          <div className="px-2 py-1 bg-white dark:bg-white/5 border-b border-stone-200/50 dark:border-white/5 flex items-center justify-between transition-colors duration-300">
            <span className="text-[6px] font-bold text-stone-800 dark:text-white/80">Welcome back, Ananya 👋</span>
          </div>
          {/* Content */}
          <div className="p-1.5 flex flex-col gap-1.5">
            <div className="bg-white dark:bg-white/5 rounded-lg p-1.5 border border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <p className="text-[6px] text-[#A97E3E] font-bold mb-1">Data Structures</p>
              <div className="text-[5px] text-stone-600 dark:text-white/50 space-y-0.5">
                <div>1. Introduction</div>
                <div>2. Array Types</div>
                <div className="text-[#A97E3E] font-bold">3. Tree Traversal</div>
                <div>4. Balanced Trees</div>
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 rounded-lg p-1.5 border border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <p className="text-[6px] text-stone-700 dark:text-white/60 font-semibold mb-1">My Progress</p>
              {[70, 45, 90, 55].map((w, i) => (
                <div key={i} className="h-0.5 bg-stone-200 dark:bg-white/10 rounded-full mb-0.5">
                  <div className="h-full bg-[#A97E3E] rounded-full" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
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
      <div className="relative w-full overflow-hidden bg-background transition-colors duration-300" style={{ height: 64 }} aria-hidden="true">
        <svg
          className="absolute bottom-0 left-0 w-full text-[#0F0F1A] dark:text-[#FAF7F2] transition-colors duration-300 translate-y-[1px]"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,20 L30,22 L55,18 L85,25 L115,20 L145,24 L175,19 L205,23 L235,18 L265,22 L295,19 L325,25 L355,20 L385,24 L415,18 L445,23 L475,20 L505,25 L535,18 L565,22 L595,20 L625,24 L655,18 L685,23 L715,19 L745,25 L775,20 L805,24 L835,18 L865,23 L895,19 L925,25 L955,20 L985,24 L1015,18 L1045,23 L1075,20 L1105,25 L1135,18 L1165,22 L1195,19 L1225,24 L1255,20 L1285,23 L1315,18 L1345,22 L1375,19 L1405,24 L1440,20 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <section
        id="feature-section"
        className="relative bg-[#0F0F1A] dark:bg-background text-white dark:text-[#1C1917] transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="feature-heading"
      >
        {/* Radial glow behind mockup */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(169,126,62,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Floating stars */}
        <div className="absolute top-12 right-1/4 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={7} yOffset={4}>
            <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-amber-400/20 dark:text-[#A97E3E]/20" strokeWidth={1} />
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
                <span className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-[#A97E3E]">
                  Everything in one place
                </span>

                {/* Heading */}
                <h2
                  id="feature-heading"
                  className="font-serif font-bold text-white dark:text-[#1C1917] leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-[44px]"
                >
                  A platform built
                  <br />
                  for meaningful
                  <br />
                  <span className="relative text-[#A97E3E] dark:text-[#A97E3E]">
                    learning.
                    <span className="absolute -bottom-1 left-0 pointer-events-none w-full" aria-hidden="true">
                      <DecorativeAsset
                        asset={HighlightCircle}
                        className="w-full h-auto text-amber-400/20 dark:text-[#A97E3E]/30"
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
                        <div className="w-7 h-7 rounded bg-white/5 dark:bg-stone-100 border border-white/10 dark:border-stone-200 flex items-center justify-center text-[#A97E3E] group-hover:bg-[#A97E3E]/10 group-hover:text-[#8F6A33] dark:group-hover:text-[#8F6A33] transition-all duration-200 shrink-0">
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
                  className="inline-flex items-center px-5 py-2.5 bg-[#A97E3E] hover:bg-[#8F6A33] dark:bg-white dark:hover:bg-stone-100 dark:text-stone-900 text-white text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
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
