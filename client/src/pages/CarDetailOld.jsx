import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carAPI, normalizeCar, chatAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export function CarDetailOld() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [car, setCar]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const startChat = async () => {
    if (!isLoggedIn) { navigate('/login'); return; }
    const sellerId = car?.seller?._id;
    if (!sellerId) { alert('Seller info not available'); return; }
    if (sellerId === user?._id) { alert('This is your own listing'); return; }
    setChatLoading(true);
    try {
      const chat = await chatAPI.start(sellerId);
      navigate(`/chat/${chat._id}`);
    } catch (err) {
      alert(err.message || 'Failed to start chat');
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    carAPI.getById(id)
      .then((data) => setCar(normalizeCar(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40, color: '#7A6B5A' }}>Loading listing...</main>
        </div>
    );
  }

  if (error || !car) {
    return (
      <div style={{ padding: 40 }}>
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
          <p style={{ color: '#EF4444' }}>{error || 'Listing not found.'}</p>
          <button onClick={() => navigate(-1)} style={{ marginTop: 12, color: '#FF6A00', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>← Go Back</button>
        </main>
        </div>
    );
  }

  return (
    <div style={styles.page}>
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
                <div style={styles.price}>₹{Number(car.price || 0).toLocaleString()}</div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Specifications</div>
              <div style={styles.specGrid}>
                <div style={styles.specItem}><div style={styles.specLabel}>Year</div><div style={styles.specValue}>{car.year}</div></div>
                <div style={styles.specItem}><div style={styles.specLabel}>Mileage</div><div style={styles.specValue}>{(car.mileage || 0).toLocaleString()} km</div></div>
                <div style={styles.specItem}><div style={styles.specLabel}>Fuel</div><div style={styles.specValue}>{car.fuelType}</div></div>
                <div style={styles.specItem}><div style={styles.specLabel}>Location</div><div style={styles.specValue}>{car.location}</div></div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Description</div>
              <p style={styles.desc}>{car.description || 'No description provided.'}</p>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Seller Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={styles.specLabel}>Name</div><div style={styles.specValue}>{car.seller?.name || 'Private Seller'}</div></div>
                <div><div style={styles.specLabel}>Phone</div><div style={styles.specValue}>{car.seller?.phone || '—'}</div></div>
                <div><div style={styles.specLabel}>Location</div><div style={styles.specValue}>{car.location}</div></div>
              </div>
              <button type="button" onClick={startChat} disabled={chatLoading} style={styles.contactBtn}>
                {chatLoading ? 'Connecting...' : 'Chat with Seller'}
              </button>
            </div>
          </div>
        </div>
      </main>
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
  card: { background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 16 },
  cardTitle: { fontWeight: 700, marginBottom: 8 },
  specGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  specItem: { background: '#FFF9F3', borderRadius: 8, padding: 12 },
  specLabel: { color: '#7A6B5A', fontSize: 12 },
  specValue: { fontWeight: 600 },
  desc: { color: '#3f3f46', fontSize: 14, margin: 0 },
  contactBtn: { marginTop: 16, width: '100%', padding: '12px 16px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' },
};
