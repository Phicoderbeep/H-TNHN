import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';
import './LoginForm.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    clearError();
    setFieldErrors({});
  }, []);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!password) {
      errors.password = 'Mật khẩu là bắt buộc';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <InputField
        label="Email"
        type="email"
        id="login-email"
        placeholder="nhap@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
        required
        aria-required="true"
      />

      <InputField
        label="Mật khẩu"
        type="password"
        id="login-password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
        required
        aria-required="true"
      />

      <div className="form-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Ghi nhớ đăng nhập</span>
        </label>
        <a href="#forgot" className="forgot-link">
          Quên mật khẩu?
        </a>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="spinner" />
        ) : (
          'Đăng nhập'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
