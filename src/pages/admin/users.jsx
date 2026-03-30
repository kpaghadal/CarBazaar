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

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
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

// ── Helpers ─────────────────────────────────────────────────
const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const roleStyle = { Admin: 'admin-role', Dealer: 'dealer-role', User: 'user-role' };

const EMPTY_FORM = { name: '', email: '', role: 'User', listings: 0, status: 'Active' };

// ── Status Dropdown ──────────────────────────────────────────
function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const options = ['Active', 'Suspended'];
  const colors = {
    Active:    { bg: '#F0FDF4', color: '#22C55E', dot: '#22C55E' },
    Suspended: { bg: '#FEF2F2', color: '#EF4444', dot: '#EF4444' },
    Pending:   { bg: '#FFFBEB', color: '#F59E0B', dot: '#F59E0B' },
  };
  const c = colors[status] || colors.Pending;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 20,
          background: c.bg, color: c.color,
          border: `1.5px solid ${c.color}33`,
          fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
        {status}
        <span style={{ color: c.color, opacity: 0.7, display: 'flex', alignItems: 'center' }}>
          <IconChevronDown />
        </span>
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0,
            background: '#fff', borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid #f3f4f6',
            zIndex: 11, minWidth: 130, padding: '4px 0',
            animation: 'modalIn 0.15s ease',
          }}>
            {options.map((opt) => {
              const oc = colors[opt];
              const isSelected = opt === status;
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', padding: '8px 14px',
                    background: isSelected ? oc.bg : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: 13, fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? oc.color : '#374151',
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: oc.dot, flexShrink: 0 }} />
                  {opt}
                  {isSelected && <span style={{ marginLeft: 'auto', fontSize: 11 }}>✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────
function UserModal({ mode, user, onSave, onClose }) {
  const [form, setForm] = useState(user ? { ...user } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const field = (key, label, type = 'text') => (
    <div style={ms.field}>
      <label style={ms.label}>{label}</label>
      <input
        style={{ ...ms.input, ...(errors[key] ? ms.inputErr : {}) }}
        type={type}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors[key] && <span style={ms.errMsg}>{errors[key]}</span>}
    </div>
  );

  return (
    <div style={ms.overlay}>
      <div style={ms.modal}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>{mode === 'add' ? 'Add New User' : 'Edit User'}</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={ms.modalBody}>
          {field('name', 'Full Name')}
          {field('email', 'Email Address', 'email')}
          <div style={ms.row}>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Role</label>
              <select style={ms.select} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>User</option>
                <option>Dealer</option>
                <option>Admin</option>
              </select>
            </div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Status</label>
              <select style={ms.select} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Active</option>
                <option>Suspended</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div style={ms.field}>
            <label style={ms.label}>Total Listings</label>
            <input
              style={ms.input}
              type="number"
              min="0"
              value={form.listings}
              onChange={(e) => setForm({ ...form, listings: Number(e.target.value) })}
            />
          </div>
        </div>
        <div style={ms.modalFooter}>
          <button style={ms.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={ms.saveBtn} onClick={handleSubmit}>
            {mode === 'add' ? 'Add User' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────────
function DeleteModal({ user, onConfirm, onClose }) {
  return (
    <div style={ms.overlay}>
      <div style={{ ...ms.modal, maxWidth: 400 }}>
        <div style={ms.modalHeader}>
          <h3 style={{ ...ms.modalTitle, color: '#ef4444' }}>Delete User</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>
            Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
          </p>
        </div>
        <div style={ms.modalFooter}>
          <button style={ms.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={{ ...ms.saveBtn, background: '#ef4444' }} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Modal Styles ─────────────────────────────────────────────
const ms = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, backdropFilter: 'blur(3px)',
  },
  modal: {
    background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520,
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    animation: 'modalIn 0.2s ease',
  },
  modalHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px', borderBottom: '1px solid #f3f4f6',
  },
  modalTitle: { fontSize: 18, fontWeight: 700, color: '#0F1724', margin: 0 },
  closeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#9ca3af', padding: 4, borderRadius: 6, display: 'flex',
    transition: 'color 0.15s',
  },
  modalBody: { padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 },
  modalFooter: {
    padding: '16px 24px', borderTop: '1px solid #f3f4f6',
    display: 'flex', justifyContent: 'flex-end', gap: 10,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: {
    padding: '9px 12px', borderRadius: 8,
    border: '1.5px solid #e5e7eb', fontSize: 14, color: '#0F1724',
    outline: 'none', transition: 'border-color 0.2s',
  },
  inputErr: { borderColor: '#ef4444' },
  errMsg: { fontSize: 12, color: '#ef4444' },
  select: {
    padding: '9px 12px', borderRadius: 8,
    border: '1.5px solid #e5e7eb', fontSize: 14, color: '#0F1724',
    background: '#fff', cursor: 'pointer',
  },
  row: { display: 'flex', gap: 12 },
  cancelBtn: {
    padding: '9px 20px', borderRadius: 8, border: '1.5px solid #e5e7eb',
    background: '#fff', color: '#374151', fontSize: 14, fontWeight: 600,
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '9px 20px', borderRadius: 8, border: 'none',
    background: '#FF6A00', color: '#fff', fontSize: 14, fontWeight: 600,
    cursor: 'pointer',
  },
};

// ── Main Component ───────────────────────────────────────────
const initialUsers = [
  { id: 1, name: 'Mital Singh',   email: 'mitals@email.com', role: 'User', listings: 24, status: 'Active'    },
  { id: 2, name: 'Mohan',         email: 'mohan@email.com',  role: 'User', listings: 2,  status: 'Active'    },
  { id: 3, name: 'Gourav Rajput', email: 'gourav@email.com', role: 'User', listings: 18, status: 'Active'    },
  { id: 4, name: 'Raj Dave',      email: 'raj@email.com',    role: 'User', listings: 1,  status: 'Suspended' },
];

export function AdminUsers() {
  const [users, setUsers]               = useState(initialUsers);
  const [roleFilter, setRoleFilter]     = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [modal, setModal]               = useState(null);
  const [nextId, setNextId]             = useState(5);

  const totalUsers  = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;

  const stats = [
    { label: 'Total Users',  value: totalUsers,  change: 'Total platform members', icon: <IconTotalUsers />,  color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Active Users', value: activeUsers, change: 'Currently active users',  icon: <IconActiveUsers />, color: '#22C55E', bg: '#F0FDF4' },
  ];

  const filtered = users.filter((u) => {
    const matchRole   = roleFilter   === 'All Roles'  || u.role   === roleFilter;
    const matchStatus = statusFilter === 'All Status' || u.status === statusFilter;
    return matchRole && matchStatus;
  });

  const handleAdd = (form) => {
    setUsers([...users, { ...form, id: nextId, avatar: getInitials(form.name) }]);
    setNextId(nextId + 1);
    setModal(null);
  };

  const handleEdit = (form) => {
    setUsers(users.map((u) => (u.id === modal.user.id ? { ...u, ...form, avatar: getInitials(form.name) } : u)));
    setModal(null);
  };

  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== modal.user.id));
    setModal(null);
  };

  const updateStatus = (id, newStatus) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: newStatus } : u));
  };

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
                <p className="admin-stat-change positive">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2 className="admin-table-title">All Users</h2>
              <div className="admin-table-actions">
                <select className="admin-filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Dealer</option>
                  <option>User</option>
                </select>
                <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
                <button className="admin-add-btn" onClick={() => setModal({ type: 'add' })}>
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px 0', color: '#9ca3af', fontSize: 14 }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id} className="admin-table-row">
                      <td>
                        <div className="admin-seller-cell">
                          <div className="admin-seller-avatar">{getInitials(row.name)}</div>
                          <div>
                            <p className="admin-seller-name">{row.name}</p>
                            <p className="admin-seller-sub">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${roleStyle[row.role] || 'user-role'}`}>{row.role}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>
                          {row.listings}
                        </span>
                      </td>
                      <td>
                        <StatusDropdown
                          status={row.status}
                          onChange={(newStatus) => updateStatus(row.id, newStatus)}
                        />
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-action-btn" title="Edit User" onClick={() => setModal({ type: 'edit', user: row })}>
                            <IconEdit />
                          </button>
                          <button className="admin-action-btn approve" title="Activate User" onClick={() => updateStatus(row.id, 'Active')}>
                            <IconUserCheck />
                          </button>
                          <button className="admin-action-btn danger" title="Delete User" onClick={() => setModal({ type: 'delete', user: row })}>
                            <IconTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal?.type === 'add' && (
        <UserModal mode="add" user={null} onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'edit' && (
        <UserModal mode="edit" user={modal.user} onSave={handleEdit} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'delete' && (
        <DeleteModal user={modal.user} onConfirm={handleDelete} onClose={() => setModal(null)} />
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        .admin-badge.suspended { background: #FEF2F2; color: #EF4444; }
        .admin-badge.pending   { background: #FFFBEB; color: #F59E0B; }
        .admin-badge.active    { background: #F0FDF4; color: #22C55E; }
      `}</style>
    </div>
  );
}