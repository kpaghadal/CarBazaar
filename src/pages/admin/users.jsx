import { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import '../../styles/admin/admin.css';

// ── SVG Icons ──────────────────────────────────────────────
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

const IconUserCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
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

// Stat icons
const IconTotalUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconActiveUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>
  </svg>
);

const IconDealer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const IconSuspended = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────
const stats = [
  { label: 'Total Users',   value: '847', change: 'Total platform members', icon: <IconTotalUsers />,  color: '#3B82F6', bg: '#EFF6FF', positive: true  },
  { label: 'Active Users',  value: '234',  change: 'Currently active users',  icon: <IconActiveUsers />, color: '#22C55E', bg: '#F0FDF4', positive: true  },
];

const allUsers = [
  { id: 1, name: 'Mital Singh', email: 'mitals@email.com', avatar: 'MS', role: 'User', listings: 24, status: 'Active' },
  { id: 2, name: 'Mohan', email: 'mohan@email.com', avatar: 'MA', role: 'User', listings: 2,  status: 'Active' },
  { id: 3, name: 'Gourav Rajput', email: 'gourav@email.com', avatar: 'GR', role: 'User', listings: 18, status: 'Active' },
  { id: 4, name: 'Raj Dave', email: 'raj@email.com', avatar: 'RD', role: 'User', listings: 1,  status: 'Active' },
];

const roleStyle = { Admin: 'admin-role', Dealer: 'dealer-role', User: 'user-role' };

// ── Component ──────────────────────────────────────────────
export function AdminUsers() {
  const [roleFilter, setRoleFilter]     = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage]                 = useState(1);

  const filtered = allUsers.filter((u) => {
    const matchRole   = roleFilter   === 'All Roles'   || u.role   === roleFilter;
    const matchStatus = statusFilter === 'All Status'  || u.status === statusFilter;
    return matchRole && matchStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar
          title="Users Management"
          subtitle="Manage and monitor all platform users"
          showSearch={false}
        />

        <div className="admin-content">
          {/* Stat Cards */}
          <div className="admin-stats-grid cols-4">
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

          {/* Users Table */}
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2 className="admin-table-title">All Users</h2>
              <div className="admin-table-actions">
                <select
                  className="admin-filter-select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Dealer</option>
                  <option>User</option>
                </select>
                <select
                  className="admin-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
                <button className="admin-add-btn">
                  <IconPlus /> Add User
                </button>
              </div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Total Listings</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="admin-table-row">
                    <td>
                      <div className="admin-seller-cell">
                        <div className="admin-seller-avatar">{row.avatar}</div>
                        <div>
                          <p className="admin-seller-name">{row.name}</p>
                          <p className="admin-seller-sub">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${roleStyle[row.role]}`}>{row.role}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>
                        {row.listings}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-action-btn" title="Edit"><IconEdit /></button>
                        <button className="admin-action-btn approve" title="Approve/Activate"><IconUserCheck /></button>
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