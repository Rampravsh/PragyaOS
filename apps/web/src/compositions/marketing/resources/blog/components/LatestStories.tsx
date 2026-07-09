import React from "react";
import { AnimatedNavLink } from "@/components/marketing/shared/AnimatedNavLink";

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: "tutorial-memory-tracks",
    category: "Tutorials",
    title: "Building custom memory tracks in React and Redux Toolkit.",
    excerpt:
      "Learn how to persist workspace settings, dynamic state queries, and student note logs reactively.",
    readTime: "6 Min Read",
    date: "July 8, 2026",
    author: "Rampravesh K.",
  },
  {
    id: "product-editorial-aesthetic",
    category: "Product Updates",
    title: "Why we chose an editorial design aesthetic for PragyaOS.",
    excerpt:
      "Exploring the intersections of print typography, rough paper margins, and high-performance React systems.",
    readTime: "8 Min Read",
    date: "July 5, 2026",
    author: "Design Lead",
  },
  {
    id: "engineering-ssg-mdx",
    category: "Engineering",
    title: "Static site generation and MDX content players at scale.",
    excerpt:
      "Structuring developer portals, sidebar navigation trees, and on-page headings trackers without bundle bloat.",
    readTime: "10 Min Read",
    date: "June 28, 2026",
    author: "Systems Eng",
  },
];

export function LatestStories(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="border-b-2 border-stone-850 dark:border-stone-800 pb-3 mb-6">
        <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white">
          Latest Stories
        </h3>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((art) => (
          <div
            key={art.id}
            className="group relative p-6 bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            {/* Tilted handwritten-style category label */}
            <div className="absolute -top-3.5 left-4 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-300 dark:border-stone-850 px-2.5 py-1 rounded-md transform -rotate-2 group-hover:rotate-1 transition-transform duration-150 z-10">
              <span className="text-[9px] font-sans font-bold text-[#c79436] uppercase tracking-wider">
                {art.category}
              </span>
            </div>

            <div>
              {/* Spacer for category label */}
              <div className="h-2.5 mb-4" />

              <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white mb-3 group-hover:text-[#c79436] transition-colors leading-snug">
                {art.title}
              </h4>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {art.excerpt}
              </p>
            </div>

            {/* Footer details */}
            <div className="border-t border-stone-150 dark:border-stone-800/80 pt-4 mt-auto">
              <div className="flex justify-between items-center text-[10px] font-sans text-stone-500 dark:text-stone-450">
                <span>By {art.author}</span>
                <span>{art.readTime}</span>
              </div>
              <div className="mt-4 flex justify-end">
                <AnimatedNavLink
                  to={`/resources/blog/${art.id}`}
                  underlineVariant="short"
                  circleVariant="random"
                  className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  Read &rarr;
                </AnimatedNavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestStories;
