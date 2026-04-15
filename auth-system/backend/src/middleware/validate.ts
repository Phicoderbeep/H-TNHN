import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message);
        return res.status(400).json({
          error: 'Dữ liệu không hợp lệ',
          details: messages,
        });
      }
      next(error);
    }
  };
}
