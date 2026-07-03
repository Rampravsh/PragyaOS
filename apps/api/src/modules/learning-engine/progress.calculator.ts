import { LearningUnitType, ProgressStatus } from "@prisma/client";

export interface ProgressCalculationInput {
  unitType: LearningUnitType;
  unitDurationMinutes: number; // Duration in minutes from unit definition
  watchTime: number;           // Accumulated seconds spent by user
  lastPosition: number;        // Playback offset or scroll percent
  percentInput?: number;       // Direct client input percentage
  quizScore?: number;
  quizPassingScore?: number;
  quizMaxScore?: number;
  isSubmitted?: boolean;
}

export interface ProgressCalculationResult {
  status: ProgressStatus;
  completionPercent: number;
  watchTime: number;
  lastPosition: number;
}

export interface ProgressStrategy {
  calculate(input: ProgressCalculationInput): ProgressCalculationResult;
}

export class VideoProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const durationSeconds = input.unitDurationMinutes * 60;
    if (durationSeconds <= 0) {
      return {
        status: ProgressStatus.COMPLETED,
        completionPercent: 100,
        watchTime: input.watchTime,
        lastPosition: input.lastPosition,
      };
    }

    const calculatedPercent = Math.min(100, Math.round((input.watchTime / durationSeconds) * 100));
    // Complete if watched 90% or more
    const isCompleted = calculatedPercent >= 90;

    return {
      status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: isCompleted ? 100 : calculatedPercent,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class ArticleProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const percent = Math.min(100, Math.max(0, input.percentInput ?? 0));
    const isCompleted = percent >= 100;

    return {
      status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: percent,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class QuizProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const score = input.quizScore ?? 0;
    const maxScore = input.quizMaxScore ?? 100;
    const passing = input.quizPassingScore ?? 60; // 60% passing default

    const percent = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
    const isPassed = percent >= passing;

    return {
      status: isPassed ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: percent,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class AssignmentProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const submitted = !!input.isSubmitted;

    return {
      status: submitted ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: submitted ? 100 : 0,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class DocumentProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const percent = Math.min(100, Math.max(0, input.percentInput ?? 0));
    const isCompleted = percent >= 100;

    return {
      status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: percent,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class DefaultProgressStrategy implements ProgressStrategy {
  public calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const percent = Math.min(100, Math.max(0, input.percentInput ?? 0));
    const isCompleted = percent >= 100;

    return {
      status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.STARTED,
      completionPercent: percent,
      watchTime: input.watchTime,
      lastPosition: input.lastPosition,
    };
  }
}

export class ProgressCalculator {
  private static strategies: Record<LearningUnitType, ProgressStrategy> = {
    [LearningUnitType.VIDEO]: new VideoProgressStrategy(),
    [LearningUnitType.ARTICLE]: new ArticleProgressStrategy(),
    [LearningUnitType.QUIZ]: new QuizProgressStrategy(),
    [LearningUnitType.ASSIGNMENT]: new AssignmentProgressStrategy(),
    [LearningUnitType.PDF]: new DocumentProgressStrategy(),
    [LearningUnitType.LIVE_SESSION]: new DefaultProgressStrategy(),
    [LearningUnitType.CODE_LAB]: new AssignmentProgressStrategy(),
    [LearningUnitType.EXTERNAL_LINK]: new DefaultProgressStrategy(),
  };

  public static calculate(input: ProgressCalculationInput): ProgressCalculationResult {
    const strategy = this.strategies[input.unitType] || new DefaultProgressStrategy();
    return strategy.calculate(input);
  }
}
