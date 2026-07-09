import React, { useState, useMemo } from "react";
import { DocsSidebar } from "./components/DocsSidebar";
import { DocsContent } from "./components/DocsContent";
import { OnThisPage } from "./components/OnThisPage";

const CATEGORIES = [
  {
    groupName: "Getting Started",
    topics: [
      { id: "intro", title: "Introduction" },
      { id: "install", title: "Installation" },
    ],
  },
  {
    groupName: "Configuration",
    topics: [
      { id: "auth", title: "Authentication" },
      { id: "sdk", title: "SDK Integration" },
    ],
  },
  {
    groupName: "Reference",
    topics: [
      { id: "api", title: "API Reference" },
      { id: "changelog", title: "Changelog" },
    ],
  },
];

const TOPICS_CONTENT: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
    paragraphs: string[];
    headings: { id: string; text: string }[];
  }
> = {
  intro: {
    id: "intro",
    title: "Introduction",
    description:
      "Welcome to PragyaOS — the Operating System for Modern Learning. Discover how to integrate modular learning paths and cognitive tutor frameworks.",
    paragraphs: [
      "PragyaOS is designed from the ground up to support highly custom, low-latency, cohort-based online education ecosystems.",
      "By isolating database reads inside repositories and utilizing strict design system tokens, it scales easily across universities and companies.",
    ],
    headings: [
      { id: "overview", text: "Overview" },
      { id: "pedagogy", text: "Cognitive Pedagogy" },
    ],
  },
  install: {
    id: "install",
    title: "Installation",
    description:
      "Initialize your workspace local setup environment using pnpm and docker components.",
    codeSnippet:
      "git clone https://github.com/pragyaos/monorepo.git\ncd monorepo\npnpm install\npnpm run dev",
    paragraphs: [
      "Ensure you have Node.js version 20+ and pnpm package manager installed.",
      "The workspace utilizes Turborepo pipelines. Run the format and build commands to verify core bindings are operational.",
    ],
    headings: [
      { id: "prerequisites", text: "Prerequisites" },
      { id: "command-line", text: "Command Line Setup" },
    ],
  },
  auth: {
    id: "auth",
    title: "Authentication",
    description: "Configure user authentication guard structures and identity roles.",
    paragraphs: [
      "PragyaOS isolates guest authentication from workspace routing. Use RequireAuth, RequireGuest, and RequireRole decorators.",
      "Roles defaults to Student, but custom RBAC mappings allows elevating to Instructors or Admins.",
    ],
    headings: [
      { id: "rbac", text: "Role Access Controls" },
      { id: "guards", text: "Routing Guards" },
    ],
  },
  sdk: {
    id: "sdk",
    title: "SDK Integration",
    description:
      "Embed course players, annotators, and LLM-Tutor connections using the @pragyaos/sdk.",
    codeSnippet:
      "import { createTutor } from '@pragyaos/sdk';\n\nconst tutor = createTutor({\n  apiKey: 'pragya_test_key',\n  learnerId: 'usr_90'\n});",
    paragraphs: [
      "The SDK exposes client-side widgets to render notebooks, capture highlight marks, and sync logs back to repositories.",
    ],
    headings: [
      { id: "initialization", text: "Initialization" },
      { id: "widgets", text: "Widgets embedding" },
    ],
  },
  api: {
    id: "api",
    title: "API Reference",
    description: "Integrate third-party services using our V1 REST API endpoints.",
    codeSnippet: "GET /api/public/v1/courses\nAuthorization: Bearer <token>",
    paragraphs: [
      "Endpoints are documented in swagger specs under the API section. Standard requests yield SuccessResponse wrappers.",
    ],
    headings: [
      { id: "endpoints", text: "V1 Endpoints" },
      { id: "status-codes", text: "Status Code Policies" },
    ],
  },
  changelog: {
    id: "changelog",
    title: "Changelog",
    description: "Follow the product version updates, security fixes, and features releases.",
    paragraphs: [
      "Version 0.1.0: Initial release of monorepo foundations. Completed core course builders, auth portals, and editor sidebars.",
    ],
    headings: [{ id: "v010", text: "v0.1.0 Release" }],
  },
};

export function DocsComposition(): React.JSX.Element {
  const [activeId, setActiveId] = useState("intro");
  const activeTopic = useMemo(() => TOPICS_CONTENT[activeId], [activeId]);

  // Flattened topics to calculate next/prev links
  const flatTopics = useMemo(() => CATEGORIES.flatMap((cat) => cat.topics), []);

  const activeIndex = useMemo(
    () => flatTopics.findIndex((t) => t.id === activeId),
    [flatTopics, activeId],
  );

  const prevTopic = activeIndex > 0 ? flatTopics[activeIndex - 1] : undefined;
  const nextTopic = activeIndex < flatTopics.length - 1 ? flatTopics[activeIndex + 1] : undefined;

  return (
    <div className="bg-[#FAF7F2] dark:bg-[#0f0f10] min-h-screen py-12 border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        {/* Left column: Sidebar */}
        <DocsSidebar categories={CATEGORIES} activeTopicId={activeId} onSelectTopic={setActiveId} />

        {/* Center column: Main Article Content */}
        <DocsContent
          topic={activeTopic}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
          onNavigate={setActiveId}
        />

        {/* Right column: Table of Contents */}
        <OnThisPage headings={activeTopic.headings} />
      </div>
    </div>
  );
}

export default DocsComposition;
