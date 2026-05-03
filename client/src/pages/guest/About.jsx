import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function About() {
  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.title}>About CarBazaar</h1>
            <p style={styles.subtitle}>Redefining how you discover, buy, and sell luxury & everyday vehicles.</p>
          </div>
        </div>

        <section style={styles.contentSection}>
          <div style={styles.card}>
            <div style={styles.iconBox}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h2 style={styles.cardTitle}>Our Global Vision</h2>
            <p style={styles.cardText}>
              CarBazaar was born from a simple idea: making auto trading transparent, fast, and secure. We connect millions of buyers and sellers globally through our premium digital marketplace.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.iconBox}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 style={styles.cardTitle}>Trust & Security</h2>
            <p style={styles.cardText}>
              Every luxury vehicle and user listing is verified by our systems. We handle direct booking and messaging, letting you focus entirely on finding your perfect ride without the stress.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED', fontFamily: 'inherit' },
  main: { paddingBottom: 80 },
  heroSection: {
    background: 'linear-gradient(135deg, #0F1724 0%, #1A2536 100%)',
    padding: '100px 20px',
    textAlign: 'center',
    color: '#fff',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  heroContent: { maxWidth: 800, margin: '0 auto' },
  title: { fontSize: '3rem', fontWeight: 800, margin: '0 0 16px', backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFD1A4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { fontSize: '1.2rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 },
  contentSection: {
    maxWidth: 1000,
    margin: '-40px auto 0',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 30,
    position: 'relative',
    zIndex: 10
  },
  card: {
    background: '#fff',
    borderRadius: 24,
    padding: 40,
    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
    border: '1px solid rgba(255,106,0,0.1)',
    transition: 'transform 0.3s ease'
  },
  iconBox: {
    width: 64, height: 64, borderRadius: 16, background: '#FFF0E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24
  },
  cardTitle: { fontSize: '1.4rem', fontWeight: 700, color: '#0F1724', margin: '0 0 16px' },
  cardText: { fontSize: '1rem', color: '#64748B', lineHeight: 1.7, margin: 0 }
};
