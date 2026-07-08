import { Category, Course, Creator } from "../types/course.types";

// Seeded/Mock Creators
export const CREATORS: Record<string, Creator> = {
  procodrr: {
    id: "c-procodrr",
    name: "ProCodrr (Anurag Singh)",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80",
    bio: "Highly experienced Software Engineer and educator teaching modern web technologies to lakhs of students on YouTube.",
  },
  feynman: {
    id: "c-feynman",
    name: "Richard Feynman",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80",
    bio: "Renowned theoretical physicist known for making complex learning topics intuitive and simple.",
  },
  doe: {
    id: "c-doe",
    name: "Jane Doe",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80",
    bio: "Senior Design Systems Engineer specializing in UI component architecture and modular Figma systems.",
  },
};

// Main Mock Database Catalog
export const MOCK_CATALOG: Category[] = [
  {
    id: "cat-webdev",
    name: "Web Development",
    slug: "web-development",
    subTopics: [
      {
        id: "sub-frontend",
        name: "Frontend Development",
        courses: [
          {
            id: "react-complete",
            title: "Complete React.js Course",
            slug: "complete-react-course",
            subtitle: "Master React 19, Redux Toolkit, and Web Ecosystem from scratch",
            description:
              "Learn React.js with deep practical projects. We cover hooks, Context API, state management, custom hooks, performance tuning, and routing.",
            difficulty: "INTERMEDIATE",
            duration: 45,
            lessonsCount: 82,
            creator: CREATORS.procodrr,
            categoryId: "cat-webdev",
            modules: [
              {
                id: "m-react-intro",
                title: "Getting Started with React",
                sequence: 1,
                units: [
                  {
                    id: "u-react-1",
                    title: "Why React? Core concepts explained",
                    type: "VIDEO",
                    duration: 15,
                    sequence: 1,
                  },
                  {
                    id: "u-react-2",
                    title: "Setting up local Vite & React development tools",
                    type: "VIDEO",
                    duration: 25,
                    sequence: 2,
                  },
                  {
                    id: "u-react-3",
                    title: "Understanding JSX rules and syntax",
                    type: "ARTICLE",
                    duration: 10,
                    sequence: 3,
                  },
                ],
              },
              {
                id: "m-react-hooks",
                title: "Hooks and State Management",
                sequence: 2,
                units: [
                  {
                    id: "u-react-4",
                    title: "Mastering useState for dynamic UI changes",
                    type: "VIDEO",
                    duration: 35,
                    sequence: 1,
                  },
                  {
                    id: "u-react-5",
                    title: "Managing side-effects with useEffect",
                    type: "VIDEO",
                    duration: 40,
                    sequence: 2,
                  },
                  {
                    id: "u-react-6",
                    title: "Custom hooks for clean utility separation",
                    type: "ARTICLE",
                    duration: 15,
                    sequence: 3,
                  },
                ],
              },
              {
                id: "m-react-redux",
                title: "Advanced State & Redux Toolkit",
                sequence: 3,
                units: [
                  {
                    id: "u-react-7",
                    title: "Introduction to Redux Toolkit slice structure",
                    type: "VIDEO",
                    duration: 45,
                    sequence: 1,
                  },
                  {
                    id: "u-react-8",
                    title: "Connecting React app components to Redux store",
                    type: "VIDEO",
                    duration: 30,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
          {
            id: "js-complete",
            title: "Complete JavaScript Course",
            slug: "complete-javascript-course",
            subtitle: "Learn modern ES6+ JavaScript with zero assumptions",
            description:
              "Deep dive into JavaScript engines, event loops, closures, promises, prototypes, and asynchronous execution pipelines.",
            difficulty: "BEGINNER",
            duration: 60,
            lessonsCount: 110,
            creator: CREATORS.procodrr,
            categoryId: "cat-webdev",
            modules: [
              {
                id: "m-js-basics",
                title: "JavaScript Execution Contexts",
                sequence: 1,
                units: [
                  {
                    id: "u-js-1",
                    title: "How JavaScript works under the hood",
                    type: "VIDEO",
                    duration: 20,
                    sequence: 1,
                  },
                  {
                    id: "u-js-2",
                    title: "Execution context, call stack and memory heaps",
                    type: "VIDEO",
                    duration: 30,
                    sequence: 2,
                  },
                ],
              },
              {
                id: "m-js-async",
                title: "Asynchronous JavaScript & Promises",
                sequence: 2,
                units: [
                  {
                    id: "u-js-3",
                    title: "Understanding Event Loop & Microtask Queue",
                    type: "VIDEO",
                    duration: 45,
                    sequence: 1,
                  },
                  {
                    id: "u-js-4",
                    title: "Working with Promises and async/await syntax",
                    type: "ARTICLE",
                    duration: 20,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
          {
            id: "css-layouts",
            title: "CSS Layouts Masterclass",
            slug: "css-layouts-masterclass",
            subtitle: "Design beautiful, robust layouts using Flexbox, Grid, and Tailwind CSS",
            description:
              "Master advanced responsive layout systems. Learn the exact physics of flex basis, grid templates, alignment variables, and mobile-first configurations.",
            difficulty: "BEGINNER",
            duration: 18,
            lessonsCount: 35,
            creator: CREATORS.procodrr,
            categoryId: "cat-webdev",
            modules: [
              {
                id: "m-css-flex",
                title: "Flexbox Deep Dive",
                sequence: 1,
                units: [
                  {
                    id: "u-css-1",
                    title: "Flex Container vs Flex Items properties",
                    type: "VIDEO",
                    duration: 25,
                    sequence: 1,
                  },
                  {
                    id: "u-css-2",
                    title: "Responsive column wrap layouts",
                    type: "VIDEO",
                    duration: 20,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sub-backend",
        name: "Backend Development",
        courses: [
          {
            id: "nodejs-mastery",
            title: "Mastering Node.js & Express",
            slug: "mastering-nodejs",
            subtitle: "Build highly scalable REST APIs and secure backend architectures",
            description:
              "Learn the Node.js event-driven architecture. Build solid REST endpoints, implement JWT auth gates, configure error middlewares, and perform MongoDB/Prisma integrations.",
            difficulty: "INTERMEDIATE",
            duration: 32,
            lessonsCount: 58,
            creator: CREATORS.procodrr,
            categoryId: "cat-webdev",
            modules: [
              {
                id: "m-node-intro",
                title: "Node.js Core Architecture",
                sequence: 1,
                units: [
                  {
                    id: "u-node-1",
                    title: "Introduction to V8 and Libuv event loop",
                    type: "VIDEO",
                    duration: 30,
                    sequence: 1,
                  },
                  {
                    id: "u-node-2",
                    title: "Working with Filesystem and Streams module",
                    type: "VIDEO",
                    duration: 40,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sub-fullstack",
        name: "Full-stack Frameworks",
        courses: [
          {
            id: "nextjs-bootcamp",
            title: "Complete Next.js Bootcamp",
            slug: "nextjs-bootcamp",
            subtitle: "Build production Server-Side Rendered React web applications",
            description:
              "Learn App Router, server components, server actions, route handlers, and SEO optimization in Next.js.",
            difficulty: "ADVANCED",
            duration: 0,
            lessonsCount: 0,
            creator: CREATORS.procodrr,
            categoryId: "cat-webdev",
            isComingSoon: true,
          },
        ],
      },
    ],
  },
  {
    id: "cat-ai",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    subTopics: [
      {
        id: "sub-ml",
        name: "Machine Learning",
        courses: [
          {
            id: "pytorch-intro",
            title: "Introduction to Machine Learning with PyTorch",
            slug: "introduction-to-machine-learning-pytorch",
            subtitle: "Learn the core mathematical foundations of Deep Learning models",
            description:
              "Understand supervised learning algorithms and implement neural network layers in PyTorch.",
            difficulty: "BEGINNER",
            duration: 25,
            lessonsCount: 42,
            creator: CREATORS.feynman,
            categoryId: "cat-ai",
            modules: [
              {
                id: "m-ml-math",
                title: "Linear Algebra Refresher",
                sequence: 1,
                units: [
                  {
                    id: "u-ml-1",
                    title: "Vectors, matrices, and dot products",
                    type: "VIDEO",
                    duration: 35,
                    sequence: 1,
                  },
                  {
                    id: "u-ml-2",
                    title: "Gradient descent and derivatives intuition",
                    type: "VIDEO",
                    duration: 40,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sub-ds",
        name: "Data Science & Analytics",
        courses: [
          {
            id: "python-data",
            title: "Python for Data Analysis",
            slug: "python-data-analysis",
            subtitle: "Master Pandas, NumPy, and Matplotlib data visualization",
            description:
              "Learn to scrape, cleanse, filter, analyze, and visualize data structures natively.",
            difficulty: "INTERMEDIATE",
            duration: 0,
            lessonsCount: 0,
            creator: CREATORS.feynman,
            categoryId: "cat-ai",
            isComingSoon: true,
          },
        ],
      },
    ],
  },
  {
    id: "cat-design",
    name: "Design",
    slug: "design",
    subTopics: [
      {
        id: "sub-uiux",
        name: "UI/UX Design Systems",
        courses: [
          {
            id: "figma-design-systems",
            title: "Advanced UI Design Systems in Figma",
            slug: "advanced-ui-design-systems-figma",
            subtitle: "Design modular component systems with absolute efficiency",
            description:
              "Build robust variants, typography tokens, color variables, and flexible auto-layout cards inside Figma.",
            difficulty: "ADVANCED",
            duration: 15,
            lessonsCount: 28,
            creator: CREATORS.doe,
            categoryId: "cat-design",
            modules: [
              {
                id: "m-figma-tokens",
                title: "Tokens and Styles Setup",
                sequence: 1,
                units: [
                  {
                    id: "u-figma-1",
                    title: "Defining primitive vs semantic color variables",
                    type: "VIDEO",
                    duration: 25,
                    sequence: 1,
                  },
                  {
                    id: "u-figma-2",
                    title: "Building responsive layouts with auto-layout variables",
                    type: "VIDEO",
                    duration: 30,
                    sequence: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Helper: Get categories list
export function getMockCatalog(): Category[] {
  return MOCK_CATALOG;
}

// Helper: Find course by slug
export function getMockCourseBySlug(slug: string): Course | null {
  for (const cat of MOCK_CATALOG) {
    for (const sub of cat.subTopics) {
      const found = sub.courses.find((c) => c.slug === slug);
      if (found) return found;
    }
  }
  return null;
}
