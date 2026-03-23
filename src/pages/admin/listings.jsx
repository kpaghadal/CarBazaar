import { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import '../../styles/admin/admin.css';

// ── SVG Icons ──────────────────────────────────────────────
const IconCarSmall = () => (
  <svg width="28" height="22" viewBox="0 0 24 24" fill="#9CA3AF">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
    <circle cx="7.5" cy="14.5" r="1.5"/>
    <circle cx="16.5" cy="14.5" r="1.5"/>
  </svg>
);

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

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// Seller avatar placeholder
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────
const allListings = [
  { id: 1, car: 'Toyota Camry',        year: '2022 • Sedan',    price: '₹28,500', seller: 'Jency', avatar: 'JS', status: 'Approved', date: 'Mar 15, 2026' },
  { id: 2, car: 'Honda Civic',         year: '2023 • Hatchback', price: '₹24,900', seller: 'Shivansh', avatar: 'SJ', status: 'Pending',  date: 'Mar 14, 2026' },
  { id: 3, car: 'BMW X5',              year: '2021 • SUV',       price: '₹52,000', seller: 'Mahesh', avatar: 'MW', status: 'Rejected', date: 'Mar 13, 2026' },
  { id: 4, car: 'Mercedes C-Class',    year: '2022 • Sedan',    price: '₹45,800', seller: 'Elvish', avatar: 'ED', status: 'Approved', date: 'Mar 12, 2026' },
  { id: 5, car: 'Audi A4',             year: '2023 • Sedan',    price: '₹38,200', seller: 'Danish', avatar: 'DB', status: 'Pending',  date: 'Mar 11, 2026 ' },
];

// ── Component ──────────────────────────────────────────────
export function AdminListings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [page, setPage] = useState(1);

  const filtered = allListings.filter((l) => {
    const matchSearch = l.car.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar
          title="Listings Management"
          subtitle="Manage and review car listings"
          showSearch={false}
        />

        <div className="admin-content">
          <div className="admin-table-card">
            {/* Filters row */}
            <div className="admin-table-header">
              <div className="admin-table-actions">
                <div className="admin-table-search-wrap">
                  <span className="admin-table-search-icon"><IconSearch /></span>
                  <input
                    className="admin-table-search"
                    placeholder="Search listings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="admin-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
                <select
                  className="admin-filter-select"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  <option>All Brands</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                </select>
              </div>
              <button className="admin-add-btn">
                <IconPlus /> Add Listing
              </button>
            </div>

            {/* Table */}
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
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
                        <div className="admin-seller-avatar" style={{ background: '#E5E7EB', color: '#6B7280' }}>
                          <IconUser />
                        </div>
                        <div>
                          <p className="admin-seller-name">{row.seller}</p>
                          <p className="admin-seller-sub">{row.sellerTag}</p>
                        </div>
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

            {/* Pagination */}
            <div className="admin-pagination">
              <span className="admin-pagination-info">Showing 1 to 5 of 47 listings</span>
              <div className="admin-pagination-controls">
                <button className="admin-page-btn" onClick={() => setPage(Math.max(1, page - 1))}>
                  <IconChevronLeft />
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`admin-page-btn ${page === n ? 'active' : ''}`}
                    onClick={() => setPage(n)}
                  >{n}</button>
                ))}
                <button className="admin-page-btn dots">...</button>
                <button className="admin-page-btn" onClick={() => setPage(10)}>10</button>
                <button className="admin-page-btn" onClick={() => setPage(Math.min(10, page + 1))}>
                  <IconChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}