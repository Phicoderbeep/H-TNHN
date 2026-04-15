import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';
import './RegisterForm.css';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    clearError();
    setFieldErrors({});
  }, []);

  const validate = () => {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) {
      errors.name = 'Họ tên là bắt buộc';
    } else if (name.trim().length < 2) {
      errors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }
    if (!email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(name, email, password, role);
      onSuccess?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <InputField
        label="Họ tên"
        type="text"
        id="register-name"
        placeholder="Nguyễn Văn A"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
        autoComplete="name"
        required
        aria-required="true"
      />

      <InputField
        label="Email"
        type="email"
        id="register-email"
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
        id="register-password"
        placeholder="Tối thiểu 6 ký tự"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="new-password"
        required
        aria-required="true"
      />

      <div className="input-field">
        <label htmlFor="register-role" className="input-label">
          Vai trò
        </label>
        <div className="role-selector">
          <button
            type="button"
            className={`role-option ${role === 'STUDENT' ? 'role-active' : ''}`}
            onClick={() => setRole('STUDENT')}
            aria-pressed={role === 'STUDENT'}
          >
            <span className="role-icon">🎓</span>
            <span>Học sinh</span>
          </button>
          <button
            type="button"
            className={`role-option ${role === 'TEACHER' ? 'role-active' : ''}`}
            onClick={() => setRole('TEACHER')}
            aria-pressed={role === 'TEACHER'}
          >
            <span className="role-icon">📚</span>
            <span>Giáo viên</span>
          </button>
        </div>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="spinner" />
        ) : (
          'Đăng ký'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
