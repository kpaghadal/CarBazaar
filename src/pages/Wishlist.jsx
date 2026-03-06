import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CarCard } from '../components/CarCard';
import { useWishlist } from '../context/WishlistContext.jsx';

export function Wishlist() {
  const { items, toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>My Wishlist</h1>
        <p style={styles.subtitle}>Cars you&apos;ve saved for later</p>
        {items.length === 0 ? (
          <p style={styles.empty}>You haven&apos;t added any cars to your wishlist yet.</p>
        ) : (
          <div style={styles.grid}>
            {items.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onFavorite={toggleWishlist}
                isFavorite={isInWishlist(car.id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FFF7ED',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0F1724',
  },
  subtitle: {
    margin: '0 0 32px',
    fontSize: '1rem',
    color: '#7A6B5A',
  },
  empty: {
    fontSize: '0.9375rem',
    color: '#7A6B5A',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
};

