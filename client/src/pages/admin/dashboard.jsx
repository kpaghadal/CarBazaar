import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { adminAPI } from '../../services/api.js';
import '../../styles/admin/admin.css';

// ── SVG Icons ──────────────────────────────────────────────
const IconCar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
    <circle cx="7.5" cy="14.5" r="1.5"/>
    <circle cx="16.5" cy="14.5" r="1.5"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconDollar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

// Car icon for table rows
const IconCarSmall = () => (
  <svg width="26" height="20" viewBox="0 0 24 24" fill="#9CA3AF">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
  </svg>
);

// Action icons
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────
const stats = [
  { label: 'Total Listings',    value: '247',   change: 'Cars on Platform', icon: <IconCar />,        color: '#FF6A00', bg: '#FFF3EC', positive: true  },
  { label: 'Active Listings',   value: '215',   change: 'Available Cars',  icon: <IconCheckCircle />, color: '#22C55E', bg: '#F0FDF4', positive: true  },
  { label: 'Total Users',       value: '429',  change: 'Platform Users', icon: <IconUsers />,      color: '#3B82F6', bg: '#EFF6FF', positive: true  },
];

const listings = [
  { id: 1, car: 'BMW M4 Competition',    year: '2023 • Manual',    price: '₹89,500',   seller: 'Deep Shah',    avatar: 'DS', status: 'Approved', date: 'Jan 15, 2026' },
  { id: 2, car: 'Mercedes-Benz GLE 450', year: '2024 • Automatic', price: '₹76,900',   seller: 'Ravi',  avatar: 'RR', status: 'Pending',  date: 'Jan 14, 2026' },
  { id: 3, car: 'Audi A6 Quattro',       year: '2023 • Automatic', price: '₹62,400',   seller: 'Anant Patel',  avatar: 'AP', status: 'Approved', date: 'Jan 13, 2026' },
  { id: 4, car: 'Porsche 911 Carrera',   year: '2024 • Manual',    price: '₹1,24,900', seller: 'Mahesh Joshi', avatar: 'MJ', status: 'Approved', date: 'Jan 12, 2026' },
  { id: 5, car: 'Tesla Model S Plaid',   year: '2024 • Automatic', price: '₹95,000',   seller: 'Rajesh Sharma',avatar: 'RS', status: 'Pending',  date: 'Jan 11, 2026' },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: 'Total Listings', value: '—', change: 'Cars on Platform', icon: <IconCar />,        color: '#FF6A00', bg: '#FFF3EC', positive: true },
    { label: 'Active Listings', value: '—', change: 'Available Cars',  icon: <IconCheckCircle />, color: '#22C55E', bg: '#F0FDF4', positive: true },
    { label: 'Total Users',     value: '—', change: 'Platform Users',  icon: <IconUsers />,       color: '#3B82F6', bg: '#EFF6FF', positive: true },
  ]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch real counts
    Promise.all([adminAPI.getCars(), adminAPI.getUsers()])
      .then(([cars, users]) => {
        setStats([
          { label: 'Total Listings',  value: String(cars.length),  change: 'Cars on Platform', icon: <IconCar />,        color: '#FF6A00', bg: '#FFF3EC', positive: true },
          { label: 'Active Listings', value: String(cars.length),  change: 'Available Cars',   icon: <IconCheckCircle />, color: '#22C55E', bg: '#F0FDF4', positive: true },
          { label: 'Total Users',     value: String(users.length), change: 'Platform Users',   icon: <IconUsers />,       color: '#3B82F6', bg: '#EFF6FF', positive: true },
        ]);
        // Show most recent 5 listings in the table
        setListings(cars.slice(0, 5).map((c) => ({
          id: c._id,
          car: c.name,
          year: c.year ? `${c.year} • ${c.type}` : c.type,
          price: `₹${(c.price || 0).toLocaleString()}`,
          seller: c.seller?.name || 'Unknown',
          avatar: (c.seller?.name || 'U').slice(0, 2).toUpperCase(),
          status: 'Approved',
          date: new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        })));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Dashboard Overview" showSearch={true} />

        <div className="admin-content">
          {/* Stat Cards */}
          <div className="admin-stats-grid cols-5">
            {stats.map((s, i) => (
              <div className="admin-stat-card" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="admin-stat-top">
                  <div>
                    <p className="admin-stat-label">{s.label}</p>
                    <p className="admin-stat-value">{s.value}</p>
                  </div>
                  <div className="admin-stat-icon" style={{ background: s.bg, color: s.color }}>
                    {s.icon}
                  </div>
                </div>
                <p className={`admin-stat-change ${s.positive ? 'positive' : 'negative'}`}>
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Listings */}
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2 className="admin-table-title">Recent Listings</h2>
              <button className="admin-view-all" onClick={() => navigate('/admin/listings')}>
                View All
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((row) => (
                  <tr key={row.id} className="admin-table-row">
                    <td>
                      <div className="admin-car-cell">
                        <div className="admin-car-img"><IconCarSmall /></div>
                        <div>
                          <p className="admin-car-name">{row.car}</p>
                          <p className="admin-car-year">{row.year}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="admin-seller-cell">
                        <div className="admin-seller-avatar">{row.avatar}</div>
                        <span className="admin-seller-name">{row.seller}</span>
                      </div>
                    </td>
                    <td><span className="admin-price">{row.price}</span></td>
                    <td>
                      <span className={`admin-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                    </td>
                    <td><span className="admin-date">{row.date}</span></td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-action-btn" title="View"><IconEye /></button>
                        <button className="admin-action-btn" title="Edit"><IconEdit /></button>
                        <button className="admin-action-btn danger" title="Delete"><IconTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}