/**
 * Two-column auth layout: left promo panel (#FFF7ED) + right form (#FFFFFF)
 */
export function AuthCard({ leftBg = 'signup', leftContent, children }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.leftPanel, backgroundColor: '#FFF7ED' }}>
        {leftContent}
      </div>
      <div style={styles.rightPanel}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    maxWidth: 960,
    minHeight: 560,
    margin: '40px auto',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  leftPanel: {
    flex: '1 1 50%',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightPanel: {
    flex: '1 1 50%',
    padding: '48px 40px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
};
