import React from "react";

interface DocsTopic {
  id: string;
  title: string;
}

interface DocsCategory {
  groupName: string;
  topics: DocsTopic[];
}

interface DocsSidebarProps {
  categories: DocsCategory[];
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
}

export function DocsSidebar({
  categories,
  activeTopicId,
  onSelectTopic,
}: DocsSidebarProps): React.JSX.Element {
  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-stone-200 dark:border-stone-800 pr-6 text-left">
      <div className="flex flex-col gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {/* Category Label */}
            <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-2.5">
              {cat.groupName}
            </span>

            {/* List of sub-topics */}
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {cat.topics.map((topic) => {
                const isActive = activeTopicId === topic.id;
                return (
                  <li key={topic.id}>
                    <button
                      type="button"
                      onClick={() => onSelectTopic(topic.id)}
                      className={`w-full text-left px-3 py-2 text-xs font-sans rounded-xl transition-all duration-150 ${
                        isActive
                          ? "bg-[#1C1917] text-white dark:bg-white dark:text-stone-950 font-bold shadow-sm"
                          : "text-stone-650 dark:text-stone-400 hover:bg-stone-100/50 dark:hover:bg-stone-900/30 hover:text-stone-950 dark:hover:text-stone-100"
                      }`}
                    >
                      {topic.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default DocsSidebar;
