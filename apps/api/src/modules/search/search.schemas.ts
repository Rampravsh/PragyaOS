import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().optional().default(""),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  // Filter parameters passed as simple key-value object/query string
  category: z.string().optional(),
  difficulty: z.string().optional(),
  language: z.string().optional(),
  tags: z.string().optional(), // Comma-separated tags
  sort: z.string().optional().default("relevance"), // e.g. "newest", "popularity", "rating", "relevance"
});

export const autocompleteSchema = z.object({
  q: z.string().min(1, "Query is required for suggestions."),
  limit: z.coerce.number().int().min(1).max(20).optional().default(5),
  index: z.enum(["courses", "categories", "instructors", "tags"]).optional().default("courses"),
});

export const reindexEntitySchema = z.object({
  entityType: z.enum(["courses", "categories", "instructors", "tags"]),
  entityId: z.string().uuid("Entity ID must be a valid UUID."),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type AutocompleteInput = z.infer<typeof autocompleteSchema>;
export type ReindexEntityInput = z.infer<typeof reindexEntitySchema>;
