import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { userAPI, uploadAPI } from '../services/api.js';

export function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { items: wishlist } = useWishlist();

  const [profile, setProfile] = useState({ name: '', email: '', profileImage: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load real profile from API on mount
  useEffect(() => {
    userAPI.getProfile()
      .then((data) => setProfile({ name: data.name || '', email: data.email || '', profileImage: data.profileImage || '' }))
      .catch(() => {
        // Fallback to AuthContext user
        if (user) setProfile({ name: user.name || '', email: user.email || '', profileImage: user.profileImage || '' });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadAPI.uploadImage(formData);
      setProfile({ ...profile, profileImage: res.imageUrl });
      setMessage('Image uploaded successfully! Remember to save profile.');
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const updated = await userAPI.updateProfile({ name: profile.name, profileImage: profile.profileImage });
      updateUser(updated); // sync to AuthContext + localStorage
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.title}>My Profile</h1>

        {loading && <p style={{ color: '#7A6B5A' }}>Loading profile...</p>}

        {!loading && (
          <>
            {/* Summary card */}
            <section style={styles.summaryCard}>
              <div style={styles.summaryLeft}>
                <div style={styles.avatar}>
                  {profile.profileImage
                    ? <img src={profile.profileImage} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    : <span style={{ color: '#FF6A00', fontSize: 28 }}>👤</span>
                  }
                </div>
                <div>
                  <div style={styles.summaryLine}><strong>{profile.name || 'User'}</strong></div>
                  <div style={styles.summarySub}>{profile.email}</div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <div style={styles.summaryLine}><strong>Cars Wishlisted: {wishlist.length}</strong></div>
                  <div style={styles.summarySub}>Verified saves</div>
                </div>
              </div>
              <Link to="/sell" className="btn btn-primary" style={styles.listBtn}>+ List a New Car</Link>
            </section>

            {/* Status messages */}
            {message && <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '10px 14px', color: '#16A34A', fontSize: 14, marginBottom: 12 }}>{message}</div>}
            {error   && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 14, marginBottom: 12 }}>{error}</div>}

            {/* Personal info */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
              <div style={styles.formCard}>
                <div style={styles.formGrid}>
                  <div>
                    <label style={styles.label}>Full Name</label>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!editing}
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Email</label>
                    <input value={profile.email} disabled style={{ ...styles.input, backgroundColor: '#F9FAFB', color: '#9CA3AF' }} />
                  </div>
                  <div>
                    <label style={styles.label}>Profile Image</label>
                    {editing ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ ...styles.input, paddingTop: 10 }}
                      />
                    ) : (
                      <input
                        value={profile.profileImage ? 'Image uploaded' : 'No image'}
                        disabled
                        style={{ ...styles.input, backgroundColor: '#F9FAFB', color: '#9CA3AF' }}
                      />
                    )}
                  </div>
                  <div>
                    <label style={styles.label}>Role</label>
                    <input value={user?.role || 'user'} disabled style={{ ...styles.input, backgroundColor: '#F9FAFB', textTransform: 'capitalize' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  {editing && (
                    <button type="button" className="btn btn-soft" onClick={() => setEditing(false)} style={{ ...styles.editBtn, background: '#F3F4F6', color: '#374151' }}>
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-soft"
                    onClick={editing ? handleSave : () => setEditing(true)}
                    style={styles.editBtn}
                    disabled={saving}
                  >
                    {editing ? (saving ? 'Saving...' : 'Save Profile') : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </section>

            {/* Wishlist preview */}
            {wishlist.length > 0 && (
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>My Wishlist ({wishlist.length} cars)</h3>
                <div style={styles.wishGrid}>
                  {wishlist.slice(0, 3).map((item) => {
                    const car = item.car || item;
                    return (
                      <div key={item._id || car._id} style={styles.wishCard}>
                        {car.image && <img src={car.image} alt={car.name} style={styles.wishImg} />}
                        <div style={{ padding: 10 }}>
                          <p style={{ fontWeight: 600, margin: 0, fontSize: 14 }}>{car.name || 'Car'}</p>
                          <p style={{ color: '#FF6A00', margin: '4px 0 0', fontSize: 13 }}>₹{car.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link to="/wishlist" style={{ display: 'inline-block', marginTop: 8, color: '#FF6A00', fontWeight: 600, fontSize: 14 }}>View all →</Link>
              </section>
            )}

            {/* Logout */}
            <section style={{ marginTop: 32 }}>
              <button
                type="button"
                onClick={logout}
                style={{ padding: '10px 20px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
              >
                Logout
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED' },
  main: { maxWidth: 1200, margin: '0 auto', padding: 40 },
  title: { margin: '0 0 16px', fontSize: '2rem', fontWeight: 800 },
  summaryCard: { background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  summaryLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  avatar: { width: 56, height: 56, borderRadius: '50%', border: '3px solid #FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, overflow: 'hidden' },
  summaryLine: { fontSize: 16, color: '#0F1724' },
  summarySub: { fontSize: 12, color: '#6b7280' },
  listBtn: { padding: '10px 16px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 },
  section: { marginTop: 28 },
  sectionTitle: { margin: '0 0 12px', fontSize: 16, fontWeight: 700 },
  formCard: { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  label: { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6 },
  input: { width: '100%', boxSizing: 'border-box', height: 44, borderRadius: 8, border: '1px solid #E5E7EB', padding: '0 12px', fontSize: 14 },
  editBtn: { padding: '10px 16px', borderRadius: 10, fontWeight: 700, background: '#FF6A00', color: '#fff', border: 'none', cursor: 'pointer' },
  wishGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  wishCard: { background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden' },
  wishImg: { width: '100%', height: 120, objectFit: 'cover' },
};
