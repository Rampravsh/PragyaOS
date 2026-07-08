/**
 * Dashboard mock data repository.
 * Data shapes match the TypeScript interfaces in dashboard.types.ts.
 * Every field is realistic and ready to be replaced with an API call.
 */

import type {
  CourseProgress,
  RecommendedCourse,
  LearningPath,
  ProgressStats,
  Deadline,
  Achievement,
} from '@/features/dashboard/types/dashboard.types';

export const mockContinueLearning: CourseProgress[] = [
  {
    courseId: 'c1',
    title: 'UI/UX Design Fundamentals',
    subtitle: 'Lesson 8 of 12',
    lessonCurrent: 8,
    lessonTotal: 12,
    moduleName: 'Wireframing Basics',
    progressPercent: 65,
    status: 'in-progress',
    thumbnailColor: 'bg-emerald-100',
  },
  {
    courseId: 'c2',
    title: 'React.js for Beginners',
    subtitle: 'Lesson 12 of 28',
    lessonCurrent: 12,
    lessonTotal: 28,
    moduleName: 'State & Props',
    progressPercent: 40,
    status: 'in-progress',
    thumbnailColor: 'bg-violet-100',
  },
  {
    courseId: 'c3',
    title: 'Machine Learning Basics',
    subtitle: 'Lesson 16 of 20',
    lessonCurrent: 16,
    lessonTotal: 20,
    moduleName: 'Model Evaluation',
    progressPercent: 80,
    status: 'in-progress',
    thumbnailColor: 'bg-blue-100',
  },
];

export const mockLearningPaths: LearningPath[] = [
  {
    pathId: 'p1',
    title: 'Full Stack Web Development',
    description: 'From basics to advanced concepts in web development',
    progressPercent: 65,
    difficulty: 'Intermediate',
    totalCourses: 24,
    memberCount: 1200,
    iconBg: 'bg-emerald-100',
  },
  {
    pathId: 'p2',
    title: 'Data Science Journey',
    description: 'Complete path to become a data scientist',
    progressPercent: 40,
    difficulty: 'Beginner',
    totalCourses: 18,
    memberCount: 850,
    iconBg: 'bg-violet-100',
  },
];

export const mockRecommendedCourses: RecommendedCourse[] = [
  {
    courseId: 'r1',
    title: 'TypeScript Mastery',
    provider: 'Beginner to Advanced',
    rating: 4.8,
    reviewCount: 1200,
    iconBg: 'bg-blue-100',
    iconText: 'TS',
    iconTextColor: 'text-blue-700',
  },
  {
    courseId: 'r2',
    title: 'Advanced UI Animations',
    provider: 'Framer Motion',
    rating: 4.9,
    reviewCount: 856,
    iconBg: 'bg-emerald-100',
    iconText: 'UI',
    iconTextColor: 'text-emerald-700',
  },
  {
    courseId: 'r3',
    title: 'Node.js Backend Guide',
    provider: 'Building REST APIs',
    rating: 4.7,
    reviewCount: 1500,
    iconBg: 'bg-green-100',
    iconText: 'NJ',
    iconTextColor: 'text-green-700',
  },
  {
    courseId: 'r4',
    title: 'Python for Data Analysis',
    provider: 'Pandas, NumPy',
    rating: 4.6,
    reviewCount: 945,
    iconBg: 'bg-amber-100',
    iconText: 'PY',
    iconTextColor: 'text-amber-700',
  },
];

export const mockProgressStats: ProgressStats = {
  overallPercent: 75,
  growthPercent: 12,
  coursesEnrolled: 12,
  lessonsCompleted: 48,
  learningHours: 23,
  certificates: 6,
  weeklyData: [
    { day: 'Mon', value: 60 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 70 },
    { day: 'Thu', value: 55 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 65 },
    { day: 'Sun', value: 90 },
  ],
};

export const mockDeadlines: Deadline[] = [
  {
    assignmentId: 'd1',
    title: 'React Assignment',
    dueDate: '2025-05-25T23:59:00Z',
    dueDateLabel: 'Due in 2 days',
    priority: 'urgent',
  },
  {
    assignmentId: 'd2',
    title: 'UI/UX Case Study',
    dueDate: '2025-05-28T23:59:00Z',
    dueDateLabel: 'Due in 5 days',
    priority: 'soon',
  },
  {
    assignmentId: 'd3',
    title: 'ML Model Evaluation',
    dueDate: '2025-05-30T23:59:00Z',
    dueDateLabel: 'Due in 7 days',
    priority: 'normal',
  },
];

export const mockAchievements: Achievement[] = [
  {
    achievementId: 'a1',
    title: 'Quick Learner',
    description: 'Completed 10 lessons in a week',
    timeAgo: '2 days ago',
    iconColor: 'text-amber-500',
  },
  {
    achievementId: 'a2',
    title: 'Consistent Learner',
    description: '7 days learning streak',
    timeAgo: '5 days ago',
    iconColor: 'text-violet-500',
  },
];
