import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@pragyaos/icons";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time directly from your billing profile page. If you cancel, your access to premium features will remain active until the end of your current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a full 14-day money-back guarantee for all new subscriptions on the Pro and Team plans. If you are unsatisfied for any reason, contact our support team within 14 days of your purchase for a full refund.",
  },
  {
    question: "Is there a student discount available?",
    answer:
      "Absolutely! We support our learner community by offering a 50% discount on the Pro plan for all verified students and academic educators. Reach out to our support team with a valid academic email to apply.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can switch between plans at any point. Upgrades are applied instantly and billed on a pro-rata basis, while downgrades will take effect at the start of your next billing cycle.",
  },
  {
    question: "How does the billing system work?",
    answer:
      "We bill subscriptions either monthly or annually in advance. All transaction receipts, subscription parameters, and payment modes can be securely managed from the Billing Settings in your workspace profile.",
  },
];

export function PricingFAQ(): React.JSX.Element {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-background border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl text-stone-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 text-sm">
            Got questions about pricing, refunds, or billing? We've got answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((faq, idx) => {
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
                  <span>{faq.question}</span>
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
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingFAQ;
