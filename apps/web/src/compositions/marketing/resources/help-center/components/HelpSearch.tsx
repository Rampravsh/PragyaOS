import React from "react";
import { SearchIcon, LayersIcon } from "@pragyaos/icons";

interface HelpSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HelpSearch({ searchQuery, onSearchChange }: HelpSearchProps): React.JSX.Element {
  return (
    <div className="bg-background border-b border-stone-200/50 dark:border-stone-850 py-16 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest block mb-3">
          <LayersIcon size={12} className="inline-block" /> Help Desk & Support
        </span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white mb-6">
          How can we help?
        </h1>

        {/* Search Input bar */}
        <div className="relative bg-white dark:bg-stone-950 rounded-2xl border-2 border-stone-850 dark:border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)] overflow-hidden">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            placeholder="Search for articles, answers, payments, or troubleshooting..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-transparent font-sans text-xs text-stone-900 dark:text-white placeholder-stone-450 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default HelpSearch;
