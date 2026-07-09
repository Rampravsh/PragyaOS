import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditorialHeadline, EditorialParagraph, EditorialCard } from "@pragyaos/ui";
import { AuthOpenBook } from "@pragyaos/assets";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is PragyaOS?",
    answer: "PragyaOS is an enterprise-grade Learning Experience Platform (LXP) engineered with a decoupled, modular design system. It allows organizations to host distraction-free study portals, manage custom educational tracks, and publish courses at scale.",
  },
  {
    question: "How does the pricing toggle save 20%?",
    answer: "Selecting our yearly subscription packages triggers a 20% global discount applied instantly during Stripe checkout compared to the standard month-to-month billing cycles.",
  },
  {
    question: "Can I self-host PragyaOS?",
    answer: "Yes, our Enterprise licensing agreement grants full access to the Docker deployment assets, Prisma repository engines, and local indexing pipelines for custom self-hosted environments.",
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EditorialCard className="bg-stone-50 dark:bg-stone-900/40 border border-border/80 overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4.5 flex items-center justify-between text-left font-serif font-bold text-sm sm:text-base text-foreground focus-visible:outline-none focus-visible:bg-black/5 dark:focus-visible:bg-white/5 transition-colors"
      >
        <span>{item.question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-brand-gold shrink-0 transition-transform duration-normal ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-300 leading-relaxed border-t border-border/30">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </EditorialCard>
  );
}

export function FAQComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center items-center">
          <div className="text-brand-gold bg-brand-gold/10 p-4 rounded-full">
            <AuthOpenBook className="w-12 h-12" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
            Support Center
          </span>
          <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight max-w-xl">
            Frequently Asked Questions
          </EditorialHeadline>
          <EditorialParagraph lead className="max-w-xl text-stone-600 dark:text-stone-300">
            Find answers to commonly asked questions about PragyaOS subscription plans, features, and enterprise integrations.
          </EditorialParagraph>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4 mt-2">
          {FAQS.map((item, index) => (
            <FAQAccordionItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQComposition;
