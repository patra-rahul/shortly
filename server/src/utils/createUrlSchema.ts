import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z.url().optional(),
  shortUrl: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short URL can only contain letters, numbers, _ and -",
    )
    .optional(),
  newUrl: z.url().optional()
});
