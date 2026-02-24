import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/auth/AuthCard';
import { CarHeroBlock } from '../components/auth/CarHeroBlock';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div style={pageWrap}>
      <AuthCard
        leftBg="login"
        leftContent={<CarHeroBlock variant="login" />}
      >
        <Logo variant="auth" />
        <h1 style={styles.title}>User Login</h1>
        <p style={styles.subtitle}>
          Welcome back. Sign in to continue buying and selling cars.
        </p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              aria-label="Email"
            />
          </label>
          <label style={styles.label}>
            Password
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                style={{ ...styles.input, paddingRight: 44 }}
                aria-label="Password"
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </label>
          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" style={styles.submit}>
            Log in
          </button>
        </form>
        <p style={styles.signupText}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </AuthCard>
    </div>
  );
}

const pageWrap = {
  minHeight: '100vh',
  padding: '24px 16px',
  backgroundColor: '#F8F8F8',
};

const styles = {
  title: {
    margin: '24px 0 0',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0F1724',
  },
  subtitle: {
    margin: '8px 0 0',
    fontSize: '0.9375rem',
    color: '#7A6B5A',
  },
  form: {
    marginTop: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#7A6B5A',
  },
  input: {
    padding: '12px 14px',
    borderRadius: 'var(--input-radius)',
    border: '1px solid var(--color-input-border)',
    fontSize: '0.9375rem',
    color: 'var(--color-text-primary)',
    outline: 'none',
  },
  passwordWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    fontSize: '1rem',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkboxLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#0F1724',
    cursor: 'pointer',
    fontWeight: 400,
  },
  checkbox: {
    width: 16,
    height: 16,
    accentColor: '#FF6A00',
  },
  forgotLink: {
    fontSize: '0.875rem',
    color: '#FF6A00',
    textDecoration: 'underline',
  },
  submit: {
    marginTop: '8px',
    padding: '14px 24px',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--button-radius)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  signupText: {
    margin: '24px 0 0',
    fontSize: '0.9375rem',
    color: '#7A6B5A',
  },
};
