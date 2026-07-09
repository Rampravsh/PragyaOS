import React from "react";
import { DiscussionsFeed } from "./components/DiscussionsFeed";
import { LeaderboardWidget } from "./components/LeaderboardWidget";
import { CalendarIcon } from "@pragyaos/icons";

interface CohortEvent {
  title: string;
  date: string;
  time: string;
  type: string;
}

const EVENTS: CohortEvent[] = [
  {
    title: "Monorepo structures & TS setup workshop",
    date: "July 12, 2026",
    time: "6:00 PM IST",
    type: "Live Workshop",
  },
  {
    title: "AI tutor prompting study circle",
    date: "July 15, 2026",
    time: "8:00 PM IST",
    type: "Study Circle",
  },
];

export function CommunityComposition(): React.JSX.Element {
  return (
    <div className="bg-[#FAF7F2] dark:bg-[#0f0f10] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-sans font-bold text-[#c79436] uppercase tracking-widest block mb-3">
            💬 Connected Cohorts
          </span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-stone-900 dark:text-white leading-[1.1] mb-6">
            Ecosystem discussions & showcases
          </h1>
          <p className="font-sans text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
            Collaborate on features development, check upcoming live workshops, and compete for XP
            points standings in our builder rankings.
          </p>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Discussions (Span 8) */}
          <div className="lg:col-span-8">
            <DiscussionsFeed />
          </div>

          {/* Right Column: Leaderboards & Events (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Standings widget */}
            <LeaderboardWidget />

            {/* Live Events widget */}
            <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] text-left">
              <div className="flex items-center gap-3 border-b-2 border-stone-850 dark:border-stone-800 pb-4 mb-6">
                <CalendarIcon size={20} className="text-[#c79436]" />
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
                  Cohort Events
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {EVENTS.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-xl"
                  >
                    <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-yellow-950/60 border border-yellow-250 dark:border-yellow-900 rounded text-[8px] font-sans font-bold text-yellow-800 dark:text-yellow-405 uppercase tracking-wide mb-2.5">
                      {ev.type}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-stone-850 dark:text-stone-200 mb-1.5">
                      {ev.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-sans text-stone-400">
                      <span>{ev.date}</span>
                      <span>•</span>
                      <span>{ev.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityComposition;
