import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CarIcon } from './CarIcon';
import { HomeIcon, SearchIcon, SellIcon, HeartIcon, ProfileIcon } from './NavIcons';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const path = location.pathname;
  const isBuy = path === '/new-cars';
  const isHome = path === '/home';
  const isSell = path === '/sell';

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkStyle = (isActive) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : {}),
    ...(isActive ? styles.navLinkActiveBg : {}),
  });

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <Link to="/home" style={styles.logo}>
          <div style={styles.logoIcon}>
            <CarIcon size={36} variant="footer" />
          </div>
          <div style={styles.logoText}>
            <span style={styles.logoTitle}>CarBazaar</span>
            <span style={styles.logoSubtitle}>Find your perfect ride</span>
          </div>
        </Link>
        <nav style={styles.nav}>
          <Link to="/home" className="nav-link" style={navLinkStyle(isHome)}>
            <HomeIcon active={isHome} />
            Home
          </Link>
          <Link to="/new-cars" className="nav-link" style={navLinkStyle(isBuy)}>
            <SearchIcon active={isBuy} />
            Buy Cars
          </Link>
          <div style={styles.dropdownWrap} ref={dropdownRef}>
            <button
              type="button"
              className="nav-link"
              style={{
                ...styles.navLink,
                ...styles.navLinkDropdown,
                ...(isSell ? styles.navLinkActive : {}),
                ...(isSell ? styles.navLinkActiveBg : {}),
              }}
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <SellIcon active={isSell} />
              Sell Car
              <span style={styles.chevron}>▼</span>
            </button>
            {dropdownOpen && (
              <div style={styles.dropdown}>
                <Link
                  to="/sell"
                  style={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  Sell old car
                </Link>
                <Link
                  to="/old-cars"
                  style={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  Buy old car
                </Link>
              </div>
            )}
          </div>
          <Link to="/wishlist" className="nav-link" style={navLinkStyle(path === '/wishlist')}>
            <HeartIcon active={path === '/wishlist'} />
            Wishlist
          </Link>
          <Link to="/profile" className="nav-link" style={navLinkStyle(path === '/profile')}>
            <ProfileIcon active={path === '/profile'} />
            Profile
          </Link>
        </nav>
        <button
          type="button"
          style={styles.logOutBtn}
          onClick={() => navigate('/login')}
        >
          Log Out
        </button>
      </div>
    </header>
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
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0F1724',
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#6b7280',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
    marginLeft: 'auto',
  },
  navLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: 999,
    transition: 'all 0.2s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  navLinkDropdown: {
    gap: 6,
  },
  chevron: {
    fontSize: 10,
    marginLeft: 2,
    color: 'inherit',
  },
  navLinkActive: {
    color: '#FF6A00',
  },
  navLinkActiveBg: {
    backgroundColor: '#fff2e6',
  },
  dropdownWrap: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 4,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '1px solid rgba(0,0,0,0.08)',
    padding: '8px 0',
    zIndex: 100,
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    color: '#0F1724',
    textDecoration: 'none',
  },
  logOutBtn: {
    height: 40,
    padding: '0 22px',
    borderRadius: 999,
    backgroundColor: '#ff4d4f',
    color: '#FFFFFF',
    border: 'none',
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 16,
    cursor: 'pointer',
  },
};
