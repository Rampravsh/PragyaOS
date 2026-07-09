import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthSparkle, AuthTwig, Lines } from "@pragyaos/assets";

const OrganicDivider = Lines.OrganicDivider;

export function LearningExperienceComposition(): React.JSX.Element {
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
          <AuthTwig color="#2563EB" strokeWidth={1} className="w-24 h-72" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <AuthSparkle color="#2563EB" className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#2563EB]">
              Slick Student Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.07] tracking-tight text-stone-900 dark:text-white"
          >
            A learning experience
            <br />
            that feels like <span className="text-[#2563EB]">editorial magic.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed"
          >
            Immerse yourself in structured study tracks. We built a distraction-free course player
            with native notes, automatic bookmarks, and verifiable completion certificates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-stone-900 hover:bg-black dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white dark:text-white text-sm font-sans font-bold transition-all duration-200 hover:shadow-md"
            >
              Start Learning Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. The Features Flow (Apple Scroll Style) ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-16">
        {[
          {
            title: "1. The Structured Learning Journey",
            subtitle: "Never ask 'what should I study next?'",
            desc: "Every course is broken down into structured sections, milestones, and hands-on exercises. Navigate syllabus modules cleanly, track dynamic progress indicators, and resume exactly where you left off.",
            image: "Course Player timeline with visual progress highlights",
            side: "left",
          },
          {
            title: "2. Distraction-free Player Console",
            subtitle: "Optimized for deep intellectual focus",
            desc: "Our responsive player isolates you from feed loops. Write notes directly side-by-side with video timelines. All files, downloads, and cheatsheets sit in a clean sidebar panel.",
            image: "Clean UI player layout with markdown note card side-by-side",
            side: "right",
          },
          {
            title: "3. Gamified Achievements & Milestones",
            subtitle: "Celebrate your coding breakthroughs",
            desc: "Receive customized badges as you reach lesson thresholds. Run mock evaluations to test concepts, complete assignment checkpoints, and build learning velocity logs.",
            image: "Interactive streak widgets and custom badge achievements",
            side: "left",
          },
          {
            title: "4. Verifiable Smart Credentials",
            subtitle: "Share your achievements with the world",
            desc: "Generate clean, verifiable completion certificates with QR verification links. Share directly to LinkedIn, Twitter, or export high-resolution PDFs.",
            image: "Stunning certificate mockups with digital security seals",
            side: "right",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              feature.side === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={`flex flex-col gap-4 ${feature.side === "right" ? "lg:order-2" : ""}`}>
              <span className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider">
                {feature.subtitle}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white leading-tight">
                {feature.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>

            <div
              className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-8 rounded-2xl shadow-sm h-64 flex items-center justify-center text-center font-serif italic text-sm text-stone-400 dark:text-stone-500 relative overflow-hidden ${
                feature.side === "right" ? "lg:order-1" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[#FAF7F2] dark:bg-stone-950/20 opacity-50" />
              <div className="relative z-10 p-6 flex flex-col gap-2">
                <span className="font-sans font-bold not-italic text-[10px] text-stone-500 uppercase tracking-widest">
                  Preview Canvas
                </span>
                <span>{feature.image}</span>
              </div>
            </div>
          </div>
        ))}
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
            Ready to experience PragyaOS?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
            Register as a student today and start learning through editorial, handcrafted course
            tracks.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white hover:bg-stone-100 text-stone-950 text-sm font-sans font-bold transition-all duration-200 hover:shadow-md"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LearningExperienceComposition;
