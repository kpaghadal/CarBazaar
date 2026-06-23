import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message Sent! Our team will reach out soon.');
    }, 1500);
  };

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <div style={styles.container}>
          
          <div style={styles.textColumn}>
            <h1 style={styles.title}>Let's talk about your next car.</h1>
            <p style={styles.subtitle}>
              Whether you're looking to buy, sell, or just need support with our platform, we're here to help. Drop us a line.
            </p>
            
            <div style={styles.contactInfo}>
              <div style={styles.infoItem}>
                <div style={styles.iconBox}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4 style={styles.infoTitle}>Email</h4>
                  <p style={styles.infoText}>support@carbazaar.com</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.iconBox}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4 style={styles.infoTitle}>Phone</h4>
                  <p style={styles.infoText}>98765 68785</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.formColumn}>
            <form style={styles.formCard} onSubmit={handleSubmit}>
              <h3 style={styles.formTitle}>Send a Message</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input type="text" style={styles.input} required placeholder="Rahul Maheta" />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input type="email" style={styles.input} required placeholder="rahul@example.com" />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Message</label>
                <textarea style={styles.textarea} required placeholder="How can we help?" rows={4}></textarea>
              </div>

              <button type="submit" style={styles.submitBtn} disabled={status === 'Sending...'}>
                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status && status !== 'Sending...' && (
                <div style={styles.successMsg}>{status}</div>
              )}
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED', fontFamily: 'inherit' },
  main: { padding: '80px 20px' },
  container: {
    maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center'
  },
  textColumn: { paddingRight: 20 },
  title: { fontSize: '3rem', fontWeight: 800, color: '#0F1724', margin: '0 0 20px', lineHeight: 1.1 },
  subtitle: { fontSize: '1.2rem', color: '#64748B', lineHeight: 1.6, marginBottom: 40 },
  contactInfo: { display: 'flex', flexDirection: 'column', gap: 30 },
  infoItem: { display: 'flex', alignItems: 'center', gap: 16 },
  iconBox: { width: 50, height: 50, borderRadius: 12, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  infoTitle: { margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: '#0F1724' },
  infoText: { margin: 0, color: '#64748B', fontSize: '0.95rem' },
  
  formColumn: {},
  formCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    borderRadius: 24, padding: 40,
    boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset',
    border: '1px solid rgba(255,106,0,0.1)'
  },
  formTitle: { margin: '0 0 24px', fontSize: '1.6rem', fontWeight: 800, color: '#0F1724' },
  inputGroup: { marginBottom: 20 },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, fontSize: '1rem', transition: 'all 0.2s', outline: 'none' },
  textarea: { width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, fontSize: '1rem', transition: 'all 0.2s', outline: 'none', resize: 'vertical' },
  submitBtn: {
    width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FF6A00, #D9480F)', color: '#fff', borderRadius: 12, fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 14px rgba(255,106,0,0.3)'
  },
  successMsg: { marginTop: 16, padding: 12, background: '#F0FDF4', color: '#16A34A', borderRadius: 8, fontSize: '0.9rem', textAlign: 'center', border: '1px solid #86EFAC' }
};
