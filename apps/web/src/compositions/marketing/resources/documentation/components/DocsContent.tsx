import React, { useState } from "react";
import { CheckIcon } from "@pragyaos/icons";

interface DocsContentProps {
  topic: {
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
    paragraphs: string[];
  };
  prevTopic?: { id: string; title: string };
  nextTopic?: { id: string; title: string };
  onNavigate: (id: string) => void;
}

export function DocsContent({
  topic,
  prevTopic,
  nextTopic,
  onNavigate,
}: DocsContentProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const copyCode = () => {
    if (!topic.codeSnippet) return;
    navigator.clipboard.writeText(topic.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="flex-1 min-w-0 text-left">
      {/* Article Title */}
      <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white mb-6">
        {topic.title}
      </h1>

      {/* Description */}
      <p className="font-sans text-stone-600 dark:text-stone-400 text-sm mb-6 leading-relaxed">
        {topic.description}
      </p>

      {/* Code Snippet Box */}
      {topic.codeSnippet && (
        <div className="relative mb-8 bg-stone-950 dark:bg-black rounded-xl border border-stone-850 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-stone-900 bg-stone-900/60">
            <span className="text-[10px] font-sans font-bold text-stone-400 tracking-wider">
              bash
            </span>
            <button
              onClick={copyCode}
              className="text-[10px] font-sans font-bold text-stone-400 hover:text-white uppercase tracking-wider px-2 py-1 rounded transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs font-mono text-stone-200 text-left leading-relaxed">
            <code>{topic.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Content paragraphs */}
      <div className="flex flex-col gap-6 mb-12">
        {topic.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="font-sans text-stone-750 dark:text-stone-300 text-xs md:text-sm leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Docs Feedback Panel */}
      <div className="border-t border-stone-250 dark:border-stone-800/80 pt-6 pb-8 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="font-sans text-xs text-stone-600 dark:text-stone-450">
          Was this documentation helpful?
        </span>
        {feedbackGiven ? (
          <span className="text-xs font-sans font-bold text-brand-gold flex items-center gap-1.5">
            <CheckIcon size={14} /> Thanks for your feedback!
          </span>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setFeedbackGiven(true)}
              className="px-4 py-1.5 bg-muted hover:bg-stone-100 border border-stone-300 dark:border-stone-800 text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg text-stone-750 dark:text-stone-300"
            >
              Yes
            </button>
            <button
              onClick={() => setFeedbackGiven(true)}
              className="px-4 py-1.5 bg-muted hover:bg-stone-100 border border-stone-300 dark:border-stone-800 text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg text-stone-750 dark:text-stone-300"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Previous / Next pagination navigation */}
      <div className="flex items-center justify-between border-t border-stone-250 dark:border-stone-800/80 pt-6">
        {prevTopic ? (
          <button
            onClick={() => onNavigate(prevTopic.id)}
            className="flex flex-col items-start gap-1 group text-left max-w-[45%]"
          >
            <span className="text-[9px] font-sans text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              &larr; Previous Topic
            </span>
            <span className="text-xs font-sans font-bold text-stone-850 dark:text-stone-200 group-hover:text-brand-gold transition-colors truncate w-full">
              {prevTopic.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <button
            onClick={() => onNavigate(nextTopic.id)}
            className="flex flex-col items-end gap-1 group text-right max-w-[45%]"
          >
            <span className="text-[9px] font-sans text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              Next Topic &rarr;
            </span>
            <span className="text-xs font-sans font-bold text-stone-850 dark:text-stone-200 group-hover:text-brand-gold transition-colors truncate w-full">
              {nextTopic.title}
            </span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

export default DocsContent;
