import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  const roleLabel = user.role === 'STUDENT' ? 'Học sinh' : 'Giáo viên';

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Bảng điều khiển</h1>
        <button onClick={handleLogout} className="btn-logout">
          Đăng xuất
        </button>
      </header>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Chào mừng, {user.name}!</h2>
          <p>Vai trò: <strong>{roleLabel}</strong></p>
          <p>Email: {user.email}</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Tài khoản</h3>
            <p>ID: {user.id}</p>
            <p>Đã xác thực email: {user.emailVerified ? 'Có' : 'Chưa'}</p>
          </div>
          <div className="info-card">
            <h3>Thông tin</h3>
            <p>Ngày tạo: {new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
            <p>Cập nhật: {new Date(user.updatedAt).toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
