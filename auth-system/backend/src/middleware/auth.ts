import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { JwtPayload } from '../types/auth';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authMiddleware(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token không được cung cấp' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}
