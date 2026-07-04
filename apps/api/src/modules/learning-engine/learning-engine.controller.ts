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
import { SuccessResponse } from "../../common/responses/successResponse";

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

    SuccessResponse.created(
      res,
      LearningEngineMapper.toEnrollmentDTO(enrollment),
      "Enrolled in course successfully."
    );
  };

  public suspendEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.suspendEnrollment(userId, id);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toEnrollmentDTO(enrollment),
      "Enrollment suspended."
    );
  };

  public resumeEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.resumeEnrollment(userId, id);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toEnrollmentDTO(enrollment),
      "Enrollment resumed."
    );
  };

  public cancelEnrollment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const enrollment = await this.service.cancelEnrollment(userId, id);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toEnrollmentDTO(enrollment),
      "Enrollment cancelled."
    );
  };

  public updateProgress = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const input = validate(updateProgressSchema as any, req.body) as UpdateProgressInput;
    const userId = req.user!.id;

    const progress = await this.service.updateProgress(userId, id, input);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toProgressDTO(progress),
      "Progress updated successfully."
    );
  };

  public startSession = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const input = validate(startSessionSchema as any, req.body) as StartSessionInput;
    const userId = req.user!.id;

    const session = await this.service.startSession(userId, id, input);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toSessionDTO(session),
      "Learning session started."
    );
  };

  public endSession = async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.params;
    const userId = req.user!.id;

    const session = await this.service.endSession(userId, sessionId);
    SuccessResponse.send(
      res,
      LearningEngineMapper.toSessionDTO(session),
      "Learning session completed."
    );
  };

  public continueLearning = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    const result = await this.service.continueLearning(userId, id);
    SuccessResponse.send(res, result);
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

    SuccessResponse.send(res, LearningEngineMapper.toCompletionDTO(completion));
  };

  public getTimeline = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // enrollmentId
    const userId = req.user!.id;

    // Validate access
    await this.service.continueLearning(userId, id);

    const timeline = await learningTimelineRepo.findManyByEnrollment(id);
    SuccessResponse.send(res, timeline.map((t) => LearningEngineMapper.toTimelineDTO(t)));
  };
}

export const learningEngineController = new LearningEngineController();
export default learningEngineController;
