import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CARS } from '../data/cars';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/users/CarDetailNew.css';

export function CarDetailNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const car = CARS.find((c) => String(c.id) === String(id));
  const [currentImg, setCurrentImg] = useState(0);

  if (!car) {
    return (
      <div>
        <Header />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
          <p>Car not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const inWish = isInWishlist(car.id);

  // Build images array — use car.images if available, else repeat car.image
  const images = car.images?.length ? car.images : [car.image, car.image, car.image, car.image, car.image];

  const prevImg = () => setCurrentImg((p) => (p - 1 + images.length) % images.length);
  const nextImg = () => setCurrentImg((p) => (p + 1) % images.length);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recent');
      const arr = raw ? JSON.parse(raw) : [];
      const set = new Set(arr.map(String));
      set.add(String(car.id));
      localStorage.setItem('recent', JSON.stringify(Array.from(set)));
    } catch {}
  }, [car.id]);

  const features = car.features?.length
    ? car.features
    : ['Carbon Fiber Roof', 'Head-Up Display', 'Adaptive M Suspension', 'M Carbon Bucket Seats', 'Harman Kardon Audio', 'M Drive Professional'];

  return (
    <div className="detail-page">
      <Header />
      <main className="detail-main">

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Listing
        </button>

        <div className="detail-grid">

          {/* ── LEFT SIDE ── */}
          <div>

            {/* Image Gallery with Arrows */}
            <div className="detail-gallery">
              <div className="gallery-wrapper">
                <img src={images[currentImg]} alt={car.title} className="detail-hero-img" />
              </div>
            </div>

            {/* Description */}
            <div className="detail-description">
              <h3>Description</h3>
              <p>
                {car.description ||
                  `Stunning ${car.title} in ${car.color || 'Alpine White'} with carbon fiber package. Twin-turbo inline-6 producing 503hp. Full factory warranty remaining.`}
              </p><br/>
              {/* Features */}
            <div className="detail-features">
              <h3>Features</h3>
              <div className="features-grid">
                {features.map((f) => (
                  <div className="feature-item" key={f}>
                    <div className="feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            </div>

   

          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="detail-side">

            {/* Title + Price + Wishlist */}
            <div className="detail-top-card">
              <div className="detail-title-row">
                <h2 className="detail-car-title">{car.title}</h2>
              <button
                className={`wish-btn ${inWish ? 'active' : ''}`}
                onClick={() => toggleWishlist(car)}
              >
                {inWish ? '♥' : '♡'} Add to Wishlist
              </button>
              </div>
              <div className="detail-price">₹{car.price.toLocaleString()}</div>

            {/* Specifications */}
            <div className="detail-card">
              <div className="detail-card-title">Specifications</div>
              <div className="spec-grid">

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Year</div>
                    <div className="spec-value">{car.year}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Mileage</div>
                    <div className="spec-value">{car.mileage?.toLocaleString()} km</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 22V8l9-6 9 6v14"/><path d="M9 22V12h6v10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Fuel</div>
                    <div className="spec-value">{car.fuelType}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Transmission</div>
                    <div className="spec-value">{car.transmission || 'Automatic'}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Body</div>
                    <div className="spec-value">{car.bodyType || 'Coupe'}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Color</div>
                    <div className="spec-value">{car.color || 'Alpine White'}</div>
                  </div>
                </div>

              </div>
            </div>
            <br/>
            {/* Seller Info */}
            <div className="detail-card">
              <div className="detail-card-title">Seller Information</div>
              <div className="seller-item">
                <svg className="seller-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                CarBazzar
              </div>
              <div className="seller-item">
                <svg className="seller-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 5.55 5.55l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                98567 87664
              </div>
              <div className="seller-item">
                <svg className="seller-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {car.location}
              </div>
            </div><br/>

            {/* Contact Button */}
            <button className="contact-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Contact Seller
            </button>
            </div>

 

           
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}