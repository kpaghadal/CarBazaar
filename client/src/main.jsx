import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { OldCarsProvider } from './context/OldCarsContext.jsx';

// AuthProvider must be outermost so all children can access the token
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <OldCarsProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </OldCarsProvider>
  </AuthProvider>
);
