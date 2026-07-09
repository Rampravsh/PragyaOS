import React, { useState } from "react";
import { FeaturedStory } from "./components/FeaturedStory";
import { LatestStories } from "./components/LatestStories";
import { BookIcon } from "@pragyaos/icons";

export function BlogComposition(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Magazine Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest block mb-3">
            <BookIcon size={12} className="inline-block" /> Magazine & Ideas
          </span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-stone-900 dark:text-white leading-[1.1] mb-6">
            Learn & Develop Ecosystem
          </h1>
          <p className="font-sans text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
            Written by lead educators and systems architects, exploring building block systems,
            cognitive layouts, and online pedagogy.
          </p>
        </div>

        {/* 1. Featured Article */}
        <FeaturedStory />

        {/* 2. Latest Stories grid */}
        <LatestStories />

        {/* 3. Newsletter Banner */}
        <div className="mt-20 bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="max-w-xl">
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-900 dark:text-white mb-3">
              Join the Magazine
            </h3>
            <p className="font-sans text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
              Sign up to receive bi-weekly editorials covering pedagogy, cognitive structures,
              web-development, and product releases.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[280px] sm:min-w-[340px]">
            {isSubscribed ? (
              <div className="bg-muted border border-brand-gold/40 p-4 rounded-xl text-center">
                <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  ✓ Successfully Subscribed
                </span>
                <span className="text-[10px] font-sans text-stone-500 mt-1 block">
                  We've sent a welcome note to your inbox.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-muted border border-stone-300 dark:border-stone-850 rounded-xl font-sans text-xs text-stone-900 dark:text-white placeholder-stone-450 focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:text-stone-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComposition;
