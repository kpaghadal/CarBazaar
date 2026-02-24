import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/auth/AuthCard';
import { CarHeroBlock } from '../components/auth/CarHeroBlock';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={pageWrap}>
      <AuthCard
        leftBg="signup"
        leftContent={<CarHeroBlock variant="signup" />}
      >
        <Logo variant="auth" />
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to access exclusive car deals today.</p>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label style={styles.label}>
            Full Name
            <input
              type="text"
              placeholder="eg. kris paghadal"
              style={styles.input}
              aria-label="Full Name"
            />
          </label>
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
                placeholder="Create a password"
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
          <button type="submit" style={styles.submit}>
            Sign up
          </button>
        </form>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login">Log in</Link>
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
    borderRadius: '8px',
    border: '1px solid #E5E5E5',
    fontSize: '0.9375rem',
    color: '#0F1724',
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
  loginText: {
    margin: '24px 0 0',
    fontSize: '0.9375rem',
    color: '#7A6B5A',
  },
};
