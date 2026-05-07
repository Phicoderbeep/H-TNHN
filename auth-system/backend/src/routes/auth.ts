import { Router, Response, NextFunction } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema, refreshTokenSchema } from '../utils/validation';
import * as authService from '../services/authService';

const router = Router();

router.post('/register', validate(registerSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
});

router.post('/refresh', validate(refreshTokenSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await authService.refreshAccessToken(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
});

router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Không xác thực' });
    }
    await authService.logout(req.user.userId);
    res.status(200).json({ message: 'Đăng xuất thành công' });
  } catch (error: any) {
    next(error);
  }
});

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Không xác thực' });
    }
    res.status(200).json({ user: req.user });
  } catch (error: any) {
    next(error);
  }
});

export default router;
