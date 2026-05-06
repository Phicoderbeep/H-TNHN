import { useState, useCallback } from 'react';
import './Tabs.css';
import { AuthTab } from '../types/auth';

interface TabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: activeTab === 'login' ? '0%' : '50%',
  });

  const handleTabClick = useCallback((tab: AuthTab) => {
    setIndicatorStyle({
      left: tab === 'login' ? '0%' : '50%',
    });
    onTabChange(tab);
  }, [onTabChange]);

  return (
    <div className="tabs-container" role="tablist" aria-label="Xác thực tài khoản">
      <div className="tabs-track">
        <button
          role="tab"
          id="tab-login"
          aria-selected={activeTab === 'login'}
          aria-controls="panel-login"
          className={`tab-button ${activeTab === 'login' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('login')}
        >
          Đăng nhập
        </button>
        <button
          role="tab"
          id="tab-register"
          aria-selected={activeTab === 'register'}
          aria-controls="panel-register"
          className={`tab-button ${activeTab === 'register' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('register')}
        >
          Đăng ký
        </button>
        <div
          className="tab-indicator"
          style={{ transform: `translateX(${indicatorStyle.left})` }}
        />
      </div>
    </div>
  );
};

export default Tabs;
