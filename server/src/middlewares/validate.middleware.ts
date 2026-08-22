import { type Request, type Response, type NextFunction } from "express";
import { ZodType } from "zod";

export function validateUrl(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "URL_VALIDATION_ERROR",
          message: "Invalid URL Request",
          details: result.error.issues,
        },
      });
    }

    req.body = result.data;

    next();
  };
}
