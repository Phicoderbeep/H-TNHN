import { useEffect, useState } from 'react';
import './AuthLayout.css';
import AuthPanel from './AuthPanel';

const FloatingShapes = () => (
  <div className="floating-shapes" aria-hidden="true">
    <div className="shape shape-1" />
    <div className="shape shape-2" />
    <div className="shape shape-3" />
    <div className="shape shape-4" />
    <div className="shape shape-5" />
    <div className="shape shape-6" />
  </div>
);

const StudentIllustration = () => (
  <svg className="student-svg" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="300" cy="120" r="50" fill="rgba(255,255,255,0.15)">
      <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="300" cy="120" r="40" fill="rgba(255,255,255,0.2)" />
    <path d="M285 115 Q290 105 300 108 Q310 105 315 115" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="288" cy="118" r="3" fill="rgba(255,255,255,0.6)" />
    <circle cx="312" cy="118" r="3" fill="rgba(255,255,255,0.6)" />
    <path d="M292 128 Q300 135 308 128" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M260 180 Q260 160 300 155 Q340 160 340 180 L345 280 Q345 290 335 290 L265 290 Q255 290 255 280 Z" fill="rgba(255,255,255,0.12)" />
    <rect x="275" y="195" width="50" height="60" rx="4" fill="rgba(255,255,255,0.1)" />
    <rect x="280" y="200" width="40" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="280" y="212" width="30" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
    <rect x="280" y="222" width="35" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
    <rect x="280" y="232" width="25" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
    <path d="M220 200 Q200 250 210 300" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" strokeLinecap="round" />
    <path d="M380 200 Q400 250 390 300" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" strokeLinecap="round" />
    <circle cx="210" cy="305" r="8" fill="rgba(255,255,255,0.12)" />
    <circle cx="390" cy="305" r="8" fill="rgba(255,255,255,0.12)" />
    <rect x="270" y="290" width="25" height="50" rx="10" fill="rgba(255,255,255,0.1)" />
    <rect x="305" y="290" width="25" height="50" rx="10" fill="rgba(255,255,255,0.1)" />
    <ellipse cx="282" cy="345" rx="18" ry="8" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="317" cy="345" rx="18" ry="8" fill="rgba(255,255,255,0.08)" />
    <rect x="420" y="150" width="80" height="100" rx="6" fill="rgba(255,255,255,0.08)" />
    <rect x="425" y="155" width="70" height="70" rx="3" fill="rgba(255,255,255,0.06)" />
    <line x1="460" y1="225" x2="460" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
    <ellipse cx="460" cy="255" rx="20" ry="5" fill="rgba(255,255,255,0.06)" />
    <circle cx="140" cy="200" r="30" fill="rgba(255,255,255,0.05)">
      <animate attributeName="cy" values="200;190;200" dur="4s" repeatCount="indefinite" />
    </circle>
    <path d="M130 200 L140 190 L150 200 L140 210 Z" fill="rgba(255,255,255,0.08)">
      <animate attributeName="cy" values="200;190;200" dur="4s" repeatCount="indefinite" />
    </path>
    <circle cx="480" cy="80" r="15" fill="rgba(255,255,255,0.06)">
      <animate attributeName="r" values="15;18;15" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <path d="M100 350 L120 320 L140 340 L160 310" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" strokeLinecap="round">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="3s" repeatCount="indefinite" />
    </path>
    <circle cx="100" cy="350" r="4" fill="rgba(255,255,255,0.15)" />
    <circle cx="120" cy="320" r="4" fill="rgba(255,255,255,0.15)" />
    <circle cx="140" cy="340" r="4" fill="rgba(255,255,255,0.15)" />
    <circle cx="160" cy="310" r="4" fill="rgba(255,255,255,0.15)" />
    <rect x="80" y="100" width="40" height="50" rx="3" fill="rgba(255,255,255,0.05)" transform="rotate(-15 100 125)">
      <animateTransform attributeName="transform" type="rotate" values="-15 100 125;-10 100 125;-15 100 125" dur="5s" repeatCount="indefinite" />
    </rect>
    <line x1="88" y1="115" x2="112" y2="112" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
    <line x1="88" y1="125" x2="108" y2="122" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
    <line x1="88" y1="135" x2="110" y2="132" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
  </svg>
);

const AuthLayout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuthSuccess = () => {
    console.log('Authentication successful');
  };

  return (
    <main className="auth-layout" role="main">
      <section className={`auth-illustration ${mounted ? 'mounted' : ''}`} aria-hidden="true">
        <FloatingShapes />
        <div className="illustration-content">
          <StudentIllustration />
          <div className="illustration-text">
            <h2>Học tập &amp; Trải nghiệm</h2>
            <p>Khám phá kiến thức, phát triển kỹ năng</p>
          </div>
        </div>
        <div className="illustration-gradient" />
      </section>

      <section className={`auth-form-section ${mounted ? 'mounted' : ''}`} aria-label="Form đăng nhập và đăng ký">
        <AuthPanel onAuthSuccess={handleAuthSuccess} />
      </section>
    </main>
  );
};

export default AuthLayout;
