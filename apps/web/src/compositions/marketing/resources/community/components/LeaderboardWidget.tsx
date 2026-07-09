import React from "react";
import { AwardIcon } from "@pragyaos/icons";

interface LeaderboardUser {
  rank: number;
  name: string;
  badge: string;
  points: number;
  initials: string;
}

const USERS: LeaderboardUser[] = [
  { rank: 1, name: "Rampravesh Kumar", badge: "Lead Architect", points: 2850, initials: "RK" },
  { rank: 2, name: "Aditya Sharma", badge: "Fullstack Contributor", points: 1940, initials: "AS" },
  { rank: 3, name: "Priya Murthy", badge: "Course Curator", points: 1420, initials: "PM" },
  { rank: 4, name: "Rohan Das", badge: "Design Specialist", points: 980, initials: "RD" },
];

export function LeaderboardWidget(): React.JSX.Element {
  return (
    <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.06)] text-left">
      <div className="flex items-center gap-3 border-b-2 border-stone-850 dark:border-stone-800 pb-4 mb-6">
        <AwardIcon size={20} className="text-[#c79436]" />
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white">
          Contributor Standings
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {USERS.map((u) => (
          <div
            key={u.rank}
            className="flex items-center justify-between p-3.5 bg-[#FAF7F2] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-xl"
          >
            {/* Left side details */}
            <div className="flex items-center gap-3.5">
              <span
                className={`w-6 text-center text-xs font-sans font-extrabold ${
                  u.rank === 1
                    ? "text-yellow-600"
                    : u.rank === 2
                      ? "text-stone-500"
                      : "text-stone-400"
                }`}
              >
                #{u.rank}
              </span>
              <div className="w-8 h-8 rounded-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 flex items-center justify-center text-[10px] font-sans font-bold text-stone-650 dark:text-stone-300">
                {u.initials}
              </div>
              <div>
                <span className="block text-xs font-sans font-bold text-stone-805 dark:text-stone-200">
                  {u.name}
                </span>
                <span className="block text-[9px] font-sans text-stone-450 dark:text-stone-500">
                  {u.badge}
                </span>
              </div>
            </div>

            {/* Right side stats */}
            <div className="text-right">
              <span className="block text-xs font-sans font-extrabold text-[#c79436]">
                {u.points.toLocaleString("en-IN")}
              </span>
              <span className="block text-[8px] font-sans text-stone-400 uppercase tracking-widest">
                XP Points
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardWidget;
