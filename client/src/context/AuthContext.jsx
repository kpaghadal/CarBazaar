// context/AuthContext.jsx
// Global authentication state for CarBazaar.
// Persists token + user to localStorage so the session survives page refresh.
// Provides: user, token, isLoggedIn, isAdmin, login(), logout(), updateUser()

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // Initialise from localStorage so refresh doesn't log user out
  const [user, setUser] = useState(() => readStorage('carBazaarUser'));
  const [token, setToken] = useState(() => localStorage.getItem('carBazaarToken') || null);

  // Called after successful login or register
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem('carBazaarUser', JSON.stringify(userData));
    localStorage.setItem('carBazaarToken', tokenValue);
  };

  // Clears session everywhere
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('carBazaarUser');
    localStorage.removeItem('carBazaarToken');
  };

  // Used after profile update so the header/UI reflect new data immediately
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('carBazaarUser', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
