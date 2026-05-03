import { useState, useEffect, useMemo, useRef } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { adminAPI, carAPI, uploadAPI } from '../../services/api.js';
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
  const r = listing.raw || {};
  const rows = [
    ['Car', listing.car],
    ['Brand', r.brand || '—'],
    ['Year / Type', listing.year],
    ['Price', listing.price],
    ['Fuel', r.fuelType || '—'],
    ['Transmission', r.transmission || '—'],
    ['Body', r.bodyType || '—'],
    ['Color', r.color || '—'],
    ['Location', r.location || '—'],
    ['Seller', listing.seller],
    ['Status', listing.status],
    ['Date posted', listing.date],
  ];
  return (
    <div style={ms.overlay}>
      <div style={{ ...ms.modal, maxWidth: 480 }}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>Listing details</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rows.map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid #f3f4f6', paddingBottom: 10 }}>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500, flexShrink: 0 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#0F1724', fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}>{val}</span>
            </div>
          ))}
          {r.description ? (
            <div style={{ paddingTop: 4 }}>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>Description</span>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{r.description}</p>
            </div>
          ) : null}
        </div>
        <div style={ms.modalFooter}>
          <button style={ms.saveBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Modal ─────────────────────────────────────────
const EMPTY_FORM = {
  name: '',
  brand: 'Toyota',
  price: '',
  image: '',
  images: '',
  description: '',
  type: 'new',
  year: '',
  mileage: '',
  fuelType: 'Gasoline',
  location: '',
  features: '',
  transmission: 'Automatic',
  bodyType: 'Sedan',
  color: '',
};
const BRANDS = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia', 'Ford', 'Suzuki', 'Tata'];
const FUELS  = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
const TRANSMISSIONS = ['Automatic', 'Manual', 'CVT'];
const BODIES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van'];

function rawToForm(raw) {
  if (!raw) return { ...EMPTY_FORM };
  const gallery = Array.isArray(raw.images) && raw.images.length ? raw.images.join('\n') : '';
  return {
    name: raw.name || '',
    brand: raw.brand || 'Toyota',
    price: raw.price != null ? String(raw.price) : '',
    image: raw.image || '',
    images: gallery,
    description: raw.description || '',
    type: raw.type || 'new',
    year: raw.year ? String(raw.year) : '',
    mileage: raw.mileage != null ? String(raw.mileage) : '',
    fuelType: raw.fuelType || 'Gasoline',
    location: raw.location || '',
    features: Array.isArray(raw.features) ? raw.features.join('\n') : '',
    transmission: raw.transmission || 'Automatic',
    bodyType: raw.bodyType || 'Sedan',
    color: raw.color || '',
  };
}

function formToPayload(form) {
  return {
    name: form.name.trim(),
    brand: form.brand,
    price: Number(form.price),
    image: form.image.trim(),
    images: form.images,
    description: form.description.trim(),
    type: form.type,
    year: Number(form.year) || 0,
    mileage: Number(form.mileage) || 0,
    fuelType: form.fuelType,
    location: form.location.trim(),
    features: form.features,
    transmission: form.transmission,
    bodyType: form.bodyType,
    color: form.color.trim(),
  };
}

function ListingModal({ mode, listing, onSave, onClose }) {
  const [form, setForm] = useState(() => rawToForm(listing?.raw));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [coverFile, setCoverFile]       = useState(null);
  const [coverPreview, setCoverPreview] = useState(form.image || '');
  const coverRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name?.trim())  e.name  = 'Name is required';
    if (!form.brand?.trim()) e.brand = 'Brand is required';
    if (!String(form.price).trim())  e.price = 'Price is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      const payload = formToPayload(form);
      if (coverFile) payload.image = await uploadAPI.upload(coverFile);
      onSave(payload);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setSaving(false);
    }
  };

  const onCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
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
      <div style={{ ...ms.modal, maxWidth: 600 }}>
        <div style={ms.modalHeader}>
          <h3 style={ms.modalTitle}>{mode === 'add' ? 'Add New Listing' : 'Edit Listing'}</h3>
          <button style={ms.closeBtn} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ ...ms.modalBody, maxHeight: '70vh', overflowY: 'auto' }}>
          
          <div style={ms.row}>
            <div style={{ flex: 1 }}>{field('name', 'Car Name', 'text', 'e.g. Camry XLE')}</div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Brand</label>
              <select style={ms.select} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
                {BRANDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div style={ms.row}>
            <div style={{ flex: 1 }}>{field('price', 'Price (₹)', 'number', 'e.g. 2500000')}</div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Type (New/Old)</label>
              <select style={ms.select} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="new">New Car</option>
                <option value="old">Used/Old Car</option>
              </select>
            </div>
          </div>

          <div style={ms.row}>
            <div style={{ flex: 1 }}>{field('year', 'Year', 'number', 'e.g. 2024')}</div>
            <div style={{ flex: 1 }}>{field('mileage', 'Mileage (km)', 'number', 'e.g. 15000')}</div>
          </div>

          <div style={ms.row}>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Fuel Type</label>
              <select style={ms.select} value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
                {FUELS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>{field('location', 'Location', 'text', 'e.g. Mumbai')}</div>
          </div>

          {/* Cover image — file picker */}
          <div style={ms.field}>
            <label style={ms.label}>Primary Image</label>
            <input type="file" accept="image/*" ref={coverRef} style={{ display: 'none' }} onChange={onCoverChange} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                style={{ backgroundColor: '#e0e0e0', color: '#000', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: 13 }}
              >
                Choose File
              </button>
              <span style={{ fontSize: 13, color: '#6b7280' }}>
                {coverFile ? coverFile.name : 'No file chosen'}
              </span>
            </div>
          </div>

          <div style={ms.field}>
            <label style={ms.label}>Extra image URLs (one per line)</label>
            <textarea
              style={{ ...ms.input, minHeight: 72, resize: 'vertical' }}
              value={form.images}
              onChange={(e) => setForm({ ...form, images: e.target.value })}
              placeholder="https://...&#10;https://..."
            />
          </div>

          <div style={ms.row}>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Transmission</label>
              <select style={ms.select} value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}>
                {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ ...ms.field, flex: 1 }}>
              <label style={ms.label}>Body type</label>
              <select style={ms.select} value={form.bodyType} onChange={(e) => setForm({ ...form, bodyType: e.target.value })}>
                {BODIES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {field('color', 'Exterior color', 'text', 'e.g. Pearl white')}

          <div style={ms.field}>
            <label style={ms.label}>Features (one per line)</label>
            <textarea
              style={{ ...ms.input, minHeight: 72, resize: 'vertical' }}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              placeholder="Sunroof&#10;ADAS&#10;Wireless charging"
            />
          </div>

          <div style={ms.field}>
            <label style={ms.label}>Description</label>
            <textarea
              style={{ ...ms.input, minHeight: 80, resize: 'vertical' }}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter car description..."
            />
          </div>

        </div>
        <div style={ms.modalFooter}>
          <button style={ms.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={ms.saveBtn} onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : (mode === 'add' ? 'Add Listing' : 'Save Changes')}
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

// ── Main Component ───────────────────────────────────────────
export function AdminListings() {
  const [listings, setListings]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [brandFilter, setBrandFilter]   = useState('All Brands');
  const [modal, setModal]               = useState(null);

  // Fetch real car listings from API
  useEffect(() => {
    adminAPI.getCars()
      .then((data) => {
        setListings(data.map((c) => ({
          id: c._id,
          car: c.name,
          year: c.year ? `${c.year} • ${c.type}` : c.type,
          price: `₹${(c.price || 0).toLocaleString()}`,
          seller: c.seller?.name || 'Unknown',
          status: 'Approved',
          date: new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          raw: c
        })));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalListings    = listings.length;
  const approvedListings = listings.filter((l) => l.status === 'Approved').length;
  const pendingListings  = listings.filter((l) => l.status === 'Pending').length;

  const adminBrandOptions = useMemo(() => {
    const set = new Set();
    listings.forEach((l) => { if (l.raw?.brand) set.add(l.raw.brand); });
    return ['All Brands', ...Array.from(set).sort()];
  }, [listings]);

  const filtered = listings.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      (l.car || '').toLowerCase().includes(q) || (l.seller || '').toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || l.status === statusFilter;
    const matchBrand = brandFilter === 'All Brands' || l.raw?.brand === brandFilter;
    return matchSearch && matchStatus && matchBrand;
  });

  // Real API delete
  const handleDelete = async () => {
    try {
      await carAPI.delete(modal.listing.id);
      setListings(listings.filter((l) => l.id !== modal.listing.id));
      setModal(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (payload) => {
    try {
      const savedCar = await carAPI.create(payload);
      const newListing = {
          id: savedCar._id,
          car: savedCar.name,
          year: savedCar.year ? `${savedCar.year} • ${savedCar.type}` : savedCar.type,
          price: `₹${(savedCar.price || 0).toLocaleString()}`,
          seller: savedCar.seller?.name || 'Unknown', // Will be populated with admin id but we might not have seller object populated yet
          status: 'Approved',
          date: new Date(savedCar.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          raw: savedCar
      };
      setListings([newListing, ...listings]);
      setModal(null);
    } catch (err) {
      alert(err.message || 'Failed to create car listing.');
    }
  };

  const handleEdit = async (payload) => {
    try {
      const updated = await carAPI.update(modal.listing.id, payload);
      setListings(
        listings.map((l) =>
          l.id === modal.listing.id
            ? {
                id: updated._id,
                car: updated.name,
                year: updated.year ? `${updated.year} • ${updated.type}` : updated.type,
                price: `₹${(updated.price || 0).toLocaleString()}`,
                seller: updated.seller?.name || l.seller,
                status: l.status,
                date: new Date(updated.updatedAt || updated.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
                raw: { ...updated, seller: updated.seller || l.raw?.seller },
              }
            : l
        )
      );
      setModal(null);
    } catch (err) {
      alert(err.message || 'Failed to update listing.');
    }
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
                  {adminBrandOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
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
      {modal?.type === 'add'    && <ListingModal key="add-listing" mode="add"  listing={null}         onSave={handleAdd}  onClose={() => setModal(null)} />}
      {modal?.type === 'edit'   && <ListingModal key={modal.listing.id} mode="edit" listing={modal.listing} onSave={handleEdit} onClose={() => setModal(null)} />}
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