/**
 * Card for listings: image, optional heart, short name, subtitle, price, details line, View Details button.
 */
export function CarListingCard({ car, onFavorite, isFavorite = false, onView }) {
  const shortName = car.title.replace(/^\d{4}\s/, '');
  const mileageStr = car.mileage >= 1000 ? `${(car.mileage / 1000).toFixed(0)}k km` : `${car.mileage} km`;

  return (
    <div style={styles.card} onClick={onView} role="button" className="hover-elevate image-zoom">
      <div style={styles.imageWrap}>
        <img src={car.image} alt={car.title} style={styles.image} />
        {onFavorite && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onFavorite(car); }}
            style={{ ...styles.favoriteBtn, ...(isFavorite ? styles.favoriteBtnActive : {}) }}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <span style={{ ...styles.heart, ...(isFavorite ? styles.heartActive : {}) }}>
              {isFavorite ? '♥' : '♡'}
            </span>
          </button>
        )}
      </div>
      <div style={styles.body}>
        <h3 style={styles.title}>{shortName}</h3>
        {car.subtitle && <p style={styles.subtitle}>{car.subtitle}</p>}
        <p style={styles.price}>₹{car.price.toLocaleString()}</p>
        <p style={styles.details}>
          {car.year} {car.fuelType} {mileageStr}
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onView?.(); }}
          style={styles.viewBtn}
          className="btn btn-soft"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    paddingTop: '66.67%',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
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
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#0F1724',
  },
  subtitle: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  price: {
    margin: '4px 0',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#FF6A00',
  },
  details: {
    margin: 0,
    fontSize: '0.8125rem',
    color: '#6b7280',
  },
  viewBtn: {
    marginTop: '12px',
    padding: '10px 16px',
    backgroundColor: '#FFF2E6',
    color: '#0F1724',
    border: 'none',
    borderRadius: 8,
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
};
