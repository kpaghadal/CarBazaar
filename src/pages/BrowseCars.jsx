import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarListingCard } from '../components/CarListingCard';
import { SearchIcon, ResetIcon } from '../components/NavIcons';
import { CARS } from '../data/cars';
import { useWishlist } from '../context/WishlistContext.jsx';

const BRAND_OPTIONS = ['Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Porsche', 'Ford', 'Chevrolet', 'Nissan'];
const FUEL_TYPES = ['Gasoline', 'Hybrid', 'Electric'];

function getBrandCounts() {
  const counts = { 'All Brands': CARS.length };
  BRAND_OPTIONS.forEach((b) => {
    counts[b] = CARS.filter((c) => c.brand === b).length;
  });
  return counts;
}

export function BrowseCars() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All Brands');
  const brandCounts = getBrandCounts();
  const [fuelFilter, setFuelFilter] = useState('All');
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(80000);

  const filteredCars = CARS.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brand === 'All Brands' || c.brand === brand;
    const matchesFuel = fuelFilter === 'All' || c.fuelType === fuelFilter;
    const matchesPrice = c.price >= minPrice && c.price <= maxPrice;
    return matchesSearch && matchesBrand && matchesFuel && matchesPrice;
  });

  const count = filteredCars.length;

  const handleReset = () => {
    setSearch('');
    setBrand('All Brands');
    setFuelFilter('All');
    setMinPrice(10000);
    setMaxPrice(80000);
  };

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>Buy Old Car</h1>
        <p style={styles.subtitle}>Find your perfect vehicle from our collection</p>
        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Brands</div>
              <div style={styles.checkboxList}>
                <label style={styles.checkboxItem}>
                  <input
                    type="radio"
                    name="brand"
                    checked={brand === 'All Brands'}
                    onChange={() => setBrand('All Brands')}
                  />
                  <span>All Brands</span>
                </label>
                {BRAND_OPTIONS.map((b) => (
                  <label key={b} style={styles.checkboxItem}>
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === b}
                      onChange={() => setBrand(b)}
                    />
                    <span>{b} ({brandCounts[b] ?? 0})</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Price Range</div>
              <div style={styles.rangeInputs}>
                <span style={styles.currencyPrefix}>₹</span>
                <input
                  type="number"
                  min={10000}
                  max={120000}
                  step={1000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || minPrice)}
                  style={styles.rangeInput}
                />
                <span style={{ color: '#6b7280' }}>–</span>
                <span style={styles.currencyPrefix}>$</span>
                <input
                  type="number"
                  min={10000}
                  max={120000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || maxPrice)}
                  style={styles.rangeInput}
                />
              </div>
              <div style={styles.rangeRow}>
                <input
                  type="range"
                  min={10000}
                  max={120000}
                  step={5000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  style={{ ...styles.range, accentColor: '#FF6A00' }}
                />
                <input
                  type="range"
                  min={10000}
                  max={120000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ ...styles.range, accentColor: '#FF6A00' }}
                />
              </div>
            </div>

            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Fuel Type</div>
              <div style={styles.checkboxList}>
                <label style={styles.checkboxItem}>
                  <input
                    type="radio"
                    name="fuel"
                    checked={fuelFilter === 'All'}
                    onChange={() => setFuelFilter('All')}
                  />
                  <span>All</span>
                </label>
                {FUEL_TYPES.map((f) => (
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
              <span style={styles.countText}>{count} cars found</span>
              <button type="button" style={styles.resetBtn} onClick={handleReset}>
                <ResetIcon />
                Reset filters
              </button>
            </div>

            <div style={styles.carGrid}>
              {filteredCars.map((car) => (
                <CarListingCard
                  key={car.id}
                  car={car}
                  onFavorite={toggleWishlist}
                  isFavorite={isInWishlist(car.id)}
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
  page: {
    minHeight: '100vh',
    backgroundColor: '#FFF7ED',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0F1724',
  },
  subtitle: {
    margin: '0 0 24px',
    fontSize: '1rem',
    color: '#7A6B5A',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: 24,
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #E5E5E5',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  sidebarSection: {
    borderBottom: '1px solid #E5E5E5',
    paddingBottom: 16,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: '#0F1724',
  },
  checkboxList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: 13,
    color: '#0F1724',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  rangeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  currencyPrefix: {
    fontSize: 14,
    color: '#6b7280',
  },
  rangeInput: {
    flex: 1,
    padding: '8px 10px',
    border: '1px solid #E5E5E5',
    borderRadius: 8,
    fontSize: 14,
    color: '#0F1724',
  },
  rangeRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  range: {
    width: '100%',
    accentColor: '#FF6A00',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  searchWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    border: '1px solid #E5E5E5',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 14,
  },
  sortWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  sortSelect: {
    padding: '8px 28px 8px 12px',
    borderRadius: 999,
    border: '1px solid #E5E5E5',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    fontSize: '0.875rem',
    color: '#7A6B5A',
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#FF6A00',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  carGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
};

