export function CategoryCard({ category, image, onClick }) {
  return (
    <div style={styles.card} onClick={onClick} className="hover-elevate-sm image-zoom">
      <img src={image} alt={category} style={styles.image} />
      <div style={styles.label}>{category}</div>
    </div>
  );
}

const styles = {
  card: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    aspectRatio: '4/3',
    minHeight: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  label: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#FFFFFF',
    fontSize: '1.25rem',
    fontWeight: 700,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
};
