import { useAuth } from './context/AuthContext';
import AuthLayout from './components/AuthLayout';
import Dashboard from './components/Dashboard';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Đang tải...</p>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <AuthLayout />;
}

export default App;
