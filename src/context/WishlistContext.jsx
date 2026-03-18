import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const toggleWishlist = (car) => {
    setItems((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      if (exists) {
        return prev.filter((c) => c.id !== car.id);
      }
      return [...prev, car];
    });
  };

  const isInWishlist = (id) => items.some((c) => c.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}

