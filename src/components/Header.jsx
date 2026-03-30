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


  

  const navLinkClass = (isActive) =>
    `nav-link${isActive ? ' nav-link--active' : ''}`;

  return (
    <>
      <style>{`
        .nav-link {
          color: #6b7280;
          text-decoration: none;
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
          font-family: inherit;
        }
        .nav-link:hover {
          color: #FF6A00;
          background-color: #fff2e6;
          transform: translateY(-1px);
          text-decoration: none;
        }
        .nav-link--active {
          color: #FF6A00;
          background-color: #fff2e6;
        }
        .nav-link--active:hover {
          transform: none;
        }

        .dropdown-item {
          display: block;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #0F1724;
          text-decoration: none;
          transition: background-color 0.15s, color 0.15s, padding-left 0.15s;
        }
        .dropdown-item:hover {
          background-color: #fff2e6;
          color: #FF6A00;
          padding-left: 22px;
          text-decoration: none;
        }

        .logout-btn {
          height: 40px;
          padding: 0 22px;
          border-radius: 999px;
          background-color: #ff4d4f;
          color: #ffffff;
          border: none;
          font-size: 14px;
          font-weight: 600;
          margin-left: 16px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .logout-btn:hover {
          background-color: #e03b3d;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 77, 79, 0.35);
        }
        .logout-btn:active {
          transform: translateY(0);
          box-shadow: none;
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
          <a href="/home" className="logo-link">
            <div style={styles.logoIcon}>
              <CarIcon size={36} variant="footer" />
            </div>
            <div style={styles.logoText}>
              <span style={styles.logoTitle}>CarBazaar</span>
              <span style={styles.logoSubtitle}>Find your perfect ride</span>
            </div>
          </a>

          <nav style={styles.nav}>
            <Link to="/home" className={navLinkClass(isHome)}>
              <HomeIcon active={isHome} />
              Home
            </Link>

            <Link to="/new-cars" className={navLinkClass(isBuy)}>
              <SearchIcon active={isBuy} />
              Buy Cars
            </Link>

            <div style={styles.dropdownWrap} ref={dropdownRef}>
              <button
                type="button"
                className={navLinkClass(isSell)}
                style={styles.navLinkDropdown}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <SellIcon active={isSell} />
                Buy &amp; Sell Car
                <span style={{
                  ...styles.chevron,
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>▼</span>
              </button>

              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link
                    to="/sell"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Sell old car
                  </Link>
                  <Link
                    to="/old-cars"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Buy old car
                  </Link>
                  <Link
                    to="/old-cars"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Chat with users
                  </Link>
                </div>
              )}
            </div>

            <Link to="/wishlist" className={navLinkClass(path === '/wishlist')}>
              <HeartIcon active={path === '/wishlist'} />
              Wishlist
            </Link>

            <Link to="/profile" className={navLinkClass(path === '/profile')}>
              <ProfileIcon active={path === '/profile'} />
              Profile
            </Link>
          </nav>

          <button
            type="button"
            className="logout-btn"
            onClick={() => navigate('/login')}
          >
            Log Out
          </button>
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
    gap: 4,
    marginLeft: 'auto',
  },
  navLinkDropdown: {
    gap: 6,
  },
  chevron: {
    fontSize: 10,
    marginLeft: 2,
    display: 'inline-block',
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
    animation: 'fadeSlideDown 0.15s ease',
  },
};