export function CarCard({ car, onFavorite, isFavorite = false }) {
  return (
    <div style={styles.card} className="hover-elevate image-zoom">
      <div style={styles.imageWrap}>
        <img src={car.image} alt={car.title} style={styles.image} />
        {onFavorite && (
          <button
            onClick={() => onFavorite?.(car)}
            style={{
              ...styles.favoriteBtn,
              ...(isFavorite ? styles.favoriteBtnActive : {}),
            }}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <span
              style={{
                ...styles.heart,
                ...(isFavorite ? styles.heartActive : {}),
              }}
            >
              {isFavorite ? '♥' : '♡'}
            </span>
          </button>
        )}
      </div>
      <h3 style={styles.title}>{car.title}</h3>
      <p style={styles.price}>₹{car.price.toLocaleString()}</p>
      <div style={styles.specs}>
        <span style={styles.spec}>{car.year}</span>
        <span style={styles.spec}>{car.mileage}</span>
        <span style={styles.spec}>{car.fuelType}</span>
        <span style={styles.spec}>{car.location}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    paddingTop: '66.67%',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  favoriteBtnActive: {
    backgroundColor: '#FF6A00',
  },
  heart: {
    fontSize: '1.125rem',
    color: '#7A6B5A',
  },
  heartActive: {
    color: '#FFFFFF',
  },
  title: {
    margin: '16px 16px 8px',
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#0F1724',
  },
  price: {
    margin: '0 16px 12px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#FF6A00',
  },
  specs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    margin: '0 16px 16px',
    fontSize: '0.875rem',
    color: '#7A6B5A',
  },
  spec: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};
