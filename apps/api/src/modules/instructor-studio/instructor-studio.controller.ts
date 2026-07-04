import { Request, Response } from "express";
import { InstructorStudioService, instructorStudioService } from "./instructor-studio.service";
import { validate } from "../../common/dto/base.dto";
import {
  submitReviewSchema,
  publishCourseSchema,
  generatePreviewSchema,
  duplicateCourseSchema,
  moveModuleSchema,
  moveLearningUnitSchema,
  bulkReorderCurriculumSchema,
  SubmitReviewInput,
  PublishCourseInput,
  GeneratePreviewInput,
  DuplicateCourseInput,
  MoveModuleInput,
  MoveLearningUnitInput,
  BulkReorderCurriculumInput
} from "./instructor-studio.schemas";
import { SuccessResponse } from "../../common/responses/successResponse";

export class InstructorStudioController {
  constructor(private readonly service: InstructorStudioService = instructorStudioService) {}

  public getPublishingChecklist = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const data = await this.service.getPublishingChecklist(courseId, userId);
    SuccessResponse.send(res, data);
  };

  public submitForReview = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(submitReviewSchema as any, req.body) as SubmitReviewInput;
    const userId = req.user!.id;

    const course = await this.service.submitForReview(courseId, userId, input);
    SuccessResponse.send(res, course, "Course submitted for review.");
  };

  public publishCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(publishCourseSchema as any, req.body) as PublishCourseInput;
    const userId = req.user!.id;

    const course = await this.service.publishCourse(courseId, userId, input);
    SuccessResponse.send(res, course, "Course approved and published successfully.");
  };

  public unpublishCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.unpublishCourse(courseId, userId);
    SuccessResponse.send(res, course, "Course unpublished to DRAFT.");
  };

  public archiveCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.archiveCourse(courseId, userId);
    SuccessResponse.send(res, course, "Course archived successfully.");
  };

  public restoreCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.restoreCourse(courseId, userId);
    SuccessResponse.send(res, course, "Course restored to DRAFT status.");
  };

  public generatePreviewToken = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(generatePreviewSchema as any, req.body) as GeneratePreviewInput;
    const userId = req.user!.id;

    const data = await this.service.generatePreviewToken(courseId, userId, input);
    SuccessResponse.send(res, data);
  };

  public duplicateCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(duplicateCourseSchema as any, req.body) as DuplicateCourseInput;
    const userId = req.user!.id;

    const course = await this.service.duplicateCourse(courseId, userId, input);
    SuccessResponse.created(res, course, "Course duplicated successfully.");
  };

  public duplicateModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const userId = req.user!.id;

    const newModule = await this.service.duplicateModule(courseId, moduleId, userId);
    SuccessResponse.created(res, newModule, "Module duplicated successfully.");
  };

  public duplicateLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { courseId, learningUnitId } = req.params;
    const userId = req.user!.id;

    const newUnit = await this.service.duplicateLearningUnit(courseId, learningUnitId, userId);
    SuccessResponse.created(res, newUnit, "Learning Unit duplicated successfully.");
  };

  public moveModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const input = validate(moveModuleSchema as any, req.body) as MoveModuleInput;
    const userId = req.user!.id;

    await this.service.moveModule(courseId, moduleId, input.targetIndex, userId);
    SuccessResponse.send(res, null, "Module sequence updated successfully.");
  };

  public moveLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { courseId, learningUnitId } = req.params;
    const input = validate(moveLearningUnitSchema as any, req.body) as MoveLearningUnitInput;
    const userId = req.user!.id;

    await this.service.moveLearningUnit(courseId, learningUnitId, input.targetModuleId, input.targetIndex, userId);
    SuccessResponse.send(res, null, "Learning Unit relocated successfully.");
  };

  public bulkReorderCurriculum = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(bulkReorderCurriculumSchema as any, req.body) as BulkReorderCurriculumInput;
    const userId = req.user!.id;

    await this.service.bulkReorderCurriculum(courseId, input, userId);
    SuccessResponse.send(res, null, "Curriculum bulk reordering transaction completed.");
  };

  public getInstructorDashboard = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;

    const data = await this.service.getInstructorDashboard(userId);
    SuccessResponse.send(res, data);
  };

  public getCourseHealthReport = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const data = await this.service.getCourseHealthReport(courseId, userId);
    SuccessResponse.send(res, data);
  };
}

export const instructorStudioController = new InstructorStudioController();
export default instructorStudioController;
