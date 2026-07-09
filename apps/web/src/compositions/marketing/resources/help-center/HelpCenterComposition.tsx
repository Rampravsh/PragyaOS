import React, { useState } from "react";
import { HelpSearch } from "./components/HelpSearch";
import { HelpCategories } from "./components/HelpCategories";
import { ChevronDownIcon } from "@pragyaos/icons";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const POPULAR_FAQS: FAQItem[] = [
  {
    q: "How do I claim my student discount?",
    a: "Verify your academic credentials by sending an email with a scan of your student ID card or transcript to support@pragyaos.org. Once verified, we will apply a 50% discount to your account billing cycles.",
  },
  {
    q: "Why is my payment failing?",
    a: "Ensure your card supports international subscription recurring payments and has sufficient funds. You can also try updating your payment method details in the billing profile tab.",
  },
  {
    q: "Where do I find my course completion certificate?",
    a: "Once you successfully complete all course milestones, video lectures, and quizzes, the certificate will generate automatically. You can view, download, or share it directly from the Course Player dashboard.",
  },
];

export function HelpCenterComposition(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Search Hero Block */}
      <HelpSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* 2. Category grid */}
        <HelpCategories />

        {/* 3. Popular Questions Section */}
        <div className="max-w-3xl mx-auto text-left mb-20">
          <div className="border-b-2 border-stone-850 dark:border-stone-800 pb-3 mb-8">
            <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white">
              Popular Questions
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {POPULAR_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-stone-950 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.06)] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between text-left p-5 font-sans font-bold text-sm text-stone-800 dark:text-stone-200 focus-visible:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon
                      size={16}
                      className={`text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-stone-150 dark:border-stone-800/80 font-sans text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Ticket Support Callout */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif font-bold text-xl text-stone-900 dark:text-white mb-2">
              Still need assistance?
            </h4>
            <p className="font-sans text-stone-600 dark:text-stone-400 text-xs max-w-md leading-relaxed">
              If you couldn't find your answer in our help topics, you can submit a support request.
              We typically respond within 12 hours.
            </p>
          </div>
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-stone-850 dark:border-stone-800 shadow-sm"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterComposition;
