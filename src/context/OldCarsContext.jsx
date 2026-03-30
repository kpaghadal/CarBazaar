import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const OldCarsContext = createContext(null);

function readStore() {
  try {
    const raw = localStorage.getItem('oldCarsStore');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function writeStore(items) {
  try {
    localStorage.setItem('oldCarsStore', JSON.stringify(items));
  } catch {}
}

export function OldCarsProvider({ children }) {
  const [items, setItems] = useState(() => readStore());

  useEffect(() => {
    writeStore(items);
  }, [items]);

  const addListing = (payload) => {
    const id = Date.now();
    const listing = {
      id,
      brand: payload.brand || 'Unknown',
      title: payload.title || `${payload.year || ''} ${payload.brand || ''} ${payload.model || ''}`.trim(),
      subtitle: payload.model || '',
      price: Number(payload.price || 0),
      year: Number(payload.year || 0),
      mileage: Number(payload.mileage || 0),
      fuelType: payload.fuelType || 'Gasoline',
      location: payload.location || 'N/A',
      image: payload.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      description: payload.description || '',
      seller: {
        name: payload.sellerName || 'Private Seller',
        phone: payload.sellerPhone || '',
        location: payload.location || 'N/A',
      },
    };
    setItems((prev) => [listing, ...prev]);
    return id;
  };

  const getById = (id) => items.find((c) => String(c.id) === String(id));

  const value = useMemo(() => ({ items, addListing, getById }), [items]);

  return <OldCarsContext.Provider value={value}>{children}</OldCarsContext.Provider>;
}

export function useOldCars() {
  const ctx = useContext(OldCarsContext);
  if (!ctx) throw new Error('useOldCars must be used within OldCarsProvider');
  return ctx;
}

