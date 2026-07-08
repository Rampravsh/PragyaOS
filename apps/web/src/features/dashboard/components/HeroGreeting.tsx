import { motion } from "framer-motion";
import { PaperPlane, TinyDots, ImperfectCircle } from "@pragyaos/assets";

// ─── QuoteCard ────────────────────────────────────────────────────────────────

function QuoteCard() {
  return (
    <div className="relative flex flex-col gap-1 text-right">
      {/* Decorative dots */}
      <TinyDots
        className="absolute -top-4 -right-4 opacity-20 pointer-events-none"
        color="currentColor"
      />

      <span className="font-sans text-xs text-muted-foreground tracking-wider uppercase font-medium">
        ✦ ✦
      </span>
      <blockquote className="font-serif italic text-sm text-muted-foreground leading-relaxed max-w-[200px] ml-auto">
        "The beautiful thing about learning is nobody can take it away from you."
      </blockquote>
      <footer className="font-sans text-xs text-muted-foreground/70 font-medium">
        — B.B. King
      </footer>
    </div>
  );
}

// ─── HeroGreeting ─────────────────────────────────────────────────────────────

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: "easeOut" } },
} as const;

const rightVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.15, ease: "easeOut" } },
} as const;

export function HeroGreeting(): React.JSX.Element {
  return (
    <div className="flex items-start justify-between gap-8">
      {/* Left — greeting text */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="font-sans font-bold text-3xl text-foreground leading-tight tracking-tight flex items-center gap-2 flex-wrap"
        >
          Welcome back, Ananya
          <span aria-label="waving hand" role="img">
            👋
          </span>
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="font-sans text-sm text-muted-foreground"
        >
          Ready to continue your learning journey?
        </motion.p>
      </div>

      {/* Right — quote + paper plane decoration */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start gap-4 shrink-0"
      >
        <QuoteCard />

        {/* Paper plane decoration */}
        <div className="relative mt-2">
          <ImperfectCircle
            className="absolute -top-3 -left-3 w-16 h-16 text-muted-foreground/10 pointer-events-none"
            color="currentColor"
          />
          <PaperPlane
            className="w-12 h-10 text-muted-foreground/40"
            color="currentColor"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HeroGreeting;
