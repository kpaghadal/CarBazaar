import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/auth/AuthCard';
import { CarHeroBlock } from '../components/auth/CarHeroBlock';
import { useAuth } from '../context/AuthContext.jsx';
import { authAPI } from '../services/api.js';

export function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const data = await authAPI.register({ name, email, password });
      login(
        { _id: data._id, name: data.name, email: data.email, role: data.role, profileImage: data.profileImage },
        data.token
      );
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrap}>
      <AuthCard leftBg="signup" leftContent={<CarHeroBlock variant="signup" />}>
        <Logo variant="auth" />
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to access exclusive car deals today.</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 14, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Full Name
            <input
              type="text"
              placeholder="eg. John Doe"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Full Name"
            />
          </label>
          <label style={styles.label}>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </label>
          <label style={styles.label}>
            Password
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password (min 6 chars)"
                style={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <button type="button" style={styles.eyeBtn} onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </label>
          <button type="submit" style={styles.submit} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </AuthCard>
    </div>
  );
}

const pageWrap = { minHeight: '100vh', padding: '24px 16px', backgroundColor: '#F8F8F8' };
const styles = {
  title:       { margin: '24px 0 0', fontSize: '1.5rem', fontWeight: 700, color: '#0F1724' },
  subtitle:    { margin: '8px 0 0', fontSize: '0.9375rem', color: '#7A6B5A' },
  form:        { marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 },
  label:       { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', fontWeight: 600, color: '#7A6B5A' },
  input:       { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E5E5E5', fontSize: '0.9375rem', color: '#0F1724', outline: 'none' },
  passwordWrap:  { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' },
  passwordInput: { width: '100%', boxSizing: 'border-box', padding: '12px 44px 12px 14px', borderRadius: '8px', border: '1px solid #E5E5E5', fontSize: '0.9375rem', color: '#0F1724', outline: 'none' },
  eyeBtn:      { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, fontSize: '1rem' },
  submit:      { marginTop: '8px', padding: '14px 24px', backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--button-radius)', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' },
  loginText:   { margin: '24px 0 0', fontSize: '0.9375rem', color: '#7A6B5A' },
};