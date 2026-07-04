import { prisma } from "../../database/client";
import { Media, MediaStatus, MediaType, MediaProvider, Prisma } from "@prisma/client";

export class MediaRepository {
  /**
   * Finds a media record by its unique ID.
   */
  public async findById(id: string): Promise<Media | null> {
    return prisma.media.findUnique({ where: { id } });
  }

  /**
   * Finds a media record by its storage key.
   */
  public async findByKey(key: string): Promise<Media | null> {
    return prisma.media.findUnique({ where: { key } });
  }

  /**
   * Finds a media record by its file integrity hash (checksum).
   * Useful for deduplication and verifying duplicate uploads.
   */
  public async findByHash(hash: string): Promise<Media | null> {
    return prisma.media.findFirst({ where: { hash } });
  }

  /**
   * Persists a new media record in the database.
   */
  public async create(data: {
    id?: string;
    type: MediaType;
    provider: MediaProvider;
    bucket?: string | null;
    key: string;
    mimeType: string;
    size: bigint;
    hash?: string | null;
    status: MediaStatus;
    metadata?: Prisma.InputJsonValue;
    userId?: string | null;
  }): Promise<Media> {
    return prisma.media.create({ data });
  }

  public async update(id: string, data: Prisma.MediaUpdateInput): Promise<Media> {
    return prisma.media.update({
      where: { id },
      data,
    });
  }

  /**
   * Updates only the status and metadata JSON block of a media record.
   */
  public async updateStatus(id: string, status: MediaStatus, metadata?: Prisma.InputJsonValue): Promise<Media> {
    return prisma.media.update({
      where: { id },
      data: {
        status,
        ...(metadata && { metadata }),
      },
    });
  }

  /**
   * Permanently deletes a media record from the database.
   */
  public async delete(id: string): Promise<void> {
    await prisma.media.delete({ where: { id } });
  }

  /**
   * Checks if media is currently referenced by other entities.
   */
  public async countUsage(mediaId: string): Promise<{
    courseThumbnails: number;
    courseTrailers: number;
    learningUnits: number;
    learningResources: number;
  }> {
    const [courseThumbnails, courseTrailers, learningUnits, learningResources] = await Promise.all([
      prisma.course.count({ where: { thumbnailId: mediaId } }),
      prisma.course.count({ where: { trailerId: mediaId } }),
      prisma.learningUnit.count({ where: { mediaId } }),
      prisma.learningResource.count({ where: { mediaId } }),
    ]);

    return {
      courseThumbnails,
      courseTrailers,
      learningUnits,
      learningResources,
    };
  }
}

export const mediaRepository = new MediaRepository();
export default mediaRepository;
