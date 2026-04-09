import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/auth/AuthCard';
import { CarHeroBlock } from '../components/auth/CarHeroBlock';
import { useAuth } from '../context/AuthContext.jsx';
import { authAPI } from '../services/api.js';
import '../styles/Login.css';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isAdmin = activeTab === 'admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Single endpoint handles both user and admin — role is checked client-side
      const data = await authAPI.login({ email, password });

      // Validate role matches selected tab
      if (isAdmin && data.role !== 'admin') {
        setError('This account does not have admin privileges.');
        setLoading(false);
        return;
      }

      login(
        { _id: data._id, name: data.name, email: data.email, role: data.role, profileImage: data.profileImage },
        data.token
      );

      navigate(isAdmin ? '/admin/dashboard' : '/home');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrap">
      <AuthCard leftBg="login" leftContent={<CarHeroBlock variant="login" />}>
        <Logo variant="auth" />

        {/* Tab switcher */}
        <div className="login-tab-wrapper">
          <button type="button" className={`login-tab-btn ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>
            <span className="tab-icon"></span> User Login
          </button>
          <button type="button" className={`login-tab-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
            <span className="tab-icon"></span> Admin Login
          </button>
        </div>

        <div className="login-form-wrap" key={activeTab}>
          <h1 className="login-title">{isAdmin ? 'Admin Login' : 'User Login'}</h1>
          <p className="login-subtitle">
            {isAdmin ? 'Welcome, Admin. Sign in to manage the platform.' : 'Welcome back. Sign in to continue buying and selling cars.'}
          </p>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 14, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">
              {isAdmin ? 'Admin Email' : 'Email'}
              <input
                type="email"
                placeholder="Enter your email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
            </label>

            <label className="login-label">
              Password
              <div className="login-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <button type="button" className="login-eye-btn" onClick={() => setShowPassword((s) => !s)}>
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </label>

            <div className="login-options">
              <label className="login-checkbox-label">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="login-checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {!isAdmin && (
            <p className="login-signup-text">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </p>
          )}
        </div>
      </AuthCard>
    </div>
  );
}