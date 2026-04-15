import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config/env';
import { AuthTokens, JwtPayload, UserResponse } from '../types/auth';
import { RegisterInput, LoginInput } from '../utils/validation';

function toUserResponse(user: any): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

function generateTokens(userId: string, email: string, role: string): AuthTokens {
  const payload: JwtPayload = { userId, email, role: role as 'STUDENT' | 'TEACHER' };

  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
}

export async function register(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw { status: 409, message: 'Email đã được đăng ký' };
  }

  const passwordHash = await bcrypt.hash(input.password, config.bcryptRounds);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    },
  });

  const tokens = generateTokens(user.id, user.email, user.role);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return {
    user: toUserResponse(user),
    tokens,
  };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
  }

  if (user.loginAttempts >= 5) {
    throw { status: 429, message: 'Tài khoản bị khóa tạm thời. Vui lòng thử lại sau' };
  }

  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValidPassword) {
    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: { increment: 1 } },
    });
    throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { loginAttempts: 0 },
  });

  const tokens = generateTokens(user.id, user.email, user.role);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return {
    user: toUserResponse(user),
    tokens,
  };
}

export async function refreshAccessToken(refreshToken: string) {
  let payload: JwtPayload;

  try {
    payload = jwt.verify(refreshToken, config.jwt.refreshSecret) as JwtPayload;
  } catch {
    throw { status: 401, message: 'Refresh token không hợp lệ' };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user || user.refreshToken !== refreshToken) {
    throw { status: 401, message: 'Refresh token không hợp lệ' };
  }

  const tokens = generateTokens(user.id, user.email, user.role);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return {
    user: toUserResponse(user),
    tokens,
  };
}

export async function logout(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
}
