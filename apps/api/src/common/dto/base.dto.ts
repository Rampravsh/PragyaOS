import { z } from "zod";
import { AppError } from "../errors/appError";

/**
 * Parses and validates input payloads against a Zod schema.
 * Formats errors and throws a structured BadRequest AppError on validation failures.
 */
export function validate<T>(schema: z.Schema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw AppError.badRequest("The request payload failed structural validation.", details);
  }
  return result.data;
}

/**
 * Standard Zod validation schema for handling GET request queries.
 */
export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, Math.min(100, parseInt(val, 10))) : 10)),
  orderBy: z.string().optional(),
  orderDir: z.enum(["asc", "desc"]).optional().default("asc"),
  search: z.string().optional(),
});
