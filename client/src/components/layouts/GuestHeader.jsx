import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CarIcon } from '../CarIcon';
import { HomeIcon, SearchIcon } from '../NavIcons';

export function GuestHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  
  const isHome = path === '/' || path === '/home';
  const isBuy = path === '/new-cars';

  const navLinkClass = (isActive) =>
    `nav-link${isActive ? ' nav-link--active' : ''}`;

  return (
    <>
      <style>{`
        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 999px;
          transition: color 0.2s, background-color 0.2s, transform 0.15s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #FF6A00;
          background-color: #fff2e6;
          transform: translateY(-1px);
        }
        .nav-link--active {
          color: #FF6A00;
          background-color: #fff2e6;
        }
        .login-btn {
          height: 40px;
          padding: 0 22px;
          border-radius: 999px;
          background-color: transparent;
          color: #FF6A00;
          border: 1.5px solid #FF6A00;
          font-size: 14px;
          font-weight: 600;
          margin-left: 16px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.15s;
        }
        .login-btn:hover {
          background-color: #fff2e6;
        }
        .register-btn {
          height: 40px;
          padding: 0 22px;
          border-radius: 999px;
          background-color: #FF6A00;
          color: #ffffff;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.15s;
        }
        .register-btn:hover {
          background-color: #e65c00;
          transform: translateY(-1px);
        }
        .logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .logo-link:hover {
          opacity: 0.8;
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <a href="/" className="logo-link">
            <div style={styles.logoIcon}>
              <CarIcon size={36} variant="footer" />
            </div>
            <div style={styles.logoText}>
              <span style={styles.logoTitle}>CarBazaar</span>
              <span style={styles.logoSubtitle}>Find your perfect ride</span>
            </div>
          </a>

          <nav style={styles.nav}>
            <Link to="/" className={navLinkClass(isHome)}>
              <HomeIcon active={isHome} />
              Home
            </Link>
            <Link to="/new-cars" className={navLinkClass(isBuy)}>
              <SearchIcon active={isBuy} />
              Buy Cars
            </Link>
            <Link to="/about" className={navLinkClass(path === '/about')}>About Us</Link>
            <Link to="/features" className={navLinkClass(path === '/features')}>Features</Link>
            <Link to="/contact" className={navLinkClass(path === '/contact')}>Contact</Link>
          </nav>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="login-btn" onClick={() => navigate('/login')}>Login</button>
            <button type="button" className="register-btn" onClick={() => navigate('/signup')}>Register</button>
          </div>
        </div>
      </header>
    </>
  );
}

const styles = {
  header: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  headerContent: {
    width: '100%',
    maxWidth: 1320,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    width: 36, height: 36, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  logoText: { display: 'flex', flexDirection: 'column', gap: 2 },
  logoTitle: { fontSize: 18, fontWeight: 700, color: '#0F1724' },
  logoSubtitle: { fontSize: 11, color: '#6b7280' },
  nav: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' },
};
