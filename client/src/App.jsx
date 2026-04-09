import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import { Login }          from './pages/Login';
import { Signup }         from './pages/Signup';
import { Home }           from './pages/Home';
import { SellCar }        from './pages/SellCar';
import { Wishlist }       from './pages/Wishlist';
import { NewCars }        from './pages/NewCars';
import { OldCars }        from './pages/OldCars';
import { CarDetailNew }   from './pages/CarDetailNew';
import { CarDetailOld }   from './pages/CarDetailOld';
import { Chat }           from './pages/Chat';
import { Profile }        from './pages/Profile';
import { BrowseCars }     from './pages/BrowseCars';
import { AdminDashboard } from './pages/admin/dashboard';
import { AdminListings }  from './pages/admin/listings';
import { AdminUsers }     from './pages/admin/users';
import { AdminBookings }  from './pages/admin/bookings';
import { AdminProfile }   from './pages/admin/profile';

import { About }          from './pages/guest/About';
import { Contact }        from './pages/guest/Contact';
import { Features }       from './pages/guest/Features';

import { GuestLayout }    from './components/layouts/GuestLayout';
import { UserLayout }     from './components/layouts/UserLayout';

// ── Route Guards ──────────────────────────────────────────────
// Redirects to /login if not authenticated
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Redirects to /home if not an admin
function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin)    return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Isolated Auth Pages (No Header/Footer) */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Navigate to="/login" replace />} />

        {/* ── Guest User Panel ── */}
        <Route element={<GuestLayout />}>
          <Route path="/"       element={<Home />} />
          <Route path="/home"   element={<Navigate to="/" replace />} />
          <Route path="/about"  element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          
          {/* We allow browsing listings in the Guest layout if not logged in. */}
          {/* But if they are logged in, UserLayout might be better? 
              For strict separation, we'll give new-cars its own accessible route. */}
        </Route>

        {/* ── Logged-in User Panel ── */}
        <Route element={<UserLayout />}>
          <Route path="/new-cars"     element={<NewCars />} />
          <Route path="/new-cars/:id" element={<CarDetailNew />} />
          <Route path="/old-cars"  element={<OldCars />} />
          <Route path="/browse"    element={<BrowseCars />} />
          <Route path="/car/:id"   element={<CarDetailNew />} />
          <Route path="/old/:id"   element={<CarDetailOld />} />
          <Route path="/buy"       element={<Navigate to="/new-cars" replace />} />
          
          <Route path="/sell"     element={<SellCar />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="/chat"    element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>

        {/* Admin — requires role:admin */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/listings"  element={<AdminRoute><AdminListings /></AdminRoute>} />
        <Route path="/admin/users"     element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/bookings"  element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="/admin/profile"   element={<AdminRoute><AdminProfile /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
