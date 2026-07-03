import { CourseStatus, CourseVisibility, DifficultyLevel } from "@prisma/client";

export interface CourseQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  tag?: string;
  difficulty?: DifficultyLevel;
  language?: string;
  status?: CourseStatus;
  visibility?: CourseVisibility;
  featured?: boolean;
  sortBy?: "createdAt" | "title" | "publishedAt";
  sortOrder?: "asc" | "desc";
}

export interface CourseResponse {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  language: string;
  difficulty: DifficultyLevel;
  estimatedDuration: number;
  thumbnailUrl: string | null;
  trailerUrl: string | null;
  seoMetadata: any;
  status: CourseStatus;
  visibility: CourseVisibility;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  instructors: {
    userId: string;
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
    };
  }[];
  requirements: { description: string }[];
  objectives: { description: string }[];
  tags: string[];
}
