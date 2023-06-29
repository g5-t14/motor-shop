import { z } from "zod"

export const registerCommentSchema = z.object(
  {
    description: z.string()
  }
)

export type RegisterCommentData = z.infer<typeof registerCommentSchema>