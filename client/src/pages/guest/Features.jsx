import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export function Features() {
  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <div style={styles.headerBox}>
          <h1 style={styles.title}>Platform Features</h1>
          <p style={styles.subtitle}>Everything you need to buy and sell cars effectively, packed into an intuitive, seamless interface.</p>
        </div>

        <div style={styles.featuresGrid}>
          {featuresData.map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={{...styles.iconBox, background: f.color}}>
                {f.icon}
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const featuresData = [
  {
    title: 'Instant Booking',
    desc: 'Skip the back-and-forth chat. Book your appointment to see a car directly from the listing page in 2 clicks.',
    color: '#FEF3C7',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  },
  {
    title: 'Direct Messaging',
    desc: 'Prefer to talk? Our built-in chat system lets you negotiate directly with sellers in real-time.',
    color: '#DBEAFE',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  },
  {
    title: 'Automated Alerts',
    desc: 'Receive confirmation emails the second you book a viewing, keeping both buyers and sellers in sync.',
    color: '#DCFCE7',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  },
  {
    title: 'Powerful Wishlist',
    desc: 'Save your favorite listings to a dynamic wishlist and jump back directly when you are ready to decide.',
    color: '#FFE4E6',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  },
  {
    title: 'Admin Management',
    desc: 'Advanced dashboard for system admins to oversee listings, manage users, and track platform bookings.',
    color: '#F3E8FF',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>
  },
  {
    title: 'Safe API Routing',
    desc: 'Fully authenticated private routes guarantee that sensitive actions and user data are strictly protected and isolated.',
    color: '#F1F5F9',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  }
];

const styles = {
  page: { minHeight: '100vh', background: '#FFF7ED', fontFamily: 'inherit' },
  main: { padding: '80px 20px', maxWidth: 1200, margin: '0 auto' },
  headerBox: { textAlign: 'center', marginBottom: 60 },
  title: { fontSize: '3rem', fontWeight: 800, color: '#0F1724', margin: '0 0 16px' },
  subtitle: { fontSize: '1.2rem', color: '#64748B', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 32
  },
  featureCard: {
    background: '#fff',
    borderRadius: 20,
    padding: 32,
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.05)',
    transition: 'transform 0.3s'
  },
  iconBox: {
    width: 60, height: 60, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
  },
  featureTitle: { fontSize: '1.4rem', fontWeight: 700, color: '#0F1724', margin: '0 0 12px' },
  featureDesc: { fontSize: '1rem', color: '#64748B', lineHeight: 1.6, margin: 0 }
};
