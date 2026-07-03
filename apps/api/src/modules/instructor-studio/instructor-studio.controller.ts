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

export class InstructorStudioController {
  constructor(private readonly service: InstructorStudioService = instructorStudioService) {}

  public getPublishingChecklist = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const data = await this.service.getPublishingChecklist(courseId, userId);

    res.status(200).json({
      success: true,
      data,
    });
  };

  public submitForReview = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(submitReviewSchema as any, req.body) as SubmitReviewInput;
    const userId = req.user!.id;

    const course = await this.service.submitForReview(courseId, userId, input);

    res.status(200).json({
      success: true,
      message: "Course submitted for review.",
      data: course,
    });
  };

  public publishCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(publishCourseSchema as any, req.body) as PublishCourseInput;
    const userId = req.user!.id;

    const course = await this.service.publishCourse(courseId, userId, input);

    res.status(200).json({
      success: true,
      message: "Course approved and published successfully.",
      data: course,
    });
  };

  public unpublishCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.unpublishCourse(courseId, userId);

    res.status(200).json({
      success: true,
      message: "Course unpublished to DRAFT.",
      data: course,
    });
  };

  public archiveCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.archiveCourse(courseId, userId);

    res.status(200).json({
      success: true,
      message: "Course archived successfully.",
      data: course,
    });
  };

  public restoreCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const course = await this.service.restoreCourse(courseId, userId);

    res.status(200).json({
      success: true,
      message: "Course restored to DRAFT status.",
      data: course,
    });
  };

  public generatePreviewToken = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(generatePreviewSchema as any, req.body) as GeneratePreviewInput;
    const userId = req.user!.id;

    const data = await this.service.generatePreviewToken(courseId, userId, input);

    res.status(200).json({
      success: true,
      data,
    });
  };

  public duplicateCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(duplicateCourseSchema as any, req.body) as DuplicateCourseInput;
    const userId = req.user!.id;

    const course = await this.service.duplicateCourse(courseId, userId, input);

    res.status(201).json({
      success: true,
      message: "Course duplicated successfully.",
      data: course,
    });
  };

  public duplicateModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const userId = req.user!.id;

    const newModule = await this.service.duplicateModule(courseId, moduleId, userId);

    res.status(201).json({
      success: true,
      message: "Module duplicated successfully.",
      data: newModule,
    });
  };

  public duplicateLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { courseId, learningUnitId } = req.params;
    const userId = req.user!.id;

    const newUnit = await this.service.duplicateLearningUnit(courseId, learningUnitId, userId);

    res.status(201).json({
      success: true,
      message: "Learning Unit duplicated successfully.",
      data: newUnit,
    });
  };

  public moveModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const input = validate(moveModuleSchema as any, req.body) as MoveModuleInput;
    const userId = req.user!.id;

    await this.service.moveModule(courseId, moduleId, input.targetIndex, userId);

    res.status(200).json({
      success: true,
      message: "Module sequence updated successfully.",
    });
  };

  public moveLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { courseId, learningUnitId } = req.params;
    const input = validate(moveLearningUnitSchema as any, req.body) as MoveLearningUnitInput;
    const userId = req.user!.id;

    await this.service.moveLearningUnit(courseId, learningUnitId, input.targetModuleId, input.targetIndex, userId);

    res.status(200).json({
      success: true,
      message: "Learning Unit relocated successfully.",
    });
  };

  public bulkReorderCurriculum = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(bulkReorderCurriculumSchema as any, req.body) as BulkReorderCurriculumInput;
    const userId = req.user!.id;

    await this.service.bulkReorderCurriculum(courseId, input, userId);

    res.status(200).json({
      success: true,
      message: "Curriculum bulk reordering transaction completed.",
    });
  };

  public getInstructorDashboard = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;

    const data = await this.service.getInstructorDashboard(userId);

    res.status(200).json({
      success: true,
      data,
    });
  };

  public getCourseHealthReport = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const data = await this.service.getCourseHealthReport(courseId, userId);

    res.status(200).json({
      success: true,
      data,
    });
  };
}

export const instructorStudioController = new InstructorStudioController();
export default instructorStudioController;
