import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/auth/AuthCard';
import { CarHeroBlock } from '../components/auth/CarHeroBlock';
import '../styles/Login.css';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  const isAdmin = activeTab === 'admin';

  return (
    <div className="login-page-wrap">
      <AuthCard
        leftBg="login"
        leftContent={<CarHeroBlock variant="login" />}
      >
        <Logo variant="auth" />

        {/* ===== TAB SWITCHER ===== */}
        <div className="login-tab-wrapper">
          <button
            type="button"
            className={`login-tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            <span className="tab-icon"></span> User Login
          </button>
          <button
            type="button"
            className={`login-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <span className="tab-icon"></span> Admin Login
          </button>
        </div>

        {/* ===== TITLE + FORM fade in when tab changes ===== */}
        <div className="login-form-wrap" key={activeTab}>
        <h1 className="login-title">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </h1>
        <p className="login-subtitle">
          {isAdmin
            ? 'Welcome, Admin. Sign in to manage the platform.'
            : 'Welcome back. Sign in to continue buying and selling cars.'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* EMAIL */}
          <label className="login-label">
            {isAdmin ? 'Admin Email' : 'Email'}
            <input
              type="email"
              placeholder={isAdmin ? 'Enter your email' : 'Enter your email'}
              className="login-input"
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
                aria-label="Password"
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </label>

          
          <div className="login-options">
            <label className="login-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-checkbox"
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* SUBMIT — same orange color for both user & admin */}
          <button type="submit" className="login-submit-btn">
            {isAdmin ? 'Log in' : 'Log in'}
          </button>

        </form>

        {/* Signup link only for users */}
        {!isAdmin && (
          <p className="login-signup-text">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        )}
        </div>{/* end login-form-wrap */}

      </AuthCard>
    </div>
  );
}