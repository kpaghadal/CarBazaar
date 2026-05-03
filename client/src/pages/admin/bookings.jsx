import { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { adminAPI } from '../../services/api.js';
import '../../styles/admin/admin.css';

// SVG Icons
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getBookings()
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Platform Bookings" />
        <div className="admin-content">
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2 className="admin-table-title">All Bookings</h2>
            </div>
            
            {loading && <p style={{ padding: 20 }}>Loading bookings...</p>}
            {error && <p style={{ padding: 20, color: 'red' }}>{error}</p>}
            
            {!loading && !error && bookings.length === 0 && (
              <p style={{ padding: 20 }}>No bookings found.</p>
            )}

            {!loading && !error && bookings.length > 0 && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Car Details</th>
                    <th>Booked By</th>
                    <th>Phone</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="admin-table-row">
                      <td>
                        <div className="admin-car-cell">
                          <div className="admin-car-img" style={{ overflow: 'hidden' }}>
                             {b.car?.image ? <img src={b.car.image} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <IconCalendar />}
                          </div>
                          <div>
                            <p className="admin-car-name">{b.car?.name || 'Unknown'}</p>
                            <p className="admin-car-year">₹{(b.car?.price || 0).toLocaleString()}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="admin-seller-cell">
                          <span className="admin-seller-name">{b.user?.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td><span className="admin-price">{b.phone || b.user?.phone || 'N/A'}</span></td>
                      <td>
                        <span className="admin-date">
                           {b.appointmentDate ? new Date(b.appointmentDate).toLocaleString() : new Date(b.createdAt).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${b.status?.toLowerCase() || 'confirmed'}`}>{b.status || 'Confirmed'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
