import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { carAPI, normalizeCar, bookingAPI } from '../services/api.js';
import '../styles/users/CarDetailNew.css';

export function CarDetailNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isLoggedIn, user } = useAuth();

  const [car, setCar]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({ phone: '', appointmentDate: '', message: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  const isNewCarsRoute = pathname.startsWith('/new-cars/') && Boolean(id);

  useEffect(() => {
    setLoading(true);
    setError('');
    setCurrentImg(0);
    carAPI
      .getById(id)
      .then((data) => {
        if (isNewCarsRoute && data.type !== 'new') {
          setError('This vehicle is not listed as a new car.');
          setCar(null);
          return;
        }
        setCar(normalizeCar(data));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isNewCarsRoute]);

  const images = useMemo(() => {
    if (!car) return [];
    const raw = (car.images || []).filter(Boolean);
    const uniq = [...new Set(raw)];
    return uniq.length ? uniq : [car.image].filter(Boolean);
  }, [car]);

  useEffect(() => {
    if (!images.length) return;
    setCurrentImg((i) => Math.min(i, Math.max(0, images.length - 1)));
  }, [images.length]);

  const handleBack = () => {
    if (isNewCarsRoute) navigate('/new-cars');
    else navigate(-1);
  };

  const handleOpenBooking = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: pathname } });
      return;
    }
    setShowBookingModal(true);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.phone || !bookingData.appointmentDate) {
      window.alert('Phone and Appointment Date are required.');
      return;
    }
    setBookingLoading(true);
    try {
      await bookingAPI.create({ carId: car.id, ...bookingData });
      window.alert('Booking successful! Check your email for confirmation.');
      setShowBookingModal(false);
      setBookingData({ phone: '', appointmentDate: '', message: '' });
    } catch (err) {
      window.alert(err.message || 'Failed to book car.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40, color: '#7A6B5A' }}>Loading car details...</main>
        </div>
    );
  }

  if (error || !car) {
    return (
      <div>
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
          <p style={{ color: '#EF4444' }}>{error || 'Car not found.'}</p>
          <button
            type="button"
            onClick={handleBack}
            style={{ marginTop: 12, color: '#FF6A00', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            {isNewCarsRoute ? '← Back to new cars' : '← Go back'}
          </button>
        </main>
        </div>
    );
  }

  const inWish = isInWishlist(car.id);

  const prevImg = () => setCurrentImg((p) => (p - 1 + images.length) % images.length);
  const nextImg = () => setCurrentImg((p) => (p + 1) % images.length);

  const features = car.features?.length
    ? car.features
    : ['Factory warranty', 'Zero previous owners', 'Latest safety tech', 'Dealer inspected'];

  return (
    <div className="detail-page">
      <main className="detail-main">

        {/* Back Button */}
        <button type="button" className="back-btn" onClick={handleBack}>
          {isNewCarsRoute ? '← Back to new cars' : '← Back'}
        </button>

        <div className="detail-grid">

          {/* ── LEFT SIDE ── */}
          <div>

            {/* Image Gallery */}
            <div className="detail-gallery">
              <div className="gallery-wrapper">
                {images.length > 1 && (
                  <button type="button" className="gallery-arrow gallery-arrow--left" onClick={prevImg} aria-label="Previous image">
                    ‹
                  </button>
                )}
                <img src={images[currentImg] || car.image} alt={car.title} className="detail-hero-img" />
                {images.length > 1 && (
                  <button type="button" className="gallery-arrow gallery-arrow--right" onClick={nextImg} aria-label="Next image">
                    ›
                  </button>
                )}
              </div>
              {images.length > 1 && (
                <div className="detail-dots" role="tablist" aria-label="Gallery">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`detail-dot${idx === currentImg ? ' active' : ''}`}
                      onClick={() => setCurrentImg(idx)}
                      aria-label={`Image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
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
                    <div className="spec-value">{car.bodyType || 'Sedan'}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="spec-label">Location</div>
                    <div className="spec-value">{car.location || '—'}</div>
                  </div>
                </div>

                {car.color ? (
                  <div className="spec-item">
                    <div className="spec-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                      </svg>
                    </div>
                    <div>
                      <div className="spec-label">Color</div>
                      <div className="spec-value">{car.color}</div>
                    </div>
                  </div>
                ) : null}

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
                {car.seller?.name || 'CarBazaar'}
              </div>
              <div className="seller-item">
                <svg className="seller-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 5.55 5.55l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {car.seller?.phone || '—'}
              </div>
              <div className="seller-item">
                <svg className="seller-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {car.location}
              </div>
            </div><br/>

            {/* Book Button */}
            <button type="button" className="contact-btn" onClick={handleOpenBooking}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>
              </svg>
              Book Car
            </button>
            </div>

          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="booking-modal-overlay">
            <div className="booking-modal">
              <h3>Book {car.title}</h3>
              <p>Enter your details and standard email address will be notified.</p>
              <form onSubmit={submitBooking} className="booking-form">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={bookingData.phone} 
                    onChange={e => setBookingData({...bookingData, phone: e.target.value})} 
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Appointment Date & Time *</label>
                  <input 
                    type="datetime-local" 
                    required 
                    value={bookingData.appointmentDate} 
                    onChange={e => setBookingData({...bookingData, appointmentDate: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea 
                    value={bookingData.message} 
                    onChange={e => setBookingData({...bookingData, message: e.target.value})} 
                    placeholder="Any specific requests?"
                    rows={3}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowBookingModal(false)}>Cancel</button>
                  <button type="submit" className="confirm-btn" disabled={bookingLoading}>
                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      </div>
  );
}