import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthSparkle, AuthTwig, Lines, Arrows } from "@pragyaos/assets";
import { AnimatedNavLink, AnimatedNavButton } from "@/components/marketing/shared/AnimatedNavLink";
import {
  UserIcon,
  BookIcon,
  MessageSquareIcon,
  AlertCircleIcon,
  BookmarkIcon,
  CalendarIcon,
} from "@pragyaos/icons";

const OrganicDivider = Lines.OrganicDivider;
const CurvedArrow = Arrows.CurvedArrow;

export function AILearningComposition(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    {
      title: "Ask Question",
      desc: "Ask anything about your syllabus, video transcripts, or handouts in natural language.",
    },
    {
      title: "AI Understands",
      desc: "Our model reads the entire context of your courses, parsing specific references.",
    },
    {
      title: "Explains Simply",
      desc: "Receive clear, simplified analogies or code examples tailored to your level.",
    },
    {
      title: "Generates Quiz",
      desc: "Test your retention immediately with custom, context-aware feedback exercises.",
    },
    {
      title: "Tracks Progress",
      desc: "Saves weak areas and updates your personalized study planner automatically.",
    },
  ];

  const cards = [
    {
      title: "AI Tutor",
      desc: "A patient, personalized 24/7 tutor that explains complex concepts simply.",
      icon: UserIcon,
      color: "text-purple-500 bg-purple-500/5",
    },
    {
      title: "AI Notes",
      desc: "Automatic key summaries, semantic highlighted code cards, and takeaways.",
      icon: BookIcon,
      color: "text-blue-500 bg-blue-500/5",
    },
    {
      title: "AI Chat",
      desc: "Chat naturally about any course materials, videos, or syllabus attachments.",
      icon: MessageSquareIcon,
      color: "text-emerald-500 bg-emerald-500/5",
    },
    {
      title: "AI Quiz",
      desc: "Instantly generate testing metrics and feedback loops on course units.",
      icon: AlertCircleIcon,
      color: "text-amber-500 bg-amber-500/5",
    },
    {
      title: "AI Flashcards",
      desc: "Spaced repetition flashcards generated automatically from your weak topics.",
      icon: BookmarkIcon,
      color: "text-rose-500 bg-rose-500/5",
    },
    {
      title: "AI Planner",
      desc: "Dynamic calendar blocks that schedule weekly chapters based on your availability.",
      icon: CalendarIcon,
      color: "text-indigo-500 bg-indigo-500/5",
    },
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-normal ease-in-out min-h-screen pb-16">
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-stone-200 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Floating Twig Drawing */}
        <div className="absolute right-8 top-1/4 opacity-10 dark:opacity-20 hidden lg:block">
          <AuthTwig color="currentColor" strokeWidth={1} className="w-24 h-72 text-brand-gold" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <AuthSparkle color="#7C3AED" className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#7C3AED]">
              AI Tutor & Mentor
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[1.07] tracking-tight text-stone-900 dark:text-white"
          >
            Learn with AI.
            <br />
            Not just search. <span className="text-[#7C3AED]">Actually understand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed"
          >
            PragyaOS integrates deep contextual understanding into your study desk. An AI tutor that
            is trained directly on your course syllabus, lecture notes, and video materials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mt-2 relative animate-in fade-in zoom-in duration-200"
          >
            <div className="absolute -left-16 -top-12 opacity-80 rotate-12 hidden md:block">
              <CurvedArrow color="#7C3AED" strokeWidth={1.5} className="w-12 h-12" />
            </div>

            <AnimatedNavLink
              to="/register"
              underlineVariant="random"
              circleVariant="random"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-sans font-bold transition-all duration-200 hover:shadow-md"
            >
              Try Pragya AI
            </AnimatedNavLink>
            <button
              type="button"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-stone-300 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-900/50 text-stone-800 dark:text-stone-200 text-sm font-sans font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Feature Cards grid ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            Your Personal Cognitive Toolkit
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-normal">
            No generic prompts. Every tool is hyper-tailored to the active course chapter you are
            exploring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white leading-tight">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Organic divider */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <OrganicDivider className="w-full text-stone-300 dark:text-stone-850 h-8 opacity-75" />
      </div>

      {/* ── 3. Interactive Workflow (Apple/Linear Style) ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            How Pragya AI Works
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-normal">
            See the cognitive cycle that takes you from raw lecture files to complete mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 sm:p-8 rounded-3xl shadow-sm">
          {/* Steps list selector */}
          <div className="flex flex-col gap-3">
            {workflowSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <AnimatedNavButton
                  key={step.title}
                  isActive={isActive}
                  onClick={() => setActiveStep(idx)}
                  underlineVariant="random"
                  circleVariant="random"
                  className="text-left w-full p-4 rounded-xl"
                  activeClassName="bg-background dark:bg-stone-800 text-[#7C3AED]"
                  inactiveClassName="text-stone-500 hover:text-stone-800 dark:hover:text-stone-250"
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isActive ? "bg-[#7C3AED] text-white" : "bg-stone-150 dark:bg-stone-800"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span>STEP {idx + 1}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base leading-tight mb-1">
                    {step.title}
                  </h3>
                </AnimatedNavButton>
              );
            })}
          </div>

          {/* Steps detail display */}
          <div className="bg-background dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-850 p-8 rounded-2xl h-[260px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <AuthSparkle color="#7C3AED" className="w-48 h-48" />
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#7C3AED]">
                Interactive Demo Workflow
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white leading-tight">
                {workflowSteps[activeStep].title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                {workflowSteps[activeStep].desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-stone-200/50 dark:border-stone-800/80 pt-4 relative z-10 text-xs text-stone-400">
              <span>Interactive Simulator</span>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % workflowSteps.length)}
                className="text-[#7C3AED] font-sans font-bold hover:underline"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Split Notebook Showcase ── */}
      <section className="py-12 border-t border-b border-stone-200 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              An Active AI Notebook that reads along
            </h2>
            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Pragya AI isn't hidden in a chat widget sidebar tab. It sits side-by-side with your
              course materials. Select code scripts, highlight statements, or listen to explanations
              in real-time.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "Highlighted definitions save directly to your notebook deck.",
                "Custom diagrams or graphs render instantly on request.",
                "Exports cleanly to PDF, Markdown, or Notion blocks.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-stone-700 dark:text-stone-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="font-mono text-xs text-stone-400">active_notebook.tsx</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
            </div>

            <div className="font-mono text-xs flex flex-col gap-3 text-stone-750 dark:text-stone-350 bg-background dark:bg-stone-950 p-4 rounded-xl border border-stone-200/50 dark:border-stone-900">
              <p className="text-stone-400">// Select a code block to trigger explanation</p>
              <pre className="text-emerald-600 dark:text-emerald-400">
                {`const explainAsync = async () => {
  const tutor = await PragyaAI.init();
  return tutor.summarize(transcript);
};`}
              </pre>

              <div className="mt-2 pt-3 border-t border-stone-200/60 dark:border-stone-800 flex flex-col gap-1 text-stone-900 dark:text-stone-150">
                <span className="font-sans font-bold text-[#7C3AED]">
                  🤖 Pragya Tutor response:
                </span>
                <p className="font-sans text-xs leading-normal">
                  "This function initializes the active AI tutor context and asynchronously analyzes
                  the course video transcript to extract a 3-bullet core summary."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Comparison Matrix ── */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-stone-900 dark:text-white mb-10 tracking-tight">
          How does Pragya AI compare?
        </h2>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-stone-50/50 dark:bg-stone-950/20 border-b border-stone-150 dark:border-stone-800/80 p-4 font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">
            <span>Capabilities</span>
            <span className="text-center">Traditional</span>
            <span className="text-center text-[#7C3AED]">Pragya AI</span>
          </div>

          <div className="divide-y divide-stone-150 dark:divide-stone-850">
            {[
              {
                title: "Syllabus Context Awareness",
                trad: "❌ Generic Search",
                ai: "✓ Deep contextual logs",
              },
              {
                title: "Active Video Integration",
                trad: "❌ Offsite links only",
                ai: "✓ Timed transcript search",
              },
              {
                title: "Interactive Auto-Quizzes",
                trad: "❌ Static multiple choice",
                ai: "✓ Code evaluations & feedback",
              },
              {
                title: "Data Ownership Export",
                trad: "❌ Locked in browser",
                ai: "✓ Zero vendor-lock output",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.5fr_1fr_1fr] p-4 text-xs sm:text-sm font-sans items-center"
              >
                <span className="font-medium text-stone-850 dark:text-stone-250">{row.title}</span>
                <span className="text-center text-stone-400">{row.trad}</span>
                <span className="text-center text-[#7C3AED] font-semibold">{row.ai}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Call To Action ── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-stone-900 dark:bg-stone-900/60 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-stone-800 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <AuthSparkle color="#ffffff" className="w-96 h-96" />
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Start Learning with AI
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
            Create your account today and unlock a personalized learning desk tailored to your pace.
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

export default AILearningComposition;
