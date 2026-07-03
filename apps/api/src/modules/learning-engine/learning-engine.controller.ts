import { Request, Response } from "express";
import { LearningEngineService, learningEngineService } from "./learning-engine.service";
import { LearningEngineMapper } from "./learning-engine.mapper";
import { validate } from "../../common/dto/base.dto";
import {
  enrollStudentSchema,
  updateProgressSchema,
  startSessionSchema,
  EnrollStudentInput,
  UpdateProgressInput,
  StartSessionInput
} from "./learning-engine.schemas";
import { courseCompletionRepo, learningTimelineRepo } from "./learning-engine.repository";
import { AppError } from "../../common/errors/appError";

export class LearningEngineController {
  constructor(private readonly service: LearningEngineService = learningEngineService) {}

  public enrollStudent = async (req: Request, res: Response): Promise<void> => {
    const input = validate(enrollStudentSchema as any, req.body) as EnrollStudentInput;
    const userId = req.user!.id;

    const enrollment = await this.service.enrollStudent(
      userId,
      input.courseId,
      input.source,
      input.purchaseRef
    );

    res.status(201).json({
      success: true,
      message: "Enrolled in course successfully.",
      data: LearningEngineMapper.toEnrollmentDTO(enrollment),
    });
  };

  public suspendEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.suspendEnrollment(userId, id);

    res.status(200).json({
      success: true,
      message: "Enrollment suspended.",
      data: LearningEngineMapper.toEnrollmentDTO(enrollment),
    });
  };

  public resumeEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.resumeEnrollment(userId, id);

    res.status(200).json({
      success: true,
      message: "Enrollment resumed.",
      data: LearningEngineMapper.toEnrollmentDTO(enrollment),
    });
  };

  public cancelEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.cancelEnrollment(userId, id);

    res.status(200).json({
      success: true,
      message: "Enrollment cancelled.",
      data: LearningEngineMapper.toEnrollmentDTO(enrollment),
    });
  };

  public updateProgress = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const input = validate(updateProgressSchema as any, req.body) as UpdateProgressInput;
    const userId = req.user!.id;

    const progress = await this.service.updateProgress(userId, id, input);

    res.status(200).json({
      success: true,
      message: "Progress updated successfully.",
      data: LearningEngineMapper.toProgressDTO(progress),
    });
  };

  public startSession = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const input = validate(startSessionSchema as any, req.body) as StartSessionInput;
    const userId = req.user!.id;

    const session = await this.service.startSession(userId, id, input);

    res.status(200).json({
      success: true,
      message: "Learning session started.",
      data: LearningEngineMapper.toSessionDTO(session),
    });
  };

  public endSession = async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.params;
    const userId = req.user!.id;

    const session = await this.service.endSession(userId, sessionId);

    res.status(200).json({
      success: true,
      message: "Learning session completed.",
      data: LearningEngineMapper.toSessionDTO(session),
    });
  };

  public continueLearning = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const result = await this.service.continueLearning(userId, id);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  public getCourseCompletion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    // Validate access
    await this.service.continueLearning(userId, id); // Reuse validation logic

    const completion = await courseCompletionRepo.findByEnrollment(id);
    if (!completion) {
      throw AppError.notFound("Course completion record not found.");
    }

    res.status(200).json({
      success: true,
      data: LearningEngineMapper.toCompletionDTO(completion),
    });
  };

  public getTimeline = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    // Validate access
    await this.service.continueLearning(userId, id);

    const timeline = await learningTimelineRepo.findManyByEnrollment(id);

    res.status(200).json({
      success: true,
      data: timeline.map((t) => LearningEngineMapper.toTimelineDTO(t)),
    });
  };
}

export const learningEngineController = new LearningEngineController();
export default learningEngineController;
