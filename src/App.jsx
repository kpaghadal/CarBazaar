import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { SellCar } from './pages/SellCar';
import { Wishlist } from './pages/Wishlist';
import { NewCars } from './pages/NewCars';
import { OldCars } from './pages/OldCars';
import { CarDetailNew } from './pages/CarDetailNew';
import { CarDetailOld } from './pages/CarDetailOld';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/buy" element={<Navigate to="/new-cars" replace />} />
        <Route path="/new-cars" element={<NewCars />} />
        <Route path="/old-cars" element={<OldCars />} />
        <Route path="/car/:id" element={<CarDetailNew />} />
        <Route path="/old/:id" element={<CarDetailOld />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/sell" element={<SellCar />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
