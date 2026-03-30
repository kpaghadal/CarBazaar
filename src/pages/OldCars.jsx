import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarListingCard } from '../components/CarListingCard';
import { SearchIcon, ResetIcon } from '../components/NavIcons';
import { useOldCars } from '../context/OldCarsContext.jsx';

export function OldCars() {
  const navigate = useNavigate();
  const { items } = useOldCars();
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All Brands');
  const [fuelFilter, setFuelFilter] = useState('All');

  const brands = ['All Brands', ...Array.from(new Set(items.map((c) => c.brand)))];
  const fuelTypes = ['All', ...Array.from(new Set(items.map((c) => c.fuelType)))];

  const filtered = items.filter((c) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q);
    const matchesBrand = brand === 'All Brands' || c.brand === brand;
    const matchesFuel = fuelFilter === 'All' || c.fuelType === fuelFilter;
    return matchesSearch && matchesBrand && matchesFuel;
  });

  const handleReset = () => {
    setSearch('');
    setBrand('All Brands');
    setFuelFilter('All');
  };

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>Buy Old Car</h1>
        <p style={styles.subtitle}>Listings posted by sellers</p>

        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Brands</div>
              <div style={styles.checkboxList}>
                {brands.map((b) => (
                  <label key={b} style={styles.checkboxItem}>
                    <input type="radio" name="brand" checked={brand === b} onChange={() => setBrand(b)} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.sidebarSection}>
              <div style={styles.sidebarTitle}>Fuel Type</div>
              <div style={styles.checkboxList}>
                {fuelTypes.map((f) => (
                  <label key={f} style={styles.checkboxItem}>
                    <input type="radio" name="fuel" checked={fuelFilter === f} onChange={() => setFuelFilter(f)} />
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
                  placeholder="Search by name or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <button type="button" style={styles.resetBtn} onClick={handleReset}>
                <ResetIcon />
                Reset filters
              </button>
            </div>

            <div style={styles.carGrid}>
              {filtered.map((car) => (
                <CarListingCard
                  key={car.id}
                  car={car}
                  onView={() => navigate(`/old/${car.id}`)}
                />
              ))}
              {filtered.length === 0 && <p style={{ color: '#7A6B5A' }}>No cars found.</p>}
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
  main: { maxWidth: 1200, margin: '0 auto', padding: 40 },
  title: { margin: '0 0 4px', fontSize: '2rem', fontWeight: 700, color: '#0F1724' },
  subtitle: { margin: '0 0 24px', fontSize: '1rem', color: '#7A6B5A' },
  layout: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 },
  sidebar: { display: 'flex', flexDirection: 'column', gap: 16 },
  sidebarSection: { background: '#FFFFFF', borderRadius: 12, padding: 16, border: '1px solid #eee' },
  sidebarTitle: { fontWeight: 700, marginBottom: 8 },
  checkboxList: { display: 'flex', flexDirection: 'column', gap: 8 },
  checkboxItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 },
  content: { display: 'flex', flexDirection: 'column', gap: 16 },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  searchWrap: { flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: '#FFFFFF', borderRadius: 999, border: '1px solid #E5E5E5' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 14 },
  resetBtn: { display: 'inline-flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' },
  carGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
};

