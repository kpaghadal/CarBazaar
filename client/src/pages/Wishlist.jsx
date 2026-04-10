import { CarListingCard } from '../components/CarListingCard';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useNavigate } from 'react-router-dom';
import { normalizeCar } from '../services/api.js';
import '../styles/users/NewCars.css';
import '../styles/users/Wishlist.css';

export function Wishlist() {
  const { items, toggleWishlist, isInWishlist, loading } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="newcars-page">
      <main className="newcars-main wishlist-main">
        <header className="newcars-page-header">
          <span className="newcars-page-header-badge">Saved</span>
          <h1 className="newcars-page-header-title">My wishlist</h1>
          <p className="newcars-page-header-desc">
            Cars you&apos;ve saved for later—same layout as Browse new cars.
          </p>
        </header>

        {loading && <p className="newcars-state">Loading wishlist...</p>}

        {!loading && items.length === 0 && (
          <p className="wishlist-empty">
            You haven&apos;t added any cars to your wishlist yet.{' '}
            <button type="button" className="wishlist-empty-link" onClick={() => navigate('/new-cars')}>
              Browse cars →
            </button>
          </p>
        )}

        {!loading && items.length > 0 && (
          <div className="newcars-car-grid">
            {items.map((item) => {
              const raw = item.car || item;
              const car = normalizeCar(raw);
              const carId = car.id || car._id;
              return (
                <CarListingCard
                  key={item._id || carId}
                  car={car}
                  onFavorite={toggleWishlist}
                  isFavorite={isInWishlist(carId)}
                  onView={() => navigate(car.type === 'new' ? `/new-cars/${carId}` : `/old/${carId}`)}
                />
              );
            })}
          </div>
        )}
      </main>
      </div>
  );
}
