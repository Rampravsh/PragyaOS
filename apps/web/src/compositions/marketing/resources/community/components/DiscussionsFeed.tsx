import React from "react";
import { MessageSquareIcon, ArrowRightIcon } from "@pragyaos/icons";

interface Thread {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  replies: number;
  upvotes: number;
  tags: string[];
}

const THREADS: Thread[] = [
  {
    id: "t1",
    title: "Best practices for modular repository layouts in complex monorepos?",
    excerpt:
      "I'm setting up a Next.js client beside our core service interfaces. How are you sharing type parameters without circular dependency locks?",
    author: "Aditya S.",
    role: "Fullstack Dev",
    replies: 14,
    upvotes: 42,
    tags: ["architecture", "monorepo"],
  },
  {
    id: "t2",
    title: "How to load custom LLM system prompts inside course annotators?",
    excerpt:
      "I want our student cohorts to ask the AI Tutor questions scoped specifically to our database schemas chapter. Can we override system parameters locally?",
    author: "Priya M.",
    role: "Instructor",
    replies: 9,
    upvotes: 28,
    tags: ["ai-tutor", "pedagogy"],
  },
  {
    id: "t3",
    title: "Editorial Design styling tips: Custom wiggles and paper stacks",
    excerpt:
      "Shared my CSS classes to create organic drawing highlights and notebook spiral boundaries. Check the showcase thread for code snippets!",
    author: "Rohan D.",
    role: "UI Engineer",
    replies: 23,
    upvotes: 89,
    tags: ["showcase", "css"],
  },
];

export function DiscussionsFeed(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6 text-left">
      {THREADS.map((thread) => (
        <div
          key={thread.id}
          className="group relative p-6 bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] hover:-translate-y-0.5 transition-all duration-150 flex flex-col md:flex-row gap-6 justify-between items-start"
        >
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500">
                Posted by {thread.author} ({thread.role})
              </span>
              <div className="flex gap-1.5">
                {thread.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-muted border border-stone-200 dark:border-stone-800 rounded-md text-[9px] font-sans text-stone-500 dark:text-stone-405 lowercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white mb-2 group-hover:text-brand-gold transition-colors leading-snug">
              {thread.title}
            </h4>
            <p className="font-sans text-stone-650 dark:text-stone-400 text-xs leading-relaxed max-w-2xl">
              {thread.excerpt}
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto shrink-0 gap-4 md:border-l border-stone-150 dark:border-stone-800/80 md:pl-6 pt-4 md:pt-0">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <span className="text-xs font-sans font-bold">{thread.upvotes}</span>
                <span className="text-[9px] font-sans uppercase tracking-wider">Upvotes</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <MessageSquareIcon size={14} />
                <span className="text-xs font-sans font-bold">{thread.replies}</span>
                <span className="text-[9px] font-sans uppercase tracking-wider">Replies</span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-sans font-bold text-stone-850 dark:text-stone-200 group-hover:text-brand-gold transition-colors"
            >
              Join Thread <ArrowRightIcon size={14} className="mt-0.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DiscussionsFeed;
