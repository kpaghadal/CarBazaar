import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CARS } from '../data/cars';
import { useWishlist } from '../context/WishlistContext.jsx';

export function CarDetailNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const car = CARS.find((c) => String(c.id) === String(id));
  if (!car) {
    return (
      <div style={{ padding: 40 }}>
        <Header />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
          <p>Car not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const inWish = isInWishlist(car.id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recent');
      const arr = raw ? JSON.parse(raw) : [];
      const set = new Set(arr.map(String));
      set.add(String(car.id));
      localStorage.setItem('recent', JSON.stringify(Array.from(set)));
    } catch {}
  }, [car.id]);

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <button type="button" onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back to Listing
        </button>
        <div style={styles.grid}>
          <div style={styles.gallery}>
            <img src={car.image} alt={car.title} style={styles.heroImg} />
          </div>
          <div style={styles.side}>
            <div style={styles.header}>
              <div>
                <h2 style={styles.title}>{car.title}</h2>
                <div style={styles.price}>${car.price.toLocaleString()}</div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(car)}
                  style={{ ...styles.wishBtn, ...(inWish ? styles.wishBtnActive : {}) }}
                >
                  {inWish ? '♥' : '♡'} Add to Wishlist
                </button>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Specifications</div>
              <div style={styles.specGrid}>
                <div style={styles.specItem}>
                  <div style={styles.specLabel}>Year</div>
                  <div style={styles.specValue}>{car.year}</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specLabel}>Mileage</div>
                  <div style={styles.specValue}>{car.mileage.toLocaleString()} mi</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specLabel}>Fuel</div>
                  <div style={styles.specValue}>{car.fuelType}</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specLabel}>Location</div>
                  <div style={styles.specValue}>{car.location}</div>
                </div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Description</div>
              <p style={styles.desc}>
                Premium condition with outstanding performance. Detailed service history available on request.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED' },
  main: { maxWidth: 1200, margin: '0 auto', padding: 40 },
  backBtn: { marginBottom: 16, border: 'none', background: 'transparent', color: '#FF6A00', fontWeight: 600, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 },
  gallery: { background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 12 },
  heroImg: { width: '100%', display: 'block', borderRadius: 8 },
  side: { display: 'flex', flexDirection: 'column', gap: 16 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { margin: 0, fontSize: '1.5rem', color: '#0F1724' },
  price: { color: '#FF6A00', fontSize: '1.5rem', fontWeight: 700 },
  wishBtn: { padding: '10px 14px', borderRadius: 999, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontWeight: 600 },
  wishBtnActive: { background: '#FF6A00', color: '#fff', borderColor: '#FF6A00' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 16 },
  cardTitle: { fontWeight: 700, marginBottom: 8 },
  specGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  specItem: { background: '#FFF9F3', borderRadius: 8, padding: 12 },
  specLabel: { color: '#7A6B5A', fontSize: 12 },
  specValue: { fontWeight: 600 },
  desc: { color: '#3f3f46', fontSize: 14, margin: 0 },
};
