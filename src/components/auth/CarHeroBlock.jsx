/**
 * Left-panel hero block: headline, subtext, car image/video area, footer text.
 * Variant: 'signup' | 'login'
 */
export function CarHeroBlock({ variant = 'signup' }) {
  const isSignup = variant === 'signup';
  return (
    <>
      <div>
        <h2 style={{ ...styles.headline, ...(isSignup ? styles.headlineSignup : styles.headlineLogin) }}>
          {isSignup ? 'Join the community' : 'Find your next ride.'}
        </h2>
        <p style={styles.subline}>
          {isSignup
            ? 'Create an account to start buying and selling verified used cars.'
            : 'Buy and sell verified used cars with confidence on CarBazaar.'}
        </p>
      </div>
      <div style={styles.mediaWrap}>
        <img
          src="https://cdn.motor1.com/images/mgl/j1QVR/s1/mclaren-600lt-mclaren-orange.jpg"
          alt="Car"
          style={styles.media}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling?.classList.add('visible');
          }}
        />
        <div style={styles.mediaPlaceholder} className="car-hero-placeholder" aria-hidden>
          <span style={styles.placeholderText}>Car showcase</span>
        </div>
      </div>
      <p style={styles.footer}>
        Secure logins, verified sellers, and transparent deals on every car.
      </p>
    </>
  );
}

const styles = {
  headline: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  headlineLogin: { color: '#4B2E00' },
  headlineSignup: { color: '#0F1724' },
  subline: {
    margin: '12px 0 0',
    fontSize: '0.9375rem',
    color: '#7A6B5A',
    lineHeight: 1.5,
  },
 mediaWrap: {
  position: 'relative',
  width: '100%',
  height: 260,
  minHeight: 260,
  maxHeight: 260,
  borderRadius: 8,
  border: '1px solid #E5E5E5',
  overflow: 'hidden',
  backgroundColor: '#2a2a2a',
  flexShrink: 0,          // ← prevents it from shrinking on shorter pages
},
media: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',       // ← removes any bottom gap
},
  mediaPlaceholder: {
    display: 'none',
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
  },
  placeholderText: {
    color: '#7A6B5A',
    fontSize: '0.875rem',
  },
  footer: {
    margin: 0,
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
};
