// context/WishlistContext.jsx
// If the user is logged in → calls the real backend API (/api/wishlist/*)
// If not logged in → falls back to in-memory state (guest mode)

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api.js';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]); // array of { _id, user, car: { _id, name, ... } }
  const [loading, setLoading] = useState(false);

  // Check if a logged-in user session exists
  const getToken = () => localStorage.getItem('carBazaarToken');
  const getUser  = () => {
    try { return JSON.parse(localStorage.getItem('carBazaarUser')); } catch { return null; }
  };

  // Load wishlist from API when user is logged in
  const loadWishlist = useCallback(async () => {
    const user = getUser();
    if (!getToken() || !user) return;
    try {
      setLoading(true);
      const data = await wishlistAPI.get(user._id);
      setItems(data);
    } catch {
      // Silently fail — wishlist will just be empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  // Add car to wishlist — uses API if logged in
  const addToWishlist = async (car) => {
    if (!getToken()) {
      // Guest: just add to in-memory state
      setItems((prev) => [...prev, { _id: car.id || car._id, car }]);
      return;
    }
    try {
      await wishlistAPI.add(car._id || car.id);
      await loadWishlist(); // re-fetch to get the populated car data
    } catch (err) {
      console.error('Wishlist add failed:', err.message);
    }
  };

  // Remove car from wishlist
  const removeFromWishlist = async (carId) => {
    if (!getToken()) {
      setItems((prev) => prev.filter((i) => String(i._id || i.car?._id) !== String(carId)));
      return;
    }
    try {
      await wishlistAPI.remove(carId);
      setItems((prev) => prev.filter((i) => String(i.car?._id || i._id) !== String(carId)));
    } catch (err) {
      console.error('Wishlist remove failed:', err.message);
    }
  };

  // Toggle — used by CarListingCard's heart button
  const toggleWishlist = async (car) => {
    const carId = car._id || car.id;
    if (isInWishlist(carId)) {
      await removeFromWishlist(carId);
    } else {
      await addToWishlist(car);
    }
  };

  // Check if a car is already wishlisted
  const isInWishlist = (carId) =>
    items.some((i) => String(i.car?._id || i._id) === String(carId));

  return (
    <WishlistContext.Provider value={{ items, loading, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist, reload: loadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
