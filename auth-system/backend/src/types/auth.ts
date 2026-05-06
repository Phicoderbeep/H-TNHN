export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserResponse;
  tokens: AuthTokens;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
  iat?: number;
  exp?: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface LoginInput {
  email: string;
  password: string;
}
