import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthTokens } from '../types/auth';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'STUDENT' | 'TEACHER') => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

function saveTokens(tokens: AuthTokens) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setTokens({
        accessToken: token,
        refreshToken: localStorage.getItem('refreshToken') || '',
      });
      authService.getMe()
        .then((res) => setUser(res.user))
        .catch(() => clearTokens())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const res = await authService.login({ email, password });
      setUser(res.user);
      setTokens(res.tokens);
      saveTokens(res.tokens);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'STUDENT' | 'TEACHER') => {
    setError(null);
    try {
      const res = await authService.register({ name, email, password, role });
      setUser(res.user);
      setTokens(res.tokens);
      saveTokens(res.tokens);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearTokens();
      setUser(null);
      setTokens(null);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        clearError,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
