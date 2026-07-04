import { Course, CourseStatus, CourseVisibility, DifficultyLevel, Media, MediaStatus, LearningUnit, CourseModule } from "@prisma/client";

export interface RuleResult {
  ruleId: string;
  title: string;
  description: string;
  status: "PASSED" | "WARNING" | "FAILED";
  severity: "CRITICAL" | "MODERATE" | "INFO";
  fixSuggestion?: string;
}

export interface PublishingRule {
  id: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "MODERATE" | "INFO";
  validate(course: any): Promise<Omit<RuleResult, "ruleId" | "title" | "description" | "severity">>;
}

export class TitleRule implements PublishingRule {
  id = "course-title";
  title = "Course Title Configuration";
  description = "Verifies that the course has a non-empty, clear title.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const valid = !!course.title && course.title.trim().length > 0;
    return {
      status: valid ? ("PASSED" as const) : ("FAILED" as const),
      fixSuggestion: valid ? undefined : "Navigate to Course Settings and provide a title.",
    };
  }
}

export class CategoryRule implements PublishingRule {
  id = "course-category";
  title = "Course Category Assignment";
  description = "Verifies that the course is assigned to a category.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const valid = !!course.categoryId;
    return {
      status: valid ? ("PASSED" as const) : ("FAILED" as const),
      fixSuggestion: valid ? undefined : "Choose a valid Category from the Settings panel.",
    };
  }
}

export class InstructorRule implements PublishingRule {
  id = "course-instructors";
  title = "Instructor Assignment";
  description = "Ensures at least one instructor is assigned to manage this course.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const valid = course.instructors && course.instructors.length > 0;
    return {
      status: valid ? ("PASSED" as const) : ("FAILED" as const),
      fixSuggestion: valid ? undefined : "Assign at least one instructor to the course collaborators list.",
    };
  }
}

export class ThumbnailRule implements PublishingRule {
  id = "course-thumbnail";
  title = "Course Thumbnail Asset";
  description = "Checks if the course has a cover image thumbnail uploaded.";
  severity: "MODERATE" = "MODERATE";

  public async validate(course: any) {
    const valid = !!course.thumbnailId;
    return {
      status: valid ? ("PASSED" as const) : ("WARNING" as const),
      fixSuggestion: valid ? undefined : "Upload a high-quality cover image thumbnail in the media settings.",
    };
  }
}

export class TrailerRule implements PublishingRule {
  id = "course-trailer";
  title = "Course Trailer Video";
  description = "Checks if the course has a trailer promo video attached.";
  severity: "INFO" = "INFO";

  public async validate(course: any) {
    const valid = !!course.trailerId;
    return {
      status: valid ? ("PASSED" as const) : ("WARNING" as const),
      fixSuggestion: valid ? undefined : "Consider uploading a video trailer/promo to increase enrollment rates.",
    };
  }
}

export class ObjectivesRule implements PublishingRule {
  id = "course-objectives";
  title = "Learning Objectives";
  description = "Ensures the course defines what students will learn.";
  severity: "MODERATE" = "MODERATE";

  public async validate(course: any) {
    const valid = course.objectives && course.objectives.length > 0;
    return {
      status: valid ? ("PASSED" as const) : ("WARNING" as const),
      fixSuggestion: valid ? undefined : "Add at least one learning objective detailing course takeaways.",
    };
  }
}

export class RequirementsRule implements PublishingRule {
  id = "course-requirements";
  title = "Course Requirements";
  description = "Ensures prerequisites/requirements are configured.";
  severity: "INFO" = "INFO";

  public async validate(course: any) {
    const valid = course.requirements && course.requirements.length > 0;
    return {
      status: valid ? ("PASSED" as const) : ("WARNING" as const),
      fixSuggestion: valid ? undefined : "Add prerequisites or student requirements under the Settings tab.",
    };
  }
}

export class CurriculumStructureRule implements PublishingRule {
  id = "curriculum-structure";
  title = "Curriculum Construction";
  description = "Checks that course modules and units exist.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const modules = course.modules || [];
    if (modules.length === 0) {
      return {
        status: "FAILED" as const,
        fixSuggestion: "Create at least one course module in the Curriculum editor.",
      };
    }

    const hasEmptyModule = modules.some((m: any) => !m.learningUnits || m.learningUnits.length === 0);
    if (hasEmptyModule) {
      return {
        status: "FAILED" as const,
        fixSuggestion: "Ensure every course module contains at least one Learning Unit.",
      };
    }

    return {
      status: "PASSED" as const,
    };
  }
}

export class LearningUnitContentRule implements PublishingRule {
  id = "learning-unit-content";
  title = "Learning Unit Asset Quality";
  description = "Ensures enqueued learning units have required media/body definitions.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const modules = course.modules || [];
    const units: any[] = modules.flatMap((m: any) => m.learningUnits || []);

    for (const unit of units) {
      if (unit.type === "VIDEO") {
        if (!unit.mediaId) {
          return {
            status: "FAILED" as const,
            fixSuggestion: `Upload a video file for unit: "${unit.title}".`,
          };
        }
      } else if (unit.type === "ARTICLE") {
        if (!unit.content) {
          return {
            status: "FAILED" as const,
            fixSuggestion: `Write article content for unit: "${unit.title}".`,
          };
        }
      }
    }

    return {
      status: "PASSED" as const,
    };
  }
}

export class MediaReadinessRule implements PublishingRule {
  id = "media-readiness";
  title = "Media Processing Status";
  description = "Checks that all enqueued media uploads are processed and ready.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    const mediaList: any[] = [];
    if (course.thumbnail && course.thumbnail.status !== "READY") mediaList.push(course.thumbnail);
    if (course.trailer && course.trailer.status !== "READY") mediaList.push(course.trailer);

    const modules = course.modules || [];
    const units = modules.flatMap((m: any) => m.learningUnits || []);
    for (const u of units) {
      if (u.media && u.media.status !== "READY") {
        mediaList.push(u.media);
      }
    }

    if (mediaList.length > 0) {
      return {
        status: "FAILED" as const,
        fixSuggestion: `Wait for enqueued file uploads to complete processing (currently UPLOADING or PROCESSING).`,
      };
    }

    return {
      status: "PASSED" as const,
    };
  }
}

export class ConfigurationRule implements PublishingRule {
  id = "course-configurations";
  title = "Language, Slug, Visibility, and Difficulty Configurations";
  description = "Validates the metadata attributes required for searching and indexing.";
  severity: "CRITICAL" = "CRITICAL";

  public async validate(course: any) {
    if (!course.slug || course.slug.trim().length === 0) {
      return {
        status: "FAILED" as const,
        fixSuggestion: "Configure a unique course slug/URL path.",
      };
    }
    if (!course.language) {
      return {
        status: "FAILED" as const,
        fixSuggestion: "Select a primary course language.",
      };
    }
    if (!course.difficulty) {
      return {
        status: "FAILED" as const,
        fixSuggestion: "Assign a target student difficulty level.",
      };
    }
    return {
      status: "PASSED" as const,
    };
  }
}

export class PublishingRuleEngine {
  private static rules: PublishingRule[] = [
    new TitleRule(),
    new CategoryRule(),
    new InstructorRule(),
    new ThumbnailRule(),
    new TrailerRule(),
    new ObjectivesRule(),
    new RequirementsRule(),
    new CurriculumStructureRule(),
    new LearningUnitContentRule(),
    new MediaReadinessRule(),
    new ConfigurationRule(),
  ];

  /**
   * Runs all validation rules on a course object and returns a checklist.
   */
  public static async runAll(course: any): Promise<RuleResult[]> {
    const results: RuleResult[] = [];
    for (const rule of this.rules) {
      try {
        const val = await rule.validate(course);
        results.push({
          ruleId: rule.id,
          title: rule.title,
          description: rule.description,
          severity: rule.severity,
          status: val.status,
          fixSuggestion: val.fixSuggestion,
        });
      } catch (err: any) {
        results.push({
          ruleId: rule.id,
          title: rule.title,
          description: rule.description,
          severity: rule.severity,
          status: "FAILED",
          fixSuggestion: `Validation runtime error: ${err.message}`,
        });
      }
    }
    return results;
  }
}
