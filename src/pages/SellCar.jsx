import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import styles from '../styles/sell.module.css';
import { useOldCars } from '../context/OldCarsContext.jsx';

export function SellCar() {
  const navigate = useNavigate();
  const { addListing } = useOldCars();
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    mileage: '',
    price: '',
    location: '',
    image: '',
    description: '',
    sellerName: '',
    sellerPhone: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = () => {
    const id = addListing({
      ...form,
      title: `${form.year} ${form.brand} ${form.model}`.trim(),
    });
    navigate(`/old/${id}`);
  };

  return (
    <div className={styles.page}>
      <Header />
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
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <div className={styles.featureText}>
                <h4>Verified Buyers Only</h4>
                <p>We screen every buyer to ensure your safety and privacy.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📷</div>
              <div className={styles.featureText}>
                <h4>AI-Enhanced Listings</h4>
                <p>Our smart tools help you take the best photos for your ad.</p>
              </div>
            </div>
          </div>
          <div className={styles.heroButtons}>
            <button type="button" className={styles.btnPrimary}>Start Selling Now</button>
            <button type="button" className={styles.btnOutline}>How it Works</button>
          </div>
        </div>
        <div className={styles.heroImageSide}>
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
            alt="Car Hero"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlayCard}>
            <div className={styles.overlayTitle}>Market Pulse</div>
            <div className={styles.overlaySub}>Real-time stats from your area</div>
            <div className={styles.statRow}>
              <div className={styles.statItem}>
                <div className={styles.statVal}>12k+</div>
                <div className={styles.statLabel}>Active Buyers</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statVal}>48h</div>
                <div className={styles.statLabel}>Avg Sale Time</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statVal}>0%</div>
                <div className={styles.statLabel}>Commission</div>
              </div>
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
                <div className={styles.sidebarText}>
                  Provide accurate details to get the best price. Buyers trust listings with complete information and high-quality photos.
                </div>
              </div>
              <div className={styles.trustBadge}>
                <span style={{ fontSize: 24 }}>🔒</span>
                <div className={styles.trustBadgeText}>
                  Your data is secure. We never share your personal phone number publicly.
                </div>
              </div>
            </div>
            <div className={styles.formMain}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Car Information</h2>
                <p className={styles.formSubtitle}>Fill in the specifications of your vehicle.</p>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Brand & Model</label>
                  <input name="brand" value={form.brand} onChange={onChange} placeholder="Brand" className={styles.inputBox} />
                  <input name="model" value={form.model} onChange={onChange} placeholder="Model" className={styles.inputBox} style={{ marginTop: 8 }} />
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
                  <label className={styles.label}>Upload Photos</label>
                  <input name="image" value={form.image} onChange={onChange} placeholder="Image URL" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Price (USD)</label>
                  <input name="price" value={form.price} onChange={onChange} placeholder="e.g. 12000" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input name="location" value={form.location} onChange={onChange} placeholder="City, State" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Seller Name</label>
                  <input name="sellerName" value={form.sellerName} onChange={onChange} placeholder="Your name" className={styles.inputBox} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Seller Phone</label>
                  <input name="sellerPhone" value={form.sellerPhone} onChange={onChange} placeholder="+1 555 123 4567" className={styles.inputBox} />
                </div>
              </div>
              <div className={styles.formFooter}>
                <button type="button" onClick={onSubmit} className={styles.btnPrimary}>Post Listing</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
