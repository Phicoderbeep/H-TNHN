import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được vượt quá 100 ký tự')
    .trim(),
  email: z
    .string()
    .email('Email không hợp lệ')
    .toLowerCase()
    .max(255, 'Email không được vượt quá 255 ký tự'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(128, 'Mật khẩu không được vượt quá 128 ký tự'),
  role: z.enum(['STUDENT', 'TEACHER'], {
    errorMap: () => ({ message: 'Vai trò phải là Học sinh hoặc Giáo viên' }),
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email không hợp lệ')
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token là bắt buộc'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
