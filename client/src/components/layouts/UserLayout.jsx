import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { UserHeader } from './UserHeader';
import { Footer } from '../Footer';

export function UserLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UserHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
