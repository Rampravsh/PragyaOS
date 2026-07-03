export interface HealthScoreResult {
  overallScore: number;
  breakdown: {
    metadataScore: number;
    curriculumScore: number;
    mediaScore: number;
    seoScore: number;
  };
  recommendations: string[];
}

export interface HealthScorer {
  calculate(course: any): { score: number; recommendations: string[] };
}

export class MetadataScorer implements HealthScorer {
  public calculate(course: any) {
    let score = 0;
    const recommendations: string[] = [];

    if (course.title && course.title.trim().length > 0) score += 20;
    else recommendations.push("Provide a course title.");

    if (course.subtitle && course.subtitle.trim().length > 0) score += 20;
    else recommendations.push("Add a subtitle to summarize course goals.");

    if (course.categoryId) score += 20;
    else recommendations.push("Assign this course to a category.");

    if (course.language) score += 20;
    else recommendations.push("Configure course language settings.");

    if (course.difficulty) score += 20;
    else recommendations.push("Select a target difficulty level.");

    return { score, recommendations };
  }
}

export class CurriculumScorer implements HealthScorer {
  public calculate(course: any) {
    const modules = course.modules || [];
    const recommendations: string[] = [];

    if (modules.length === 0) {
      return { score: 0, recommendations: ["Create at least one course module."] };
    }

    let score = 50; // starts at 50 for having modules
    const emptyModules = modules.filter((m: any) => !m.learningUnits || m.learningUnits.length === 0);

    if (emptyModules.length === 0) {
      score += 50;
    } else {
      recommendations.push(`Add learning units to empty modules (found ${emptyModules.length} empty modules).`);
    }

    return { score, recommendations };
  }
}

export class MediaScorer implements HealthScorer {
  public calculate(course: any) {
    let score = 0;
    const recommendations: string[] = [];

    if (course.thumbnailId) score += 50;
    else recommendations.push("Upload a cover thumbnail image.");

    if (course.trailerId) score += 50;
    else recommendations.push("Consider uploading a trailer video to entice students.");

    return { score, recommendations };
  }
}

export class SEOScorer implements HealthScorer {
  public calculate(course: any) {
    let score = 0;
    const recommendations: string[] = [];
    const seo = (course.seoMetadata as Record<string, any>) || {};

    if (seo.title && seo.title.trim().length > 0) score += 50;
    else recommendations.push("Configure custom SEO titles.");

    if (seo.description && seo.description.trim().length > 0) score += 50;
    else recommendations.push("Write an SEO meta description for web crawler optimization.");

    return { score, recommendations };
  }
}

export class CourseHealthEngine {
  private static scorers = {
    metadata: new MetadataScorer(),
    curriculum: new CurriculumScorer(),
    media: new MediaScorer(),
    seo: new SEOScorer(),
  };

  /**
   * Evaluates a course against independent quality Scorers.
   */
  public static calculate(course: any): HealthScoreResult {
    const meta = this.scorers.metadata.calculate(course);
    const curr = this.scorers.curriculum.calculate(course);
    const med = this.scorers.media.calculate(course);
    const seo = this.scorers.seo.calculate(course);

    // Weighted average: Metadata (30%), Curriculum (40%), Media (20%), SEO (10%)
    const overallScore = Math.round(
      meta.score * 0.3 +
      curr.score * 0.4 +
      med.score * 0.2 +
      seo.score * 0.1
    );

    const recommendations = [
      ...meta.recommendations,
      ...curr.recommendations,
      ...med.recommendations,
      ...seo.recommendations,
    ];

    return {
      overallScore,
      breakdown: {
        metadataScore: meta.score,
        curriculumScore: curr.score,
        mediaScore: med.score,
        seoScore: seo.score,
      },
      recommendations,
    };
  }
}
export default CourseHealthEngine;
