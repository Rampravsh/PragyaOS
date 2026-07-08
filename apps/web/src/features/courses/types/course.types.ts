export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Creator {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface LearningUnit {
  id: string;
  title: string;
  type: "VIDEO" | "ARTICLE" | "QUIZ";
  duration: number; // in minutes
  sequence: number;
}

export interface CourseModule {
  id: string;
  title: string;
  sequence: number;
  units: LearningUnit[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  difficulty: DifficultyLevel;
  duration: number; // total duration in hours
  lessonsCount: number;
  creator: Creator;
  categoryId: string;
  isComingSoon?: boolean;
  modules?: CourseModule[];
}

export interface SubTopic {
  id: string;
  name: string;
  courses: Course[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subTopics: SubTopic[];
}
