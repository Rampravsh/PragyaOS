import React from "react";

interface HeadingItem {
  id: string;
  text: string;
}

interface OnThisPageProps {
  headings: HeadingItem[];
}

export function OnThisPage({ headings }: OnThisPageProps): React.JSX.Element {
  return (
    <aside className="hidden xl:block w-48 shrink-0 border-l border-stone-200 dark:border-stone-800 pl-6 text-left">
      <div className="flex flex-col gap-4 sticky top-28">
        <span className="text-[10px] font-sans font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest px-1">
          On This Page
        </span>

        <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="block text-xs font-sans text-stone-600 dark:text-stone-450 hover:text-[#c79436] dark:hover:text-[#c79436] transition-colors leading-relaxed"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default OnThisPage;
