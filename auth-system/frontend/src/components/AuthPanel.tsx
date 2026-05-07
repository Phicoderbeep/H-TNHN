import { useState, useCallback } from 'react';
import Tabs from './Tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AuthTab } from '../types/auth';
import './AuthPanel.css';

interface AuthPanelProps {
  onAuthSuccess?: () => void;
}

const AuthPanel = ({ onAuthSuccess }: AuthPanelProps) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handleTabChange = useCallback((tab: AuthTab) => {
    setSlideDirection(tab === 'register' ? 'right' : 'left');
    setActiveTab(tab);
  }, []);

  return (
    <div className="auth-panel">
      <div className="auth-header">
        <h1 className="auth-title">
          {activeTab === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
        </h1>
        <p className="auth-subtitle">
          {activeTab === 'login'
            ? 'Đăng nhập để tiếp tục hành trình học tập'
            : 'Đăng ký để bắt đầu trải nghiệm'}
        </p>
      </div>

      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="auth-forms-container">
        <div
          className={`auth-forms-slider ${slideDirection === 'right' ? 'slide-right' : 'slide-left'}`}
          key={activeTab}
        >
          {activeTab === 'login' ? (
            <LoginForm onSuccess={onAuthSuccess} />
          ) : (
            <RegisterForm onSuccess={onAuthSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
