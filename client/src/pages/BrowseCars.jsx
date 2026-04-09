import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarListingCard } from '../components/CarListingCard';
import { SearchIcon, ResetIcon } from '../components/NavIcons';
import { useWishlist } from '../context/WishlistContext.jsx';
import { carAPI, normalizeCar } from '../services/api.js';
import '../styles/users/BrowseCars.css';

const FUEL_TYPES = ['Gasoline', 'Hybrid', 'Electric', 'Diesel'];

export function BrowseCars() {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [allCars, setAllCars]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [brand, setBrand]       = useState('All Brands');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  // Fetch ALL cars from API on mount
  useEffect(() => {
    carAPI.getAll()
      .then((data) => setAllCars(data.map(normalizeCar)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Build brand list dynamically from fetched data
  const brandOptions = useMemo(
    () => ['All Brands', ...Array.from(new Set(allCars.map((c) => c.brand).filter(Boolean)))],
    [allCars]
  );
  const brandCounts = useMemo(() => {
    const counts = { 'All Brands': allCars.length };
    brandOptions.slice(1).forEach((b) => { counts[b] = allCars.filter((c) => c.brand === b).length; });
    return counts;
  }, [allCars, brandOptions]);

  const filteredCars = allCars.filter((c) => {
    const q = search.trim().toLowerCase();
    return (
      (!q || c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)) &&
      (brand === 'All Brands' || c.brand === brand) &&
      (fuelFilter === 'All' || c.fuelType === fuelFilter) &&
      c.price >= minPrice && c.price <= maxPrice
    );
  });

  const handleReset = () => {
    setSearch('');
    setBrand('All Brands');
    setFuelFilter('All');
    setMinPrice(0);
    setMaxPrice(500000);
  };

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>Browse All Cars</h1>
        <p style={styles.subtitle}>Find your perfect vehicle from our full collection</p>
        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            {/* Brands */}
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Brands</div>
              <div style={styles.checkboxList}>
                {brandOptions.map((b) => (
                  <label key={b} style={styles.checkboxItem}>
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === b}
                      onChange={() => setBrand(b)}
                    />
                    <span>{b} {brandCounts[b] !== undefined ? `(${brandCounts[b]})` : ''}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Price Range</div>
              <div style={styles.rangeInputs}>
                <div style={styles.rangeRow}>
                  <span style={styles.currencyPrefix}>₹</span>
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    style={styles.rangeInput}
                  />
                </div>
                <div style={styles.rangeRow}>
                  <span style={styles.currencyPrefix}>₹</span>
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || maxPrice)}
                    style={styles.rangeInput}
                  />
                </div>
              </div>
            </div>

            {/* Fuel Type */}
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Fuel Type</div>
              <div style={styles.checkboxList}>
                {['All', ...FUEL_TYPES].map((f) => (
                  <label key={f} style={styles.checkboxItem}>
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

          <section style={styles.content}>
            <div style={styles.topBar}>
              <div style={styles.searchWrap}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search cars by name, brand or model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <div style={styles.sortWrap}>
                <span style={{ fontSize: 13, color: '#6b7280', marginRight: 8 }}>Sort by:</span>
                <select style={styles.sortSelect}>
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div style={styles.resultsHeader}>
              <span style={styles.countText}>{filteredCars.length} cars found</span>
              <button type="button" style={styles.resetBtn} onClick={handleReset}>
                <ResetIcon />
                Reset filters
              </button>
            </div>

            {loading && <p style={{ color: '#7A6B5A', padding: 24 }}>Loading cars...</p>}
            {error   && <p style={{ color: '#EF4444', padding: 24 }}>{error}</p>}
            {!loading && !error && filteredCars.length === 0 && (
              <p style={{ color: '#7A6B5A', padding: 24 }}>No cars match your filters.</p>
            )}

            <div style={styles.carGrid}>
              {filteredCars.map((car) => (
                <CarListingCard
                  key={car.id}
                  car={car}
                  onFavorite={toggleWishlist}
                  isFavorite={isInWishlist(car.id)}
                  onView={() => navigate(car.type === 'new' ? `/new-cars/${car.id}` : `/old/${car.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#FFF7ED' },
  main: { maxWidth: 1200, margin: '0 auto', padding: '40px' },
  title: { margin: '0 0 4px', fontSize: '2rem', fontWeight: 700, color: '#0F1724' },
  subtitle: { margin: '0 0 24px', fontSize: '1rem', color: '#7A6B5A' },
  layout: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 },
  sidebar: {
    backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E5E5',
    padding: 20, display: 'flex', flexDirection: 'column', gap: 24, alignSelf: 'start',
  },
  sidebarSection: { borderBottom: '1px solid #E5E5E5', paddingBottom: 16 },
  sidebarTitle: { fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#0F1724' },
  checkboxList: { display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#0F1724' },
  checkboxItem: { display: 'flex', alignItems: 'center', gap: 8 },
  rangeInputs: { display: 'flex', flexDirection: 'column', gap: 8 },
  rangeRow: { display: 'flex', alignItems: 'center', gap: 6 },
  currencyPrefix: { fontSize: 14, color: '#6b7280' },
  rangeInput: { flex: 1, padding: '8px 10px', border: '1px solid #E5E5E5', borderRadius: 8, fontSize: 14, color: '#0F1724' },
  content: { display: 'flex', flexDirection: 'column', gap: 16 },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  searchWrap: {
    flex: 1, display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 14px', backgroundColor: '#FFFFFF', borderRadius: 999, border: '1px solid #E5E5E5',
  },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 14 },
  sortWrap: { display: 'flex', alignItems: 'center' },
  sortSelect: {
    padding: '8px 28px 8px 12px', borderRadius: 999, border: '1px solid #E5E5E5',
    fontSize: 14, backgroundColor: '#FFFFFF', appearance: 'none',
  },
  resultsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  countText: { fontSize: '0.875rem', color: '#7A6B5A' },
  resetBtn: {
    display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
    backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none',
    borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
  },
  carGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
};
