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

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// ── Status Dropdown ──────────────────────────────────────────
function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const options = ['Approved', 'Pending', 'Rejected'];
  const colors = {
    Approved: { bg: '#F0FDF4', color: '#22C55E', dot: '#22C55E' },
    Pending:  { bg: '#FFFBEB', color: '#F59E0B', dot: '#F59E0B' },
    Rejected: { bg: '#FEF2F2', color: '#EF4444', dot: '#EF4444' },
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

// ── View Modal ───────────────────────────────────────────────
function ViewModal({ listing, onClose }) {
  return (
    <div style={ms.overlay}>
      <div style={{ ...ms.modal, maxWidth: 460 }}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>Listing Details</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['Car',    listing.car],
            ['Year / Type', listing.year],
            ['Price', listing.price],
            ['Seller', listing.seller],
            ['Status', listing.status],
            ['Date Posted', listing.date],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 10 }}>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#0F1724', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={ms.modalFooter}>
          <button style={ms.saveBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Modal ─────────────────────────────────────────
const EMPTY_FORM = { car: '', year: '', price: '', seller: '', status: 'Pending', date: '' };
const BRANDS = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia', 'Ford', 'Suzuki', 'Tata'];
const TYPES  = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van'];

function ListingModal({ mode, listing, onSave, onClose }) {
  const [form, setForm] = useState(listing ? { ...listing } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.car.trim())    e.car    = 'Car name is required';
    if (!form.seller.trim()) e.seller = 'Seller name is required';
    if (!form.price.trim())  e.price  = 'Price is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div style={ms.field}>
      <label style={ms.label}>{label}</label>
      <input
        style={{ ...ms.input, ...(errors[key] ? ms.inputErr : {}) }}
        type={type}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      />
      {errors[key] && <span style={ms.errMsg}>{errors[key]}</span>}
    </div>
  );

  return (
    <div style={ms.overlay}>
      <div style={ms.modal}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>{mode === 'add' ? 'Add New Listing' : 'Edit Listing'}</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={ms.modalBody}>
          {field('car', 'Car Name', 'text', 'e.g. Toyota Camry')}

          <div style={ms.row}>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Year / Type</label>
              <input
                style={ms.input}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="e.g. 2022 • Sedan"
              />
            </div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Price</label>
              <input
                style={{ ...ms.input, ...(errors.price ? ms.inputErr : {}) }}
                value={form.price}
                onChange={(e) => { setForm({ ...form, price: e.target.value }); setErrors({ ...errors, price: '' }); }}
                placeholder="e.g. ₹28,500"
              />
              {errors.price && <span style={ms.errMsg}>{errors.price}</span>}
            </div>
          </div>

          <div style={ms.row}>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Seller Name</label>
              <input
                style={{ ...ms.input, ...(errors.seller ? ms.inputErr : {}) }}
                value={form.seller}
                onChange={(e) => { setForm({ ...form, seller: e.target.value }); setErrors({ ...errors, seller: '' }); }}
                placeholder="Enter seller name"
              />
              {errors.seller && <span style={ms.errMsg}>{errors.seller}</span>}
            </div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Status</label>
              <select style={ms.select} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {field('date', 'Date Posted', 'text', 'e.g. Mar 15, 2026')}
        </div>
        <div style={ms.modalFooter}>
          <button style={ms.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={ms.saveBtn} onClick={handleSubmit}>
            {mode === 'add' ? 'Add Listing' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Modal ─────────────────────────────────────────────
function DeleteModal({ listing, onConfirm, onClose }) {
  return (
    <div style={ms.overlay}>
      <div style={{ ...ms.modal, maxWidth: 400 }}>
        <div style={ms.modalHeader}>
          <h3 style={{ ...ms.modalTitle, color: '#ef4444' }}>Delete Listing</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>
            Are you sure you want to delete <strong>{listing.car}</strong>? This action cannot be undone.
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
    outline: 'none',
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
    background: '#fff', color: '#374151', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
  saveBtn: {
    padding: '9px 20px', borderRadius: 8, border: 'none',
    background: '#FF6A00', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
};

// ── Initial Data ─────────────────────────────────────────────
const initialListings = [
  { id: 1, car: 'Toyota Camry',     year: '2022 • Sedan',     price: '₹28,500', seller: 'Jency',    status: 'Approved', date: 'Mar 15, 2026' },
  { id: 2, car: 'Honda Civic',      year: '2023 • Hatchback',  price: '₹24,900', seller: 'Shivansh', status: 'Pending',  date: 'Mar 14, 2026' },
  { id: 3, car: 'BMW X5',           year: '2021 • SUV',        price: '₹52,000', seller: 'Mahesh',   status: 'Rejected', date: 'Mar 13, 2026' },
  { id: 4, car: 'Mercedes C-Class', year: '2022 • Sedan',      price: '₹45,800', seller: 'Elvish',   status: 'Approved', date: 'Mar 12, 2026' },
  { id: 5, car: 'Audi A4',          year: '2023 • Sedan',      price: '₹38,200', seller: 'Danish',   status: 'Pending',  date: 'Mar 11, 2026' },
];

// ── Main Component ───────────────────────────────────────────
export function AdminListings() {
  const [listings, setListings]         = useState(initialListings);
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [brandFilter, setBrandFilter]   = useState('All Brands');
  const [modal, setModal]               = useState(null); // { type: 'view'|'add'|'edit'|'delete', listing? }
  const [nextId, setNextId]             = useState(6);

  // Derived stats
  const totalListings    = listings.length;
  const approvedListings = listings.filter((l) => l.status === 'Approved').length;
  const pendingListings  = listings.filter((l) => l.status === 'Pending').length;

  const filtered = listings.filter((l) => {
    const matchSearch = l.car.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // CRUD
  const handleAdd = (form) => {
    setListings([...listings, { ...form, id: nextId }]);
    setNextId(nextId + 1);
    setModal(null);
  };

  const handleEdit = (form) => {
    setListings(listings.map((l) => l.id === modal.listing.id ? { ...l, ...form } : l));
    setModal(null);
  };

  const handleDelete = () => {
    setListings(listings.filter((l) => l.id !== modal.listing.id));
    setModal(null);
  };

  const updateStatus = (id, newStatus) => {
    setListings(listings.map((l) => l.id === id ? { ...l, status: newStatus } : l));
  };

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
                <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
                <select className="admin-filter-select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                  <option>All Brands</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                </select>
              </div>
              <button className="admin-add-btn" onClick={() => setModal({ type: 'add' })}>
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px 0', color: '#9ca3af', fontSize: 14 }}>
                      No listings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
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
                          <p className="admin-seller-name">{row.seller}</p>
                        </div>
                      </td>
                      <td><span className="admin-price">{row.price}</span></td>
                      <td>
                        <span className={`admin-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                      <td><span className="admin-date">{row.date}</span></td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-action-btn" title="View" onClick={() => setModal({ type: 'view', listing: row })}>
                            <IconEye />
                          </button>
                          <button className="admin-action-btn" title="Edit" onClick={() => setModal({ type: 'edit', listing: row })}>
                            <IconEdit />
                          </button>
                          <button className="admin-action-btn danger" title="Delete" onClick={() => setModal({ type: 'delete', listing: row })}>
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

      {/* Modals */}
      {modal?.type === 'view'   && <ViewModal    listing={modal.listing} onClose={() => setModal(null)} />}
      {modal?.type === 'add'    && <ListingModal mode="add"  listing={null}         onSave={handleAdd}  onClose={() => setModal(null)} />}
      {modal?.type === 'edit'   && <ListingModal mode="edit" listing={modal.listing} onSave={handleEdit} onClose={() => setModal(null)} />}
      {modal?.type === 'delete' && <DeleteModal  listing={modal.listing} onConfirm={handleDelete} onClose={() => setModal(null)} />}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}