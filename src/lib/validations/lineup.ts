import { z } from "zod";

/**
 * Schema for creating a new lineup via POST /api/lineups.
 * Validates and constrains all fields to prevent abuse.
 */
export const createLineupSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  formationName: z
    .string()
    .max(50, "Formation name too long")
    .optional(),
  players: z
    .array(
      z.object({
        id: z.number(),
        top: z.number().min(0).max(100),
        left: z.number().min(0).max(100),
        role: z.string().max(10),
        name: z.string().max(50).optional(),
        number: z.number().min(1).max(99).optional(),
      })
    )
    .min(1, "At least one player required")
    .max(15, "Too many players"),
  background: z
    .string()
    .max(100, "Background value too long")
    .optional(),
  isPublic: z.boolean().optional(),
});

export type CreateLineupInput = z.infer<typeof createLineupSchema>;
