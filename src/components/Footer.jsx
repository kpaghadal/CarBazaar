import { Link } from 'react-router-dom';
import { CarIcon } from './CarIcon';

export function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <div style={styles.logo}>
            <CarIcon size={28} variant="footer" />
            <span style={styles.logoText}>CarBazaar</span>
          </div>
          <p style={styles.description}>
            The premier marketplace for buying and selling new and used cars. Trusted by thousands of car enthusiasts worldwide.
          </p>
        </div>
        <div style={styles.column}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.links}>
            <li><Link to="/home" style={styles.link}>Home</Link></li>
            <li><Link to="/new-cars" style={styles.link}>New Cars</Link></li>
            <li><Link to="/old-cars" style={styles.link}>Used Cars</Link></li>
            <li><Link to="/sell" style={styles.link}>Sell Your Car</Link></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h3 style={styles.heading}>Contact</h3>
          <p style={styles.contact}>support@carxchange.com</p>
          <p style={styles.contact}>+1 (555) 123-4567</p>
          <p style={styles.contact}>123 Auto Mall Dr,</p>
          <p style={styles.contact}>Los Angeles, CA 90210</p>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.copyright}>© 2025 CarBazaar. All rights reserved.</p>
        <div style={styles.social}>
          <a href="#" aria-label="Facebook" style={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Twitter" style={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" style={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.268 4.771 1.691 5.077 4.907.06 1.052.076 1.9.076 4.163 0 2.305-.016 3.46-.076 4.163-.299 3.256-1.837 4.929-5.077 5.077-1.053.06-2.103.076-4.163.076-2.06 0-3.107-.016-4.163-.076-3.258-.148-4.771-1.691-5.077-4.907-.06-1.052-.076-1.9-.076-4.163 0-2.305.016-3.46.076-4.163.299-3.256 1.837-4.929 5.077-5.077 1.053-.06 2.103-.076 4.163-.076zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" aria-label="YouTube" style={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#0F1724',
    color: '#cccccc',
    padding: '60px 40px 24px',
    marginTop: '80px',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '48px',
    marginBottom: '32px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#FF6A00',
  },
  description: {
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    color: '#cccccc',
    margin: 0,
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 700,
    margin: 0,
    color: '#FFFFFF',
  },
  links: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: '#cccccc',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    transition: 'color 0.2s',
  },
  contact: {
    fontSize: '0.9375rem',
    margin: '0 0 4px',
    color: '#cccccc',
  },
  bottom: {
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontSize: '0.875rem',
    color: '#cccccc',
    margin: 0,
  },
  social: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
  },
};
