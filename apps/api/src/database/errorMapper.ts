import { Prisma } from "@prisma/client";
import { AppError } from "../common/errors/appError";

/**
 * Translates low-level Prisma database exceptions into standardized HTTP-ready AppErrors.
 */
export function mapPrismaError(err: unknown): Error {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        // Unique constraint violation
        const targets = (err.meta?.target as string[]) || [];
        const fields = targets.join(", ");
        return AppError.conflict(
          `A record with this ${fields || "value"} already exists.`,
          [{ field: fields, message: "Value must be unique." }]
        );
      }
      case "P2003": {
        // Foreign key constraint violation
        const fieldName = (err.meta?.field_name as string) || "foreign key reference";
        return AppError.badRequest(
          `Invalid reference on relation: ${fieldName}. The parent entity does not exist.`
        );
      }
      case "P2025": {
        // Record to update or delete not found
        const cause = (err.meta?.cause as string) || "The requested entity was not found.";
        return AppError.notFound(cause);
      }
      case "P2000": {
        // Value too long for column
        return AppError.badRequest("The provided value exceeds the column length limits.");
      }
      default:
        return AppError.internal(`Database constraint failure: [${err.code}]`);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return AppError.badRequest("Database payload failed structural validation checks.");
  }

  return err instanceof Error ? err : new Error(String(err));
}
