export interface User {
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
  user: User;
  tokens: AuthTokens;
}

export interface ApiError {
  error: string;
  details?: string[];
}

export type AuthTab = 'login' | 'register';
