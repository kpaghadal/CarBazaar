import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { GuestHeader } from './GuestHeader';
import { Footer } from '../Footer';

export function GuestLayout() {
  const { isLoggedIn } = useAuth();

  // If you also want logged in users to browse guest pages, you can remove this check
  // But generally, a pure guest layout shouldn't redirect unless explicitly wanted.
  // We'll allow users to see guest pages if they really try, or they can use UserHeader for everything else.
  // For strict separation, we'll just render it.

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GuestHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
