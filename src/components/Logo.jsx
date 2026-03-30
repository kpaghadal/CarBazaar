import { Link } from 'react-router-dom';
import { CarIcon } from './CarIcon';

export function Logo({ showTagline = false, variant = 'header' }) {
  const isAuth = variant === 'auth';
  return (
    <Link to="/home" style={styles.link}>
      <CarIcon size={isAuth ? 28 : 32} variant="logo" />
      <div style={styles.textWrap}>
        <span style={{ ...styles.text, color: isAuth ? '#FF6A00' : '#0F1724' }}>CarBazaar</span>
        {showTagline && <span style={styles.tagline}>Find your perfect ride.</span>}
      </div>
    </Link>
  );
}

const styles = {
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.2,
  },
  tagline: {
    color: '#7A6B5A',
    fontSize: '0.75rem',
    fontWeight: 400,
    marginTop: '2px',
  },
};
