/**
 * Dashboard feature domain types.
 * All interfaces mirror the expected backend API response shapes.
 * Repositories can be replaced with real API calls without structural changes.
 */

// ─── Course ───────────────────────────────────────────────────────────────────

export type CourseStatus = 'not-started' | 'in-progress' | 'completed';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CourseProgress {
  courseId: string;
  title: string;
  subtitle: string;
  lessonCurrent: number;
  lessonTotal: number;
  moduleName: string;
  progressPercent: number;
  status: CourseStatus;
  thumbnailColor: string; /** Tailwind bg class for course card thumbnail */
}

export interface RecommendedCourse {
  courseId: string;
  title: string;
  provider: string;
  rating: number;
  reviewCount: number;
  iconBg: string;  /** Tailwind bg class for course icon */
  iconText: string; /** Short abbreviation to render in icon */
  iconTextColor: string;
}

// ─── Learning Path ────────────────────────────────────────────────────────────

export interface LearningPath {
  pathId: string;
  title: string;
  description: string;
  progressPercent: number;
  difficulty: Difficulty;
  totalCourses: number;
  memberCount: number;
  iconBg: string; /** Tailwind bg class for path icon circle */
}

// ─── Progress Stats ───────────────────────────────────────────────────────────

export interface WeeklyDataPoint {
  day: string;
  value: number;
}

export interface ProgressStats {
  overallPercent: number;
  growthPercent: number;
  coursesEnrolled: number;
  lessonsCompleted: number;
  learningHours: number;
  certificates: number;
  weeklyData: WeeklyDataPoint[];
}

// ─── Deadline ─────────────────────────────────────────────────────────────────

export type DeadlinePriority = 'urgent' | 'soon' | 'normal';

export interface Deadline {
  assignmentId: string;
  title: string;
  dueDate: string;   /** ISO date string */
  dueDateLabel: string; /** Human-readable: "Due in 2 days" */
  priority: DeadlinePriority;
}

// ─── Achievement ──────────────────────────────────────────────────────────────

export interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  timeAgo: string;
  iconColor: string; /** Tailwind text color class for trophy icon */
}
