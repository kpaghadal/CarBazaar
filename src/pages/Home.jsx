import { Link } from 'react-router-dom';
import { CarCard } from '../components/CarCard';
import { CategoryCard } from '../components/CategoryCard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CARS } from '../data/cars';
import { useWishlist } from '../context/WishlistContext.jsx';

export function Home() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const cars = CARS.slice(0, 5);

  return (
    <div style={styles.page}>
      <Header />
      <HeroSection />
      <main style={styles.main}>
        {/* Latest Listings Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.featuredLabel}>FEATURED</p>
              <h1 style={styles.sectionTitle}>Latest Listings</h1>
            </div>
            <Link to="/new-cars" style={styles.viewAll}>View All →</Link>
          </div>
          <div style={styles.carGrid}>
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onFavorite={toggleWishlist}
                isFavorite={isInWishlist(car.id)}
              />
            ))}
          </div>
        </section>

        {/* Browse by Type Section */}
        <section style={styles.section}>
          <p style={styles.categoriesLabel}>CATEGORIES</p>
          <h2 style={styles.browseTitle}>Browse by Type</h2>
          <div style={styles.categoryGrid}>
            <CategoryCard
              category="Sedan"
              image="/sedan.png"
            />
            <CategoryCard
              category="SUV"
              image="/suv.png"
            />
            <CategoryCard
              category="Coupe"
              image="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800"
            />
            <CategoryCard
              category="Truck"
              image="/truck.png"
            />
          </div>
        </section>
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
    padding: '60px 40px',
  },
  section: {
    marginBottom: '80px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  featuredLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#FF6A00',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0F1724',
    margin: '8px 0 0',
  },
  viewAll: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#FF6A00',
    textDecoration: 'none',
    alignSelf: 'flex-end',
  },
  carGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  categoriesLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#FF6A00',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'center',
    margin: '0 0 8px',
  },
  browseTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0F1724',
    textAlign: 'center',
    margin: '0 0 40px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
};
