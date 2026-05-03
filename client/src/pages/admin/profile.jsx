import { useEffect, useRef, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { useAuth } from '../../context/AuthContext.jsx';
import { userAPI, uploadAPI } from '../../services/api.js';
import '../../styles/admin/admin.css';
import '../../styles/admin/adminProfile.css';

export function AdminProfile() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile]       = useState({ name: '', email: '', profileImage: '' });
  const [loading, setLoading]        = useState(true);
  const [saving,  setSaving]         = useState(false);
  const [uploading, setUploading]    = useState(false);
  const [message, setMessage]        = useState('');
  const [error,   setError]          = useState('');

  // Password change
  const [pwForm,  setPwForm]         = useState({ current: '', newPw: '', confirm: '' });
  const [pwSaving, setPwSaving]      = useState(false);
  const [pwMsg,   setPwMsg]          = useState('');
  const [pwError, setPwError]        = useState('');

  const fileInputRef = useRef(null);

  // ── Load profile ────────────────────────────────────────────────
  useEffect(() => {
    userAPI.getProfile()
      .then((data) =>
        setProfile({ name: data.name || '', email: data.email || '', profileImage: data.profileImage || '' })
      )
      .catch(() => {
        if (user)
          setProfile({ name: user.name || '', email: user.email || '', profileImage: user.profileImage || '' });
      })
      .finally(() => setLoading(false));
  }, [user]);

  // ── Upload avatar ────────────────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const url = await uploadAPI.upload(file);
      setProfile((prev) => ({ ...prev, profileImage: url }));
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
      // reset so same file can be re-selected
      e.target.value = '';
    }
  };

  // ── Save profile info ────────────────────────────────────────────
  const handleSave = async () => {
    if (!profile.name.trim()) { setError('Name cannot be empty.'); return; }
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const updated = await userAPI.updateProfile({ name: profile.name, profileImage: profile.profileImage });
      updateUser(updated);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  // ── Change password ──────────────────────────────────────────────
  const handlePasswordChange = async () => {
    setPwMsg('');
    setPwError('');
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      setPwError('All password fields are required.');
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError('New passwords do not match.');
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    setPwSaving(true);
    try {
      await userAPI.updateProfile({ password: pwForm.newPw });
      setPwMsg('Password changed successfully!');
      setPwForm({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      setPwError(err.message || 'Password change failed.');
    } finally {
      setPwSaving(false);
    }
  };

  const initials = (profile.name || user?.name || 'A')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="My Profile" />

        <div className="admin-content">
          {loading ? (
            <div className="ap-loading">Loading profile…</div>
          ) : (
            <div className="ap-grid">

              {/* ── LEFT: Avatar + quick info ── */}
              <div className="ap-left">
                <div className="ap-avatar-card">

                  {/* Avatar */}
                  <div className="ap-avatar-wrap">
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt="avatar" className="ap-avatar-img" />
                    ) : (
                      <div className="ap-avatar-fallback">{initials}</div>
                    )}
                    <button
                      className="ap-avatar-edit-btn"
                      onClick={() => fileInputRef.current?.click()}
                      title="Change photo"
                      disabled={uploading}
                    >
                      {uploading
                        ? <span className="ap-spinner" />
                        : (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.5-6.5a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" />
                          </svg>
                        )
                      }
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  <div className="ap-avatar-name">{profile.name || '—'}</div>
                  <div className="ap-avatar-email">{profile.email}</div>
                  <span className="ap-role-badge">Super Admin</span>

                  {/* Upload hint */}
                  <button
                    className="ap-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : '📷  Change Profile Photo'}
                  </button>
                  {profile.profileImage && (
                    <button
                      className="ap-remove-photo-btn"
                      onClick={() => setProfile((p) => ({ ...p, profileImage: '' }))}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                {/* Quick info card */}
                <div className="ap-info-card">
                  <div className="ap-info-title">Account Info</div>
                  <div className="ap-info-row">
                    <span className="ap-info-label">Role</span>
                    <span className="ap-info-value">Super Admin</span>
                  </div>
                  <div className="ap-info-row">
                    <span className="ap-info-label">Email</span>
                    <span className="ap-info-value" style={{ wordBreak: 'break-all' }}>{profile.email}</span>
                  </div>
                  <div className="ap-info-row">
                    <span className="ap-info-label">Status</span>
                    <span className="admin-badge active">Active</span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Forms ── */}
              <div className="ap-right">

                {/* Profile info form */}
                <div className="ap-form-card">
                  <div className="ap-form-header">
                    <div>
                      <div className="ap-form-title">Personal Information</div>
                      <div className="ap-form-subtitle">Update your display name and profile photo</div>
                    </div>
                  </div>

                  {message && <div className="ap-alert success">{message}</div>}
                  {error   && <div className="ap-alert error">{error}</div>}

                  <div className="ap-form-body">
                    <div className="ap-field">
                      <label className="ap-label">Full Name</label>
                      <input
                        type="text"
                        className="ap-input"
                        value={profile.name}
                        onChange={(e) => { setMessage(''); setError(''); setProfile((p) => ({ ...p, name: e.target.value })); }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="ap-field">
                      <label className="ap-label">Email Address <span className="ap-readonly-tag">Read-only</span></label>
                      <input
                        type="email"
                        className="ap-input ap-input-readonly"
                        value={profile.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="ap-form-footer">
                    <button
                      className="ap-save-btn"
                      onClick={handleSave}
                      disabled={saving || uploading}
                    >
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                {/* Password change form */}
                <div className="ap-form-card">
                  <div className="ap-form-header">
                    <div>
                      <div className="ap-form-title">Change Password</div>
                      <div className="ap-form-subtitle">Use a strong password with at least 6 characters</div>
                    </div>
                  </div>

                  {pwMsg   && <div className="ap-alert success">{pwMsg}</div>}
                  {pwError && <div className="ap-alert error">{pwError}</div>}

                  <div className="ap-form-body">
                    <div className="ap-field">
                      <label className="ap-label">Current Password</label>
                      <input
                        type="password"
                        className="ap-input"
                        placeholder="Enter current password"
                        value={pwForm.current}
                        onChange={(e) => { setPwMsg(''); setPwError(''); setPwForm((p) => ({ ...p, current: e.target.value })); }}
                      />
                    </div>
                    <div className="ap-form-row">
                      <div className="ap-field">
                        <label className="ap-label">New Password</label>
                        <input
                          type="password"
                          className="ap-input"
                          placeholder="New password"
                          value={pwForm.newPw}
                          onChange={(e) => { setPwMsg(''); setPwError(''); setPwForm((p) => ({ ...p, newPw: e.target.value })); }}
                        />
                      </div>
                      <div className="ap-field">
                        <label className="ap-label">Confirm New Password</label>
                        <input
                          type="password"
                          className="ap-input"
                          placeholder="Confirm new password"
                          value={pwForm.confirm}
                          onChange={(e) => { setPwMsg(''); setPwError(''); setPwForm((p) => ({ ...p, confirm: e.target.value })); }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="ap-form-footer">
                    <button
                      className="ap-save-btn"
                      onClick={handlePasswordChange}
                      disabled={pwSaving}
                    >
                      {pwSaving ? 'Updating…' : 'Update Password'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
