import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.badge}>
            <span style={styles.badgeIcon}>⚡</span>
            Trusted by 10,000+ buyers
          </div>
          <h1 style={styles.headline}>
            Find Your <span style={styles.highlight}>Dream Car</span>
          </h1>
          <p style={styles.description}>
            Browse thousands of premium vehicles from trusted sellers. Your next car is just a click away.
          </p>
          <div style={styles.buttons}>
            <Link to="/new-cars" style={styles.primaryBtn}>
              <span style={styles.btnIcon}>🔍</span>
              Browse Cars
            </Link>
            <Link to="/listings" style={styles.secondaryBtn}>
              View All Listings
              <span style={styles.arrow}>→</span>
            </Link>
          </div>
          <div style={styles.features}>
            <span style={styles.feature}>✓ Verified Sellers</span>
            <span style={styles.feature}>🛡 Quality Guaranteed</span>
          </div>
        </div>
        <div style={styles.right}>
          <div style={styles.imageWrap}>
            <img
              src="https://wallup.net/wp-content/uploads/2016/05/02/359382-Nissan_GT-R_R35-Nissan_GTR-car-vehicle-simple_background-reflection-orange_cars.jpg"
              alt="Dream car"
              style={styles.image}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling?.classList.add('visible');
              }}
            />
            <div style={styles.imagePlaceholder} className="hero-image-placeholder">
              <span>Car showcase</span>
            </div>
            <div style={styles.badgeOverlay}>
              <span style={styles.badgeOverlayIcon}>⚡</span>
              50+ Cars Listed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FFFFFF',
    padding: '60px 40px 80px',
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#FFF3E0',
    color: '#4B2E00',
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: '999px',
    width: 'fit-content',
  },
  badgeIcon: {
    color: '#FF6A00',
  },
  headline: {
    margin: 0,
    fontSize: '3rem',
    fontWeight: 700,
    color: '#0F1724',
    lineHeight: 1.2,
  },
  highlight: {
    color: 'var(--color-accent)',
  },
  description: {
    margin: 0,
    fontSize: '1.125rem',
    color: '#7A6B5A',
    lineHeight: 1.6,
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    backgroundColor: '#FF6A00',
    color: '#FFFFFF',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'opacity 0.2s',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    backgroundColor: '#FFFFFF',
    color: '#0F1724',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    border: '1px solid #E5E5E5',
    transition: 'background-color 0.2s',
  },
  btnIcon: {
    fontSize: '1.125rem',
  },
  arrow: {
    fontSize: '1.25rem',
    marginLeft: '4px',
  },
  features: {
    display: 'flex',
    gap: '24px',
    fontSize: '0.875rem',
    color: '#7A6B5A',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  right: {
    position: 'relative',
  },
  imageWrap: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    aspectRatio: '4/3',
    backgroundColor: '#2a2a2a',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    display: 'none',
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#777',
    background: 'linear-gradient(135deg, #3a3a3a, #2a2a2a)',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 106, 0, 0.3)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#0F1724',
  },
  badgeOverlayIcon: {
    color: '#FF6A00',
  },
};
