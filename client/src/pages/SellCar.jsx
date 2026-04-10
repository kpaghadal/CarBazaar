import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { carAPI, uploadAPI } from '../services/api.js';
import styles from '../styles/sell.module.css';

export function SellCar() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [form, setForm] = useState({
    brand: '', model: '', year: '', fuelType: '', mileage: '',
    price: '', location: '', description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async () => {
    if (!isLoggedIn) { navigate('/login'); return; }
    if (!form.brand || !form.price) { setError('Brand and Price are required.'); return; }

    setLoading(true);
    setError('');
    try {
      let imageUrl = '';
      if (imageFile) imageUrl = await uploadAPI.upload(imageFile);

      const carName = `${form.year || ''} ${form.brand} ${form.model}`.trim();
      const newCar = await carAPI.create({
        name: carName,
        brand: form.brand,
        price: Number(form.price),
        image: imageUrl,
        description: form.description,
        type: 'old',
        year: Number(form.year) || 0,
        mileage: Number(form.mileage) || 0,
        fuelType: form.fuelType || 'Gasoline',
        location: form.location,
      });
      navigate(`/old/${newCar._id}`);
    } catch (err) {
      setError(err.message || 'Failed to post listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroSplit}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Trusted by 50k+ Sellers</div>
          <h1 className={styles.displayTitle}>
            Turn your car into <span className={styles.highlightText}>cash</span> safely.
          </h1>
          <p className={styles.heroDesc}>
            Experience the fastest way to sell your used car. No middlemen, no hidden fees, just direct connection with verified buyers.
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}><div className={styles.featureIcon}>✓</div><div className={styles.featureText}><h4>Verified Buyers Only</h4><p>We screen every buyer to ensure your safety and privacy.</p></div></div>
            <div className={styles.featureItem}><div className={styles.featureIcon}>📷</div><div className={styles.featureText}><h4>AI-Enhanced Listings</h4><p>Our smart tools help you take the best photos for your ad.</p></div></div>
          </div>
          <div className={styles.heroButtons}>
            <button type="button" className={styles.btnPrimary}>Start Selling Now</button>
            <button type="button" className={styles.btnOutline}>How it Works</button>
          </div>
        </div>
        <div className={styles.heroImageSide}>
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800" alt="Car Hero" className={styles.heroImg} />
          <div className={styles.heroOverlayCard}>
            <div className={styles.overlayTitle}>Market Pulse</div>
            <div className={styles.overlaySub}>Real-time stats from your area</div>
            <div className={styles.statRow}>
              <div className={styles.statItem}><div className={styles.statVal}>12k+</div><div className={styles.statLabel}>Active Buyers</div></div>
              <div className={styles.statItem}><div className={styles.statVal}>48h</div><div className={styles.statLabel}>Avg Sale Time</div></div>
              <div className={styles.statItem}><div className={styles.statVal}>0%</div><div className={styles.statLabel}>Commission</div></div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.sellContainer}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <div className={styles.formSidebar}>
              <div>
                <div className={styles.sidebarTitle}>Details for your listing</div>
                <div className={styles.sidebarText}>Provide accurate details to get the best price.</div>
              </div>
              {user && <div style={{ fontSize: 13, color: '#7A6B5A', marginTop: 12 }}>Listing as: <strong>{user.name}</strong></div>}
              <div className={styles.trustBadge}>
                <span style={{ fontSize: 24 }}>🔒</span>
                <div className={styles.trustBadgeText}>Your data is secure. We never share your personal phone number publicly.</div>
              </div>
            </div>

            <div className={styles.formMain}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Car Information</h2>
                <p className={styles.formSubtitle}>Fill in the specifications of your vehicle.</p>
              </div>

              {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 14, marginBottom: 12 }}>{error}</div>}

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Brand &amp; Model</label>
                  <input name="brand" value={form.brand} onChange={onChange} placeholder="Brand (e.g. Toyota)" className={styles.inputBox} />
                  <input name="model" value={form.model} onChange={onChange} placeholder="Model (e.g. Camry)" className={styles.inputBox} style={{ marginTop: 8 }} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Year of Registration</label>
                  <input name="year" value={form.year} onChange={onChange} placeholder="e.g. 2018" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Fuel Type</label>
                  <input name="fuelType" value={form.fuelType} onChange={onChange} placeholder="Gasoline / Diesel / Electric" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>KM Driven</label>
                  <input name="mileage" value={form.mileage} onChange={onChange} placeholder="0" className={styles.inputBox} />
                </div>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Description</label>
                  <textarea name="description" value={form.description} onChange={onChange} placeholder="Tell buyers about the condition, features, and history..." className={styles.inputBoxTextarea} />
                </div>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Car Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onImageChange}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{ backgroundColor: '#e0e0e0', color: '#000', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: 13 }}
                    >
                      Choose File
                    </button>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>
                      {imageFile ? imageFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Price (₹)</label>
                  <input name="price" value={form.price} onChange={onChange} placeholder="e.g. 12000" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input name="location" value={form.location} onChange={onChange} placeholder="City, State" className={styles.inputBox} />
                </div>
              </div>
              <div className={styles.formFooter}>
                <button type="button" onClick={onSubmit} className={styles.btnPrimary} disabled={loading}>
                  {loading ? 'Posting...' : 'Post Listing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}
