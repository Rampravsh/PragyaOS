import { Media } from "@prisma/client";
import { MediaResponseDTO } from "./media.types";

export class MediaMapper {
  /**
   * Transforms a database Media entity into a JSON-safe REST response DTO.
   */
  public static toResponseDTO(media: Media): MediaResponseDTO {
    return {
      id: media.id,
      type: media.type,
      provider: media.provider,
      bucket: media.bucket,
      key: media.key,
      mimeType: media.mimeType,
      size: media.size.toString(), // Safely convert BigInt to string
      hash: media.hash,
      status: media.status,
      metadata: media.metadata,
      createdAt: media.createdAt.toISOString(),
      updatedAt: media.updatedAt.toISOString(),
      userId: media.userId,
    };
  }

  /**
   * Transforms an array of database Media entities into REST response DTOs.
   */
  public static toResponseDTOs(mediaList: Media[]): MediaResponseDTO[] {
    return mediaList.map((media) => this.toResponseDTO(media));
  }
}
