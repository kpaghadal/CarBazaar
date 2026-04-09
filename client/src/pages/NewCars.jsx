import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarListingCard } from '../components/CarListingCard';
import { SearchIcon, ResetIcon } from '../components/NavIcons';
import { useWishlist } from '../context/WishlistContext.jsx';
import { carAPI, normalizeCar } from '../services/api.js';
import '../styles/users/NewCars.css';

const FUEL_TYPES = ['Gasoline', 'Hybrid', 'Electric', 'Diesel'];

export function NewCars() {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All Brands');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  useEffect(() => {
    carAPI
      .getNew()
      .then((data) => setAllCars(data.map(normalizeCar)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const brandOptions = useMemo(
    () => ['All Brands', ...Array.from(new Set(allCars.map((c) => c.brand).filter(Boolean)))],
    [allCars]
  );

  const filteredCars = allCars.filter((c) => {
    const q = search.trim().toLowerCase();
    return (
      (!q || c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)) &&
      (brand === 'All Brands' || c.brand === brand) &&
      (fuelFilter === 'All' || c.fuelType === fuelFilter) &&
      c.price >= minPrice &&
      c.price <= maxPrice
    );
  });

  const handleReset = () => {
    setSearch('');
    setBrand('All Brands');
    setFuelFilter('All');
    setMinPrice(0);
    setMaxPrice(200000);
  };

  return (
    <div className="newcars-page">
      <main className="newcars-main">
       <br/>
        <header className="newcars-page-header">
          <span className="newcars-page-header-badge">Factory fresh</span>
          <h1 className="newcars-page-header-title">Browse new cars</h1>
          <p className="newcars-page-header-desc">
            Brand-new vehicles from verified dealers. Filter by brand, fuel, and budget—every listing
            is stored live in your database and updated from the admin panel.
          </p>
        </header>

        <div className="newcars-layout">
          <aside className="newcars-sidebar">
            <div className="newcars-sidebar-section">
              <div className="newcars-sidebar-title">Brands</div>
              <div className="newcars-checkbox-list">
                {brandOptions.map((b) => (
                  <label key={b} className="newcars-checkbox-item">
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === b}
                      onChange={() => setBrand(b)}
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="newcars-sidebar-section">
              <div className="newcars-sidebar-title">Price range</div>
              <div className="newcars-range-inputs">
                <div className="newcars-range-row">
                  <span style={{ color: '#6b7280', fontSize: 14 }}>₹</span>
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                </div>
                <div className="newcars-range-row">
                  <span style={{ color: '#6b7280', fontSize: 14 }}>₹</span>
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="newcars-sidebar-section">
              <div className="newcars-sidebar-title">Fuel type</div>
              <div className="newcars-checkbox-list">
                {['All', ...FUEL_TYPES].map((f) => (
                  <label key={f} className="newcars-checkbox-item">
                    <input
                      type="radio"
                      name="fuel"
                      checked={fuelFilter === f}
                      onChange={() => setFuelFilter(f)}
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="newcars-content">
            <div className="newcars-top-bar">
              <div className="newcars-search-wrap">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search by model or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="newcars-results-header">
              <button type="button" className="newcars-reset-btn" onClick={handleReset}>
                <ResetIcon /> Reset filters
              </button>
            </div>

            {loading && <p className="newcars-state">Loading cars...</p>}
            {error && <p className="newcars-state newcars-state--error">{error}</p>}
            {!loading && !error && filteredCars.length === 0 && (
              <p className="newcars-state">No new cars yet. Add listings from the admin panel.</p>
            )}

            <div className="newcars-car-grid">
              {filteredCars.map((car) => (
                <CarListingCard
                  key={car.id}
                  car={car}
                  onFavorite={toggleWishlist}
                  isFavorite={isInWishlist(car.id)}
                  onView={() => navigate(`/new-cars/${car.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      </div>
  );
}
