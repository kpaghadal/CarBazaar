import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarCard } from '../components/CarCard';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useOldCars } from '../context/OldCarsContext.jsx';
import { CARS } from '../data/cars';

function loadProfile() {
  try {
    const raw = localStorage.getItem('profile');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { firstName: 'User', lastName: 'name', postal: '', location: 'Rajkot', address: '' };
}
function saveProfile(p) {
  try {
    localStorage.setItem('profile', JSON.stringify(p));
  } catch {}
}
function loadRecent() {
  try {
    const raw = localStorage.getItem('recent');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function Profile() {
  const { items: wishlist } = useWishlist();
  const { items: listings } = useOldCars();
  const [profile, setProfile] = useState(() => loadProfile());
  const [editing, setEditing] = useState(false);
  const recentIds = loadRecent();

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const recentCars = useMemo(() => {
    const byId = new Map(CARS.map((c) => [String(c.id), c]));
    return recentIds
      .map((id) => byId.get(String(id)))
      .filter(Boolean)
      .slice(-6)
      .reverse();
  }, [recentIds]);

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>My Profile</h1>

        <section style={styles.summaryCard} className="hover-elevate-sm">
          <div style={styles.summaryLeft}>
            <div style={styles.avatar}>
              <span style={{ color: '#FF6A00', fontSize: 28 }}>👤</span>
            </div>
            <div>
              <div style={styles.summaryLine}>
                <strong>Total Listings: {listings.length}</strong>
              </div>
              <div style={styles.summarySub}>Monthly active listings</div>
            </div>
            <div style={{ marginLeft: 40 }}>
              <div style={styles.summaryLine}>
                <strong>Cars Wishlisted: {wishlist.length}</strong>
              </div>
              <div style={styles.summarySub}>Verified saves</div>
            </div>
          </div>
          <Link to="/sell" className="btn btn-primary" style={styles.listBtn}>
            + List a New car
          </Link>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          <div style={styles.formCard}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>First Name</label>
                <input
                  name="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Last Name</label>
                <input
                  name="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Postal Code</label>
                <input
                  name="postal"
                  value={profile.postal}
                  onChange={(e) => setProfile({ ...profile, postal: e.target.value })}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Location</label>
                <select
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!editing}
                  style={styles.input}
                >
                  <option>Rajkot</option>
                  <option>Ahmedabad</option>
                  <option>Surat</option>
                  <option>Vadodara</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={styles.label}>Address</label>
                <input
                  name="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!editing}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: 12 }}>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => setEditing((v) => !v)}
                style={styles.editBtn}
              >
                {editing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Recently Viewed Cars</h3>
          {recentCars.length === 0 ? (
            <div style={styles.empty}>No recent cars yet.</div>
          ) : (
            <div style={styles.grid}>
              {recentCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED' },
  main: { maxWidth: 1200, margin: '0 auto', padding: 40 },
  title: { margin: '0 0 16px', fontSize: '2rem', fontWeight: 800 },
  summaryCard: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #eee',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: '3px solid #FF6A00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  summaryLine: { fontSize: 16, color: '#0F1724' },
  summarySub: { fontSize: 12, color: '#6b7280' },
  listBtn: { padding: '10px 16px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 },
  section: { marginTop: 28 },
  sectionTitle: { margin: '0 0 12px', fontSize: 16 },
  formCard: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 },
  label: { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    padding: '0 12px',
    fontSize: 14,
  },
  editBtn: { padding: '10px 16px', borderRadius: 10, fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  empty: { color: '#6b7280' },
};
